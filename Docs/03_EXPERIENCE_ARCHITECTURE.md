# PHASE 3 — EXPERIENCE ARCHITECTURE

**Projet : Jenny — 18 ans & Bac**  
**Document : `Docs/03_EXPERIENCE_ARCHITECTURE.md`**  
**Version : 1.0**  
**Statut : PHASE 3 — TERMINÉE**  
**Dépendances :**
- `Docs/01_REVERSE_ENGINEERING_STELLA.md`
- `Docs/02_JENNY_EXPERIENCE_MAP_IDENTITY.md`
- `DIGITAL EXPERIENCE DESIGN SYSTEM.md`
- `DIGITAL EXPERIENCE UX & QUALITY SYSTEM.md`
- `DIGITAL EXPERIENCE 3D & MOTION ENGINEERING SYSTEM.md`

---

# 00 — PURPOSE

Ce document transforme l'identité de Jenny définie en Phase 2 en une **architecture d'expérience complète**.

La Phase 2 répondait à :

> **Qui est Jenny et quelle expérience doit lui correspondre ?**

La Phase 3 répond maintenant à :

> **Comment cette expérience doit-elle être structurée, parcourue, révélée et vécue ?**

Cette architecture constitue le pont entre :

```text
IDENTITY
↓
EXPERIENCE
↓
UX FLOW
↓
SCENES
↓
INTERACTIONS
↓
MOTION
↓
IMPLEMENTATION
```

Elle ne définit pas encore les détails graphiques finaux.

Elle ne définit pas encore le Design System visuel complet.

Elle ne définit pas encore l'implémentation Three.js / React / Supabase.

Elle définit **la structure narrative et fonctionnelle que toutes ces couches devront ensuite servir**.

---

# 01 — ARCHITECTURAL PRINCIPLE

Le projet possède deux expériences distinctes mais reliées :

```text
                    JENNY PROJECT
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
       CONTRIBUTOR                JENNY
       EXPERIENCE                EXPERIENCE
             │                       │
             ↓                       ↓
        CONTRIBUTE                DISCOVER
        SEND                      EXPLORE
        RECORD                    EXPERIENCE
             │                       │
             └───────────┬───────────┘
                         ↓
                  SHARED CONTENT
                         │
          Messages / Photos / Videos
```

Cette séparation est fondamentale.

Le contributeur ne doit pas vivre la même expérience que Jenny.

Le contributeur doit disposer d'un parcours :

> **simple, rapide, clair et humain.**

Jenny doit disposer d'un parcours :

> **immersif, narratif, émotionnel et personnalisé.**

Cette distinction est directement cohérente avec le principe UX qui distingue les expériences orientées tâche des expériences orientées découverte.

---

# 02 — MASTER EXPERIENCE MODEL

L'architecture globale devient :

```text
PUBLIC EXPERIENCE
│
├── Landing / Introduction
├── Invitation
├── Contribution Form
├── Media Upload
├── Confirmation
└── Contributor Exit

PRIVATE EXPERIENCE
│
├── Arrival
├── Opening
├── Identity Reveal
├── Jenny World
├── Memories
├── People
├── Messages
├── Videos
├── Photos
├── BAC
├── 18 YEARS
├── Celebration
└── Finale
```

Mais cette représentation est encore fonctionnelle.

La véritable expérience de Jenny doit être pensée comme une succession de **chapitres émotionnels**.

---

# 03 — EXPERIENCE LEVELS

L'expérience complète possède quatre niveaux.

## Level 01 — ENTRY

Faire comprendre immédiatement ce qui se passe.

## Level 02 — EXPLORATION

Permettre à Jenny de découvrir progressivement son univers.

## Level 03 — EMOTIONAL JOURNEY

Faire émerger progressivement les souvenirs et les personnes.

## Level 04 — CELEBRATION

Faire converger l'expérience vers :

```text
BAC
+
18 ANS
+
PEOPLE
+
FUTURE
```

---

# 04 — GLOBAL ARCHITECTURE

Le parcours de Jenny devient :

```text
01 — ARRIVAL
        ↓
02 — INVITATION
        ↓
03 — RECOGNITION
        ↓
04 — DISCOVERY
        ↓
05 — HER WORLD
        ↓
06 — MEMORIES
        ↓
07 — PEOPLE
        ↓
08 — VOICES
        ↓
09 — IMAGES
        ↓
10 — MILESTONE: BAC
        ↓
11 — MILESTONE: 18
        ↓
12 — CELEBRATION
        ↓
13 — FINALE
```

Cette architecture est volontairement séquentielle au niveau narratif.

Mais la navigation réelle devra permettre une certaine liberté à l'intérieur des chapitres.

---

# 05 — CORE NARRATIVE

Le récit général doit suivre cette logique :

> **Tu arrives dans un endroit qui semble être une expérience mystérieuse. Tu comprends progressivement qu'il a été construit autour de toi. Puis tu découvres que les personnes qui comptent pour toi ont laissé quelque chose ici. Enfin, toutes ces traces convergent vers ce que tu célèbres aujourd'hui : ton bac, tes 18 ans et le début d'une nouvelle étape.**

Ce récit devient le fil directeur du projet.

---

# 06 — CHAPTER 01 — ARRIVAL

## Objectif

Créer la première impression.

## État

```text
BOOT
↓
LOADING
↓
READY
```

Le système technique de référence définit justement ces états comme une base possible pour les expériences complexes.

## Expérience

Jenny arrive dans un environnement sombre et élégant.

Le système doit immédiatement communiquer :

```text
THIS IS FOR YOU.
```

sans nécessairement révéler tout de suite :

```text
WHY
```

---

# 07 — ARRIVAL DESIGN INTENT

L'arrivée doit privilégier :

- espace ;
- silence relatif ;
- contraste ;
- mystère ;
- mouvement subtil ;
- premier indice personnel.

Le site ne doit pas immédiatement exploser en :

```text
🎉 HAPPY BIRTHDAY JENNY 🎉
```

Le premier moment doit être plus subtil.

---

# 08 — ARRIVAL QUESTION

La première scène doit provoquer une question :

> **« Qu'est-ce que c'est ? »**

Puis une seconde :

> **« Pourquoi cela me semble familier ? »**

Puis :

> **« Attends... c'est pour moi ? »**

Cette progression constitue le début de la narration.

---

# 09 — CHAPTER 02 — INVITATION

Après l'arrivée, Jenny doit recevoir une invitation claire à poursuivre.

Elle peut être formulée de manière narrative plutôt que purement fonctionnelle.

Exemple conceptuel :

```text
Something was prepared for you.
```

ou une formulation française adaptée au ton final.

L'objectif n'est pas encore de révéler le contenu.

---

# 10 — ENTRY CONTROL

L'expérience peut proposer une action volontaire avant d'entrer pleinement dans le récit.

Cette action peut servir à :

- démarrer l'expérience ;
- activer éventuellement le son ;
- confirmer l'entrée ;
- déclencher la première transition.

Cela permet également de respecter les contraintes liées à l'autoplay audio.

---

# 11 — CHAPTER 03 — RECOGNITION

C'est ici que les détails personnels commencent à apparaître.

Le système peut introduire progressivement :

```text
RED
BLACK
CAT
RABBIT
MYSTERY
ROMANCE
```

Mais pas comme une liste.

Ces éléments doivent être intégrés dans l'environnement.

---

# 12 — RECOGNITION PRINCIPLE

Le principe devient :

> **Jenny doit reconnaître son univers avant de lire son nom.**

Exemples conceptuels :

```text
un petit chat
↓
un détail rouge
↓
une silhouette
↓
un indice
↓
une référence subtile
↓
"Jenny"
```

La reconnaissance devient ainsi progressive.

---

# 13 — CHAPTER 04 — DISCOVERY

La quatrième étape transforme l'expérience passive en exploration.

Jenny comprend qu'elle peut :

- cliquer ;
- explorer ;
- observer ;
- faire défiler ;
- révéler ;
- interagir.

Toute interaction importante devra néanmoins disposer d'un indice de découverte. Le système UX recommande explicitement qu'une interaction cachée importante dispose d'une affordance ou d'un signal.

---

# 14 — DISCOVERY MODEL

La découverte doit suivre :

```text
VISIBLE
↓
CURIOUS
↓
INTERACTIVE
↓
REVEALED
↓
MEANINGFUL
```

Exemple :

```text
objet visuel
↓
Jenny le remarque
↓
elle interagit
↓
l'objet révèle une information
↓
l'information renvoie à elle
```

---

# 15 — CHAPTER 05 — HER WORLD

Cette section constitue le portrait de Jenny.

Elle ne doit pas être une fiche biographique.

Elle doit fonctionner comme une **représentation expérientielle de son univers**.

Les catégories peuvent être :

```text
WHO SHE IS
WHAT SHE LOVES
WHAT MAKES HER HER
```

---

# 16 — WHO SHE IS

Cette partie peut faire émerger :

- sa franchise ;
- son attention ;
- son caractère direct ;
- son côté émotionnel ;
- son côté humain ;
- son rôle auprès de ses proches.

Mais ces éléments doivent idéalement être exprimés par :

- phrases ;
- anecdotes ;
- micro-textes ;
- contributions ;
- souvenirs.

Pas par une longue biographie.

---

# 17 — WHAT SHE LOVES

Les goûts peuvent apparaître progressivement :

```text
🐱 Chatons
🐇 Lapins
🔴 Rouge
⚫ Noir
🔎 Enquête
👻 Horreur
❤️ Romance
🎬 Anime
```

La priorité reste :

```text
CHATONS
>
LAPINS
```

---

# 18 — PERSONAL EASTER EGGS

Les références secondaires peuvent devenir des easter eggs.

Exemples conceptuels :

- une référence subtile à Maomao ;
- une référence à Jinshi ;
- un détail lié à une phrase connue ;
- une référence à une private joke ;
- un symbole caché.

Ces éléments doivent être optionnels.

Ils ne doivent jamais être nécessaires pour comprendre l'expérience principale.

---

# 19 — CHAPTER 06 — MEMORIES

Cette section introduit les souvenirs.

Elle doit faire évoluer l'expérience de :

```text
ABOUT JENNY
```

vers :

```text
JENNY + HER PEOPLE
```

---

# 20 — MEMORY CONCEPT

Un souvenir peut être composé de :

```text
PERSON
+
CONTEXT
+
MEDIA
+
MESSAGE
```

Mais toutes les contributions n'auront pas nécessairement les quatre éléments.

Le système doit donc supporter :

```text
Message only
Photo only
Video only
Message + Photo
Message + Video
Photo + Video
Message + Photo + Video
```

---

# 21 — CONTRIBUTION DATA MODEL

La contribution devient conceptuellement :

```text
Contribution
│
├── contributor
├── message?
├── photos[]
├── videos[]
├── createdAt
└── metadata
```

Aucun champ de contenu ne doit être obligatoire individuellement.

La règle fonctionnelle globale est :

> **une contribution doit contenir au moins un contenu significatif : message, photo ou vidéo.**

Le contributeur peut donc envoyer :

```text
message
```

ou :

```text
photo
```

ou :

```text
video
```

ou une combinaison.

---

# 22 — CHAPTER 07 — PEOPLE

La dimension relationnelle devient progressivement centrale.

Le site doit faire ressentir :

> **« Ce n'est pas seulement un cadeau créé par Stane. C'est quelque chose que plusieurs personnes ont construit pour toi. »**

---

# 23 — PEOPLE AS CHARACTERS

Les contributeurs peuvent être présentés comme des personnes, pas comme des fichiers.

Par exemple :

```text
WHO
↓
WHAT THEY LEFT
↓
DISCOVER
```

Le nom du contributeur peut devenir une porte vers son contenu.

---

# 24 — CONTRIBUTOR GROUPING

La structure peut éventuellement regrouper :

```text
Friends
Family
Classmates
Close relationships
Other people
```

Mais cette catégorisation ne doit être utilisée que si elle correspond réellement aux données collectées.

Ne pas créer artificiellement des catégories.

---

# 25 — CHAPTER 08 — VOICES

La vidéo devient un pilier majeur.

C'est une décision importante issue du contexte fourni :

> les proches veulent principalement envoyer des vidéos parce qu'elles transmettent davantage la présence humaine.

La vidéo doit donc être traitée comme une **forme narrative de présence**.

---

# 26 — VIDEO EXPERIENCE

Le parcours idéal peut être :

```text
PERSON
↓
INTRODUCTION
↓
ANTICIPATION
↓
VIDEO
↓
AFTERGLOW
```

Après une vidéo, l'interface ne doit pas immédiatement passer à une autre vidéo.

Il peut exister un court espace de respiration.

---

# 27 — VIDEO PLAYER

Le player doit préserver :

- contrôle ;
- pause ;
- volume ;
- progression ;
- accessibilité ;
- mobile usability.

Le système UX exige que l'audio reste contrôlable et que l'utilisateur conserve un sentiment de contrôle.

---

# 28 — VIDEO DISCOVERY

Les vidéos peuvent être présentées sous différentes formes :

```text
Featured video
↓
Video cards
↓
Personal video scenes
↓
Video wall
```

La forme finale sera déterminée en Phase 4/5.

L'architecture impose uniquement leur rôle :

> **faire entendre et voir les personnes.**

---

# 29 — CHAPTER 09 — IMAGES

Les photos ont un rôle différent.

Elles constituent :

> **des traces visuelles de moments partagés.**

Elles peuvent donc fonctionner comme :

- galerie ;
- souvenirs individuels ;
- mosaïque ;
- fragments ;
- images contextuelles.

---

# 30 — PHOTO EXPERIENCE

Une photo peut être présentée avec :

```text
WHO
+
WHEN
+
CONTEXT
+
IMAGE
```

lorsque ces informations sont disponibles.

Il ne faut pas inventer de contexte manquant.

---

# 31 — MEDIA BALANCE

La hiérarchie narrative doit être :

```text
VIDEO
≈
MESSAGE
>
PHOTO
```

non pas parce que la photo est moins importante intrinsèquement, mais parce que le projet cherche à privilégier la présence humaine et la parole.

Cette hiérarchie pourra être réévaluée lorsque les contributions réelles seront connues.

---

# 32 — CHAPTER 10 — MILESTONE: BAC

Cette partie marque une rupture narrative.

Jusqu'ici :

```text
JENNY
+
HER PEOPLE
```

Maintenant :

```text
JENNY
+
HER ACHIEVEMENT
```

---

# 33 — BAC EXPERIENCE

Le bac doit être présenté comme :

```text
EFFORT
↓
PRESSURE
↓
PERSEVERANCE
↓
ACHIEVEMENT
```

et non simplement :

> « Félicitations pour ton bac. »

---

# 34 — BAC EMOTIONAL PURPOSE

Cette scène doit reconnaître le chemin parcouru.

Elle doit célébrer :

- le travail ;
- la persévérance ;
- la réussite ;
- le passage à l'étape suivante.

---

# 35 — BAC CONTENT

Le contenu réel devra être confirmé avant implémentation.

Le système pourra éventuellement accueillir :

- année ;
- filière ;
- mention ;
- message collectif ;
- photos ;
- vidéos ;
- témoignages.

Aucune donnée non fournie ne doit être inventée.

---

# 36 — CHAPTER 11 — 18 YEARS

Le deuxième milestone est :

```text
18 ANS
```

Cette étape doit être distincte du bac.

---

# 37 — 18 EXPERIENCE

Le bac regarde :

```text
WHAT YOU ACHIEVED
```

Les 18 ans regardent :

```text
WHAT COMES NEXT
```

Cette distinction narrative est fondamentale.

---

# 38 — TRANSITION MODEL

Le passage peut devenir :

```text
PAST
↓
PRESENT
↓
FUTURE
```

avec :

```text
BAC
↓
18
↓
NEW CHAPTER
```

---

# 39 — CHAPTER 12 — CELEBRATION

Toutes les dimensions convergent :

```text
JENNY
+
18
+
BAC
+
FRIENDS
+
FAMILY
+
MEMORIES
+
VOICES
```

La scène devient le véritable pic de célébration.

---

# 40 — CELEBRATION PRINCIPLE

La célébration ne doit pas nécessairement être bruyante immédiatement.

Elle peut être construite :

```text
quiet
↓
warm
↓
emotional
↓
expanding
↓
celebration
```

Cette montée émotionnelle permet d'éviter un climax arrivé trop tôt.

---

# 41 — CHAPTER 13 — FINALE

La finale doit être plus simple.

Après l'intensité :

```text
celebration
↓
calm
↓
final message
```

Le système de rythme visuel recommande justement l'alternance entre moments denses, minimalistes, interactifs et immersifs plutôt qu'une succession uniforme d'effets.

---

# 42 — FINAL MESSAGE

La dernière scène doit être personnelle.

Elle ne doit pas ressembler à :

```text
THANK YOU FOR VISITING
```

Elle doit être :

```text
FOR JENNY
```

et laisser une dernière impression durable.

---

# 43 — COMPLETE JENNY JOURNEY

Le parcours complet est donc :

```text
┌──────────────────────────────┐
│ 01 — ARRIVAL                 │
│ "Something is waiting..."    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 02 — INVITATION              │
│ "Enter"                      │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 03 — RECOGNITION             │
│ "This feels like me..."      │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 04 — DISCOVERY               │
│ "Wait... I can interact."    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 05 — HER WORLD               │
│ "They know me."              │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 06 — MEMORIES                │
│ "They remember."             │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 07 — PEOPLE                  │
│ "They came for me."          │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 08 — VOICES                  │
│ "I can hear them."           │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 09 — IMAGES                  │
│ "We lived these moments."    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 10 — BAC                     │
│ "Look what you achieved."    │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 11 — 18 YEARS                │
│ "A new chapter begins."      │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 12 — CELEBRATION             │
│ "This is your moment."       │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│ 13 — FINALE                  │
│ "Made for you."              │
└──────────────────────────────┘
```

---

# 44 — NAVIGATION MODEL

L'expérience ne doit pas être un simple tunnel impossible à quitter.

Le modèle recommandé est :

```text
NARRATIVE FLOW
+
OPTIONAL EXPLORATION
+
GLOBAL ORIENTATION
```

Ainsi :

```text
Story
↓
Chapter
↓
Scene
↓
Content
```

mais Jenny peut également revenir à un chapitre déjà découvert.

---

# 45 — NAVIGATION STATES

La navigation doit permettre de savoir :

```text
WHERE AM I?
WHAT DID I DISCOVER?
WHAT CAN I DO?
WHERE CAN I GO?
```

Le système UX exige précisément que l'immersion conserve des repères comme navigation, titres, labels, progress indicators ou changements d'état.

---

# 46 — CHAPTER NAVIGATION

Une navigation permanente très visible pourrait casser l'immersion.

Il faut donc privilégier une navigation :

```text
DISCREET
+
DISCOVERABLE
+
CONSISTENT
```

Elle peut prendre la forme :

- d'un indicateur de progression ;
- d'un menu minimal ;
- d'un système de chapitres ;
- d'une timeline ;
- d'un bouton d'accès.

Le choix visuel sera traité plus tard.

---

# 47 — PROGRESSIVE DISCLOSURE

Tout ne doit pas être révélé dès l'arrivée.

Architecture :

```text
ARRIVAL
→ minimum information

DISCOVERY
→ personal clues

HER WORLD
→ identity

PEOPLE
→ relationships

MEDIA
→ emotional content

MILESTONES
→ achievement

FINALE
→ meaning
```

Cette logique correspond directement au principe de progressive disclosure du système UX.

---

# 48 — EXPERIENCE STATES

L'expérience globale peut utiliser :

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

Mais chaque chapitre peut également posséder ses propres états.

---

# 49 — SCENE STATE MODEL

Chaque scène peut être modélisée :

```text
LOCKED
↓
AVAILABLE
↓
ENTERING
↓
ACTIVE
↓
COMPLETED
```

Une scène complétée peut devenir :

```text
DISCOVERED
```

sans être supprimée.

---

# 50 — DISCOVERY STATE

Pour les éléments explorables :

```text
UNKNOWN
↓
HINTED
↓
INTERACTED
↓
REVEALED
↓
REMEMBERED
```

Cette architecture permet de créer des easter eggs sans perdre la logique globale.

---

# 51 — EXPERIENCE MEMORY

Le système peut mémoriser :

```text
chapters visited
scenes discovered
media viewed
easter eggs discovered
progress
```

Mais cette mémoire doit rester utile.

Elle ne doit pas être ajoutée uniquement parce que « c'est possible ».

---

# 52 — RETURN EXPERIENCE

Si Jenny quitte puis revient :

elle devrait pouvoir :

```text
Resume
```

plutôt que recommencer nécessairement depuis le début.

Le système peut proposer :

```text
Continue the experience
```

ou un accès aux chapitres déjà découverts.

---

# 53 — CONTRIBUTOR ARCHITECTURE

L'expérience publique doit être radicalement plus simple.

```text
ENTRY
↓
EXPLAIN
↓
CONTRIBUTE
↓
UPLOAD
↓
PREVIEW
↓
SUBMIT
↓
CONFIRM
```

---

# 54 — CONTRIBUTOR ENTRY

Le contributeur arrive sur une landing page qui doit expliquer :

1. pour qui ;
2. pourquoi ;
3. quoi envoyer ;
4. comment ;
5. où cela apparaîtra.

L'expérience doit être compréhensible rapidement.

---

# 55 — CONTRIBUTION FLOW

Le flux recommandé :

```text
01 — INTRO
        ↓
02 — YOUR NAME
        ↓
03 — MESSAGE / PHOTO / VIDEO
        ↓
04 — OPTIONAL ADDITIONS
        ↓
05 — PREVIEW
        ↓
06 — SUBMIT
        ↓
07 — SUCCESS
```

---

# 56 — CONTRIBUTION RULE

La règle fonctionnelle est :

> **Au moins un des trois types de contenu doit être fourni.**

```text
MESSAGE
OR
PHOTO
OR
VIDEO
```

Les trois peuvent être combinés.

---

# 57 — MESSAGE

Le message est facultatif.

S'il est fourni :

```text
message = meaningful content
```

Il peut être :

- court ;
- long ;
- humoristique ;
- affectueux ;
- personnel.

Le système ne doit pas imposer une longueur artificielle sans nécessité.

---

# 58 — PHOTO

La photo est facultative.

Le contributeur peut :

- envoyer une photo ;
- envoyer plusieurs photos si le système le permet ;
- l'associer à un message ;
- l'associer à une vidéo.

L'architecture ne doit pas imposer une combinaison qui n'est pas nécessaire.

---

# 59 — VIDEO

La vidéo est facultative.

Compte tenu du contexte du projet, elle doit cependant bénéficier d'un parcours particulièrement soigné.

Le système doit prévoir :

- sélection ;
- upload ;
- progression ;
- validation ;
- aperçu ;
- gestion d'erreur ;
- confirmation.

---

# 60 — MEDIA UPLOAD STATES

Chaque upload doit gérer :

```text
IDLE
↓
SELECTED
↓
VALIDATING
↓
UPLOADING
↓
PROCESSING
↓
READY
```

et en cas de problème :

```text
ERROR
↓
RECOVER
↓
RETRY
```

Le système UX recommande explicitement de prévoir loading, success, error, empty et recovery.

---

# 61 — PREVIEW

Avant envoi définitif, le contributeur doit pouvoir vérifier :

```text
Name
+
Message
+
Photos
+
Videos
```

Cela réduit les erreurs.

---

# 62 — SUBMISSION SUCCESS

Après envoi :

```text
SUCCESS
```

Le contributeur doit comprendre :

> sa contribution a bien été enregistrée.

Le site peut également expliquer que :

> Jenny la découvrira dans son expérience.

---

# 63 — CONTRIBUTOR FRICTION BUDGET

Le parcours public doit être volontairement léger.

Ne pas demander :

- informations inutiles ;
- compte obligatoire ;
- profil complexe ;
- questionnaire long.

Principe :

```text
MINIMUM INPUT
+
MAXIMUM EMOTIONAL VALUE
```

---

# 64 — CONTENT PIPELINE

Les deux expériences se rejoignent via une couche de contenu.

```text
CONTRIBUTOR
      ↓
VALIDATION
      ↓
STORAGE
      ↓
CONTENT MODEL
      ↓
JENNY EXPERIENCE
```

---

# 65 — CONTENT STATES

Chaque contribution peut avoir :

```text
PENDING
↓
APPROVED
↓
PUBLISHED
```

ou :

```text
PENDING
↓
REJECTED
```

Cette partie devra être précisée techniquement dans les phases d'architecture d'implémentation.

---

# 66 — IMPORTANT PRIVACY PRINCIPLE

La partie contributeur et la partie Jenny ne doivent pas exposer les mêmes informations.

La plateforme doit conceptuellement séparer :

```text
PUBLIC CONTRIBUTION
```

et :

```text
PRIVATE REVEAL
```

Les mécanismes d'accès et de protection seront définis ultérieurement dans l'architecture technique.

---

# 67 — MEDIA COLLECTION ARCHITECTURE

Les contenus doivent être organisés par :

```text
Contributor
↓
Contribution
↓
Media
```

et non uniquement :

```text
all photos
all videos
all messages
```

Cela permet de préserver la relation entre une personne et ce qu'elle a envoyé.

---

# 68 — CONTENT PRESENTATION MODES

Les contenus pourront apparaître sous plusieurs modes :

### Personal

Une personne → son contenu.

### Collective

Plusieurs personnes → un ensemble.

### Randomized

Une découverte imprévisible.

### Curated

Un contenu sélectionné pour un moment précis.

### Sequential

Une progression narrative.

Le mode dépendra du chapitre.

---

# 69 — RANDOMIZATION

Une part de randomisation peut être utilisée pour :

- surprises ;
- ordre des messages ;
- découverte.

Mais le contenu émotionnel critique ne doit pas dépendre d'un ordre aléatoire incontrôlé.

---

# 70 — CURATION

Certains contenus peuvent être réservés aux moments clés.

Exemple :

```text
FINAL VIDEO
```

ne devrait pas nécessairement apparaître aléatoirement au milieu de l'expérience.

---

# 71 — EMOTIONAL PACING

Le contenu doit être distribué selon un rythme.

Éviter :

```text
VIDEO
VIDEO
VIDEO
VIDEO
VIDEO
VIDEO
```

Préférer :

```text
DISCOVERY
↓
MESSAGE
↓
PHOTO
↓
INTERACTION
↓
VIDEO
↓
BREATH
↓
MEMORY
```

---

# 72 — MEDIA BREATHING

Après un contenu émotionnel important, prévoir éventuellement une respiration.

```text
CONTENT
↓
SPACE
↓
AMBIENCE
↓
NEXT CONTENT
```

La respiration devient une partie de l'expérience.

---

# 73 — EXPERIENCE RHYTHM MODEL

Le rythme global peut suivre :

```text
MYSTERY
↓
DISCOVERY
↓
PLAY
↓
MEMORY
↓
EMOTION
↓
ACHIEVEMENT
↓
CELEBRATION
↓
CALM
```

---

# 74 — MOTION ARCHITECTURE

Le mouvement doit être organisé par niveaux :

```text
MICRO
↓
COMPONENT
↓
SECTION
↓
PAGE
↓
SCENE
↓
EXPERIENCE
```

Le système 3D & Motion impose cette hiérarchie et exige que chaque animation possède un trigger, un état et une finalité.

---

# 75 — MOTION ROLE BY CHAPTER

| Chapitre | Motion dominant |
|---|---|
| Arrival | Ambient / Reveal |
| Invitation | Entrance / Transition |
| Recognition | Reveal |
| Discovery | Interactive |
| Her World | Transform / Parallax |
| Memories | Reveal |
| People | Transition / Reveal |
| Voices | Media transition |
| Images | Parallax / Gallery |
| Bac | Transform / Cinematic |
| 18 | Expansion / Reveal |
| Celebration | Celebration motion |
| Finale | Slow / Minimal |

---

# 76 — TRANSITION ARCHITECTURE

Les transitions doivent préserver une continuité.

Le système 3D & Motion définit plusieurs formes de continuité possibles :

```text
SPATIAL
CHROMATIC
TEMPORAL
NARRATIVE
OBJECT
MOVEMENT
```



Pour Jenny, la continuité narrative et chromatique sera particulièrement importante.

---

# 77 — SCENE TRANSITION MODEL

Chaque transition peut être :

```text
CURRENT SCENE
↓
TRANSITION OUT
↓
BRIDGE
↓
TRANSITION IN
↓
NEW SCENE
```

La transition ne doit pas être contrôlée simultanément par plusieurs systèmes indépendants.

---

# 78 — 3D ROLE IN THE ARCHITECTURE

La 3D n'est pas encore définie précisément.

Cependant, son rôle potentiel est :

```text
WORLD
↓
DEPTH
↓
DISCOVERY
↓
TRANSITION
↓
IDENTITY
```

Elle ne doit pas devenir :

```text
3D
↓
because 3D looks cool
```

Le principe technique de référence est explicite : la technologie doit servir l'expérience, et la 3D doit créer de la profondeur plutôt que de la distraction. 

---

# 79 — 3D CANDIDATE LOCATIONS

Les zones pouvant éventuellement bénéficier de 3D sont :

```text
Arrival
Recognition
Discovery
Celebration
```

Les zones de contenu dense comme :

```text
Messages
Forms
Video controls
```

devront privilégier la lisibilité.

---

# 80 — 3D / DOM SEPARATION

Architecture cible :

```text
CORE UI
+
OPTIONAL EXPERIENCE LAYER
```

La couche 3D ne doit jamais être une dépendance critique du contenu.

Si elle échoue :

```text
CORE EXPERIENCE
```

doit rester fonctionnelle.

C'est explicitement recommandé par le système 3D & Motion.

---

# 81 — AUDIO ARCHITECTURE

L'audio peut être utilisé comme couche d'ambiance.

Architecture :

```text
AMBIENT AUDIO
+
MEDIA AUDIO
```

Les deux doivent être distinguables.

L'utilisateur doit pouvoir contrôler l'audio.

---

# 82 — AUDIO RULES

Ne pas :

- lancer un son brutalement ;
- empêcher la navigation ;
- dépendre du son pour comprendre le contenu.

Prévoir :

```text
Sound ON
Sound OFF
```

et une expérience fonctionnelle sans audio.

---

# 83 — MOBILE ARCHITECTURE

Le mobile n'est pas une version réduite du desktop.

Le système de design indique qu'il peut nécessiter :

- navigation simplifiée ;
- réduction des animations ;
- remplacement du hover ;
- adaptation de la 3D ;
- réduction de la densité ;
- changement du storytelling.

Pour Jenny :

```text
DESKTOP
→ immersive / spatial

MOBILE
→ intimate / focused
```

---

# 84 — MOBILE STORYTELLING

Sur mobile :

```text
FULLSCREEN
↓
CONTENT
↓
SWIPE / SCROLL
↓
REVEAL
```

plutôt qu'une multiplication d'interactions complexes.

---

# 85 — TOUCH MODEL

Les interactions critiques doivent être compatibles avec :

```text
tap
swipe
scroll
drag
```

et ne doivent jamais dépendre uniquement du hover.

Le système UX interdit explicitement de faire reposer une fonctionnalité importante uniquement sur le hover.

---

# 86 — REDUCED MOTION ARCHITECTURE

Lorsque :

```text
prefers-reduced-motion
```

est actif :

```text
FULL MOTION
↓
REDUCED MOTION
```

avec :

- moins de parallax ;
- moins de mouvement continu ;
- transitions simplifiées ;
- caméra stabilisée ;
- effets décoratifs réduits.

Le contenu et la navigation doivent rester identiques.

---

# 87 — FAILURE ARCHITECTURE

Une expérience avancée doit être conçue pour survivre aux défaillances.

Exemple :

```text
3D FAILED
↓
DOM EXPERIENCE
```

```text
VIDEO FAILED
↓
ERROR + RETRY
```

```text
IMAGE FAILED
↓
PLACEHOLDER / CONTEXT
```

```text
DATA EMPTY
↓
EMPTY STATE
```

---

# 88 — LOADING ARCHITECTURE

L'ordre de chargement doit privilégier :

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

Cette logique correspond au principe d'initialisation progressive du système 3D & Motion.

---

# 89 — PERFORMANCE PRIORITY

La performance ne doit jamais être sacrifiée pour maintenir un effet.

Hiérarchie :

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

Si nécessaire, les couches basses peuvent être dégradées.

---

# 90 — EXPERIENCE DEGRADATION

Architecture :

```text
FULL EXPERIENCE
        ↓
SIMPLIFIED EXPERIENCE
        ↓
CORE EXPERIENCE
```

La version minimale doit préserver :

```text
CONTENT
NAVIGATION
IDENTITY
ACTION
```

comme le recommande explicitement le système 3D & Motion.

---

# 91 — ACCESSIBILITY ARCHITECTURE

L'expérience doit conserver :

```text
semantic HTML
keyboard access
focus
contrast
labels
media alternatives
reduced motion
```

L'accessibilité doit être intégrée dès la conception, pas ajoutée après coup.

---

# 92 — KEYBOARD EXPERIENCE

Les fonctionnalités essentielles doivent être utilisables au clavier :

```text
Tab
Shift + Tab
Enter
Space
Escape
Arrow keys when relevant
```

---

# 93 — FOCUS ARCHITECTURE

Lorsqu'un élément ouvre :

- modal ;
- galerie ;
- menu ;
- vidéo ;
- panneau ;

le focus doit être géré correctement.

---

# 94 — EXPERIENCE INFORMATION ARCHITECTURE

La hiérarchie finale devient :

```text
PROJECT
│
├── CONTRIBUTOR EXPERIENCE
│   │
│   ├── Landing
│   ├── Contribution
│   ├── Media Upload
│   ├── Preview
│   └── Confirmation
│
└── JENNY EXPERIENCE
    │
    ├── Arrival
    ├── Invitation
    ├── Recognition
    ├── Discovery
    ├── Her World
    ├── Memories
    ├── People
    ├── Voices
    ├── Images
    ├── Bac
    ├── 18
    ├── Celebration
    └── Finale
```

---

# 95 — CONTENT ARCHITECTURE

```text
PROJECT
│
├── Person
│   └── Jenny
│
├── Milestones
│   ├── Bac
│   └── 18
│
├── Contributors
│   ├── Person
│   └── Contribution
│
└── Media
    ├── Message
    ├── Photo
    └── Video
```

---

# 96 — EXPERIENCE OBJECT MODEL

Conceptuellement :

```text
Experience
│
├── Chapters[]
│
├── Scenes[]
│
├── Interactions[]
│
├── Contributions[]
│
├── Media[]
│
├── Milestones[]
│
└── Progress
```

---

# 97 — SCENE OBJECT MODEL

Chaque scène peut être décrite :

```text
Scene
│
├── id
├── purpose
├── narrativeRole
├── content
├── entryState
├── activeState
├── exitState
├── interactions
├── motion
├── media
└── fallback
```

Cette structure devra guider l'architecture technique future.

---

# 98 — EXPERIENCE ENGINE CONCEPT

Le projet peut être considéré comme un petit moteur d'expérience :

```text
ExperienceEngine
│
├── State
├── Progress
├── Scene
├── Timeline
├── Input
├── Transition
├── Media
├── Audio
├── Renderer
└── Accessibility
```

Cette approche correspond au modèle recommandé par le système 3D & Motion pour les expériences complexes.

---

# 99 — STATE OWNERSHIP

Il faut éviter plusieurs sources de vérité.

Architecture recommandée :

```text
USER INPUT
      ↓
EXPERIENCE STATE
      ↓
SCENE STATE
      ↓
UI / MOTION / 3D
```

et non :

```text
UI
↘
Motion → state
↗
3D
```

Cette centralisation évite les conflits.

---

# 100 — ROUTING VS EXPERIENCE STATE

Le routing doit gérer :

```text
URL / ACCESS
```

L'Experience State doit gérer :

```text
progress
chapter
scene
discovery
media
```

Les deux doivent pouvoir coopérer sans devenir le même système.

---

# 101 — TRANSITION OWNERSHIP

Une transition doit avoir une source de vérité.

Architecture :

```text
Navigation
↓
Transition Controller
↓
Experience State
↓
New Scene
```

Cela suit le principe du système 3D & Motion concernant la propriété des transitions.

---

# 102 — EXPERIENCE HIERARCHY

La hiérarchie complète devient :

```text
PROJECT
↓
EXPERIENCE
↓
CHAPTER
↓
SCENE
↓
PATTERN
↓
COMPONENT
↓
PRIMITIVE
```

Cette structure est cohérente avec l'organisation proposée par le Design System :

```text
Tokens
↓
Primitives
↓
Components
↓
Patterns
↓
Sections
↓
Pages
↓
Experiences
```



---

# 103 — QUALITY GATES

La Phase 3 doit transmettre des checkpoints aux phases suivantes.

## Gate 01 — Intent

Chaque scène possède-t-elle une intention ?

## Gate 02 — UX

Le parcours est-il compréhensible ?

## Gate 03 — Narrative

Chaque scène possède-t-elle une raison d'exister ?

## Gate 04 — Interaction

Chaque interaction critique possède-t-elle un feedback ?

## Gate 05 — Motion

Chaque mouvement possède-t-il une raison ?

## Gate 06 — Accessibility

Le contenu reste-t-il accessible ?

## Gate 07 — Responsive

Le parcours fonctionne-t-il sur mobile ?

## Gate 08 — Performance

Les effets avancés sont-ils dégradables ?

Ces gates suivent directement le système qualité qui recommande de ne pas passer directement de l'idée au code et d'utiliser des checkpoints successifs.

---

# 104 — EXPERIENCE ANTI-PATTERNS

Le projet ne doit pas devenir :

```text
❌ scroll hijacking agressif
❌ infinite animation
❌ 3D partout
❌ loader interminable
❌ navigation cachée sans indice
❌ vidéos impossibles à contrôler
❌ contenu essentiel enfermé dans WebGL
❌ autoplay audio non contrôlé
❌ interactions dépendantes du hover
❌ surcharge d'easter eggs
❌ tunnel impossible à quitter
❌ effets sans fonction narrative
```

Ces interdictions sont cohérentes avec les anti-patterns définis par le système UX.

---

# 105 — EXPERIENCE PRINCIPLE

La règle centrale de cette architecture devient :

> **Jenny doit pouvoir se laisser guider par l'expérience sans jamais avoir l'impression que le site décide à sa place.**

Donc :

```text
GUIDED
≠
FORCED
```

---

# 106 — EMOTIONAL PEAK DESIGN

Il ne doit pas y avoir un seul pic émotionnel.

Le parcours peut avoir plusieurs pics :

```text
PEAK 01
Recognition
      ↓
PEAK 02
First personal video
      ↓
PEAK 03
Collective memories
      ↓
PEAK 04
BAC
      ↓
PEAK 05
18 years
      ↓
PEAK 06
Final celebration
```

La dernière partie doit néanmoins rester le point de convergence principal.

---

# 107 — EMOTIONAL BREATHING

Entre deux pics :

```text
PEAK
↓
BREATH
↓
DISCOVERY
↓
PEAK
```

Cette architecture empêche l'expérience de devenir émotionnellement monotone.

---

# 108 — PERSONALITY → ARCHITECTURE MAPPING

| Jenny | Traduction architecture |
|---|---|
| Chatons | Symboles / easter eggs / moments doux |
| Lapins | Symboles secondaires |
| Rouge | Accent narratif |
| Noir | Atmosphère / profondeur |
| Horreur | Mystère / tension |
| Enquête | Discovery mechanics |
| Romance | Moments de chaleur |
| Anime | Easter eggs |
| Franchise | Ton direct |
| Attention | Human-centered content |
| Émotion | Media / voices |
| Bac | Milestone chapter |
| 18 ans | Transition chapter |
| Amis | Collective narrative |

---

# 109 — STORYTELLING FORMULA

Le récit peut être résumé par :

```text
WHO ARE YOU?
      ↓
WHAT MAKES YOU YOU?
      ↓
WHO KNOWS YOU?
      ↓
WHAT DID THEY LEAVE?
      ↓
WHAT HAVE YOU ACHIEVED?
      ↓
WHERE ARE YOU GOING?
      ↓
THIS MOMENT IS YOURS.
```

---

# 110 — EXPERIENCE FORMULA

La formule globale devient :

```text
IDENTITY
+
DISCOVERY
+
RELATIONSHIPS
+
MEMORIES
+
MEDIA
+
ACHIEVEMENT
+
CELEBRATION
=
JENNY EXPERIENCE
```

---

# 111 — ARCHITECTURAL DECISION: TWO WORLDS

Le projet sera officiellement conçu comme deux mondes :

```text
WORLD A
CONTRIBUTOR WORLD

WORLD B
JENNY WORLD
```

Ils partagent :

```text
DATA
MEDIA
IDENTITY
```

mais pas :

```text
UX
NAVIGATION
NARRATIVE
COMPLEXITY
```

---

# 112 — ARCHITECTURAL DECISION: CONTRIBUTOR SIMPLICITY

Le monde contributeur doit rester :

```text
FAST
CLEAR
FRICTIONLESS
```

L'objectif est que quelqu'un puisse contribuer sans avoir besoin de comprendre toute la logique du projet.

---

# 113 — ARCHITECTURAL DECISION: JENNY IMMERSION

Le monde Jenny doit être :

```text
DISCOVERABLE
EMOTIONAL
PERSONAL
CINEMATIC
INTERACTIVE
```

La sophistication est autorisée ici parce qu'elle sert une expérience de découverte.

---

# 114 — ARCHITECTURAL DECISION: CONTENT FIRST

L'architecture confirme définitivement :

```text
CONTENT
↓
EXPERIENCE
↓
DESIGN
↓
MOTION
↓
3D
```

et jamais :

```text
3D
↓
find something to put inside
```

Cette hiérarchie est directement alignée sur le Design System et le système 3D & Motion. 

---

# 115 — ARCHITECTURAL DECISION: PROGRESSIVE ENHANCEMENT

Le site sera conçu par couches :

```text
LAYER 01
Semantic content

LAYER 02
Visual experience

LAYER 03
Interaction

LAYER 04
Motion

LAYER 05
3D

LAYER 06
Advanced rendering
```

Cette structure est explicitement recommandée par le système 3D & Motion.

---

# 116 — FINAL EXPERIENCE MAP

```text
                         JENNY
                           │
                     ARRIVAL WORLD
                           │
                    "Something waits"
                           ↓
                       DISCOVERY
                           │
                  "This is about me"
                           ↓
                       HER WORLD
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
          TASTES        PERSONALITY    EASTER EGGS
             │             │             │
             └─────────────┼─────────────┘
                           ↓
                       MEMORIES
                           │
                           ↓
                         PEOPLE
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
           MESSAGES      PHOTOS       VIDEOS
              │            │            │
              └────────────┼────────────┘
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

# 117 — FINAL UX MAP

```text
DISCOVERY
   ↓
ORIENTATION
   ↓
EXPLORATION
   ↓
RECOGNITION
   ↓
EMOTIONAL DISCOVERY
   ↓
RELATIONSHIP
   ↓
MEMORY
   ↓
ACHIEVEMENT
   ↓
CELEBRATION
   ↓
CLOSURE
```

---

# 118 — IMPLEMENTATION HANDOFF

La Phase 3 transmet aux phases suivantes :

### UX

```text
User journeys
Chapter structure
Navigation model
Interaction model
States
Fallbacks
Responsive behavior
```

### Design

```text
Scene hierarchy
Content hierarchy
Visual rhythm
Chapter distinction
Media presentation
```

### Motion

```text
Scene transitions
Reveal moments
Emotional pacing
Motion hierarchy
```

### 3D

```text
Potential 3D zones
Scene boundaries
Camera narrative opportunities
Fallback requirements
```

### Data

```text
Contributor
Contribution
Message
Photo
Video
Milestone
Progress
```

---

# 119 — NEXT PHASE DEPENDENCIES

La Phase 4 devra transformer cette architecture en une **UX/UI Flow Specification détaillée**.

Elle devra notamment définir :

```text
SCREEN
↓
USER ACTION
↓
SYSTEM RESPONSE
↓
STATE
↓
FEEDBACK
↓
NEXT ACTION
```

pour chaque parcours.

---

# 120 — PHASE 4 INPUT

La Phase 4 recevra comme entrée :

```text
Phase 1
Reverse Engineering Stella
        +
Phase 2
Jenny Identity
        +
Phase 3
Experience Architecture
```

et devra produire :

```text
Detailed UX Flow
+
Interaction Specification
+
Screen/Scene Inventory
+
State Matrix
```

---

# 121 — PHASE 3 SUCCESS CRITERIA

La Phase 3 est considérée comme réussie si l'équipe de développement peut répondre à :

### Où commence l'expérience ?

**Arrival.**

### Comment Jenny comprend-elle que c'est pour elle ?

**Recognition progressive.**

### Comment découvre-t-elle son univers ?

**Discovery + Her World.**

### Comment les proches entrent-ils dans l'expérience ?

**Memories + People.**

### Comment les vidéos sont-elles intégrées ?

**Voices / human presence.**

### Comment les photos sont-elles intégrées ?

**Images / memories.**

### Comment les messages sont-ils intégrés ?

**Voices / messages / personal memories.**

### Comment le bac intervient-il ?

**Milestone chapter.**

### Comment les 18 ans interviennent-ils ?

**New chapter / transition.**

### Où se trouve le climax ?

**Celebration.**

### Comment termine-t-on ?

**Calm, personal finale.**

---

# 122 — FINAL ARCHITECTURAL PRINCIPLE

Le projet ne doit pas être construit comme :

```text
HOME
+
ABOUT
+
GALLERY
+
VIDEOS
+
BIRTHDAY
```

Il doit être construit comme :

```text
A JOURNEY
```

Une journey qui commence par :

> **« Qu'est-ce que c'est ? »**

continue par :

> **« C'est moi. »**

puis :

> **« Ils ont pensé à moi. »**

puis :

> **« Ils ont laissé quelque chose pour moi. »**

puis :

> **« J'ai réussi. »**

puis :

> **« J'ai 18 ans. »**

et termine par :

> **« Cette expérience a été créée pour moi. »**

---

# 123 — MASTER RULE

> **THE WEBSITE IS NOT A COLLECTION OF PAGES.**
>
> **IT IS A STORY THAT HAPPENS TO BE INTERACTIVE.**

Mais cette narration doit rester utilisable, accessible, responsive et contrôlable.

C'est précisément l'équilibre défini par les sources Digital Experience :

```text
CLARITY
+
DEPTH
+
COMPLEXITY
```

et non :

```text
COMPLEXITY
+
EFFECTS
+
TECHNOLOGY
```

Le Design System impose que la hiérarchie précède les effets, tandis que le système UX rappelle que l'expérience doit permettre de comprendre, explorer, agir, ressentir et progresser. 

---

# 124 — DOCUMENT STATUS

**Phase :** 3 / 7  
**Nom :** Experience Architecture  
**Statut :** **TERMINÉE**

**Nom de fichier :**

```text
Docs/03_EXPERIENCE_ARCHITECTURE.md
```

---

# 125 — PROJECT PIPELINE

Le projet est maintenant :

```text
PHASE 1
Reverse Engineering Stella
        ↓
PHASE 2
Jenny Experience Map & Identity
        ↓
PHASE 3
Experience Architecture
        ↓
PHASE 4
UX/UI FLOW & INTERACTION SPECIFICATION
        ↓
PHASE 5
JENNY DESIGN DIRECTION & DESIGN SYSTEM
        ↓
PHASE 6
3D / MOTION / IMMERSIVE ENGINEERING
        ↓
PHASE 7
TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT
```

**PHASE 3 EST DONC CLÔTURÉE.**

La prochaine étape est :

> **PHASE 4 — UX/UI FLOW & INTERACTION SPECIFICATION**

Elle devra maintenant prendre chaque chapitre et chaque parcours défini ici pour descendre au niveau **écran/scène → action → état → feedback → transition → contenu → comportement mobile/desktop**, avant de passer au langage visuel détaillé.