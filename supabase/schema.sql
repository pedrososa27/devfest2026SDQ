-- ============================================================
-- DevFest 2026 — Schema inicial para Supabase
-- Ejecuta este script en: Supabase Dashboard > SQL Editor
-- ============================================================

-- Habilitar extensión para UUIDs
create extension if not exists "pgcrypto";

-- ─── speakers ────────────────────────────────────────────────────────────────
create table if not exists public.speakers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  title         text,
  company       text,
  city          text,
  country       text,
  bio           text,
  photo_url     text,
  topics        text[],
  social_twitter  text,
  social_linkedin text,
  social_github   text,
  featured      boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Migration: add city/country if table already exists
alter table public.speakers add column if not exists city text;
alter table public.speakers add column if not exists country text;

alter table public.speakers enable row level security;
create policy "speakers: public read" on public.speakers
  for select using (true);

-- ─── talks ───────────────────────────────────────────────────────────────────
create table if not exists public.talks (
  id          uuid primary key default gen_random_uuid(),
  speaker_id  uuid references public.speakers(id) on delete set null,
  title       text not null,
  description text,
  track       text,
  room        text,
  starts_at   timestamptz not null,
  ends_at     timestamptz not null,
  talk_type   text not null default 'talk'
                check (talk_type in ('talk','workshop','keynote','panel','break')),
  level       text check (level in ('beginner','intermediate','advanced')),
  language    text,
  created_at  timestamptz not null default now()
);

alter table public.talks enable row level security;
create policy "talks: public read" on public.talks
  for select using (true);

-- ─── sponsors ────────────────────────────────────────────────────────────────
create table if not exists public.sponsors (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  logo_url      text,
  website_url   text,
  tier          text not null default 'community'
                  check (tier in ('platinum','gold','silver','bronze','community')),
  display_order int not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.sponsors enable row level security;
create policy "sponsors: public read" on public.sponsors
  for select using (true);

-- ─── volunteer_applications ──────────────────────────────────────────────────
create table if not exists public.volunteer_applications (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  email          text not null,
  phone          text,
  preferred_area text,
  message        text,
  status         text not null default 'pending'
                   check (status in ('pending','accepted','rejected','waitlist')),
  created_at     timestamptz not null default now()
);

alter table public.volunteer_applications enable row level security;
-- Solo inserts públicos; lectura restringida a service_role
create policy "volunteer_applications: public insert" on public.volunteer_applications
  for insert with check (true);

-- ─── contact_messages ────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
create policy "contact_messages: public insert" on public.contact_messages
  for insert with check (true);

-- ─── core_team ───────────────────────────────────────────────────────────────
-- Los 4 líderes principales del evento (GDG Lead, Program Chair, Ops Lead, etc.)
create table if not exists public.core_team (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role_label    text not null,           -- "GDG LEAD" | "PROGRAM CHAIR" | …
  accent_label  text not null,           -- Etiqueta corta: "LEAD" | "PROG" | "OPS" | "CONT"
  title         text,                    -- "Chapter Organizer, GDG Santo Domingo"
  bio           text,
  photo_url     text,
  handle        text,                    -- "@carolina.dev"
  social_twitter  text,
  social_linkedin text,
  social_github   text,
  display_order int not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.core_team enable row level security;
create policy "core_team: public read" on public.core_team
  for select using (true);

-- ─── committee_members ───────────────────────────────────────────────────────
-- Comité organizador: track captains, comunicaciones, DEI, finanzas, etc.
create table if not exists public.committee_members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  initials      text not null,           -- "AB", "MR", etc. (para el avatar)
  badge         text not null,           -- "AI" | "SEC" | "DATA" | "UI/UX" | …
  role          text not null,           -- "Track Captain — AI/ML"
  area          text,                    -- Área libre: "track" | "comms" | "dei" | "finance" | …
  handle        text,                    -- "@alejandro.ai"
  photo_url     text,
  social_twitter  text,
  social_linkedin text,
  social_github   text,
  display_order int not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.committee_members enable row level security;
create policy "committee_members: public read" on public.committee_members
  for select using (true);

-- ─── volunteers ──────────────────────────────────────────────────────────────
-- Voluntarios activos, agrupados por área de trabajo
create table if not exists public.volunteers (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  initials      text not null,           -- "AS", "BR", etc. (para el avatar)
  area          text not null            -- "logistics" | "hospitality" | "tech" | "design" | "comms"
                  check (area in ('logistics','hospitality','tech','design','comms')),
  photo_url     text,
  handle        text,
  social_linkedin text,
  display_order int not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

alter table public.volunteers enable row level security;
create policy "volunteers: public read" on public.volunteers
  for select using (true);

-- ─── site_config ─────────────────────────────────────────────────────────────
-- Feature flags para activar/desactivar secciones del sitio desde el dashboard.
-- Siempre debe existir exactamente UNA fila (id = 'default').
create table if not exists public.site_config (
  id                    text primary key default 'default',

  -- Visibilidad de páginas/secciones completas
  show_schedule         boolean not null default true,
  show_speakers         boolean not null default true,
  show_team             boolean not null default true,

  -- Secciones opcionales de la landing
  show_sponsors         boolean not null default true,
  show_cfp              boolean not null default false,
  show_pricing          boolean not null default true,
  show_past_talks       boolean not null default true,
  show_map              boolean not null default true,

  -- Mensajes de "próximamente" por sección (null = sin mensaje extra)
  schedule_coming_soon_msg  text,
  speakers_coming_soon_msg  text,
  team_coming_soon_msg      text,

  updated_at            timestamptz not null default now()
);

alter table public.site_config enable row level security;
-- Lectura pública para que el frontend pueda leer los flags
create policy "site_config: public read" on public.site_config
  for select using (true);
-- Solo service_role puede modificar (desde el dashboard de Supabase)

-- Insertar la fila inicial con todos los flags activos
insert into public.site_config (id) values ('default')
  on conflict (id) do nothing;

-- ─── past_talks ──────────────────────────────────────────────────────────────
create table if not exists public.past_talks (
  id               uuid primary key default gen_random_uuid(),
  youtube_video_id text not null,
  title            text not null,
  speaker          text,
  year             text,
  display_order    int  not null default 0,
  active           boolean not null default true,
  created_at       timestamptz not null default now()
);

alter table public.past_talks enable row level security;
create policy "past_talks: public read" on public.past_talks
  for select using (true);

-- ─── RLS policies para usuarios autenticados (admins) ────────────────────────
-- Los admins se crean manualmente en: Supabase Dashboard > Authentication > Users
-- Tienen acceso completo (INSERT, UPDATE, DELETE) a todas las tablas de contenido.

-- speakers
create policy "speakers: auth full access" on public.speakers
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- talks
create policy "talks: auth full access" on public.talks
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- sponsors
create policy "sponsors: auth full access" on public.sponsors
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- core_team
create policy "core_team: auth full access" on public.core_team
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- committee_members
create policy "committee_members: auth full access" on public.committee_members
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- volunteers
create policy "volunteers: auth full access" on public.volunteers
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- past_talks
create policy "past_talks: auth full access" on public.past_talks
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- site_config
create policy "site_config: auth full access" on public.site_config
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- volunteer_applications (lectura para admins)
create policy "volunteer_applications: auth read" on public.volunteer_applications
  for select using (auth.role() = 'authenticated');
create policy "volunteer_applications: auth update" on public.volunteer_applications
  for update using (auth.role() = 'authenticated');

-- contact_messages (lectura para admins)
create policy "contact_messages: auth read" on public.contact_messages
  for select using (auth.role() = 'authenticated');
create policy "contact_messages: auth update" on public.contact_messages
  for update using (auth.role() = 'authenticated');
