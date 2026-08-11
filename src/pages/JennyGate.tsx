import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Reveal } from "../hooks";
import { Stamp } from "../components/Chrome";
import { authenticateJenny, verifyJennySession } from "../lib/auth";
import { usePrivateRouteMeta } from "../hooks/usePrivateRouteMeta";

type GateError = "denied" | "unavailable" | null;

export default function JennyGate() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<GateError>(null);
  const [shake, setShake] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  usePrivateRouteMeta();

  useEffect(() => {
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
    const result = await authenticateJenny(email, password);
    setSubmitting(false);
    setPassword("");

    if (result.ok) {
      nav("/jenny/experience", { replace: true });
      return;
    }

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
              Connecte-toi avec l'adresse email et le code privé qui t'ont été transmis.
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-4" aria-busy={busy}>
              <div>
                <label htmlFor="jenny-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                  Adresse email
                </label>
                <input
                  id="jenny-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(null);
                  }}
                  placeholder="jenny@exemple.com"
                  className="w-full border border-bone/30 bg-ink px-4 py-3 font-mono text-[13px] text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none disabled:opacity-60"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={busy}
                  required
                />
              </div>
              <div>
                <label htmlFor="jenny-password" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                  Code privé
                </label>
                <input
                  id="jenny-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError(null);
                  }}
                  placeholder="Code privé"
                  className="w-full border border-bone/30 bg-ink px-4 py-3 font-mono text-[13px] tracking-[0.12em] text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none disabled:opacity-60"
                  autoComplete="current-password"
                  disabled={busy}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={busy || !email.trim() || !password}
                className="btn-stamp border border-ember/60 bg-blood px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-parch disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkingSession
                  ? "Vérification de la session…"
                  : submitting
                    ? "Connexion sécurisée…"
                    : "Ouvrir le dossier"}
              </button>
              {error && (
                <p
                  key={shake}
                  role="alert"
                  className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ember"
                >
                  {error === "denied"
                    ? "Accès refusé — vérifie l'adresse email et le code privé."
                    : "Service privé temporairement indisponible — réessaie dans un instant."}
                </p>
              )}
            </form>

            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-fog/60">
              Connexion vérifiée par Supabase Auth. Le code privé n'est jamais stocké par cette application.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
