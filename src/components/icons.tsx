import type { CSSProperties } from "react";

/* Icônes SVG dessinées pour le dossier — trait net, style PV. */

type IconProps = { className?: string; style?: CSSProperties };

export function PawIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <ellipse cx="5.4" cy="9.6" rx="2" ry="2.6" transform="rotate(-18 5.4 9.6)" />
      <ellipse cx="9.6" cy="6.4" rx="2" ry="2.7" transform="rotate(-6 9.6 6.4)" />
      <ellipse cx="14.4" cy="6.4" rx="2" ry="2.7" transform="rotate(6 14.4 6.4)" />
      <ellipse cx="18.6" cy="9.6" rx="2" ry="2.6" transform="rotate(18 18.6 9.6)" />
      <path d="M12 10.2c-2.9 0-5.6 2.3-6.3 4.9-.5 1.9.5 3.7 2.4 4.1 1.3.3 2.5-.3 3.9-.3s2.6.6 3.9.3c1.9-.4 2.9-2.2 2.4-4.1-.7-2.6-3.4-4.9-6.3-4.9Z" />
    </svg>
  );
}

export function BunnyIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M9.2 10.5C8 7.5 7.6 3.8 9 2.6c1.3-1.1 2.6 1.5 3 5.4M14.8 10.5c1.2-3 1.6-6.7.2-7.9-1.3-1.1-2.6 1.5-3 5.4" />
      <circle cx="12" cy="15.5" r="5.5" />
      <circle cx="10" cy="14.6" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="14" cy="14.6" r="0.45" fill="currentColor" stroke="none" />
      <path d="M11 17.4c.6.5 1.4.5 2 0" />
    </svg>
  );
}

export function ReelIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="12" cy="6.4" r="1.6" />
      <circle cx="12" cy="17.6" r="1.6" />
      <circle cx="6.4" cy="12" r="1.6" />
      <circle cx="17.6" cy="12" r="1.6" />
      <path d="M20.4 15.5 23 19" strokeLinecap="round" />
    </svg>
  );
}

export function FolderIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M3 6.5V5a1.5 1.5 0 0 1 1.5-1.5h4.6L11 6h8.5A1.5 1.5 0 0 1 21 7.5v11A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5Z" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function QuillIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 3.5c-6.5.5-11.5 3.5-14 8.5-1.3 2.6-2 5.5-2 8.5 3 0 5.9-.7 8.5-2 5-2.5 8-7.5 8.5-14Z" />
      <path d="M4.5 19.5C9 14 13 10.5 17.5 7.5" />
    </svg>
  );
}

export function SealIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="10" r="6.5" />
      <circle cx="12" cy="10" r="3.4" />
      <path d="m8.8 15.5-2.3 6 3.6-1.8 1.9 2 1.9-2 3.6 1.8-2.3-6" />
    </svg>
  );
}

export function ArrowDownIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v15m0 0 6-6m-6 6-6-6" />
    </svg>
  );
}

export function PlayIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <path d="M8 5.5v13l11-6.5Z" />
    </svg>
  );
}

export function PauseIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <rect x="6.5" y="5" width="4" height="14" />
      <rect x="13.5" y="5" width="4" height="14" />
    </svg>
  );
}
