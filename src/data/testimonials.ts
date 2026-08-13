import {
  PUBLIC_TESTIMONIAL_ASSETS,
  type PublicTestimonialAsset,
} from "virtual:jenny-testimonials";

export type TestimonialPosition = "left" | "right" | "center";
export type TestimonialAccent = "blood" | "brass";

export type TestimonialMetadata = {
  author?: string;
  label?: string;
  category?: string;
  transcript?: string;
  alt?: string;
  order?: number;
  position?: TestimonialPosition;
  accent?: TestimonialAccent;
};

export type Testimonial = PublicTestimonialAsset & {
  author: string | null;
  label: string;
  category: string | null;
  transcript: string | null;
  alt: string;
  sequence: number;
  position: TestimonialPosition;
  accent: TestimonialAccent;
};

/**
 * Optional editorial metadata, keyed by the relative file path without its
 * extension. An image works without an entry here; add metadata only when it is
 * known and verified.
 *
 * Example key for public/temoignage/temoignage-001.webp:
 * "temoignage-001": { author: "…", transcript: "…", position: "right" }
 */
export const TESTIMONIAL_METADATA: Record<string, TestimonialMetadata> = {};

function labelFromName(name: string, fallbackIndex: number): string {
  const normalized = name
    .replace(/^temoignage[-_ ]*/i, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!normalized || /^\d+$/.test(normalized)) {
    return `Témoignage ${String(fallbackIndex + 1).padStart(2, "0")}`;
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

const prepared = [...PUBLIC_TESTIMONIAL_ASSETS]
  .map((asset, sourceIndex) => ({
    asset,
    sourceIndex,
    metadata: TESTIMONIAL_METADATA[asset.key] ?? {},
  }))
  .sort((a, b) => {
    const aOrder = a.metadata.order ?? a.sourceIndex + 1;
    const bOrder = b.metadata.order ?? b.sourceIndex + 1;
    return aOrder - bOrder || a.asset.id.localeCompare(b.asset.id, "fr", { numeric: true });
  });

export const TESTIMONIALS: readonly Testimonial[] = prepared.map(
  ({ asset, metadata }, index) => {
    const label = metadata.label ?? labelFromName(asset.name, index);
    const fallbackPositions: TestimonialPosition[] = ["left", "right", "center"];

    return {
      ...asset,
      author: metadata.author?.trim() || null,
      label,
      category: metadata.category?.trim() || null,
      transcript: metadata.transcript?.trim() || null,
      alt: metadata.alt?.trim() || `${label}, message en image destiné à Jenny`,
      sequence: index + 1,
      position: metadata.position ?? fallbackPositions[index % fallbackPositions.length],
      accent: metadata.accent ?? (index % 3 === 2 ? "brass" : "blood"),
    };
  }
);
