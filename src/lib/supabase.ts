import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

/**
 * Supabase client — public publishable/anon key in the browser; server secrets
 * stay inside Edge Functions. Jenny's Auth session is kept in sessionStorage
 * and refreshed by supabase-js.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!config.supabase.isConfigured) return null;
  if (client) return client;

  try {
    client = createClient(config.supabase.url!, config.supabase.publishableKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storage: typeof window !== "undefined" ? window.sessionStorage : undefined,
      },
    });
  } catch {
    // Fail closed if a malformed public URL/key reaches the production bundle.
    client = null;
  }
  return client;
}

export const supabase = getSupabase();
export const isSupabaseConfigured = config.supabase.isConfigured && Boolean(supabase);

export type DbContributor = {
  id: string;
  name: string;
  link?: string | null;
  created_at: string;
};

export type DbContribution = {
  id: string;
  contributor_id: string;
  message?: string | null;
  status: "pending" | "approved" | "rejected" | "archived";
  submission_complete: boolean;
  created_at: string;
};

export type DbMediaAsset = {
  id: string;
  contribution_id: string;
  type: "photo" | "video";
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  upload_status: "pending" | "ready";
  created_at: string;
};
