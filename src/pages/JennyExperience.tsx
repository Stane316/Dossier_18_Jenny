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
import { verifyJennySession } from "../lib/auth";
import { usePrivateRouteMeta } from "../hooks/usePrivateRouteMeta";

/** /jenny/experience — private experience protected by a server-verified bounded session. */
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

  if (!authorized) {
    return (
      <section className="flex min-h-[65vh] items-center justify-center px-5 py-24">
        <p role="status" className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
          Vérification du sceau privé…
        </p>
      </section>
    );
  }

  return (
    <>
      <IntroOrbit />
      <Cover />
      <Report />
      <Evidence />
      <Depositions privateMode />
      <Screening privateMode />
      <Verdict />
      <Archive />
    </>
  );
}
