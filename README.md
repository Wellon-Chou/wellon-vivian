# Wellon &amp; Vivian — Wedding Website

An editorial, single-page wedding site: photo gallery, wedding film, RSVP link,
and a guestbook. Built with Next.js 16 (App Router), React 19,
Tailwind CSS v4, and TypeScript. Ships as a **static export** — hostable free on
GitHub Pages — with guest messages saved to **Supabase** and RSVPs collected by
an external form service.

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit .env.local (see below)
npm run dev
```

Open http://localhost:3000. There is no admin page — you read and export
submissions in the Supabase dashboard (Table Editor).

## Configure

Edit `.env.local` (all values are `NEXT_PUBLIC_` because a static site inlines
them at build time):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key (safe for the browser). |
| `NEXT_PUBLIC_FILM_URL` | Public URL of the wedding film (Supabase Storage). |
| `NEXT_PUBLIC_SITE_URL` | Your live URL, used for SEO + social share tags. |
| `NEXT_PUBLIC_BASE_PATH` | Empty for a custom domain / user-site; `/repo-name` for a project repo. |

First-time setup: run `supabase/schema.sql` once in the Supabase dashboard →
SQL Editor to create the `messages` table with the right access rules.

The RSVP button links to an external form — change the destination by editing
`RSVP_URL` in `src/lib/constants.ts`.

## Making it yours

Everything you need to personalise is in a few obvious places:

- **Names, date, venue, dress code** → `src/lib/constants.ts` (`EVENT`). All
  event facts start as clearly-marked *“To be announced”* placeholders — fill
  them in once confirmed.
- **Your story** → the `#story` section in `src/components/HomeContent.tsx`.
- **Photos** → drop image files in `public/gallery/` and set each photo’s
  `src` in `src/components/Gallery.tsx` (e.g. `src: "/gallery/first-look.jpg"`).
  Empty photos render as elegant labelled placeholders.
- **Wedding film** → set `NEXT_PUBLIC_FILM_URL` to the film's public URL. The
  player (`<FilmPlayer />` in `src/components/HomeContent.tsx`) streams a
  self-hosted file inline; it also accepts a YouTube/Vimeo `embedUrl` instead.

## Languages (English / 中文)

The public site is fully bilingual. A EN / 中文 toggle in the header switches
**all** text instantly and remembers the choice in `localStorage` (`wv_lang`).
The static pages render Chinese-first (the default) and the client restores the
guest's saved choice on load.

- **All UI copy** lives in `src/lib/i18n.ts` (`en` and `zh` dictionaries) — edit
  wording there. Form validation/confirmation messages are in the same file
  (`formMessages`) and are shown in the guest's chosen language.
- **Event facts** (date, venue, dress code) have `…Zh` variants in
  `src/lib/constants.ts`; components pick the right one by language.

## Where the data goes

Guestbook messages are written **directly from the guest's browser to Supabase**
(`src/components/Guestbook.tsx` via `src/lib/supabase.ts`). Row-Level Security
(`supabase/schema.sql`) lets anyone *submit* and lets the guestbook wall be read
publicly. You read and **export** them (CSV) in the Supabase dashboard → Table
Editor.

RSVPs go to the external form at `RSVP_URL` (`src/lib/constants.ts`) and are read
in that service's own dashboard — this site neither validates nor stores them.

There is no server and no `/admin` page — nothing to host or secure.

## Deploying to GitHub Pages

`npm run build` produces a static site in `out/`. The included workflow
(`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.

1. In the repo: **Settings → Pages → Source = GitHub Actions**.
2. **Settings → Secrets and variables → Actions** — add the Supabase secrets
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) and
   `NEXT_PUBLIC_FILM_URL`. `NEXT_PUBLIC_SITE_URL` is optional (defaults to
   `https://wellon0314vivian.com`). For a project-page repo, add a
   `NEXT_PUBLIC_BASE_PATH` **variable** = `/repo-name`.
3. Push to `main`. For a custom domain, add a `public/CNAME` file with the
   domain and configure DNS.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — build the static export into `out/`
- `npm run lint` — lint
# wellon-vivian
