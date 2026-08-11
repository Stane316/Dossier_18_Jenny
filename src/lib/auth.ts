import { isSupabaseConfigured, supabase } from "./supabase";

const ACCESS_FUNCTION = "jenny-access";
const SESSION_KEY = "jenny:private-session:v1";

type StoredSession = {
  token: string;
  expiresAt: number;
};

type AuthenticationResponse = {
  ok: boolean;
  session?: string;
  expiresAt?: number;
};

type VerificationResponse = {
  valid: boolean;
  expiresAt?: number;
};

export type JennyAuthResult =
  | { ok: true }
  | { ok: false; reason: "denied" | "unavailable" };

function clearStoredSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage can be disabled. The route remains closed in that case.
  }
}

function readStoredSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSession>;
    if (
      typeof parsed.token !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= Date.now()
    ) {
      clearStoredSession();
      return null;
    }
    return { token: parsed.token, expiresAt: parsed.expiresAt };
  } catch {
    clearStoredSession();
    return null;
  }
}

function saveSession(session: StoredSession): boolean {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    clearStoredSession();
    return false;
  }
}

async function invokeAccess<T>(
  action: string,
  payload: Record<string, unknown> = {},
  sessionToken?: string
): Promise<T> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Private access service is not configured");
  }

  const { data, error } = await supabase.functions.invoke(ACCESS_FUNCTION, {
    body: { action, ...payload },
    headers: sessionToken ? { "X-Jenny-Session": sessionToken } : undefined,
  });

  if (error) throw new Error("Private access request failed");
  return data as T;
}

/**
 * Exchanges the private access code for a short-lived server-signed session.
 * The original code is never persisted in browser storage.
 */
export async function authenticateJenny(accessCode: string): Promise<JennyAuthResult> {
  const normalized = accessCode.trim();
  if (!normalized || normalized.length > 256) return { ok: false, reason: "denied" };

  try {
    const result = await invokeAccess<AuthenticationResponse>("authenticate", {
      accessCode: normalized,
    });
    if (
      !result.ok ||
      typeof result.session !== "string" ||
      typeof result.expiresAt !== "number" ||
      result.expiresAt <= Date.now()
    ) {
      clearStoredSession();
      return { ok: false, reason: "denied" };
    }

    if (!saveSession({ token: result.session, expiresAt: result.expiresAt })) {
      return { ok: false, reason: "unavailable" };
    }
    return { ok: true };
  } catch {
    clearStoredSession();
    return { ok: false, reason: "unavailable" };
  }
}

/** Verifies the current tab-scoped session with the Edge Function. */
export async function verifyJennySession(): Promise<boolean> {
  const session = readStoredSession();
  if (!session) return false;

  try {
    const result = await invokeAccess<VerificationResponse>("verify", {}, session.token);
    if (!result.valid || typeof result.expiresAt !== "number" || result.expiresAt <= Date.now()) {
      clearStoredSession();
      return false;
    }
    return saveSession({ token: session.token, expiresAt: result.expiresAt });
  } catch {
    clearStoredSession();
    return false;
  }
}

/** Local presence check for private UI labels only; route access is always verified server-side. */
export function hasJennySession(): boolean {
  return readStoredSession() !== null;
}

export function clearJennySession(): void {
  clearStoredSession();
}

/** Invokes a protected Edge Function action with the current bounded session. */
export async function invokeJennyAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const session = readStoredSession();
  if (!session) throw new Error("No private session");

  return invokeAccess<T>(action, payload, session.token);
}
