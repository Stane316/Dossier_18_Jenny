import { useMemo } from "react";
import { REPORT_CONCLUSION, REPORT_FACTS } from "../data";
import { Reveal, useInView, useTypewriter } from "../hooks";
import { Stamp } from "./Chrome";
import { ArrowDownIcon } from "./icons";

export default function Report() {
  /* Identité stable — le hook machine à écrire ne doit jamais redémarrer */
  const lines = useMemo(() => REPORT_FACTS.map((f) => f.text), []);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const tw = useTypewriter(lines, inView, 15, 380);

  return (
    <section id="rapport" data-chapter="II — Rapport préliminaire" className="relative px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="grid gap-14 lg:grid-cols-[360px_1fr] lg:gap-20">
        {/* Colonne scellée */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em]">
            <span className="text-ember">Pièce II</span>
            <span className="h-px w-16 bg-ember/25" aria-hidden="true" />
            <span className="text-fog">Procès-verbal</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-black leading-[0.95] text-bone">
              Rapport
              <br />
              <span className="italic text-ember">préliminaire</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-7 font-mono text-[13px] leading-relaxed text-bone/70">
              L'enquête a été ouverte le jour de ses 18 ans, à minuit pile. Les faits sont
              graves, répétés, et vraisemblablement perpétuels. Récapitulons.
            </p>
          </Reveal>
          <Reveal delay={360} className="mt-9">
            <Stamp rot={-6} className="text-[11px]">PV N°001 — certifié conforme</Stamp>
          </Reveal>
        </div>

        {/* Les faits, tapés à la machine */}
        <div ref={ref} className="space-y-7">
          {REPORT_FACTS.map((fact, i) => {
            const started = tw.line > i || (tw.line === i && tw.chars > 0);
            const completed = tw.line > i || tw.done;
            const partial = tw.line === i && !tw.done;
            if (!started) return <div key={fact.num} className="h-10" aria-hidden="true" />;
            return (
              <div key={fact.num} className="flex gap-4 md:gap-6">
                <span className="shrink-0 pt-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ember">
                  Fait&nbsp;N°{fact.num}
                </span>
                <p
                  className={`font-mono text-[13px] leading-relaxed md:text-[15px] ${
                    completed ? "text-bone/90" : "text-bone caret"
                  }`}
                >
                  {partial ? fact.text.slice(0, tw.chars) : fact.text}
                </p>
              </div>
            );
          })}

          {tw.done && (
            <Reveal className="pt-6">
              <div className="border-l-2 border-blood pl-6">
                <p className="font-display text-xl font-semibold italic leading-snug text-bone md:text-2xl">
                  {REPORT_CONCLUSION}
                </p>
                <a
                  href="#pieces"
                  className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ember transition-colors hover:text-bone"
                >
                  Examiner les pièces à conviction
                  <ArrowDownIcon className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
