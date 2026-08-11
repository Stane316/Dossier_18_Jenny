/**
 * Local demo persistence and signed Supabase Storage uploads.
 * Public clients never choose a Storage path and cannot upload without a server-issued token.
 */
import type { ContributionRecord } from "../types";
import type { ContributionUploadPlan } from "./contributions";
import { supabase, isSupabaseConfigured } from "./supabase";
import { STORAGE_BUCKETS } from "./config";

const LOCAL_KEY = "jenny:contributions";

/** Local fallback only — used when Supabase is not configured. */
export function saveLocalContribution(record: ContributionRecord): void {
  try {
    const existing = loadLocalContributions();
    existing.unshift(record);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
  } catch {
    // Demo persistence is best-effort only.
  }
}

export function loadLocalContributions(): ContributionRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearLocalContributions(): void {
  localStorage.removeItem(LOCAL_KEY);
}

export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokePreviewUrl(url: string | null | undefined): void {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}

async function uploadSignedAsset(
  upload: ContributionUploadPlan,
  file: File,
  onProgress?: (percentage: number) => void
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error("Supabase non configuré");

  let percentage = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  if (onProgress) {
    timer = setInterval(() => {
      percentage = Math.min(90, percentage + Math.random() * 12 + 4);
      onProgress(Math.floor(percentage));
    }, 180);
  }

  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.media)
      .uploadToSignedUrl(upload.path, upload.token, file, {
        contentType: file.type,
      });
    if (error) throw new Error(error.message);
    onProgress?.(100);
  } finally {
    if (timer) clearInterval(timer);
  }
}

/** Uploads only the server-reserved photo/video paths using their one-use signed tokens. */
export async function uploadContributionMedia(
  uploads: ContributionUploadPlan[],
  photo: File | null,
  video: File | null,
  onProgress?: (percentage: number) => void,
  onAssetUploaded?: (assetId: string) => void,
  completedAssetIds: ReadonlySet<string> = new Set()
): Promise<void> {
  const pending = uploads.filter((upload) => !completedAssetIds.has(upload.id));
  if (pending.length === 0) {
    onProgress?.(100);
    return;
  }

  let completed = 0;
  for (const upload of pending) {
    const file = upload.type === "photo" ? photo : video;
    if (!file) throw new Error(`Fichier ${upload.type} manquant`);

    await uploadSignedAsset(upload, file, (assetProgress) => {
      const totalProgress = ((completed + assetProgress / 100) / pending.length) * 100;
      onProgress?.(Math.floor(totalProgress));
    });
    completed += 1;
    onAssetUploaded?.(upload.id);
  }
  onProgress?.(100);
}
