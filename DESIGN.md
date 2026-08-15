# Design — Wellon & Vivian

*Editorial & Timeless.* A wedding invitation suite that behaves like a couture
magazine: typography is the art. It refuses the photo-collage template and the
pastel floral card. Contract key: `WV-EDITORIAL-01` (see `src/app/layout.tsx`).

## Palette

Warm ivory paper alternating with warm ink bands; antique gold as the only
metal. Tokens live in `src/app/globals.css` (`:root`).

| Role | Token | Value |
| --- | --- | --- |
| Ground | `--paper` | `#f5efe3` |
| Ground (alt band) | `--paper-2` | `#efe6d4` |
| Framed slot | `--paper-3` | `#e8ddc7` |
| Ink (dark bands) | `--ink` | `#17120b` |
| Body on paper | `--ink-soft` | `#433a2c` |
| Secondary | `--taupe` | `#736550` |
| Gold (on paper) | `--gold` | `#9a7b3f` |
| Gold (on ink) | `--gold-bright` | `#c2a25e` |
| Foreground on ink | `--on-ink` | `#f0e8d8` |

Ink bands (`.on-ink`) carry the Film, RSVP, and Footer sections — the contrast
against ivory is the "expensive" move, not decoration.

## Type

- **Display:** Bodoni Moda (`--font-display`) — huge, high-contrast Didone,
  italic for accents (the ampersand, key words, quotes). Loaded in `layout.tsx`.
- **Text / UI:** EB Garamond (`--font-serif`) — body, forms, and tracked
  small-caps labels.
- `.display` sets the headline voice; `.display-italic` the accent; `.label`
  is tracked uppercase Garamond used **only** as standalone metadata (dates,
  nav, field labels) — never as an eyebrow stacked above a heading.
- Body measure capped at ~58ch (`.prose-measure`); display clamps up to ~11rem.

## Components & motifs

- **Rotated-diamond mark** (`Diamond` icon / `.mark`) — the couple's monogram
  motif, used as section dividers and the W&V lockup.
- **`.frame`** — the media placeholder/host. Holds photos (`<img>`), the film,
  or a labelled "Photo to be added" state. Real media simply sets `src`.
- **`.mark-line`** — a centred hairline-flanked mark for section breaks.
- **Buttons** — flat ink fill inverting to outline on hover (`.btn`,
  `.btn-ghost`); no rounded pills, no shadow.
- **Forms** — underline fields (`.field`), a segmented radio (`.choice`) for
  the RSVP accept/decline; gold focus lines.
- **Icons** — one authored SVG set (`src/components/icons.tsx`), 1.5px stroke,
  `currentColor`. No emoji or unicode glyphs anywhere.

## Motion

One authored gesture: scroll-reveal (`.reveal` + `Reveal.tsx`) — an
exponential ease-out from a blurred, offset default. Armed only when JS is
present (`html.js`), so content is never lost without JS, and disabled under
`prefers-reduced-motion`. Gallery hover is a slow 1.2s image scale.

## Layout

- `.shell` (76rem) / `.shell-narrow` (52rem) with fluid gutters.
- `.section` vertical rhythm clamps 4.5→9rem; more space above headings than
  below. Bands alternate ivory / ivory-2 / ink to pace the scroll.

## Surfaces

- `/` — the one-page invitation (Persuade/Experience): Hero → Invitation →
  Story → Gallery → Film → Details → RSVP → Guestbook → Footer.
- `/admin` — the couple's private register (Operate): login gate, then RSVP
  table + message cards + CSV export. Same tokens, table-first and scannable.

## What to personalise

Event facts (`src/lib/constants.ts`), the Story copy and photo `src`s
(`src/app/page.tsx`, `src/components/Gallery.tsx`), and the film embed URL. All
event facts ship as clearly-marked "To be announced" placeholders.
