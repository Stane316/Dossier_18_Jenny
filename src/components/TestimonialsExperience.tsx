import { useEffect, useId, useRef, type CSSProperties } from "react";
import {
  TESTIMONIALS,
  type Testimonial,
  type TestimonialPosition,
} from "../data/testimonials";
import { Reveal, useReducedMotion, useSectionProgress } from "../hooks";
import { SectionHead, Stamp } from "./Chrome";
import { BunnyIcon, PawIcon } from "./icons";

type PlasmaGeometry = {
  path: string;
  viewBoxHeight: number;
};

type TestimonialFocusPhase = "future" | "active" | "past" | "settled";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function plasmaAnchor(position: TestimonialPosition, index: number, mobile: boolean): number {
  if (mobile) return 6 + (index % 3 === 1 ? 3 : index % 3 === 2 ? -2 : 0);
  if (position === "left") return 44;
  if (position === "right") return 56;
  return index % 2 === 0 ? 48 : 52;
}

/**
 * Deterministic Bézier geometry: organic enough to avoid a mechanical rail,
 * stable enough to preserve the composition across renders and devices.
 */
function buildPlasmaGeometry(testimonials: readonly Testimonial[], mobile: boolean): PlasmaGeometry {
  const count = Math.max(testimonials.length, 1);
  const viewBoxHeight = count * 100;
  const points = [
    { x: mobile ? 6 : 50, y: 0 },
    ...testimonials.map((testimonial, index) => ({
      x: plasmaAnchor(testimonial.position, index, mobile),
      y: (index + 0.5) * 100,
    })),
    { x: mobile ? 7 : 50, y: viewBoxHeight },
  ];

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const deltaY = current.y - previous.y;
    const direction = index % 2 === 0 ? -1 : 1;
    const wave = mobile ? 4 + (index % 3) : 13 + (index % 3) * 3;
    const minX = mobile ? 1 : 18;
    const maxX = mobile ? 16 : 82;
    const controlOneX = clamp(previous.x + direction * wave, minX, maxX);
    const controlTwoX = clamp(current.x - direction * wave * 0.82, minX, maxX);

    path += ` C ${controlOneX} ${previous.y + deltaY * 0.3}, ${controlTwoX} ${previous.y + deltaY * 0.72}, ${current.x} ${current.y}`;
  }

  return { path, viewBoxHeight };
}

const DESKTOP_PLASMA_GEOMETRY = buildPlasmaGeometry(TESTIMONIALS, false);
const MOBILE_PLASMA_GEOMETRY = buildPlasmaGeometry(TESTIMONIALS, true);

function fieldProgress(sectionProgress: number): number {
  return clamp((sectionProgress - 0.1) / 0.82, 0, 1);
}

function testimonialActivation(index: number, total: number, progress: number): number {
  if (total <= 0) return 0;
  const target = (index + 0.5) / total;
  const duration = Math.min(0.18, Math.max(0.075, 0.9 / total));
  const start = target - duration * 0.64;
  return clamp((progress - start) / duration, 0, 1);
}

function smoothstep(value: number): number {
  const normalized = clamp(value, 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

function testimonialFocus(index: number, total: number, progress: number): number {
  if (total <= 0) return 0;
  const target = (index + 0.5) / total;
  if (index === total - 1 && progress >= target) return 1;
  const radius = clamp(0.72 / total, 0.055, 0.24);
  return smoothstep(1 - Math.abs(progress - target) / radius);
}

function testimonialPhase(
  index: number,
  total: number,
  progress: number,
  focus: number,
  settled: boolean
): TestimonialFocusPhase {
  if (settled) return "settled";
  if (focus >= 0.5) return "active";
  return progress > (index + 0.5) / Math.max(total, 1) ? "past" : "future";
}

function activeTestimonialIndex(total: number, progress: number): number {
  if (total <= 0) return 0;
  return Math.min(total - 1, Math.max(0, Math.floor(progress * total)));
}

function PlasmaFlow({
  geometry,
  progress,
  variant,
}: {
  geometry: PlasmaGeometry;
  progress: number;
  variant: "desktop" | "mobile";
}) {
  const rawId = useId().replace(/:/g, "");
  const gradientId = `testimonial-plasma-gradient-${rawId}`;
  const glowId = `testimonial-plasma-glow-${rawId}`;
  const pathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const head = headRef.current;
    if (!path || !head) return;
    const point = path.getPointAtLength(path.getTotalLength() * clamp(progress, 0, 1));
    head.setAttribute("cx", point.x.toFixed(3));
    head.setAttribute("cy", point.y.toFixed(3));
  }, [geometry.path, progress]);

  const dashOffset = 1 - progress;

  return (
    <svg
      className={`testimonial-plasma testimonial-plasma--${variant}`}
      viewBox={`0 0 100 ${geometry.viewBoxHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6e0b1e" />
          <stop offset="0.42" stopColor="#e8404a" />
          <stop offset="0.76" stopColor="#c8102e" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
        <filter id={glowId} x="-80%" y="-20%" width="260%" height="140%">
          <feGaussianBlur stdDeviation="1.15" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path className="testimonial-plasma-ghost" d={geometry.path} pathLength="1" />
      <path
        className="testimonial-plasma-halo"
        d={geometry.path}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={dashOffset}
      />
      <path
        ref={pathRef}
        className="testimonial-plasma-core"
        d={geometry.path}
        pathLength="1"
        stroke={`url(#${gradientId})`}
        strokeDasharray="1"
        strokeDashoffset={dashOffset}
        filter={`url(#${glowId})`}
      />
      <circle
        ref={headRef}
        className="testimonial-plasma-head"
        r={variant === "mobile" ? 0.72 : 0.58}
        opacity={progress > 0.002 ? 1 : 0}
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}

function PlasmaConnector({
  position,
  activation,
}: {
  position: TestimonialPosition;
  activation: number;
}) {
  const fromRight = position === "left";
  const path = fromRight
    ? "M 100 9 C 78 3, 62 25, 38 17 C 22 12, 14 24, 0 20"
    : "M 0 9 C 22 2, 37 25, 61 17 C 78 10, 87 24, 100 20";
  const dashOffset = 1 - activation;

  return (
    <svg
      className="testimonial-signal"
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="testimonial-signal-halo"
        d={path}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={dashOffset}
      />
      <path
        className="testimonial-signal-core"
        d={path}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
}

function TestimonialArtifact({
  testimonial,
  index,
  activation,
  focus,
  phase,
}: {
  testimonial: Testimonial;
  index: number;
  activation: number;
  focus: number;
  phase: TestimonialFocusPhase;
}) {
  const sequence = String(testimonial.sequence).padStart(2, "0");
  const inactiveDistance = 1 - focus;
  const shift = phase === "future" ? inactiveDistance * 16 : phase === "past" ? inactiveDistance * -5 : 0;
  const opacity = phase === "future"
    ? 0.58 + focus * 0.42
    : phase === "past"
      ? 0.74 + focus * 0.26
      : 1;
  const focusStyle = {
    opacity,
    transform: `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${(0.975 + focus * 0.025).toFixed(4)})`,
    filter: `brightness(${(0.84 + focus * 0.16).toFixed(3)}) saturate(${(0.8 + focus * 0.2).toFixed(3)})`,
  } satisfies CSSProperties;

  return (
    <Reveal as="article" delay={Math.min(index, 4) * 70} className="testimonial-moment">
      <div
        className="testimonial-artifact"
        data-position={testimonial.position}
        data-accent={testimonial.accent}
        data-phase={phase}
        data-energized={activation >= 0.55 ? "true" : "false"}
        aria-current={phase === "active" ? "step" : undefined}
        style={{
          "--testimonial-activation": activation,
          "--testimonial-focus": focus,
        } as CSSProperties}
      >
        <PlasmaConnector position={testimonial.position} activation={activation} />

        <div className="testimonial-focus-plane" style={focusStyle}>
          <div
            className="testimonial-focus-aura"
            style={{ opacity: focus } as CSSProperties}
            aria-hidden="true"
          />
          <figure className="relative">
            <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.24em] text-fog md:text-[10px]">
              <span className={testimonial.accent === "brass" ? "text-brass" : "text-ember"}>
                Voix {sequence}
              </span>
              <span>{testimonial.category ?? "Versée au dossier"}</span>
            </div>

            <a
              href={testimonial.src}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-image-shell group block"
              aria-label={`Ouvrir ${testimonial.label} en taille réelle`}
            >
              <img
                src={testimonial.src}
                alt={testimonial.alt}
                loading="lazy"
                decoding="async"
                className="testimonial-image"
              />
              <span className="testimonial-open-hint" aria-hidden="true">
                Lire en grand ↗
              </span>
            </a>

            <figcaption className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-t border-bone/15 pt-4">
              <div>
                <p className="font-display text-2xl font-black italic text-bone md:text-3xl">
                  {testimonial.label}
                </p>
                {testimonial.author && (
                  <p className="mt-1 font-hand text-xl text-brass md:text-2xl">
                    — {testimonial.author}
                  </p>
                )}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">
                Pour Jenny, personnellement
              </span>
            </figcaption>

            {testimonial.transcript && (
              <p className="sr-only">Transcription du témoignage : {testimonial.transcript}</p>
            )}
          </figure>
        </div>
      </div>
    </Reveal>
  );
}

export default function TestimonialsExperience() {
  const hasTestimonials = TESTIMONIALS.length > 0;
  const reducedMotion = useReducedMotion();
  const { ref, progress } = useSectionProgress<HTMLElement>(reducedMotion || !hasTestimonials);
  const visualProgress = reducedMotion ? 1 : fieldProgress(progress);
  const activeIndex = activeTestimonialIndex(TESTIMONIALS.length, visualProgress);

  return (
    <section
      ref={ref}
      id="temoignages"
      data-chapter="IV — Témoignages"
      className="testimonial-stage relative isolate overflow-hidden px-5 py-24 md:px-12 md:py-36 lg:px-20"
      style={{ "--testimonial-progress": visualProgress } as CSSProperties}
    >
      <div className="testimonial-aurora" aria-hidden="true" />

      <SectionHead
        num="IV"
        tag="Les voix de ceux qui te connaissent"
        title={
          <>
            Ce qu’ils voulaient <span className="italic text-ember">te dire.</span>
          </>
        }
      />

      <Reveal className="-mt-6 mb-16 max-w-2xl md:-mt-8 md:mb-24">
        <p className="font-display text-lg italic leading-relaxed text-bone/75 md:text-xl">
          Pas une galerie. Des mots gardés jusqu’ici, qui apparaissent à mesure que tu avances.
        </p>
      </Reveal>

      {hasTestimonials ? (
        <div className="testimonial-field relative mx-auto max-w-7xl">
          <div className="testimonial-focus-meter" aria-hidden="true">
            <span>{reducedMotion ? "Toutes les voix" : "Voix au premier plan"}</span>
            <strong>
              {reducedMotion
                ? TESTIMONIALS.length
                : `${String(activeIndex + 1).padStart(2, "0")} / ${String(TESTIMONIALS.length).padStart(2, "0")}`}
            </strong>
            <div className="testimonial-focus-dots">
              {TESTIMONIALS.map((testimonial, index) => (
                <i
                  key={`focus-${testimonial.id}`}
                  data-state={reducedMotion ? "settled" : index === activeIndex ? "active" : index < activeIndex ? "past" : "future"}
                />
              ))}
            </div>
          </div>

          <PlasmaFlow geometry={DESKTOP_PLASMA_GEOMETRY} progress={visualProgress} variant="desktop" />
          <PlasmaFlow geometry={MOBILE_PLASMA_GEOMETRY} progress={visualProgress} variant="mobile" />
          {TESTIMONIALS.map((testimonial, index) => {
            const focus = reducedMotion
              ? 1
              : testimonialFocus(index, TESTIMONIALS.length, visualProgress);
            const phase = testimonialPhase(
              index,
              TESTIMONIALS.length,
              visualProgress,
              focus,
              reducedMotion
            );

            return (
              <TestimonialArtifact
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                activation={testimonialActivation(index, TESTIMONIALS.length, visualProgress)}
                focus={focus}
                phase={phase}
              />
            );
          })}
        </div>
      ) : (
        <Reveal className="mx-auto max-w-3xl">
          <div className="testimonial-sealed relative overflow-hidden border-y border-ember/25 py-16 text-center md:py-24">
            <div className="testimonial-sealed-line" aria-hidden="true" />
            <Stamp animate rot={-4} className="bg-ink px-4 text-[10px]">
              Pièce sous scellés
            </Stamp>
            <p className="mx-auto mt-8 max-w-xl font-display text-2xl font-black italic leading-tight text-bone md:text-4xl">
              Les voix rejoignent le dossier une à une.
            </p>
            <p className="mx-auto mt-4 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fog">
              Rien ici ne sera remplacé par un message inventé.
            </p>
            <div className="mt-10 flex items-center justify-center gap-7 text-blood/70" aria-hidden="true">
              <PawIcon className="h-5 w-5 -rotate-12" />
              <span className="h-px w-20 bg-gradient-to-r from-blood to-brass" />
              <BunnyIcon className="h-5 w-5 rotate-12 text-brass/70" />
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
