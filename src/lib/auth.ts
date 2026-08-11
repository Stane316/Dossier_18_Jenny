import { isSupabaseConfigured, supabase } from "./supabase";

const ACCESS_FUNCTION = "jenny-access";

type VerificationResponse = {
  valid: boolean;
  user?: { id: string; email: string };
};

export type JennyAuthFailureReason =
  | "denied"
  | "unconfirmed"
  | "configuration"
  | "unavailable";

export type JennyAuthResult =
  | { ok: true }
  | { ok: false; reason: JennyAuthFailureReason };

type VerificationResult =
  | { valid: true }
  | { valid: false; reason: JennyAuthFailureReason };

class JennyAccessRequestError extends Error {
  constructor(
    readonly reason: JennyAuthFailureReason,
    readonly status?: number
  ) {
    super("Jenny private access request failed");
    this.name = "JennyAccessRequestError";
  }
}

async function safeLocalSignOut(): Promise<void> {
  if (!supabase) return;
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    // Clearing an unavailable remote session must not mask the original result.
  }
}

async function accessToken(): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.access_token) return null;
  return data.session.access_token;
}

async function functionErrorDetails(
  response: Response | undefined,
  error: unknown
): Promise<{ status?: number; code?: string }> {
  const context =
    error && typeof error === "object" && "context" in error
      ? (error as { context?: unknown }).context
      : undefined;
  const source =
    response ?? (context instanceof Response ? context : undefined);
  if (!source) return {};

  let code: string | undefined;
  try {
    const body = (await source.clone().json()) as { code?: unknown };
    if (typeof body.code === "string") code = body.code;
  } catch {
    // A gateway or network proxy can return a non-JSON body.
  }
  return { status: source.status, code };
}

function classifyAccessFailure(status?: number, code?: string): JennyAuthFailureReason {
  if (code === "EMAIL_UNCONFIRMED") return "unconfirmed";
  if (code === "ACCESS_DENIED" || code === "AUTH_REQUIRED") return "denied";
  if (
    code === "ORIGIN_NOT_ALLOWED" ||
    code === "SERVICE_NOT_CONFIGURED" ||
    status === 403 ||
    status === 404 ||
    status === 503
  ) {
    return "configuration";
  }
  if (status === 401) return "denied";
  return "unavailable";
}

async function invokeAccess<T>(
  action: string,
  payload: Record<string, unknown> = {},
  suppliedToken?: string
): Promise<T> {
  if (!isSupabaseConfigured || !supabase) {
    throw new JennyAccessRequestError("configuration");
  }

  const token = suppliedToken ?? (await accessToken());
  if (!token) throw new JennyAccessRequestError("denied");

  const { data, error, response } = await supabase.functions.invoke(ACCESS_FUNCTION, {
    body: { action, ...payload },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (error) {
    const details = await functionErrorDetails(response, error);
    throw new JennyAccessRequestError(
      classifyAccessFailure(details.status, details.code),
      details.status
    );
  }
  return data as T;
}

async function verifyJennyAccessToken(token?: string): Promise<VerificationResult> {
  try {
    const result = await invokeAccess<VerificationResponse>("verify", {}, token);
    if (result.valid === true && result.user?.id && result.user.email) {
      return { valid: true };
    }
    return { valid: false, reason: "unavailable" };
  } catch (error) {
    return {
      valid: false,
      reason:
        error instanceof JennyAccessRequestError ? error.reason : "unavailable",
    };
  }
}

/** Authenticates the sole Jenny account through Supabase Auth email/password. */
export async function authenticateJenny(
  email: string,
  password: string
): Promise<JennyAuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, reason: "configuration" };
  }
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password || password.length > 256) {
    return { ok: false, reason: "denied" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });
    if (error) {
      await safeLocalSignOut();
      const code = "code" in error && typeof error.code === "string" ? error.code : "";
      if (code === "email_not_confirmed") {
        return { ok: false, reason: "unconfirmed" };
      }
      if (
        code === "invalid_credentials" ||
        code === "user_not_found" ||
        error.status === 400 ||
        error.status === 422
      ) {
        return { ok: false, reason: "denied" };
      }
      return { ok: false, reason: "unavailable" };
    }

    const token = data.session?.access_token;
    if (!token) {
      await safeLocalSignOut();
      return { ok: false, reason: "unavailable" };
    }

    // Verify the exact fresh token returned by sign-in, avoiding any storage timing race.
    const verification = await verifyJennyAccessToken(token);
    if (!verification.valid) {
      await safeLocalSignOut();
      return { ok: false, reason: verification.reason };
    }
    return { ok: true };
  } catch {
    await safeLocalSignOut();
    return { ok: false, reason: "unavailable" };
  }
}

/** Validates the current Supabase JWT and allowed Jenny email in the Edge Function. */
export async function verifyJennySession(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  const verification = await verifyJennyAccessToken();
  if (verification.valid) return true;
  // Fail closed and remove a stale, unauthorized, or unverifiable local session.
  await safeLocalSignOut();
  return false;
}

export async function clearJennySession(): Promise<void> {
  await safeLocalSignOut();
}

/** Invokes a Jenny-only action with the current Supabase Auth access token. */
export async function invokeJennyAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  return invokeAccess<T>(action, payload);
}
