-- Wellon & Vivian — wedding site database
-- Run this once in the Supabase dashboard → SQL Editor → New query → Run.
--
-- The website is a static site (GitHub Pages) with no server, so guests' browsers
-- write directly to these tables using the public anon key. Row-Level Security
-- below is what keeps that safe:
--   • rsvps    — anyone may INSERT (submit), NOBODY may read via the API (private).
--   • messages — anyone may INSERT and SELECT (the public guestbook wall).
-- You (the couple) always read/export everything in the Table Editor, which uses
-- a privileged connection that bypasses these policies.

-- ---------------------------------------------------------------------------
-- RSVPs
-- ---------------------------------------------------------------------------
create table if not exists public.rsvps (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  attending  text not null check (attending in ('yes', 'no')),
  guests     integer not null default 0,
  meal       text not null default '',
  song       text not null default '',
  note       text not null default ''
);

alter table public.rsvps enable row level security;

-- Guests may submit an RSVP...
create policy "anon can insert rsvps"
  on public.rsvps for insert
  to anon
  with check (true);

-- ...but there is deliberately NO select policy, so the anon key cannot read
-- anyone's RSVP back. (Table Editor still shows them to you.)

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
