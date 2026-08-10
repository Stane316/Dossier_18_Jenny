# PHASE 7 — TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT

**Projet : Jenny — 18 ans + Bac**  
**Version : 1.0**  
**Statut : Blueprint technique de référence**  
**Destination : `Docs/PHASE-7-TECHNICAL-ARCHITECTURE-IMPLEMENTATION-BLUEPRINT.md`**

---

## 00 — DOCUMENT STATUS

Ce document constitue le livrable technique final de la phase 7.

Il transforme les décisions issues des phases précédentes en un blueprint exploitable par l’IA chargée du développement.

Le document doit être utilisé comme **contrat d’architecture** : l’implémentation peut adapter des détails techniques, mais ne doit pas modifier silencieusement les intentions UX, visuelles, narratives ou fonctionnelles définies auparavant.

Les principes du Digital Experience System imposent une hiérarchie stricte :

```text
PURPOSE
↓
CONTENT
↓
HIERARCHY
↓
LAYOUT
↓
VISUAL LANGUAGE
↓
INTERACTION
↓
MOTION
↓
3D / ADVANCED EFFECTS
```

La technologie reste donc au service de l’expérience.

Les sources Digital Experience rappellent également que l’expérience doit être conçue par couches et que la couche avancée doit pouvoir échouer sans détruire l’interface essentielle :

```text
CORE UI
+
OPTIONAL EXPERIENCE LAYER
```

---

# 01 — PROJECT DEFINITION

## 01.1 — Project identity

Le projet est une expérience anniversaire personnalisée destinée à **Jennifer**, appelée notamment :

- Jenny ;
- Méminou ;
- Pépinou / Lapinou dans son univers relationnel avec Stane.

L’événement combine deux célébrations :

```text
18 ANS
+
RÉUSSITE AU BAC
```

La date centrale est le **13 août**.

Le site n’est donc pas un simple formulaire de collecte de messages.

Il doit devenir :

> une capsule numérique construite autour de Jenny, de ses relations, de ses souvenirs et de la célébration de son passage à 18 ans et de sa réussite au Bac.

---

## 01.2 — Core emotional objective

L’expérience finale doit produire progressivement :

```text
CURIOSITÉ
↓
RECONNAISSANCE
↓
SURPRISE
↓
ÉMOTION
↓
DÉCOUVERTE
↓
SENTIMENT D’ÊTRE UNIQUE
↓
SOUVENIR
```

La partie destinée à Jenny constitue le centre de gravité du projet.

La technologie ne doit jamais devenir plus importante que cette émotion.

---

# 02 — PRODUCT MODEL

Le produit possède deux espaces fonctionnels principaux.

```text
                    JENNY EXPERIENCE
                          ▲
                          │
                    CONTENT LAYER
                          ▲
                          │
              ┌───────────┴───────────┐
              │                       │
       CONTRIBUTOR SPACE        ADMIN / CONTROL
              │
              ▼
     Messages / Photos / Vidéos
```

## 02.1 — Contributor Space

Espace destiné aux personnes invitées à participer.

Objectif :

> permettre à une personne d’envoyer facilement une contribution personnalisée à Jenny.

Types de contribution :

- message ;
- photo ;
- vidéo ;
- combinaison de plusieurs médias.

Une contribution doit contenir **au minimum un élément de contenu**.

Le texte n’est pas obligatoire si une photo ou une vidéo est fournie.

La photo n’est pas obligatoire.

La vidéo n’est pas obligatoire.

Le système doit donc accepter notamment :

```text
Message
Photo
Vidéo
Message + Photo
Message + Vidéo
Photo + Vidéo
Message + Photo + Vidéo
```

Mais doit refuser :

```text
Aucun contenu
```

---

## 02.2 — Jenny Experience

Espace privé destiné à Jenny.

Il constitue l’expérience émotionnelle principale.

Il doit donner l’impression :

> « Ce site a été construit pour moi. »

Les détails personnalisés doivent rendre l’expérience immédiatement identifiable :

- Jenny ;
- ses surnoms ;
- son amour des chatons ;
- son amour des lapins ;
- rouge et noir ;
- rejet du rose ;
- romance ;
- anime de romance ;
- *Les Carnets de l'Apothicaire* ;
- Maomao et Jinshi ;
- films d’horreur ;
- enquêtes policières ;
- personnalité franche ;
- relation particulière avec ses proches ;
- Bac ;
- 18 ans.

Les références personnelles doivent être utilisées avec subtilité.

L’objectif n’est pas de transformer le site en catalogue de références.

---

# 03 — ARCHITECTURE GLOBALE

## 03.1 — High-level architecture

Architecture recommandée :

```text
                    ┌─────────────────────┐
                    │      VISITOR        │
                    └──────────┬──────────┘
                               │
                     ┌─────────▼─────────┐
                     │   Web Application  │
                     │      React         │
                     └─────────┬─────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Public Routes    Contributor Route   Jenny Route
              │                │                │
              └────────────────┼────────────────┘
                               │
                         Experience State
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
           Supabase          Storage        Analytics*
              │                │                │
              └────────────────┼────────────────┘
                               │
                         Content Model
```

`*` Analytics doit rester secondaire et ne doit pas devenir une dépendance critique de l’expérience.

---

# 04 — RECOMMENDED STACK

## 04.1 — Frontend

Stack recommandée :

- React ;
- Vite ;
- TypeScript ;
- Tailwind CSS ou couche CSS cohérente avec le Design System ;
- Framer Motion pour les interactions UI lorsque pertinent ;
- GSAP lorsque des timelines complexes ou synchronisées sont nécessaires ;
- React Three Fiber / Three.js uniquement pour les scènes 3D réellement justifiées ;
- React Router si plusieurs routes sont nécessaires.

### Règle

Ne pas utiliser simultanément plusieurs systèmes pour contrôler la même animation sans architecture claire.

Exemple à éviter :

```text
Framer Motion
+
GSAP
+
CSS transition
→ même propriété
```

Chaque animation doit avoir un propriétaire.

---

# 05 — BACKEND

## 05.1 — Supabase

Supabase constitue une solution adaptée pour :

- PostgreSQL ;
- authentification ;
- Row Level Security ;
- Storage ;
- Edge Functions lorsque nécessaire.

Le backend doit rester relativement simple.

Le projet est un événement ponctuel, mais son architecture doit être suffisamment propre pour éviter les manipulations manuelles répétitives.

---

# 06 — STORAGE ARCHITECTURE

Les médias constituent une partie importante du projet, notamment parce que les vidéos sont attendues par les contributeurs.

Il faut donc séparer :

```text
DATABASE
→ metadata

STORAGE
→ binary files
```

Ne jamais stocker directement les vidéos ou images dans PostgreSQL.

---

## 06.1 — Storage buckets

Architecture possible :

```text
birthday-media/
├── photos/
├── videos/
└── thumbnails/
```

Les chemins doivent être générés à partir d’identifiants non prédictibles.

Exemple conceptuel :

```text
contributions/{contributionId}/photos/{assetId}.webp
contributions/{contributionId}/videos/{assetId}.mp4
```

---

# 07 — DATABASE MODEL

## 07.1 — `contributors`

Représente la personne qui envoie une contribution.

```text
id
name
relationship
created_at
```

Le champ `relationship` peut rester facultatif si la personne préfère ne pas le préciser.

---

## 07.2 — `contributions`

```text
id
contributor_id
message
status
created_at
updated_at
published_at
```

### `status`

Valeurs recommandées :

```text
pending
approved
rejected
archived
```

La séparation entre contribution reçue et contribution visible permet de conserver un contrôle éditorial.

---

## 07.3 — `media_assets`

```text
id
contribution_id
type
storage_path
thumbnail_path
mime_type
size_bytes
duration_ms
width
height
created_at
```

### `type`

```text
photo
video
```

---

## 07.4 — `experience_settings`

Pour les éléments configurables :

```text
id
key
value
updated_at
```

Cependant, les éléments fortement structurants de l’expérience Jenny ne doivent pas devenir un CMS générique inutilement complexe.

---

# 08 — SECURITY MODEL

## 08.1 — Contributor security

Les contributeurs ne doivent jamais avoir accès directement aux données des autres contributeurs.

Architecture :

```text
Contributor
↓
Create contribution
↓
Upload media
↓
Receive confirmation
```

Aucune route publique ne doit permettre :

```text
SELECT all contributions
```

---

## 08.2 — Jenny access

La partie Jenny doit être protégée.

Deux stratégies sont possibles :

### Option A — Secret route

Une route difficile à deviner + token.

### Option B — Authentication

Authentification légère.

### Recommandation

Pour un événement privé, utiliser une protection simple mais réelle :

```text
Private route
+
secret/token
+
server-side validation
```

Le token ne doit pas être considéré comme une donnée publique exposée dans le code source.

---

# 09 — ROUTING

Architecture recommandée :

```text
/
├── /participate
├── /thanks
├── /jenny
├── /jenny/experience
├── /jenny/memories
└── /404
```

Les noms exacts peuvent être ajustés au design final.

---

# 10 — CONTRIBUTOR FLOW

## 10.1 — Flow

```text
Landing Contributor
↓
Identity
↓
Content Selection
↓
Message / Photo / Video
↓
Preview
↓
Validation
↓
Upload
↓
Processing
↓
Success
```

---

## 10.2 — Contribution validation

La règle métier centrale :

```text
message OR photo OR video
```

Le système refuse uniquement lorsque :

```text
message = empty
AND photo = none
AND video = none
```

---

## 10.3 — Video upload

Les vidéos doivent bénéficier d’un système d’upload robuste :

- validation MIME ;
- limite de taille ;
- feedback de progression ;
- état uploading ;
- état processing ;
- état success ;
- état error ;
- possibilité de réessayer.

Ne jamais donner l’impression que l’application est bloquée sans feedback.

---

# 11 — CONTRIBUTOR UI

L’interface doit être extrêmement simple.

Le contributeur doit comprendre immédiatement :

1. pourquoi il est ici ;
2. pour qui il envoie quelque chose ;
3. ce qu’il peut envoyer ;
4. comment valider.

Le système ne doit pas demander de longues informations inutiles.

---

# 12 — MEDIA PROCESSING

Les médias doivent être traités comme un pipeline.

```text
INPUT
↓
VALIDATION
↓
UPLOAD
↓
STORAGE
↓
OPTIONAL PROCESSING
↓
METADATA
↓
READY
```

Pour les vidéos :

```text
UPLOAD
↓
VALIDATE
↓
STORE ORIGINAL
↓
GENERATE THUMBNAIL
↓
REGISTER METADATA
↓
READY
```

La génération de formats vidéo supplémentaires peut être ajoutée ultérieurement si nécessaire.

---

# 13 — JENNY EXPERIENCE ARCHITECTURE

La partie Jenny doit être pensée comme une expérience narrative.

Architecture conceptuelle :

```text
ENTRY
↓
RECOGNITION
↓
MYSTERY
↓
REVEAL
↓
CELEBRATION
↓
MEMORIES
↓
PEOPLE
↓
MESSAGES
↓
MEDIA
↓
EMOTIONAL CLIMAX
↓
CLOSING
```

Le déroulement exact doit suivre la phase 3 et la phase 4.

---

# 14 — EXPERIENCE ENGINE

Le site peut être modélisé comme un moteur d’expérience :

```text
ExperienceEngine
│
├── State
├── Timeline
├── Scroll
├── Input
├── Scene
├── Camera
├── Transition
├── Renderer
└── Accessibility
```

Ce modèle provient directement des principes du système 3D & Motion.

---

# 15 — EXPERIENCE STATES

États recommandés :

```text
BOOT
↓
LOADING
↓
READY
↓
INTRO
↓
ACTIVE
↓
INTERACTING
↓
TRANSITIONING
↓
COMPLETE
```

Les transitions doivent être centralisées.

---

# 16 — MOTION OWNERSHIP

Chaque système doit posséder clairement les propriétés qu’il anime.

Exemple :

```text
HeroController
→ hero visual

NavigationController
→ navigation

SceneController
→ 3D scene

TransitionController
→ page transition

MemoryController
→ memory reveal
```

Éviter les conflits du type :

```text
Scroll → camera.position
Mouse → camera.position
Timeline → camera.position
```

Préférer :

```text
Inputs
↓
Unified State
↓
Camera Controller
↓
Camera Output
```

---

# 17 — 3D ARCHITECTURE

La 3D doit être utilisée uniquement lorsqu’elle produit une vraie valeur narrative ou émotionnelle.

Le document 3D & Motion impose :

```text
PURPOSE
↓
USER EXPERIENCE
↓
CONTENT
↓
VISUAL LANGUAGE
↓
INTERACTION
↓
MOTION
↓
3D
↓
SHADERS
↓
TECHNICAL POLISH
```

---

## 17.1 — Possible 3D language

La direction peut exploiter :

- un univers rouge/noir ;
- une profondeur cinématique ;
- une présence féline subtile ;
- des éléments rappelant les constellations ou souvenirs ;
- des objets flottants ;
- une scène symbolique ;
- des particules ;
- des transitions spatiales.

Le choix final des assets doit respecter la direction artistique de la phase 5.

---

# 18 — 3D FALLBACK

La 3D doit rester une couche optionnelle.

```text
FULL EXPERIENCE
↓
SIMPLIFIED EXPERIENCE
↓
CORE EXPERIENCE
```

Si WebGL échoue :

```text
3D unavailable
↓
DOM/CSS visual layer
↓
content remains usable
```

Une panne WebGL ne doit jamais produire une page blanche.

---

# 19 — RESPONSIVE ARCHITECTURE

Trois niveaux minimum :

```text
Mobile
Tablet
Desktop
```

Mais le comportement doit être pensé par capacité plutôt que par simple largeur.

Exemple :

```text
Pointer precision
Touch capability
Screen size
GPU capability
Reduced motion
Network conditions
```

---

# 20 — MOBILE STRATEGY

Sur mobile :

- réduire la densité 3D ;
- supprimer les effets non essentiels ;
- adapter les transitions ;
- remplacer les hover interactions ;
- préserver la lisibilité ;
- limiter les vidéos simultanées ;
- éviter les scènes GPU lourdes.

Le mobile ne doit pas être une version dégradée négligée.

Il doit être une variante intentionnelle de l’expérience.

---

# 21 — ACCESSIBILITY

La sophistication ne doit jamais supprimer :

- navigation clavier ;
- focus visible ;
- labels ;
- contraste ;
- alternatives au hover ;
- reduced motion ;
- contenu sémantique ;
- contrôle utilisateur.

Le système UX exige notamment :

```text
[ ] Keyboard navigation
[ ] Focus visible
[ ] Contrast
[ ] Reduced motion
[ ] Touch fallback
[ ] Hover fallback
[ ] 3D fallback
[ ] Audio control if audio exists
```

---

# 22 — REDUCED MOTION

Lorsque `prefers-reduced-motion: reduce` est actif :

```text
FULL MOTION
↓
REDUCED MOTION
```

Réduire :

- parallax ;
- rotations ;
- déplacements ;
- particules ;
- transitions longues ;
- effets de caméra.

Ne jamais supprimer le contenu.

---

# 23 — AUDIO

Si un système audio est intégré :

- aucun autoplay agressif ;
- contrôle explicite ;
- mute/unmute ;
- état visible ;
- comportement mobile défini.

L’audio est une couche d’immersion, jamais une condition d’accès au contenu.

---

# 24 — PERFORMANCE BUDGET

Le projet doit conserver un budget strict.

Priorités :

```text
CONTENT
>
UX
>
RESPONSIVENESS
>
MOTION
>
3D
>
ADVANCED EFFECTS
```

Les assets lourds doivent être compressés et chargés au moment pertinent.

---

# 25 — LOADING STRATEGY

Ne pas charger tous les médias au démarrage.

Architecture :

```text
Critical assets
↓
Initial experience
↓
Progressive loading
↓
Deferred memories
↓
Deferred videos
```

Les vidéos particulièrement lourdes doivent être chargées à la demande ou progressivement.

---

# 26 — IMAGE STRATEGY

Préférer :

- WebP ;
- AVIF lorsque pertinent ;
- dimensions adaptées ;
- lazy loading ;
- responsive images.

Ne jamais envoyer une image de plusieurs mégaoctets lorsqu'une version optimisée suffit.

---

# 27 — VIDEO STRATEGY

Les vidéos sont importantes pour le projet.

Il faut donc les traiter comme des assets premium.

Prévoir :

```text
Poster
↓
Metadata
↓
Lazy load
↓
Play on demand
↓
Pause when not visible
```

Éviter plusieurs vidéos en lecture simultanée.

---

# 28 — CACHING

Les ressources statiques peuvent être fortement mises en cache.

Les contenus dynamiques doivent conserver une stratégie adaptée à leur durée de vie.

Le système doit distinguer :

```text
Static assets
Dynamic content
Private content
```

---

# 29 — ERROR HANDLING

Prévoir au minimum :

```text
404
Upload error
Media validation error
Network error
Database error
Storage error
Unauthorized access
WebGL failure
Video playback failure
```

Chaque erreur critique doit fournir :

- une explication ;
- une action possible ;
- un état récupérable lorsque possible.

---

# 30 — OBSERVABILITY

Le projet doit disposer d'un minimum d'observabilité :

- logs client contrôlés ;
- erreurs critiques ;
- erreurs upload ;
- erreurs média ;
- erreurs WebGL.

En développement, prévoir un mode debug.

En production, ne pas exposer les informations sensibles.

---

# 31 — DEBUG MODE

Le système de debug peut afficher :

```text
FPS
Experience State
Current Scene
Transition Progress
Loading State
Pointer Coordinates
WebGL Status
```

Il doit être désactivé en production.

---

# 32 — CODE ORGANIZATION

Structure recommandée :

```text
src/
├── app/
│   ├── router/
│   ├── providers/
│   └── config/
│
├── pages/
│   ├── Landing/
│   ├── Participate/
│   ├── Thanks/
│   ├── Jenny/
│   └── NotFound/
│
├── components/
│   ├── ui/
│   ├── media/
│   ├── forms/
│   └── experience/
│
├── features/
│   ├── contributions/
│   ├── memories/
│   ├── jenny-experience/
│   └── authentication/
│
├── experience/
│   ├── state/
│   ├── motion/
│   ├── transitions/
│   ├── scenes/
│   └── renderer/
│
├── three/
│   ├── scenes/
│   ├── camera/
│   ├── materials/
│   ├── shaders/
│   └── effects/
│
├── lib/
│   ├── supabase/
│   ├── storage/
│   ├── validation/
│   └── utilities/
│
├── styles/
│   ├── tokens/
│   └── globals/
│
└── types/
```

---

# 33 — SEPARATION OF RESPONSIBILITIES

## UI

Responsable de :

- structure ;
- contenu ;
- états visuels.

## Motion

Responsable de :

- transitions ;
- reveals ;
- micro-interactions.

## Experience State

Responsable de :

- état global ;
- progression ;
- synchronisation.

## WebGL

Responsable de :

- rendu 3D ;
- scènes ;
- caméra ;
- shaders.

## Assets

Responsable de :

- images ;
- vidéos ;
- modèles ;
- audio éventuel.

## Routing

Responsable de :

- navigation ;
- accès aux espaces.

---

# 34 — COMPONENT STRATEGY

Primitives :

```text
Container
Stack
Text
Heading
Button
Icon
Media
```

Composants :

```text
Navigation
ContributionForm
MediaUploader
MemoryCard
VideoPlayer
MessageReveal
```

Patterns :

```text
Hero
ContributionExperience
MemoryGallery
BirthdayReveal
ClosingExperience
```

---

# 35 — STATE MANAGEMENT

Éviter un store global gigantesque.

Séparer :

```text
Server state
↓
Experience state
↓
Local UI state
```

Exemple :

### Server state

Contributions, médias, settings.

### Experience state

Scene, progress, transition, reveal.

### Local UI state

Modal ouvert, input, validation.

---

# 36 — VALIDATION

Les données utilisateur doivent être validées :

```text
Client
+
Server
```

La validation client améliore l’UX.

La validation serveur garantit l’intégrité.

---

# 37 — CONTENT MODEL

Le contenu Jenny doit être séparé du code lorsque cela facilite les modifications.

Exemple :

```text
content/
├── jenny.ts
├── experience.ts
├── messages.ts
└── config.ts
```

Cependant, les secrets ne doivent jamais être placés dans les fichiers frontend.

---

# 38 — PERSONALIZATION MODEL

La personnalisation doit être déclarative.

Exemple conceptuel :

```ts
{
  name: "Jenny",
  aliases: ["Méminou"],
  favoriteColors: ["red", "black"],
  animals: ["kitten", "rabbit"],
  interests: [
    "romance",
    "horror",
    "police investigation"
  ],
  anime: {
    favorite: "The Apothecary Diaries",
    characters: ["Maomao", "Jinshi"]
  }
}
```

Les données exactes et formulations doivent rester alignées avec les décisions des phases 2 et 5.

---

# 39 — CONTENT SAFETY / PRIVACY

Les contributions peuvent contenir :

- photos privées ;
- vidéos privées ;
- messages personnels.

Le système doit donc :

- limiter l'exposition publique ;
- protéger l'accès à l'espace Jenny ;
- ne pas indexer les médias privés ;
- éviter les URLs facilement devinables ;
- limiter les informations sensibles dans les logs.

---

# 40 — SEO

La page de contribution peut être publique et indexable uniquement si cela est souhaité.

La partie Jenny doit être :

```text
noindex
```

et protégée.

Les médias privés ne doivent pas être publiquement indexables.

---

# 41 — DEPLOYMENT

Architecture :

```text
GitHub
↓
CI
↓
Build
↓
Deploy
↓
Production
```

Le frontend peut être déployé sur une plateforme statique compatible React/Vite.

Le backend reste sur Supabase.

---

# 42 — ENVIRONMENT VARIABLES

Séparer :

```text
Development
Preview
Production
```

Variables sensibles :

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SERVER_SECRET
PRIVATE_ACCESS_TOKEN
```

Ne jamais committer les secrets.

Les variables réellement publiques doivent être distinguées des secrets.

---

# 43 — CI CHECKS

Avant déploiement :

```text
Typecheck
↓
Lint
↓
Unit tests
↓
Build
↓
Production smoke test
```

Pour les expériences avancées :

```text
WebGL fallback test
Reduced motion test
Mobile test
Upload test
Private route test
```

---

# 44 — TESTING STRATEGY

## Unit

Tester :

- validation ;
- règles de contribution ;
- transformations ;
- utilities.

## Integration

Tester :

- upload ;
- création contribution ;
- récupération média ;
- accès privé.

## E2E

Tester :

```text
Contributor flow
↓
Upload
↓
Success

Jenny access
↓
Experience
↓
Memory reveal
```

---

# 45 — ACCEPTANCE TESTS

## Contributor

```text
[ ] Peut ouvrir la page
[ ] Comprend le but
[ ] Peut écrire un message
[ ] Peut ajouter une photo
[ ] Peut ajouter une vidéo
[ ] Peut combiner les médias
[ ] Ne peut pas envoyer vide
[ ] Voit la progression
[ ] Reçoit une confirmation
```

## Jenny

```text
[ ] Accès protégé
[ ] Intro fonctionnelle
[ ] Personnalisation visible
[ ] Navigation claire
[ ] Messages accessibles
[ ] Photos accessibles
[ ] Vidéos accessibles
[ ] Transitions cohérentes
[ ] Mobile fonctionnel
[ ] Reduced motion fonctionnel
```

---

# 46 — MOTION QA

Chaque animation doit répondre à :

```text
Purpose?
Trigger?
Initial state?
Final state?
Duration?
Easing?
Owner?
Interruptible?
Mobile behavior?
Reduced motion?
Fallback?
```

C'est directement aligné sur la checklist du système 3D & Motion.

---

# 47 — 3D QA

Avant livraison :

```text
[ ] Scene purpose defined
[ ] Camera defined
[ ] Scene graph organized
[ ] Lighting defined
[ ] Materials defined
[ ] Assets validated
[ ] Interaction states defined
[ ] WebGL fallback
[ ] Mobile behavior
[ ] Reduced motion
[ ] DOM/WebGL relationship
[ ] State synchronization
[ ] Lifecycle cleanup
[ ] Debug strategy
[ ] Failure isolation
```

---

# 48 — IMPLEMENTATION ORDER

L'ordre d'implémentation doit respecter le système Digital Experience :

```text
01 — EXPERIENCE INTENT
↓
02 — UX FLOW
↓
03 — STATIC LAYOUT
↓
04 — INTERACTION STATES
↓
05 — BASIC MOTION
↓
06 — SCROLL / TRANSITIONS
↓
07 — 3D FOUNDATION
↓
08 — 3D INTERACTION
↓
09 — SHADERS / ADVANCED EFFECTS
↓
10 — POLISH
↓
11 — ACCESSIBILITY
↓
12 — PERFORMANCE QA
```

Ne jamais commencer par la scène 3D finale.

---

# 49 — IMPLEMENTATION ROADMAP

## Sprint 0 — Foundation

- repository ;
- Vite ;
- React ;
- TypeScript ;
- styling ;
- routing ;
- environment ;
- Supabase ;
- base structure.

## Sprint 1 — Contributor Experience

- landing ;
- contribution form ;
- validation ;
- image upload ;
- video upload ;
- storage ;
- success state.

## Sprint 2 — Content & Data

- database ;
- contribution management ;
- media metadata ;
- moderation ;
- private access.

## Sprint 3 — Jenny Core Experience

- protected route ;
- intro ;
- core layout ;
- content ;
- memory system ;
- basic transitions.

## Sprint 4 — Motion

- reveals ;
- transitions ;
- scroll-driven behaviors ;
- micro-interactions ;
- state machine.

## Sprint 5 — 3D

- 3D foundation ;
- scene ;
- camera ;
- interaction ;
- fallback.

## Sprint 6 — Media Experience

- photos ;
- videos ;
- playback ;
- progressive loading ;
- emotional sequencing.

## Sprint 7 — QA / Polish

- responsive ;
- accessibility ;
- reduced motion ;
- performance ;
- browser testing ;
- error handling ;
- final content.

---

# 50 — DEVELOPMENT GATES

Le projet ne doit pas progresser directement de code en code.

## Gate 01 — Intent

L'expérience répond-elle au besoin ?

## Gate 02 — UX

Le parcours est-il cohérent ?

## Gate 03 — Design

La hiérarchie est-elle correcte ?

## Gate 04 — Interaction

Les états et feedbacks existent-ils ?

## Gate 05 — Accessibility

L'expérience reste-t-elle accessible ?

## Gate 06 — Responsive

Les comportements sont-ils adaptés ?

## Gate 07 — Technical quality

Performance et stabilité validées.

---

# 51 — DEFINITION OF DONE

Une fonctionnalité est terminée seulement si :

```text
FUNCTIONAL
+
RESPONSIVE
+
ACCESSIBLE
+
ERROR HANDLED
+
MOTION COHERENT
+
PERFORMANCE ACCEPTABLE
+
TESTED
```

Une animation spectaculaire mais fragile n'est pas terminée.

Une interface belle mais inutilisable n'est pas terminée.

---

# 52 — ANTI-PATTERNS

Interdits ou fortement déconseillés :

### 1. Technology-first development

```text
Three.js
↓
What can we make?
```

### 2. Animation everywhere

Tout ne doit pas bouger.

### 3. Giant React component

Une page ne doit pas contenir toute l'application.

### 4. Global state for everything

Ne pas transformer chaque variable en état global.

### 5. Hardcoded media URLs everywhere

Centraliser les références.

### 6. Public private media

Ne jamais exposer accidentellement les contributions privées.

### 7. WebGL as single point of failure

La 3D doit rester optionnelle.

### 8. Hover-only UX

Toute information importante doit avoir une alternative tactile/clavier.

### 9. Infinite loading

Tout chargement doit avoir un état explicite.

### 10. Magic numbers

Centraliser les paramètres critiques.

---

# 53 — EXPERIENCE ENGINEERING PRINCIPLES

Le système 3D & Motion impose notamment que l'expérience avancée soit :

- contrôlable ;
- composable ;
- observable ;
- interruptible ;
- adaptable ;
- réutilisable ;
- dégradable ;
- accessible.

Le projet Jenny doit appliquer exactement cette philosophie.

---

# 54 — REUSABLE EXPERIENCE PRIMITIVES

Les primitives potentielles :

```text
SmoothScroll
Reveal
TextReveal
MagneticButton
Parallax
SceneTransition
CameraRig
ParticleField
ShaderPlane
WebGLBackground
MediaReveal
MemoryReveal
VideoReveal
```

Les primitives spécifiques à Jenny ne doivent cependant pas être artificiellement généralisées.

---

# 55 — DESIGN / UX / MOTION HANDOFF

Le passage entre conception et développement doit suivre :

```text
Experience intent
↓
UX flow
↓
Visual specification
↓
Interaction states
↓
Motion specification
↓
Technical architecture
↓
Implementation
↓
QA
```

Chaque couche doit être vérifiée avant de passer à la suivante.

---

# 56 — MASTER ARCHITECTURE

Le système complet peut être représenté ainsi :

```text
┌─────────────────────────────────────────────┐
│                 EXPERIENCE                  │
│                                             │
│ Narrative / Visual / Emotion / 3D           │
├─────────────────────────────────────────────┤
│                 INTERACTION                 │
│                                             │
│ Motion / Input / State / Transition         │
├─────────────────────────────────────────────┤
│                  FOUNDATION                 │
│                                             │
│ React / DOM / CSS / Data / Storage          │
└─────────────────────────────────────────────┘
```

La couche Experience dépend de Interaction.

Interaction dépend de Foundation.

Foundation ne doit pas dépendre inutilement de la couche Experience.

---

# 57 — FINAL TECHNICAL PRINCIPLE

Le produit ne doit pas être conçu comme :

> un formulaire + une galerie + quelques animations.

Il doit être conçu comme :

> une expérience événementielle personnalisée soutenue par une architecture de contenu, de médias, d'interaction et d'immersion.

Le système doit être suffisamment simple pour être livré avant le 13 août, mais suffisamment structuré pour permettre les améliorations finales sans réécrire l'application.

---

# 58 — FINAL EXPERIENCE PRINCIPLE

Les sources Digital Experience établissent que :

> la sophistication doit émerger de la cohérence du système, et non de l'accumulation d'effets.

Pour Jenny :

```text
PERSONALIZATION
+
STORYTELLING
+
MEMORIES
+
EMOTION
+
INTERACTION
+
MOTION
+
SELECTIVE 3D
+
TECHNICAL QUALITY
=
JENNY EXPERIENCE
```

Le niveau recherché est **Exceptional**, mais il doit être atteint progressivement :

```text
Functional
↓
Refined
↓
Expressive
↓
Immersive
↓
Exceptional
```

---

# 59 — FINAL DELIVERY CHECKLIST

Avant mise en ligne :

## Product

```text
[ ] Contributor flow complete
[ ] Jenny flow complete
[ ] Content finalized
[ ] Private access verified
```

## Media

```text
[ ] Photos optimized
[ ] Videos validated
[ ] Posters generated
[ ] Storage secured
[ ] Lazy loading
```

## UX

```text
[ ] First impression tested
[ ] Navigation clear
[ ] Feedback complete
[ ] Error recovery
[ ] Touch behavior
[ ] Keyboard behavior
```

## Motion

```text
[ ] Purpose defined
[ ] No conflicting owners
[ ] Reduced motion
[ ] Mobile behavior
[ ] Interruptibility
```

## 3D

```text
[ ] Purpose defined
[ ] Performance acceptable
[ ] WebGL fallback
[ ] Mobile fallback
[ ] Failure isolation
```

## Technical

```text
[ ] Typecheck
[ ] Lint
[ ] Tests
[ ] Build
[ ] Production smoke test
[ ] Security review
```

---

# 60 — PROJECT HANDOFF TO THE DEVELOPMENT AI

L'IA de développement doit considérer ce document comme le **blueprint technique maître**.

Elle doit :

1. lire les documents des phases 1 à 7 ;
2. ne pas inventer de nouvelle direction artistique ;
3. ne pas modifier l'identité de Jenny ;
4. ne pas remplacer une décision UX sans justification ;
5. implémenter d'abord la fondation ;
6. ajouter ensuite les interactions ;
7. ajouter ensuite le motion ;
8. ajouter ensuite la 3D ;
9. effectuer l'accessibilité ;
10. effectuer la performance QA.

La règle d'implémentation reste :

```text
EXPERIENCE
↓
INTERACTION
↓
FOUNDATION
```

et non :

```text
TECHNOLOGY
↓
EFFECT
↓
EXPERIENCE
```

---

# 61 — MASTER PRINCIPLE

> **BUILD THE EXPERIENCE FIRST. THEN BUILD THE ENGINE THAT MAKES IT POSSIBLE.**

Pour Jenny, cela signifie :

> construire d'abord une expérience qui raconte pourquoi elle est importante, puis utiliser le code, les médias, le motion et la 3D pour rendre cette histoire tangible.

La réussite technique du projet ne sera pas mesurée au nombre d'effets présents.

Elle sera mesurée à la capacité du site à donner à Jenny le sentiment que :

> **personne d'autre n'aurait pu recevoir exactement cette expérience.**

---

## DOCUMENTATION STATUS

**Phase 7 : COMPLETE**

Ce document clôt la séquence des sept phases de conception :

```text
PHASE 1 — Reverse Engineering du site Stella
↓
PHASE 2 — Jenny Experience Map & Identity
↓
PHASE 3 — Experience Architecture
↓
PHASE 4 — UX/UI Flow & Interaction Specification
↓
PHASE 5 — Jenny Visual Direction & Design System
↓
PHASE 6 — 3D / Motion / Immersive Engineering
↓
PHASE 7 — Technical Architecture & Implementation Blueprint
↓
PROJECT READY FOR IMPLEMENTATION
```

**Prochaine étape : implémentation du produit à partir du dossier `Docs/`.**
