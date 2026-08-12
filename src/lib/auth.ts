import { config } from "./config";
import { isSupabaseConfigured, supabase } from "./supabase";

const ACCESS_FUNCTION = "jenny-access";
const TEMPORARY_GATE_SESSION_KEY = "jenny-temporary-gate-v1";
const TEMPORARY_GATE_SESSION_MS = 12 * 60 * 60 * 1000;

type TemporaryGateSession = {
  version: 1;
  email: string;
  expiresAt: number;
};

export type JennyAuthFailureReason =
  | "denied"
  | "configuration"
  | "unavailable";

export type JennyAuthResult =
  | { ok: true }
  | { ok: false; reason: JennyAuthFailureReason };

class JennyAccessRequestError extends Error {
  constructor(
    readonly reason: JennyAuthFailureReason,
    readonly status?: number
  ) {
    super("Jenny private access request failed");
    this.name = "JennyAccessRequestError";
  }
}

function gateStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function removeTemporaryGateSession(): void {
  try {
    gateStorage()?.removeItem(TEMPORARY_GATE_SESSION_KEY);
  } catch {
    // A blocked browser storage API is treated as an unavailable local gate.
  }
}

function storeTemporaryGateSession(email: string): boolean {
  const storage = gateStorage();
  if (!storage) return false;

  const session: TemporaryGateSession = {
    version: 1,
    email,
    expiresAt: Date.now() + TEMPORARY_GATE_SESSION_MS,
  };

  try {
    storage.setItem(TEMPORARY_GATE_SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

function hasValidTemporaryGateSession(): boolean {
  const expectedEmail = config.jennyGate.email;
  const storage = gateStorage();
  if (!config.jennyGate.isConfigured || !expectedEmail || !storage) return false;

  try {
    const raw = storage.getItem(TEMPORARY_GATE_SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw) as Partial<TemporaryGateSession>;
    const valid =
      session.version === 1 &&
      session.email === expectedEmail &&
      typeof session.expiresAt === "number" &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now();

    if (!valid) storage.removeItem(TEMPORARY_GATE_SESSION_KEY);
    return valid;
  } catch {
    removeTemporaryGateSession();
    return false;
  }
}

async function safeLocalSupabaseSignOut(): Promise<void> {
  if (!supabase) return;
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    // Supabase Auth is not required by the temporary local gate.
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
  const source = response ?? (context instanceof Response ? context : undefined);
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
  if (
    code === "ORIGIN_NOT_ALLOWED" ||
    code === "SERVICE_NOT_CONFIGURED" ||
    status === 403 ||
    status === 404 ||
    status === 503
  ) {
    return "configuration";
  }
  if (
    code === "EMAIL_UNCONFIRMED" ||
    code === "ACCESS_DENIED" ||
    code === "AUTH_REQUIRED" ||
    status === 401
  ) {
    return "denied";
  }
  return "unavailable";
}

async function invokeAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  if (!isSupabaseConfigured || !supabase) {
    throw new JennyAccessRequestError("configuration");
  }

  const token = await accessToken();
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

/**
 * Temporary birthday gate. This compares build-time client values locally and
 * is intentionally not real authentication: both values are recoverable from
 * the browser bundle. The password itself is never copied to sessionStorage.
 */
export async function authenticateJenny(
  email: string,
  password: string
): Promise<JennyAuthResult> {
  const expectedEmail = config.jennyGate.email;
  const expectedPassword = config.jennyGate.password;
  if (!config.jennyGate.isConfigured || !expectedEmail || !expectedPassword) {
    removeTemporaryGateSession();
    return { ok: false, reason: "configuration" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (
    normalizedEmail !== expectedEmail ||
    password !== expectedPassword ||
    password.length > 256
  ) {
    removeTemporaryGateSession();
    return { ok: false, reason: "denied" };
  }

  if (!storeTemporaryGateSession(expectedEmail)) {
    return { ok: false, reason: "unavailable" };
  }
  return { ok: true };
}

/** Checks only the temporary per-tab browser gate; no network call is made. */
export async function verifyJennySession(): Promise<boolean> {
  return hasValidTemporaryGateSession();
}

export async function clearJennySession(): Promise<void> {
  removeTemporaryGateSession();
  // Also clear any obsolete local Supabase Auth session without making it a
  // dependency of logout or of the temporary gate.
  await safeLocalSupabaseSignOut();
}

/**
 * Legacy Jenny-only Supabase data actions (list/moderate contributions).
 * This is not used to enter /jenny/experience and remains separate from the
 * temporary local gate while the contributor backend is stabilized.
 */
export async function invokeJennyAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  return invokeAccess<T>(action, payload);
}
