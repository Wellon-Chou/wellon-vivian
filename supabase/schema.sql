-- Wellon & Vivian — wedding site database
-- Run this once in the Supabase dashboard → SQL Editor → New query → Run.
--
-- The website is a static site (GitHub Pages) with no server, so guests' browsers
-- write directly to this table using the public anon key. Row-Level Security
-- below is what keeps that safe:
--   • messages — anyone may INSERT and SELECT (the public guestbook wall).
-- You (the couple) always read/export everything in the Table Editor, which uses
-- a privileged connection that bypasses these policies.
--
-- RSVPs are no longer collected here — they go to an external form service
-- (see RSVP_URL in src/lib/constants.ts). If you ran an earlier version of this
-- file, an unused `public.rsvps` table may still exist; drop it when you no
-- longer need the responses already in it.

-- ---------------------------------------------------------------------------
-- Guest messages (public guestbook wall)
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  message    text not null
);

alter table public.messages enable row level security;

create policy "anon can insert messages"
  on public.messages for insert
  to anon
  with check (true);

create policy "anon can read messages"
  on public.messages for select
  to anon
  using (true);
