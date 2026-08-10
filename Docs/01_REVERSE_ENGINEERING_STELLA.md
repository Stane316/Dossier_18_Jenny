# PHASE 1 — REVERSE ENGINEERING DU SITE STELLA

**Document de référence — `Docs/01_REVERSE_ENGINEERING_STELLA.md`**
**Projet : Jenny — 18 ans & Bac**
**Version : 1.0**
**Statut : Phase 1 — Analyse de référence**

---

## 00 — OBJECTIF DU DOCUMENT

Ce document constitue le premier livrable du projet.

Son objectif n'est pas de reproduire le site de Stella, mais de **comprendre son système**, d'identifier ses choix fonctionnels et expérientiels, puis de déterminer :

* ce qui constitue sa base fonctionnelle ;
* ce qui fonctionne bien ;
* ce qui peut être conservé ;
* ce qui doit être amélioré ;
* ce qui doit être abandonné ;
* ce qui peut être transformé pour Jenny ;
* quelles opportunités permettent de dépasser significativement l'expérience précédente.

Le principe méthodologique retenu est :

```text
REFERENCE
    ↓
UNDERSTAND
    ↓
ABSTRACT
    ↓
ADAPT
    ↓
PERSONALIZE
    ↓
ELEVATE
```

Cette logique correspond directement au principe `REFERENCE → ADAPTATION → ELEVATION` du système UX. 

---

# 01 — SOURCES ANALYSÉES

## 01.1 — Site de référence

Le projet précédent fourni comme référence est :

**Site public**

[anniversaire-stella.netlify.app](https://anniversaire-stella.netlify.app/?utm_source=chatgpt.com)

**Espace surprise**

[anniversaire-stella — espace surprise](https://anniversaire-stella.netlify.app/surprise?utm_source=chatgpt.com)

---

## 01.2 — Sources Digital Experience

L'analyse est également confrontée aux trois documents de référence du projet :

```text
DIGITAL EXPERIENCE DESIGN SYSTEM
                +
DIGITAL EXPERIENCE UX & QUALITY SYSTEM
                +
DIGITAL EXPERIENCE 3D & MOTION ENGINEERING SYSTEM
```

Ces documents établissent notamment la hiérarchie :

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

La technologie ne doit donc jamais devenir le point de départ de la conception. 

---

# 02 — LIMITES DE L'INSPECTION

Une distinction importante doit être faite entre :

### Ce qui a été directement observable

L'espace `/surprise` est actuellement accessible et son interface textuelle peut être inspectée.

Il expose notamment :

* un accès privé ;
* un code secret ;
* un bouton d'ouverture ;
* un livre d'or ;
* une introduction narrative ;
* une collection de messages ;
* des enveloppes ;
* une notion de personnes proches ;
* un état de chargement ;
* un état vide. ([anniversaire-stella.netlify.app][1])

### Ce qui n'est pas actuellement observable

La partie publique racine n'a pas pu être inspectée correctement par le crawler web au moment de cette analyse.

Il serait donc incorrect d'inventer :

* ses écrans exacts ;
* ses animations ;
* sa structure exacte ;
* ses composants ;
* son système de contribution ;
* son comportement responsive ;
* son architecture technique.

Ces éléments sont donc marqués **À VÉRIFIER** dans ce document.

Cette distinction est importante : ce document doit servir de source de vérité au futur développement, et non introduire des suppositions comme si elles avaient été observées.

---

# 03 — MODÈLE GLOBAL DU SITE STELLA

À partir des informations disponibles et de ton explication du fonctionnement réel du projet, l'expérience précédente peut être modélisée ainsi :

```text
                    SITE STELLA
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
       ESPACE PARTICIPANTS      ESPACE STELLA
             │                       │
             │                       │
      Contributions              Accès privé
             │                       │
     ┌───────┼───────┐               ▼
     │       │       │          Livre d'Or
     ▼       ▼       ▼               │
 Messages  Photos  Médias           ▼
                             Enveloppes / messages
```

Le concept fondamental est donc celui d'une **expérience en deux temps** :

```text
COLLECTE
   ↓
RÉVÉLATION
```

C'est une excellente base pour le nouveau projet.

---

# 04 — CONCEPT FONCTIONNEL DU SITE STELLA

Le cœur du système précédent semble reposer sur une idée simple :

> **plusieurs personnes contribuent à créer une expérience qui sera révélée ultérieurement à la personne célébrée.**

Cela transforme le site en quelque chose de plus intéressant qu'une page d'anniversaire.

Il devient un **système collectif de création de souvenir**.

La valeur du site ne vient donc pas uniquement du frontend.

Elle vient de la relation :

```text
CONTRIBUTEURS
      ↓
CONTENU HUMAIN
      ↓
AGRÉGATION
      ↓
EXPÉRIENCE
      ↓
STELLA
```

C'est ce modèle qu'il faut absolument conserver pour Jenny.

---

# 05 — ESPACE PARTICIPANTS

## 05.1 — Fonction

L'espace participants sert à recueillir les contributions des proches.

Dans la version Stella, le contenu était principalement pensé autour des messages et des photos, selon le fonctionnement que tu as décrit.

Pour Jenny, cette logique doit évoluer.

---

## 05.2 — Nouveau modèle de contribution

Le futur système doit accepter trois types de contenu :

```text
MESSAGE
PHOTO
VIDÉO
```

Le contributeur doit fournir **au moins un contenu**.

Donc :

```text
Message seul       ✓
Photo seule        ✓
Vidéo seule        ✓

Message + Photo    ✓
Message + Vidéo    ✓
Photo + Vidéo      ✓
Message + Photo
       + Vidéo     ✓
```

Mais :

```text
Aucun contenu      ✗
```

---

## 05.3 — Principe UX

Le système ne doit pas donner l'impression de remplir un formulaire administratif.

L'objectif est :

> **permettre à quelqu'un de laisser quelque chose de personnel à Jenny avec le minimum de friction.**

Cela correspond directement au principe UX :

```text
USER
↓
INTENT
↓
CONTENT
↓
EXPERIENCE
↓
INTERACTION
↓
DESIGN
↓
TECHNOLOGY
```



---

# 06 — LE FORMAT VIDÉO DEVIENT CENTRAL

C'est une différence majeure entre Stella et Jenny.

Pour Jenny, la vidéo n'est pas simplement :

> « un type de média supplémentaire ».

Elle doit être considérée comme une **modalité émotionnelle majeure**.

Pourquoi ?

Parce qu'une vidéo permet de transmettre :

* voix ;
* expression ;
* ton ;
* sourire ;
* hésitation ;
* humour ;
* émotion ;
* personnalité.

Cela rapproche beaucoup plus la contribution d'une présence humaine réelle.

Le système devra donc être pensé pour que la vidéo soit :

```text
FIRST-CLASS CONTENT
```

et non une fonctionnalité secondaire.

---

# 07 — ESPACE PRIVÉ DE STELLA : STRUCTURE OBSERVÉE

La page `/surprise` expose actuellement une structure très claire.

## 07.1 — Accès privé

Le premier niveau affiche :

> **Accès privé**

avec la précision que le livre est réservé à Stella, puis un champ de code secret et un bouton permettant de l'ouvrir. ([anniversaire-stella.netlify.app][1])

Architecture :

```text
PRIVATE EXPERIENCE
       ↓
IDENTIFICATION / SECRET
       ↓
OPEN
```

### Ce qui fonctionne

Le concept crée immédiatement :

* exclusivité ;
* curiosité ;
* sentiment de cadeau ;
* séparation entre contributeurs et destinataire.

### Ce qui devra être amélioré pour Jenny

Le futur accès privé ne doit pas nécessairement être une simple page de connexion classique.

Il peut devenir **le premier acte de l'expérience**.

Par exemple :

```text
UNKNOWN
   ↓
RECOGNITION
   ↓
"JENNY"
   ↓
ACCESS
   ↓
EXPERIENCE
```

Le secret pourrait devenir un élément narratif plutôt qu'un simple champ.

---

# 08 — LE « LIVRE D'OR »

Le deuxième niveau observable est présenté comme :

> **Livre d'Or**

avec le sous-titre :

> **Un jardin de mots tendres**

Puis :

> **Tous les messages pour cette journée spéciale.**

([anniversaire-stella.netlify.app][1])

Cette structure révèle une décision importante du site Stella :

### Le contenu est présenté comme un objet émotionnel.

Il ne s'agit pas simplement d'une liste de données.

```text
messages
```

est transformé conceptuellement en :

```text
livre
```

et les messages sont transformés en :

```text
souvenirs
```

C'est une très bonne décision d'expérience.

---

# 09 — LA MÉTAPHORE DES ENVELOPPES

La phrase observable est particulièrement importante :

> « Chaque enveloppe renferme un souvenir. » ([anniversaire-stella.netlify.app][1])

L'enveloppe constitue donc une **métaphore d'interface**.

Le système transforme :

```text
DATABASE RECORD
```

en :

```text
ENVELOPE
```

puis :

```text
ENVELOPE
↓
OPEN
↓
MEMORY
```

C'est précisément le type de transformation que nous devons conserver dans l'esprit du futur projet.

---

# 10 — POURQUOI LA MÉTAPHORE EST BONNE

Une liste de messages aurait été :

```text
Message 01
Message 02
Message 03
Message 04
```

L'enveloppe crée au contraire :

```text
objet
↓
curiosité
↓
interaction
↓
révélation
↓
émotion
```

Elle introduit donc une **micro-narration dans chaque contenu**.

C'est une force majeure du concept Stella.

---

# 11 — MAIS LES ENVELOPPES NE DOIVENT PAS ÊTRE COPIÉES TELLES QUELLES

C'est une distinction essentielle.

Nous pouvons conserver :

> **la mécanique de révélation progressive**

sans nécessairement conserver :

> **l'enveloppe comme objet principal.**

Pour Jenny, nous pourrions éventuellement avoir plusieurs métaphores :

```text
ENVELOPPE
CARTE
PHOTO
INDICE
VIDÉO
OBJET
FRAGMENT
MESSAGE
SOUVENIR
```

La décision sera prise en Phase 3 et Phase 5.

La référence Stella fournit donc un **pattern**, pas une contrainte esthétique.

---

# 12 — « OUVRE-LES DANS L'ORDRE QUI TE TOUCHE LE PLUS »

Le site Stella indique explicitement que les enveloppes peuvent être ouvertes selon l'ordre choisi par la destinataire. ([anniversaire-stella.netlify.app][1])

Cela constitue un principe UX intéressant :

```text
SYSTEM PROVIDES CONTENT
        ↓
USER CHOOSES THE ORDER
```

La destinataire conserve donc une certaine liberté.

Pour Jenny, nous devons conserver cette idée de **contrôle émotionnel**.

Une expérience immersive ne signifie pas :

> « le système décide de tout ».

Elle peut être :

> **guidée mais libre.**

C'est cohérent avec le principe UX selon lequel l'immersion ne doit jamais supprimer le contrôle utilisateur. 

---

# 13 — « EXPLORER LE LIVRE »

L'interface expose également une action :

> **Explorer le livre**

puis une indication :

> **Défiler**. ([anniversaire-stella.netlify.app][1])

Cela suggère une expérience de type **scroll-driven exploration**.

C'est une mécanique que le projet Jenny pourra pousser beaucoup plus loin.

Le système de motion recommande justement de considérer le scroll comme une valeur normalisée pouvant piloter :

```text
timeline
camera
object
content
transition
```



---

# 14 — ÉTAT DE CHARGEMENT

La page Stella expose :

```text
0 messages collectés
Chargement des messages...
```

Cela montre que le contenu n'est pas purement statique.

Il existe une couche dynamique :

```text
UI
↓
DATA
↓
LOADING
↓
CONTENT
```

C'est important pour notre architecture future.

---

# 15 — ÉTAT VIDE

La page expose également :

> **Aucun message encore**

avec l'explication :

> Les invités n'ont pas encore envoyé de messages. ([anniversaire-stella.netlify.app][1])

C'est un bon exemple de **graceful empty state**.

Le système UX impose justement que les expériences anticipent :

```text
Loading
Loaded
Empty
Error
Success
Disabled
```



---

# 16 — SECTION « POUR TOI EN PREMIER »

Un autre élément particulièrement intéressant est :

> **Pour toi en premier**

puis :

> **Des personnes qui te sont les plus proches**

avec l'instruction :

> ouvrir ces enveloppes en premier. ([anniversaire-stella.netlify.app][1])

Cette fonctionnalité introduit une notion de **priorisation émotionnelle**.

Tous les messages ne sont donc pas nécessairement équivalents.

Il existe :

```text
GENERAL CONTENT
```

et :

```text
PRIORITY CONTENT
```

---

# 17 — C'EST UNE IDÉE À CONSERVER POUR JENNY

Mais nous pouvons la pousser beaucoup plus loin.

Au lieu de simplement :

```text
Messages proches
↓
Ouvre-les en premier
```

nous pourrions avoir :

```text
PEOPLE
↓
RELATION
↓
MEMORY
↓
EMOTIONAL WEIGHT
```

Cela permettra potentiellement de construire des catégories narratives :

```text
LES INCONTOURNABLES
LES FOUS RIRES
LES SOUVENIRS
LES MOTS QUI FONT DU BIEN
LES VIDÉOS
LES SURPRISES
```

Ces catégories ne sont **pas encore validées** : elles seront décidées pendant les prochaines phases.

---

# 18 — ARCHITECTURE ÉMOTIONNELLE DE STELLA

En abstraisant le site, on obtient :

```text
        ACCESS PRIVÉ
             ↓
          CONTEXTE
             ↓
         COLLECTION
             ↓
         EXPLORATION
             ↓
          SÉLECTION
             ↓
          OUVERTURE
             ↓
         SOUVENIR
```

C'est probablement le pattern le plus précieux que nous récupérons de Stella.

---

# 19 — CE QUI DOIT ÊTRE CONSERVÉ

## P01 — Double espace

```text
CONTRIBUTEURS
      +
DESTINATAIRE
```

**Décision : CONSERVER**

---

## P02 — Collecte de contenu personnel

**Décision : CONSERVER**

Mais étendre :

```text
message
photo
vidéo
```

---

## P03 — Accès privé

**Décision : CONSERVER**

Mais transformer l'accès en partie de l'expérience.

---

## P04 — Métaphore émotionnelle

Le « Livre d'Or » transforme le contenu numérique en objet affectif.

**Décision : CONSERVER LE PRINCIPE**

Pas nécessairement la métaphore exacte.

---

## P05 — Révélation progressive

**Décision : CONSERVER**

C'est une des fondations du projet Jenny.

---

## P06 — Liberté d'exploration

**Décision : CONSERVER**

Jenny doit pouvoir explorer à son rythme.

---

## P07 — Contenu prioritaire

**Décision : CONSERVER ET APPROFONDIR**

---

## P08 — États dynamiques

Loading, empty, success, etc.

**Décision : CONSERVER ET ÉTENDRE**

---

# 20 — CE QUI DOIT ÊTRE AMÉLIORÉ

## 20.1 — Profondeur narrative

Stella semble principalement articuler :

```text
Livre
↓
Messages
↓
Enveloppes
```

Jenny devra aller vers :

```text
PERSONNE
↓
HISTOIRE
↓
RELATION
↓
SOUVENIR
↓
ÉMOTION
↓
RÉVÉLATION
```

---

## 20.2 — Médias

Le système doit passer de :

```text
message-centric
```

à :

```text
multimedia-centric
```

avec la vidéo comme contenu de premier ordre.

---

## 20.3 — Personnalisation

Stella possède une identité générale d'anniversaire.

Jenny devra posséder une identité **intrinsèquement liée à elle**.

---

## 20.4 — Interaction

L'ouverture d'une enveloppe est une interaction.

Pour Jenny, les interactions pourront être plus variées :

```text
tap
click
scroll
drag
hover
explore
choose
open
discover
watch
listen
```

mais seulement lorsque chacune apporte une vraie valeur.

---

# 21 — CE QUI DOIT ÊTRE ABANDONNÉ

Certaines choses ne doivent surtout pas être copiées mécaniquement.

### ❌ Direction artistique générique d'anniversaire

Pas de :

```text
rose
ballons
confettis
cœurs génériques
```

simplement parce qu'il s'agit d'un anniversaire.

Jenny déteste le rose.

---

### ❌ Copie de l'architecture visuelle Stella

Le futur site doit être une nouvelle expérience.

---

### ❌ Motion gratuite

Le système 3D & Motion impose :

> **EVERY MOVEMENT MUST HAVE A REASON.**



---

### ❌ 3D pour démontrer la technologie

La 3D doit créer :

* profondeur ;
* narration ;
* identité ;
* interaction ;
* immersion.

Elle ne doit pas devenir une démonstration technique. 

---

# 22 — PREMIÈRE MATRICE DE COMPARAISON

| Dimension             | Stella                                    | Jenny                              |
| --------------------- | ----------------------------------------- | ---------------------------------- |
| Destinataire          | Stella                                    | Jenny                              |
| Contribution          | Messages / photos selon système précédent | Message / photo / vidéo            |
| Vidéo                 | Secondaire / non centrale                 | **Prioritaire**                    |
| Accès privé           | Oui                                       | Oui                                |
| Code secret           | Oui                                       | À conserver / transformer          |
| Livre d'Or            | Oui                                       | Pattern à réinterpréter            |
| Enveloppes            | Oui                                       | Pattern de révélation à réinventer |
| Messages prioritaires | Oui                                       | Oui, mais plus riche               |
| Storytelling          | Présent                                   | **Doit devenir central**           |
| Personnalisation      | Anniversaire                              | **Jenny-specific**                 |
| Chatons               | Non                                       | **Élément identitaire majeur**     |
| Lapins                | Non                                       | Élément secondaire                 |
| Rouge                 | Non central                               | **Couleur majeure potentielle**    |
| Noir                  | Non central                               | **Couleur majeure potentielle**    |
| Rose                  | Présentable dans un système classique     | **À éviter**                       |
| Horreur               | Non spécifique                            | Potentiel langage visuel           |
| Enquête               | Non spécifique                            | Potentiel langage narratif         |
| Romance               | Non spécifique                            | Potentiel langage émotionnel       |
| Bac                   | Non                                       | **Événement narratif majeur**      |
| 18 ans                | Non                                       | **Événement narratif majeur**      |
| Immersion             | Modérée                                   | **Objectif majeur**                |
| 3D                    | Non établi dans l'analyse observable      | À évaluer                          |
| Motion                | Présente / à approfondir                  | Système avancé                     |
| Mobile                | À vérifier                                | Exigence obligatoire               |
| Accessibility         | À vérifier                                | Exigence obligatoire               |

---

# 23 — OPPORTUNITÉ PRINCIPALE

L'analyse révèle que le projet Stella possède une très bonne idée fondamentale :

> **transformer des contributions humaines en expérience de révélation.**

Mais cette idée peut évoluer.

Pour Jenny :

```text
STELLA
Contribution
     ↓
Message
     ↓
Enveloppe
     ↓
Lecture
```

devient potentiellement :

```text
JENNY
Contribution
     ↓
Personne
     ↓
Relation
     ↓
Souvenir
     ↓
Média
     ↓
Révélation
     ↓
Interaction
     ↓
Émotion
```

La différence fondamentale est là.

---

# 24 — LE NOUVEAU SITE DOIT ÊTRE « JENNY-SPECIFIC »

Nous devons introduire ce que l'on peut appeler :

## **Identity Recognition Layer**

Une couche qui fait comprendre immédiatement :

> « Ce site est pour Jenny. »

Elle devra exploiter progressivement des éléments comme :

```text
🐱 Chatons
🐇 Lapins
🟥 Rouge
⬛ Noir
🔎 Enquête
🎬 Horreur
💗 Romance
🌸 Anime
🎓 Bac
🎂 18 ans
```

Mais ces éléments ne doivent jamais être simplement empilés.

Le Design System impose justement que chaque élément visuel serve à :

* communiquer ;
* orienter ;
* hiérarchiser ;
* expliquer ;
* créer une émotion ;
* faciliter une interaction ;
* renforcer l'identité. 

---

# 25 — HYPOTHÈSE DE POSITIONNEMENT

À ce stade, le projet peut être défini ainsi :

> **Une expérience anniversaire interactive et personnalisée qui transforme les messages, photos et vidéos des proches de Jenny en un parcours narratif immersif célébrant simultanément ses 18 ans, son bac et les relations qui ont marqué son parcours.**

Cette formulation n'est pas encore la promesse finale du site.

Elle constitue le **positionnement de travail de la Phase 1**.

---

# 26 — PRINCIPLE D'EXPÉRIENCE HÉRITÉ DE STELLA

Le système Jenny devra conserver :

```text
COLLECTIVE CREATION
        ↓
PRIVATE REVELATION
        ↓
PERSONAL DISCOVERY
        ↓
EMOTIONAL EXPERIENCE
```

Mais le niveau d'exécution devra passer d'un modèle principalement :

```text
CONTENT DISPLAY
```

à :

```text
EXPERIENCE DESIGN
```

---

# 27 — NIVEAU D'EXPÉRIENCE VISÉ

Le système UX définit cinq niveaux :

```text
LEVEL 1 — Functional
LEVEL 2 — Refined
LEVEL 3 — Expressive
LEVEL 4 — Immersive
LEVEL 5 — Exceptional
```

Le projet Jenny ne doit pas commencer directement par le Level 5.

Il doit progresser :

```text
FUNCTIONAL
↓
REFINED
↓
EXPRESSIVE
↓
IMMERSIVE
↓
EXCEPTIONAL
```



Mais **le niveau cible final est clairement Level 5 — Exceptional**.

---

# 28 — PRINCIPES DE CONCEPTION DÉDUITS

La Phase 1 permet maintenant de fixer les principes suivants.

### PRINCIPLE 01 — Human First

Le contenu humain reste le cœur.

### PRINCIPLE 02 — Jenny First

Tout doit être spécifique à Jenny.

### PRINCIPLE 03 — Discovery

Le contenu ne doit pas nécessairement être entièrement révélé immédiatement.

### PRINCIPLE 04 — Emotional Progression

L'expérience doit avoir un rythme émotionnel.

### PRINCIPLE 05 — Multimedia

Message, photo et vidéo sont des citoyens de première classe.

### PRINCIPLE 06 — Personal Symbols

Les détails personnels sont des éléments d'identité.

### PRINCIPLE 07 — Controlled Immersion

L'immersion doit rester compréhensible et contrôlable.

### PRINCIPLE 08 — Progressive Enhancement

La 3D et le motion doivent enrichir une base fonctionnelle solide. 

### PRINCIPLE 09 — No Generic Birthday Aesthetic

L'expérience doit ressembler à Jenny, pas à un template d'anniversaire.

### PRINCIPLE 10 — Technology Serves Emotion

Aucune technologie avancée ne doit être utilisée sans justification expérientielle.

---

# 29 — ARCHITECTURE CONCEPTUELLE À TRANSMETTRE À LA PHASE 2

La Phase 1 ne fixe pas encore les pages définitives.

Elle transmet cependant cette architecture conceptuelle :

```text
                    JENNY EXPERIENCE
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
      CONTRIBUTION HUB             PRIVATE EXPERIENCE
             │                           │
       Friends / Family                  │
             │                           │
      ┌──────┼──────┐                    │
      ▼      ▼      ▼                    ▼
   MESSAGE PHOTO  VIDEO              ENTRY
                                      ↓
                                  RECOGNITION
                                      ↓
                                   STORY
                                      ↓
                               DISCOVERY
                                      ↓
                                  MEMORIES
                                      ↓
                                  PEOPLE
                                      ↓
                                 MESSAGES
                                      ↓
                                  VIDEOS
                                      ↓
                               BAC / 18 ANS
                                      ↓
                                  FINALE
```

**Attention :** ceci est une architecture conceptuelle de travail, pas encore l'architecture finale du site.

La Phase 3 aura précisément pour rôle de la transformer en véritable Experience Architecture.

---

# 30 — DONNÉES À CONSERVER POUR LE FUTUR SYSTÈME

Chaque contribution devrait conceptuellement pouvoir être associée à :

```text
Contributor
├── name
├── relationship
├── message?
├── photos?
├── videos?
├── metadata
└── priority / category
```

Mais le modèle de données technique définitif appartient à la Phase 7.

À ce stade, nous établissons uniquement les besoins fonctionnels.

---

# 31 — EXIGENCES FONCTIONNELLES IDENTIFIÉES

### FR-01

Le système doit permettre à un proche de contribuer.

### FR-02

Une contribution doit contenir au moins un élément parmi :

```text
message
photo
video
```

### FR-03

Les trois types doivent pouvoir être combinés.

### FR-04

La vidéo doit être traitée comme un média principal.

### FR-05

Le système doit distinguer l'espace contributeur de l'expérience destinée à Jenny.

### FR-06

L'expérience Jenny doit être privée.

### FR-07

L'expérience doit pouvoir présenter les contributions sous une forme narrative.

### FR-08

Les contenus doivent pouvoir être priorisés.

### FR-09

Le système doit prévoir loading / empty / error / success.

### FR-10

Les interactions doivent fonctionner sur mobile.

### FR-11

L'expérience avancée doit disposer d'un fallback.

### FR-12

L'identité de Jenny doit être présente à plusieurs niveaux de l'expérience.

---

# 32 — EXIGENCES EXPÉRIENTIELLES

### ER-01 — Recognition

Jenny doit comprendre rapidement que l'expérience a été créée spécialement pour elle.

### ER-02 — Surprise

L'expérience doit préserver un sentiment de découverte.

### ER-03 — Emotional Depth

Les vidéos et messages doivent pouvoir produire une vraie progression émotionnelle.

### ER-04 — Personalization

Les détails personnels doivent être intégrés naturellement.

### ER-05 — Immersion

L'expérience doit dépasser une simple page web.

### ER-06 — Coherence

Design, contenu, interaction, motion et éventuelle 3D doivent sembler appartenir au même système.

### ER-07 — Control

Jenny doit rester maîtresse de son rythme d'exploration.

### ER-08 — Accessibility

L'immersion ne doit pas empêcher l'accès au contenu.

Ces exigences sont cohérentes avec le modèle UX du projet : clarté, cohérence, contrôle, accessibilité, feedback, responsive et qualité émotionnelle. 

---

# 33 — OPPORTUNITÉS DE DÉPASSEMENT PAR RAPPORT À STELLA

Nous pouvons maintenant définir les axes d'élévation.

```text
STELLA
  │
  ├── contribution
  ├── messages
  ├── enveloppes
  ├── livre
  └── révélation
       │
       ▼
JENNY
  │
  ├── contribution multimédia
  ├── vidéos
  ├── personnalisation profonde
  ├── narration
  ├── identité Jenny
  ├── souvenirs
  ├── 18 ans
  ├── bac
  ├── interactions
  ├── motion
  ├── immersion
  └── éventuelle 3D
```

L'objectif n'est donc pas :

> **Stella 2.0**

mais :

> **une nouvelle expérience qui part de la même idée émotionnelle et l'amène à un niveau supérieur.**

---

# 34 — CE QUE LA PHASE 1 NOUS INTERDIT DE FAIRE

À ce stade, nous ne devons pas encore décider définitivement :

* la palette exacte ;
* la typographie ;
* les composants ;
* la scène 3D ;
* les shaders ;
* les animations ;
* la structure exacte des pages ;
* la base de données ;
* le stockage vidéo ;
* l'architecture React ;
* le choix définitif des bibliothèques.

Pourquoi ?

Parce que l'ordre recommandé par le système est :

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
↓
ADVANCED EFFECTS
```



Nous devons donc respecter cette progression.

---

# 35 — VERDICT DE LA PHASE 1

Le site Stella possède une **base conceptuelle solide**.

Sa force principale n'est pas son esthétique.

Sa force est son modèle :

> **des proches créent collectivement un contenu qui devient ensuite une expérience privée de découverte et de souvenir.**

Le mécanisme des enveloppes constitue également une bonne abstraction de design :

```text
CONTENT
↓
OBJECT
↓
INTERACTION
↓
REVELATION
↓
EMOTION
```

Mais Jenny permet d'aller beaucoup plus loin.

Le principal saut qualitatif sera de passer :

```text
ANNIVERSARY WEBSITE
```

à :

```text
PERSONAL DIGITAL EXPERIENCE
```

avec :

```text
Jenny's identity
+
18th birthday
+
Bac
+
Friends
+
Memories
+
Messages
+
Photos
+
Videos
+
Discovery
+
Immersion
```

---

# 36 — PHASE 1 → PHASE 2 HANDOFF

Les éléments suivants sont officiellement transmis à la prochaine phase :

### À conserver

```text
Two-sided architecture
Contribution system
Private experience
Progressive revelation
Emotional content
Priority content
Personal discovery
```

### À transformer

```text
Messages
→ Multimedia memories

Envelopes
→ Revelation metaphor

Livre d'Or
→ Personal world

Secret access
→ Narrative entry

Scroll
→ Guided exploration
```

### À ajouter

```text
Jenny-specific identity
Cats / kittens
Rabbits
Red / Black
Romance
Investigation
Horror
Anime references
Bac
18 years
Video-first contribution
Immersive storytelling
```

### À éviter

```text
Generic birthday aesthetic
Pink-centric design
Unnecessary effects
Technology-first design
Blind copying of Stella
```

---

# 37 — STATUT DU DOCUMENT

**Phase :** 1 / 7
**Nom :** Reverse Engineering du site Stella
**Statut :** **TERMINÉE — livrable prêt pour `Docs/`**

**Nom de fichier recommandé :**

```text
Docs/01_REVERSE_ENGINEERING_STELLA.md
```

**Dépendances pour la suite :**

```text
01_REVERSE_ENGINEERING_STELLA.md
        ↓
02_JENNY_EXPERIENCE_MAP.md
```

---


[1]: https://anniversaire-stella.netlify.app/surprise "Livre d'Or - Surprise d'Anniversaire"
