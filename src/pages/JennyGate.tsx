import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";
import { authenticateJenny, hasJennySession, verifyJennySession } from "../lib/auth";
import { usePrivateRouteMeta } from "../hooks/usePrivateRouteMeta";

type GateError = "denied" | "unavailable" | null;

export default function JennyGate() {
  const nav = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState<GateError>(null);
  const [shake, setShake] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(hasJennySession());
  usePrivateRouteMeta();

  useEffect(() => {
    if (!hasJennySession()) {
      setCheckingSession(false);
      return;
    }

    let active = true;
    void verifyJennySession().then((valid) => {
      if (!active) return;
      if (valid) nav("/jenny/experience", { replace: true });
      else setCheckingSession(false);
    });
    return () => {
      active = false;
    };
  }, [nav]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting || checkingSession) return;

    setSubmitting(true);
    setError(null);
    const result = await authenticateJenny(accessCode);
    setSubmitting(false);

    if (result.ok) {
      setAccessCode("");
      nav("/jenny/experience", { replace: true });
      return;
    }

    setAccessCode("");
    setError(result.reason);
    setShake((key) => key + 1);
  };

  const busy = submitting || checkingSession;

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
              Ce dossier est scellé. Si tu es Jenny, entre le code d'accès qui t'a été
              transmis séparément.
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-4" aria-busy={busy}>
              <label htmlFor="jenny-access-code" className="sr-only">
                Code d'accès privé
              </label>
              <input
                id="jenny-access-code"
                name="jenny-access-code"
                type="password"
                value={accessCode}
                onChange={(event) => {
                  setAccessCode(event.target.value);
                  setError(null);
                }}
                placeholder="Code d'accès privé"
                className="w-full border border-bone/30 bg-ink px-4 py-3 font-mono text-[13px] tracking-[0.12em] text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none disabled:opacity-60"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                disabled={busy}
                required
              />
              <button
                type="submit"
                disabled={busy || accessCode.trim().length === 0}
                className="btn-stamp border border-ember/60 bg-blood px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-parch disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkingSession
                  ? "Vérification de la session…"
                  : submitting
                    ? "Vérification du code…"
                    : "Ouvrir le dossier"}
              </button>
              {error && (
                <p
                  key={shake}
                  role="alert"
                  className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ember"
                >
                  {error === "denied"
                    ? "Accès refusé — vérifie le code privé qui t'a été envoyé."
                    : "Service privé temporairement indisponible — réessaie dans un instant."}
                </p>
              )}
            </form>

            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-fog/60">
              Le code n'est jamais conservé. Une session temporaire, limitée à cet onglet,
              est validée côté serveur.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
