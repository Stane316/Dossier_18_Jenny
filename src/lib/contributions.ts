import { isSupabaseConfigured } from "./supabase";
import { loadLocalContributions } from "./storage";
import { invokeJennyAccess } from "./auth";
import { config } from "./config";
import type { ContributionRecord } from "../types";
import { DEPOSITIONS, type Deposition } from "../data";

const CONTRIBUTION_FUNCTION = "contribution-pipeline";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PRIVATE_CONTRIBUTION_CACHE_MS = 4 * 60 * 1000;
const privateContributionCache = new Map<
  "approved" | "pending",
  { expiresAt: number; request: Promise<Deposition[]> }
>();

export type ContributionMediaRequest = {
  type: "photo" | "video";
  mimeType: string;
  sizeBytes: number;
};

export type ContributionUploadPlan = {
  id: string;
  type: "photo" | "video";
  path: string;
  token: string;
};

export type PendingContribution = {
  contributionId: string;
  submissionToken: string | null;
  uploads: ContributionUploadPlan[];
  complete: boolean;
};

type PrivateContribution = {
  id: string;
  message: string | null;
  created_at: string;
  contributor_name: string;
  media: Array<{
    type: "photo" | "video";
    url: string;
    mime_type: string;
  }>;
};

type PrivateContributionResponse = {
  contributions: PrivateContribution[];
};

export function getSeedDepositions(): Deposition[] {
  return DEPOSITIONS;
}

export function getLocalDepositions(): Deposition[] {
  if (isSupabaseConfigured) return [];
  return loadLocalContributions().map((record) => toDeposition(record));
}

function toDeposition(record: ContributionRecord): Deposition {
  const firstLine = record.message?.split("\n")[0] ?? "";
  return {
    name: record.contributorName,
    link: record.contributorLink ?? "Témoin — versé via /participate",
    date: new Date(record.createdAt).toLocaleDateString("fr-FR") + " — versée à l'instant",
    quote:
      firstLine.length > 0
        ? firstLine.length > 92
          ? firstLine.slice(0, 92) + "…"
          : firstLine
        : record.photoUrl
          ? "Pièce photographique versée au dossier."
          : record.videoLabel ?? "Enregistrement versé au dossier.",
    full: record.message ?? "Le témoin a préféré les images aux mots. Le greffe approuve.",
    photo: record.photoUrl,
    videoLabel: record.videoLabel,
  };
}

function contributionErrorMessage(
  response: Response,
  body: Record<string, unknown> | null
): string {
  if (response.status === 404) return "Le service de contribution n’est pas encore déployé";
  if (response.status === 403) return "Ce site n’est pas autorisé à envoyer des contributions";
  if (response.status === 429) return "Trop de tentatives — réessayez dans une heure";
  if (response.status === 503) return "Le service de contribution est temporairement indisponible";

  const serverMessage = body?.error;
  if (typeof serverMessage === "string" && serverMessage.trim()) return serverMessage;
  return "Le service de contribution est indisponible";
}

async function invokeContributionPipeline<T>(
  action: "create" | "finalize",
  payload: Record<string, unknown>
): Promise<T> {
  const { url, publishableKey } = config.supabase;
  if (!isSupabaseConfigured || !url || !publishableKey) {
    throw new Error("Supabase non configuré");
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 20_000);
  let response: Response;
  try {
    response = await fetch(`${url}/functions/v1/${CONTRIBUTION_FUNCTION}`, {
      method: "POST",
      headers: {
        apikey: publishableKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, ...payload }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Le service de contribution met trop de temps à répondre");
    }
    throw new Error("Le service de contribution est injoignable");
  } finally {
    globalThis.clearTimeout(timeout);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    if (!response.ok) throw new Error(contributionErrorMessage(response, null));
    throw new Error("Réponse invalide du service de contribution");
  }

  const body = data && typeof data === "object" && !Array.isArray(data)
    ? data as Record<string, unknown>
    : null;
  if (!response.ok) throw new Error(contributionErrorMessage(response, body));
  if (!body) throw new Error("Réponse invalide du service de contribution");
  return body as T;
}

/** Creates an atomic pending submission and returns exact path-bound Storage upload tokens. */
export async function createPendingContribution(input: {
  name: string;
  message: string | null;
  media: ContributionMediaRequest[];
}): Promise<PendingContribution> {
  const response = await invokeContributionPipeline<PendingContribution>("create", input);
  const validUploads = Array.isArray(response.uploads) && response.uploads.every((upload) =>
    upload &&
    typeof upload === "object" &&
    UUID_PATTERN.test(upload.id) &&
    (upload.type === "photo" || upload.type === "video") &&
    typeof upload.path === "string" && upload.path.length > 0 &&
    typeof upload.token === "string" && upload.token.length > 0
  );
  if (
    !UUID_PATTERN.test(response.contributionId) ||
    !validUploads ||
    typeof response.complete !== "boolean" ||
    response.complete !== (response.uploads.length === 0) ||
    (response.uploads.length > 0 &&
      (typeof response.submissionToken !== "string" || response.submissionToken.length < 32))
  ) {
    throw new Error("Réponse de contribution invalide");
  }
  return response;
}

/** Finalizes a submission only after the Edge Function has verified every uploaded object. */
export async function finalizePendingContribution(
  contributionId: string,
  submissionToken: string
): Promise<void> {
  const response = await invokeContributionPipeline<{ ok: boolean }>("finalize", {
    contributionId,
    submissionToken,
  });
  if (!response.ok) throw new Error("La contribution n'a pas pu être finalisée");
}

function privateContributionToDeposition(
  row: PrivateContribution,
  status: "approved" | "pending"
): Deposition {
  const photoUrl = row.media.find((asset) => asset.type === "photo")?.url;
  const videoUrl = row.media.find((asset) => asset.type === "video")?.url;
  const hasPhoto = Boolean(photoUrl);
  const hasVideo = Boolean(videoUrl);
  const pending = status === "pending";

  return {
    id: row.id,
    name: row.contributor_name || "Témoin",
    link: pending ? "En attente de modération" : "Contribution approuvée — dossier privé",
    date: new Date(row.created_at).toLocaleDateString("fr-FR"),
    quote: row.message
      ? row.message.split("\n")[0].slice(0, 92)
      : hasPhoto
        ? pending
          ? "Photo en attente"
          : "Photo approuvée — scellée au dossier."
        : hasVideo
          ? pending
            ? "Vidéo en attente"
            : "Vidéo approuvée — scellée au dossier."
          : pending
            ? "Pièce en attente"
            : "Pièce approuvée.",
    full:
      row.message ??
      (pending
        ? "Pièce média en attente de validation."
        : "Pièce média approuvée — visible dans le dossier privé."),
    photo: photoUrl,
    videoLabel: hasVideo
      ? pending
        ? "Vidéo — en attente"
        : "Vidéo — lecture privée disponible"
      : undefined,
    videoUrl,
    status,
  };
}

async function fetchPrivateDepositions(
  status: "approved" | "pending"
): Promise<Deposition[]> {
  if (!isSupabaseConfigured) return [];

  const cached = privateContributionCache.get(status);
  if (cached && cached.expiresAt > Date.now()) return cached.request;

  const request = invokeJennyAccess<PrivateContributionResponse>(
    "list-contributions",
    { status }
  ).then((response) => {
    if (!Array.isArray(response.contributions)) return [];
    return response.contributions.map((row) => privateContributionToDeposition(row, status));
  });
  privateContributionCache.set(status, {
    expiresAt: Date.now() + PRIVATE_CONTRIBUTION_CACHE_MS,
    request,
  });

  try {
    return await request;
  } catch (error) {
    privateContributionCache.delete(status);
    throw error;
  }
}

export async function fetchApprovedDepositions(): Promise<Deposition[]> {
  return fetchPrivateDepositions("approved");
}

export async function fetchPendingDepositions(): Promise<Deposition[]> {
  return fetchPrivateDepositions("pending");
}

/** Public fallback content exists only when Supabase is not configured. */
export function getAllPublicDepositions(): Deposition[] {
  return [...getLocalDepositions(), ...getSeedDepositions()];
}

export async function approveContribution(contributionId: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase non configuré");
  const response = await invokeJennyAccess<{ ok: boolean }>("approve-contribution", {
    contributionId,
  });
  if (!response.ok) throw new Error("Échec de l'approbation");
  privateContributionCache.clear();
}
