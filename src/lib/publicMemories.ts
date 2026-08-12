import {
  PUBLIC_MEMORIES,
  type PublicMemoryAsset,
} from "virtual:jenny-memories";

/**
 * Build-time manifest of curated launch media under public/memories.
 * Adding/removing a supported file and rebuilding is enough to update every
 * Jenny component that consumes these shared arrays.
 */
export const PUBLIC_MEMORY_IMAGES = PUBLIC_MEMORIES.filter(
  (asset): asset is PublicMemoryAsset & { kind: "image" } => asset.kind === "image"
);

export const PUBLIC_MEMORY_VIDEOS = PUBLIC_MEMORIES.filter(
  (asset): asset is PublicMemoryAsset & { kind: "video" } => asset.kind === "video"
);

export function memoryLabel(kind: "image" | "video", index: number): string {
  const prefix = kind === "image" ? "Souvenir" : "Film-souvenir";
  return `${prefix} ${String(index + 1).padStart(2, "0")}`;
}
