-- Migration: 001_create_leads
-- Tabla para almacenar leads capturados desde la landing de ConversIA

create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  telefono       text not null,
  email          text not null,
  nombre         text,
  chats_por_dia  text,
  canales        text[],
  crm_actual     text,
  servicios      text,
  tiene_campanas text,
  created_at     timestamptz not null default now()
);

-- Índices para consultas frecuentes
create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Row Level Security — solo el service role puede leer/escribir
alter table public.leads enable row level security;

-- Sin políticas públicas: el acceso es exclusivamente via service role key
-- (no se necesita política porque RLS con service role bypassa las policies)
