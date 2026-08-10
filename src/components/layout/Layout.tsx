import { Outlet } from "react-router-dom";
import { AmbientLayers, DossierBar } from "../Chrome";
import { DOSSIER_REF } from "../../data";
import { BunnyIcon, FolderIcon, PawIcon } from "../icons";

export function Footer() {
  return (
    <footer className="border-t border-blood/25 bg-deep px-5 py-10 md:px-12 lg:px-20">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fog">
          <FolderIcon className="h-4 w-4 text-blood" />
          Dossier N°18 — Réf. {DOSSIER_REF}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">
          Rédigé avec une précision d'apothicaire — pour Jenny, et pour personne d'autre.
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          <PawIcon className="h-4 w-4 text-blood" />
          Chaton d'abord
          <span className="text-blood/50">·</span>
          <BunnyIcon className="h-4 w-4 text-blood/75" />
          lapin juste derrière
        </span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-ink font-mono text-bone">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-blood focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-parch"
      >
        Aller au contenu
      </a>
      <DossierBar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <AmbientLayers />
    </div>
  );
}
