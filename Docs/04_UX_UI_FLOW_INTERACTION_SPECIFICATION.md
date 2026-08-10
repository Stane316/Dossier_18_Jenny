# PHASE 4 — UX/UI FLOW & INTERACTION SPECIFICATION

**Projet : Jenny — 18 ans & Bac**  
**Document : `Docs/04_UX_UI_FLOW_INTERACTION_SPECIFICATION.md`**  
**Version : 1.0**  
**Statut : PHASE 4 — TERMINÉE**

---

# 00 — PURPOSE

Ce document transforme l'architecture d'expérience définie dans la Phase 3 en une **spécification UX/UI et interactionnelle exploitable par l'équipe de développement**.

La Phase 3 définissait :

```text
WHAT IS THE EXPERIENCE?
```

La Phase 4 définit :

```text
HOW DOES THE USER EXPERIENCE IT?
```

Elle précise notamment :

- les parcours ;
- les écrans/scènes ;
- les états ;
- les actions utilisateur ;
- les réponses système ;
- les feedbacks ;
- les transitions ;
- les interactions ;
- les comportements responsive ;
- les comportements clavier/tactile ;
- les règles de motion ;
- les états de chargement ;
- les erreurs ;
- les fallbacks ;
- les règles d'accessibilité.

Cette approche suit l'ordre recommandé par le système 3D & Motion :

```text
EXPERIENCE INTENT
↓
UX FLOW
↓
STATIC LAYOUT
↓
INTERACTION STATES
↓
BASIC MOTION
↓
SCROLL / TRANSITIONS
↓
3D FOUNDATION
↓
3D INTERACTION
```

La 3D et les effets avancés ne doivent donc intervenir qu'après stabilisation du parcours UX.

---

# 01 — EXPERIENCE PRINCIPLE

L'expérience complète possède deux utilisateurs principaux :

```text
USER A
CONTRIBUTOR

USER B
JENNY
```

Ils ne doivent pas recevoir le même niveau de complexité.

---

## 01.1 — Contributor

Le contributeur cherche principalement à :

```text
UNDERSTAND
↓
CREATE
↓
UPLOAD
↓
SUBMIT
```

Son expérience doit être :

- rapide ;
- claire ;
- rassurante ;
- accessible ;
- sans friction inutile.

---

## 01.2 — Jenny

Jenny cherche principalement à :

```text
DISCOVER
↓
EXPLORE
↓
RECOGNIZE
↓
FEEL
↓
CELEBRATE
```

Son expérience peut donc être beaucoup plus immersive.

---

# 02 — UX GOVERNING PRINCIPLES

Toutes les décisions de cette phase suivent les principes des sources Digital Experience.

## Principle 01 — Experience before interface

L'interface est un moyen.

L'objectif est de permettre à Jenny de :

- comprendre ;
- explorer ;
- ressentir ;
- progresser ;
- découvrir.



---

## Principle 02 — Clarity is a feature

À chaque étape importante :

```text
WHAT AM I SEEING?
WHAT CAN I DO?
WHAT JUST HAPPENED?
WHAT HAPPENS NEXT?
```

doivent rester compréhensibles.



---

## Principle 03 — Complexity must be earned

Une interaction complexe n'est autorisée que lorsqu'elle apporte :

- immersion ;
- découverte ;
- narration ;
- émotion ;
- compréhension.



---

## Principle 04 — Every action gets feedback

Le modèle général :

```text
USER ACTION
↓
SYSTEM RESPONSE
↓
FEEDBACK
↓
NEW STATE
```



---

## Principle 05 — Immersion does not remove orientation

Même dans une expérience cinématique, Jenny doit pouvoir comprendre :

- où elle est ;
- ce qu'elle vient de découvrir ;
- ce qu'elle peut faire ;
- comment continuer ;
- comment revenir.



---

# 03 — MASTER USER FLOWS

## 03.1 — Contributor Flow

```text
LANDING
↓
UNDERSTAND
↓
START CONTRIBUTION
↓
IDENTIFY
↓
CHOOSE CONTENT
↓
ADD MESSAGE / PHOTO / VIDEO
↓
VALIDATE
↓
PREVIEW
↓
SUBMIT
↓
SUCCESS
```

---

## 03.2 — Jenny Flow

```text
ARRIVAL
↓
INVITATION
↓
RECOGNITION
↓
DISCOVERY
↓
HER WORLD
↓
MEMORIES
↓
PEOPLE
↓
VOICES
↓
IMAGES
↓
BAC
↓
18 YEARS
↓
CELEBRATION
↓
FINALE
```

Cette séquence reprend directement l'architecture validée en Phase 3.

---

# 04 — EXPERIENCE STATE MACHINE

L'expérience Jenny sera considérée comme un système d'états.

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

Les états définis par le système 3D & Motion constituent la référence pour les expériences complexes.

---

# 05 — SCENE STATE MODEL

Chaque scène peut avoir :

```text
LOCKED
AVAILABLE
ENTERING
ACTIVE
COMPLETED
```

Une scène complétée reste accessible.

Elle ne doit pas disparaître simplement parce qu'elle a déjà été visitée.

---

# 06 — DISCOVERY STATE MODEL

Les éléments interactifs peuvent avoir :

```text
UNKNOWN
↓
HINTED
↓
INTERACTED
↓
REVEALED
↓
DISCOVERED
```

Cela permet de gérer les easter eggs et les éléments cachés sans les rendre indispensables.

---

# 07 — CONTRIBUTOR EXPERIENCE

# 07.1 — Landing

### Objective

Faire comprendre immédiatement :

- que le site concerne Jenny ;
- qu'une contribution est attendue ;
- ce qui peut être envoyé ;
- ce que cela deviendra.

### UI

```text
Identity
↓
Short explanation
↓
Primary CTA
↓
Optional supporting information
```

### Primary CTA

Conceptuellement :

```text
Leave something for Jenny
```

Le wording final sera défini dans la Phase 5.

### Interaction

```text
CLICK
↓
CTA feedback
↓
Transition
↓
Contribution screen
```

---

# 08 — CONTRIBUTOR INTRO

Avant le formulaire, le système doit expliquer la logique.

Exemple conceptuel :

```text
You can leave Jenny:

a message
a photo
a video

You can combine them.
```

### Règle

Aucun contenu n'est obligatoire individuellement.

Mais :

```text
MESSAGE
OR
PHOTO
OR
VIDEO
```

doit être fourni.

---

# 09 — CONTRIBUTOR IDENTITY

Le contributeur fournit au minimum son identité nécessaire à l'affichage.

Structure :

```text
YOUR NAME
↓
CONTINUE
```

### États

```text
DEFAULT
FOCUS
VALID
ERROR
```

### Error

Si le champ est requis et vide :

```text
Field required
```

Le message doit apparaître au niveau du champ.

---

# 10 — CONTENT TYPE SELECTION

Le contributeur choisit ce qu'il veut laisser.

Interface conceptuelle :

```text
┌─────────────┐
│ MESSAGE     │
└─────────────┘

┌─────────────┐
│ PHOTO       │
└─────────────┘

┌─────────────┐
│ VIDEO       │
└─────────────┘
```

Les trois peuvent être sélectionnés.

---

# 11 — CONTENT SELECTION STATES

Chaque type possède :

```text
AVAILABLE
↓
SELECTED
↓
ACTIVE
↓
COMPLETED
```

Le feedback de sélection doit être immédiatement visible.

---

# 12 — MESSAGE FLOW

Si le contributeur sélectionne Message :

```text
SELECT MESSAGE
↓
MESSAGE FIELD
↓
WRITE
↓
VALIDATE
↓
READY
```

Le message reste facultatif globalement.

Il devient nécessaire uniquement si l'utilisateur choisit de contribuer par ce canal.

---

# 13 — PHOTO FLOW

```text
SELECT PHOTO
↓
FILE PICKER
↓
VALIDATING
↓
UPLOADING
↓
PREVIEW
↓
READY
```

### États

```text
IDLE
SELECTED
VALIDATING
UPLOADING
PROCESSING
READY
ERROR
```

---

# 14 — VIDEO FLOW

Le même modèle est utilisé :

```text
SELECT VIDEO
↓
FILE PICKER
↓
VALIDATING
↓
UPLOADING
↓
PROCESSING
↓
PREVIEW
↓
READY
```

Mais la vidéo nécessite une UX de progression plus explicite.

---

# 15 — VIDEO UPLOAD FEEDBACK

Pendant l'upload :

```text
Uploading...
[████████░░] 80%
```

Le pourcentage est indicatif.

Le système doit surtout communiquer :

```text
PROCESSING
```

et éviter l'impression que l'interface est bloquée.

---

# 16 — UPLOAD ERROR

En cas d'échec :

```text
UPLOAD FAILED
↓
WHY
↓
RETRY
```

L'utilisateur doit pouvoir réessayer sans perdre les autres informations déjà saisies.

Le système UX exige des états d'erreur récupérables lorsque cela est possible.

---

# 17 — MULTIPLE CONTENT TYPES

Le contributeur peut combiner :

```text
Message
+
Photo
+
Video
```

ou :

```text
Message
+
Video
```

ou :

```text
Photo
+
Video
```

etc.

Aucune combinaison valide ne doit être bloquée.

---

# 18 — CONTRIBUTION VALIDATION

Avant preview :

```text
IF
message OR photo OR video
THEN
continue
ELSE
show validation
```

Pseudo-logique :

```text
hasContent =
  hasMessage ||
  hasPhoto ||
  hasVideo
```

Si :

```text
hasContent === false
```

le système doit indiquer clairement :

> Ajoute au moins un message, une photo ou une vidéo.

---

# 19 — PREVIEW SCREEN

Le preview doit montrer exactement ce qui sera transmis.

Structure :

```text
CONTRIBUTOR
↓
MESSAGE
↓
PHOTOS
↓
VIDEOS
↓
EDIT
↓
SUBMIT
```

---

# 20 — PREVIEW ACTIONS

Actions disponibles :

```text
EDIT
SUBMIT
```

Le CTA Submit doit être primaire.

Edit doit être secondaire.

La hiérarchie des CTA suit le principe du Design System : une section ne doit pas présenter plusieurs actions concurrentes sans raison.

---

# 21 — SUBMISSION STATE

Lors du submit :

```text
READY
↓
SUBMITTING
↓
SUCCESS
```

ou :

```text
READY
↓
SUBMITTING
↓
ERROR
```

Le bouton doit devenir non ambigu pendant le traitement afin d'éviter les doubles soumissions.

---

# 22 — CONTRIBUTION SUCCESS

L'écran de succès doit transmettre :

```text
IT WORKED.
```

puis :

```text
JENNY WILL DISCOVER IT.
```

La confirmation doit être humaine et cohérente avec le projet.

---

# 23 — CONTRIBUTOR EXIT

Après succès :

```text
DONE
```

Le contributeur n'a pas besoin de rester dans le système.

L'expérience peut éventuellement proposer :

```text
Return to homepage
```

mais ce n'est pas l'action principale.

---

# 24 — JENNY EXPERIENCE — BOOT

Le chargement doit être progressif.

Ordre :

```text
CRITICAL UI
↓
CORE EXPERIENCE
↓
PRIMARY VISUAL
↓
CONTENT
↓
SECONDARY MEDIA
↓
ATMOSPHERE
↓
ADVANCED EFFECTS
```

Cette stratégie est directement définie dans le système 3D & Motion.

---

# 25 — LOADING EXPERIENCE

Le loader ne doit pas devenir une barrière.

Il doit :

- préparer ;
- établir l'ambiance ;
- informer ;
- éventuellement créer un premier moment narratif.

Mais il ne doit pas masquer un chargement excessivement long.



---

# 26 — ARRIVAL SCENE

## Objective

Créer la première impression.

## Initial state

```text
DARK
QUIET
MINIMAL
```

## Reveal

Un premier environnement apparaît.

Pas encore toutes les informations.

---

# 27 — ARRIVAL INTERACTION

L'interaction principale doit être évidente.

Conceptuellement :

```text
ENTER
```

ou une formulation narrative équivalente.

### Action

```text
TAP / CLICK
↓
INTRO
```

### Keyboard

```text
Enter
Space
```

doivent pouvoir déclencher l'action lorsque pertinente.

---

# 28 — ARRIVAL FEEDBACK

Au survol :

```text
CTA
↓
SUBTLE MOTION
```

Sur touch :

```text
TAP
↓
ACTIVE
↓
TRANSITION
```

Aucune fonction essentielle ne doit dépendre du hover.



---

# 29 — ARRIVAL MOTION

Le mouvement peut utiliser :

- ambient ;
- reveal ;
- subtle parallax ;
- slow camera movement.

Mais il doit rester suffisamment calme pour ne pas désorienter.

---

# 30 — INVITATION SCENE

Après l'action d'entrée :

```text
ARRIVAL
↓
TRANSITION
↓
INVITATION
```

L'utilisateur reçoit la première information narrative.

---

# 31 — INVITATION UX

La scène doit répondre :

> Pourquoi suis-je ici ?

Mais sans tout révéler.

Le système doit maintenir une tension narrative légère.

---

# 32 — INVITATION ACTION

Action principale :

```text
CONTINUE
```

Action secondaire éventuelle :

```text
EXPLORE
```

Mais une seule action doit être primaire.

---

# 33 — RECOGNITION SCENE

Cette scène commence la personnalisation.

Le système révèle progressivement des indices liés à Jenny :

```text
CAT
↓
RED
↓
BLACK
↓
RABBIT
↓
ROMANCE
↓
MYSTERY
```

La hiérarchie commence par :

```text
CAT
>
RABBIT
```

car les chatons occupent une place supérieure dans ses préférences.

---

# 34 — RECOGNITION INTERACTION

Certains éléments peuvent être interactifs.

Exemple :

```text
CAT
↓
HOVER / TAP
↓
REACTION
↓
SMALL REVEAL
```

Le détail peut être un micro-moment personnel.

---

# 35 — DISCOVERY SCENE

La scène transforme Jenny d'observatrice en exploratrice.

### Interaction

```text
VISIBLE OBJECT
↓
HINT
↓
TAP / CLICK
↓
REVEAL
```

Une interaction importante doit posséder un indice de découverte.



---

# 36 — DISCOVERY FEEDBACK

Lorsqu'un objet est interactif :

```text
cursor
+
movement
+
contrast
+
micro animation
```

peuvent indiquer son caractère interactif.

Sur mobile :

```text
tap
+
visual response
```

remplace le hover.

---

# 37 — HER WORLD

Cette scène présente :

```text
WHO JENNY IS
+
WHAT JENNY LOVES
```

Elle ne doit pas ressembler à une page « About ».

Elle doit rester expérientielle.

---

# 38 — HER WORLD — INFORMATION HIERARCHY

### Primary

```text
Jenny
```

### Secondary

```text
Her personality
Her passions
Her universe
```

### Supporting

```text
References
Easter eggs
Micro details
```

### Decorative

```text
Ambient elements
```

Cette hiérarchie respecte le principe de classification Primary / Secondary / Supporting / Optional / Decorative du système UX.

---

# 39 — PERSONALITY REVEAL

Les qualités de Jenny peuvent être révélées par fragments :

```text
ATTENTION
↓
FRANKNESS
↓
DIRECTNESS
↓
EMPATHY
↓
EMOTIONAL DEPTH
```

Le système ne doit pas transformer cette partie en liste froide.

---

# 40 — TASTE REVEAL

Les goûts peuvent être représentés comme des objets/indices.

```text
CAT
RABBIT
RED
BLACK
HORROR
INVESTIGATION
ROMANCE
ANIME
```

Chaque catégorie peut avoir un micro-interaction.

---

# 41 — EASTER EGG RULE

Les easter eggs doivent être :

```text
OPTIONAL
```

Ils ne doivent jamais bloquer le parcours principal.

Un utilisateur peut terminer l'expérience sans tous les trouver.

---

# 42 — MEMORIES SCENE

Cette scène introduit les contenus laissés par les proches.

Transition narrative :

```text
ABOUT JENNY
↓
PEOPLE WHO KNOW JENNY
```

---

# 43 — MEMORY ENTRY

Une mémoire peut apparaître sous forme :

```text
PERSON
↓
CONTEXT
↓
CONTENT
```

Le contenu peut être :

```text
MESSAGE
PHOTO
VIDEO
```

---

# 44 — MEMORY CARD

Structure conceptuelle :

```text
Contributor
↓
Short introduction
↓
Media / Message
↓
Explore
```

La carte doit être clairement identifiable comme interactive si elle l'est.

---

# 45 — PEOPLE SCENE

Cette scène fait passer l'expérience de :

```text
CONTENT
```

à :

```text
RELATIONSHIPS
```

L'objectif est de faire ressentir :

> « Toutes ces personnes ont participé à quelque chose pour moi. »

---

# 46 — PEOPLE NAVIGATION

Jenny peut sélectionner une personne.

```text
PERSON
↓
OPEN
↓
PERSONAL CONTENT
```

La fermeture doit être évidente :

```text
CLOSE
```

ou :

```text
BACK
```

---

# 47 — VOICES SCENE

Les vidéos deviennent un élément central.

La vidéo est considérée comme une présence humaine, pas simplement comme un média.

---

# 48 — VIDEO ENTRY

```text
PERSON
↓
VIDEO PREVIEW
↓
PLAY
```

Le bouton Play doit être immédiatement identifiable.

---

# 49 — VIDEO PLAYER

Le player doit proposer au minimum :

```text
Play / Pause
Volume
Progress
Fullscreen when appropriate
```

Le son doit rester sous contrôle de l'utilisateur.

---

# 50 — VIDEO AUTOPLAY RULE

Une vidéo ne doit pas être lancée automatiquement avec du son sans contrôle clair.

Si autoplay silencieux est utilisé pour une preview :

```text
MUTED
+
CLEAR PLAY CONTROL
```

---

# 51 — VIDEO AFTERGLOW

Après la fin d'une vidéo :

```text
VIDEO END
↓
PAUSE
↓
CONTEXT
↓
NEXT
```

La transition immédiate vers une autre vidéo doit être évitée lorsqu'une respiration améliore le rythme émotionnel.

---

# 52 — IMAGES SCENE

Les photos fonctionnent comme souvenirs visuels.

Modes possibles :

```text
Gallery
Mosaic
Memory wall
Individual reveal
```

Le mode exact sera déterminé dans la direction artistique.

---

# 53 — PHOTO INTERACTION

```text
PHOTO
↓
TAP / CLICK
↓
EXPAND
↓
VIEW
↓
CLOSE
```

Le retour doit être évident.

---

# 54 — PHOTO GALLERY NAVIGATION

Si une galerie est utilisée :

```text
NEXT
PREVIOUS
CLOSE
```

doivent être accessibles.

Sur mobile :

```text
SWIPE
```

peut compléter les contrôles explicites.

---

# 55 — MEDIA EMPTY STATE

Si aucune photo n'est disponible :

ne pas afficher une galerie vide.

Utiliser :

```text
EMPTY STATE
```

ou supprimer cette branche de l'expérience.

Le système Design exige que les composants soient capables de fonctionner avec contenu absent.

---

# 56 — BAC SCENE

Cette scène marque une rupture narrative.

Avant :

```text
HER PEOPLE
```

Après :

```text
HER ACHIEVEMENT
```

---

# 57 — BAC FLOW

```text
INTRO
↓
RECOGNITION
↓
ACHIEVEMENT
↓
CONGRATULATIONS
```

---

# 58 — BAC INTERACTION

La scène peut révéler progressivement :

```text
BAC
↓
RESULT
↓
MESSAGE
↓
COLLECTIVE CELEBRATION
```

Les données précises devront venir des informations réelles du projet.

---

# 59 — BAC MOTION

La motion doit être plus solennelle que ludique.

Catégories possibles :

```text
Reveal
Transform
Cinematic transition
```

Pas de surcharge de particules simplement pour célébrer.

---

# 60 — 18 YEARS SCENE

La scène suivante est distincte.

```text
BAC
=
ACHIEVEMENT

18
=
NEW CHAPTER
```

---

# 61 — 18 YEARS FLOW

```text
PAST
↓
PRESENT
↓
FUTURE
```

Cette scène doit donner la sensation d'un passage.

---

# 62 — 18 YEARS INTERACTION

Une révélation progressive peut être utilisée :

```text
18
↓
FULL REVEAL
↓
MESSAGE
↓
FUTURE
```

Le nombre devient un élément narratif et non simplement un titre.

---

# 63 — CELEBRATION SCENE

C'est le climax.

Tout converge :

```text
JENNY
+
PEOPLE
+
MEMORIES
+
BAC
+
18
```

---

# 64 — CELEBRATION BUILD-UP

La célébration doit monter progressivement :

```text
QUIET
↓
WARM
↓
EMOTIONAL
↓
EXPANDING
↓
CELEBRATION
```

---

# 65 — CELEBRATION INTERACTION

Une interaction finale peut déclencher :

```text
GLOBAL REVEAL
```

par exemple :

```text
TAP
↓
WORLD EXPANDS
↓
MESSAGES / NAMES / MEDIA
↓
CELEBRATION
```

La nature exacte sera définie lors de la Phase 5/6.

---

# 66 — FINALE

Après le climax :

```text
CELEBRATION
↓
BREATH
↓
FINAL MESSAGE
```

La réduction d'intensité est intentionnelle.

---

# 67 — FINAL SCENE UX

La finale doit être :

```text
SIMPLE
PERSONAL
QUIET
MEMORABLE
```

Elle ne doit pas demander une action obligatoire.

---

# 68 — GLOBAL NAVIGATION

La navigation doit être discrète mais identifiable.

Elle peut fournir :

```text
Current chapter
Progress
Access to discovered chapters
```

sans devenir un menu massif.

---

# 69 — NAVIGATION RULE

À tout moment, Jenny doit pouvoir répondre à :

```text
WHERE AM I?
```

et :

```text
HOW DO I CONTINUE?
```

La navigation doit rester cohérente d'une scène à l'autre.

---

# 70 — BACK BEHAVIOR

Si une scène est ouverte depuis une autre :

```text
OPEN
↓
DETAIL
↓
BACK
↓
PREVIOUS CONTEXT
```

Le système ne doit pas renvoyer Jenny arbitrairement au début.

---

# 71 — MODAL / OVERLAY BEHAVIOR

Lorsqu'un contenu est présenté dans un overlay :

```text
OPEN
↓
FOCUS
↓
INTERACT
↓
CLOSE
↓
RETURN TO CONTEXT
```

Le contexte précédent doit être conservé.

---

# 72 — ESCAPE BEHAVIOR

Sur desktop :

```text
Escape
```

peut fermer :

- modal ;
- galerie ;
- menu ;
- overlay.

Il ne doit pas provoquer une navigation inattendue.

---

# 73 — KEYBOARD FLOW

Les éléments interactifs critiques doivent être utilisables :

```text
Tab
Shift + Tab
Enter
Space
Escape
```

Le focus doit être visible.

L'accessibilité clavier fait partie des critères de validation des sources.

---

# 74 — TOUCH FLOW

Sur mobile :

```text
Tap
Swipe
Scroll
```

sont les interactions principales.

Les interactions desktop spécifiques doivent avoir une alternative tactile.

---

# 75 — HOVER FALLBACK

Toute interaction :

```text
hover → reveal
```

doit disposer d'une alternative :

```text
tap → reveal
```

ou :

```text
focus → reveal
```

---

# 76 — SCROLL INTERACTION

Le scroll peut piloter :

```text
Scene progress
Reveal
Parallax
Camera
Timeline
```

Architecture :

```text
SCROLL POSITION
↓
NORMALIZED PROGRESS
↓
TIMELINE / STATE
↓
VISUAL OUTPUT
```

Cette architecture est définie dans le système 3D & Motion.

---

# 77 — SCROLL RULE

Le scroll ne doit pas devenir un verrou.

Éviter :

```text
scroll
↓
system ignores user intent
```

Le scroll doit conserver une sensation de contrôle.

---

# 78 — PROGRESS INDICATOR

Un indicateur peut communiquer :

```text
Chapter 04 / 13
```

ou une représentation plus immersive.

Son objectif reste :

> orientation.

---

# 79 — MOTION STATE MODEL

Chaque animation doit être définie par :

```text
TRIGGER
↓
INITIAL STATE
↓
ANIMATION
↓
FINAL STATE
```

Cette règle est directement issue du Design System et du système 3D & Motion. 

---

# 80 — MOTION OWNERSHIP

Une propriété visuelle ne doit pas être contrôlée simultanément par plusieurs systèmes.

Exemple à éviter :

```text
Scroll
+
Mouse
+
Timeline
→
Camera.position
```

Préférer :

```text
INPUTS
↓
UNIFIED STATE
↓
CAMERA CONTROLLER
```

Le système 3D & Motion recommande explicitement une propriété claire des animations.

---

# 81 — MICROINTERACTIONS

Les microinteractions doivent communiquer :

```text
CAUSE
↓
CONSEQUENCE
↓
STATE
```

Exemples :

```text
Upload
→ progress

Submit
→ loading

Success
→ confirmation

Interactive object
→ visual response
```

---

# 82 — BUTTON STATES

Tous les boutons importants doivent prévoir :

```text
DEFAULT
HOVER
FOCUS
ACTIVE
DISABLED
LOADING
```

Selon le contexte :

```text
SUCCESS
ERROR
```

peuvent également être représentés.



---

# 83 — FORM FIELD STATES

Chaque champ :

```text
DEFAULT
FOCUS
FILLED
ERROR
DISABLED
```

Le label doit rester identifiable.

Les placeholders ne doivent pas remplacer les labels.

---

# 84 — MEDIA STATES

Chaque média doit prévoir :

```text
EMPTY
LOADING
READY
PLAYING
PAUSED
ERROR
```

Pour les vidéos :

```text
PROCESSING
```

peut également être nécessaire.

---

# 85 — LOADING STATES

Tout processus pouvant durer doit communiquer son état.

Exemples :

```text
Loading
Uploading
Processing
Submitting
Preparing experience
```

Un écran vide ne doit pas être interprété comme une erreur.

---

# 86 — ERROR STATES

Une erreur doit expliquer :

```text
WHAT HAPPENED
+
WHAT CAN I DO
```

Exemple :

```text
Video couldn't be uploaded.
Try again.
```

et non :

```text
Error 500
```

---

# 87 — RECOVERY

Le recovery doit conserver autant que possible :

- texte déjà saisi ;
- autres médias ;
- navigation ;
- progression.

Une erreur locale ne doit pas détruire l'ensemble du parcours.

---

# 88 — EMPTY STATES

Les contenus peuvent être absents.

Exemples :

```text
No photos
No videos
No messages
```

L'interface doit gérer ces situations.

Ne jamais concevoir uniquement pour un contenu parfait.

---

# 89 — AUDIO UX

L'audio doit être une couche contrôlable.

Architecture :

```text
AMBIENT AUDIO
+
MEDIA AUDIO
```

L'utilisateur doit pouvoir :

```text
ON
OFF
```

---

# 90 — AUDIO TRANSITIONS

Lorsqu'une vidéo démarre :

```text
AMBIENT
↓
DUCK / PAUSE
↓
VIDEO AUDIO
```

Puis :

```text
VIDEO END
↓
AMBIENT RESTORE
```

Cette logique devra être adaptée à l'implémentation finale.

---

# 91 — REDUCED MOTION

Si :

```text
prefers-reduced-motion: reduce
```

alors :

```text
FULL MOTION
↓
REDUCED MOTION
```

avec :

- moins de parallax ;
- moins de mouvements continus ;
- transitions simplifiées ;
- caméra stabilisée ;
- effets décoratifs réduits.

Le contenu reste identique.

---

# 92 — MOBILE EXPERIENCE

Le mobile ne doit pas être :

```text
DESKTOP / 2
```

Il doit être une expérience adaptée.

Le système UX définit le responsive comme un état de design pouvant modifier :

- layout ;
- navigation ;
- typographie ;
- interaction ;
- animation ;
- 3D ;
- contenu ;
- densité.

---

# 93 — MOBILE JENNY EXPERIENCE

Desktop :

```text
SPATIAL
CINEMATIC
IMMERSIVE
```

Mobile :

```text
INTIMATE
FOCUSED
DIRECT
```

---

# 94 — MOBILE NAVIGATION

Sur mobile :

```text
Navigation
↓
Compact
↓
Discoverable
```

Éviter une navigation couvrant constamment l'écran.

---

# 95 — MOBILE MEDIA

Les vidéos doivent être :

```text
Responsive
Fullscreen-capable
Touch-friendly
```

Les photos doivent être :

```text
Swipeable
Zoomable when appropriate
Closable
```

---

# 96 — MOBILE 3D

La 3D peut être réduite :

```text
FULL 3D
↓
SIMPLIFIED 3D
↓
DOM / STATIC
```

selon les capacités de l'appareil.

Le système 3D & Motion prévoit précisément cette stratégie de dégradation.

---

# 97 — DOM / WEBGL RELATION

Le contenu critique doit rester dans le DOM lorsque nécessaire.

Architecture :

```text
BACKGROUND
↓
3D / VISUAL
↓
ATMOSPHERE
↓
CONTENT
↓
NAVIGATION
↓
INTERACTION
↓
MODAL
```

Les couches doivent avoir des responsabilités distinctes.

---

# 98 — WEBGL FAILURE

Si WebGL échoue :

```text
WEBGL ERROR
↓
REMOVE / DISABLE 3D
↓
CORE DOM EXPERIENCE
```

Le site ne doit pas devenir inutilisable.

Le système 3D & Motion exige explicitement l'isolation des couches avancées.

---

# 99 — PERFORMANCE UX

La performance perçue est une partie de l'expérience.

Priorité :

```text
CONTENT
>
NAVIGATION
>
INTERACTION
>
MOTION
>
3D
>
ADVANCED EFFECTS
```

---

# 100 — PROGRESSIVE ENHANCEMENT

Architecture :

```text
LAYER 01
Semantic content

LAYER 02
Visual design

LAYER 03
Interaction

LAYER 04
Motion

LAYER 05
3D

LAYER 06
Advanced rendering
```

Si une couche supérieure échoue, les couches inférieures doivent rester utilisables lorsque possible.

---

# 101 — FIRST IMPRESSION TEST

Lors du premier chargement :

```text
AFTER INITIAL LOAD
```

Jenny doit comprendre suffisamment rapidement :

```text
WHERE AM I?
WHAT IS THIS?
WHAT CAN I DO?
WHY SHOULD I CONTINUE?
```

Le système UX considère la première compréhension comme un critère essentiel des expériences immersives.

---

# 102 — INTERACTION DISCOVERABILITY TEST

Pour chaque interaction critique :

```text
Can Jenny see that it is interactive?
```

Si non :

```text
add affordance
```

Les indices peuvent être :

- mouvement ;
- curseur ;
- contraste ;
- texte ;
- icône ;
- changement d'état.

---

# 103 — EMOTIONAL PACING

La densité interactionnelle ne doit pas être uniforme.

Architecture :

```text
DISCOVERY
↓
INTERACTION
↓
CONTENT
↓
BREATH
↓
EMOTION
↓
DISCOVERY
```

---

# 104 — VIDEO PACING

Les vidéos sont importantes mais ne doivent pas être empilées sans respiration.

Préférer :

```text
VIDEO
↓
REACTION
↓
MESSAGE
↓
SPACE
↓
NEXT VIDEO
```

---

# 105 — MESSAGE PACING

Les messages peuvent apparaître :

```text
ONE BY ONE
```

ou :

```text
GROUPED
```

selon le contexte.

Éviter d'afficher immédiatement des dizaines de messages à l'écran.

---

# 106 — CONTENT REVEAL

La progressive disclosure doit être appliquée aux contenus secondaires.

Architecture :

```text
MAIN MESSAGE
↓
OPTIONAL DETAIL
↓
FULL CONTENT
```

Cette logique est explicitement recommandée par le système UX.

---

# 107 — SCENE TRANSITION SYSTEM

Chaque transition doit définir :

```text
CURRENT SCENE
↓
EXIT
↓
BRIDGE
↓
ENTRY
↓
NEW SCENE
```

Elle doit préserver au moins une continuité :

- spatiale ;
- chromatique ;
- temporelle ;
- narrative ;
- objet ;
- mouvement.



---

# 108 — TRANSITION OWNERSHIP

Une seule couche doit contrôler la transition globale.

Architecture :

```text
USER ACTION
↓
NAVIGATION
↓
TRANSITION CONTROLLER
↓
EXPERIENCE STATE
↓
NEW SCENE
```

Éviter les transitions concurrentes déclenchées par plusieurs composants.

---

# 109 — SCENE INVENTORY

| ID | Scene | Primary Goal | Main Action |
|---|---|---|---|
| S01 | Arrival | Captivate | Enter |
| S02 | Invitation | Explain | Continue |
| S03 | Recognition | Personalize | Explore |
| S04 | Discovery | Engage | Interact |
| S05 | Her World | Recognize Jenny | Explore |
| S06 | Memories | Introduce memories | Open |
| S07 | People | Discover contributors | Select |
| S08 | Voices | Experience videos | Play |
| S09 | Images | Experience photos | Explore |
| S10 | Bac | Celebrate achievement | Reveal |
| S11 | 18 Years | Mark transition | Continue |
| S12 | Celebration | Emotional climax | Trigger/Explore |
| S13 | Finale | Close experience | Optional exit |

---

# 110 — INTERACTION INVENTORY

| Interaction | Trigger | Feedback | Result |
|---|---|---|---|
| Enter | Click/Tap/Keyboard | CTA motion | Intro |
| Continue | Click/Tap | Transition | Next scene |
| Explore | Click/Tap | Reveal | Content |
| Discover object | Hover/Tap | Object response | Reveal |
| Open person | Click/Tap | Transition | Person content |
| Play video | Click/Tap | Player response | Video playing |
| Open photo | Click/Tap | Expand | Full media |
| Close media | Click/Tap/Escape | Exit animation | Previous context |
| Submit contribution | Click/Tap | Loading | Success/Error |
| Upload media | Select file | Progress | Ready/Error |
| Celebration trigger | Click/Tap/scroll | Global reveal | Celebration |

---

# 111 — STATE MATRIX

| Element | Default | Active | Loading | Success | Error |
|---|---|---|---|---|---|
| CTA | Visible | Pressed | Processing | — | — |
| Form | Empty | Filled | — | Valid | Invalid |
| Upload | Idle | Selected | Uploading | Ready | Failed |
| Video | Preview | Playing | Buffering | Complete | Failed |
| Photo | Thumbnail | Expanded | Loading | Loaded | Failed |
| Contribution | Draft | Editing | Submitting | Published | Failed |
| Scene | Available | Active | Transitioning | Completed | Fallback |

---

# 112 — CONTRIBUTOR STATE MACHINE

```text
LANDING
   ↓
INTRO
   ↓
IDENTITY
   ↓
CONTENT SELECTION
   ↓
CONTENT EDITING
   ↓
VALIDATION
   ↓
PREVIEW
   ↓
SUBMITTING
   ↓
SUCCESS
```

Alternative error path :

```text
VALIDATION
↓
ERROR
↓
EDIT
```

Upload error :

```text
UPLOADING
↓
ERROR
↓
RETRY
```

---

# 113 — JENNY STATE MACHINE

```text
BOOT
↓
LOADING
↓
READY
↓
ARRIVAL
↓
INVITATION
↓
RECOGNITION
↓
DISCOVERY
↓
HER WORLD
↓
MEMORIES
↓
PEOPLE
↓
VOICES
↓
IMAGES
↓
BAC
↓
18
↓
CELEBRATION
↓
FINALE
```

Chaque état reste indépendant du rendu 3D.

---

# 114 — CORE UI / EXPERIENCE LAYER

Architecture de référence :

```text
CORE UI
│
├── Navigation
├── Content
├── Controls
├── Media
└── Accessibility

EXPERIENCE LAYER
│
├── Motion
├── 3D
├── Camera
├── Particles
└── Advanced effects
```

La couche Experience doit enrichir la couche Core, jamais la remplacer.

---

# 115 — UX / MOTION HANDOFF

Pour chaque élément animé, le développement devra recevoir :

```text
Element
Trigger
Initial state
Final state
Motion category
Priority
Mobile behavior
Reduced-motion behavior
Fallback
```

Le système 3D & Motion demande précisément que le handoff UX → Motion fournisse ces informations.

---

# 116 — EXAMPLE MOTION SPECIFICATION

### Element

`Arrival CTA`

### Trigger

Pointer / keyboard / touch

### Initial state

```text
opacity: 1
scale: 1
```

### Hover

```text
subtle scale
subtle displacement
```

### Active

```text
pressed
```

### Exit

```text
fade / scene transition
```

### Reduced motion

```text
no displacement
opacity transition only
```

---

# 117 — EXAMPLE INTERACTIVE OBJECT

### Element

`Cat Easter Egg`

### Initial

```text
STATIC
```

### Hint

```text
SUBTLE MOTION
```

### Interaction

```text
CLICK / TAP
```

### Feedback

```text
MICRO MOTION
+
REVEAL
```

### Final state

```text
DISCOVERED
```

### Mobile

```text
TAP
```

### Reduced motion

```text
STATIC REVEAL
```

---

# 118 — EXAMPLE VIDEO INTERACTION

```text
VIDEO CARD
↓
TAP
↓
VIDEO OPEN
↓
PLAY
↓
PLAYING
↓
PAUSE / RESUME
↓
END
↓
AFTERGLOW
↓
NEXT
```

---

# 119 — EXAMPLE PHOTO INTERACTION

```text
PHOTO
↓
TAP
↓
EXPAND
↓
FULLSCREEN / OVERLAY
↓
SWIPE / NEXT
↓
CLOSE
↓
RETURN
```

---

# 120 — EXAMPLE CONTRIBUTION INTERACTION

```text
MESSAGE
+
VIDEO
```

valid contribution.

```text
PHOTO
```

valid contribution.

```text
NOTHING
```

invalid.

The UI must prevent submission until at least one content type exists.

---

# 121 — RESPONSIVE SPECIFICATION

Chaque scène doit être validée sur :

```text
Mobile
Tablet
Desktop
Large Desktop
```

mais les breakpoints seront déterminés par les besoins réels du contenu, conformément au principe du Design System.

---

# 122 — DESKTOP INTERACTION MODEL

Priorités :

```text
Pointer
Keyboard
Scroll
Camera / spatial interaction
```

Le desktop peut recevoir la version la plus riche de l'expérience.

---

# 123 — TABLET INTERACTION MODEL

Priorités :

```text
Touch
Scroll
Reduced spatial complexity
```

Les interactions dépendantes du hover doivent être remplacées.

---

# 124 — MOBILE INTERACTION MODEL

Priorités :

```text
Tap
Swipe
Scroll
Media controls
```

Les interactions complexes doivent être simplifiées.

---

# 125 — ACCESSIBILITY REQUIREMENTS

La Phase 4 considère comme non négociables :

```text
Semantic HTML
Keyboard navigation
Visible focus
Readable contrast
Accessible controls
Media controls
Reduced motion
Touch alternatives
```

Le système UX demande que l'accessibilité soit intégrée dès la conception.

---

# 126 — ACCESSIBILITY / 3D

Si une information est représentée uniquement en 3D :

```text
3D representation
+
DOM / textual equivalent
```

lorsque nécessaire.

Le contenu critique ne doit pas être enfermé uniquement dans WebGL.

---

# 127 — ACCESSIBILITY / MEDIA

Les vidéos et photos doivent disposer des contrôles nécessaires.

Les éléments importants doivent rester compréhensibles sans dépendre uniquement :

```text
sound
motion
color
```

---

# 128 — CONTRAST

Le contraste doit permettre de distinguer :

```text
Content
Background
Interactive elements
States
```

La direction artistique rouge/noir devra donc être validée contre les exigences de lisibilité plutôt que reproduite mécaniquement.

---

# 129 — REDUCED MOTION QA

Pour chaque scène :

```text
FULL MOTION
vs
REDUCED MOTION
```

doit être testé.

La réduction de motion ne doit pas supprimer :

```text
meaning
navigation
content
interaction
```

---

# 130 — PERFORMANCE FALLBACK MATRIX

| Feature | Full | Reduced | Core |
|---|---|---|---|
| 3D | Full scene | Simplified | Disabled |
| Particles | Full | Reduced | None |
| Parallax | Full | Reduced | None |
| Camera motion | Full | Minimal | Static |
| Shader effects | Full | Reduced | None |
| DOM content | Full | Full | Full |
| Navigation | Full | Full | Full |
| Media | Full | Full | Full |

---

# 131 — FAILURE ISOLATION

Une erreur dans :

```text
3D
```

ne doit pas provoquer :

```text
whole application crash
```

Architecture :

```text
CORE UI
+
OPTIONAL EXPERIENCE LAYER
```

Cette séparation est explicitement recommandée par le système 3D & Motion.

---

# 132 — QUALITY GATE 01 — FLOW

Questions :

```text
[ ] Every user journey is defined
[ ] Every scene has a purpose
[ ] Every primary action is defined
[ ] Every transition is defined
```

---

# 133 — QUALITY GATE 02 — INTERACTION

```text
[ ] Every important interaction has feedback
[ ] Hover alternatives exist
[ ] Touch behavior exists
[ ] Keyboard behavior exists
[ ] States are documented
```

---

# 134 — QUALITY GATE 03 — CONTENT

```text
[ ] Empty states exist
[ ] Long content works
[ ] Missing media works
[ ] Error states exist
[ ] Recovery exists
```

---

# 135 — QUALITY GATE 04 — MOTION

```text
[ ] Every motion has a trigger
[ ] Initial state defined
[ ] Final state defined
[ ] Owner defined
[ ] Mobile behavior defined
[ ] Reduced motion defined
```

---

# 136 — QUALITY GATE 05 — IMMERSION

```text
[ ] Navigation remains discoverable
[ ] User remains oriented
[ ] 3D never contains critical-only content
[ ] Effects do not block the experience
[ ] User retains control
```

---

# 137 — QUALITY GATE 06 — PERFORMANCE

```text
[ ] Progressive loading
[ ] 3D can degrade
[ ] Media loading states
[ ] WebGL failure isolation
[ ] No unnecessary continuous loops
```

---

# 138 — EXPERIENCE ANTI-PATTERNS

Le développement devra explicitement éviter :

```text
❌ navigation invisible sans indice
❌ interactions critiques basées uniquement sur hover
❌ autoplay audio incontrôlé
❌ scroll hijacking agressif
❌ animations constantes
❌ loader inutilement long
❌ contenu essentiel uniquement dans WebGL
❌ boutons sans feedback
❌ formulaires sans états d'erreur
❌ upload sans progression
❌ erreur sans récupération
❌ plusieurs CTA concurrents
❌ 3D sans rôle narratif
❌ effets sans trigger
❌ transitions impossibles à interrompre lorsqu'elles devraient l'être
```

Ces anti-patterns correspondent aux règles UX et Motion des sources. 

---

# 139 — COMPLETE EXPERIENCE FLOW

```text
                         ┌───────────────┐
                         │    ARRIVAL    │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │  INVITATION   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │ RECOGNITION   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │   DISCOVERY   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │   HER WORLD   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │   MEMORIES    │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │    PEOPLE     │
                         └───────┬───────┘
                                 ↓
                    ┌────────────┴────────────┐
                    ↓                         ↓
             ┌─────────────┐          ┌─────────────┐
             │   VOICES    │          │    IMAGES   │
             │   VIDEOS    │          │    PHOTOS   │
             └──────┬──────┘          └──────┬──────┘
                    └────────────┬────────────┘
                                 ↓
                         ┌───────────────┐
                         │      BAC      │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │    18 ANS     │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │ CELEBRATION   │
                         └───────┬───────┘
                                 ↓
                         ┌───────────────┐
                         │    FINALE     │
                         └───────────────┘
```

---

# 140 — CONTRIBUTOR FLOW

```text
LANDING
   ↓
INTRO
   ↓
NAME
   ↓
CONTENT TYPE
   ↓
┌──────────┬──────────┬──────────┐
│ MESSAGE  │  PHOTO   │  VIDEO   │
└────┬─────┴────┬─────┴────┬─────┘
     ↓          ↓          ↓
     └──────────┼──────────┘
                ↓
             PREVIEW
                ↓
             SUBMIT
             /    \
            ↓      ↓
        SUCCESS   ERROR
                   ↓
                 RETRY
```

---

# 141 — EXPERIENCE DESIGN HIERARCHY

La hiérarchie d'implémentation doit rester :

```text
CONTENT
↓
LAYOUT
↓
INTERACTION
↓
MOTION
↓
3D
↓
ADVANCED EFFECTS
```

Cette hiérarchie est commune aux trois sources et constitue une règle structurante du projet. 

---

# 142 — DESIGN HANDOFF

La Phase 5 devra maintenant transformer cette spécification en :

```text
VISUAL LANGUAGE
+
DESIGN TOKENS
+
TYPOGRAPHY
+
COLOR SYSTEM
+
COMPONENT SYSTEM
+
SCENE VISUAL DIRECTION
```

---

# 143 — MOTION HANDOFF

La Phase 6 devra transformer les interactions définies ici en :

```text
MOTION SYSTEM
+
TRANSITION SYSTEM
+
CAMERA SYSTEM
+
3D SYSTEM
+
SCENE ENGINE
```

sans modifier les intentions UX établies ici.

---

# 144 — DEVELOPMENT HANDOFF

L'IA de développement doit considérer ce document comme une **spécification comportementale**.

Elle ne doit pas interpréter :

```text
"immersive"
```

comme :

```text
"add more effects"
```

Elle doit l'interpréter comme :

```text
create a coherent experience
```

---

# 145 — IMPLEMENTATION ORDER

L'implémentation devra suivre :

```text
01 — Core DOM structure
↓
02 — Content model
↓
03 — Static layout
↓
04 — Interaction states
↓
05 — Contributor flow
↓
06 — Jenny flow
↓
07 — Media handling
↓
08 — Basic motion
↓
09 — Scene transitions
↓
10 — 3D foundation
↓
11 — Advanced interaction
↓
12 — Polish
↓
13 — Accessibility QA
↓
14 — Performance QA
```

Cette séquence est alignée sur l'ordre recommandé par le système 3D & Motion.

---

# 146 — FINAL UX PRINCIPLE

Le site ne doit jamais demander à Jenny :

> « Comprends-tu comment fonctionne cette interface ? »

L'expérience doit plutôt lui faire ressentir :

> **« Je comprends naturellement ce que je peux faire, et j'ai envie de découvrir la suite. »**

---

# 147 — FINAL INTERACTION PRINCIPLE

```text
DISCOVERABLE
+
RESPONSIVE
+
MEANINGFUL
+
REVERSIBLE WHEN APPROPRIATE
+
ACCESSIBLE
```

Une interaction spectaculaire mais confuse est considérée comme un échec UX.

---

# 148 — FINAL IMMERSION PRINCIPLE

L'immersion ne vient pas de :

```text
MORE 3D
MORE PARTICLES
MORE ANIMATION
MORE EFFECTS
```

Elle vient de :

```text
COHERENCE
+
PERSONALIZATION
+
NARRATIVE
+
SPATIAL CONTINUITY
+
INTERACTION
+
EMOTION
```

La 3D et la motion ne sont que les moyens techniques permettant de renforcer ces dimensions. Le système 3D & Motion rappelle explicitement que la 3D doit créer de la profondeur et non de la distraction.

---

# 149 — FINAL PROJECT EXPERIENCE MODEL

Le modèle définitif est :

```text
                    JENNY EXPERIENCE
                           │
            ┌──────────────┴──────────────┐
            ↓                             ↓
      UNDERSTANDING                  EMOTION
            │                             │
            ↓                             ↓
       ORIENTATION                  MEMORIES
            │                             │
            ↓                             ↓
       DISCOVERY                    PEOPLE
            │                             │
            └──────────────┬──────────────┘
                           ↓
                       ACHIEVEMENT
                           │
                           ↓
                         BAC
                           │
                           ↓
                         18 ANS
                           │
                           ↓
                      CELEBRATION
                           │
                           ↓
                         FINALE
```

---

# 150 — PHASE 4 DELIVERABLE SUMMARY

Cette phase définit désormais :

```text
✓ Contributor journey
✓ Jenny journey
✓ Screen / scene inventory
✓ Primary actions
✓ Secondary actions
✓ Interaction states
✓ Component states
✓ Media states
✓ Loading states
✓ Error states
✓ Recovery flows
✓ Navigation behavior
✓ Modal behavior
✓ Keyboard behavior
✓ Touch behavior
✓ Hover fallback
✓ Scroll interaction
✓ Motion triggers
✓ Motion ownership
✓ Audio behavior
✓ Reduced-motion behavior
✓ Mobile behavior
✓ 3D fallback
✓ WebGL isolation
✓ Accessibility rules
✓ Performance-aware UX
✓ Quality gates
✓ Development handoff
```

---

# 151 — DOCUMENT STATUS

**Phase :** 4 / 7  
**Nom :** UX/UI Flow & Interaction Specification  
**Statut :** **TERMINÉE**

**Fichier cible :**

```text
Docs/04_UX_UI_FLOW_INTERACTION_SPECIFICATION.md
```

---

# 152 — PROJECT PIPELINE

Le projet avance désormais ainsi :

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
JENNY VISUAL DIRECTION & DESIGN SYSTEM
        ↓
PHASE 6
3D / MOTION / IMMERSIVE ENGINEERING
        ↓
PHASE 7
TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT
```

---

# 153 — NEXT PHASE

La phase suivante est :

> **PHASE 5 — JENNY VISUAL DIRECTION & DESIGN SYSTEM**

Elle devra transformer l'architecture et les flows maintenant stabilisés en **langage visuel concret** :

```text
IDENTITY
↓
COLOR
↓
TYPOGRAPHY
↓
SPACING
↓
GRID
↓
SURFACES
↓
COMPONENTS
↓
MEDIA
↓
SCENE VISUAL LANGUAGE
↓
ART DIRECTION
```

La règle de passage est importante :

> **La Phase 5 ne doit pas redéfinir l'expérience. Elle doit donner une forme visuelle à l'expérience déjà définie.**