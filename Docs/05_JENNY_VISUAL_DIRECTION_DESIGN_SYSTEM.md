# PHASE 5 — JENNY VISUAL DIRECTION & DESIGN SYSTEM

**Projet : Jenny — 18 ans & Bac**  
**Document : `Docs/05_JENNY_VISUAL_DIRECTION_DESIGN_SYSTEM.md`**  
**Version : 1.0**  
**Statut : PHASE 5 — TERMINÉE**

---

# 00 — PURPOSE

Cette phase définit le **langage visuel complet de l'expérience Jenny**.

La Phase 4 définissait :

```text
WHAT HAPPENS?
+
HOW DOES THE USER INTERACT?
```

La Phase 5 définit :

```text
WHAT DOES IT FEEL LIKE?
+
WHAT DOES IT LOOK LIKE?
+
WHAT VISUAL RULES GOVERN THE EXPERIENCE?
```

Le résultat attendu n'est pas simplement une palette rouge/noire ou quelques composants.

Il s'agit de construire une **identité visuelle propriétaire**, suffisamment forte pour que :

> même sans voir son nom, Jenny puisse reconnaître que cette expérience a été créée pour elle.

---

# 01 — DESIGN SYSTEM SOURCE OF TRUTH

Le système Digital Experience impose une hiérarchie fondamentale :

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

Cette hiérarchie doit rester intacte.

La direction artistique Jenny ne doit donc jamais devenir :

```text
RED + BLACK
+
GLOW
+
3D
+
PARTICLES
+
ANIMATION
```

simplement parce que ces éléments sont visuellement séduisants.

Elle doit devenir :

```text
PERSONALITY
+
MEMORY
+
MYSTERY
+
ROMANCE
+
CELEBRATION
+
INTIMACY
```

puis seulement :

```text
VISUAL LANGUAGE
```

---

# 02 — DESIGN INTENT

L'expérience doit produire simultanément cinq sensations :

```text
01 — "C'est clairement Jenny."
02 — "Quelqu'un a vraiment pensé aux détails."
03 — "J'ai envie de découvrir la suite."
04 — "Cette expérience me concerne personnellement."
05 — "Ce n'est pas un simple site d'anniversaire."
```

Le design doit donc être :

- personnel ;
- élégant ;
- mystérieux ;
- émotionnel ;
- cinématique ;
- chaleureux par moments ;
- sombre par moments ;
- ludique par petites touches ;
- sophistiqué sans être froid.

---

# 03 — VISUAL POSITIONING

Le territoire visuel de Jenny se situe à l'intersection de :

```text
DARK CINEMATIC
        +
ROMANTIC
        +
MYSTERY
        +
PERSONAL MEMORY
        +
CELEBRATION
```

Mais il faut éviter les interprétations trop littérales.

Ce projet n'est pas :

```text
❌ gothique
❌ horror website
❌ Valentine's Day website
❌ anime fan page
❌ children's birthday website
```

Il doit être :

> **une expérience personnelle, mystérieuse et élégante, construite autour de l'univers de Jenny.**

---

# 04 — PERSONALITY MATRIX

| Trait de Jenny | Traduction visuelle |
|---|---|
| Franche | compositions nettes |
| Directe | typographie affirmée |
| Attentionnée | détails subtils |
| Émotionnelle | transitions douces |
| Mystérieuse | zones sombres / révélations |
| Aime l'horreur | tension visuelle légère |
| Aime les enquêtes | indices / découverte |
| Aime la romance | chaleur / élégance |
| Aime les chats | motifs félins subtils |
| Aime les lapins | détails secondaires |
| Aime rouge + noir | palette principale |
| Déteste rose | aucune dépendance au rose |

---

# 05 — CORE VISUAL CONCEPT

## Nom de travail

**"The Jenny Case"**

Ce nom est un concept interne de direction artistique.

Il ne doit pas nécessairement apparaître dans l'interface finale.

L'idée est de traiter l'expérience comme un mélange entre :

```text
CASE FILE
+
MEMORY BOOK
+
CINEMATIC EXPERIENCE
+
BIRTHDAY REVEAL
```

Cette direction permet de fusionner naturellement :

- son amour des enquêtes ;
- son goût pour le mystère ;
- ses goûts cinématographiques ;
- les souvenirs ;
- les messages ;
- les vidéos ;
- les révélations.

---

# 06 — SECONDARY CONCEPT

Un deuxième langage coexiste avec le précédent :

**"Jenny's Little Universe"**

Il représente :

```text
CAT
+
RABBIT
+
ROMANCE
+
MEMORIES
+
PEOPLE
+
18
+
BAC
```

Le premier concept apporte :

```text
MYSTERY
```

Le second apporte :

```text
INTIMACY
```

Le site doit constamment osciller entre les deux.

---

# 07 — VISUAL DUALITY

Le système visuel doit utiliser une dualité volontaire :

```text
MYSTERY
──────────────
DARK
SHARP
QUIET
CONTRASTED
STRUCTURED

          ↕

EMOTION
──────────────
SOFT
WARM
ORGANIC
INTIMATE
LUMINOUS
```

Cette dualité représente mieux Jenny qu'une esthétique uniforme.

---

# 08 — COLOR SYSTEM

Le Design System demande que les couleurs soient définies par **rôles sémantiques**, plutôt que simplement par noms de couleurs.

Le système Jenny suivra donc :

```text
Background
Surface
Surface Elevated
Foreground
Foreground Muted
Border
Primary
Accent
Success
Warning
Error
Info
```

---

# 09 — PRIMARY PALETTE

## 09.1 — Obsidian

```text
--color-background
#080808
```

Rôle :

- fond principal ;
- scènes sombres ;
- espaces de transition ;
- moments de suspense.

---

## 09.2 — Near Black

```text
--color-surface
#111111
```

Rôle :

- cartes ;
- panneaux ;
- surfaces secondaires ;
- overlays.

---

## 09.3 — Deep Crimson

```text
--color-primary
#8F0F24
```

Rôle :

- identité ;
- CTA ;
- éléments actifs ;
- détails narratifs ;
- transitions.

Le rouge doit être utilisé comme **signal**, pas comme remplissage permanent.

---

## 09.4 — Vivid Crimson

```text
--color-primary-active
#C51F3A
```

Rôle :

- active state ;
- focus ;
- interaction importante ;
- moments de climax.

---

## 09.5 — Warm Ivory

```text
--color-foreground
#F2EEE8
```

Rôle :

- texte principal ;
- titres ;
- éléments importants.

Cette teinte évite le blanc pur omniprésent et apporte une sensation plus éditoriale.

---

## 09.6 — Muted Ivory

```text
--color-foreground-muted
#A9A39D
```

Rôle :

- descriptions ;
- metadata ;
- informations secondaires.

---

# 10 — SECONDARY ACCENT

Le système doit pouvoir utiliser un accent secondaire extrêmement limité.

Proposition :

```text
--color-accent
#D8C7A7
```

Un ivoire doré très discret.

Il peut représenter :

- souvenirs ;
- moments précieux ;
- réussite ;
- passage à l'âge adulte ;
- Bac ;
- finale.

Il ne doit jamais devenir une deuxième couleur dominante.

---

# 11 — PROHIBITED COLOR

Le rose ne doit pas être utilisé comme couleur identitaire.

Cela ne signifie pas qu'aucune couleur proche ne puisse jamais apparaître dans une image externe.

Cela signifie :

```text
NO PINK BRAND LANGUAGE
```

La direction doit rester fidèle à sa préférence rouge/noir.

---

# 12 — SEMANTIC COLORS

Les couleurs fonctionnelles doivent rester distinctes du langage artistique.

```text
Success → Green
Warning → Amber
Error → Red semantic variant
Info → Neutral / cool
```

Le rouge identitaire et le rouge d'erreur doivent être suffisamment différenciés par :

- teinte ;
- contexte ;
- iconographie ;
- texte.

Les couleurs sémantiques ne doivent pas être utilisées décorativement.

---

# 13 — COLOR USAGE RATIO

Le principe visuel recommandé :

```text
BLACK / DARK NEUTRALS
≈ 65–75%

IVORY / LIGHT CONTENT
≈ 15–25%

RED
≈ 5–10%

SECONDARY ACCENT
≈ 1–3%
```

Ces proportions sont des **règles de direction**, pas des contraintes mathématiques.

L'objectif est d'éviter :

```text
RED WEBSITE
```

et de créer :

```text
DARK EXPERIENCE
WITH RED SIGNALS
```

---

# 14 — COLOR STATES

Les tokens devront prévoir :

```text
Primary
Primary Hover
Primary Active
Primary Disabled

Foreground
Foreground Muted
Foreground Subtle

Surface
Surface Elevated

Border
Border Strong
```

Les composants doivent utiliser ces tokens plutôt que des valeurs arbitraires dispersées, conformément au Design System.

---

# 15 — TYPOGRAPHIC DIRECTION

La typographie doit exprimer :

```text
CONFIDENCE
+
ELEGANCE
+
MYSTERY
+
INTIMACY
```

Le système ne doit pas multiplier les familles.

Le Design System recommande de limiter les familles afin de réduire la complexité et les risques d'incohérence.

---

# 16 — TYPOGRAPHY ROLES

Architecture :

```text
Display
↓
Heading
↓
Body
↓
Label
↓
Caption
↓
Micro
```

---

# 17 — DISPLAY FONT

Le Display doit être utilisé pour :

- `JENNY`
- `18`
- `BAC`
- grands moments narratifs ;
- phrases émotionnelles ;
- titres de scènes.

Direction :

```text
Elegant
Editorial
High contrast
Not childish
```

---

# 18 — BODY FONT

Le corps doit privilégier :

- excellente lisibilité ;
- neutralité ;
- confort ;
- bonne lecture mobile.

Le body ne doit pas avoir une personnalité plus forte que les titres.

---

# 19 — OPTIONAL MONOSPACE

Une monospace peut être utilisée uniquement pour les éléments liés au langage "enquête / dossier".

Exemples :

```text
CASE 001
MEMORY_07
ARCHIVE
13.08
18 YEARS
```

Son utilisation doit rester rare.

Elle sert à signaler :

```text
SYSTEM
ARCHIVE
EVIDENCE
METADATA
```

---

# 20 — TYPOGRAPHIC HIERARCHY

Exemple de structure :

```text
DISPLAY
clamp(4rem, 10vw, 10rem)

H1
clamp(3rem, 7vw, 7rem)

H2
clamp(2.5rem, 5vw, 5rem)

H3
clamp(1.5rem, 3vw, 3rem)

BODY
1rem–1.125rem

CAPTION
0.75rem–0.875rem
```

Les valeurs finales devront être validées avec les polices choisies.

Le principe du système est d'utiliser une échelle cohérente et responsive.

---

# 21 — TYPOGRAPHIC BEHAVIOR

Les titres peuvent être :

```text
UPPERCASE
```

lorsqu'ils représentent :

- chapitres ;
- metadata ;
- labels ;
- système d'archive.

Mais les messages émotionnels doivent pouvoir conserver :

```text
Sentence case
```

afin de rester humains.

---

# 22 — TEXTURE OF LANGUAGE

Le design doit créer deux voix visuelles.

### System voice

```text
CASE
ARCHIVE
FILE
MEMORY
ENTRY
CHAPTER
```

### Human voice

```text
Jenny
18 ans
Bac
souvenirs
messages
```

La première donne le cadre.

La seconde donne le cœur.

---

# 23 — SPACING SYSTEM

Le système doit adopter une échelle cohérente :

```text
4
8
12
16
24
32
48
64
96
128
160
```

Cette échelle est une proposition d'implémentation initiale.

Les espacements doivent être utilisés sémantiquement, conformément au principe de spacing rhythm du Design System.

---

# 24 — SPACING PHILOSOPHY

Trois niveaux :

```text
MICRO
4–16px

COMPONENT
16–48px

SECTION
64–160px+
```

Les scènes émotionnelles peuvent disposer de davantage d'espace.

Les interfaces fonctionnelles doivent être plus compactes.

---

# 25 — GRID

La grille doit être :

```text
Editorial
Asymmetric
Controlled
Responsive
```

Elle ne doit pas produire un site strictement centré.

---

# 26 — DESKTOP GRID

Proposition :

```text
12 columns
```

avec :

```text
max-width
large margins
controlled gutters
```

La grille peut être utilisée pour :

- texte ;
- médias ;
- cartes ;
- objets ;
- scènes.

---

# 27 — MOBILE GRID

Sur mobile :

```text
4 columns
```

avec des marges latérales constantes.

Les compositions doivent devenir :

```text
vertical
layered
intimate
```

plutôt que simplement compressées.

---

# 28 — ASYMMETRY

L'asymétrie est autorisée et encouragée lorsqu'elle :

- attire l'attention ;
- crée du rythme ;
- exprime le mystère ;
- permet une composition cinématique.

Mais elle doit rester contrôlée, conformément au Design System.

---

# 29 — SURFACE SYSTEM

Le site doit utiliser peu de surfaces.

```text
Background
Surface
Surface Elevated
Overlay
```

Chaque niveau possède une fonction.

---

# 30 — SURFACE CHARACTER

Les surfaces doivent être :

```text
Dark
Soft
Slightly textured
Low saturation
```

Éviter les cartes noires parfaitement plates partout.

Une légère variation de luminosité suffit.

---

# 31 — GLASS SYSTEM

Le glassmorphism peut être utilisé, mais uniquement dans :

- navigation ;
- overlays ;
- media viewer ;
- certains panneaux interactifs.

Il ne doit pas devenir le style de chaque carte.

Le Design System indique explicitement que blur, transparence, grain et glow doivent rester cohérents avec la direction artistique et ne pas devenir une signature automatique.

---

# 32 — BORDER SYSTEM

Les bordures seront principalement :

```text
1px
low opacity
```

avec une variante :

```text
Strong border
```

pour les éléments interactifs.

Le rouge ne doit pas entourer tous les composants.

---

# 33 — RADIUS SYSTEM

Direction :

```text
XS
SM
MD
LG
FULL
```

mais avec une préférence pour :

```text
SM / MD
```

afin de conserver une tension entre :

```text
EDITORIAL
+
MODERN DIGITAL
```

Éviter les cartes massivement arrondies façon application enfantine.

---

# 34 — DEPTH SYSTEM

La profondeur sera créée principalement par :

```text
Layering
+
Opacity
+
Blur
+
Lighting
+
Perspective
+
Motion
+
3D
```

Les ombres seront discrètes.

Le Design System recommande que la profondeur renforce la hiérarchie plutôt que de transformer chaque élément en surface flottante.

---

# 35 — BACKGROUND LANGUAGE

Les arrière-plans doivent évoluer avec le récit.

### Mystery

```text
Black
Deep red
Subtle grain
Low light
```

### Memory

```text
Dark
Warm ivory
Soft glow
```

### Celebration

```text
Crimson
Ivory
Light
Particles / atmosphere
```

---

# 36 — GRAIN

Un grain très subtil peut être utilisé pour donner :

- texture ;
- profondeur ;
- sensation cinématique.

Il doit être :

```text
LOW OPACITY
NON-INTRUSIVE
```

Il ne doit pas réduire la lisibilité.

---

# 37 — LIGHT SYSTEM

La lumière doit être utilisée comme un élément narratif.

Architecture :

```text
DARKNESS
↓
LOCAL LIGHT
↓
REVEAL
↓
FULL LIGHT
```

Le système lumineux peut accompagner les transitions émotionnelles.

---

# 38 — RED LIGHT

Le rouge peut être utilisé comme :

```text
signal
```

plutôt que :

```text
background
```

Exemples :

- halo ;
- ligne ;
- lumière ponctuelle ;
- reflet ;
- objet ;
- indicateur ;
- transition.

---

# 39 — CAT VISUAL LANGUAGE

Les chats sont l'un des éléments personnels les plus importants.

Ils doivent donc avoir une place plus importante que les lapins.

Hiérarchie :

```text
CAT
★★★★★

RABBIT
★★★
```

Ce n'est pas une hiérarchie décorative.

C'est une hiérarchie narrative.

---

# 40 — CAT REPRESENTATION

Éviter :

```text
❌ dessins de chats enfantins partout
❌ stickers
❌ emoji géants
❌ esthétique kawaii permanente
```

Préférer :

```text
silhouette
shadow
eyes
paw trace
photographic reference
minimal illustration
3D object
subtle easter egg
```

---

# 41 — CAT EASTER EGG

Un chat peut apparaître dans plusieurs scènes sous différentes formes.

Exemple :

```text
shadow
↓
eye reflection
↓
silhouette
↓
full reveal
```

La reconnaissance devient progressive.

---

# 42 — RABBIT LANGUAGE

Les lapins restent un élément important mais secondaire.

Ils peuvent apparaître comme :

- petite silhouette ;
- motif ;
- objet caché ;
- détail de décor ;
- easter egg.

Ils ne doivent pas concurrencer les chats.

---

# 43 — ROMANCE LANGUAGE

La romance doit être exprimée sans tomber dans :

```text
pink
hearts everywhere
cute clichés
```

Préférer :

```text
soft light
slow reveal
warm ivory
elegant typography
subtle bloom
close framing
```

---

# 44 — HORROR LANGUAGE

L'horreur doit rester élégante.

Le site n'est pas un film d'horreur.

Utiliser :

```text
silence
darkness
unexpected reveal
subtle distortion
shadow
negative space
tension
```

Éviter :

```text
blood
gore
violent imagery
cheap horror clichés
```

---

# 45 — INVESTIGATION LANGUAGE

C'est l'un des meilleurs leviers d'identité.

Le système peut utiliser :

```text
CASE
CLUE
ENTRY
ARCHIVE
EVIDENCE
MEMORY
TIMELINE
```

avec parcimonie.

---

# 46 — VISUAL CLUES

Les indices peuvent prendre la forme de :

```text
numbers
dates
coordinates
symbols
initials
small annotations
red marks
```

Ils doivent avoir une fonction narrative.

---

# 47 — ARCHIVE LANGUAGE

Les contributions peuvent être présentées comme des éléments d'archive.

Exemple :

```text
MEMORY 07
FROM: [Name]
DATE: 13.08
TYPE: VIDEO
```

Puis :

```text
CONTENT
```

Cela donne une identité forte à la collection de messages.

---

# 48 — MEMORY OBJECT

Chaque souvenir doit sembler être un objet conservé.

Visuellement :

```text
ARCHIVE
↓
OBJECT
↓
REVEAL
↓
MEMORY
```

---

# 49 — PHOTO LANGUAGE

Les photos peuvent utiliser :

```text
cropping
asymmetry
film-like framing
dark surroundings
soft borders
```

Mais le traitement doit respecter la qualité réelle des photos.

---

# 50 — VIDEO LANGUAGE

Les vidéos doivent être traitées comme :

```text
presence
```

plutôt que comme simples fichiers.

La présentation doit mettre en avant :

```text
WHO
+
VOICE
+
FACE
+
MESSAGE
```

---

# 51 — MEDIA CARD

Structure :

```text
┌─────────────────────────────┐
│                             │
│          MEDIA              │
│                             │
├─────────────────────────────┤
│ MEMORY 07                   │
│ FROM: NAME                  │
│                             │
│ "A little something..."     │
└─────────────────────────────┘
```

La structure reprend le principe de hiérarchie des médias et cartes du Design System.

---

# 52 — BAC VISUAL LANGUAGE

Le Bac doit posséder son propre moment.

Il doit être :

```text
PROUD
ELEGANT
BRIGHTER
```

sans devenir institutionnel.

---

# 53 — BAC COLOR SHIFT

La palette peut progressivement évoluer :

```text
BLACK
↓
DEEP CRIMSON
↓
WARM IVORY
```

Le passage visuel représente :

```text
STRUGGLE
↓
ACHIEVEMENT
```

---

# 54 — 18 VISUAL LANGUAGE

Le nombre :

```text
18
```

doit devenir un objet graphique.

Il peut être :

- immense ;
- spatial ;
- lumineux ;
- découpé ;
- révélé ;
- intégré à la scène.

Il ne doit pas simplement être un gros titre.

---

# 55 — 18 AS TRANSITION

Le nombre peut symboliser :

```text
PAST
→
PRESENT
→
FUTURE
```

Le langage visuel passe progressivement de :

```text
ARCHIVE
```

vers :

```text
OPEN SPACE
```

---

# 56 — CELEBRATION LANGUAGE

La célébration doit être le point le plus lumineux de l'expérience.

Mais pas nécessairement le plus chargé.

Principe :

```text
LESS NOISE
MORE IMPACT
```

---

# 57 — CELEBRATION PALETTE

À la fin :

```text
Warm Ivory
+
Crimson
+
Dark
+
Subtle Gold/Ivory Accent
```

peuvent coexister.

---

# 58 — FINAL VISUAL STATE

La dernière scène doit revenir progressivement vers :

```text
CALM
```

Après le climax.

La fin doit laisser une trace émotionnelle plutôt qu'une surcharge visuelle.

---

# 59 — ICONOGRAPHY

L'iconographie doit rester :

```text
minimal
thin
precise
consistent
```

Les icônes fonctionnelles doivent être distinctes des éléments décoratifs, conformément au Design System.

---

# 60 — CUSTOM SYMBOL LANGUAGE

Le site peut développer un petit alphabet graphique :

```text
●
+
×
—
◇
```

ou des symboles propriétaires.

Ils peuvent représenter :

- chapitre ;
- indice ;
- mémoire ;
- personne ;
- transition.

Mais ils doivent rester limités.

---

# 61 — COMPONENT ARCHITECTURE

Le Design System suivra :

```text
TOKENS
↓
PRIMITIVES
↓
COMPONENTS
↓
PATTERNS
↓
SCENES
↓
EXPERIENCE
```

Cette organisation est cohérente avec la structure proposée par le Design System.

---

# 62 — PRIMITIVES

Les primitives principales :

```text
Container
Stack
Grid
Text
Heading
Icon
Divider
Button
Media
```

---

# 63 — CORE COMPONENTS

Composants spécifiques au projet :

```text
JennyLogo
SceneLabel
ChapterIndicator
MemoryCard
MemoryArchive
ContributorBadge
MediaViewer
VideoCard
PhotoFrame
Clue
EasterEgg
ChapterTransition
CelebrationCounter
```

---

# 64 — NAVIGATION COMPONENT

Nom :

```text
JennyNavigation
```

Responsabilités :

- orientation ;
- chapitre actuel ;
- accès aux sections ;
- retour ;
- fermeture.

Elle ne doit pas contenir la logique de scène 3D.

---

# 65 — SCENE LABEL

Le composant peut afficher :

```text
CHAPTER 04
```

ou :

```text
MEMORY
```

ou :

```text
ARCHIVE
```

Il sert à donner un cadre à l'expérience.

---

# 66 — MEMORY CARD

La MemoryCard doit supporter :

```text
Message
Photo
Video
Message + Media
```

Elle doit être indépendante du contenu réel.

---

# 67 — MEDIA VIEWER

Responsabilités :

```text
Open
Close
Navigate
Play
Pause
Fullscreen
```

Il doit préserver le contexte de navigation.

---

# 68 — CONTRIBUTOR BADGE

Le nom du contributeur doit être visuellement important mais pas dominant.

Structure :

```text
FROM
NAME
```

Le système doit éviter de transformer l'expérience en réseau social.

---

# 69 — CLUE COMPONENT

Un indice est :

```text
subtle
discoverable
optional
interactive
```

Il peut utiliser :

- couleur ;
- mouvement ;
- texte ;
- forme ;
- lumière.

---

# 70 — EASTER EGG COMPONENT

L'EasterEgg doit être :

```text
optional
self-contained
non-blocking
```

Il peut être :

```text
Cat
Rabbit
Phrase
Symbol
Hidden message
```

---

# 71 — BUTTON SYSTEM

Variantes :

```text
Primary
Secondary
Ghost
Icon
```

États :

```text
Default
Hover
Focus
Active
Disabled
Loading
```

Cette structure suit le système de boutons de référence.

---

# 72 — PRIMARY BUTTON

Style :

```text
Dark / Crimson
```

avec :

- contraste élevé ;
- texte lisible ;
- feedback immédiat.

Le rouge sert de signal d'action.

---

# 73 — SECONDARY BUTTON

Style :

```text
Transparent
+
Border
```

Il doit rester moins dominant.

---

# 74 — GHOST BUTTON

Utilisation :

- navigation secondaire ;
- retour ;
- fermeture ;
- actions contextuelles.

---

# 75 — ICON BUTTON

Utilisation :

- close ;
- play ;
- pause ;
- mute ;
- navigation media.

Toujours avec :

```text
accessible label
+
visible focus
```

---

# 76 — CARD SYSTEM

Les cartes ne doivent pas être utilisées partout.

Elles sont adaptées à :

```text
Memories
Media
Contributors
Archive
```

Mais pas nécessairement aux scènes narratives.

---

# 77 — FULLSCREEN SCENES

Les scènes importantes peuvent utiliser le plein écran pour :

- immersion ;
- storytelling ;
- transition ;
- 3D.

Le Design System autorise explicitement les sections fullscreen pour ces usages, mais déconseille leur utilisation systématique.

---

# 78 — LAYER SYSTEM

Structure visuelle :

```text
LAYER 01
Background

LAYER 02
Atmosphere

LAYER 03
3D / Visual

LAYER 04
Content

LAYER 05
Interaction

LAYER 06
Navigation
```

Cette architecture correspond au modèle de layering du Design System.

---

# 79 — VISUAL HIERARCHY

Chaque scène doit respecter :

```text
LEVEL 01
Main narrative element

LEVEL 02
Supporting message

LEVEL 03
Interaction

LEVEL 04
Metadata

LEVEL 05
Atmosphere
```

L'atmosphère ne doit jamais devenir plus importante que le contenu.

---

# 80 — VISUAL RHYTHM

Le site alternera :

```text
DENSE
↓
EMPTY
↓
INTERACTIVE
↓
EDITORIAL
↓
IMMERSIVE
↓
EMOTIONAL
```

Cette variation évite la fatigue visuelle.

Le système UX insiste sur l'importance du rythme et de l'alternance des densités.

---

# 81 — SCENE-SPECIFIC ART DIRECTION

## S01 — ARRIVAL

```text
BLACK
+
SILENCE
+
SUBTLE RED
+
MYSTERY
```

---

## S02 — INVITATION

```text
DARK
+
IVORY
+
MINIMAL RED
```

---

## S03 — RECOGNITION

```text
CAT
+
RED
+
BLACK
+
SMALL PERSONAL DETAILS
```

---

## S04 — DISCOVERY

```text
DARK
+
CLUES
+
SHADOW
+
RED SIGNALS
```

---

## S05 — HER WORLD

```text
EDITORIAL
+
PERSONAL
+
WARM
```

---

## S06 — MEMORIES

```text
ARCHIVE
+
DARK SURFACE
+
MEDIA
```

---

## S07 — PEOPLE

```text
PORTRAIT
+
NAME
+
MEMORY
```

---

## S08 — VOICES

```text
VIDEO
+
DARK FRAME
+
HUMAN PRESENCE
```

---

## S09 — IMAGES

```text
PHOTO
+
SPACE
+
MEMORY
```

---

## S10 — BAC

```text
BRIGHTER
+
WARM
+
PROUD
```

---

## S11 — 18

```text
MINIMAL
+
LARGE TYPOGRAPHY
+
LIGHT
```

---

## S12 — CELEBRATION

```text
CRIMSON
+
IVORY
+
LIGHT
+
ATMOSPHERE
```

---

## S13 — FINALE

```text
DARK
+
WARM
+
QUIET
```

---

# 82 — VISUAL TRANSITION LANGUAGE

Les transitions doivent préserver une continuité visuelle.

Le système 3D & Motion définit plusieurs formes possibles de continuité :

- spatiale ;
- chromatique ;
- temporelle ;
- narrative ;
- objet ;
- mouvement.

Pour Jenny :

```text
OBJECT
+
COLOR
+
LIGHT
+
NARRATIVE
```

seront les principales.

---

# 83 — OBJECT CONTINUITY

Exemple :

```text
CAT
↓
CAT SHADOW
↓
CAT SYMBOL
↓
NEXT SCENE
```

Le même motif permet de relier plusieurs scènes.

---

# 84 — COLOR CONTINUITY

Exemple :

```text
DEEP RED
```

présent dans une scène peut devenir :

```text
RED LIGHT
```

dans la suivante.

---

# 85 — TYPOGRAPHIC CONTINUITY

Les mêmes rôles typographiques doivent traverser les scènes :

```text
CHAPTER
DISPLAY
BODY
META
```

La mise en page peut varier, mais le système reste reconnaissable.

---

# 86 — MOTION VISUAL LANGUAGE

La motion appartient au Design System et doit être cohérente avec les rôles visuels.

Catégories :

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
Loading
```

---

# 87 — MOTION PERSONALITY

La motion Jenny doit être :

```text
Smooth
Intentional
Elegant
Occasionally surprising
Never frantic
```

---

# 88 — REVEAL MOTION

Le reveal est particulièrement important.

Utilisation :

```text
Text
Images
Clues
Memories
18
BAC
```

Le reveal doit donner la sensation de :

> découvrir quelque chose qui était déjà là.

---

# 89 — RED MOTION

Le rouge peut servir de signal animé :

```text
line
pulse
light
trail
glow
```

Mais pas de clignotement agressif.

---

# 90 — AMBIENT MOTION

Les mouvements ambiants doivent être presque imperceptibles :

```text
grain
light drift
slow particles
soft parallax
```

Ils créent la vie sans distraire.

---

# 91 — MOTION INTENSITY

Échelle :

```text
01 — MICRO
02 — SUBTLE
03 — NOTICEABLE
04 — CINEMATIC
05 — CLIMAX
```

La majorité du site doit rester entre :

```text
02–04
```

Le niveau 05 est réservé au climax.

---

# 92 — 3D VISUAL DIRECTION

La 3D ne doit pas être présente partout.

Elle intervient lorsque :

```text
spatialization
+
narrative
+
identity
```

le justifient.

Le Design System reconnaît précisément la 3D comme outil de profondeur, spatialisation, narration, interaction et immersion.

---

# 93 — 3D SUBJECTS

Les candidats prioritaires :

```text
Cat-inspired object
18
Memory objects
Archive objects
Abstract symbolic object
```

Le sujet final sera défini dans la Phase 6.

---

# 94 — 3D MATERIAL LANGUAGE

Direction :

```text
Matte dark
Glossy accents
Crimson emissive details
Soft ivory highlights
```

Éviter une scène entièrement brillante.

---

# 95 — 3D LIGHTING

Le système lumineux privilégie :

```text
Dark environment
+
localized light
+
red accent
+
soft warm light
```

---

# 96 — MOBILE 3D

Le mobile doit pouvoir recevoir :

```text
simplified scene
```

plutôt qu'une copie exacte du desktop.

Le responsive peut modifier layout, interaction, animation, 3D et densité.

---

# 97 — ACCESSIBILITY

Le système visuel doit respecter :

```text
Contrast
Keyboard
Focus
Semantic HTML
Accessible labels
Text alternatives
Reduced motion
```

Ces exigences font partie du Design System.

---

# 98 — REDUCED MOTION VISUAL MODE

Lorsque `prefers-reduced-motion` est actif :

```text
3D motion
→ reduced

Parallax
→ minimal

Ambient loops
→ removed/reduced

Scene transitions
→ simplified

Reveal
→ opacity / instant state
```

Le sens narratif reste identique.

---

# 99 — RESPONSIVE VISUAL STATES

Le système comporte trois grands modes :

```text
DESKTOP
CINEMATIC
SPATIAL

TABLET
BALANCED
SIMPLIFIED

MOBILE
INTIMATE
FOCUSED
```

---

# 100 — DESKTOP

Priorités :

```text
large typography
spatial composition
3D
asymmetry
cinematic transitions
```

---

# 101 — TABLET

Priorités :

```text
composition
readability
touch
moderate effects
```

---

# 102 — MOBILE

Priorités :

```text
readability
media
touch
vertical storytelling
intimacy
```

Les effets secondaires peuvent être supprimés.

---

# 103 — MEDIA ART DIRECTION

Les médias envoyés par les proches sont imprévisibles.

Le système doit donc accepter :

```text
Portrait
Landscape
Square
Wide
Low resolution
Large resolution
Short video
Long video
```

Les ratios doivent être gérés selon le type de contenu plutôt que forcés arbitrairement.

---

# 104 — MEDIA TREATMENT

Les médias doivent conserver leur authenticité.

Éviter de transformer chaque vidéo/photo en objet trop stylisé.

La matière humaine est précisément ce qui rend les contributions précieuses.

---

# 105 — AUTHENTICITY PRINCIPLE

```text
DESIGN
frames the memory.

DESIGN
does not replace the memory.
```

La photo doit rester une photo.

La vidéo doit rester une vidéo.

Le message doit rester un message.

---

# 106 — DESIGN TOKEN ARCHITECTURE

Structure recommandée :

```text
tokens/
├── colors
├── typography
├── spacing
├── radius
├── shadows
├── opacity
├── z-index
├── motion
└── breakpoints
```

---

# 107 — COLOR TOKEN EXAMPLE

```css
--color-background
--color-surface
--color-surface-elevated

--color-foreground
--color-foreground-muted
--color-foreground-subtle

--color-border
--color-border-strong

--color-primary
--color-primary-hover
--color-primary-active

--color-accent

--color-success
--color-warning
--color-error
--color-info
```

Les noms sont sémantiques conformément au Design System.

---

# 108 — TYPOGRAPHY TOKEN EXAMPLE

```css
--font-display
--font-heading
--font-body
--font-mono

--text-display
--text-h1
--text-h2
--text-h3
--text-body-lg
--text-body
--text-body-sm
--text-caption
--text-label
```

---

# 109 — SPACING TOKEN EXAMPLE

```css
--space-1
--space-2
--space-3
--space-4
--space-6
--space-8
--space-12
--space-16
--space-24
--space-32
--space-40
```

---

# 110 — RADIUS TOKEN EXAMPLE

```css
--radius-none
--radius-xs
--radius-sm
--radius-md
--radius-lg
--radius-full
```

---

# 111 — Z-INDEX TOKEN

```css
--z-background
--z-atmosphere
--z-visual
--z-content
--z-interaction
--z-navigation
--z-overlay
--z-modal
```

Cette séparation correspond à la logique de layering définie précédemment.

---

# 112 — OPACITY TOKEN

```css
--opacity-subtle
--opacity-muted
--opacity-medium
--opacity-strong
--opacity-overlay
```

Les valeurs finales doivent être définies lors de l'implémentation.

---

# 113 — COMPONENT GOVERNANCE

Avant de créer un nouveau composant :

```text
1. Existe-t-il déjà ?
2. Peut-il être composé ?
3. Une variante suffit-elle ?
4. Est-il réellement nécessaire ?
5. Introduit-il une nouvelle règle ?
```

Cette règle est explicitement recommandée par le Design System.

---

# 114 — NAMING

Les composants doivent être nommés par fonction.

Correct :

```text
MemoryCard
ChapterLabel
MediaViewer
SceneNavigation
```

Incorrect :

```text
RedCard
CoolMemory
FancyBox
BigThing
```

Les noms doivent survivre aux évolutions visuelles.

---

# 115 — DESIGN DEBT

Interdictions :

```text
❌ random colors
❌ arbitrary spacing
❌ duplicated components
❌ one-off CSS everywhere
❌ unnecessary variants
❌ inconsistent animations
```

Une exception répétée doit éventuellement devenir une règle du système.

---

# 116 — VISUAL QA

Chaque scène doit être contrôlée sur :

```text
Hierarchy
Alignment
Spacing
Contrast
Identity
Responsive
```

---

# 117 — INTERACTION QA

Contrôler :

```text
Hover
Focus
Active
Loading
Error
Success
Transition
Touch
Keyboard
```

Le Design System définit ces états comme partie intégrante du système de composants.

---

# 118 — CONTENT QA

Tester avec :

```text
Short message
Long message
No message
One photo
Many photos
No photo
Short video
Long video
Missing media
```

Un composant qui fonctionne seulement avec du contenu parfait n'est pas robuste.

---

# 119 — VISUAL ANTI-PATTERNS

À éviter absolument :

```text
❌ pink romantic theme
❌ red everywhere
❌ black cards everywhere
❌ giant cat illustrations everywhere
❌ rabbit overload
❌ horror clichés
❌ blood/gore aesthetic
❌ excessive glassmorphism
❌ excessive glow
❌ excessive gradients
❌ excessive particles
❌ every section fullscreen
❌ every element animated
❌ decorative 3D without purpose
```

---

# 120 — THE "JENNY TEST"

Un écran est considéré comme réussi si une personne qui connaît Jenny peut dire :

> « Ça, c'est tellement Jenny. »

sans que son nom soit affiché.

Les indices peuvent être :

```text
red
black
cat
rabbit
mystery
romance
investigation
subtle anime references
18
BAC
```

mais aucun élément isolé ne doit porter toute l'identité.

---

# 121 — THE "NOT GENERIC" TEST

Supprimer une section si elle pourrait appartenir à :

```text
any birthday website
```

sans modification.

Chaque scène doit contenir au moins un élément spécifiquement lié à Jenny.

---

# 122 — THE "FRIENDS TEST"

Un ami qui contribue doit pouvoir voir :

```text
cat
red/black
mystery
Jenny-specific references
```

et immédiatement comprendre :

> « Oui, c'est bien pour Jenny. »

---

# 123 — THE "JENNY DISCOVERY TEST"

Jenny ne doit pas simplement reconnaître les références.

Elle doit progressivement les découvrir.

Donc :

```text
VISIBLE
+
SUBTLE
+
HIDDEN
```

doivent coexister.

---

# 124 — VISUAL SURPRISE

Chaque grande partie peut contenir :

```text
1 primary visual idea
+
1 secondary surprise
```

mais pas :

```text
10 effects
```

La surprise doit venir du contenu ou de la transformation.

---

# 125 — DESIGN PRINCIPLE

La sophistication doit émerger de :

```text
COHERENCE
+
RESTRAINT
+
DETAIL
```

et non :

```text
COMPLEXITY
+
EFFECTS
+
TECHNOLOGY
```

Cette règle est directement alignée avec le Design System : la sophistication doit venir de la cohérence du système, pas de l'accumulation d'effets.

---

# 126 — COMPLETE VISUAL STACK

```text
                    JENNY
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
       MYSTERY                 EMOTION
          │                       │
          ↓                       ↓
       BLACK                   IVORY
          │                       │
          ↓                       ↓
        RED                   WARM LIGHT
          │                       │
          └───────────┬───────────┘
                      ↓
                  MEMORY
                      │
                      ↓
                 CAT / RABBIT
                      │
                      ↓
                 INVESTIGATION
                      │
                      ↓
                  ROMANCE
                      │
                      ↓
                    BAC
                      │
                      ↓
                    18
                      │
                      ↓
                CELEBRATION
```

---

# 127 — FINAL ART DIRECTION

La direction artistique officielle du projet peut donc être résumée ainsi :

> **Une expérience cinématique sombre et élégante, construite autour du rouge et du noir, dans laquelle le mystère de l'enquête rencontre l'intimité des souvenirs, la douceur de la romance et la chaleur d'une célébration personnelle.**

---

# 128 — VISUAL IDENTITY STATEMENT

```text
DARK BUT NOT COLD.
ROMANTIC BUT NOT PINK.
MYSTERIOUS BUT NOT CONFUSING.
PERSONAL BUT NOT CHILDISH.
CINEMATIC BUT NOT OVERLOADED.
CELEBRATORY BUT NOT LOUD.
```

---

# 129 — DESIGN SYSTEM SUMMARY

## Color

```text
Obsidian
Deep Crimson
Vivid Crimson
Warm Ivory
Muted Ivory
Subtle Gold/Ivory
```

## Typography

```text
Editorial Display
Neutral Body
Optional Monospace
```

## Geometry

```text
Controlled Radius
Editorial Grid
Asymmetry
Layering
```

## Texture

```text
Subtle Grain
Soft Light
Dark Surfaces
```

## Identity

```text
Cats > Rabbits
Red + Black
Mystery
Romance
Investigation
Horror influence
BAC
18
```

## Interaction

```text
Reveal
Discovery
Archive
Memory
Media
```

---

# 130 — DESIGN SYSTEM FILE STRUCTURE

Le dépôt pourra organiser la documentation ainsi :

```text
Docs/
│
├── 01_REVERSE_ENGINEERING_STELLA.md
├── 02_JENNY_EXPERIENCE_MAP_IDENTITY.md
├── 03_EXPERIENCE_ARCHITECTURE.md
├── 04_UX_UI_FLOW_INTERACTION_SPECIFICATION.md
│
└── 05_JENNY_VISUAL_DIRECTION_DESIGN_SYSTEM.md
```

Le présent document devient la référence visuelle de la Phase 5.

---

# 131 — RELATION WITH PHASE 4

La Phase 5 ne doit pas modifier arbitrairement les flows définis précédemment.

Elle leur donne une forme visuelle.

```text
PHASE 4
WHAT + HOW
        ↓
PHASE 5
VISUAL EXPRESSION
```

---

# 132 — RELATION WITH PHASE 6

La Phase 6 devra maintenant transformer cette direction visuelle en :

```text
MOTION SYSTEM
+
3D SYSTEM
+
CAMERA SYSTEM
+
TRANSITION SYSTEM
+
SCENE ENGINE
```

La Source 03 impose de construire dans cet ordre :

```text
Experience Intent
↓
UX Flow
↓
Static Layout
↓
Interaction States
↓
Basic Motion
↓
Scroll / Transitions
↓
3D Foundation
↓
3D Interaction
↓
Shaders / Advanced Effects
↓
Polish
↓
Accessibility
↓
Performance QA
```



---

# 133 — HANDOFF TO MOTION / 3D

La Phase 6 devra notamment répondre à :

```text
Quel objet 3D représente Jenny ?
Quel est son rôle ?
Quelle scène l'utilise ?
Comment évolue-t-il ?
Quelle caméra l'accompagne ?
Quels éléments sont interactifs ?
Comment le système se dégrade sur mobile ?
Quel est le fallback sans WebGL ?
```

Une scène 3D devra connaître ce qu'elle représente, le contenu qu'elle accompagne et l'information qu'elle transmet.

---

# 134 — FINAL QUALITY GATE

Avant de passer à la Phase 6 :

```text
[✓] Identity defined
[✓] Color roles defined
[✓] Typography roles defined
[✓] Spacing system defined
[✓] Grid direction defined
[✓] Surface language defined
[✓] Depth language defined
[✓] Component philosophy defined
[✓] Media direction defined
[✓] Cat hierarchy defined
[✓] Rabbit hierarchy defined
[✓] Mystery language defined
[✓] Romance language defined
[✓] Investigation language defined
[✓] Horror influence defined
[✓] Bac visual direction defined
[✓] 18 visual direction defined
[✓] Celebration direction defined
[✓] Responsive direction defined
[✓] Accessibility direction defined
[✓] Design QA criteria defined
[✓] Phase 6 handoff defined
```

---

# 135 — FINAL DESIGN PRINCIPLE

Le site ne doit pas ressembler à :

> **un site d'anniversaire avec une belle direction artistique.**

Il doit ressembler à :

> **une expérience numérique qui ne pouvait avoir été conçue que pour Jenny.**

C'est cette distinction qui constitue le véritable objectif de la Phase 5.

---

# 136 — DOCUMENT STATUS

**Phase :** 5 / 7  
**Nom :** Jenny Visual Direction & Design System  
**Statut :** **TERMINÉE**

**Fichier cible :**

```text
Docs/05_JENNY_VISUAL_DIRECTION_DESIGN_SYSTEM.md
```

---

# 137 — PROJECT PIPELINE

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

# 138 — NEXT PHASE

La phase suivante est :

> **PHASE 6 — 3D / MOTION / IMMERSIVE ENGINEERING**

Elle devra transformer le langage visuel et les interactions désormais définis en un **système d'expérience cinématique techniquement implémentable** :

```text
MOTION LANGUAGE
↓
TRANSITION ENGINE
↓
SCENE ENGINE
↓
CAMERA SYSTEM
↓
3D OBJECTS
↓
LIGHTING
↓
PARTICLES
↓
SHADERS
↓
INTERACTION
↓
RESPONSIVE 3D
↓
FALLBACK
↓
PERFORMANCE
↓
ACCESSIBILITY
```

**PHASE 5 est donc officiellement clôturée.**