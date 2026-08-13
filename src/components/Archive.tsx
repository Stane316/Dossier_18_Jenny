import { CLOSING_LINE, DOSSIER_REF } from "../data";
import { Reveal } from "../hooks";
import { Stamp } from "./Chrome";
import { PawIcon } from "./icons";

export default function Archive() {
  return (
    <section
      id="cloture"
      data-chapter="VII — Affaire classée"
      className="relative px-5 py-28 md:px-12 md:py-44 lg:px-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(110,11,30,0.16),transparent_70%)]"
        aria-hidden="true"
      />

      <Reveal className="mx-auto mb-12 flex max-w-5xl items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em]">
        <span className="text-ember">Pièce VII</span>
        <span className="h-px flex-1 bg-ember/25" aria-hidden="true" />
        <span className="text-fog">Clôture</span>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative mx-auto max-w-3xl border border-ember/25 bg-coal/70 p-9 text-center shadow-[0_30px_80px_rgba(4,2,3,0.6)] md:p-16">
          <div className="absolute -top-5 right-6 md:right-10">
            <Stamp animate rot={8} className="bg-ink px-4 py-2 text-base md:text-xl">
              Classée — pour toujours
            </Stamp>
          </div>

          <h2 className="font-display text-[clamp(2.8rem,7vw,5rem)] font-black italic leading-[0.95] text-bone">
            Affaire classée.
          </h2>
          <p className="mx-auto mt-7 max-w-md font-mono text-[13px] leading-relaxed text-bone/75">
            Le dossier est archivé. Les pièces restent.
            <br />
            Les gens restent.
          </p>
          <p className="mx-auto mt-6 max-w-lg font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-ember">
            {CLOSING_LINE}
          </p>

          <div className="mt-10 flex items-end justify-center gap-5 md:gap-8" aria-hidden="true">
            {[
              { r: -22, o: 0.35, s: "h-4 w-4" },
              { r: 14, o: 0.5, s: "h-5 w-5" },
              { r: -8, o: 0.65, s: "h-6 w-6" },
              { r: 18, o: 0.8, s: "h-7 w-7" },
              { r: -14, o: 0.95, s: "h-8 w-8" },
            ].map((paw, index) => (
              <Reveal key={index} delay={300 + index * 140}>
                <PawIcon
                  className={`${paw.s} text-blood`}
                  style={{ opacity: paw.o, rotate: `${paw.r}deg` }}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-11 flex justify-center">
            <a
              href="#couverture"
              className="btn-stamp inline-flex items-center gap-3 border border-ember/60 bg-blood px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-parch"
            >
              Reconstituer la scène
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={240} className="mt-10 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-fog/70">
          Fin de la transmission — 13.08 — réf. {DOSSIER_REF}
        </p>
      </Reveal>
    </section>
  );
}
