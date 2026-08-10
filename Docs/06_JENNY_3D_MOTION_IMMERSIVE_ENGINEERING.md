# PHASE 6 — 3D / MOTION / IMMERSIVE ENGINEERING

**Projet : Jenny — 18 ans & Bac**  
**Document : `Docs/06_JENNY_3D_MOTION_IMMERSIVE_ENGINEERING.md`**  
**Version : 1.0**  
**Statut : PHASE 6 — TERMINÉE**

---

# 00 — PURPOSE

Cette phase transforme la direction artistique définie en Phase 5 en un **système de mouvement, de 3D et d'immersion techniquement cohérent**.

La Phase 5 définissait :

```text
WHAT SHOULD IT FEEL LIKE?
WHAT SHOULD IT LOOK LIKE?
```

La Phase 6 définit :

```text
HOW DOES THE EXPERIENCE MOVE?
HOW DOES IT TRANSFORM?
HOW DOES IT RESPOND?
HOW DOES THE USER MOVE THROUGH IT?
HOW DOES 3D SERVE THE STORY?
```

Le principe fondamental de la Source 03 est :

```text
STATE
↓
TRIGGER
↓
TRANSITION
↓
NEW STATE
```

Le mouvement n'est donc jamais considéré comme une décoration ajoutée après coup. Il fait partie de l'architecture de l'expérience.

---

# 01 — MASTER ENGINEERING PRINCIPLE

L'ordre de conception doit rester :

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

La technologie arrive en dernier.

La Source 03 impose explicitement cette philosophie : l'intention doit déterminer l'expérience, puis le concept de motion, puis l'approche technique et enfin l'implémentation.

Pour Jenny :

```text
EMOTION
↓
DISCOVERY
↓
MEMORY
↓
CELEBRATION
↓
MOTION
↓
3D
```

et jamais :

```text
THREE.JS
↓
WOW EFFECT
↓
chercher une justification
```

---

# 02 — OBJECTIF IMMERSIF

L'objectif n'est pas de faire dire :

> « Waouh, il y a de la 3D. »

L'objectif est de faire ressentir :

> « Ce site a été construit comme une expérience spécialement pensée pour Jenny. »

La technologie doit devenir invisible.

Si la visiteuse pense constamment à :

```text
3D
WebGL
shader
animation
```

le système échoue en partie.

Si elle pense :

```text
"Pourquoi ce chat est là ?"
"Qu'est-ce qu'il y a derrière ?"
"Attends… c'est pour moi ?"
"Je veux voir la suite."
```

alors l'immersion fonctionne.

---

# 03 — IMMERSIVE EXPERIENCE MODEL

L'expérience complète sera structurée autour de trois couches.

```text
┌──────────────────────────────────┐
│          EXPERIENCE              │
│                                  │
│ Narrative / Visual / 3D          │
├──────────────────────────────────┤
│          INTERACTION             │
│                                  │
│ Motion / Input / State           │
├──────────────────────────────────┤
│          FOUNDATION              │
│                                  │
│ DOM / CSS / React / Data         │
└──────────────────────────────────┘
```

Cette architecture reprend directement le modèle recommandé par la Source 03.

---

# 04 — EXPERIENCE ENGINE

Le site doit être pensé comme un petit **Experience Engine**.

Architecture conceptuelle :

```text
ExperienceEngine
│
├── ExperienceState
│
├── SceneManager
│
├── TimelineManager
│
├── ScrollController
│
├── InputController
│
├── CameraController
│
├── TransitionController
│
├── MotionController
│
├── RendererController
│
├── AssetManager
│
└── AccessibilityController
```

Cette structure découle directement du modèle `ExperienceEngine` proposé par la Source 03.

---

# 05 — GLOBAL EXPERIENCE STATE

Le système doit disposer d'une source d'état centrale.

Exemple :

```text
ExperienceState
│
├── currentScene
├── previousScene
├── nextScene
├── progress
├── sceneProgress
├── interactionState
├── inputMode
├── deviceMode
├── loadingState
├── reducedMotion
├── webglAvailable
└── mediaState
```

L'objectif est d'éviter que :

```text
DOM
+
Motion
+
3D
+
Scroll
+
Router
```

possèdent chacun leur propre vérité.

La Source 03 recommande explicitement un état partagé entre DOM et WebGL.

---

# 06 — EXPERIENCE STATES

Le cycle général peut être :

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

Tous les états ne sont pas nécessairement visibles.

Certains sont internes au moteur.

---

# 07 — BOOT

Responsabilités :

```text
Initialize application
↓
Check device
↓
Check WebGL
↓
Check reduced motion
↓
Prepare critical assets
↓
Prepare experience state
```

Le système ne doit pas attendre tous les assets secondaires avant de rendre l'expérience essentielle.

---

# 08 — LOADING

Le chargement doit préparer :

```text
Critical UI
↓
Core visual
↓
Primary 3D asset
↓
Primary media
↓
Secondary assets
↓
Atmosphere
```

Cette stratégie suit le principe de progressive initialization de la Source 03.

---

# 09 — LOADER

Le loader doit être cohérent avec l'univers Jenny.

Direction :

```text
BLACK
+
SUBTLE RED
+
CAT SIGNAL
+
ARCHIVE / CASE LANGUAGE
```

Mais :

> le loader ne doit pas devenir une barrière artificielle.

Il doit préparer l'expérience, pas simplement afficher une animation pendant que l'application charge.

La Source 03 précise qu'un loader esthétique ne doit pas masquer un problème de chargement ni retarder inutilement l'accès au contenu.

---

# 10 — LOADER CONCEPT

Concept proposé :

```text
INITIAL DARKNESS
        ↓
RED SIGNAL
        ↓
SMALL CAT EYE / SILHOUETTE
        ↓
SYSTEM INITIALIZATION
        ↓
JENNY
        ↓
ENTER
```

La silhouette du chat ne doit pas nécessairement être révélée complètement.

Elle peut servir de premier indice.

---

# 11 — MOTION HIERARCHY

Le système de motion suivra :

```text
MICRO MOTION
↓
COMPONENT MOTION
↓
SECTION MOTION
↓
PAGE MOTION
↓
SCENE MOTION
↓
EXPERIENCE MOTION
```

Cette hiérarchie est définie dans la Source 03.

---

# 12 — MOTION CATEGORIES

Chaque animation doit appartenir à une catégorie :

```text
Entrance
Exit
Reveal
Transform
Hover
Feedback
Scroll
Transition
Ambient
Interactive
```

Cela évite d'avoir un ensemble d'animations sans logique commune.

---

# 13 — MOTION PERSONALITY

La motion Jenny doit être :

```text
CINEMATIC
+
SMOOTH
+
MYSTERIOUS
+
EMOTIONAL
+
CONTROLLED
```

Elle ne doit pas être :

```text
RAPID
+
NOISY
+
CONSTANTLY BOUNCY
+
OVER-ANIMATED
```

---

# 14 — MOTION CONTRAST

Le système doit volontairement alterner :

```text
STILLNESS
↓
SUBTLE MOTION
↓
DISCOVERY
↓
STILLNESS
↓
CLIMAX
```

Le calme devient alors un outil.

La Source 03 recommande explicitement le **motion contrast** et la retenue : une expérience doit savoir rester immobile.

---

# 15 — MOTION AS STORYTELLING

Le mouvement doit raconter.

Pour Jenny :

```text
Movement
→ discovery

Reveal
→ memory

Transition
→ passage

Light
→ emotion

Camera
→ attention

Object transformation
→ narrative progression
```

Chaque animation importante doit répondre à :

> **Qu'est-ce que ce mouvement me fait comprendre ou ressentir ?**

Cette approche correspond au principe UX de motion as communication.

---

# 16 — TIMING SYSTEM

Le système utilise plusieurs niveaux :

```text
MICRO
→ feedback

UI
→ controls

COMPONENT
→ cards / media

SECTION
→ content

SCENE
→ narrative

CLIMAX
→ major reveal
```

Les durées exactes seront centralisées dans les motion tokens.

La Source 03 recommande explicitement une hiérarchie de timing plutôt qu'une durée identique appliquée à tout.

---

# 17 — PROPOSED MOTION TOKENS

Valeurs initiales à tester :

```text
motion.instant
motion.micro
motion.fast
motion.normal
motion.medium
motion.scene
motion.cinematic
motion.climax
```

Les valeurs numériques finales seront validées pendant l'implémentation.

---

# 18 — EASING SYSTEM

Le système doit privilégier :

```text
Ease Out
```

pour les apparitions et réponses.

```text
Ease In
```

pour certaines sorties.

```text
Ease In Out
```

pour les transitions.

```text
Custom
```

pour les moments cinématiques.

```text
Spring
```

uniquement pour les interactions qui bénéficient d'une sensation physique.

La Source 03 définit ces catégories et insiste sur le fait que l'easing doit dépendre de l'intention.

---

# 19 — PHYSICS MOTION

Une sensation de :

```text
inertia
friction
mass
spring
momentum
```

peut être utilisée pour :

- curseur ;
- objet interactif ;
- caméra ;
- éléments flottants.

Mais la physique doit rester contrôlée.

La Source 03 rappelle qu'une simulation réaliste n'est pas nécessairement une bonne expérience.

---

# 20 — REVEAL SYSTEM

Le reveal constitue l'un des comportements fondamentaux du site.

Il peut utiliser :

```text
opacity
transform
clip-path
mask
scale
blur
position
```

ou une combinaison contrôlée.

Les reveals doivent être narratifs.

Ils ne doivent pas apparaître aléatoirement simplement pour produire du mouvement.

---

# 21 — JENNY REVEAL LANGUAGE

Le système doit privilégier :

```text
DARKNESS
↓
SIGNAL
↓
PARTIAL REVEAL
↓
RECOGNITION
↓
FULL REVEAL
```

Exemple :

```text
shadow of cat
↓
eyes
↓
silhouette
↓
object
↓
scene
```

---

# 22 — TEXT REVEAL

Les textes importants peuvent être révélés :

```text
BLOCK
```

ou :

```text
LINE
```

Les animations mot par mot ou caractère par caractère sont réservées aux moments où elles apportent une vraie valeur.

La Source 03 recommande d'adapter la granularité au contexte et de préserver la sémantique du texte.

---

# 23 — CAT MOTION SYSTEM

Le chat est le **motif animé principal** du projet.

Il peut être représenté comme :

```text
Silhouette
Shadow
Eyes
Paw
3D Object
Reflection
Particle shape
```

Il ne doit pas apparaître systématiquement sous la même forme.

---

# 24 — CAT AS NARRATIVE GUIDE

Le chat peut devenir une sorte de fil conducteur.

```text
SCENE 01
Cat signal

↓
SCENE 03
Cat recognition

↓
SCENE 04
Cat clue

↓
SCENE 06
Cat archive marker

↓
SCENE 11
Cat companion

↓
SCENE 13
Final quiet presence
```

Le chat devient ainsi une structure narrative et non un simple décor.

---

# 25 — RABBIT MOTION SYSTEM

Le lapin est secondaire.

Il peut apparaître :

```text
Easter egg
Small object
Shadow
Symbol
Background detail
```

Il ne doit jamais prendre le rôle principal du chat.

---

# 26 — MYSTERY MOTION

Le langage d'enquête peut utiliser :

```text
cursor tracking
slow reveal
red signal
masked text
coordinates
case numbers
small movement
hidden objects
```

L'utilisateur doit pouvoir comprendre progressivement le système.

---

# 27 — INVESTIGATION MECHANIC

Un indice peut fonctionner comme :

```text
IDLE
↓
USER DISCOVERS
↓
HOVER / TAP
↓
VISUAL RESPONSE
↓
CLUE REVEAL
↓
NEW INFORMATION
```

La Source 03 décrit précisément le storytelling interactif comme :

```text
USER ACTION
↓
WORLD RESPONSE
↓
NEW INFORMATION
↓
USER DECISION
```



---

# 28 — INTERACTIVE CLUES

Les indices ne doivent jamais être obligatoires pour comprendre le site.

Ils sont :

```text
OPTIONAL
+
DISCOVERABLE
+
REWARDING
```

Une personne qui ne les découvre pas doit quand même pouvoir parcourir toute l'expérience.

---

# 29 — SCROLL SYSTEM

Le scroll sera utilisé comme :

```text
NAVIGATION
+
PROGRESSION
+
STORYTELLING
+
SCENE CONTROL
```

Architecture :

```text
SCROLL POSITION
↓
NORMALIZED PROGRESS
↓
TIMELINE / EXPERIENCE STATE
↓
VISUAL OUTPUT
```

Cette architecture est directement définie par la Source 03.

---

# 30 — SCROLL NORMALIZATION

La logique interne doit utiliser :

```text
0.0 → beginning
1.0 → end
```

et non des valeurs arbitraires de pixels.

Cela permettra de mapper une même progression vers :

```text
camera
object
DOM
opacity
shader
scene
transition
```

---

# 31 — SCROLL STORY STRUCTURE

Le parcours peut être divisé en :

```text
SCENE 01
↓
SCENE 02
↓
SCENE 03
↓
...
↓
SCENE 13
```

Chaque scène possède :

```text
ENTER
↓
ACTIVE
↓
EXIT
```

---

# 32 — SCROLL PINNING

Le pinning sera réservé aux scènes réellement cinématiques.

Cas prioritaires :

```text
Hero / Introduction
3D reveal
18 reveal
Celebration
```

Il ne doit pas verrouiller toute la navigation.

La Source 03 et le système UX recommandent d'éviter les scroll traps et le scroll hijacking agressif.

---

# 33 — SCROLL PROGRESS

Un indicateur discret peut montrer :

```text
CHAPTER 01 / 13
```

ou :

```text
01
```

ou une ligne de progression.

Il doit rester secondaire.

---

# 34 — POINTER SYSTEM

Le pointer peut influencer :

```text
camera
light
3D object
background
parallax
cursor
```

mais toujours via un état central.

Architecture :

```text
Pointer
↓
Normalized Coordinates
↓
Input State
↓
Controllers
↓
Visual Output
```

La Source 03 recommande ce principe pour les interactions pilotées par input.

---

# 35 — CURSOR SYSTEM

Sur desktop, un curseur custom peut être utilisé.

États :

```text
DEFAULT
↓
INTERACTIVE
↓
MEDIA
↓
CLUE
↓
DRAG
↓
LOADING
```

Le curseur ne doit cependant jamais être la seule indication qu'un élément est interactif.

---

# 36 — TOUCH FALLBACK

Sur mobile :

```text
Hover
→ Tap / visible state
```

Les informations essentielles révélées par hover doivent être accessibles autrement.

Cette exigence découle directement du système UX.

---

# 37 — MAGNETIC INTERACTION

Un effet magnétique peut être appliqué à :

```text
Primary CTA
Enter button
Media controls
Final interaction
```

Il ne doit pas être appliqué à tous les boutons.

Le principe :

```text
Pointer
↓
Distance
↓
Influence
↓
Displacement
```

est défini dans la Source 03.

---

# 38 — PARALLAX

Le parallax peut être utilisé pour :

```text
Background
Atmosphere
Images
Text
3D objects
```

Mais il doit rester faible.

Objectif :

```text
DEPTH
```

et non :

```text
DISTORTION
```

---

# 39 — CAMERA SYSTEM

La caméra est un outil narratif.

Elle doit servir à :

```text
OBSERVE
FOLLOW
REVEAL
APPROACH
RETREAT
ORBIT
FOCUS
TRANSITION
```

La Source 03 définit explicitement la caméra comme un outil narratif et recommande d'éviter les mouvements agressifs pouvant provoquer désorientation et fatigue.

---

# 40 — PRIMARY CAMERA

Le système principal utilisera préférentiellement :

```text
Perspective Camera
```

pour les scènes nécessitant de la profondeur.

Une caméra orthographique peut être utilisée pour certains éléments graphiques ou compositions spécifiques si nécessaire.

---

# 41 — CAMERA CONTROLLER

Architecture :

```text
CameraController
│
├── Base Position
├── Target Position
├── Look At
├── Scroll Influence
├── Pointer Influence
├── Scene Influence
└── Transition Influence
```

Aucun système ne doit manipuler directement la caméra sans passer par cette architecture.

---

# 42 — CAMERA CONFLICT PREVENTION

Architecture interdite :

```text
Scroll → camera.position

+
Pointer → camera.position

+
Timeline → camera.position
```

Architecture correcte :

```text
Scroll
Pointer
Timeline
Scene
    ↓
Unified Camera State
    ↓
Camera Controller
    ↓
Camera Output
```

La Source 03 donne précisément cet exemple de prévention des conflits.

---

# 43 — CAMERA MOVEMENT LEVELS

```text
LEVEL 01
Subtle drift

LEVEL 02
Follow

LEVEL 03
Reveal

LEVEL 04
Cinematic transition

LEVEL 05
Climax
```

Le niveau 05 doit rester exceptionnel.

---

# 44 — MAIN 3D STRATEGY

La 3D ne sera pas présente dans toutes les scènes.

Elle sera utilisée lorsque :

```text
SPACE
+
DEPTH
+
NARRATIVE
+
IDENTITY
```

le justifient.

La Source 03 recommande explicitement d'utiliser la technologie la plus simple capable d'obtenir l'effet recherché.

---

# 45 — PRIMARY 3D OBJECT

Le projet doit avoir un **objet 3D principal propriétaire**.

Il doit être conçu autour de :

```text
JENNY
+
CAT
+
MYSTERY
+
MEMORY
+
18
```

Il ne doit pas être un simple modèle de chat posé dans une scène.

---

# 46 — 3D OBJECT CONCEPT

Concept recommandé :

> **The Memory Cat**

Un objet 3D stylisé inspiré du chat, mais suffisamment abstrait pour éviter l'effet "figurine".

Caractéristiques possibles :

```text
Dark matte body
+
Crimson emissive details
+
Ivory reflections
+
Subtle geometry
+
Memory / archive motifs
```

Le choix final de géométrie sera validé pendant le prototypage.

---

# 47 — WHY A CAT?

Parce que dans l'identité de Jenny :

```text
CAT
>
RABBIT
```

Le chat constitue donc le meilleur symbole transversal.

Il peut devenir :

```text
Mascot
+
Guide
+
Object
+
Easter egg
+
Transition anchor
```

---

# 48 — CAT 3D STATES

Le même objet peut posséder plusieurs états :

```text
DORMANT
↓
AWAKEN
↓
ACTIVE
↓
INTERACTIVE
↓
TRANSFORM
↓
MEMORY
↓
FINAL
```

La géométrie peut rester identique tout en modifiant :

- lumière ;
- position ;
- rotation ;
- scale ;
- matériau ;
- shader ;
- environnement.

---

# 49 — 3D SCENE ARCHITECTURE

Structure :

```text
Experience3D
│
├── Environment
│
├── Camera
│
├── Lights
│
├── MainObject
│
├── SecondaryObjects
│
├── Atmosphere
│
└── Effects
│
└── Controllers
    ├── CameraController
    ├── InteractionController
    ├── ScrollController
    └── AnimationController
```

Cette architecture reprend la structure recommandée par la Source 03.

---

# 50 — SCENE GRAPH

Structure cible :

```text
ROOT
│
├── Environment
│
├── MainCat
│   ├── Body
│   ├── Eyes
│   ├── EmissiveDetails
│   └── InteractionAnchor
│
├── MemoryObjects
│
├── LightRig
│
└── Atmosphere
```

La hiérarchie doit rester suffisamment simple pour être maintenable.

---

# 51 — 3D MATERIAL SYSTEM

Direction :

```text
MATTE DARK
+
SUBTLE GLOSS
+
CRIMSON EMISSION
+
WARM IVORY REFLECTION
```

Les matériaux doivent contribuer à :

```text
DEPTH
+
IDENTITY
+
FOCALIZATION
```

---

# 52 — LIGHTING SYSTEM

Architecture possible :

```text
Ambient
+
Key Light
+
Red Accent Light
+
Warm Rim Light
```

L'éclairage doit être adapté à chaque scène.

Il ne faut pas conserver exactement le même lighting rig partout.

---

# 53 — LIGHT AS NARRATIVE

La lumière peut évoluer :

```text
MYSTERY
→ DARK

RECOGNITION
→ RED ACCENT

MEMORY
→ WARM

BAC
→ BRIGHTER

18
→ OPEN / LUMINOUS

FINALE
→ WARM / CALM
```

La lumière devient ainsi une continuité narrative.

---

# 54 — 3D DEPTH SYSTEM

La profondeur peut utiliser :

```text
Perspective
Distance
Scale
Lighting
Occlusion
Fog
Camera movement
Parallax
```

La Source 03 recommande de ne pas dépendre d'un seul effet pour construire la profondeur.

---

# 55 — SHADER SYSTEM

Les shaders seront utilisés uniquement lorsqu'ils apportent un niveau de contrôle impossible ou difficile à obtenir autrement.

Applications possibles :

```text
Noise
Distortion
Dynamic Gradient
Displacement
Memory Transition
Light
Particles
```

La Source 03 définit précisément ces usages.

---

# 56 — SHADER PARAMETERS

Les paramètres doivent être centralisés.

Exemple :

```text
uTime
uProgress
uIntensity
uNoiseScale
uDistortion
uColor
uReveal
```

Aucun nombre magique dispersé dans le code.

---

# 57 — SHADER RULE

Chaque shader complexe doit être :

```text
ISOLATED
DOCUMENTED
PARAMETERIZED
TESTABLE
DISABLEABLE
```

Cette règle vient directement de la Source 03.

---

# 58 — MEMORY SHADER

Un shader spécifique peut être réservé aux transitions de mémoire.

Concept :

```text
SOLID OBJECT
↓
DISTORTION
↓
PARTICLES
↓
MEMORY IMAGE
```

ou inversement :

```text
MEMORY IMAGE
↓
DISTORTION
↓
PARTICLES
↓
3D OBJECT
```

Le principe devra être prototypé avant d'être adopté.

---

# 59 — PARTICLE SYSTEM

Les particules peuvent représenter :

```text
Atmosphere
Memory
Transition
Celebration
Light
```

Elles ne doivent pas être présentes partout.

---

# 60 — PARTICLE STATES

```text
IDLE
→ slow drift

REVEAL
→ convergence

TRANSITION
→ displacement

CLIMAX
→ expansion

FINALE
→ decay
```

---

# 61 — PARTICLE BUDGET

La densité des particules doit être paramétrable :

```text
particleDensity
```

et adaptée au device.

La Source 03 recommande explicitement l'adaptation du nombre d'objets, des particules, de la résolution et des shaders selon le contexte.

---

# 62 — ATMOSPHERIC SYSTEM

L'atmosphère peut combiner :

```text
Grain
+
Fog
+
Light drift
+
Particles
+
Soft gradients
```

Mais :

> l'atmosphère ne doit jamais prendre le dessus sur le contenu.

---

# 63 — POST-PROCESSING

Les effets possibles :

```text
Bloom
Blur
Vignette
Distortion
Color grading
Noise
Depth effects
```

Mais ils doivent rester exceptionnels.

La Source 03 précise que le post-processing ne doit pas devenir une couche permanente d'effets sans justification.

---

# 64 — JENNY POST-PROCESSING PROFILE

Le profil principal peut être :

```text
Subtle Bloom
+
Very Light Grain
+
Controlled Vignette
```

Le bloom doit surtout servir :

```text
Red Light
+
Cat Eyes
+
Final Celebration
```

---

# 65 — DOM + WEBGL ARCHITECTURE

Le site sera hybride.

```text
DOM
→ semantic content
→ text
→ buttons
→ media
→ navigation
→ accessibility

WEBGL
→ atmosphere
→ 3D
→ immersive visual
→ spatial transitions
```

Cette architecture est explicitement recommandée par la Source 03.

---

# 66 — FUNCTIONAL UI BOUNDARY

Les fonctions essentielles restent dans le DOM :

```text
Navigation
Media controls
Buttons
Forms
Text
Accessibility
```

La 3D enrichit.

Elle ne remplace pas l'interface fonctionnelle.

---

# 67 — WEBGL FAILURE ISOLATION

Architecture :

```text
CORE UI
+
OPTIONAL IMMERSIVE LAYER
```

Si WebGL échoue :

```text
WEBGL OFF
↓
DOM EXPERIENCE
↓
CORE STORY REMAINS
```

Un problème 3D ne doit jamais rendre le contenu inutilisable.

---

# 68 — WEBGL FALLBACK LEVELS

```text
LEVEL 01
Full WebGL

LEVEL 02
Simplified WebGL

LEVEL 03
CSS / DOM visual

LEVEL 04
Static core experience
```

Le contenu essentiel reste présent à tous les niveaux.

---

# 69 — MOBILE 3D

Le mobile ne sera pas :

```text
Desktop
scaled down
```

Il sera une expérience adaptée.

Possible reductions :

```text
Geometry
Textures
Particles
Post-processing
Camera movement
Interactions
Shader complexity
```

La Source 03 demande explicitement cette adaptation.

---

# 70 — MOBILE EXPERIENCE MODE

Sur mobile :

```text
MORE CONTENT
LESS EFFECT
```

Priorités :

```text
Story
Media
Interaction
Readability
Emotion
```

---

# 71 — MOBILE CAMERA

La caméra sera :

```text
Less dynamic
Less deep
More stable
More focused
```

Le mouvement doit rester confortable.

---

# 72 — REDUCED MOTION

Lorsque :

```text
prefers-reduced-motion: reduce
```

le système doit :

```text
Reduce camera movement
Remove continuous rotation
Reduce parallax
Simplify transitions
Reduce ambient motion
Stop decorative loops when appropriate
```

La scène conserve néanmoins son information principale.

---

# 73 — REDUCED MOTION EXPERIENCE

Le parcours devient :

```text
FULL EXPERIENCE
↓
SIMPLIFIED MOTION EXPERIENCE
```

et non :

```text
FULL EXPERIENCE
↓
BLANK PAGE
```

---

# 74 — TIME CONTROL

Les scènes narratives longues doivent permettre lorsque pertinent :

```text
Skip
Pause
Direct navigation
Scroll control
Manual interaction
```

La Source 03 recommande de ne pas empêcher inutilement l'utilisateur d'avancer.

---

# 75 — SCENE TRANSITION SYSTEM

Structure :

```text
SCENE A
↓
EXIT
↓
TRANSITION LAYER
↓
SCENE B
↓
ENTER
```

C'est le modèle défini par la Source 03.

---

# 76 — TRANSITION TYPES

Le moteur doit supporter :

```text
Fade
Slide
Scale
Mask
Clip Path
WebGL
Camera
Shared Object
```

Mais chaque scène choisit uniquement le mécanisme pertinent.

---

# 77 — JENNY TRANSITION LANGUAGE

Les transitions prioritaires seront :

```text
Object continuity
+
Color continuity
+
Light continuity
+
Narrative continuity
```

Le rouge peut passer :

```text
object
→ light
→ line
→ background signal
```

---

# 78 — SHARED OBJECT TRANSITION

Le chat constitue le meilleur candidat.

Exemple :

```text
CAT SILHOUETTE
↓
ZOOM
↓
CAT 3D OBJECT
↓
NEXT SCENE
```

Le même élément visuel relie les scènes.

La Source 03 recommande les shared elements pour créer une continuité spatiale.

---

# 79 — SCENE 01 — ARRIVAL

## Intention

Créer immédiatement :

```text
MYSTERY
+
ANTICIPATION
```

## Motion

```text
Darkness
↓
Very subtle atmospheric motion
↓
Red signal
↓
Cat eyes
↓
Title reveal
```

## 3D

Présence très partielle du sujet.

Pas de reveal complet.

---

# 80 — SCENE 02 — INVITATION

## Intention

Faire comprendre qu'une expérience attend Jenny.

Motion :

```text
Text reveal
+
soft camera movement
+
red light
```

Interaction :

```text
ENTER
```

---

# 81 — SCENE 03 — RECOGNITION

C'est le premier grand :

> « C'est moi. »

Moment.

Le chat devient reconnaissable.

Possible séquence :

```text
Shadow
↓
Eyes
↓
Silhouette
↓
JENNY
```

---

# 82 — SCENE 04 — DISCOVERY

Le langage enquête devient dominant.

Éléments :

```text
Clues
Numbers
Red marks
Archive labels
Hidden interactions
```

Le mouvement peut être déclenché par :

```text
Pointer
Scroll
Tap
```

---

# 83 — SCENE 05 — HER WORLD

Le rythme ralentit.

```text
MYSTERY
↓
INTIMACY
```

Le mouvement devient plus doux.

Les références :

```text
Cats
Rabbits
Romance
Anime
Horror
Investigation
```

peuvent être introduites progressivement.

---

# 84 — SCENE 06 — MEMORIES

Cette scène introduit la matière réelle du projet :

```text
Messages
Photos
Videos
```

La 3D doit être moins dominante.

Le contenu humain devient prioritaire.

---

# 85 — MEMORY TRANSITION

Concept :

```text
3D OBJECT
↓
PARTICLES
↓
MEDIA
```

La transition signifie :

> le monde symbolique laisse place aux vrais souvenirs.

---

# 86 — SCENE 07 — PEOPLE

Les contributions deviennent une présence humaine.

Motion :

```text
Portrait / Media
↓
Reveal
↓
Name
↓
Message
```

Les cartes peuvent entrer avec un léger stagger.

---

# 87 — SCENE 08 — VOICES

Les vidéos sont mises en avant.

La motion doit être minimaliste.

Priorité :

```text
FACE
+
VOICE
+
MESSAGE
```

La technologie ne doit pas distraire de la personne qui parle.

---

# 88 — SCENE 09 — IMAGES

Les photos deviennent une galerie immersive.

Le système peut utiliser :

```text
Parallax
Shared element
Mask reveal
Soft zoom
```

Mais pas de transformation agressive.

---

# 89 — SCENE 10 — BAC

Changement d'énergie.

```text
MYSTERY
↓
PRIDE
```

La lumière augmente.

Le rouge devient plus lumineux.

L'espace s'ouvre.

---

# 90 — SCENE 11 — 18

Le nombre :

```text
18
```

devient le principal objet visuel.

Possible transformation :

```text
18
↓
3D FORM
↓
LIGHT
↓
OPEN SPACE
```

La scène doit représenter un passage.

---

# 91 — SCENE 12 — CELEBRATION

C'est le climax.

Motion :

```text
Light expansion
+
Particles
+
Camera reveal
+
18
+
Red / Ivory atmosphere
```

La densité d'effets peut augmenter temporairement.

Mais le contenu reste lisible.

---

# 92 — SCENE 13 — FINALE

Après le climax :

```text
Motion
↓
Decay
↓
Calm
```

Le chat peut revenir sous une forme très discrète.

La lumière devient chaude.

La scène doit respirer.

---

# 93 — FINAL INTERACTION

L'utilisateur doit disposer d'une dernière action claire.

Exemple conceptuel :

```text
ENTER THE MEMORY ARCHIVE
```

ou :

```text
REVISIT
```

ou une action équivalente validée avec l'UX final.

---

# 94 — EXPERIENCE LOOP

L'expérience peut donc suivre :

```text
MYSTERY
↓
RECOGNITION
↓
DISCOVERY
↓
MEMORY
↓
PEOPLE
↓
ACHIEVEMENT
↓
18
↓
CELEBRATION
↓
CALM
```

C'est le mouvement émotionnel principal du système.

---

# 95 — MASTER TIMELINE

Architecture :

```text
MASTER EXPERIENCE
│
├── INTRO
│
├── ARRIVAL
│
├── INVITATION
│
├── RECOGNITION
│
├── DISCOVERY
│
├── HER WORLD
│
├── MEMORIES
│
├── PEOPLE
│
├── VOICES
│
├── IMAGES
│
├── BAC
│
├── 18
│
├── CELEBRATION
│
└── FINALE
```

Chaque sous-timeline doit avoir une responsabilité claire, conformément au modèle de timeline de la Source 03.

---

# 96 — TIMELINE OWNERSHIP

Architecture :

```text
ExperienceTimeline
    ↓
SceneTimeline
    ↓
ComponentTimeline
```

Un composant ne doit pas contrôler indépendamment une propriété appartenant à la scène.

---

# 97 — ANIMATION OWNERSHIP

Exemple :

```text
Hero
→ Hero controller

Camera
→ Camera controller

Navigation
→ Navigation motion

Scene
→ Scene timeline

3D object
→ Object controller
```

La Source 03 insiste sur l'ownership des animations pour éviter les conflits.

---

# 98 — INTERRUPTIBLE MOTION

Les animations doivent pouvoir répondre aux nouvelles actions.

Exemple :

```text
User starts transition
↓
User changes direction
↓
Animation adapts
```

Éviter de bloquer artificiellement l'utilisateur jusqu'à la fin d'une séquence.

La Source 03 recommande explicitement une motion interruptible.

---

# 99 — STATE MACHINE FOR SCENES

Chaque scène peut être :

```text
IDLE
↓
ENTERING
↓
ACTIVE
↓
INTERACTING
↓
EXITING
↓
COMPLETE
```

Cela évite les animations indépendantes contradictoires.

---

# 100 — 3D INTERACTION STATES

Un objet 3D interactif peut utiliser :

```text
IDLE
HOVERED
FOCUSED
ACTIVE
SELECTED
DISABLED
```

Ces états doivent produire une réponse visuelle compréhensible.

---

# 101 — RAYCASTING

Pour les objets 3D interactifs :

```text
POINTER
↓
RAYCAST
↓
OBJECT DETECTED
↓
INTERACTION STATE
↓
VISUAL RESPONSE
```

Le système doit distinguer :

```text
VISUAL OBJECT
```

et :

```text
INTERACTIVE OBJECT
```

comme le recommande la Source 03.

---

# 102 — MEMORY OBJECT INTERACTION

Un souvenir peut devenir interactif :

```text
IDLE
↓
HOVER / TAP
↓
OBJECT RESPONSE
↓
MEDIA REVEAL
```

Mais la navigation vers le souvenir doit également rester possible sans interaction 3D complexe.

---

# 103 — DOM / WEBGL SYNCHRONIZATION

Architecture :

```text
Shared Experience State
          ↓
      ┌───┴───┐
      ↓       ↓
     DOM    WebGL
```

Exemple :

```text
sceneProgress = 0.65
```

peut simultanément contrôler :

```text
DOM text
+
camera
+
3D object
+
shader
```

---

# 104 — INPUT STATE

Le système centralise :

```text
pointerX
pointerY
pointerVelocity
scrollProgress
scrollVelocity
touchState
keyboardState
```

Les contrôleurs consomment cet état.

---

# 105 — LERP / SMOOTHING

Le smoothing peut être utilisé pour :

```text
Camera
Light
Object
Cursor
Parallax
```

Architecture :

```text
CURRENT
↓
TARGET
↓
INTERPOLATION
↓
OUTPUT
```

Mais le système doit rester suffisamment réactif pour éviter une sensation de retard.

---

# 106 — AUDIO

Aucune dépendance forte à l'audio ne doit être introduite par défaut.

Si du son est ajouté plus tard :

```text
OPTIONAL
+
USER CONTROL
+
NO AUTOPLAY SURPRISE
```

L'expérience doit rester complète sans son.

---

# 107 — MEDIA AS IMMERSIVE CONTENT

Les vidéos envoyées par les proches constituent une partie majeure de l'expérience.

Elles doivent donc être intégrées au moteur comme :

```text
MEDIA OBJECT
```

et non comme simple `<video>` posé dans une carte.

---

# 108 — VIDEO REVEAL

Possible sequence :

```text
ARCHIVE ENTRY
↓
MEDIA FRAME
↓
PLAY INDICATOR
↓
VIDEO
```

Le cadre peut utiliser les codes visuels de l'archive.

---

# 109 — VIDEO TRANSITIONS

Une vidéo peut apparaître par :

```text
mask
+
scale
+
opacity
```

et quitter la scène par :

```text
scale
+
fade
```

Les transitions doivent rester rapides et contrôlables.

---

# 110 — PHOTO TRANSITIONS

Une photo peut devenir :

```text
card
↓
expanded image
↓
full-screen memory
```

Cette transformation constitue un excellent candidat au **shared element transition**.

---

# 111 — MESSAGE MOTION

Les messages écrits doivent avoir une motion plus calme.

```text
Reveal
↓
Reading
↓
Stillness
```

La lecture ne doit pas être constamment interrompue.

---

# 112 — MOTION CONTRAST WITH MEDIA

Le principe :

```text
Before media
→ cinematic

During media
→ calm

After media
→ transition
```

La présence humaine devient le centre.

---

# 113 — PERFORMANCE ARCHITECTURE

Cette phase définit les principes d'ingénierie.

Les métriques détaillées appartiendront à la phase dédiée à la qualité technique.

La Source 03 rappelle que les budgets de performance, Core Web Vitals, profiling, compression, caching, mémoire et GPU profiling appartiennent à la Source 04.

---

# 114 — PROGRESSIVE ENHANCEMENT

Architecture :

```text
LAYER 01
Semantic Content

↓
LAYER 02
Visual Design

↓
LAYER 03
Interaction

↓
LAYER 04
Motion

↓
LAYER 05
3D

↓
LAYER 06
Advanced Rendering
```

Chaque couche doit apporter une amélioration.

Cette structure est explicitement définie dans la Source 03.

---

# 115 — GRACEFUL DEGRADATION

Trois niveaux :

```text
FULL EXPERIENCE
↓
SIMPLIFIED EXPERIENCE
↓
CORE EXPERIENCE
```

Le contenu, la navigation, l'identité et l'action principale doivent survivre autant que possible à la suppression des couches avancées.

---

# 116 — ASSET PIPELINE

Tous les assets doivent suivre :

```text
SOURCE
↓
PROCESS
↓
OPTIMIZE
↓
IMPORT
↓
CACHE
↓
RENDER
```

Ce principe est défini dans la Source 03.

---

# 117 — 3D ASSET CATEGORIES

```text
Primary 3D object
Secondary objects
Textures
Environment
Lighting assets
Shaders
Particle resources
Media
```

---

# 118 — ASSET PRIORITY

```text
P0 — Critical
Experience cannot start without it

P1 — Important
Experience can start but loses richness

P2 — Atmospheric
Optional enhancement

P3 — Decorative
Can be removed without impact
```

---

# 119 — ANIMATION LOOP

Une boucle permanente ne doit exister que lorsqu'elle est nécessaire.

Architecture :

```text
FRAME
↓
UPDATE
↓
RENDER
```

Les scènes statiques ne doivent pas maintenir inutilement des boucles permanentes.

---

# 120 — TIME-BASED ANIMATION

Les animations doivent être basées sur le temps lorsque nécessaire.

Concept :

```text
deltaTime
```

plutôt qu'un nombre arbitraire de frames.

Cela améliore la cohérence lorsque le frame rate varie.

---

# 121 — RAF STRATEGY

Une expérience ne doit pas multiplier les boucles de rendu concurrentes.

Architecture :

```text
ONE EXPERIENCE RENDER LOOP
```

avec des systèmes qui s'actualisent à partir de cette boucle.

---

# 122 — DEVICE ADAPTATION

Le moteur doit détecter :

```text
Desktop
Tablet
Mobile
```

et adapter :

```text
3D complexity
Particle density
Texture quality
Shader complexity
Post-processing
Camera motion
Interaction
```

---

# 123 — CAPABILITY-BASED ADAPTATION

L'adaptation ne doit pas uniquement dépendre de la largeur d'écran.

Elle doit aussi considérer :

```text
WebGL capability
Reduced motion
Input type
Performance class
```

---

# 124 — DEBUG MODE

Un mode debug interne doit pouvoir afficher :

```text
FPS
Scene State
Camera
Current Progress
Active Scene
Pointer Coordinates
Selected Object
Loading State
WebGL State
```

La Source 03 recommande ce type de mode pour les expériences complexes.

---

# 125 — MOTION DEBUGGING

Méthode :

```text
01
Initial State

↓
02
Trigger

↓
03
Timeline

↓
04
Easing

↓
05
Conflicts

↓
06
Lifecycle

↓
07
Rendering
```

Ne jamais corriger une animation uniquement en ajoutant des délais supplémentaires.

---

# 126 — 3D DEBUGGING

Méthode :

```text
Scene
↓
Camera
↓
Geometry
↓
Material
↓
Lighting
↓
Animation
↓
Interaction
↓
Post-processing
```

Chaque couche est testée indépendamment.

---

# 127 — LIFECYCLE

Toute scène animée ou 3D doit gérer :

```text
INIT
↓
MOUNT
↓
ACTIVE
↓
UPDATE
↓
PAUSE
↓
UNMOUNT
↓
CLEANUP
```

Cela évite :

```text
Memory leaks
GPU resources left alive
Persistent listeners
Animation loops
Ghost states
```

La Source 03 définit explicitement cette obligation de lifecycle.

---

# 128 — RESOURCE CLEANUP

Les ressources pouvant nécessiter une gestion explicite :

```text
Geometry
Texture
Material
Model
Framebuffer
RenderTarget
Event Listener
Animation Loop
```

---

# 129 — ERROR ISOLATION

Un problème dans :

```text
3D
```

ne doit pas casser :

```text
DOM
Navigation
Media
Messages
```

L'architecture doit donc considérer la 3D comme une couche avancée isolable.

---

# 130 — EXPERIENCE ROUTING

Si le projet possède plusieurs routes :

```text
Router
↓
Transition Controller
↓
Scene / Page
```

Le router indique le changement.

Le Transition Controller orchestre la transition.

La page rend le nouveau contenu.

Cette séparation correspond au principe de transition ownership de la Source 03.

---

# 131 — PAGE TRANSITION FOR JENNY

Même si l'expérience principale est fortement narrative, les transitions doivent préserver une continuité.

Possible :

```text
Archive
↓
Red transition
↓
Memory
```

ou :

```text
Cat object
↓
Camera movement
↓
Media scene
```

---

# 132 — VISUAL CONTINUITY

Chaque transition doit préserver au moins une continuité :

```text
Spatial
Chromatic
Temporal
Narrative
Object
Movement
```

C'est un principe central de la Source 03.

---

# 133 — EXPERIENCE STATE TRANSITION

Exemple :

```text
DISCOVERY
↓
MEMORY
```

ne doit pas simplement être :

```text
fade out
+
fade in
```

mais :

```text
CLUE
↓
RED SIGNAL
↓
CAT MOVEMENT
↓
ARCHIVE
↓
MEMORY
```

La transition elle-même devient une partie de l'histoire.

---

# 134 — 3D / DOM BOUNDARY

Règle :

```text
DOM = meaning
WEBGL = spatial expression
```

Le DOM porte :

```text
text
navigation
buttons
media controls
accessibility
```

Le WebGL porte :

```text
depth
atmosphere
objects
spatial transition
visual immersion
```

---

# 135 — EXPERIENCE COMPOSITION

Les primitives seront composées selon :

```text
Primitive
↓
Interaction
↓
Pattern
↓
Scene
↓
Experience
```

C'est le modèle de composition recommandé par la Source 03.

---

# 136 — REUSABLE MOTION PRIMITIVES

Le projet devra isoler :

```text
Reveal
TextReveal
Parallax
Magnetic
SmoothInteraction
SceneTransition
CameraRig
ParticleField
ShaderPlane
WebGLBackground
```

Ces primitives peuvent être réutilisables.

---

# 137 — JENNY-SPECIFIC EXPERIENCE PRIMITIVES

En plus des primitives génériques :

```text
CatReveal
MemoryReveal
ArchiveTransition
ClueInteraction
BirthdayReveal
BacReveal
18Reveal
CelebrationBurst
```

Ces primitives appartiennent au projet Jenny et ne doivent pas être considérées comme des abstractions génériques tant que leur comportement n'est pas suffisamment stable.

---

# 138 — MOTION TOKEN ARCHITECTURE

Structure :

```text
motion/
│
├── duration
├── easing
├── stagger
├── spring
├── reveal
├── transition
├── interaction
└── reduced-motion
```

---

# 139 — EXPERIENCE PARAMETERIZATION

Les paramètres importants doivent être centralisés :

```text
cameraSpeed
cameraFollowStrength
transitionDuration
particleDensity
distortionIntensity
scrollMultiplier
hoverStrength
parallaxStrength
catRevealProgress
celebrationIntensity
```

La Source 03 recommande explicitement cette centralisation afin d'éviter les magic numbers.

---

# 140 — NO MAGIC NUMBERS

Interdit :

```text
gsap.to(..., { duration: 0.73 })
```

répété partout sans signification.

Préférer :

```text
motion.duration.scene
```

ou :

```text
scene.transitionDuration
```

---

# 141 — DESIGN ↔ MOTION HANDOFF

Chaque scène doit documenter :

```text
Animated elements
Trigger
State
Priority
Direction
Timing
Relationship with content
```

C'est exactement le contenu attendu par le handoff Design → Motion de la Source 03.

---

# 142 — UX ↔ MOTION HANDOFF

La motion doit respecter :

```text
User journey
Hierarchy
Accessibility
Feedback
User control
```

Les animations critiques doivent être identifiées.

---

# 143 — 3D ↔ CONTENT HANDOFF

Chaque scène 3D doit répondre :

```text
What does this object represent?
What content does it accompany?
What information does it transmit?
What behavior does it expect?
```

Une scène 3D indépendante du contenu est interdite dans ce projet.

Ce principe vient directement de la Source 03.

---

# 144 — THE "NO DECORATIVE 3D" RULE

Avant de créer un objet 3D :

```text
Does it tell something?
Does it guide something?
Does it reveal something?
Does it represent something?
Does it create meaningful spatial depth?
```

Si toutes les réponses sont :

```text
NO
```

l'objet ne doit pas exister.

---

# 145 — THE "NO MOTION WITHOUT PURPOSE" RULE

Avant chaque animation :

```text
Purpose?
Trigger?
State?
Destination?
Fallback?
```

Si la réponse n'est pas claire :

```text
DO NOT ANIMATE.
```

La règle finale de la Source 03 est :

> **EVERY MOVEMENT MUST HAVE A REASON.**

---

# 146 — THE "3D SHOULD CREATE DEPTH" RULE

La 3D doit enrichir :

```text
Space
Narrative
Identity
Interaction
Perception
```

et non :

```text
Technology showcase
```

La Source 03 formule explicitement cette règle :

> **3D SHOULD CREATE DEPTH, NOT DISTRACTION.**

---

# 147 — IMMERSION WITHOUT LOSS OF CONTROL

L'expérience doit rester immersive tout en conservant :

```text
Orientation
Control
Readability
Accessibility
Progression
```

Le système UX interdit notamment les expériences qui deviennent autoritaires ou empêchent inutilement la navigation.

---

# 148 — IMMERSION SCALE

Le niveau d'immersion doit varier :

```text
SCENE 01
████░░░░░░

SCENE 04
██████░░░░

SCENE 06
████░░░░░░

SCENE 11
████████░░

SCENE 12
██████████

SCENE 13
████░░░░░░
```

La scène 12 constitue le maximum.

Le retour au calme est volontaire.

---

# 149 — EXPERIENCE RHYTHM

Le parcours complet suit :

```text
QUIET
↓
MYSTERY
↓
DISCOVERY
↓
INTIMACY
↓
MEMORY
↓
HUMAN PRESENCE
↓
PRIDE
↓
CLIMAX
↓
CALM
```

Ce rythme est plus important que la quantité d'effets.

---

# 150 — IMMERSIVE QUALITY CHECK

Une scène immersive est validée si :

```text
[ ] Purpose defined
[ ] Narrative role defined
[ ] User state defined
[ ] Trigger defined
[ ] Entry defined
[ ] Active state defined
[ ] Exit defined
[ ] Motion defined
[ ] Camera defined
[ ] 3D purpose defined
[ ] DOM content defined
[ ] Interaction defined
[ ] Mobile behavior defined
[ ] Reduced motion defined
[ ] Fallback defined
```

---

# 151 — MOTION QUALITY CHECKLIST

Avant validation :

```text
[ ] Animation has a purpose
[ ] Trigger is defined
[ ] Initial state is defined
[ ] Final state is defined
[ ] Duration is coherent
[ ] Easing is coherent
[ ] Animation can be interrupted
[ ] No conflicting animation owners
[ ] Reduced-motion behavior exists
[ ] Mobile behavior exists
[ ] Touch fallback exists
[ ] Keyboard behavior is preserved
[ ] Content remains accessible
```

Cette checklist reprend directement celle de la Source 03.

---

# 152 — 3D QUALITY CHECKLIST

```text
[ ] Scene purpose defined
[ ] Camera defined
[ ] Scene graph organized
[ ] Lighting defined
[ ] Materials defined
[ ] Assets validated
[ ] Interaction states defined
[ ] WebGL fallback considered
[ ] Mobile behavior defined
[ ] Reduced-motion behavior defined
[ ] DOM/WebGL relationship defined
[ ] State synchronization defined
[ ] Lifecycle cleanup implemented
[ ] Debug strategy available
[ ] Failure isolation considered
```

Cette checklist est également issue de la Source 03.

---

# 153 — MOTION ARCHITECTURE CHECKLIST

```text
[ ] Global motion system defined
[ ] Timing hierarchy defined
[ ] Easing hierarchy defined
[ ] State model defined
[ ] Timeline ownership defined
[ ] Scroll system defined
[ ] Page transition system defined
[ ] Interaction system defined
[ ] Shared state defined
[ ] Parameter system defined
[ ] Reusable primitives identified
```

---

# 154 — IMPLEMENTATION ORDER

L'implémentation réelle devra suivre strictement :

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

Cet ordre est explicitement recommandé par la Source 03.

---

# 155 — IMPLEMENTATION PHILOSOPHY

Il sera donc interdit de commencer par :

```text
Three.js
```

ou :

```text
Shader
```

ou :

```text
Particle system
```

avant d'avoir :

```text
DOM
+
Layout
+
Interaction
+
Basic Motion
```

fonctionnels.

---

# 156 — PHASE 6 OUTPUT

La Phase 6 produit les spécifications suivantes :

```text
Experience Engine
        ↓
State Architecture
        ↓
Motion System
        ↓
Scroll System
        ↓
Transition System
        ↓
Camera System
        ↓
3D Scene System
        ↓
Cat Object System
        ↓
Lighting System
        ↓
Shader System
        ↓
Particle System
        ↓
DOM/WebGL Bridge
        ↓
Responsive 3D
        ↓
Reduced Motion
        ↓
Fallback
        ↓
Debugging
```

---

# 157 — TARGET PROJECT STRUCTURE

La future implémentation pourra être organisée conceptuellement comme :

```text
src/
│
├── experience/
│   ├── engine/
│   ├── state/
│   ├── scenes/
│   ├── transitions/
│   ├── timeline/
│   └── controllers/
│
├── motion/
│   ├── primitives/
│   ├── reveals/
│   ├── interactions/
│   └── tokens/
│
├── three/
│   ├── scene/
│   ├── camera/
│   ├── objects/
│   ├── lights/
│   ├── materials/
│   ├── shaders/
│   ├── particles/
│   └── controllers/
│
├── ui/
│   ├── navigation/
│   ├── media/
│   ├── memory/
│   └── controls/
│
├── assets/
│   ├── models/
│   ├── textures/
│   ├── media/
│   └── shaders/
│
└── accessibility/
```

Cette structure est un **blueprint d'implémentation**, pas encore une décision finale de stack ou de fichiers.

---

# 158 — RESPONSIBILITY SEPARATION

```text
UI
→ content and semantics

Experience State
→ truth

Motion
→ temporal transformation

Scene
→ spatial composition

Camera
→ viewpoint

WebGL
→ rendering

Assets
→ resources

Accessibility
→ alternative experience
```

---

# 159 — WHAT MUST NEVER HAPPEN

```text
❌ 3D controls application state directly
❌ multiple systems control camera simultaneously
❌ DOM and WebGL maintain separate truths
❌ animation blocks navigation unnecessarily
❌ WebGL failure kills content
❌ mobile is desktop scaled down
❌ reduced motion means blank content
❌ shaders contain undocumented magic values
❌ every scene uses the same transition
❌ every element is animated
❌ particles are permanent decoration
❌ 3D exists without narrative purpose
```

---

# 160 — WHAT MUST ALWAYS HAPPEN

```text
✓ State is centralized
✓ Motion has ownership
✓ Camera has one controller
✓ DOM remains semantic
✓ WebGL is optional enhancement
✓ Scene transitions preserve continuity
✓ Mobile has its own strategy
✓ Reduced motion is supported
✓ Assets are progressively loaded
✓ Resources are cleaned
✓ Effects are parameterized
✓ Debug mode exists
✓ Failure is isolated
✓ 3D serves the story
✓ Motion serves the emotion
```

---

# 161 — FINAL EXPERIENCE ENGINE MODEL

Le système final peut être résumé ainsi :

```text
                         JENNY EXPERIENCE
                                │
                                ↓
                        EXPERIENCE STATE
                                │
             ┌──────────────────┼──────────────────┐
             ↓                  ↓                  ↓
          SCROLL              INPUT             ROUTING
             │                  │                  │
             └──────────────────┼──────────────────┘
                                ↓
                        EXPERIENCE ENGINE
                                │
          ┌─────────────────────┼─────────────────────┐
          ↓                     ↓                     ↓
       MOTION                 SCENE                MEDIA
          │                     │                     │
          ↓                     ↓                     ↓
     TIMELINES              CAMERA + 3D          DOM + UI
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                ↓
                         VISUAL EXPERIENCE
                                │
                  ┌─────────────┼─────────────┐
                  ↓             ↓             ↓
                MOTION         3D          ATMOSPHERE
                  │             │             │
                  └─────────────┼─────────────┘
                                ↓
                            JENNY
```

---

# 162 — MASTER NARRATIVE MOTION

Le mouvement global raconte :

```text
YOU DON'T KNOW
        ↓
YOU NOTICE
        ↓
YOU RECOGNIZE
        ↓
YOU DISCOVER
        ↓
YOU REMEMBER
        ↓
YOU HEAR THEM
        ↓
YOU SEE THEM
        ↓
YOU CELEBRATE
        ↓
YOU TURN 18
        ↓
YOU LOOK FORWARD
```

La motion n'est donc plus une collection d'animations.

Elle devient une **grammaire narrative**.

---

# 163 — FINAL ENGINEERING STATEMENT

La réussite de cette phase ne sera pas mesurée au nombre de :

```text
3D objects
Shaders
Particles
Animations
Transitions
```

Elle sera mesurée par la cohérence entre :

```text
STORY
+
UX
+
MOTION
+
3D
+
CONTENT
```

La Source 03 résume cette philosophie en trois règles :

> **EVERY MOVEMENT MUST HAVE A REASON.**

> **3D SHOULD CREATE DEPTH, NOT DISTRACTION.**

> **BUILD THE EXPERIENCE FIRST. THEN BUILD THE ENGINE THAT MAKES IT POSSIBLE.**

---

# 164 — PHASE 6 QUALITY GATE

```text
[✓] Experience engine defined
[✓] Global state defined
[✓] Scene state defined
[✓] Motion hierarchy defined
[✓] Timing hierarchy defined
[✓] Easing direction defined
[✓] Reveal system defined
[✓] Scroll system defined
[✓] Input system defined
[✓] Camera system defined
[✓] Camera conflict prevention defined
[✓] Primary 3D concept defined
[✓] Cat as main 3D motif defined
[✓] Rabbit as secondary motif defined
[✓] Scene architecture defined
[✓] Lighting system defined
[✓] Material direction defined
[✓] Shader strategy defined
[✓] Particle strategy defined
[✓] DOM/WebGL separation defined
[✓] Shared state defined
[✓] Scene transitions defined
[✓] Media motion defined
[✓] Mobile 3D strategy defined
[✓] Reduced motion defined
[✓] Fallback strategy defined
[✓] Lifecycle defined
[✓] Debug system defined
[✓] Failure isolation defined
[✓] Motion QA defined
[✓] 3D QA defined
[✓] Implementation order defined
```

---

# 165 — RELATION WITH PHASE 5

```text
PHASE 5
VISUAL DIRECTION
        ↓
Color
Typography
Composition
Identity
Cat
Mystery
Romance
18
BAC
        ↓
PHASE 6
MOTION / 3D
        ↓
Movement
Camera
Transitions
3D
Shaders
Particles
Interaction
```

La Phase 6 ne remplace donc pas le Design System.

Elle l'anime.

---

# 166 — RELATION WITH PHASE 7

La prochaine phase devra transformer ce blueprint d'expérience en une **architecture technique complète prête pour le développement**.

Elle devra notamment déterminer :

```text
APPLICATION ARCHITECTURE
↓
STACK
↓
ROUTING
↓
STATE MANAGEMENT
↓
DATA MODEL
↓
MEDIA STORAGE
↓
ADMIN / CONTRIBUTION SYSTEM
↓
AUTHENTICATION
↓
DATABASE
↓
API
↓
ASSET PIPELINE
↓
3D PIPELINE
↓
DEPLOYMENT
↓
SECURITY
↓
TESTING
↓
CI/CD
↓
PROJECT STRUCTURE
↓
IMPLEMENTATION ROADMAP
```

---

# 167 — NEXT PHASE

La phase suivante est :

> **PHASE 7 — TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT**

Elle constituera le dernier livrable de conception avant le passage à la génération réelle du projet.

Son rôle sera de transformer les six premières phases en un document que l'IA chargée du développement pourra utiliser comme **source de vérité technique**.

---

# 168 — DOCUMENT STATUS

**Phase :** 6 / 7  
**Nom :** 3D / Motion / Immersive Engineering  
**Statut :** **TERMINÉE**

**Fichier cible :**

```text
Docs/06_JENNY_3D_MOTION_IMMERSIVE_ENGINEERING.md
```

---

# 169 — PROJECT PIPELINE

```text
PHASE 1
Reverse Engineering du site Stella
        ↓
PHASE 2
Jenny Experience Map & Identity
        ↓
PHASE 3
Experience Architecture
        ↓
PHASE 4
UX/UI Flow & Interaction Specification
        ↓
PHASE 5
Jenny Visual Direction & Design System
        ↓
PHASE 6
3D / Motion / Immersive Engineering
        ↓
PHASE 7
Technical Architecture & Implementation Blueprint
        ↓
IMPLEMENTATION
```

**PHASE 6 est officiellement clôturée.**