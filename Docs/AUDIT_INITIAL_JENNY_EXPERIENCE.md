# AUDIT INITIAL — JENNY EXPERIENCE
### Dossier N°18 — Affaire Jenny | Repository Audit, Implementation & QA
**Date : 10 août 2026 (Africa/Lagos) — J-3 avant le 13 août**  
**Auditeur : Development AI (Lead Frontend / Creative Technologist / Motion & 3D Engineer / QA)**  
**Repository : https://github.com/Stane316/Dossier_18_Jenny.git — commit `8e292ee premier aperçu visuel` + `0f6bbb2 first commit`**

---

## 0 — MÉTHODE

> `CLONE → INSPECT STRUCTURE → READ README → READ DOCS → AUDIT EXISTING WORK → COMPARE vs SOURCE OF TRUTH → DEFINE IMPLEMENTATION STATE → ONLY THEN IMPLEMENT`

Cet audit respecte strictement l'ordre obligatoire de lecture :

1. `Docs/README.md` (1139 lignes)
2. `DIGITAL EXPERIENCE DESIGN SYSTEM.md` (1573 lignes)
3. `DIGITAL EXPERIENCE UX & QUALITY SYSTEM.md` (1590 lignes)
4. `DIGITAL EXPERIENCE 3D & MOTION ENGINEERING SYSTEM.md` (2483 lignes)
5. Phases 1 → 7 (01 à 07, 14 959 lignes cumulées)
6. Inspection du repository réel (code, assets, styles, motion)

**Principe appliqué : Le repository est la réalité courante (règle 08). Aucune hypothèse n'a été faite sans vérification filesystem + build.**

---

## 1 — PROJECT STATUS (synthèse exigée §68)

```text
PROJECT STATUS

Documentation:        COMPLETE (10/10 docs présents, ~24 959 lignes)
Visual Design:        PRESENT & EXÉCUTÉ EN CODE (prototype haute fidélité opérationnel)
Existing Implementation: PARTIAL (expérience narrative complète, infrastructure data absente)
Compliance:           MOYENNE-HAUTE sur identité / UX / motion
                      BASSE sur architecture technique Phase 7 (Supabase, routing, storage, privacy)
Critical Gaps:        6 écarts bloquants pour livraison du 13 août (voir §5)
Recommended Next Step: CONSERVER le design + COMPLÉTER la fondation (option A)
                       → Routing, Supabase, Storage, accès privé Jenny, persistance contributions
                       → Sans réécriture visuelle (le code existant est une ressource)
```

---

## 2 — REPOSITORY — STRUCTURE RÉELLE

### 2.1 Arborescence vérifiée

```
/ (root)
├── Docs/                              10 fichiers markdown — source of truth
│   ├── README.md                      (hub, 11 Ko)
│   ├── DIGITAL EXPERIENCE DESIGN SYSTEM.md
│   ├── DIGITAL EXPERIENCE UX & QUALITY SYSTEM.md
│   ├── DIGITAL EXPERIENCE 3D & MOTION ENGINEERING SYSTEM.md
│   ├── 01_REVERSE_ENGINEERING_STELLA.md
│   ├── 02_JENNY_EXPERIENCE_MAP_IDENTITY.md
│   ├── 03_EXPERIENCE_ARCHITECTURE.md
│   ├── 04_UX_UI_FLOW_INTERACTION_SPECIFICATION.md
│   ├── 05_JENNY_VISUAL_DIRECTION_DESIGN_SYSTEM.md
│   ├── 06_JENNY_3D_MOTION_IMMERSIVE_ENGINEERING.md
│   └── 07_TECHNICAL_ARCHITECTURE_IMPLEMENTATION_BLUEPRINT.md
├── public/images/                     7 assets (1.1 Mo total)
│   ├── emblem-cat.jpg                 113 Ko — emblème Cover
│   ├── papillon-or.jpg                99 Ko — climax Verdict
│   ├── piece-chaton.jpg               187 Ko — Exhibit A-01
│   ├── piece-lapin.jpg                194 Ko — Exhibit A-02
│   ├── piece-carnets.jpg              170 Ko — Exhibit A-03 (Maomao/Jinshi)
│   ├── piece-cinema.jpg               118 Ko — Exhibit A-04 (horreur)
│   └── piece-bac.jpg                  200 Ko — Exhibit A-05 (bac)
├── src/
│   ├── App.tsx                        2.1 Ko — assemblage 7 chapitres
│   ├── main.tsx                       entry
│   ├── index.css                      10.3 Ko — design tokens + motion
│   ├── data.ts                        12.8 Ko — contenu déclaratif complet
│   ├── hooks.tsx                      4.3 Ko — primitives réutilisables
│   ├── utils/cn.ts
│   └── components/                    8 composants
│       ├── Chrome.tsx                 DossierBar, SectionHead, Stamp, AmbientLayers
│       ├── Cover.tsx                  Chapitre I
│       ├── Report.tsx                 Chapitre II (typewriter)
│       ├── Evidence.tsx               Chapitre III (fil rouge SVG + tilt)
│       ├── Depositions.tsx            Chapitre IV + ContributeForm
│       ├── Screening.tsx              Chapitre V (vidéo + transcription)
│       ├── Verdict.tsx                Chapitre VI (canvas braises + lettre)
│       ├── Archive.tsx                Chapitres VII + VIII (annexe visuelle)
│       └── icons.tsx                  9 icônes trait PV
├── index.html                         SEO + fonts (Fraunces, IBM Plex Mono, Caveat)
├── package.json                       react 19.2.6, vite 7.3.2, tailwind 4.1.17
├── vite.config.ts                     viteSingleFile + tailwindcss + alias @/
└── tsconfig.json                      strict, bundler mode
```

### 2.2 Stack vérifiée

| Couche | État | Version | Conformité Phase 7 |
|---|---|---|---|
| React | ✅ présent | 19.2.6 | conforme |
| Vite | ✅ présent | 7.3.2 | conforme |
| TypeScript | ✅ présent | 5.9.3 | strict:true, conforme |
| Tailwind CSS | ✅ présent | 4.1.17 (+ @tailwindcss/vite) | recommandé |
| React Router | ❌ absent | — | **écart** (Phase 7 §09 exige routing) |
| Supabase JS | ❌ absent | — | **écart** |
| Framer Motion | ❌ absent | — | toléré (motion en CSS/DOM uniquement) |
| GSAP | ❌ absent | — | toléré (timeline simple = CSS) |
| Three.js / R3F | ❌ absent | — | toléré, décision justifiée voir §3.5 |
| vite-plugin-singlefile | ✅ présent | 2.3.0 | utile pour build mono-fichier |

**Build vérifié le 10 août : `npm install` (95 packages) → `npm run build` ✓ 304.61 kB (gzip 89.09 kB) → 40 modules transformés. Aucune erreur TS. 2 vulnérabilités npm audit (1 low, 1 high) non bloquantes.**

### 2.3 Configuration & environnement

- Aucun `.env`, `.env.example` — **écart** (Phase 7 §42 exige `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PRIVATE_ACCESS_TOKEN` documentés)
- Aucun `supabase/` folder, aucune migration SQL
- Aucun bucket Storage configuré
- Thème sombre forcé (`#0C0709`), pas de toggle — conforme à Jenny (rouge/noir)

---

## 3 — DOCUMENTATION — INVENTAIRE

### 3.1 Reference Systems (Sources 01-03) — COMPLETS

| Document | Lignes | Rôle | Lecture |
|---|---|---|---|
| DESIGN SYSTEM | 1574 | PURPOSE → CONTENT → HIERARCHY → LAYOUT → VISUAL → INTERACTION → MOTION → 3D | ✅ lu intégralement |
| UX & QUALITY SYSTEM | 1591 | Clarity before complexity, states, feedback, accessibility | ✅ lu |
| 3D & MOTION ENGINEERING | 2484 | INTENTION → EXPERIENCE → MOTION CONCEPT → TECH → IMPLEMENTATION | ✅ lu |

**Hiérarchie respectée dans le code existant : `CONTENT → HIERARCHY → LAYOUT → VISUAL → INTERACTION → MOTION → 3D (dégradé)` — conforme §07 README.**

### 3.2 Phases 1 → 7 — COMPLETES

| Phase | Lignes | Statut | Point clé pour l'audit |
|---|---|---|---|
| 01 Reverse Stella | 1556 | COMPLETE | Contribution model Stella compris, non copié |
| 02 Jenny Identity | 1734 | COMPLETE | Jenny/Méminou, chatons>lapins, rouge/noir, rose interdit, Apothecary, horreur, franchise |
| 03 Experience Architecture | 3059 | COMPLETE | 13 chapitres narratifs, 4 levels (Entry → Celebration) |
| 04 UX/UI Flow | 3540 | COMPLETE | Contributor flow OPEN→UNDERSTAND→CREATE→PREVIEW→SUBMIT→CONFIRM |
| 05 Visual Direction | 3237 | COMPLETE | Palette Encre/Tampon/Braise/Lie-de-vin/Dossier/Os/Laiton + Fraunces/Plex Mono/Caveat |
| 06 3D/Motion | 4128 | COMPLETE | Motion ownership, parallax, filmique léger, WebGL = progressive enhancement |
| 07 Technical Blueprint | 2059 | COMPLETE | Stack, Supabase, Storage, routing, security, engine |

**Aucun Visual Design Package Figma externe — le code actuel FAIT office de Visual Design Package approuvé (Phase 5 matérialisée).**

---

## 4 — EXISTING IMPLEMENTATION — AUDIT DÉTAILLÉ

### 4.1 Pages & Routing

| Exigence Phase 7 §09 | Existant | Verdict |
|---|---|---|
| `/` (landing + dossier complet) | ✅ `App.tsx` rend 7 chapitres scrollés en single-page | PARTIAL — répond au besoin narratif mais fusionne landing + Jenny experience |
| `/participate` | ❌ ancre `#deposer` dans `#temoins` | NON-CONFORME |
| `/thanks` | ❌ message inline `Pièce versée` | NON-CONFORME |
| `/jenny` + `/jenny/experience` + `/jenny/memories` | ❌ non existant — tout est public | NON-CONFORME (privacy Jenny non protégée) |
| `/404` | ❌ non existant | PARTIAL (SPA sans router = 404 serveur non géré) |

**Impact :** Contributeur et Jenny utilisent la même URL. Aucune séparation d'accès. Confus pour partage du lien contributeur vs surprise Jenny.

### 4.2 Composants & Features

| Composant | Fichier | Rôle | Qualité |
|---|---|---|---|
| **Cover** | `Cover.tsx` 164 l | Chapitre I — titre Jenny., fiche identité, sceau cire rotatif, marquee | ⭐ Exceptionnel — identité immédiate |
| **Report** | `Report.tsx` 85 l | Chapitre II — 6 faits + typewriter 15ms | ⭐ Très soigné, `useTypewriter` avec reduced-motion fallback |
| **Evidence** | `Evidence.tsx` 154 l | Chapitre III — 5 pièces + fil rouge SVG 2600 dash + tilt DOM | ⭐ Fil rouge = métaphore enquête, tilt 4.5° hover-only |
| **Depositions** | `Depositions.tsx` 278 l | Chapitre IV — 5 témoignages + **ContributeForm** | ✅ Form fonctionnel mais in-memory |
| **Screening** | `Screening.tsx` 217 l | Chapitre V — player vidéo custom + transcription synchro | ⭐ Très cinématographique, poster → metadata → play on demand |
| **Verdict** | `Verdict.tsx` 191 l | Chapitre VI — tampon COUPABLE + lettre manuscrite + canvas braises 34 particules + papillon | ⭐ Climax émotionnel réussi |
| **Archive** | `Archive.tsx` 229 l | Chapitres VII-VIII — clôture + annexe tokens | ✅ Annexe = documentation vivante |
| **Chrome** | `Chrome.tsx` 160 l | DossierBar (progress + chapitre actif via IntersectionObserver), Stamp, SectionHead, AmbientLayers | ⭐ Barre + fil rouge progression = orientation sans surcharge |

### 4.3 Styles & Design Tokens

`index.css` implémente fidèlement la Phase 5 :

```css
--color-ink: #0C0709; --color-blood: #C8102E; --color-ember: #E8404A;
--color-wine: #6E0B1E; --color-brass: #C9A227; --color-paper: #ECE1CC;
--font-display: Fraunces; --font-mono: IBM Plex Mono; --font-hand: Caveat;
--ease-dramatic: (0.16,1,0.3,1); --ease-standard: (0.22,0.61,0.36,1);
```

- Grain SVG turbulence + vignette radiale (z-index 70/65, pointer-events none)
- `paper-surface` avec repeating-linear + radial or
- Tampons double-border + mask turbulence 0.92
- `[data-reveal]` → `is-in` (opacity + translateY 28px, 0.9s/1s)
- `prefers-reduced-motion: reduce` → animation-duration 0.01ms, reveal opacity 1, grain none — **conforme §22 DESIGN SYSTEM + §30 UX**

**Verdict : Aucune trace de rose. Rouge utilisé comme signal (CTA, tampons, filets), jamais comme remplissage — conforme Phase 5 §357.**

### 4.4 Motion & Interaction

| Système | Technique actuelle | Conformité 3D & Motion §01.3 |
|---|---|---|
| Reveals au scroll | `useInView` (IntersectionObserver threshold 0.15, rootMargin -6%) → `[data-reveal]` | ✅ use simplest tech (DOM/CSS), pas de GSAP nécessaire ici |
| Typewriter | `useTypewriter` setTimeout 15ms + pause 380ms, fallback instantané si reduced-motion | ✅ owner = Report, interruptible non nécessaire |
| Tilt cartes | `useTilt` pointermove → CSS vars `--tilt-x/y` → `perspective(1000px)` | ✅ hover-only + media query `(hover:hover)`, désactivé sur touch/reduced-motion |
| Fil rouge | SVG path strokeDasharray 2600 → strokeDashoffset 0 sur inView (2.4s ease) | ✅ intention → experience → tech |
| Tampon verdict | `stamp-in` scale 2.6→1 + section-shake 0.45s | ✅ purpose=climax, trigger=inView 0.45 |
| Braises | Canvas 2D 34 particules, IntersectionObserver pause hors viewport | ✅ GPU-light, pas de WebGL |
| Vidéo | IntersectionObserver 0.35 → play/pause auto, loop, muted, poster | ✅ poster→metadata→lazy→play on demand (PERFORMANCE §35) |

**Motion ownership : chaque animation a 1 owner identifiable, pas de conflit `Scroll→camera + Mouse→camera`. Conforme §30.**

### 4.5 3D / WebGL

**Aucune dépendance Three.js / R3F / shader.** Choix documenté dans `Archive.tsx` annexe :

> "La 3D WebGL n'est pas retenue pour ce prototype : le tilt DOM, le fil rouge SVG et les braises canvas portent la profondeur sans dépendance technique."

**Analyse :**

- **CONFORME** à la règle Phase 6 / Source 03 §01.3 : *Use simplest technology that achieves effect.* La profondeur est déjà créée par vignette, grain, ombres dures, parallax implicite, canvas léger.
- **CONFORME** à *Progressive Enhancement* (README §09) : expérience complète sans WebGL. Fallback = core experience.
- **Proposition non bloquante** : une 3D légère (ex: particules supplémentaires, scène papillon en WebGL isolée) pourrait être ajoutée en **Progressive Enhancement** en Phase H, mais **ne doit pas devenir un single point of failure** (§32). Pour le 13 août, la priorité est la DATA, pas la 3D.

### 4.6 Backend / Data / Supabase

| Exigence Phase 7 | Existant | Risque |
|---|---|---|
| `contributors` table (id, name, link, created_at) | ❌ | Contributions perdues au refresh |
| `contributions` table (id, contributor_id, status pending/approved, created_at) | ❌ | Pas de modération |
| `media_assets` table (contribution_id, type photo/video, storage_path, mime) | ❌ | Pas de métadonnées |
| `experience_settings` (private_token, is_open) | ❌ | Pas de contrôle d'ouverture |
| Supabase Storage `birthday-media/photos + videos + thumbnails` | ❌ | Fichiers en `URL.createObjectURL` blob éphémère |
| Validation `message OR photo OR video` | ✅ côté client (`if (!msg.trim() && !photo && !video)`) | conforme métier mais pas persistée |
| Upload states `idle/selecting/uploading/processing/success/error/retry` | ❌ seulement `error` (deny-shake) + `success` inline | **écart UX** — pas de progress, pas de retry |
| Sécurité `PUBLIC CONTRIBUTOR ≠ PUBLIC DATABASE` | ❌ tout est public, pas de RLS | **écart sécurité** |
| Jenny private route `+ token + server validation` | ❌ | expérience surprise non protégée |

**Data actuelle :** `src/data.ts` contient données *déclaratives* fictives (5 dépositions, 5 exhibits, 3 recordings Pexels). `Depositions.tsx` ajoute `extra: Deposition[]` en `useState` — volatile, non synchronisé, non partagé entre visiteurs.

### 4.7 Assets

- 7 images locales, chargées eager (A-01) / lazy (autres) — conforme. Formats JPG, pas WebP/AVIF — améliorable mais non bloquant.
- 3 vidéos externes Pexels (CDN), `preload=metadata`, `playsInline` — conforme §35 vidéo strategy.
- Fonts Google Fonts avec preconnect — conforme performance.

### 4.8 Tests & QA

- Aucun test unitaire / intégration / E2E — **écart** Phase 7 §44.
- Aucun lint / typecheck CI — mais `tsc strict` passe localement.

---

## 5 — MATRICE DE CONFORMITÉ (DOCUMENTED vs EXISTING)

| # | Documented Requirement (source) | Existing Implementation | Conforme ? | Impact | Recommandation |
|---|---|---|---|---|---|
| 1 | **Identité rouge/noir, rose interdit** (Phase 2,5) | Encre #0C0709 + Tampon #C8102E, 0 rose | **YES** | — | **KEEP** |
| 2 | **Chaton > lapin** (Phase 2) | A-01 SUSPECT PRINCIPAL + paw, A-02 COMPLICE + bunny 80% opacity, footer "Chaton d'abord" | **YES** | — | **KEEP** |
| 3 | **Romance / Apothecary / Maomao/Jinshi** | Carnets A-03 + "précision d'apothicaire" + laiton #C9A227 climax only | **YES** | — | **KEEP** |
| 4 | **Date pivot 13 août** | Réf J-18/08-13 partout, DossierBar, marquee, clôture | **YES** | — | **KEEP** |
| 5 | **Bac + 18 ans double milestone** | Pièce A-05 "Pièce maîtresse", faits 01/02 | **YES** | — | **KEEP** |
| 6 | **Franchise / directe / attention** | Fait 06 + lettre "tu dis vrai" | **YES** | — | **KEEP** |
| 7 | **Narrative ENTRY→CLOSING** (Phase 3) | 8 chapitres I-VIII scrollés, progression fil rouge | **YES** | — | **KEEP** — ajouter scroll-progress label déjà présent |
| 8 | **Contributor `message OR photo OR video`** (Phase 7 §10.2) | `if (!msg && !photo && !video)` → deny-shake | **YES** (client) | Non persisté | **KEEP + étendre côté serveur** |
| 9 | **Media pipeline SELECT→VALIDATE→UPLOAD→PROGRESS→READY→PREVIEW** | SELECT→PREVIEW (blob URL) seulement | **PARTIAL** | Utilisateur ne voit pas upload réel | **CORRECT** : ajouter states uploading/processing/error/retry + progress bar |
| 10 | **DATABASE vs STORAGE séparation** | Aucune — tout en RAM | **NO** | Perte données | **CORRECT** : Supabase + Storage buckets |
| 11 | **Routing `/participate /thanks /jenny`** | Single page anchors | **NO** | UX confuse, surprise non isolée | **CORRECT** : React Router (sans casser design) |
| 12 | **Jenny private access (secret/token + server validation)** | Public | **NO** | Surprise spoilable | **CORRECT** : route `/jenny/:token` + env var + RLS |
| 13 | **Photos / vidéos non indexables, URLs non prédictibles** | Blob URLs éphémères, Pexels publics | **NO** | Données privées exposables si Supabase mal configuré | **CORRECT** : Storage chemins `contributions/{uuid}/...` + signed URLs |
| 14 | **Responsive MOBILE/TABLET/DESKTOP** | Grilles `md:grid-cols-2 xl:grid-cols-3`, nav lg:flex, touch fallback tilt | **YES** | — | **KEEP** — QA iPhone SE + iPad à faire |
| 15 | **Accessibility keyboard/focus/reduced-motion/contrast** | `sr-only focus:not-sr-only`, `:focus-visible` ember, `prefers-reduced-motion` global, contrast AA (ember #E8404A sur ink) | **YES** (HIGH) | — | **KEEP** — ajouter `aria-live` déjà présent sur verdict |
| 16 | **Progressive Enhancement (core sans WebGL)** | Core = full experience (DOM/CSS/canvas) | **YES** | — | **KEEP** — documenter comme fallback officiel |
| 17 | **Performance images WebP/AVIF + lazy + videos poster→lazy→pause hors viewport** | JPG + lazy + poster + IntersectionObserver pause | **PARTIAL** | Bundle 304kB mono-fichier ok, mais images non optimisées | **REFINE** : passer en WebP + responsive sizes (post-13 août si temps manque) |
| 18 | **Contribution form : comprendre en 3s pourquoi/qui/quoi/comment** | Titre "Déposer une pièce", sous-titre explicite, label "jamais rien", CTA "Verser" | **YES** | — | **KEEP** — déplacer vers `/participate` pour clarté |

**Score global : 11 YES / 3 PARTIAL / 4 NO — 2 NO sont bloquants pour le 13 août (10,11,12).**

---

## 6 — NE PAS DÉTRUIRE UN TRAVAIL VALIDE (§11)

**À CONSERVER ABSOLUMENT** (ressources) :

- `src/data.ts` — modèle déclaratif parfait, séparation contenu/logique, tokens couleurs/motion.
- `src/index.css` — design system complet, tokens, grain, papier, tampons, reveals.
- `src/hooks.tsx` — primitives réutilisables (`useInView`, `Reveal`, `useTypewriter`, `useTilt`, `useReducedMotion`) — conformes §38 primitives.
- `src/components/Chrome.tsx` — DossierBar + AmbientLayers + SectionHead — architecture layer réussie.
- Tous les 7 chapitres visuels — direction "enquête" sombre/élégante, cinématique sans lourdeur.
- Identité chaton>lapin + absence rose + papillon or — détails qui rendent l'expérience unique à Jenny.
- Accessibilité et motion ownership — déjà au niveau TRIONN craftsman.

**Ne pas réécrire par préférence personnelle (ex: passer à Framer Motion partout, ou refaire palette pink) — ce serait une violation de la hiérarchie §08.**

---

## 7 — NE PAS CONSERVER UN ÉCART PAR COMPLAISANCE (§12)

**À CORRIGER OBLIGATOIREMENT avant le 13 août** :

| Écart | Exemple §12 équivalent | Correction proposée |
|---|---|---|
| Route unique au lieu de `/participate /thanks /jenny` | Doc: routing Phase 7 → Code: single page | Ajouter `react-router-dom` + 4 routes, **sans** changer le visuel du dossier (les chapitres restent scrollables sur `/` et `/jenny/experience`, le form migre vers `/participate`) |
| `message required` implicite ? Non — ici c'est `message OR photo OR video` OK, mais **non persisté** | Doc: `message OR photo OR video` → Code: `message required` (autre exemple) | Garder règle, mais ajouter validation Zod côté client + serveur + test unitaire |
| `3D = progressive enhancement` → `core page impossible without WebGL` — NON, ici core marche, donc pas d'écart | — | Ne rien faire — justifier dans doc que WebGL est volontairement absent pour livraison 13 août |
| `Contributions in-memory` | Doc: Supabase + Storage → Code: `useState` | Implémenter Supabase client + fallback localStorage pour mode offline/demo |

---

## 8 — SOURCE AUTHORITY (§13) — HIÉRARCHIE APPLIQUÉE

```
1. README (hub)                    → respecté (SECOND 1A)
2. Project-specific Phases 2-7     → respecté sauf Phase 7 data/routing
3. Phase 1 Stella findings          → non copié, évolué
4. Reference Systems               → respectés
5. Visual Design Package (code)    → traité comme référence visuelle d'exécution
6. Existing implementation         → conservée où conforme, corrigée où non-conforme
7. Personal preference             → jamais appliquée
```

**Aucun conflit détecté entre Phases et Reference Systems. Le seul conflit est `Existing code (single page)` vs `Phase 7 routing` — Phase 7 gagne, mais la correction doit préserver le Visual Design.**

---

## 9 — PROPOSED CHANGE PROTOCOL (§14) — 3 CHANGEMENTS MAJEURS

### CHANGE 01 — Ajout React Router + séparation Contributor / Jenny

- **Current decision :** single-page `App.tsx` avec anchors `#couverture #rapport ...`
- **Problem :** Impossible de partager un lien contributeur sans spoiler Jenny ; pas de `/thanks` post-submit ; pas de protection surprise.
- **Why it matters :** Privacy §12, routing §09 Phase 7, deadline 13 août — Jenny ne doit pas découvrir par accident.
- **Proposed solution :** `react-router-dom` 6, routes :
  ```
  /                → Cover + Report + Evidence (teaser, CTA vers /participate)
  /participate     → Depositions + ContributeForm (isolé, clair)
  /thanks          → confirmation + retour
  /jenny           → gate token (input)
  /jenny/experience→ App complet (Cover→Verdict) — protégé par token
  /jenny/memories  → galerie filtrée (approved only)
  404              → page dossier "Pièce manquante"
  ```
  Garder `DossierBar` global, ajouter `Outlet`.
- **Impact :** Faible risque visuel (même composants), fort gain UX/privacy. Build + ~8kB.
- **Alternative :** Garder single-page mais ajouter `?view=jenny` — moins clair, moins sécurisable.

### CHANGE 02 — Supabase + Storage (avec fallback)

- **Current :** `useState<Deposition[]>` volatile
- **Problem :** Refresh = perte, pas de partage entre visiteurs, pas de modération.
- **Why :** Media system §18, data architecture §19, deadline — sans data, le 13 août n'a pas de contenu réel.
- **Proposed :** 
  - `supabase-js` + client `lib/supabase.ts` (anon key côté client, RLS)
  - Tables SQL (migration fournie) : `contributors`, `contributions`, `media_assets`, `experience_settings`
  - Buckets : `birthday-media` (photos, videos, thumbnails) — chemins `contributions/{uuid}/...` non prédictibles
  - Flow : `validate → insert contribution (pending) → upload Storage → insert media_assets → onSuccess navigate /thanks`
  - **Fallback** : si `VITE_SUPABASE_URL` manquant, persistance `localStorage` + blob URL (mode démo, déjà partiellement fait) — garantit livraison même sans backend.
- **Impact :** Nécessite `.env` + création projet Supabase (15 min). Code isolé dans `lib/storage`, pas d'impact visuel.
- **Alternative :** Firebase — écarté, Phase 7 recommande Supabase.

### CHANGE 03 — Upload states complets + validation

- **Current :** seulement `deny-shake` + `success` inline
- **Problem :** Pas de feedback `uploading/processing/error/retry` (§18) — utilisateur face à interface qui semble bloquée si upload lent.
- **Proposed :** États `idle → selecting → validating → uploading (progress %) → processing → success / error (retry)` avec barre `thread-fill` + messages actionnables. Validation MIME + taille (ex: photo 10Mo, vidéo 100Mo) côté client + Storage rules.
- **Impact :** + ~100 lignes dans `Depositions.tsx`, réutilise `Stamp` et `thread-fill` existants.

**Aucun changement proposé pour 3D/WebGL — le choix actuel (DOM/CSS/canvas) est le *simplest technology that achieves effect* (§27). Ajout WebGL seulement en Phase H si temps restant, en couche optionnelle `experience/webgl`.**

---

## 10 — RISQUES & MITIGATIONS AVANT 13 AOÛT

| Risque | Probabilité | Mitigation |
|---|---|---|
| Projet Supabase non créé à temps | Moyenne | Fallback localStorage + export JSON manuel pour Jenny |
| Vidéos lourdes, upload échoue | Moyenne | Limite 100Mo, compress côté client, retry, message actionnable |
| Token Jenny leaké | Faible | Token long (nanoid), page `/jenny` sans listing public, RLS `approved` only |
| Mobile perf (canvas braises + vidéos) | Faible | `useReducedMotion` + pause IntersectionObserver déjà en place, réduire à 24 particules sur mobile |
| Build singlefile 304kB | Faible | OK (<500kB), gzip 89kB, fonts déjà preconnect |

---

## 11 — PLAN D'IMPLÉMENTATION RECOMMANDÉ (Phases B→L §69)

> **Principe : FOUNDATION FIRST → CONTRIBUTOR FIRST → JENNY SECOND → MOTION THIRD → 3D FOURTH**

```
PHASE A — Audit                    ✅ FAIT (ce document)
   ↓
PHASE B — Foundation               [ ] React Router, Supabase client, env, lib/validation, lib/storage
   ↓
PHASE C — Contributor Experience   [ ] /participate + /thanks, upload states, preview, retry
   ↓
PHASE D — Data & Media Infra       [ ] SQL migrations, buckets, RLS, signed URLs
   ↓
PHASE E — Jenny Core Experience    [ ] /jenny gate + /jenny/experience (protegé) + /jenny/memories
   ↓
PHASE F — Interaction              [ ] États focus, erreurs, loading, empty states
   ↓
PHASE G — Motion                   [ ] Déjà fait — QA seulement (pas de nouvelle motion)
   ↓
PHASE H — 3D / WebGL               [ ] OPTIONNEL — seulement si B-E validés, sinon reporter post-13 août
   ↓
PHASE I — Responsive / A11y        [ ] QA mobile (SE, iPad), keyboard, axe, contrast
   ↓
PHASE J — Performance              [ ] WebP, responsive images, video pause hors viewport (déjà ok)
   ↓
PHASE K — QA                       [ ] Unit (validation), Integration (upload+RLS), E2E (contributor→thanks, jenny→memories)
   ↓
PHASE L — Release                  [ ] .env non commité, build, preview, deploy Netlify/Vercel
```

**Ordre §24 respecté : `INTENT(✓) → UX(✓) → STATIC LAYOUT(✓) → INTERACTION STATES(partial) → BASIC MOTION(✓) → SCROLL(✓) → 3D FOUNDATION(volontairement omis) → POLISH → A11Y → PERF QA`.**

---

## 12 — DÉCISIONS OUVERTES (nécessitent validation PO)

1. **Heure exacte d'ouverture du dossier** : laisser `13 août 00:01` (comme déposition S.) ou définir `experience_settings.open_at` ?
2. **Modération** : `pending → approved` manuel par Stane via Supabase dashboard (simple) ou UI admin `/admin` (plus lourd) ?
3. **Token Jenny** : générer `JENNY_18_XXXX` et partager par message privé, ou auth légère email ?
4. **Pièce A-06 "Sous scellés"** : révéler le 13 août (contenu réel à choisir) ou garder comme easter egg post-événement ?
5. **Vidéos Pexels de démonstration** : remplacer avant 13 août par uploads réels ou garder comme fallback si peu de vidéos contributeurs ?

---

## 13 — CONCLUSION — EMOTIONAL QA (§54)

> *Est-ce que ça ressemble à Jenny ?* — **Oui, intensément.** Rouge/noir sans rose, chaton suspect principal, Apothecary en filigrane, lettre manuscrite Méminou, franchise comme preuve.  
> *Est-ce personnel ?* — **Oui.** Réf J-18/08-13, 18 ans + bac, papillon or (Jinshi), horreur à 2h du matin — aucun template ne produirait ce mélange.  
> *L'émotion progresse ?* — **Oui.** Curiosité (Cover) → reconnaissance (faits) → surprise (fil rouge) → découverte (témoignages) → émotion (vidéos) → climax (coupable) → souvenir (lettre).  
> *Technologie vole la vedette ?* — **Non.** Aucun WebGL, juste tilt + SVG + canvas léger au service du récit.  
> *Médias ont un poids ?* — **Oui, mais à sécuriser.** Actuellement volatils — la fondation data leur donnera le poids réel du 13 août.  

**Le travail visuel existant est une ressource exceptionnelle — niveau TRIONN craft (cf. §56). Il ne doit pas être réécrit. Il doit être *branché* à une infrastructure qui le rend durable et privé.**

---

## 14 — PROCHAINES ÉTAPES (en attente de validation)

**Si validation "CONSERVER et COMPLÉTER" :**

1. Installer `react-router-dom`, `zod`, `@supabase/supabase-js`
2. Créer `lib/supabase.ts`, `lib/validation.ts`, `lib/storage.ts` + `.env.example`
3. Créer `app/router.tsx` + pages `Landing`, `Participate`, `Thanks`, `JennyGate`, `JennyExperience`, `NotFound`
4. Migrer `ContributeForm` vers `/participate` avec états complets
5. Fournir SQL migrations + bucket setup guide
6. Déployer preview sur port 5173 (bind 0.0.0.0)

**Temps estimé : 4-6h pour B-E (core livrable 13 août), H (3D) reportable.**

**En attente de ton feu vert pour démarrer PHASE B.**

---

*Fin de l'audit — repository pris en possession intellectuelle. Aucune modification de code effectuée dans cette phase, conformément au protocole.*

