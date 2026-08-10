import { supabase, isSupabaseConfigured } from "./supabase";
import { loadLocalContributions } from "./storage";
import type { ContributionRecord } from "../types";
import { DEPOSITIONS, type Deposition } from "../data";

/**
 * Contributions aggregation — Phase C/D
 * Merges:
 * - Seed depositions (data.ts)
 * - Local contributions (localStorage fallback)
 * - Supabase approved contributions (if configured & Jenny authenticated)
 *
 * For public view, only seed + local are shown (pending not yet approved).
 * For Jenny private view, Supabase approved will be merged via fetchApprovedContributions().
 */

export function getSeedDepositions(): Deposition[] {
  return DEPOSITIONS;
}

export function getLocalDepositions(): Deposition[] {
  const locals = loadLocalContributions();
  return locals.map((r) => toDeposition(r));
}

function toDeposition(r: ContributionRecord): Deposition {
  // Map ContributionRecord → Deposition shape for Depositions.tsx
  const firstLine = r.message?.split("\n")[0] ?? "";
  return {
    name: r.contributorName,
    link: r.contributorLink ?? "Témoin — versé via /participate",
    date: new Date(r.createdAt).toLocaleDateString("fr-FR") + " — versée à l'instant",
    quote:
      firstLine.length > 0
        ? firstLine.length > 92
          ? firstLine.slice(0, 92) + "…"
          : firstLine
        : r.photoUrl
          ? "Pièce photographique versée au dossier."
          : r.videoLabel ?? "Enregistrement versé au dossier.",
    full: r.message ?? "Le témoin a préféré les images aux mots. Le greffe approuve.",
    photo: r.photoUrl,
    videoLabel: r.videoLabel,
  };
}

/** Fetch approved contributions from Supabase (Jenny private) */
export async function fetchApprovedDepositions(): Promise<Deposition[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  try {
    const { data, error } = await supabase
      .from("contributions")
      .select(
        `
        id, message, created_at,
        contributors ( name ),
        media_assets ( type, storage_path, mime_type )
      `
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    // Map to Deposition — storage_path → signed URL would need edge function
    // For Phase C, return message-only depositions; media via signed URLs in Phase D.2
    return (data as unknown as Array<{
      id: string;
      message: string | null;
      created_at: string;
      contributors: { name: string } | null;
      media_assets: Array<{ type: string; storage_path: string }>;
    }>).map((row) => {
      const hasPhoto = row.media_assets?.some((m) => m.type === "photo");
      const hasVideo = row.media_assets?.some((m) => m.type === "video");
      return {
        name: row.contributors?.name ?? "Témoin",
        link: "Contribution approuvée — dossier privé",
        date: new Date(row.created_at).toLocaleDateString("fr-FR"),
        quote: row.message
          ? row.message.split("\n")[0].slice(0, 92)
          : hasPhoto
            ? "Photo approuvée — scellée au dossier."
            : hasVideo
              ? "Vidéo approuvée — scellée au dossier."
              : "Pièce approuvée.",
        full: row.message ?? "Pièce média approuvée — visible dans la salle de projection privée.",
        // photo/video URLs would be signed in Phase D.2
        photo: undefined,
        videoLabel: hasVideo ? "Vidéo — disponible en privé" : undefined,
      };
    });
  } catch {
    return [];
  }
}

/** All depositions for public / landing (seed + local) */
export function getAllPublicDepositions(): Deposition[] {
  // Local first (most recent), then seed
  return [...getLocalDepositions(), ...getSeedDepositions()];
}
