import { useEffect, useRef, useState } from "react";
import { MEMORIES_FALLBACK } from "../data";
import { useReducedMotion } from "../hooks";
import { isSupabaseConfigured } from "../lib/supabase";
import { fetchApprovedDepositions } from "../lib/contributions";
import { loadLocalContributions } from "../lib/storage";

/**
 * E.1 — IntroOrbit DOM 2.5D + MJReveal + ScrollController + ExperienceTransition
 * - Constellation de N souvenirs (photos) qui gravitent autour de MJ
 * - Scroll 0→100% : orbit large → converge → MJ domine → transition vers JennyCore
 * - Fallback DOM 2.5D (pas de WebGL), progressive enhancement
 * - Dossier photos : public/images/memories/ → MEMORIES_FALLBACK + Supabase approved + local
 */

type OrbitItem = { id: string; src: string; alt: string };

function useMemories(): OrbitItem[] {
  const [items, setItems] = useState<OrbitItem[]>(() =>
    MEMORIES_FALLBACK.map((src, i) => ({ id: `fallback-${i}`, src, alt: `Souvenir ${i + 1}` }))
  );

  useEffect(() => {
    let cancelled = false;
    // 1. Try to load from public/images/memories via glob (if Vite has files)
    // For now we keep fallback + add Supabase approved + local
    const load = async () => {
      const extra: OrbitItem[] = [];

      // Local contributions with photoUrl dataURL
      const locals = loadLocalContributions().filter((r) => r.photoUrl);
      locals.forEach((r, i) => {
        if (r.photoUrl) extra.push({ id: `local-${i}-${r.id}`, src: r.photoUrl, alt: r.contributorName });
      });

      // Supabase approved
      if (isSupabaseConfigured) {
        try {
          const approved = await fetchApprovedDepositions();
          approved.forEach((d, i) => {
            if (d.photo) extra.push({ id: `approved-${i}-${d.id}`, src: d.photo, alt: d.name });
          });
        } catch {
          /* ignore */
        }
      }

      // Also try to auto-discover files in public/images/memories via fetch of README? No, rely on fallback + extra
      // User can add files to public/images/memories/ and they will be picked via MEMORIES_FALLBACK extension:
      // To support auto-discovery, we expose a global `window.__JENNY_MEMORIES__` that can be set via a JSON manifest
      // For now, merge extra in front, cap at 18
      if (!cancelled && extra.length > 0) {
        const merged = [...extra, ...MEMORIES_FALLBACK.map((src, i) => ({ id: `fallback-${i}`, src, alt: `Souvenir ${i + 1}` }))].slice(0, 18);
        setItems(merged);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return items;
}

export default function IntroOrbit() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const memories = useMemories();
  const N = Math.min(memories.length, 14); // cap for performance
  const display = memories.slice(0, N);

  // Scroll progress 0→1 for the pinned intro (180vh container)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Time for subtle orbit rotation (paused if reduced)
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      setTime(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Derived orbit params based on progress
  // progress 0: rx 42vw, scale 1, opacity 1, blur 0, MJ 0
  // progress 1: rx 14vw, scale 0.65, opacity 0.2, blur 8, MJ 1
  const orbitScale = 1 - progress * 0.38;
  const orbitOpacity = 1 - progress * 0.78;
  const orbitBlur = progress * 8;
  const mjOpacity = Math.min(1, Math.max(0, (progress - 0.28) / 0.45));
  const mjScale = 0.82 + progress * 0.22;
  const mjBlur = Math.max(0, 12 - progress * 16);
  const mjClip = 28 + progress * 42; // 28% → 70%

  // For reduced motion, simplify
  const effectiveProgress = reduced ? Math.min(progress * 0.5, 0.7) : progress;
  const effectiveOrbitBlur = reduced ? 0 : orbitBlur;
  const effectiveMjBlur = reduced ? 0 : mjBlur;

  return (
    <div ref={containerRef} className="relative" style={{ height: "180vh" }} aria-label="Introduction — constellation de souvenirs">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ink" style={{ perspective: "1200px" }}>
        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(200,16,46,0.12),transparent_60%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(201,162,39,0.06),transparent_70%)]" aria-hidden="true" />

        {/* Memory field */}
        <div className="absolute inset-0" aria-hidden="true">
          {display.map((m, i) => {
            const baseAngle = (i / N) * Math.PI * 2;
            const spin = reduced ? 0 : time * 0.12;
            const scrollSpin = effectiveProgress * 1.8;
            const angle = baseAngle + spin + scrollSpin + (i % 2 === 0 ? 0 : 0.18);
            // Ellipse radii shrink with progress
            const rx = (typeof window !== "undefined" ? Math.min(window.innerWidth * 0.42, 520) : 380) * (1 - effectiveProgress * 0.62);
            const ry = (typeof window !== "undefined" ? Math.min(window.innerHeight * 0.32, 340) : 260) * (1 - effectiveProgress * 0.55);
            const x = Math.cos(angle) * rx;
            const y = Math.sin(angle) * ry;
            const z = Math.sin(angle * 1.3 + i) * (reduced ? 40 : 160) * (1 - effectiveProgress * 0.5);
            const isFar = z < 0;
            const itemOpacity = isFar ? orbitOpacity * 0.55 : orbitOpacity;
            const itemScale = isFar ? orbitScale * 0.82 : orbitScale;
            const itemBlur = isFar ? effectiveOrbitBlur * 1.2 : effectiveOrbitBlur * 0.6;
            const rotate = (angle * 28) % 360;

            // Slight stagger for entrance
            const delay = i * 80;

            return (
              <div
                key={m.id}
                className="absolute left-1/2 top-1/2 will-change-transform"
                style={{
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotate(${rotate * 0.08}deg) scale(${itemScale})`,
                  opacity: itemOpacity,
                  filter: itemBlur > 0.3 ? `blur(${itemBlur.toFixed(1)}px)` : undefined,
                  transition: `filter 0.4s ease, opacity 0.4s ease`,
                  transitionDelay: `${delay}ms`,
                  zIndex: isFar ? 1 : 3,
                }}
              >
                <div
                  className="overflow-hidden border border-bone/15 bg-coal shadow-[0_12px_32px_rgba(4,2,3,0.55)]"
                  style={{
                    width: `clamp(72px, 9vw, 148px)`,
                    aspectRatio: "4/3",
                  }}
                >
                  <img
                    src={m.src}
                    alt={m.alt}
                    loading={i < 6 ? "eager" : "lazy"}
                    className="h-full w-full object-cover saturate-[0.88] contrast-[1.04]"
                    style={{ transform: `scale(${1 + effectiveProgress * 0.06})` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* MJ Reveal — centre */}
        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{
            opacity: mjOpacity,
            transform: `scale(${mjScale})`,
            filter: effectiveMjBlur > 0.5 ? `blur(${effectiveMjBlur.toFixed(1)}px)` : undefined,
          }}
          aria-hidden={mjOpacity < 0.15}
        >
          <div
            className="relative"
            style={{
              clipPath: `circle(${mjClip}% at 50% 50%)`,
              WebkitClipPath: `circle(${mjClip}% at 50% 50%)`,
            }}
          >
            <h1 className="font-display text-[clamp(4.8rem,18vw,9rem)] font-black leading-none tracking-tight text-brass">
              MJ<span className="text-blood">.</span>
            </h1>
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.32em] text-fog">
            <span className="text-ember">M</span>éminou &nbsp;·&nbsp; <span className="text-brass">J</span>enny &nbsp;·&nbsp; 18
          </p>
          <p className="mt-2 max-w-[28ch] font-display text-[13px] italic leading-relaxed text-bone/70">
            Une constellation de souvenirs — et au centre, toi.
          </p>
          {mjOpacity > 0.9 && (
            <a
              href="#couverture"
              className="btn-stamp mt-8 inline-flex border border-ember/60 bg-blood px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-parch"
            >
              Ouvrir le dossier N°18 →
            </a>
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: 1 - progress * 1.6 }}
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-fog">Faire défiler</span>
          <span className="h-8 w-px bg-gradient-to-b from-ember/60 to-transparent" />
        </div>

        {/* Progress thread for intro */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-blood/10" aria-hidden="true">
          <div className="thread-fill h-full transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
