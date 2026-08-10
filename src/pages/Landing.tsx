/**
 * Landing — public entry (/)
 * Reuses the full dossier teaser: Cover + Report + Evidence (preview) + CTA to /participate
 * Keeps visual identity 100% intact.
 */
import { Link } from "react-router-dom";
import Cover from "../components/Cover";
import Report from "../components/Report";
import Evidence from "../components/Evidence";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";

export default function Landing() {
  return (
    <>
      <Cover />
      <Report />
      <Evidence />

      {/* CTA contributor — bridges to /participate */}
      <section className="px-5 py-16 md:px-12 lg:px-20">
        <Reveal className="mx-auto max-w-5xl border-2 border-blood bg-ink p-8 text-center shadow-[10px_10px_0_rgba(110,11,30,0.35)] md:p-12">
          <Stamp rot={-5} className="mb-6 text-[11px]">Appel à témoins</Stamp>
          <h2 className="font-display text-3xl font-black text-bone md:text-4xl">
            Vous avez une preuve <span className="italic text-ember">d'amour ?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-[12px] leading-relaxed text-bone/70">
            Le dossier reste ouvert jusqu'au 13 août. Versez votre pièce : un message, une photo,
            une vidéo — ou les trois. Le greffe refuse seulement le vide (et le rose).
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/participate"
              className="btn-stamp inline-flex items-center gap-3 border border-ember/60 bg-blood px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-parch"
            >
              Déposer une pièce →
            </Link>
            <Link
              to="/jenny"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/65 underline decoration-blood/60 underline-offset-8 hover:text-ember"
            >
              Accès Jenny (privé)
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
