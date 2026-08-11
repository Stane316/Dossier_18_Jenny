import { isSupabaseConfigured, supabase } from "./supabase";

const ACCESS_FUNCTION = "jenny-access";

type VerificationResponse = {
  valid: boolean;
  user?: { id: string; email: string };
};

export type JennyAuthResult =
  | { ok: true }
  | { ok: false; reason: "denied" | "unavailable" };

async function accessToken(): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.access_token) return null;
  return data.session.access_token;
}

async function invokeAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase Auth is not configured");
  }

  const token = await accessToken();
  if (!token) throw new Error("No Supabase Auth session");

  const { data, error } = await supabase.functions.invoke(ACCESS_FUNCTION, {
    body: { action, ...payload },
    headers: { Authorization: `Bearer ${token}` },
  });
  if (error) throw new Error("Private access request failed");
  return data as T;
}

/** Authenticates the sole Jenny account through Supabase Auth email/password. */
export async function authenticateJenny(
  email: string,
  password: string
): Promise<JennyAuthResult> {
  if (!isSupabaseConfigured || !supabase) return { ok: false, reason: "unavailable" };
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password || password.length > 256) {
    return { ok: false, reason: "denied" };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });
    if (error) {
      await supabase.auth.signOut({ scope: "local" });
      return { ok: false, reason: error.status === 400 ? "denied" : "unavailable" };
    }

    if (!(await verifyJennySession())) {
      await supabase.auth.signOut({ scope: "local" });
      return { ok: false, reason: "denied" };
    }
    return { ok: true };
  } catch {
    await supabase.auth.signOut({ scope: "local" });
    return { ok: false, reason: "unavailable" };
  }
}

/** Validates the Supabase JWT and allowed Jenny email in the Edge Function. */
export async function verifyJennySession(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const result = await invokeAccess<VerificationResponse>("verify");
    if (result.valid === true && result.user?.id && result.user.email) return true;
  } catch {
    // Fail closed and remove a stale or unauthorized local Supabase session.
  }
  await supabase.auth.signOut({ scope: "local" });
  return false;
}

export async function clearJennySession(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut({ scope: "local" });
}

/** Invokes a Jenny-only action with the current Supabase Auth access token. */
export async function invokeJennyAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  return invokeAccess<T>(action, payload);
}
