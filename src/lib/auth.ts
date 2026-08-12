import { config } from "./config";

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
    super("Jenny private data request failed");
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

function classifyAccessFailure(status?: number, code?: string): JennyAuthFailureReason {
  if (
    code === "ORIGIN_NOT_ALLOWED" ||
    code === "SERVICE_NOT_CONFIGURED" ||
    status === 404 ||
    status === 503
  ) {
    return "configuration";
  }
  if (
    code === "DATA_TOKEN_REQUIRED" ||
    code === "ACCESS_DENIED" ||
    status === 401 ||
    status === 403
  ) {
    return "denied";
  }
  return "unavailable";
}

async function invokeAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  const { url, publishableKey, isConfigured } = config.supabase;
  const dataToken = config.jennyGate.dataToken;
  if (!isConfigured || !url || !publishableKey || !config.jennyGate.isDataConfigured || !dataToken) {
    throw new JennyAccessRequestError("configuration");
  }
  if (!hasValidTemporaryGateSession()) {
    throw new JennyAccessRequestError("denied");
  }

  let response: Response;
  try {
    response = await fetch(`${url}/functions/v1/${ACCESS_FUNCTION}`, {
      method: "POST",
      headers: {
        apikey: publishableKey,
        "Content-Type": "application/json",
        "x-jenny-data-token": dataToken,
      },
      body: JSON.stringify({ action, ...payload }),
    });
  } catch {
    throw new JennyAccessRequestError("unavailable");
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new JennyAccessRequestError(
      response.ok ? "unavailable" : classifyAccessFailure(response.status),
      response.status
    );
  }

  if (!response.ok) {
    const code =
      data && typeof data === "object" && "code" in data &&
      typeof (data as { code?: unknown }).code === "string"
        ? (data as { code: string }).code
        : undefined;
    throw new JennyAccessRequestError(
      classifyAccessFailure(response.status, code),
      response.status
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
}

/**
 * Invokes private Supabase data actions after the local gate is valid. The
 * temporary data token is sent only to jenny-access; no Supabase Auth session
 * or JWT is created. The token is client-visible and is not production-grade
 * authorization.
 */
export async function invokeJennyAccess<T>(
  action: string,
  payload: Record<string, unknown> = {}
): Promise<T> {
  return invokeAccess<T>(action, payload);
}
