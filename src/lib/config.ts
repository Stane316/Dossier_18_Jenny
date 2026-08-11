/**
 * Centralized environment & app config
 * - Exposes only VITE_ vars (safe for client)
 * - Provides feature flags for Supabase availability
 */

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function isHttpUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || (url.protocol === "http:" && url.hostname === "localhost");
  } catch {
    return false;
  }
}

const supabaseUrl = clean(import.meta.env.VITE_SUPABASE_URL);
// Prefer Supabase's current publishable key name, while retaining compatibility
// with projects that still expose the legacy anon key variable.
const supabaseKey =
  clean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ??
  clean(import.meta.env.VITE_SUPABASE_ANON_KEY);
const configuredSiteUrl = clean(import.meta.env.VITE_SITE_URL);

export const config = {
  supabase: {
    url: supabaseUrl,
    publishableKey: supabaseKey,
    isConfigured: isHttpUrl(supabaseUrl) && Boolean(supabaseKey),
  },
  siteUrl:
    configuredSiteUrl ??
    (typeof window !== "undefined" ? window.location.origin : ""),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;

/** Storage bucket names — must match Supabase dashboard */
export const STORAGE_BUCKETS = {
  media: "birthday-media",
} as const;

/** Contribution limits — Phase 7 §10.3 + §36 validation */
export const LIMITS = {
  messageMaxChars: 2000,
  photoMaxBytes: 10 * 1024 * 1024, // 10 MB
  videoMaxBytes: 100 * 1024 * 1024, // 100 MB
  photoAccept: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  videoAccept: ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"],
} as const;
