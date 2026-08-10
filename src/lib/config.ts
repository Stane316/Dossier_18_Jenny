/**
 * Centralized environment & app config
 * - Exposes only VITE_ vars (safe for client)
 * - Provides feature flags for Supabase availability
 */

export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string | undefined,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
    isConfigured: Boolean(
      import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
    ),
  },
  jenny: {
    token: (import.meta.env.VITE_JENNY_TOKEN as string | undefined) ?? "JENNY_18_0813",
    // Fallback token si non configuré — reste privé mais documenté
  },
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? window.location.origin,
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
