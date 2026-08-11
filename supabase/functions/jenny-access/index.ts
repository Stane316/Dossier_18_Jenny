import { createClient } from "npm:@supabase/supabase-js@2.109.0";

const encoder = new TextEncoder();
const SESSION_AUDIENCE = "jenny-private-experience";
const SESSION_VERSION = 1;
const MAX_SESSION_TTL_SECONDS = 4 * 60 * 60;
const PRIVATE_MEDIA_TTL_SECONDS = 10 * 60;
const MEDIA_BUCKET = "birthday-media";

type SessionPayload = {
  aud: string;
  exp: number;
  iat: number;
  jti: string;
  v: number;
};

type PrivateMedia = {
  type: "photo" | "video";
  url: string;
  mime_type: string;
};

function configuredOrigins(): Set<string> {
  return new Set(
    (Deno.env.get("JENNY_ALLOWED_ORIGINS") ?? "")
      .split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean)
  );
}

function requestOrigin(req: Request): string | null {
  return req.headers.get("Origin")?.replace(/\/$/, "") ?? null;
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  return configuredOrigins().has(origin);
}

function responseHeaders(origin: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-jenny-session",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    Vary: "Origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };
  if (origin && isAllowedOrigin(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(
  body: Record<string, unknown>,
  status: number,
  origin: string | null
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(origin),
  });
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("Invalid encoding");
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/") + padding);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function encodeJson(value: Record<string, unknown>): string {
  return bytesToBase64Url(encoder.encode(JSON.stringify(value)));
}

function decodeJson<T>(value: string): T {
  return JSON.parse(new TextDecoder().decode(base64UrlToBytes(value))) as T;
}

async function hmac(value: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let different = 0;
  for (let index = 0; index < left.length; index += 1) {
    different |= left[index] ^ right[index];
  }
  return different === 0;
}

async function constantTimeStringEqual(left: string, right: string): Promise<boolean> {
  const [leftHash, rightHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  return timingSafeEqual(new Uint8Array(leftHash), new Uint8Array(rightHash));
}

function sessionTtlSeconds(): number {
  const configured = Number(Deno.env.get("JENNY_SESSION_TTL_SECONDS"));
  if (!Number.isFinite(configured)) return MAX_SESSION_TTL_SECONDS;
  return Math.min(MAX_SESSION_TTL_SECONDS, Math.max(5 * 60, Math.floor(configured)));
}

async function issueSession(signingSecret: string): Promise<{
  token: string;
  expiresAt: number;
}> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    aud: SESSION_AUDIENCE,
    exp: now + sessionTtlSeconds(),
    iat: now,
    jti: crypto.randomUUID(),
    v: SESSION_VERSION,
  };
  const encodedPayload = encodeJson(payload);
  const signature = bytesToBase64Url(await hmac(encodedPayload, signingSecret));
  return { token: `${encodedPayload}.${signature}`, expiresAt: payload.exp * 1000 };
}

async function validateSession(
  token: string | null,
  signingSecret: string
): Promise<SessionPayload | null> {
  if (!token || token.length > 2048) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  try {
    const expectedSignature = await hmac(parts[0], signingSecret);
    const receivedSignature = base64UrlToBytes(parts[1]);
    if (!timingSafeEqual(expectedSignature, receivedSignature)) return null;

    const payload = decodeJson<SessionPayload>(parts[0]);
    const now = Math.floor(Date.now() / 1000);
    if (
      payload.aud !== SESSION_AUDIENCE ||
      payload.v !== SESSION_VERSION ||
      !Number.isInteger(payload.iat) ||
      !Number.isInteger(payload.exp) ||
      payload.iat > now + 60 ||
      payload.exp <= now ||
      payload.exp - payload.iat > MAX_SESSION_TTL_SECONDS
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function readServerConfig(): {
  accessCode: string;
  signingSecret: string;
  supabaseUrl: string;
  serviceRoleKey: string;
} | null {
  const accessCode = Deno.env.get("JENNY_ACCESS_CODE") ?? "";
  const signingSecret = Deno.env.get("JENNY_SESSION_SECRET") ?? "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (
    accessCode.length < 24 ||
    signingSecret.length < 32 ||
    !supabaseUrl ||
    !serviceRoleKey
  ) {
    return null;
  }
  return { accessCode, signingSecret, supabaseUrl, serviceRoleKey };
}

async function listContributions(
  status: "approved" | "pending",
  supabaseUrl: string,
  serviceRoleKey: string
): Promise<{ data?: unknown[]; error?: string }> {
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await admin
    .from("contributions")
    .select(
      `
        id, message, created_at,
        contributors ( name ),
        media_assets ( type, storage_path, mime_type )
      `
    )
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error || !data) return { error: "Private records are unavailable" };

  const sanitized = await Promise.all(
    data.map(async (row) => {
      const media: PrivateMedia[] = [];
      for (const asset of row.media_assets ?? []) {
        if (asset.type !== "photo" && asset.type !== "video") continue;
        const { data: signed, error: signedError } = await admin.storage
          .from(MEDIA_BUCKET)
          .createSignedUrl(asset.storage_path, PRIVATE_MEDIA_TTL_SECONDS);
        if (!signedError && signed?.signedUrl) {
          media.push({ type: asset.type, url: signed.signedUrl, mime_type: asset.mime_type });
        }
      }
      return {
        id: row.id,
        message: row.message,
        created_at: row.created_at,
        contributor_name: row.contributors?.name ?? "Témoin",
        media,
      };
    })
  );

  return { data: sanitized };
}

Deno.serve(async (req: Request) => {
  const origin = requestOrigin(req);

  if (!isAllowedOrigin(origin)) {
    return json({ error: "Origin not allowed" }, 403, null);
  }
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, origin);
  }

  const config = readServerConfig();
  if (!config || configuredOrigins().size === 0) {
    return json({ error: "Private access service is unavailable" }, 503, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request" }, 400, origin);
  }

  const action = typeof body.action === "string" ? body.action : "";

  if (action === "authenticate") {
    const candidate = typeof body.accessCode === "string" ? body.accessCode.trim() : "";
    const accepted =
      candidate.length > 0 &&
      candidate.length <= 256 &&
      (await constantTimeStringEqual(candidate, config.accessCode));
    if (!accepted) return json({ ok: false }, 200, origin);

    const session = await issueSession(config.signingSecret);
    return json({ ok: true, session: session.token, expiresAt: session.expiresAt }, 200, origin);
  }

  const session = await validateSession(
    req.headers.get("X-Jenny-Session"),
    config.signingSecret
  );
  if (!session) {
    if (action === "verify") return json({ valid: false }, 200, origin);
    return json({ error: "Private session required" }, 401, origin);
  }

  if (action === "verify") {
    return json({ valid: true, expiresAt: session.exp * 1000 }, 200, origin);
  }

  if (action === "list-contributions") {
    const status = body.status === "pending" ? "pending" : "approved";
    const result = await listContributions(status, config.supabaseUrl, config.serviceRoleKey);
    if (result.error) return json({ error: result.error }, 500, origin);
    return json({ contributions: result.data ?? [] }, 200, origin);
  }

  if (action === "approve-contribution") {
    const contributionId =
      typeof body.contributionId === "string" ? body.contributionId.trim() : "";
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(contributionId)) {
      return json({ error: "Invalid contribution" }, 400, origin);
    }

    const admin = createClient(config.supabaseUrl, config.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await admin
      .from("contributions")
      .update({ status: "approved" })
      .eq("id", contributionId)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();

    if (error) return json({ error: "Contribution could not be approved" }, 500, origin);
    if (!data) return json({ error: "Pending contribution not found" }, 404, origin);
    return json({ ok: true }, 200, origin);
  }

  return json({ error: "Unknown action" }, 400, origin);
});
