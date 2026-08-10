# JENNY EXPERIENCE — Documentation Hub

> **A personalized digital experience created for Jenny's 18th birthday and Bac celebration.**

## 00 — DOCUMENT STATUS

| Field | Value |
|---|---|
| Project | Jenny Experience |
| Event | 18th Birthday + Bac Celebration |
| Main date | 13 August |
| Documentation status | Design & architecture complete |
| Current stage | Ready for visual prototyping and implementation |
| Documentation root | `Docs/` |
| Primary audience | Design AI, Development AI, Project Owner |

---

# 01 — READ THIS FIRST

This repository contains the complete design, UX, immersive-engineering and technical documentation for the **Jenny Experience**.

This documentation is the project's **source of truth**. Any AI, developer or collaborator entering the repository must read this file **before reading or modifying the project**.

Mandatory reading order:

```text
Docs/README.md
        ↓
Digital Experience Reference Systems
        ↓
PHASE 1
        ↓
PHASE 2
        ↓
PHASE 3
        ↓
PHASE 4
        ↓
PHASE 5
        ↓
PHASE 6
        ↓
PHASE 7
        ↓
Visual Design Package
        ↓
Implementation
```

If a Visual Design Package is added later, it becomes part of the handoff between the Design AI and Development AI and must be read before implementing the corresponding visual experience.

---

# 02 — PROJECT VISION

This project is not intended to be a generic birthday website.

It is a **personalized digital experience** built specifically for Jennifer, known as Jenny and Méminou.

The event combines two milestones:

```text
18 YEARS OLD
+
BAC SUCCESS
```

The central date is **13 August**.

The final product should progressively create:

```text
RECOGNITION
↓
CURIOSITY
↓
SURPRISE
↓
EMOTION
↓
DISCOVERY
↓
FEELING OF BEING UNIQUE
↓
MEMORY
```

The final experience should communicate:

> **This could only have been made for Jenny.**

---

# 03 — JENNY IDENTITY

Important identity signals include:

- Jennifer / Jenny;
- Méminou;
- her close relational universe with Stane;
- a very strong love of **kittens**;
- love of rabbits, secondary to kittens;
- red;
- black;
- dislike of pink;
- romance;
- romance anime;
- *The Apothecary Diaries*;
- Maomao;
- Jinshi;
- horror films;
- police / investigation stories;
- a direct and frank personality;
- attentiveness toward people close to her;
- honest advice and emotional authenticity;
- recent Bac success;
- 18th birthday.

These elements must not become a decorative checklist. They must become a coherent experience language.

---

# 04 — PRODUCT MODEL

The product has two principal experiences.

## 04.1 — Contributor Experience

Friends and important people can submit:

```text
MESSAGE
PHOTO
VIDEO
```

Accepted combinations:

```text
Message
Photo
Video
Message + Photo
Message + Video
Photo + Video
Message + Photo + Video
```

Invalid contribution:

```text
NO CONTENT
```

Therefore the core business rule is:

```text
message OR photo OR video
```

Videos are especially important because contributors are expected to use them to communicate in a more human and personal way.

## 04.2 — Jenny Experience

This is the emotional center of the product.

It must be immersive, personal, cinematic, emotional, coherent, memorable and technically polished.

Conceptual narrative:

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

The exact flow remains governed by Phases 3 and 4.

---

# 05 — DIGITAL EXPERIENCE REFERENCE SYSTEMS

Three reference systems establish the reusable rules for the project.

## Reference 01 — Design System

Defines design philosophy, visual hierarchy, composition, layout, typography, color, spacing, components, interaction and responsive behavior.

Core hierarchy:

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

Principle:

> Design is not the collection of effects. Design is the system that makes the experience feel intentional.

## Reference 02 — UX & Quality System

Defines usability, UX structure, accessibility, feedback, states, responsive behavior, quality and validation.

The interface must remain understandable and usable even when advanced effects are unavailable.

## Reference 03 — 3D & Motion Engineering System

Defines how advanced experiences should be engineered using animation, motion design, transitions, scroll-driven animation, WebGL, Three.js, React Three Fiber, shaders, particles, spatial interaction and 3D scenes.

Core principle:

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

Never:

```text
TECHNOLOGY
↓
EFFECT
↓
SEARCH FOR A USE
```

Advanced layers must progressively enhance the experience and fail gracefully.

---

# 06 — THE SEVEN PROJECT PHASES

The seven project documents represent one continuous design process.

## PHASE 1 — Reverse Engineering du site Stella

Purpose: understand the previous birthday experience, its contribution model, strengths, weaknesses and opportunities for improvement.

References:

- https://anniversaire-stella.netlify.app/
- https://anniversaire-stella.netlify.app/surprise

The objective is to understand and evolve the system, not copy it.

## PHASE 2 — Jenny Experience Map & Identity

Defines Jenny's personality, preferences, relationships, emotional identity and personalization model.

It answers:

```text
WHO IS JENNY?
WHAT DOES SHE LIKE?
WHAT MAKES HER RECOGNIZABLE?
WHAT SHOULD SHE FEEL?
WHAT DETAILS CAN ONLY BELONG TO HER?
```

## PHASE 3 — Experience Architecture

Defines the complete experience structure, narrative progression, spaces, sections and content relationships.

## PHASE 4 — UX/UI Flow & Interaction Specification

Defines user flows, states, interactions, feedback, contributor flow, Jenny flow and responsive behavior.

Contributor UX must immediately communicate:

1. why the person is here;
2. who the contribution is for;
3. what they can send;
4. how to validate.

## PHASE 5 — Jenny Visual Direction & Design System

Defines Jenny-specific visual direction, palette, typography, composition, component language, hierarchy, design tokens and personalization expression.

## PHASE 6 — 3D / Motion / Immersive Engineering

Defines motion, transitions, scroll behavior, interaction, cinematic thinking, 3D, WebGL, camera, scenes, progressive enhancement, graceful degradation and performance constraints.

Every advanced effect must have a reason to exist.

## PHASE 7 — Technical Architecture & Implementation Blueprint

This is the technical master blueprint. It governs application architecture, routing, React/Vite/TypeScript foundation, Supabase, Storage, contribution data, media pipeline, private Jenny access, state management, content model, experience engine, motion ownership, 3D architecture, testing, QA, deployment and implementation order.

The development AI must read phases 1–7, preserve Jenny's identity and documented UX/visual decisions, implement foundation first, then interaction, motion and 3D, and finish with accessibility and performance QA.

---

# 07 — MASTER DESIGN / ENGINEERING PRINCIPLE

All project decisions follow:

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
3D
↓
TECHNICAL POLISH
```

Do not begin with Three.js, shaders, particles or effects and then search for a use.

Start with the experience. Then build the technology that makes it possible.

---

# 08 — EXPERIENCE LAYERS

```text
┌─────────────────────────────┐
│         EXPERIENCE          │
│ Narrative / Visual / 3D     │
├─────────────────────────────┤
│         INTERACTION         │
│ Motion / Input / State      │
├─────────────────────────────┤
│          FOUNDATION         │
│ React / DOM / CSS / Data    │
└─────────────────────────────┘
```

The experience layer depends on interaction. The interaction layer depends on foundation. The foundation must not become unnecessarily dependent on advanced effects.

---

# 09 — PROGRESSIVE ENHANCEMENT

```text
SEMANTIC CONTENT
↓
VISUAL DESIGN
↓
INTERACTION
↓
MOTION
↓
3D
↓
ADVANCED RENDERING
```

If an advanced layer fails:

```text
FULL EXPERIENCE
↓
SIMPLIFIED EXPERIENCE
↓
CORE EXPERIENCE
```

Content, navigation, comprehension, identity and primary actions must remain available whenever possible.

WebGL must never be a single point of failure.

---

# 10 — TECHNICAL BASELINE

The technical blueprint recommends:

- React;
- Vite;
- TypeScript;
- coherent styling / Design System implementation;
- Supabase;
- PostgreSQL;
- Supabase Storage;
- React Router where needed;
- Framer Motion where appropriate;
- GSAP where complex synchronized timelines are justified;
- React Three Fiber / Three.js only when 3D provides real value.

Do not use several animation systems to control the same property without explicit ownership.

---

# 11 — MEDIA ARCHITECTURE

Media is first-class content.

Separate:

```text
DATABASE
→ metadata

STORAGE
→ binary files
```

Video pipeline:

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

Expose explicit states:

```text
uploading
processing
success
error
retry
```

Never leave the contributor wondering whether the application is frozen.

---

# 12 — PRIVACY & ACCESS

Contributions can contain private photos, videos and messages.

Therefore:

- contributors must not access other contributors' data;
- private media must not be publicly indexable;
- URLs should not be easily guessable;
- sensitive information must not be unnecessarily logged;
- Jenny's private experience must be protected.

The technical blueprint recommends a private route plus secret/token and server-side validation, or an equivalent lightweight authentication mechanism. Secrets must never be exposed in client code.

---

# 13 — EXPERIENCE ENGINE

Conceptual engine:

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

Recommended states:

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

---

# 14 — MOTION OWNERSHIP

Avoid multiple independent systems controlling the same property.

Prefer:

```text
Inputs
↓
Unified State
↓
Controller
↓
Output
```

The same principle applies to navigation, hero animation, memory reveals, scene transitions and media reveals.

---

# 15 — IMPLEMENTATION ORDER

The recommended order is:

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

---

# 16 — IMPLEMENTATION ROADMAP

## Sprint 0 — Foundation

Repository, React/Vite, TypeScript, styling, routing, environment, Supabase and base structure.

## Sprint 1 — Contributor Experience

Contributor landing, form, validation, image upload, video upload, storage and success state.

## Sprint 2 — Content & Data

Database, contribution management, media metadata, moderation and private access.

## Sprint 3 — Jenny Core Experience

Protected route, introduction, core layout, content, memory system and basic transitions.

## Sprint 4 — Motion

Reveals, transitions, scroll-driven behavior, micro-interactions and experience state machine.

## Sprint 5 — 3D

3D foundation, scene, camera, interaction and fallback.

## Sprint 6 — Media Experience

Photos, videos, playback, progressive loading and emotional sequencing.

## Sprint 7 — QA / Polish

Responsive, accessibility, reduced motion, performance, browser testing, error handling and final content.

---

# 17 — DEVELOPMENT GATES

```text
Gate 01 — Intent
Gate 02 — UX
Gate 03 — Design
Gate 04 — Interaction
Gate 05 — Accessibility
Gate 06 — Responsive
Gate 07 — Technical Quality
```

A gate should be passed before the project depends heavily on the next layer.

---

# 18 — DEFINITION OF DONE

A feature is complete only when:

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

A spectacular but fragile animation is not complete. A beautiful but unusable interface is not complete.

---

# 19 — TESTING

## Unit

Validation, contribution rules, transformations and utilities.

## Integration

Uploads, contribution creation, media retrieval and private access.

## E2E

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

# 20 — ACCEPTANCE CHECKLIST

## Contributor

```text
[ ] Can open the contributor page
[ ] Understands the purpose
[ ] Can write a message
[ ] Can add a photo
[ ] Can add a video
[ ] Can combine content
[ ] Cannot submit empty content
[ ] Sees upload progress
[ ] Receives confirmation
```

## Jenny

```text
[ ] Private access works
[ ] Introduction works
[ ] Personalization is visible
[ ] Navigation is understandable
[ ] Messages are accessible
[ ] Photos are accessible
[ ] Videos are accessible
[ ] Transitions are coherent
[ ] Mobile works
[ ] Reduced motion works
```

---

# 21 — MOTION & 3D QA

Every important animation should define:

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

For 3D:

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

# 22 — PERFORMANCE

Images should use appropriate modern formats, dimensions and lazy loading.

Videos should use:

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

Avoid several videos playing simultaneously. Heavy videos should load progressively or on demand.

---

# 23 — ERROR HANDLING

At minimum:

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

Critical errors need an explanation, a possible action and a recoverable state when possible.

---

# 24 — CODE ORGANIZATION

The technical blueprint recommends separation of:

```text
app
pages
components
features
experience
three
lib
styles
types
```

A reference structure is available in `PHASE-7-TECHNICAL-ARCHITECTURE-IMPLEMENTATION-BLUEPRINT.md`.

This is a reference architecture, not permission to over-engineer the application.

---

# 25 — CONTENT & PERSONALIZATION

Content may be separated from implementation when useful:

```text
content/
├── jenny.ts
├── experience.ts
├── messages.ts
└── config.ts
```

Personalization should be declarative.

Conceptual model:

```ts
{
  name: "Jenny",
  aliases: ["Méminou"],
  favoriteColors: ["red", "black"],
  animals: ["kitten", "rabbit"],
  interests: ["romance", "horror", "police investigation"],
  anime: {
    favorite: "The Apothecary Diaries",
    characters: ["Maomao", "Jinshi"]
  }
}
```

Exact content must remain aligned with Phases 2 and 5. Never put secrets in frontend content files.

---

# 26 — DESIGN AI / DEVELOPMENT AI WORKFLOW

## Design AI

Responsible for:

- reading the documentation;
- building the visual concept;
- defining visual direction;
- producing high-fidelity visual prototypes;
- exploring screens;
- refining composition;
- validating the visual language.

Its output becomes a visual handoff.

## Development AI

Responsible for:

- reading this README first;
- reading the reference systems;
- reading phases 1–7;
- reading the Visual Design Package;
- implementing the application;
- preserving the documented UX and identity;
- integrating media;
- implementing motion;
- implementing 3D;
- testing;
- QA;
- deployment preparation.

The Development AI must not restart the design process from zero.

---

# 27 — HANDOFF CONTRACT

```text
PROJECT INTENT
↓
REFERENCE SYSTEMS
↓
PHASE 1
↓
PHASE 2
↓
PHASE 3
↓
PHASE 4
↓
PHASE 5
↓
PHASE 6
↓
PHASE 7
↓
VISUAL DESIGN PACKAGE
↓
IMPLEMENTATION
↓
QA
↓
RELEASE
```

A later technical decision must not silently invalidate an earlier product decision.

If a change is genuinely necessary, document:

```text
PROPOSED CHANGE
+
REASON
+
IMPACT
+
ALTERNATIVE
```

before changing the source of truth.

---

# 28 — REFERENCES

## Stella

Public:
https://anniversaire-stella.netlify.app/

Private:
https://anniversaire-stella.netlify.app/surprise

Use it to understand the previous contribution and reveal model, not to copy it.

## TRIONN

Primary:
https://trionn.com/

Work:
https://trionn.com/work

TRIONN is a reference for craft, interaction quality, creative development and immersive execution. It is not a template. Do not copy its brand, identity, content, assets or exact compositions.

---

# 29 — SOURCE AUTHORITY

When information conflicts, use this hierarchy:

1. **Project-specific decisions** — Phases 2–7 for Jenny-specific decisions.
2. **Phase 1** — lessons and baseline from the Stella experience.
3. **Digital Experience reference systems** — reusable design, UX and engineering principles.
4. **Visual Design Package** — final visual execution reference once approved.
5. **Technical implementation details** — may adapt implementation details but must preserve higher-level intent.

General rule:

> **Do not silently replace a project decision with a personal preference.**

---

# 30 — WHAT NOT TO DO

Do not:

- build a generic birthday template;
- make the site pink;
- reduce Jenny's identity to a few labels;
- turn the project into a simple photo gallery;
- treat videos as an afterthought;
- copy the Stella site;
- copy TRIONN;
- add 3D merely for technical spectacle;
- animate everything;
- make WebGL a dependency of core content;
- expose private media;
- create a giant monolithic React component;
- use global state for everything;
- hardcode media URLs throughout the application;
- create hover-only interactions;
- leave infinite loading states;
- scatter magic numbers throughout the codebase;
- change UX or visual decisions silently.

---

# 31 — CORE QUALITY PRINCIPLE

The target is not:

```text
MORE EFFECTS
```

The target is:

```text
MORE COHERENCE
```

Progression:

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

For Jenny:

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

---

# 32 — FINAL MASTER PRINCIPLE

> **BUILD THE EXPERIENCE FIRST. THEN BUILD THE ENGINE THAT MAKES IT POSSIBLE.**

The final product is not:

> a form + a gallery + some animations.

It is:

> a personalized event experience supported by a coherent architecture of content, media, interaction, motion and immersion.

The final measure of success is not the number of technologies used.

It is whether Jenny can experience the product and think:

> **“This could only have been made for me.”**

---

# 33 — PRE-IMPLEMENTATION CHECK

Before starting implementation, the responsible AI must be able to confirm:

```text
[ ] README read completely
[ ] Reference systems identified
[ ] Phase 1 identified
[ ] Phase 2 identified
[ ] Phase 3 identified
[ ] Phase 4 identified
[ ] Phase 5 identified
[ ] Phase 6 identified
[ ] Phase 7 identified
[ ] Visual Design Package located, if available
[ ] Source hierarchy understood
[ ] Jenny identity understood
[ ] Contributor rules understood
[ ] Media rules understood
[ ] Privacy requirements understood
[ ] Implementation order understood
[ ] QA requirements understood
```

Only after this checklist is understood should implementation begin.

---

# 34 — DOCUMENTATION STATUS

```text
PHASE 1 — COMPLETE
PHASE 2 — COMPLETE
PHASE 3 — COMPLETE
PHASE 4 — COMPLETE
PHASE 5 — COMPLETE
PHASE 6 — COMPLETE
PHASE 7 — COMPLETE
```

Current state:

```text
DOCUMENTATION
      ↓
READY
      ↓
VISUAL PROTOTYPING
      ↓
IMPLEMENTATION
      ↓
QA
      ↓
RELEASE
```

**This README is the mandatory entry point to the project's documentation system.**
