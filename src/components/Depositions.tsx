import { useState, type FormEvent } from "react";
import { DEPOSITIONS, type Deposition } from "../data";
import { Reveal } from "../hooks";
import { SectionHead, Stamp } from "./Chrome";
import { ReelIcon } from "./icons";

function DepositionCard({ d, i, isNew = false }: { d: Deposition; i: number; isNew?: boolean }) {
  const [open, setOpen] = useState(isNew);
  return (
    <Reveal
      delay={Math.min(i, 5) * 90}
      as="article"
      className="relative border border-ink/20 bg-parch p-6 shadow-[7px_7px_0_rgba(23,16,19,0.14)] transition-transform duration-300 hover:-translate-y-1 md:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-blood">Témoin entendu</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-ink">{d.name}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">{d.link}</p>
        </div>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45">{d.date}</span>
      </div>

      <blockquote className="mt-5 font-hand text-[1.55rem] leading-[1.25] text-ink md:text-[1.7rem]">
        « {d.quote} »
      </blockquote>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {d.photo && (
          <img
            src={d.photo}
            alt={`Photo jointe par ${d.name}`}
            className="h-20 w-20 border border-ink/25 object-cover"
          />
        )}
        {d.videoLabel && (
          <span className="inline-flex items-center gap-1.5 border border-ink/30 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/75">
            <ReelIcon className="h-3.5 w-3.5 text-blood" />
            {d.videoLabel}
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-blood underline decoration-blood/50 underline-offset-4 transition-colors hover:text-ink"
        >
          {open ? "Réduire la déposition" : "Lire la déposition complète"}
        </button>
      </div>

      <div className={`fold-grid ${open ? "open" : ""}`}>
        <div>
          <p className="mt-5 border-t border-dashed border-ink/25 pt-5 font-display text-[15px] leading-relaxed text-ink/85">
            {d.full}
          </p>
          <div className="mt-4 flex justify-end">
            <Stamp animate rot={7} className="text-[10px]">Certifié sincère</Stamp>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ContributeForm({ onAdd }: { onAdd: (d: Deposition) => void }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [success, setSuccess] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!msg.trim() && !photo && !video) {
      setError(true);
      setSuccess(false);
      setShakeKey((k) => k + 1);
      return;
    }
    const firstLine = msg.trim().split(/\n/)[0] ?? "";
    onAdd({
      name: name.trim() || "Témoin anonyme",
      link: "Témoin ajouté au dossier — en direct",
      date: "versée à l'instant",
      quote:
        firstLine.length > 0
          ? firstLine.length > 92
            ? firstLine.slice(0, 92) + "…"
            : firstLine
          : photo
            ? "Pièce photographique versée au dossier. Le greffe hoche la tête."
            : "Enregistrement vidéo versé au dossier. Le greffe sort les mouchoirs.",
      full:
        msg.trim() ||
        "Le témoin a préféré les images aux mots. Le greffe approuve : certaines preuves parlent d'elles-mêmes.",
      photo: photoUrl ?? undefined,
      videoLabel: video ? `Vidéo jointe — ${(video.size / 1048576).toFixed(1)} Mo` : undefined,
    });
    setName("");
    setMsg("");
    setPhoto(null);
    setVideo(null);
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null);
    setError(false);
    setSuccess(true);
    window.setTimeout(() => setSuccess(false), 7000);
  };

  const inputCls =
    "w-full border border-bone/30 bg-transparent px-3.5 py-3 font-mono text-[13px] text-bone placeholder:text-bone/35 transition-colors focus:border-ember focus:outline-none";

  return (
    <div id="deposer" className="relative scroll-mt-24 border-2 border-blood bg-ink p-7 text-bone shadow-[10px_10px_0_rgba(110,11,30,0.35)] md:p-10">
      <Stamp rot={5} className="absolute -top-4 right-6 bg-ink px-3 text-[10px]">Formulaire officiel</Stamp>

      <h3 className="font-display text-3xl font-black text-bone md:text-4xl">
        Déposer une pièce <span className="italic text-ember">à conviction</span>
      </h3>
      <p className="mt-4 max-w-2xl font-mono text-[12px] leading-relaxed text-bone/70">
        Témoin de la vie de Jenny ? Versez votre preuve au dossier : un message, une photo,
        une vidéo — ou les trois. Le greffe accepte tout, sauf le vide et le rose.
      </p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="dep-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
              Votre nom <span className="text-bone/40">(ou votre alias de témoin)</span>
            </label>
            <input
              id="dep-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex. : la voisine du chaton"
              className={inputCls}
              autoComplete="name"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="dep-photo" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
                Photo <span className="text-bone/40">(optionnel)</span>
              </label>
              <label
                htmlFor="dep-photo"
                className="flex h-[46px] cursor-pointer items-center justify-center border border-dashed border-bone/35 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/60 transition-colors hover:border-ember hover:text-ember"
              >
                {photo ? photo.name.slice(0, 18) : "Joindre une photo"}
              </label>
              <input
                id="dep-photo"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setPhoto(f);
                  if (photoUrl) URL.revokeObjectURL(photoUrl);
                  setPhotoUrl(f ? URL.createObjectURL(f) : null);
                }}
              />
            </div>
            <div>
              <label htmlFor="dep-video" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
                Vidéo <span className="text-bone/40">(recommandé)</span>
              </label>
              <label
                htmlFor="dep-video"
                className="flex h-[46px] cursor-pointer items-center justify-center border border-dashed border-bone/35 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/60 transition-colors hover:border-ember hover:text-ember"
              >
                {video ? video.name.slice(0, 18) : "Joindre une vidéo"}
              </label>
              <input
                id="dep-video"
                type="file"
                accept="video/*"
                className="sr-only"
                onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="dep-msg" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
            Votre message pour Jenny <span className="text-bone/40">(optionnel si photo ou vidéo)</span>
          </label>
          <textarea
            id="dep-msg"
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Racontez un souvenir, une preuve, un aveu. Le dossier garde tout."
            className={inputCls + " resize-none"}
          />
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            className="btn-stamp border border-ember/60 bg-blood px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-parch"
          >
            Verser la pièce au dossier
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
            Règle du greffe : message <span className="text-ember">ou</span> photo{" "}
            <span className="text-ember">ou</span> vidéo — jamais rien.
          </p>
        </div>

        {error && (
          <p
            key={shakeKey}
            role="alert"
            className="deny-shake border-l-2 border-blood pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ember"
          >
            Refusé par le greffe — une pièce vide ne peut être versée au dossier.
          </p>
        )}
        {success && (
          <p role="status" className="border-l-2 border-brass pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brass">
            Pièce versée au dossier — merci, témoin. Votre déposition apparaît ci-dessus.
          </p>
        )}
      </form>
    </div>
  );
}

export default function Depositions() {
  const [extra, setExtra] = useState<Deposition[]>([]);
  const all = [...extra, ...DEPOSITIONS];

  return (
    <section
      id="temoins"
      data-chapter="IV — Dépositions"
      className="paper-surface px-5 py-24 text-ink md:px-12 md:py-36 lg:px-20"
    >
      <SectionHead
        dark={false}
        num="IV"
        tag="Sous serment d'amitié"
        title={
          <>
            Dépositions <span className="italic text-blood">des témoins</span>
          </>
        }
      />

      <Reveal className="mb-14 -mt-6 max-w-3xl md:-mt-8">
        <p className="font-mono text-[12px] leading-relaxed text-ink/70">
          Les proches du sujet ont été entendus, un par un, avec du café et beaucoup de
          rires. Chaque témoin pouvait verser un message, une photo, une vidéo — ou les
          trois. Cliquez pour lire chaque déposition en entier. Le parjure est puni d'un
          câlin obligatoire.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 md:gap-7">
        {all.map((d, i) => (
          <DepositionCard key={d.name + d.date + i} d={d} i={i} isNew={i < extra.length} />
        ))}
      </div>

      <div className="mt-16 md:mt-20">
        <ContributeForm onAdd={(d) => setExtra((prev) => [d, ...prev])} />
      </div>
    </section>
  );
}
