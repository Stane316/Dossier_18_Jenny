/**
 * Storage & local persistence — Phase B/D foundation
 * - Generates non-predictable paths per Phase 7 §06
 * - Provides localStorage fallback when Supabase not configured
 * - Handles blob URL lifecycle
 * - D.1: real Supabase upload pipeline with progress simulation
 * - Private reads and signed URLs are delegated to the Jenny Edge Function
 */

import type { ContributionRecord } from "../types";
import { supabase, isSupabaseConfigured } from "./supabase";
import { STORAGE_BUCKETS } from "./config";

const LOCAL_KEY = "jenny:contributions";

/** Generate storage path: contributions/{uuid}/photos/{id}.ext */
export function buildStoragePath(
  contributionId: string,
  assetId: string,
  type: "photo" | "video",
  ext: string
): string {
  const folder = type === "photo" ? "photos" : "videos";
  return `contributions/${contributionId}/${folder}/${assetId}.${ext}`;
}

export function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
  };
  return map[mime] ?? (mime.split("/")[1] ?? "bin");
}

/** LocalStorage fallback — keeps demo functional without backend */
export function saveLocalContribution(rec: ContributionRecord) {
  try {
    const existing = loadLocalContributions();
    existing.unshift(rec);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
  } catch {
    /* quota exceeded — ignore, contribution still shown in session */
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

export function clearLocalContributions() {
  localStorage.removeItem(LOCAL_KEY);
}

/** Create blob URL and track for revocation */
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}
export function revokePreviewUrl(url: string | null | undefined) {
  if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
}

// ── D.1: Real Storage pipeline ─────────────────────────────────

/** Upload a file to birthday-media bucket with progress simulation (supabase-js has no native onUploadProgress) */
export async function uploadToBucket(
  path: string,
  file: File,
  onProgress?: (pct: number) => void
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error("Supabase non configuré");
  // Simulate progress 0→90% while upload is in-flight
  let pct = 0;
  let timer: ReturnType<typeof setInterval> | null = null;
  if (onProgress) {
    timer = setInterval(() => {
      pct = Math.min(90, pct + Math.random() * 12 + 4);
      onProgress(Math.floor(pct));
    }, 180);
  }
  try {
    const { error } = await supabase.storage.from(STORAGE_BUCKETS.media).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (timer) clearInterval(timer);
    if (error) throw new Error(error.message);
    onProgress?.(100);
  } catch (e) {
    if (timer) clearInterval(timer);
    throw e;
  }
}

/** Helper to upload photo + video for a contribution with granular progress 50→90% */
export async function uploadContributionMedia(
  contributionId: string,
  photo: File | null,
  video: File | null,
  onProgress?: (overall: number) => void
): Promise<Array<{ id: string; type: "photo" | "video"; path: string; mime: string; size: number }>> {
  const results: Array<{ id: string; type: "photo" | "video"; path: string; mime: string; size: number }> = [];
  const total = (photo ? 1 : 0) + (video ? 1 : 0);
  if (total === 0) return results;
  let done = 0;

  const step = (_base: number, pct: number) => {
    // 50→90, distribute across files
    const perFile = 40 / total;
    const overall = 50 + done * perFile + (pct / 100) * perFile;
    onProgress?.(Math.floor(overall));
  };

  if (photo) {
    const assetId = crypto.randomUUID();
    const path = buildStoragePath(contributionId, assetId, "photo", extFromMime(photo.type));
    await uploadToBucket(path, photo, (pct) => step(50, pct));
    results.push({ id: assetId, type: "photo", path, mime: photo.type, size: photo.size });
    done += 1;
  }
  if (video) {
    const assetId = crypto.randomUUID();
    const path = buildStoragePath(contributionId, assetId, "video", extFromMime(video.type));
    await uploadToBucket(path, video, (pct) => step(50, pct));
    results.push({ id: assetId, type: "video", path, mime: video.type, size: video.size });
    done += 1;
  }
  return results;
}
