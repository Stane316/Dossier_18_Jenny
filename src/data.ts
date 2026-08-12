/* ─────────────────────────────────────────────────────────────
   CONTENU DU DOSSIER N°18 — AFFAIRE « JENNY »
   Toute la matière narrative de l'expérience.
   ───────────────────────────────────────────────────────────── */

export const DOSSIER_REF = "J-18/08-13";

/* ── COUVERTURE — fiche d'identité du dossier ── */
export const COVER_META = [
  { label: "Sujet", value: "Jennifer — dite « Jenny »" },
  { label: "Alias connu", value: "Méminou" },
  { label: "Âge au moment des faits", value: "18 ans, tout juste" },
  { label: "Statut", value: "Bachelère. Avec la manière." },
  { label: "Signes particuliers", value: "Franche. Directe. Toujours là pour les autres." },
  { label: "Dernière localisation", value: "Entourée des siens — 13 août" },
];

export const WARNING_STRIP = [
  "CE DOSSIER CONTIENT DES PREUVES D'AMOUR MASSIF",
  "LE ROSE Y EST FORMELLEMENT INTERDIT",
  "TOUTE FRANCHISE EST LA BIENVENUE",
  "LES CHATONS ONT ÉTÉ INTERROGÉS — ILS NIENT EN RONRONNANT",
  "RÉF. " + DOSSIER_REF,
];

/* ── RAPPORT PRÉLIMINAIRE — les faits ── */
export const REPORT_FACTS = [
  {
    num: "01",
    text: "18 années d'existence constatées. Le préjudice est considérable : une joie persistante chez l'ensemble de l'entourage.",
  },
  {
    num: "02",
    text: "Bac obtenu. Les examinateurs parlent d'une affaire rondement menée. Le dossier classe la pièce sous la mention « victoire ».",
  },
  {
    num: "03",
    text: "Consommation régulière d'animes de romance. Des témoins affirment l'avoir vue défendre Maomao avec un sérieux d'apothicaire.",
  },
  {
    num: "04",
    text: "Aime les chatons. Davantage que les lapins. Le procès-verbal est formel — et le lapin a été informé. Il s'en remet.",
  },
  {
    num: "05",
    text: "Films d'horreur à deux heures du matin. Ne sursaute presque jamais. Fait sursauter les autres. Rit.",
  },
  {
    num: "06",
    text: "Franchise jugée « dangereusement honnête ». Écoute les gens jusqu'au bout, puis dit vrai. Récidive à chaque fois qu'un proche va mal.",
  },
];

export const REPORT_CONCLUSION =
  "Conclusion provisoire : les preuves matérielles ne suffisent pas. Il faut des témoins. Convoquons-les.";

/* ── PIÈCES À CONVICTION ── */
export interface Exhibit {
  id: string;
  title: string;
  status: string;
  photo: string;
  alt: string;
  description: string;
  note: string;
}

export const EXHIBITS: Exhibit[] = [
  {
    id: "A-01",
    title: "Le Chaton",
    status: "SUSPECT PRINCIPAL",
    photo: "/images/piece-chaton.jpg",
    alt: "Photographie au flash d'un chaton sur fond de velours rouge",
    description:
      "Vu à proximité immédiate du cœur de la victime à de très nombreuses reprises. Ne nie rien. Ronronne à l'énoncé du prénom « Jenny ».",
    note: "Priorité absolue dans l'affection du sujet — acté au PV.",
  },
  {
    id: "A-02",
    title: "Le Lapin",
    status: "COMPLICE PRÉSUMÉ",
    photo: "/images/piece-lapin.jpg",
    alt: "Photographie au flash d'un lapin sur fond noir",
    description:
      "Très aimé, mais officiellement classé derrière le chaton dans la hiérarchie du cœur. Le dossier lui rend ici hommage, discrètement.",
    note: "Ne pas lui lire la ligne précédente.",
  },
  {
    id: "A-03",
    title: "Les Carnets",
    status: "PIÈCE LITTÉRAIRE",
    photo: "/images/piece-carnets.jpg",
    alt: "Nature morte d'apothicaire : carnet, fioles, herbes, sceau de cire rouge",
    description:
      "Retrouvés dans la chambre : Maomao, Jinshi, poisons, enquêtes. Le sujet a un faible pour ceux qui observent, déduisent et sauvent sans prévenir. On se demande pourquoi.",
    note: "Contient des traces de romance soigneusement dissimulées.",
  },
  {
    id: "A-04",
    title: "Nuit blanche",
    status: "RECONSTITUTION",
    photo: "/images/piece-cinema.jpg",
    alt: "Salon plongé dans la lueur d'un écran, bol de pop-corn, nuit d'horreur",
    description:
      "Scène de crime récurrente : canapé, couverture, écran qui clignote. Le sujet regarde les films d'horreur sans ciller. L'entourage, beaucoup moins.",
    note: "Les cris entendus ne proviennent jamais du sujet.",
  },
  {
    id: "A-05",
    title: "Le Bac",
    status: "PIÈCE MAÎTRESSE",
    photo: "/images/piece-bac.jpg",
    alt: "Mains tenant un diplôme à couverture rouge et sceau doré",
    description:
      "Obtenu haut la main, versé au dossier pour l'éternité. Toute tentative de minimiser l'exploit par le sujet sera considérée comme faux témoignage.",
    note: "Classée « victoire ». Définitivement.",
  },
];

/* ── DÉPOSITIONS — témoins ── */
export interface Deposition {
  id?: string; // Supabase contribution id (for moderation)
  name: string;
  link: string;
  date: string;
  quote: string;
  full: string;
  photo?: string;
  videoLabel?: string;
  videoUrl?: string; // signed URL for private video
  status?: "pending" | "approved";
}

export const DEPOSITIONS: Deposition[] = [
  {
    name: "S.",
    link: "Témoin principal — universe partagé avec le sujet",
    date: "versée le 13.08, 00 h 01",
    quote: "Elle dit les choses en face. C'est précisément pour ça qu'on peut tout lui dire.",
    full:
      "J'ai vu Jenny écouter des gens pendant des heures, sans regarder son téléphone, sans préparer sa réponse. Puis dire, en une phrase franche, exactement ce qu'il fallait entendre. Il y a des univers qu'on ne partage qu'avec une seule personne. Celui-là est le nôtre, et ce dossier est ma déposition : elle est de ces personnes qu'on ne remplace pas.",
  },
  {
    name: "Léa M.",
    link: "Amie — rangée du fond, côté fenêtre",
    date: "versée le 11.08, 22 h 40",
    quote: "La veille de l'oral, c'est elle qui m'a fait réviser. Elle, elle était déjà prête.",
    full:
      "Jenny a cette manie insupportable et magnifique de s'occuper des autres avant elle-même. Elle m'a envoyé des fiches à minuit, m'a fait répéter trois fois, puis m'a dit « tu vas y arriver, arrête de trembler ». Elle avait raison. Comme d'habitude.",
  },
  {
    name: "Mamie",
    link: "Témoin de la première heure",
    date: "versée le 12.08, 16 h 15",
    quote: "Dix-huit ans. Je me souviens du premier jour. Je confirme : elle n'a jamais fait les choses à moitié.",
    full:
      "Petite, elle recueillait déjà tous les chatons du quartier et leur donnait des noms impossibles. Elle a gardé ce cœur-là, en plus grand. Mon témoignage tient en une ligne : notre famille a beaucoup de chance.",
  },
  {
    name: "Hugo & la bande",
    link: "Témoins des nuits blanches",
    date: "versée le 12.08, 03 h 02",
    quote: "On a arrêté de lui montrer des films d'horreur pour lui faire peur. On les regarde pour la voir rire de nous.",
    full:
      "Procès-verbal collectif : à 2 h 47, tout le monde a hurlé sauf Jenny. Elle a dit « c'était prévisible » avec une voix parfaitement calme. On demande officiellement qu'elle arrête d'avoir raison, ou qu'elle nous prévienne avant.",
  },
  {
    name: "M. Verneuil",
    link: "Professeur — à la retraite depuis juin, pas rancunier",
    date: "versée le 10.08, 09 h 30",
    quote: "Une élève qui conteste, c'est rare. Une élève qui conteste et qui a raison, c'est une copie à part.",
    full:
      "Mademoiselle, votre franc-parler m'a coûté quelques heures de sommeil et rendu quelques copies mémorables. Le jury du bac a fini par me donner tort, ce qui, entre nous, vous ressemble bien. Félicitations.",
  },
];

/* ── SALLE DE PROJECTION — enregistrements ── */
export interface Recording {
  id: string;
  label: string;
  camera: string;
  src: string;
  poster: string;
  duration: number;
  transcript: { at: number; text: string }[];
}

export const RECORDINGS: Recording[] = [
  {
    id: "E-07",
    label: "« Les bougies »",
    camera: "CAM 02 — SALON",
    src: "https://videos.pexels.com/video-files/3831835/3831835-uhd_4096_2160_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/3831835/cake-candles-happy-birthday-3831835.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    duration: 13,
    transcript: [
      { at: 0, text: "00:00 — Mise en place des bougies. Le sujet n'est pas encore au courant." },
      { at: 3, text: "00:03 — Première flamme. Dix-huit, en tout. Les témoins retiennent leur souffle." },
      { at: 7, text: "00:07 — La lumière vacille. Quelqu'un chuchote « fais un vœu »." },
      { at: 10, text: "00:10 — Vœu formulé. Contenu classé secret-défense. Preuve recevée." },
    ],
  },
  {
    id: "E-03",
    label: "« Gâteau dans le noir »",
    camera: "CAM 01 — CUISINE",
    src: "https://videos.pexels.com/video-files/8878095/8878095-hd_1920_1080_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8878095/anniversary-birthday-burnt-cake-8878095.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    duration: 9,
    transcript: [
      { at: 0, text: "00:00 — Extinction des feux. Seules les bougies restent autorisées." },
      { at: 4, text: "00:04 — Le gâteau avance seul dans le noir. C'est la tradition." },
      { at: 7, text: "00:07 — Rires étouffés derrière la caméra. Preuve sonore recevable." },
    ],
  },
  {
    id: "E-12",
    label: "« Dix-huit flammes »",
    camera: "CAM 03 — MACRO",
    src: "https://videos.pexels.com/video-files/7100823/7100823-uhd_3840_2160_30fps.mp4",
    poster:
      "https://images.pexels.com/videos/7100823/pexels-photo-7100823.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    duration: 17,
    transcript: [
      { at: 0, text: "00:00 — Inspection rapprochée des flammes. Une par année. Aucune ne manque." },
      { at: 5, text: "00:05 — La cire coule. Le temps aussi. On garde les deux." },
      { at: 11, text: "00:11 — Dernières secondes avant le souffle. Silence dans la pièce." },
      { at: 15, text: "00:15 — Expiration du sujet. Dix-huit ans officiellement actés." },
    ],
  },
];

/* ── VERDICT & LETTRE ── */
export const VERDICT_SENTENCE =
  "Peine prononcée : être aimée. À perpétuité. Sans possibilité d'appel. Le jury refuse les circonstances atténuantes.";

export const LETTER_PARAGRAPHS = [
  "Méminou,",
  "On a enquêté longtemps. On a interrogé les chatons — ils nient tout, mais ils ronronnent dès qu'on prononce ton nom. On a vérifié tes alibis : tu étais toujours là. Pour écouter. Pour recadrer. Pour dire vrai quand tout le monde tournait autour.",
  "Tu as dix-huit ans, un bac en poche, et cette façon bien à toi de ne jamais faire semblant. C'est rare. C'est précieux. Alors on a voulu que ce dossier te ressemble : rouge et noir, franc, un peu mystérieux — et sans une seule trace de rose. Promis.",
  "Maomao résout ses enquêtes avec trois fois rien et beaucoup d'observation. Toi, tu résous les gens. Tu les écoutes, tu les soignes sans qu'ils s'en aperçoivent, et tu restes.",
  "Alors voilà le verdict, signé par tous ceux qui comptent : tu es irremplaçable. La peine est déjà en cours d'exécution — on t'aime, et personne ne compte faire appel.",
  "Les chatons d'abord, les lapins juste derrière — ils sont prévenus — et nous, tout autour.",
];

export const LETTER_SIGNATURE = "— Ceux qui t'aiment, sous serment.";

/* ── CLÔTURE ── */
export const CLOSING_LINE =
  "18 ans n'est que le numéro de la première pièce du prochain dossier.";

/* ── MÉMOIRES — orbit intro E.1 ── */
// Visuels thématiques de secours. Les souvenirs de lancement ajoutés sous
// public/memories sont détectés automatiquement au build; les contributions
// approuvées restent chargées depuis le bucket Supabase birthday-media.
export const MEMORIES_FALLBACK: string[] = [
  "/images/piece-chaton.jpg",
  "/images/piece-lapin.jpg",
  "/images/piece-carnets.jpg",
  "/images/piece-cinema.jpg",
  "/images/piece-bac.jpg",
  "/images/emblem-cat.jpg",
  "/images/papillon-or.jpg",
];

/* ── ANNEXE — système visuel (source de vérité pour l'implémentation) ── */
export const TOKEN_COLORS = [
  { name: "ENCRE", hex: "#0C0709", usage: "Fond général — noir chaud, jamais pur" },
  { name: "TAMPON", hex: "#C8102E", usage: "Rouge signature — tampons, filets, actions" },
  { name: "BRAISE", hex: "#E8404A", usage: "Rouge texte sur fond sombre — contraste AA" },
  { name: "LIE-DE-VIN", hex: "#6E0B1E", usage: "Ombres dures, profondeurs, sceaux" },
  { name: "DOSSIER", hex: "#ECE1CC", usage: "Papier — dépositions, annexe technique" },
  { name: "OS", hex: "#EDE3CF", usage: "Texte courant sur encre" },
  { name: "LAITON", hex: "#C9A227", usage: "L'or de Jinshi — climax uniquement" },
];

export const TOKEN_MOTION = [
  { name: "micro", value: "180 ms", use: "hover, focus, bascules d'état" },
  { name: "standard", value: "520 ms", use: "dépliage des dépositions, cartes" },
  { name: "révélation", value: "900 ms", use: "entrées au scroll — ease (0.22, 0.61, 0.36, 1)" },
  { name: "cinématique", value: "1600 ms", use: "tampon du verdict, lettre — ease (0.16, 1, 0.3, 1)" },
];
