import { Link, useLocation } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";

export default function Thanks() {
  const loc = useLocation() as { state?: { local?: boolean; supabase?: boolean; name?: string } };
  const isLocal = Boolean(loc.state?.local);
  const isConfirmed = isLocal || Boolean(loc.state?.supabase);
  return (
    <section className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Stamp rot={-4} animate className="bg-ink text-sm md:text-base">
            {isConfirmed ? "Pièce reçue" : "Dépôt non confirmé"}
          </Stamp>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[0.9] text-bone">
            {isConfirmed ? <>Merci, <span className="italic text-ember">témoin.</span></> : <>Aucune pièce <span className="italic text-ember">confirmée.</span></>}
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-bone/75">
            {isConfirmed
              ? "Votre dépôt a été versé au dossier. Il sera examiné puis scellé dans la partie privée de Jenny — elle le découvrira le 13 août, avec toutes les autres preuves d'amour."
              : "Cette page ne dispose d’aucune confirmation d’envoi. Retournez au formulaire pour déposer votre message, votre photo ou votre vidéo."}
          </p>
          {isLocal && (
            <p className="mx-auto mt-4 max-w-xl border border-brass/25 bg-brass/10 px-4 py-3 font-mono text-[11px] leading-relaxed text-brass">
              Mode démo : votre pièce est conservée localement dans ce navigateur. Configurez
              Supabase pour une persistance partagée.
            </p>
          )}
        </Reveal>

        <Reveal delay={260} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-stamp border border-bone/20 bg-ink px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-bone hover:border-ember hover:text-ember"
          >
            Retour au dossier
          </Link>
          <Link
            to="/participate"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/65 underline decoration-blood/60 underline-offset-8 hover:text-ember"
          >
            {isConfirmed ? "Déposer une autre pièce" : "Ouvrir le formulaire"}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
