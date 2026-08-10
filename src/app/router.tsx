import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Landing from "../pages/Landing";
import Participate from "../pages/Participate";
import Thanks from "../pages/Thanks";
import JennyGate from "../pages/JennyGate";
import JennyExperience from "../pages/JennyExperience";
import NotFound from "../pages/NotFound";

/**
 * Routing — Phase 7 §09
 * /                 → Landing (dossier teaser)
 * /participate      → Contributor form (isolated)
 * /thanks           → Success confirmation
 * /jenny            → Private gate (token)
 * /jenny/experience → Full Jenny experience (protected)
 * /jenny/memories   → (alias to experience for now, Phase E will expand)
 */
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/participate", element: <Participate /> },
      { path: "/thanks", element: <Thanks /> },
      { path: "/jenny", element: <JennyGate /> },
      { path: "/jenny/experience", element: <JennyExperience /> },
      { path: "/jenny/memories", element: <JennyExperience /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
