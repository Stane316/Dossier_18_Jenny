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

const PRIVATE_MEDIA_TTL_SECONDS = 10 * 60;
const MEDIA_BUCKET = "birthday-media";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type PrivateMedia = {
  type: "photo" | "video";
  url: string;
  mime_type: string;
};

function serverConfig(): {
  allowedEmail: string;
  supabaseUrl: string;
  serviceRoleKey: string;
} | null {
  const allowedEmail = (Deno.env.get("JENNY_ALLOWED_EMAIL") ?? "").trim().toLowerCase();
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!allowedEmail || !supabaseUrl || !serviceRoleKey) return null;
  return { allowedEmail, supabaseUrl, serviceRoleKey };
}

function bearerToken(req: Request): string | null {
  const authorization = req.headers.get("Authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

async function authorizeJenny(
  req: Request,
  supabaseUrl: string,
  serviceRoleKey: string,
  allowedEmail: string
) {
  const token = bearerToken(req);
  if (!token) return null;

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await admin.auth.getUser(token);
  const user = data.user;
  if (
    error ||
    !user ||
    !user.email ||
    user.email.toLowerCase() !== allowedEmail ||
    !user.email_confirmed_at
  ) {
    return null;
  }
  return { admin, user };
}

async function listContributions(
  status: "approved" | "pending",
  admin: ReturnType<typeof createClient>
): Promise<{ data?: unknown[]; error?: string }> {
  const { data, error } = await admin
    .from("contributions")
    .select(
      `
        id, message, created_at,
        contributors ( name ),
        media_assets ( type, storage_path, mime_type, upload_status )
      `
    )
    .eq("status", status)
    .eq("submission_complete", true)
    .order("created_at", { ascending: false });

  if (error || !data) return { error: "Private records are unavailable" };

  const sanitized = await Promise.all(
    data.map(async (row) => {
      const media: PrivateMedia[] = [];
      for (const asset of row.media_assets ?? []) {
        if (
          asset.upload_status !== "ready" ||
          (asset.type !== "photo" && asset.type !== "video")
        ) {
          continue;
        }
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
  if (!isAllowedOrigin(origin)) return json({ error: "Origin not allowed" }, 403, null);
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(origin) });
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);

  const config = serverConfig();
  if (!config || configuredOrigins().size === 0) {
    return json({ error: "Private access service is unavailable" }, 503, origin);
  }

  const authorized = await authorizeJenny(
    req,
    config.supabaseUrl,
    config.serviceRoleKey,
    config.allowedEmail
  );
  if (!authorized) return json({ error: "Jenny authentication required" }, 401, origin);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request" }, 400, origin);
  }

  if (body.action === "verify") {
    return json(
      {
        valid: true,
        user: {
          id: authorized.user.id,
          email: authorized.user.email,
        },
      },
      200,
      origin
    );
  }

  if (body.action === "list-contributions") {
    const status = body.status === "pending" ? "pending" : "approved";
    const result = await listContributions(status, authorized.admin);
    if (result.error) return json({ error: result.error }, 500, origin);
    return json({ contributions: result.data ?? [] }, 200, origin);
  }

  if (body.action === "approve-contribution") {
    const contributionId =
      typeof body.contributionId === "string" ? body.contributionId.trim() : "";
    if (!UUID_PATTERN.test(contributionId)) {
      return json({ error: "Invalid contribution" }, 400, origin);
    }

    const { data, error } = await authorized.admin
      .from("contributions")
      .update({ status: "approved" })
      .eq("id", contributionId)
      .eq("status", "pending")
      .eq("submission_complete", true)
      .select("id")
      .maybeSingle();

    if (error) return json({ error: "Contribution could not be approved" }, 500, origin);
    if (!data) return json({ error: "Pending contribution not found" }, 404, origin);
    return json({ ok: true }, 200, origin);
  }

  return json({ error: "Unknown action" }, 400, origin);
});
