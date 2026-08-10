import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";
import { authenticateJenny, getJennyToken } from "../lib/auth";

export default function JennyGate() {
  const nav = useNavigate();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateJenny(token)) {
      nav("/jenny/experience");
    } else {
      setError(true);
      setShake((k) => k + 1);
    }
  };

  return (
    <section className="px-5 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <div className="border border-ember/25 bg-coal/70 p-8 shadow-[0_24px_60px_rgba(4,2,3,0.6)] md:p-10">
            <Stamp rot={-6} className="text-[10px]">Accès privé — Jenny uniquement</Stamp>
            <h1 className="mt-6 font-display text-3xl font-black text-bone md:text-4xl">
              Entrée <span className="italic text-ember">réservée</span>
            </h1>
            <p className="mt-4 font-mono text-[12px] leading-relaxed text-bone/70">
              Ce dossier est scellé. Si tu es Jenny, entre le token qui t'a été transmis.
              <br />
              <span className="text-fog">Indice : il commence par JENNY_18_</span>
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-4">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="JENNY_18_..."
                className="w-full border border-bone/30 bg-ink px-4 py-3 font-mono text-[13px] tracking-[0.12em] text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="btn-stamp border border-ember/60 bg-blood px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-parch"
              >
                Ouvrir le dossier
              </button>
              {error && (
                <p
                  key={shake}
                  role="alert"
                  className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ember"
                >
                  Token invalide — vérifie le message qui t'a été envoyé.
                </p>
              )}
            </form>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-fog/60">
              Token d'accès configuré côté serveur : vérifie <code className="text-bone/70">VITE_JENNY_TOKEN</code>
              <br />
              Valeur attendue (demo) : <span className="text-ember">{getJennyToken()}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
