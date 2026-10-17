create extension if not exists pgcrypto;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null
);

alter table public.messages enable row level security;
alter table public.settings enable row level security;
