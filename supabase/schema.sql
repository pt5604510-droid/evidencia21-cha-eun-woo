-- =====================================================================
-- schema.sql · Base de datos del libro de visitas (Evidencia 21)
-- Cómo usarlo: Supabase → SQL Editor → New query → pega todo → Run
-- =====================================================================

-- 1) TABLA: aquí se guardan los mensajes (incluye el correo, que es privado)
create table if not exists public.visitas (
  id         uuid        primary key default gen_random_uuid(),
  nombre     text        not null check (char_length(nombre)  between 2 and 40),
  correo     text        not null check (correo ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
                                     and char_length(correo) <= 120),
  obra       text        not null check (char_length(obra) between 1 and 60),
  visitante  text        not null check (visitante in ('Fan', 'Curioso', 'Estudiante')),
  mensaje    text        not null check (char_length(mensaje) between 5 and 240),
  creado_en  timestamptz not null default now()
);

-- 2) SEGURIDAD (RLS): la tabla queda protegida; solo se permite INSERTAR
alter table public.visitas enable row level security;

drop policy if exists "Cualquiera puede publicar" on public.visitas;
create policy "Cualquiera puede publicar"
  on public.visitas
  for insert
  to anon
  with check (true);          -- las reglas "check" de arriba validan los datos

-- El visitante anónimo NO puede leer, editar ni borrar la tabla
revoke all on public.visitas from anon;
grant insert on public.visitas to anon;

-- 3) VISTA PÚBLICA: lo que sí puede leer cualquiera (sin el correo)
create or replace view public.visitas_publicas as
  select id, nombre, obra, visitante, mensaje, creado_en
  from public.visitas
  order by creado_en desc
  limit 50;

grant select on public.visitas_publicas to anon;
