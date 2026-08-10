import type { CSSProperties } from "react";
import { EXHIBITS, type Exhibit } from "../data";
import { Reveal, useInView, useTilt } from "../hooks";
import { SectionHead } from "./Chrome";
import { BunnyIcon, PawIcon } from "./icons";

/* Le fil rouge de l'enquête — se dessine au scroll */
function RedThread() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-0 top-24 hidden h-[70%] md:block" aria-hidden="true">
      <svg viewBox="0 0 1200 620" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M 30,120 C 240,30 360,190 600,110 S 950,220 1170,120 M 1170,120 C 1000,320 850,300 640,420 S 300,560 120,470"
          fill="none"
          stroke="#C8102E"
          strokeWidth="2"
          strokeDasharray="2600"
          strokeDashoffset={inView ? 0 : 2600}
          style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(0.22,0.61,0.36,1) 0.3s" }}
          opacity="0.55"
        />
        {[
          [30, 120],
          [600, 110],
          [1170, 120],
          [640, 420],
          [120, 470],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="6"
            fill="#C8102E"
            opacity={inView ? 0.9 : 0}
            style={{ transition: `opacity 0.5s ease ${0.5 + i * 0.35}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function ExhibitCard({ ex, i }: { ex: Exhibit; i: number }) {
  const tiltRef = useTilt<HTMLDivElement>(4.5);
  return (
    <Reveal
      delay={i * 110}
      className={`${i % 2 ? "md:rotate-[1.1deg]" : "md:-rotate-[1.2deg]"} transition-transform duration-500 hover:rotate-0`}
    >
      <article
        ref={tiltRef}
        className="group relative border border-ash bg-coal shadow-[0_18px_40px_rgba(4,2,3,0.55)] transition-shadow duration-500 hover:shadow-[0_26px_60px_rgba(110,11,30,0.35)]"
        style={
          {
            transform:
              "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
            transition: "transform 0.18s ease-out",
          } as CSSProperties
        }
      >
        {/* Ruban « preuve » */}
        <span className="evidence-tape absolute -left-3 top-5 z-10 -rotate-3 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em]">
          Pièce {ex.id} — ne pas toucher
        </span>

        <figure className="relative aspect-[4/3] overflow-hidden border-b border-ash">
          <img
            src={ex.photo}
            alt={ex.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover saturate-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(7,4,5,0.6))]"
            aria-hidden="true"
          />
        </figure>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-ember">
              {ex.status}
            </span>
            {ex.id === "A-01" ? (
              <PawIcon className="h-4 w-4 text-blood" />
            ) : ex.id === "A-02" ? (
              <BunnyIcon className="h-4 w-4 text-blood/80" />
            ) : null}
          </div>
          <h3 className="mt-2.5 font-display text-2xl font-bold text-bone md:text-[1.7rem]">
            {ex.title}
          </h3>
          <p className="mt-3 font-display text-[15px] leading-relaxed text-bone/75">{ex.description}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
            Mention — <span className="italic text-ember/90">{ex.note}</span>
          </p>
          <div className="mt-5 flex items-end justify-between border-t border-dashed border-ember/20 pt-4">
            <div className="barcode h-7 w-24 text-bone/60" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">
              Versée le 13.08 — dossier J-18
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Evidence() {
  return (
    <section id="pieces" data-chapter="III — Pièces à conviction" className="relative px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <SectionHead
        num="III"
        tag="Inventaire scellé"
        title={
          <>
            Pièces à <span className="italic text-ember">conviction</span>
          </>
        }
      />

      <Reveal className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
        <span>Pièces versées : <b className="text-bone">05</b></span>
        <span className="text-blood/60">✚</span>
        <span>Disparues : <b className="text-bone">00</b></span>
        <span className="text-blood/60">✚</span>
        <span className="text-ember">Hiérarchie confirmée : chaton &gt; lapin — le lapin est informé</span>
      </Reveal>

      <div className="relative">
        <RedThread />
        <div className="relative z-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3 md:gap-10">
          {EXHIBITS.map((ex, i) => (
            <ExhibitCard key={ex.id} ex={ex} i={i} />
          ))}

          {/* Carte scellée — réserve narrative */}
          <Reveal delay={5 * 110} className="md:rotate-[1.2deg] transition-transform duration-500 hover:rotate-0">
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 border border-dashed border-ember/30 bg-coal/40 p-8 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">Pièce A-06</span>
              <p className="font-display text-2xl font-semibold italic text-bone/60">Sous scellés</p>
              <p className="max-w-[24ch] font-mono text-[11px] leading-relaxed text-fog">
                Cette pièce sera versée au dossier le jour J. Certains secrets méritent d'attendre.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
