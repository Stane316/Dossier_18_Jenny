import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cover from "../components/Cover";
import Report from "../components/Report";
import Evidence from "../components/Evidence";
import Depositions from "../components/Depositions";
import Screening from "../components/Screening";
import Verdict from "../components/Verdict";
import Archive from "../components/Archive";
import IntroOrbit from "../components/IntroOrbit";
import { clearJennySession, verifyJennySession } from "../lib/auth";
import { usePrivateRouteMeta } from "../hooks/usePrivateRouteMeta";

/** /jenny/experience — protected by the temporary per-tab Jenny client gate. */
export default function JennyExperience() {
  const nav = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  usePrivateRouteMeta();

  useEffect(() => {
    let active = true;
    void verifyJennySession().then((valid) => {
      if (!active) return;
      if (valid) setAuthorized(true);
      else nav("/jenny", { replace: true });
    });
    return () => {
      active = false;
    };
  }, [nav]);

  const signOut = async () => {
    await clearJennySession();
    nav("/jenny", { replace: true });
  };

  if (!authorized) {
    return (
      <section className="flex min-h-[65vh] items-center justify-center px-5 py-24">
        <p role="status" className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
          Vérification de l’accès Jenny…
        </p>
      </section>
    );
  }

  return (
    <>
      <div className="fixed right-4 top-16 z-[80] md:right-8">
        <button
          type="button"
          onClick={() => void signOut()}
          className="border border-ember/40 bg-ink/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/75 backdrop-blur transition-colors hover:border-ember hover:text-ember"
        >
          Fermer la session
        </button>
      </div>
      <IntroOrbit />
      <Cover privateMode />
      <Report privateMode />
      <Evidence />
      <Depositions privateMode />
      <Screening privateMode />
      <Verdict />
      <Archive />
    </>
  );
}
