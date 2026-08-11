import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cover from "../components/Cover";
import Report from "../components/Report";
import Evidence from "../components/Evidence";
import Depositions from "../components/Depositions";
import Screening from "../components/Screening";
import Verdict from "../components/Verdict";
import Archive from "../components/Archive";
import IntroOrbit from "../components/IntroOrbit";
import { isJennyAuthenticated } from "../lib/auth";

/**
 * /jenny/experience — private Jenny experience (Phase E)
 * Protected by token gate. For Phase B, we check localStorage token.
 * In production, this would also verify Supabase RLS / server token.
 */
export default function JennyExperience() {
  const nav = useNavigate();

  useEffect(() => {
    if (!isJennyAuthenticated()) {
      nav("/jenny", { replace: true });
    }
  }, [nav]);

  if (!isJennyAuthenticated()) {
    return null; // redirecting
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
