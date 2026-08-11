import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Stamp } from "../components/Chrome";
import { Reveal } from "../hooks";
import { usePrivateRouteMeta } from "../hooks/usePrivateRouteMeta";
import {
  authenticateJenny,
  verifyJennySession,
  type JennyAuthFailureReason,
} from "../lib/auth";

type GateError = JennyAuthFailureReason | null;

const PROMISES = ["Des souvenirs", "Des voix", "Quelques surprises"];

const ERROR_MESSAGES: Record<JennyAuthFailureReason, string> = {
  denied:
    "Ce n’est pas la bonne combinaison. Vérifie doucement l’adresse et le mot de passe.",
  unconfirmed:
    "L’adresse est reconnue, mais le compte Supabase doit encore être confirmé avant d’ouvrir le dossier.",
  configuration:
    "Tes identifiants ont été acceptés, mais la porte privée n’est pas correctement reliée au service. Préviens la personne qui t’a transmis l’accès.",
  unavailable:
    "La porte ne répond pas pour le moment. Vérifie la connexion puis réessaie dans un petit instant.",
};

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
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden px-5 py-16 md:px-12 md:py-24 lg:px-20">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(200,16,46,0.2),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(201,162,39,0.12),transparent_30%),linear-gradient(145deg,#070405_0%,#171013_52%,#0c0709_100%)]" />
      <div aria-hidden="true" className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full border border-ember/15 shadow-[0_0_100px_rgba(200,16,46,0.12)] md:h-96 md:w-96" />
      <div aria-hidden="true" className="absolute -right-32 bottom-10 -z-10 h-80 w-80 rounded-full border border-brass/10 md:h-[28rem] md:w-[28rem]" />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="overflow-hidden border border-bone/15 bg-coal/80 shadow-[0_32px_90px_rgba(4,2,3,0.72)] backdrop-blur-sm lg:grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative flex min-h-[31rem] flex-col justify-between overflow-hidden border-b border-bone/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rotate-12 rounded-full border-[28px] border-blood/10" />
              <div aria-hidden="true" className="barcode absolute bottom-8 right-8 h-9 w-28 text-bone/10" />

              <div className="relative">
                <Stamp rot={-5} className="text-[9px] md:text-[10px]">
                  Dossier n°18 · Pour Jenny
                </Stamp>
                <p className="mt-10 font-hand text-2xl text-brass md:text-3xl">On t’attendait.</p>
                <h1 className="mt-2 max-w-lg font-display text-4xl font-black leading-[0.98] text-bone md:text-6xl">
                  Jenny, ceci n’a été préparé que <span className="italic text-ember">pour toi.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[13px] leading-7 text-bone/72 md:text-sm">
                  Derrière cette porte, il y a des fragments de ceux qui pensent à toi — rassemblés avec beaucoup d’affection et juste assez de mystère.
                </p>
              </div>

              <div className="relative mt-12">
                <div className="max-w-md rotate-[-1deg] border-l-2 border-brass/60 bg-paper px-6 py-5 text-ink shadow-[8px_10px_0_rgba(110,11,30,0.24)]">
                  <p className="font-hand text-2xl leading-snug">
                    « Ce dossier n’a qu’une seule destinataire. Toi. »
                  </p>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-wine/70">
                    Note laissée avant l’ouverture
                  </p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Ce qui t’attend">
                  {PROMISES.map((promise, index) => (
                    <li key={promise} className="border border-bone/15 bg-ink/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-bone/65">
                      <span className="mr-2 text-ember">0{index + 1}</span>
                      {promise}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center bg-ink/35 p-8 md:p-12">
              <div className="w-full">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-ember">
                  Dernier petit verrou
                </p>
                <h2 className="mt-3 font-display text-3xl font-black text-bone md:text-4xl">
                  Entre, c’est chez toi.
                </h2>
                <p id="jenny-login-help" className="mt-4 max-w-md font-mono text-[11px] leading-6 text-bone/58">
                  Utilise l’adresse et le mot de passe qui ont été préparés pour toi. Personne d’autre ne peut ouvrir ce dossier.
                </p>

                <form onSubmit={submit} className="mt-8 grid gap-5" aria-busy={busy} aria-describedby="jenny-login-help">
                  <div>
                    <label htmlFor="jenny-email" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-fog">
                      Ton adresse email
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
                      placeholder="L’adresse qui t’a été donnée"
                      className="w-full rounded-sm border border-bone/20 bg-deep/80 px-4 py-3.5 font-mono text-[12px] text-bone shadow-inner placeholder:text-bone/25 transition-colors focus:border-brass focus:outline-none disabled:opacity-60"
                      autoComplete="username"
                      autoCapitalize="none"
                      spellCheck={false}
                      disabled={busy}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="jenny-password" className="mb-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-fog">
                      Ton mot de passe
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
                      placeholder="Le secret du dossier"
                      className="w-full rounded-sm border border-bone/20 bg-deep/80 px-4 py-3.5 font-mono text-[12px] tracking-[0.08em] text-bone shadow-inner placeholder:tracking-normal placeholder:text-bone/25 transition-colors focus:border-brass focus:outline-none disabled:opacity-60"
                      autoComplete="current-password"
                      disabled={busy}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={busy || !email.trim() || !password}
                    className="btn-stamp mt-1 border border-ember/70 bg-blood px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-parch disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {checkingSession
                      ? "Je vérifie que c’est bien toi…"
                      : submitting
                        ? "La porte s’ouvre…"
                        : "Découvrir ce qu’on t’a préparé"}
                  </button>

                  <div aria-live="polite" aria-atomic="true">
                    {error && (
                      <p
                        key={shake}
                        role="alert"
                        className="deny-shake border-l-2 border-blood bg-blood/5 px-4 py-3 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-ember"
                      >
{ERROR_MESSAGES[error]}
                      </p>
                    )}
                  </div>
                </form>

                <p className="mt-6 border-t border-bone/10 pt-5 font-mono text-[9px] leading-5 text-fog/55">
                  Ton accès reste personnel et confidentiel. Le mot de passe n’est jamais conservé par cette page.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
