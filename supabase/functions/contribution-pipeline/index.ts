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
// Enough for the acceptance matrix and friends sharing one household/network,
// while still throttling automated submission bursts per address.
const RATE_LIMIT_MAX = 20;
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

const MIME_ALIASES: Record<string, string> = {
  "image/jpg": "image/jpeg",
  "image/pjpeg": "image/jpeg",
  "image/heic-sequence": "image/heic",
  "image/heif-sequence": "image/heif",
  "video/mov": "video/quicktime",
  "video/m4v": "video/x-m4v",
};

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

function serverSecretKey(): string {
  try {
    const keys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}") as Record<
      string,
      unknown
    >;
    const modernKey = typeof keys.default === "string" ? keys.default.trim() : "";
    if (modernKey) return modernKey;
  } catch {
    // Fall through to the legacy hosted-project key.
  }
  return (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "").trim();
}

function serverConfig(): {
  supabaseUrl: string;
  serviceRoleKey: string;
  rateLimitSecret: string;
} | null {
  const supabaseUrl = (Deno.env.get("SUPABASE_URL") ?? "").trim();
  const serviceRoleKey = serverSecretKey();
  const rateLimitSecret = (Deno.env.get("CONTRIBUTION_RATE_LIMIT_SECRET") ?? "").trim();
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
    const requestedMime = raw.mimeType;
    const sizeBytes = raw.sizeBytes;
    if (
      (type !== "photo" && type !== "video") ||
      typeof requestedMime !== "string" ||
      typeof sizeBytes !== "number" ||
      !Number.isSafeInteger(sizeBytes) ||
      seen.has(type)
    ) {
      return null;
    }

    const rawMime = requestedMime.trim().toLowerCase().split(";", 1)[0];
    const mimeType = MIME_ALIASES[rawMime] ?? rawMime;
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
    return json(
      { error: "Ajoute un nom et au moins un message, une photo ou une vidéo valide.", code: "INVALID_CONTRIBUTION" },
      400,
      origin
    );
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
  if (rateError) {
    console.error("[contribution-pipeline] rate-limit RPC failed", { code: rateError.code });
    return json(
      { error: "Service de contribution indisponible", code: "RATE_LIMIT_UNAVAILABLE" },
      503,
      origin
    );
  }
  if (allowed !== true) {
    return json(
      { error: "Trop de tentatives — réessayez plus tard", code: "RATE_LIMITED" },
      429,
      origin
    );
  }

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
  if (createError) {
    console.error("[contribution-pipeline] submission RPC failed", { code: createError.code });
    return json(
      { error: "La contribution n'a pas pu être enregistrée", code: "CREATE_FAILED" },
      500,
      origin
    );
  }

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
      console.error("[contribution-pipeline] signed upload creation failed", {
        code: signedError?.name,
        mediaType: asset.type,
      });
      await admin.from("contributors").delete().eq("id", contributorId);
      return json(
        { error: "Le versement média n'a pas pu être préparé", code: "UPLOAD_PREPARATION_FAILED" },
        500,
        origin
      );
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
    return json({ error: "Finalisation invalide", code: "INVALID_FINALIZATION" }, 400, origin);
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
    .eq("submission_token_hash", tokenHash)
    .maybeSingle();

  if (error) {
    console.error("[contribution-pipeline] finalization lookup failed", { code: error.code });
    return json({ error: "Finalisation indisponible", code: "FINALIZATION_UNAVAILABLE" }, 503, origin);
  }
  if (!contribution) {
    return json(
      { error: "Contribution introuvable ou jeton de reprise invalide", code: "CONTRIBUTION_NOT_FOUND" },
      404,
      origin
    );
  }
  if (contribution.submission_complete === true) {
    return json({ ok: true, alreadyComplete: true }, 200, origin);
  }

  for (const asset of contribution.media_assets ?? []) {
    const slash = asset.storage_path.lastIndexOf("/");
    const folder = asset.storage_path.slice(0, slash);
    const fileName = asset.storage_path.slice(slash + 1);
    const { data: objects, error: listError } = await admin.storage
      .from(MEDIA_BUCKET)
      .list(folder, { limit: 10, search: fileName });
    if (listError) {
      console.error("[contribution-pipeline] media verification failed", {
        code: listError.name,
        mediaId: asset.id,
      });
      return json(
        { error: "Vérification média indisponible", code: "MEDIA_VERIFICATION_UNAVAILABLE" },
        503,
        origin
      );
    }

    const object = objects?.find((candidate) => candidate.name === fileName);
    const uploadedSize = Number(object?.metadata?.size);
    const uploadedMime = String(
      object?.metadata?.mimetype ?? object?.metadata?.contentType ?? ""
    ).toLowerCase().split(";", 1)[0];
    const expectedMime = String(asset.mime_type).toLowerCase();
    if (!object || uploadedSize !== asset.size_bytes || uploadedMime !== expectedMime) {
      return json(
        { error: "Tous les médias n'ont pas encore été versés", code: "MEDIA_INCOMPLETE" },
        409,
        origin
      );
    }
  }

  const { data: finalized, error: finalizeError } = await admin.rpc(
    "finalize_contribution_submission",
    {
      p_contribution_id: contributionId,
      p_submission_token_hash: tokenHash,
    }
  );
  if (finalizeError) {
    console.error("[contribution-pipeline] finalization RPC failed", { code: finalizeError.code });
    return json(
      { error: "La contribution n'a pas pu être finalisée", code: "FINALIZATION_FAILED" },
      500,
      origin
    );
  }
  if (finalized !== true) {
    return json({ error: "Finalisation refusée", code: "FINALIZATION_REFUSED" }, 409, origin);
  }
  return json({ ok: true }, 200, origin);
}

Deno.serve(async (req: Request) => {
  const origin = requestOrigin(req);
  if (!isAllowedOrigin(origin)) {
    console.warn("[contribution-pipeline] request rejected", {
      reason: "origin_not_allowed",
      origin,
    });
    return json({ error: "Origin not allowed", code: "ORIGIN_NOT_ALLOWED" }, 403, null);
  }
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" }, 405, origin);
  }

  const config = serverConfig();
  const originCount = configuredOrigins().size;
  if (!config || originCount === 0) {
    console.error("[contribution-pipeline] configuration unavailable", {
      supabaseUrlConfigured: Boolean((Deno.env.get("SUPABASE_URL") ?? "").trim()),
      serverKeyConfigured: Boolean(serverSecretKey()),
      rateLimitSecretConfigured:
        (Deno.env.get("CONTRIBUTION_RATE_LIMIT_SECRET") ?? "").length >= 32,
      allowedOriginCount: originCount,
    });
    return json(
      { error: "Service de contribution indisponible", code: "SERVICE_NOT_CONFIGURED" },
      503,
      origin
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ error: "Requête invalide", code: "INVALID_REQUEST" }, 400, origin);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Requête invalide", code: "INVALID_REQUEST" }, 400, origin);
  }

  if (body.action === "create") return reserveSubmission(body, req, origin, config);
  if (body.action === "finalize") return finalizeSubmission(body, origin, config);
  return json({ error: "Action inconnue", code: "UNKNOWN_ACTION" }, 400, origin);
});
