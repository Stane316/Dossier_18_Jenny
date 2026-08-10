import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

/**
 * Supabase client — isolated foundation layer (Phase B)
 * - Returns null if env not configured → fallback to localStorage (demo mode)
 * - Never expose service_role key client-side
 */

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!config.supabase.isConfigured) return null;
  if (_client) return _client;
  _client = createClient(config.supabase.url!, config.supabase.anonKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

export const supabase = getSupabase();

/** Helper to check if backend is available */
export const isSupabaseConfigured = config.supabase.isConfigured;

/** Database types — kept minimal, mirrors Phase 7 §07 */
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
  created_at: string;
};

export type DbMediaAsset = {
  id: string;
  contribution_id: string;
  type: "photo" | "video";
  storage_path: string;
  mime_type: string;
  size_bytes: number;
  created_at: string;
};
