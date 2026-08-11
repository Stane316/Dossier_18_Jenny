import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

/**
 * Supabase client — public anon key in the browser, service_role only in Edge Functions.
 * Jenny's Supabase Auth session is stored in sessionStorage and refreshed by supabase-js.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!config.supabase.isConfigured) return null;
  if (client) return client;

  client = createClient(config.supabase.url!, config.supabase.anonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: typeof window !== "undefined" ? window.sessionStorage : undefined,
    },
  });
  return client;
}

export const supabase = getSupabase();
export const isSupabaseConfigured = config.supabase.isConfigured;

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
