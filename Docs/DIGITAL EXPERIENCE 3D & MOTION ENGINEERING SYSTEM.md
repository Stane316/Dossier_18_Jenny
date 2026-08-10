# DIGITAL EXPERIENCE 3D & MOTION ENGINEERING SYSTEM

**Source 03 — 3D & Motion Engineering**

**Version : 1.0**

---

# 00 — PURPOSE

Cette source définit les principes d'ingénierie permettant de construire des expériences numériques utilisant :

- animation avancée ;
- motion design ;
- transitions ;
- scroll-driven animation ;
- WebGL ;
- Three.js ;
- React Three Fiber ;
- shaders ;
- particules ;
- effets visuels ;
- interactions spatiales ;
- scènes 3D ;
- caméra ;
- objets dynamiques ;
- expériences immersives ;
- transitions entre scènes et pages.

Elle constitue la référence technique pour transformer les intentions définies dans :

- **Digital Experience System** ;
- **Source 01 — Design System** ;
- **Source 02 — UX & Quality** ;

en systèmes visuels et interactifs techniquement maîtrisés.

Elle ne définit pas l'identité d'un projet.

Elle ne définit pas le contenu d'un portfolio.

Elle ne définit pas la direction artistique propre à TRIONN.

Elle définit **comment concevoir et implémenter une couche d'expérience avancée** pouvant être réutilisée dans différents projets.

---

# 01 — CORE PHILOSOPHY

## 01.1 — Motion is architecture

Le mouvement ne doit pas être ajouté après la construction de l'interface.

Il doit être pensé comme une partie de l'architecture de l'expérience.

Une expérience avancée doit définir :

```text
STATE
↓
TRIGGER
↓
TRANSITION
↓
NEW STATE
```

---

## 01.2 — Technology serves experience

Three.js, WebGL, GSAP ou toute autre technologie ne constitue jamais l'objectif final.

La séquence correcte est :

```text
INTENTION
↓
EXPERIENCE
↓
MOTION CONCEPT
↓
TECHNICAL APPROACH
↓
IMPLEMENTATION
```

et non :

```text
TECHNOLOGY
↓
EFFECT
↓
SEARCH FOR A USE
```

---

## 01.3 — Use the simplest technology that achieves the effect

Une scène ne doit pas être construite en WebGL si :

- CSS suffit ;
- SVG suffit ;
- une animation DOM suffit ;
- une vidéo suffit ;
- une transition native suffit.

WebGL doit être utilisé lorsque ses capacités produisent une valeur réelle.

---

# 02 — MOTION HIERARCHY

Les animations doivent être organisées selon plusieurs niveaux.

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

Chaque niveau possède son propre rôle.

---

# 03 — MOTION CATEGORIES

Toute animation doit être classée.

## Entrance

Apparition d'un élément.

## Exit

Disparition.

## Reveal

Révélation progressive.

## Transform

Transformation d'un état vers un autre.

## Hover

Réponse au pointeur.

## Feedback

Confirmation d'une action.

## Scroll

Animation contrôlée par le défilement.

## Transition

Passage entre deux états ou deux pages.

## Ambient

Mouvement décoratif continu.

## Interactive

Mouvement contrôlé directement par l'utilisateur.

## Loading

Animation indiquant un état de chargement.

---

# 04 — MOTION AS A STATE MACHINE

Les animations complexes doivent être pensées comme des transitions d'états.

Exemple :

```text
IDLE
↓
HOVER
↓
ACTIVE
↓
TRANSITION
↓
EXPANDED
```

Pour une scène :

```text
SCENE A
↓
EXIT
↓
TRANSITION
↓
SCENE B
↓
ACTIVE
```

Cette approche évite de construire des animations indépendantes qui se contredisent.

---

# 05 — TIMING SYSTEM

Les durées doivent être cohérentes.

Une hiérarchie typique peut être :

```text
MICRO
→ très court

UI
→ court

COMPONENT
→ court à moyen

SECTION
→ moyen

SCENE
→ moyen à long

PAGE
→ long lorsque nécessaire
```

Les valeurs exactes doivent être définies selon le projet.

Ne pas appliquer une durée identique à toutes les animations.

---

# 06 — EASING SYSTEM

L'easing définit la sensation du mouvement.

Catégories :

```text
Linear
Ease In
Ease Out
Ease In Out
Smooth
Sharp
Elastic
Spring
Custom
```

Le choix doit dépendre de l'intention.

### Ease-out

Adapté à une apparition ou une réponse rapide.

### Ease-in

Adapté à une sortie ou une accélération.

### Ease-in-out

Adapté à des transitions équilibrées.

### Spring

Adapté à des interactions physiques ou expressives.

### Custom curves

Utiles lorsque la direction artistique exige une signature spécifique.

---

# 07 — MOTION PHYSICS

Lorsque cela améliore l'expérience, les mouvements peuvent simuler :

- inertie ;
- friction ;
- masse ;
- ressort ;
- momentum ;
- accélération ;
- décélération.

La physique doit rester contrôlée.

Une simulation réaliste n'est pas toujours une bonne expérience.

---

# 08 — STAGGER SYSTEM

Le stagger permet de coordonner plusieurs éléments.

Exemple :

```text
Element 1
    ↓
Element 2
    ↓
Element 3
    ↓
Element 4
```

Il peut être appliqué à :

- navigation ;
- titres ;
- paragraphes ;
- cartes ;
- listes ;
- éléments 3D.

Le stagger doit renforcer la hiérarchie.

Il ne doit pas ralentir inutilement l'accès au contenu.

---

# 09 — TEXT ANIMATION

Le texte peut être animé par :

- bloc ;
- ligne ;
- mot ;
- caractère.

Utiliser le niveau de granularité approprié.

### Block

Le plus robuste.

### Line

Très utile pour les titres éditoriaux.

### Word

Plus expressif.

### Character

À réserver aux expériences où l'effet est réellement pertinent.

Le texte doit rester accessible et sémantiquement exploitable.

---

# 10 — REVEAL SYSTEM

Les reveals peuvent utiliser :

- opacity ;
- transform ;
- clip-path ;
- mask ;
- scale ;
- blur ;
- position ;
- combinaison de plusieurs propriétés.

Le reveal doit créer une continuité.

Éviter les apparitions aléatoires sans logique.

---

# 11 — SCROLL-DRIVEN MOTION

Le scroll peut contrôler :

- position ;
- rotation ;
- scale ;
- opacity ;
- camera ;
- shader parameters ;
- scene transitions ;
- text reveal ;
- progress.

Architecture conceptuelle :

```text
SCROLL POSITION
↓
NORMALIZED PROGRESS
↓
TIMELINE / STATE
↓
VISUAL OUTPUT
```

---

# 12 — SCROLL NORMALIZATION

Éviter de coupler directement la logique visuelle à des valeurs arbitraires de scroll.

Préférer une valeur normalisée :

```text
0 → beginning
1 → end
```

Puis mapper cette progression sur :

- timeline ;
- caméra ;
- objet ;
- contenu ;
- transition.

Cela rend les expériences plus contrôlables.

---

# 13 — SCROLL STORYTELLING

Une expérience scroll-driven peut être divisée en scènes :

```text
SCENE 01
↓
SCENE 02
↓
SCENE 03
↓
SCENE 04
```

Chaque scène doit avoir :

- entrée ;
- état actif ;
- sortie ;
- contenu ;
- animation.

---

# 14 — SCROLL PINNING

Le pinning peut maintenir un élément ou une scène dans le viewport pendant que le scroll contrôle son évolution.

Utiliser cette technique pour :

- storytelling ;
- comparaison ;
- animation 3D ;
- transitions complexes.

Éviter de transformer toute la page en séquence verrouillée.

---

# 15 — SCROLL PROGRESS

Lorsque le scroll pilote une expérience importante, une indication de progression peut être pertinente.

Elle peut être :

- barre ;
- compteur ;
- indicateur ;
- changement de scène ;
- progression narrative.

---

# 16 — PAGE TRANSITIONS

Les transitions entre pages doivent créer une continuité.

Modèle :

```text
CURRENT PAGE
↓
EXIT
↓
TRANSITION LAYER
↓
NEW PAGE
↓
ENTER
```

Les transitions peuvent utiliser :

- fade ;
- slide ;
- scale ;
- mask ;
- clip-path ;
- WebGL ;
- shared elements ;
- camera transition.

---

# 17 — SHARED ELEMENT TRANSITIONS

Lorsqu'un même objet apparaît sur deux états différents, son mouvement peut connecter les deux.

Exemple :

```text
CARD IMAGE
↓
EXPANSION
↓
CASE STUDY IMAGE
```

Cette continuité spatiale peut renforcer fortement la perception de qualité.

---

# 18 — ROUTER & MOTION COORDINATION

Les transitions de navigation doivent être coordonnées avec le système de routing.

Prévoir :

- sortie de page ;
- changement de route ;
- préparation du contenu ;
- entrée de page ;
- restauration du scroll lorsque nécessaire.

Éviter les transitions qui affichent une page intermédiaire vide.

---

# 19 — GSAP / MOTION ENGINE

Une bibliothèque de motion peut servir à orchestrer :

- timelines ;
- séquences ;
- scroll triggers ;
- easing ;
- interpolation ;
- synchronisation.

L'outil exact peut évoluer.

Le principe reste :

> **une seule logique d'orchestration cohérente par système d'expérience.**

Éviter de multiplier plusieurs moteurs d'animation concurrents sans nécessité.

---

# 20 — TIMELINE ARCHITECTURE

Une timeline complexe doit être structurée.

Exemple conceptuel :

```text
MASTER TIMELINE
│
├── INTRO
├── HERO
├── CONTENT REVEAL
├── SCENE TRANSITION
├── INTERACTION
└── EXIT
```

Chaque sous-timeline doit avoir une responsabilité claire.

---

# 21 — ANIMATION CONTEXT

Une animation doit connaître son contexte :

```text
viewport
device
input
page state
scene state
scroll progress
reduced motion
```

Cela permet d'éviter des comportements inadaptés.

---

# 22 — INTERRUPTIBLE MOTION

Les animations doivent être interrompables lorsqu'un utilisateur poursuit son action.

Éviter :

```text
User action
↓
Animation begins
↓
User cannot act
↓
Animation ends
```

lorsque cette attente n'est pas nécessaire.

Préférer :

```text
User action
↓
Animation begins
↓
New action
↓
Animation adapts
```

lorsque techniquement pertinent.

---

# 23 — INPUT-DRIVEN MOTION

Les interactions peuvent utiliser :

- pointer position ;
- pointer velocity ;
- scroll velocity ;
- touch position ;
- device orientation lorsque pertinent ;
- keyboard input.

Exemple :

```text
POINTER
↓
NORMALIZED COORDINATES
↓
INTERPOLATION
↓
OBJECT RESPONSE
```

---

# 24 — LERP & SMOOTHING

Pour des interactions fluides, utiliser des techniques d'interpolation lorsque nécessaire.

Conceptuellement :

```text
current
→
target
→
interpolated value
```

Cela peut être utilisé pour :

- caméra ;
- curseur ;
- objet ;
- lumière ;
- rotation ;
- parallax.

Le smoothing doit rester suffisamment réactif.

Un système trop lissé donne une impression de retard.

---

# 25 — MAGNETIC INTERACTIONS

Les interactions magnétiques peuvent être utilisées pour :

- CTA ;
- boutons ;
- curseur ;
- éléments interactifs.

Principe :

```text
pointer
↓
distance
↓
influence
↓
element displacement
```

Elles doivent être réservées aux éléments où elles améliorent réellement l'expérience.

---

# 26 — PARALLAX

Le parallax peut créer une sensation de profondeur.

Il peut être appliqué à :

- images ;
- couches ;
- texte ;
- objets 3D ;
- arrière-plans.

Éviter les valeurs extrêmes qui donnent une impression artificielle ou fatigante.

---

# 27 — WEBGL ROLE

WebGL permet de créer des expériences qui seraient difficiles ou impossibles avec le DOM seul.

Cas d'usage :

- scènes 3D ;
- particules ;
- shaders ;
- distorsion ;
- post-processing ;
- visualisations ;
- interactions spatiales ;
- transitions avancées.

---

# 28 — THREE.JS ROLE

Three.js doit être considéré comme une couche de rendu 3D.

Ses responsabilités peuvent inclure :

- scène ;
- caméra ;
- renderer ;
- géométrie ;
- matériaux ;
- textures ;
- lumière ;
- animation ;
- interaction ;
- post-processing.

L'architecture exacte dépend du projet.

---

# 29 — REACT THREE FIBER

Dans une application React, React Three Fiber peut être utilisé pour intégrer Three.js dans le modèle React.

Principes :

- séparer UI DOM et scène 3D lorsque nécessaire ;
- éviter de faire dépendre toute l'application du rendu 3D ;
- contrôler les états ;
- organiser les composants 3D ;
- maintenir une séparation claire des responsabilités.

---

# 30 — SCENE ARCHITECTURE

Une scène 3D doit être organisée.

Exemple :

```text
Experience3D
│
├── Scene
│   ├── Environment
│   ├── Camera
│   ├── Lights
│   ├── MainObject
│   ├── SecondaryObjects
│   └── Effects
│
└── Controllers
    ├── CameraController
    ├── InteractionController
    ├── ScrollController
    └── AnimationController
```

Cette structure peut être adaptée au projet.

---

# 31 — SCENE GRAPH

Le scene graph doit représenter les relations spatiales.

Exemple :

```text
ROOT
├── Environment
├── Hero
│   ├── Object
│   ├── Label
│   └── Light
└── Background
```

Éviter une hiérarchie arbitrairement profonde.

---

# 32 — CAMERA SYSTEM

La caméra est un outil narratif.

Elle peut :

- observer ;
- suivre ;
- révéler ;
- se rapprocher ;
- s'éloigner ;
- orbiter ;
- changer de perspective.

Types fréquents :

```text
Perspective Camera
Orthographic Camera
```

Le choix dépend de l'expérience.

---

# 33 — CAMERA MOTION

La caméra peut être contrôlée par :

- scroll ;
- pointer ;
- timeline ;
- user input ;
- scene state.

Les mouvements doivent rester cohérents avec le contenu.

Une caméra trop agressive peut provoquer :

- désorientation ;
- fatigue ;
- perte de repère.

---

# 34 — OBJECT MOTION

Les objets peuvent être animés par :

- position ;
- rotation ;
- scale ;
- morph ;
- shader;
- vertex deformation.

L'animation doit être coordonnée avec la scène.

---

# 35 — 3D DEPTH

La profondeur peut être construite avec :

- perspective ;
- distance ;
- scale ;
- lumière ;
- occlusion ;
- fog ;
- camera movement ;
- parallax.

Ne pas dépendre d'un seul effet.

---

# 36 — LIGHTING SYSTEM

L'éclairage peut définir fortement la perception d'une scène.

Types possibles :

- ambient ;
- directional ;
- point ;
- spot ;
- environment lighting.

L'éclairage doit soutenir :

- hiérarchie ;
- profondeur ;
- matériau ;
- ambiance ;
- lisibilité.

---

# 37 — MATERIAL SYSTEM

Les matériaux peuvent être utilisés pour différencier :

- objet principal ;
- arrière-plan ;
- éléments secondaires ;
- surfaces interactives.

Le choix du matériau doit être cohérent avec l'identité visuelle.

---

# 38 — TEXTURES

Les textures peuvent provenir de :

- images ;
- gradients ;
- procédural ;
- canvas ;
- vidéo ;
- générateurs shader.

La stratégie doit tenir compte du contexte technique.

---

# 39 — SHADER SYSTEM

Les shaders permettent de contrôler directement le rendu graphique.

Ils peuvent servir à :

- distorsion ;
- gradient dynamique ;
- noise ;
- displacement ;
- waves ;
- transitions ;
- particules ;
- effets de lumière.

Un shader doit être utilisé lorsque son niveau de contrôle est réellement nécessaire.

---

# 40 — SHADER PRINCIPLES

Un shader complexe doit être :

- isolé ;
- documenté ;
- paramétrable ;
- testable ;
- désactivable lorsque possible.

Les paramètres importants doivent être exposés clairement.

Exemple :

```text
uProgress
uTime
uIntensity
uNoiseScale
uColor
```

---

# 41 — PROCEDURAL EFFECTS

Les effets procéduraux peuvent produire :

- bruit ;
- mouvement ;
- textures ;
- déformations ;
- particules ;
- transitions.

Ils doivent rester contrôlables.

Éviter les effets entièrement déterministes mais impossibles à ajuster.

---

# 42 — PARTICLE SYSTEMS

Les particules peuvent être utilisées pour :

- atmosphère ;
- profondeur ;
- transition ;
- représentation de données ;
- environnement.

Une particle system doit définir :

- nombre ;
- position ;
- vitesse ;
- taille ;
- durée de vie ;
- comportement ;
- interaction.

---

# 43 — GPU-DRIVEN THINKING

Lorsque le nombre d'éléments devient important, réfléchir à l'endroit où les calculs sont effectués.

Le GPU peut être utilisé pour :

- rendu parallèle ;
- shaders ;
- particules ;
- transformations visuelles.

Ne pas transférer inutilement une grande quantité de travail au CPU.

Les optimisations détaillées appartiennent à la Source 04.

---

# 44 — DOM + WEBGL HYBRID

Une expérience avancée peut combiner :

```text
DOM
+
CSS
+
SVG
+
CANVAS
+
WEBGL
```

Il n'est pas nécessaire que toute l'interface soit rendue dans WebGL.

Architecture souvent préférable :

```text
WEBGL
→ visual / immersive layer

DOM
→ semantic content / UI / accessibility
```

---

# 45 — DOM / WEBGL SYNCHRONIZATION

Lorsque DOM et WebGL doivent être synchronisés, définir une source d'état commune.

Exemple :

```text
Shared Experience State
        ↓
 ┌──────┴──────┐
 ↓             ↓
DOM           WebGL
```

Éviter de créer deux systèmes de vérité indépendants.

---

# 46 — 3D UI BOUNDARIES

Les interfaces fonctionnelles doivent généralement rester dans le DOM lorsque cela est possible.

La 3D peut enrichir :

- arrière-plan ;
- visualisation ;
- contenu ;
- transitions.

Mais les actions essentielles doivent rester accessibles.

---

# 47 — 3D INTERACTION

Une interaction 3D peut utiliser :

- raycasting ;
- pointer events ;
- collision logic ;
- proximity ;
- object selection.

Le système doit clairement distinguer :

```text
visual object
vs
interactive object
```

---

# 48 — RAYCASTING

Le raycasting peut déterminer quel objet 3D est ciblé.

Architecture :

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

Limiter le nombre d'objets testés lorsque cela est nécessaire.

---

# 49 — 3D INTERACTION STATES

Un objet interactif peut avoir :

```text
IDLE
HOVERED
FOCUSED
ACTIVE
SELECTED
DISABLED
```

Chaque état doit être perceptible.

---

# 50 — CURSOR SYSTEM

Une expérience avancée peut synchroniser :

- curseur DOM ;
- scène 3D ;
- objets interactifs ;
- feedback.

Exemple :

```text
Default
→ standard cursor

Interactive
→ visual feedback

Dragging
→ drag state

Loading
→ loading state
```

Le système doit toujours fournir une indication compréhensible.

---

# 51 — 3D SCROLL SYNCHRONIZATION

Une scène 3D peut être contrôlée par le scroll.

Architecture :

```text
Scroll
↓
Progress
↓
Scene State
↓
Camera
+
Objects
+
Materials
+
DOM
```

Tous les éléments doivent être synchronisés via une logique centrale.

---

# 52 — SCENE TRANSITIONS

Une transition 3D peut utiliser :

- caméra ;
- objets ;
- shader ;
- opacity ;
- geometry ;
- texture ;
- post-processing.

Elle doit avoir :

- état initial ;
- progression ;
- état final.

---

# 53 — POST-PROCESSING

Les effets de post-processing peuvent produire :

- bloom ;
- blur ;
- vignette ;
- distortion ;
- color grading ;
- noise ;
- depth effects.

Ils doivent être utilisés avec modération.

Le post-processing ne doit pas devenir une couche permanente d'effets sans justification.

---

# 54 — Z-INDEX & LAYER ARCHITECTURE

Les expériences hybrides doivent définir clairement les couches :

```text
Background
↓
3D Scene
↓
Atmosphere
↓
Content
↓
Navigation
↓
Interaction Overlay
↓
Modal
```

Les couches doivent être documentées.

Éviter les z-index arbitraires dispersés.

---

# 55 — FULLSCREEN EXPERIENCE

Une expérience plein écran peut être pertinente pour :

- hero ;
- storytelling ;
- visualisation ;
- événement ;
- expérience artistique.

Elle doit prévoir une sortie ou une navigation compréhensible.

---

# 56 — INTRO / LOADER EXPERIENCE

Une introduction peut :

- préparer les assets ;
- établir l'ambiance ;
- présenter le système visuel ;
- créer un moment narratif.

Elle ne doit pas retarder inutilement l'accès au contenu.

Un loader esthétique ne doit pas masquer un problème de chargement.

---

# 57 — PROGRESSIVE INITIALIZATION

Une expérience 3D peut être initialisée progressivement.

Conceptuellement :

```text
CRITICAL UI
↓
CORE EXPERIENCE
↓
PRIMARY VISUAL
↓
SECONDARY ASSETS
↓
ATMOSPHERIC EFFECTS
```

Les éléments essentiels doivent être prioritaires.

---

# 58 — FALLBACK STRATEGY

Toute expérience avancée doit disposer d'une stratégie de fallback.

Exemples :

```text
WebGL available
→ full experience

WebGL limited
→ simplified experience

WebGL unavailable
→ static / DOM experience
```

Le contenu essentiel doit rester accessible.

---

# 59 — DEVICE ADAPTATION

L'expérience peut adapter :

- nombre d'objets ;
- qualité des textures ;
- post-processing ;
- particules ;
- résolution ;
- animations ;
- complexité des shaders.

Cette adaptation doit préserver l'identité générale de l'expérience.

---

# 60 — MOBILE 3D STRATEGY

La version mobile peut :

- réduire la géométrie ;
- simplifier les matériaux ;
- réduire les particules ;
- supprimer certains effets ;
- simplifier la caméra ;
- modifier les interactions.

Il ne faut pas simplement réduire la taille de la version desktop.

---

# 61 — REDUCED MOTION 3D

Lorsque `prefers-reduced-motion` est actif :

- réduire les mouvements de caméra ;
- supprimer les rotations continues ;
- réduire le parallax ;
- simplifier les transitions ;
- arrêter les animations décoratives lorsque nécessaire.

La scène doit conserver son information principale.

---

# 62 — MOTION ACCESSIBILITY

Les animations ne doivent pas :

- clignoter excessivement ;
- provoquer une confusion visuelle ;
- empêcher l'accès au contenu ;
- masquer les contrôles ;
- créer une dépendance à la perception du mouvement.

---

# 63 — TIME CONTROL

Une animation narrative doit éviter d'empêcher l'utilisateur de progresser lorsqu'il souhaite aller plus vite.

Lorsque pertinent :

- skip ;
- pause ;
- navigation directe ;
- scroll control ;
- interaction manuelle.

---

# 64 — STATE SYNCHRONIZATION

Les systèmes complexes doivent avoir une source d'état clairement définie.

Exemple :

```text
Experience State
│
├── currentScene
├── progress
├── interactionState
├── deviceMode
├── reducedMotion
└── loadingState
```

Puis :

```text
Experience State
↓
DOM
+
Motion
+
WebGL
```

---

# 65 — EVENT ARCHITECTURE

Les événements doivent être organisés.

Éviter de multiplier :

- listeners ;
- callbacks ;
- timers ;
- animation loops ;

sans architecture claire.

Les interactions doivent pouvoir être nettoyées lors du démontage d'un composant.

---

# 66 — LIFECYCLE

Toute expérience animée ou 3D doit gérer correctement :

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

Le nettoyage est essentiel pour éviter :

- listeners persistants ;
- animation loops ;
- ressources GPU ;
- références mémoire ;
- états fantômes.

---

# 67 — RESOURCES

Les ressources 3D peuvent inclure :

- géométries ;
- textures ;
- matériaux ;
- modèles ;
- framebuffers ;
- render targets.

Elles doivent être gérées explicitement lorsque nécessaire.

---

# 68 — MODEL LOADING

Les modèles 3D doivent être chargés avec une stratégie adaptée.

Prévoir :

- loading state ;
- fallback ;
- validation ;
- erreurs ;
- progressive loading lorsque pertinent.

---

# 69 — ASSET PIPELINE

Les assets doivent être considérés comme faisant partie de l'ingénierie.

Prévoir :

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

Les formats et niveaux de compression doivent être adaptés au contexte.

---

# 70 — ANIMATION LOOP

Une boucle d'animation doit être utilisée uniquement lorsqu'elle est nécessaire.

Conceptuellement :

```text
FRAME
↓
UPDATE
↓
RENDER
```

Éviter les boucles permanentes lorsque la scène est statique.

---

# 71 — FRAME-BASED THINKING

Les animations doivent être conçues avec une compréhension du rendu par frame.

Un mouvement doit rester stable lorsque :

- frame rate varie ;
- appareil change ;
- utilisateur change la vitesse de scroll.

Éviter les animations dépendantes uniquement du nombre de frames.

---

# 72 — TIME-BASED ANIMATION

Lorsque pertinent, utiliser le temps réel comme base :

```text
delta time
```

plutôt qu'un nombre arbitraire de frames.

Cela permet une animation plus cohérente entre appareils.

---

# 73 — RAF & UPDATE STRATEGY

Les mises à jour doivent être centralisées autant que possible.

Éviter de créer plusieurs boucles de rendu concurrentes pour une même expérience.

---

# 74 — ANIMATION OWNERSHIP

Chaque animation doit avoir un propriétaire identifiable.

Exemple :

```text
Hero
→ Hero animation controller

Camera
→ Camera controller

Navigation
→ Navigation motion system

Scene
→ Scene timeline
```

Cela facilite :

- maintenance ;
- debugging ;
- suppression ;
- évolution.

---

# 75 — CONFLICT PREVENTION

Deux systèmes ne doivent pas essayer de contrôler simultanément la même propriété sans coordination.

Exemple problématique :

```text
Scroll → camera.position
+
Mouse → camera.position
+
Timeline → camera.position
```

Préférer :

```text
Inputs
↓
Unified camera state
↓
Camera output
```

---

# 76 — PARAMETERIZATION

Les valeurs importantes doivent être centralisées.

Exemples :

```text
cameraSpeed
transitionDuration
particleDensity
distortionIntensity
scrollMultiplier
hoverStrength
```

Éviter les nombres magiques dispersés.

---

# 77 — DEBUG MODE

Les expériences complexes doivent pouvoir disposer d'un mode debug.

Il peut afficher :

- FPS ;
- scene state ;
- camera;
- current progress ;
- active scene ;
- pointer coordinates ;
- selected object ;
- loading state.

Le mode debug ne doit pas être présent dans la production finale.

---

# 78 — MOTION DEBUGGING

Lorsqu'une animation ne fonctionne pas :

1. identifier l'état initial ;
2. identifier le trigger ;
3. vérifier la timeline ;
4. vérifier l'easing ;
5. vérifier les conflits ;
6. vérifier le lifecycle ;
7. vérifier le rendu.

Ne pas corriger les animations uniquement par ajout successif de délais.

---

# 79 — 3D DEBUGGING

Pour une scène 3D :

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

Tester couche par couche.

---

# 80 — FAILURE ISOLATION

Une expérience avancée doit éviter qu'un problème 3D fasse disparaître toute l'interface.

Architecture recommandée :

```text
CORE UI
+
OPTIONAL EXPERIENCE LAYER
```

La couche avancée doit pouvoir échouer sans détruire le contenu essentiel.

---

# 81 — ARCHITECTURAL SEPARATION

Séparer lorsque pertinent :

```text
UI
Motion
Experience State
WebGL
Assets
Interaction
Routing
```

Cette séparation facilite l'évolution du projet.

---

# 82 — REUSABLE EXPERIENCE PRIMITIVES

Construire des primitives réutilisables lorsque plusieurs projets ont besoin des mêmes comportements.

Exemples :

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
```

Une primitive doit être suffisamment générique pour être réutilisée.

---

# 83 — EXPERIENCE COMPOSITION

Les primitives peuvent ensuite être combinées :

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

Cela permet d'éviter de reconstruire chaque expérience depuis zéro.

---

# 84 — DESIGN ↔ MOTION HANDOFF

Avant l'implémentation, le design doit fournir :

- éléments animés ;
- déclencheurs ;
- états ;
- priorité ;
- direction du mouvement ;
- timing approximatif ;
- relation avec le contenu.

L'ingénieur transforme ensuite cela en système technique.

---

# 85 — UX ↔ MOTION HANDOFF

La motion doit respecter :

- parcours utilisateur ;
- hiérarchie ;
- accessibilité ;
- feedback ;
- contrôle utilisateur.

Les animations critiques doivent être identifiées comme telles.

---

# 86 — 3D ↔ CONTENT HANDOFF

Une scène 3D doit connaître :

- ce qu'elle représente ;
- quel contenu elle accompagne ;
- quelle information elle transmet ;
- quel comportement elle attend.

Ne pas créer une scène 3D complètement indépendante du contenu.

---

# 87 — EXPERIENCE STATES

Une expérience complexe peut être modélisée comme :

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

Tous les projets n'utilisent pas nécessairement tous ces états.

---

# 88 — TRANSITION OWNERSHIP

Une transition doit avoir une source de vérité.

Par exemple :

```text
Router
→ tells system that page changed

Transition Controller
→ controls visual transition

Page
→ renders new content
```

Éviter que plusieurs composants déclenchent indépendamment la même transition.

---

# 89 — VISUAL CONTINUITY

Une transition réussie doit préserver au moins une continuité :

- spatiale ;
- chromatique ;
- temporelle ;
- narrative ;
- objet ;
- mouvement.

La continuité donne l'impression que les pages appartiennent au même système.

---

# 90 — CINEMATIC THINKING

Pour les expériences immersives, penser en termes de :

- plan ;
- scène ;
- sujet ;
- caméra ;
- rythme ;
- transition ;
- focalisation.

Mais ne pas transformer systématiquement une interface en film.

L'utilisateur doit conserver son rôle actif.

---

# 91 — INTERACTIVE STORYTELLING

Une expérience peut raconter une histoire via :

```text
USER ACTION
↓
WORLD RESPONSE
↓
NEW INFORMATION
↓
USER DECISION
```

Le storytelling devient alors interactif plutôt que simplement linéaire.

---

# 92 — AMBIENT MOTION

Les mouvements atmosphériques peuvent inclure :

- particules ;
- lumière ;
- bruit ;
- flottement ;
- gradients ;
- respiration d'éléments.

Ils doivent rester suffisamment subtils pour ne pas concurrencer le contenu.

---

# 93 — MOTION CONTRAST

Le contraste de mouvement peut être utilisé comme le contraste typographique.

Exemple :

```text
STATIC CONTENT
+
MOVING OBJECT
```

ou :

```text
CALM SECTION
↓
HIGH-MOTION SECTION
```

Le changement attire naturellement l'attention.

---

# 94 — MOTION RESTRAINT

Une expérience très animée n'est pas nécessairement meilleure.

Le système doit savoir rester immobile.

Le contraste entre mouvement et immobilité peut produire une expérience plus sophistiquée que le mouvement permanent.

---

# 95 — TECHNICAL QUALITY BOUNDARY

Cette source définit les principes d'ingénierie du mouvement et de la 3D.

Les métriques détaillées de performance doivent être traitées dans :

**Source 04 — Performance & Technical Quality.**

Cela comprend notamment :

- budgets de performance ;
- Core Web Vitals ;
- optimisation avancée ;
- profiling ;
- bundle analysis ;
- compression ;
- caching ;
- réseau ;
- mémoire ;
- GPU profiling.

---

# 96 — MOTION QUALITY CHECKLIST

Avant validation :

```text
[ ] Animation has a purpose
[ ] Trigger is defined
[ ] Initial state is defined
[ ] Final state is defined
[ ] Duration is coherent
[ ] Easing is coherent
[ ] Animation can be interrupted when needed
[ ] No conflicting animation owners
[ ] Reduced-motion behavior exists
[ ] Mobile behavior is defined
[ ] Touch fallback exists
[ ] Keyboard behavior is preserved
[ ] Content remains accessible
```

---

# 97 — 3D QUALITY CHECKLIST

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

---

# 98 — MOTION ARCHITECTURE CHECKLIST

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

# 99 — IMPLEMENTATION ORDER

Pour une expérience complexe, ne pas commencer par l'effet final.

Ordre recommandé :

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

Cela permet d'éviter de construire une expérience complexe sur une base UX fragile.

---

# 100 — PROGRESSIVE ENHANCEMENT

L'expérience doit être conçue par couches :

```text
LAYER 01
Semantic content
↓
LAYER 02
Visual design
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
Advanced rendering
```

Chaque couche doit apporter une amélioration.

Si une couche est supprimée, les couches inférieures doivent rester fonctionnelles lorsque possible.

---

# 101 — GRACEFUL DEGRADATION

Lorsqu'une technologie avancée n'est pas disponible :

```text
FULL EXPERIENCE
↓
SIMPLIFIED EXPERIENCE
↓
CORE EXPERIENCE
```

L'objectif n'est pas de reproduire exactement les mêmes effets.

L'objectif est de préserver :

- contenu ;
- navigation ;
- compréhension ;
- identité ;
- action principale.

---

# 102 — THE THREE-LAYER EXPERIENCE MODEL

Pour les projets complexes, privilégier cette architecture mentale :

```text
┌─────────────────────────────┐
│        EXPERIENCE           │
│                             │
│  Narrative / Visual / 3D    │
├─────────────────────────────┤
│        INTERACTION          │
│                             │
│  Motion / Input / State     │
├─────────────────────────────┤
│        FOUNDATION           │
│                             │
│  DOM / CSS / React / Data   │
└─────────────────────────────┘
```

La couche supérieure doit dépendre des couches inférieures.

Les couches inférieures ne doivent pas devenir inutilement dépendantes des effets avancés.

---

# 103 — THE EXPERIENCE ENGINE

Lorsqu'un projet devient suffisamment complexe, considérer l'ensemble comme un petit moteur d'expérience.

Il peut contenir :

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

Ce modèle permet de transformer une collection d'animations en système cohérent.

---

# 104 — REUSABILITY ACROSS PROJECTS

Les systèmes suivants peuvent être réutilisés entre différents projets :

- motion primitives ;
- reveal system ;
- transition system ;
- scroll controller ;
- camera rig ;
- cursor system ;
- particle system ;
- shader utilities ;
- WebGL background ;
- scene management ;
- interaction primitives.

En revanche, ne pas réutiliser automatiquement :

- identité visuelle ;
- palette ;
- storytelling ;
- contenu ;
- composition spécifique ;
- direction artistique.

---

# 105 — REFERENCE ADAPTATION

Lorsqu'une expérience de référence comme TRIONN présente une technique intéressante :

```text
OBSERVE
↓
IDENTIFY PRINCIPLE
↓
UNDERSTAND MECHANISM
↓
ABSTRACT
↓
REBUILD
↓
ADAPT TO PROJECT
↓
IMPROVE
```

La technologie ou le pattern peut être repris comme inspiration technique.

La personnalité du projet doit rester indépendante.

---

# 106 — ENGINEERING PRINCIPLE

Une expérience avancée doit être :

- contrôlable ;
- composable ;
- observable ;
- interruptible ;
- adaptable ;
- réutilisable ;
- dégradable ;
- accessible.

Une animation spectaculaire mais impossible à maintenir n'est pas une bonne solution d'ingénierie.

---

# 107 — FINAL MOTION RULE

> **EVERY MOVEMENT MUST HAVE A REASON.**

Cette raison peut être :

- fonctionnelle ;
- narrative ;
- spatiale ;
- émotionnelle ;
- esthétique ;
- informative.

Mais elle doit exister.

---

# 108 — FINAL 3D RULE

> **3D SHOULD CREATE DEPTH, NOT DISTRACTION.**

La 3D doit enrichir :

- l'espace ;
- la narration ;
- l'identité ;
- l'interaction ;
- la perception.

Elle ne doit pas devenir une démonstration technologique indépendante du projet.

---

# 109 — FINAL ENGINEERING RULE

La meilleure Digital Experience avancée n'est pas celle qui utilise le plus de technologies.

C'est celle où :

```text
DESIGN
+
UX
+
MOTION
+
3D
+
TECHNOLOGY
```

semblent appartenir au même système.

Le résultat final doit donner l'impression que l'expérience **ne pouvait raisonnablement être conçue autrement**.

---

# 110 — RELATION WITH THE OTHER SOURCES

## Digital Experience System

Définit :

> la philosophie globale de l'expérience.

## Source 01 — Design System

Définit :

> les fondations visuelles.

## Source 02 — UX & Quality

Définit :

> la qualité du parcours et des interactions.

## Source 03 — 3D & Motion Engineering

Définit :

> l'ingénierie du mouvement, de la 3D et des expériences immersives.

## Source 04 — Performance & Technical Quality

Définit :

> les contraintes de performance, de stabilité et de qualité technique.

## Source 05 — TRIONN Reference

Définit :

> les patterns de référence issus de l'analyse de TRIONN.

## Source 06 — Stane Identity & Portfolio

Définit :

> l'identité personnelle et les règles spécifiques au portfolio.

## Source 07 — Project Architecture & Implementation Framework

Définit :

> comment transformer les principes précédents en architecture et implémentation concrètes.

---

# 111 — MASTER PRINCIPLE

Toute expérience 3D ou motion doit respecter cette hiérarchie :

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

La technologie est le dernier niveau de cette chaîne.

Elle ne doit jamais être le premier.

> **BUILD THE EXPERIENCE FIRST.**
>
> **THEN BUILD THE ENGINE THAT MAKES IT POSSIBLE.**