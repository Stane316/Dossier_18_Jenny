import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

/**
 * Supabase client — public publishable/anon key in the browser; server secrets
 * stay inside Edge Functions. Supabase remains the data/storage transport for
 * contributions; the temporary Jenny entry gate is implemented separately.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!config.supabase.isConfigured) return null;
  if (client) return client;

  try {
    client = createClient(config.supabase.url!, config.supabase.publishableKey!, {
      auth: {
        // Supabase Auth is intentionally not part of the temporary birthday flow.
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
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
