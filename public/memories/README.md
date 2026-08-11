# Mémoires Jenny — Dossier pour E.1 IntroOrbit

**Emplacement exact dans le workspace :**
```
/home/user/repo/public/images/memories/
# ou relatif : public/images/memories/
```

**Où mettre tes photos :**
- Place ici toutes les photos souvenirs (JPG, PNG, WebP, AVIF) — ex: `jenny-bac-01.jpg`, `jenny-amis-02.jpg`, `famille-03.jpg`
- Nommage libre, mais privilégie `kebab-case` sans accents : `jenny-18-01.jpg`, `bac-2024-02.jpg`
- Taille conseillée : **1200px côté long, < 400 Ko** (WebP 80% qualité) — le système génère des thumbnails 200px pour l'orbit et charge le full 800px dans Depositions
- Vidéos : place les MP4 dans `public/videos/memories/` (ou via Supabase Storage `birthday-media` — les vidéos Supabase approuvées via `fetchApprovedDepositions` apparaîtront automatiquement)

**Comment elles sont chargées :**
- `src/data.ts` → `MEMORIES` importe via `import.meta.glob` tous les fichiers de `public/images/memories/*.{jpg,png,webp}` à la compilation
- Si le dossier est vide, l'orbit utilise les 5 images `piece-*.jpg` existantes comme fallback (pour que l'expérience reste visible avant que tu déposes tes vrais souvenirs)
- Pour ajouter une nouvelle photo : dépose le fichier dans `public/images/memories/` → `npm run build` → elle apparaît automatiquement dans l'orbit autour de MJ

**Exemple :**
```
public/images/memories/
├── README.md (ce fichier)
├── jenny-bac-01.jpg
├── jenny-18-02.jpg
├── amis-lac-03.jpg
└── famille-04.jpg
```

**Note Supabase :** Si `VITE_SUPABASE_URL` est configuré, l'orbit mélange aussi les photos approuvées depuis `birthday-media` (via `fetchApprovedDepositions` signed URLs) — pas besoin de dupliquer les fichiers.
