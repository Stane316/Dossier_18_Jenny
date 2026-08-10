import { Link } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";

export default function NotFound() {
  return (
    <section className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Stamp rot={7} className="text-sm">Pièce manquante</Stamp>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 font-display text-5xl font-black italic text-bone md:text-6xl">404</h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-fog">
            Ce chapitre n'existe pas au dossier.
          </p>
          <p className="mx-auto mt-4 max-w-md font-mono text-[13px] leading-relaxed text-bone/70">
            Le greffe n'a retrouvé aucune pièce à cette référence. Vérifie l'URL ou retourne au
            dossier principal.
          </p>
        </Reveal>
        <Reveal delay={240} className="mt-10">
          <Link
            to="/"
            className="btn-stamp inline-flex border border-ember/60 bg-blood px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-parch"
          >
            Retour au dossier N°18
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
