import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Reveal, useInView } from "../hooks";
import { FolderIcon } from "./icons";

/* ── Tampon encreur ── */
export function Stamp({
  children,
  rot = -8,
  animate = false,
  className = "",
}: {
  children: ReactNode;
  rot?: number;
  animate?: boolean;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      className={`stamp ${animate && inView ? "stamp-animate" : ""} ${className}`}
      style={{ "--stamp-rot": `${rot}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}

/* ── En-tête de section (langue « dossier ») ── */
export function SectionHead({
  num,
  title,
  tag,
  dark = true,
}: {
  num: string;
  title: ReactNode;
  tag: string;
  dark?: boolean;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal className="flex items-center gap-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em]">
        <span className={dark ? "text-ember" : "text-blood"}>Pièce {num}</span>
        <span className={`h-px flex-1 ${dark ? "bg-ember/25" : "bg-ink/25"}`} aria-hidden="true" />
        <span className={dark ? "text-fog" : "text-ink/55"}>{tag}</span>
      </Reveal>
      <Reveal delay={130}>
        <h2
          className={`mt-6 font-display font-black leading-[0.93] tracking-tight text-[clamp(2.5rem,6.5vw,4.8rem)] ${
            dark ? "text-bone" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
    </header>
  );
}

/* ── Barre-dossier persistante : réf, fil rouge, chapitre courant ── */
const CHAPTERS = [
  { id: "couverture", num: "I" },
  { id: "rapport", num: "II" },
  { id: "pieces", num: "III" },
  { id: "temoignages", num: "IV" },
  { id: "projection", num: "V" },
  { id: "verdict", num: "VI" },
  { id: "cloture", num: "VII" },
];

export function DossierBar() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("I — Couverture");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-chapter") ?? "");
        }
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-blood/30 bg-ink/90 backdrop-blur-sm">
      <div className="flex h-12 items-center gap-4 px-4 md:px-8">
        <a
          href="#couverture"
          className="flex shrink-0 items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-bone transition-colors hover:text-ember"
        >
          <FolderIcon className="h-4 w-4 text-blood" />
          Dossier N°18
          <span className="hidden text-fog sm:inline">— Affaire J.</span>
        </a>

        <nav className="mx-auto hidden items-center gap-0.5 lg:flex" aria-label="Chapitres du dossier">
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`px-2.5 py-1.5 font-mono text-[10px] tracking-[0.18em] transition-colors hover:bg-blood/15 hover:text-ember ${
                active.startsWith(c.num + " ") ? "text-ember" : "text-fog"
              }`}
            >
              {c.num}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-fog md:block">
            Réf. J-18/08-13
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember/90">
            {active}
          </span>
        </div>
      </div>

      {/* Le fil rouge de l'enquête — progression */}
      <div className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-blood/15" aria-hidden="true">
        <div className="thread-fill h-full transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

/* ── Couches ambiantes ── */
export function AmbientLayers() {
  return (
    <>
      <div className="vignette-layer" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
    </>
  );
}
