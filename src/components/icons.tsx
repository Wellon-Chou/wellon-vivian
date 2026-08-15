/* Authored icon set — one consistent 1.5px stroke, currentColor, 24px grid.
   No emoji or unicode glyphs stand in for icons anywhere in the site. */

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Aperture = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v6M20.8 8l-5.2 3M20.8 16l-5.2-3M12 21v-6M3.2 16l5.2-3M3.2 8l5.2 3" />
  </svg>
);

export const Play = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

export const Calendar = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17M8 3.5v3.5M16 3.5v3.5" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21c4.5-4.2 6.75-7.65 6.75-10.5A6.75 6.75 0 0 0 5.25 10.5C5.25 13.35 7.5 16.8 12 21Z" />
    <circle cx="12" cy="10.3" r="2.4" />
  </svg>
);

export const Envelope = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const Quote = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M9.4 6C6.9 7.3 5.3 9.6 5.3 12.6c0 .3 0 .6.1.9.5-.4 1.2-.6 1.9-.6 1.6 0 2.9 1.2 2.9 2.9 0 1.7-1.3 3-3.1 3-2.2 0-3.8-1.9-3.8-4.7C3.2 10.4 5.2 7 9 5.2L9.4 6Zm9 0c-2.5 1.3-4.1 3.6-4.1 6.6 0 .3 0 .6.1.9.5-.4 1.2-.6 1.9-.6 1.6 0 2.9 1.2 2.9 2.9 0 1.7-1.3 3-3.1 3-2.2 0-3.8-1.9-3.8-4.7 0-3.6 2-7 5.8-8.8l.4.8Z" />
  </svg>
);

export const ArrowDown = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const External = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M14 5h5v5M19 5l-8 8M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </svg>
);

export const Menu = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Download = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 4v11M8 11l4 4 4-4M5 20h14" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 12.5 10 17l9-10" />
  </svg>
);

/* The couple's rotated-diamond monogram mark, drawn (not a CSS square). */
export const Diamond = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden className={className}>
    <path d="M12 2.5 21.5 12 12 21.5 2.5 12 12 2.5Z" />
    <path d="M12 6.5 17.5 12 12 17.5 6.5 12 12 6.5Z" opacity="0.5" />
  </svg>
);
