import { createClient } from "npm:@supabase/supabase-js@2.109.0";

function configuredOrigins(): Set<string> {
  return new Set(
    (Deno.env.get("SITE_ALLOWED_ORIGINS") ?? "")
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
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

const MEDIA_BUCKET = "birthday-media";
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60;
const encoder = new TextEncoder();
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PHOTO_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const VIDEO_MIMES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
]);

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "video/webm": "webm",
  "video/x-m4v": "m4v",
};

type MediaKind = "photo" | "video";

type RequestedMedia = {
  type: MediaKind;
  mimeType: string;
  sizeBytes: number;
};

type ReservedMedia = {
  id: string;
  type: MediaKind;
  storage_path: string;
  mime_type: string;
  size_bytes: number;
};

function serverConfig(): {
  supabaseUrl: string;
  serviceRoleKey: string;
  rateLimitSecret: string;
} | null {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const rateLimitSecret = Deno.env.get("CONTRIBUTION_RATE_LIMIT_SECRET") ?? "";
  if (!supabaseUrl || !serviceRoleKey || rateLimitSecret.length < 32) return null;
  return { supabaseUrl, serviceRoleKey, rateLimitSecret };
}

function normalizeMedia(value: unknown): RequestedMedia[] | null {
  if (!Array.isArray(value) || value.length > 2) return null;
  const media: RequestedMedia[] = [];
  const seen = new Set<MediaKind>();

  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const raw = item as Record<string, unknown>;
    const type = raw.type;
    const mimeType = raw.mimeType;
    const sizeBytes = raw.sizeBytes;
    if (
      (type !== "photo" && type !== "video") ||
      typeof mimeType !== "string" ||
      typeof sizeBytes !== "number" ||
      !Number.isSafeInteger(sizeBytes) ||
      seen.has(type)
    ) {
      return null;
    }

    const valid =
      type === "photo"
        ? PHOTO_MIMES.has(mimeType) && sizeBytes > 0 && sizeBytes <= 10 * 1024 * 1024
        : VIDEO_MIMES.has(mimeType) && sizeBytes > 0 && sizeBytes <= 100 * 1024 * 1024;
    if (!valid) return null;

    seen.add(type);
    media.push({ type, mimeType, sizeBytes });
  }
  return media;
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256Hex(value: string): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hmacHex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(value))
  );
  return Array.from(signature, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function requestAddress(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "address-unavailable"
  );
}

async function reserveSubmission(
  body: Record<string, unknown>,
  req: Request,
  origin: string | null,
  config: NonNullable<ReturnType<typeof serverConfig>>
): Promise<Response> {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const media = normalizeMedia(body.media);

  if (
    name.length < 1 ||
    name.length > 80 ||
    message.length > 2000 ||
    media === null ||
    (!message && media.length === 0)
  ) {
    return json({ error: "Contribution invalide" }, 400, origin);
  }

  const admin = createClient(config.supabaseUrl, config.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const fingerprint = await hmacHex(requestAddress(req), config.rateLimitSecret);
  const { data: allowed, error: rateError } = await admin.rpc("claim_contribution_slot", {
    p_fingerprint: fingerprint,
    p_limit: RATE_LIMIT_MAX,
    p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
  });
  if (rateError) return json({ error: "Service de contribution indisponible" }, 503, origin);
  if (allowed !== true) return json({ error: "Trop de tentatives — réessayez plus tard" }, 429, origin);

  const contributorId = crypto.randomUUID();
  const contributionId = crypto.randomUUID();
  const submissionToken = media.length > 0 ? randomToken() : null;
  const submissionTokenHash = submissionToken ? await sha256Hex(submissionToken) : null;

  const reserved: ReservedMedia[] = media.map((asset) => {
    const id = crypto.randomUUID();
    const folder = asset.type === "photo" ? "photos" : "videos";
    const extension = EXTENSIONS[asset.mimeType];
    return {
      id,
      type: asset.type,
      storage_path: `contributions/${contributionId}/${folder}/${id}.${extension}`,
      mime_type: asset.mimeType,
      size_bytes: asset.sizeBytes,
    };
  });

  const { error: createError } = await admin.rpc("create_contribution_submission", {
    p_contributor_id: contributorId,
    p_contribution_id: contributionId,
    p_name: name,
    p_message: message || null,
    p_submission_token_hash: submissionTokenHash,
    p_media: reserved,
  });
  if (createError) return json({ error: "La contribution n'a pas pu être créée" }, 500, origin);

  const uploads: Array<{
    id: string;
    type: MediaKind;
    path: string;
    token: string;
  }> = [];

  for (const asset of reserved) {
    const { data: signed, error: signedError } = await admin.storage
      .from(MEDIA_BUCKET)
      .createSignedUploadUrl(asset.storage_path);
    if (signedError || !signed?.token) {
      await admin.from("contributors").delete().eq("id", contributorId);
      return json({ error: "Le versement média n'a pas pu être préparé" }, 500, origin);
    }
    uploads.push({ id: asset.id, type: asset.type, path: asset.storage_path, token: signed.token });
  }

  return json(
    {
      contributionId,
      submissionToken,
      uploads,
      complete: uploads.length === 0,
    },
    200,
    origin
  );
}

async function finalizeSubmission(
  body: Record<string, unknown>,
  origin: string | null,
  config: NonNullable<ReturnType<typeof serverConfig>>
): Promise<Response> {
  const contributionId =
    typeof body.contributionId === "string" ? body.contributionId.trim() : "";
  const submissionToken =
    typeof body.submissionToken === "string" ? body.submissionToken.trim() : "";
  if (!UUID_PATTERN.test(contributionId) || submissionToken.length < 32 || submissionToken.length > 256) {
    return json({ error: "Finalisation invalide" }, 400, origin);
  }

  const admin = createClient(config.supabaseUrl, config.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const tokenHash = await sha256Hex(submissionToken);
  const { data: contribution, error } = await admin
    .from("contributions")
    .select(
      `
        id, submission_complete, submission_token_hash,
        media_assets ( id, storage_path, mime_type, size_bytes, upload_status )
      `
    )
    .eq("id", contributionId)
    .eq("submission_complete", false)
    .eq("submission_token_hash", tokenHash)
    .maybeSingle();

  if (error) return json({ error: "Finalisation indisponible" }, 503, origin);
  if (!contribution) return json({ error: "Contribution introuvable ou déjà finalisée" }, 404, origin);

  for (const asset of contribution.media_assets ?? []) {
    const slash = asset.storage_path.lastIndexOf("/");
    const folder = asset.storage_path.slice(0, slash);
    const fileName = asset.storage_path.slice(slash + 1);
    const { data: objects, error: listError } = await admin.storage
      .from(MEDIA_BUCKET)
      .list(folder, { limit: 10, search: fileName });
    if (listError) return json({ error: "Vérification média indisponible" }, 503, origin);

    const object = objects?.find((candidate) => candidate.name === fileName);
    const uploadedSize = Number(object?.metadata?.size);
    const uploadedMime = String(object?.metadata?.mimetype ?? "");
    if (!object || uploadedSize !== asset.size_bytes || uploadedMime !== asset.mime_type) {
      return json({ error: "Tous les médias n'ont pas encore été versés" }, 409, origin);
    }
  }

  const { data: finalized, error: finalizeError } = await admin.rpc(
    "finalize_contribution_submission",
    {
      p_contribution_id: contributionId,
      p_submission_token_hash: tokenHash,
    }
  );
  if (finalizeError) return json({ error: "La contribution n'a pas pu être finalisée" }, 500, origin);
  if (finalized !== true) return json({ error: "Finalisation refusée" }, 409, origin);
  return json({ ok: true }, 200, origin);
}

Deno.serve(async (req: Request) => {
  const origin = requestOrigin(req);
  if (!isAllowedOrigin(origin)) return json({ error: "Origin not allowed" }, 403, null);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(origin) });
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);

  const config = serverConfig();
  if (!config || configuredOrigins().size === 0) {
    return json({ error: "Service de contribution indisponible" }, 503, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Requête invalide" }, 400, origin);
  }

  if (body.action === "create") return reserveSubmission(body, req, origin, config);
  if (body.action === "finalize") return finalizeSubmission(body, origin, config);
  return json({ error: "Action inconnue" }, 400, origin);
});
