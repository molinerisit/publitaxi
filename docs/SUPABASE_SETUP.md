# Setup Rapido Supabase (MVP)

Esta guia deja el flujo completo funcionando:

1. Registro de taxistas
2. Registro de empresas
3. Panel admin con listados

## 1) Crear proyecto en Supabase

- Entrar a https://supabase.com/
- Crear un proyecto nuevo
- Guardar:
  - Project URL
  - Publishable key (anon)
  - Service role key

## 2) Crear tablas del MVP

En SQL Editor de Supabase, ejecutar:

```sql
create extension if not exists "uuid-ossp";

create table if not exists taxi_drivers (
  id uuid primary key default uuid_generate_v4(),
  name text,
  phone text,
  plate_number text,
  zone text,
  taxi_model text,
  photo_url text,
  ad_spaces text[],
  created_at timestamp default now()
);

create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  company_name text,
  contact_name text,
  email text,
  phone text,
  budget text,
  campaign_duration text,
  notes text,
  created_at timestamp default now()
);

create table if not exists campaign_requests (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid,
  driver_id uuid,
  status text,
  message text,
  created_at timestamp default now()
);
```

## 3) Activar RLS minimo seguro (recomendado)

En SQL Editor de Supabase, ejecutar:

```sql
alter table taxi_drivers enable row level security;
alter table companies enable row level security;

drop policy if exists "anon_insert_taxi_drivers" on taxi_drivers;
create policy "anon_insert_taxi_drivers"
on taxi_drivers
for insert
to anon, authenticated
with check (true);

drop policy if exists "anon_insert_companies" on companies;
create policy "anon_insert_companies"
on companies
for insert
to anon, authenticated
with check (true);

drop policy if exists "anon_insert_taxi_photos" on storage.objects;
create policy "anon_insert_taxi_photos"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'taxi-photos');
```

Resultado esperado:

- Formularios web pueden insertar datos.
- Lectura publica de tablas queda bloqueada.
- El panel admin lee con service role desde servidor.

## 4) Crear bucket de fotos

En Storage:

- Crear bucket `taxi-photos`
- Marcarlo publico (public)

## 5) Configurar variables de entorno

Crear `.env.local` en la raiz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
ADMIN_ACCESS_KEY=tu_clave_privada_admin
```

Si en tu dashboard aparece "Publishable Key", usala en `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
`SUPABASE_SERVICE_ROLE_KEY` se usa solo del lado servidor para `/admin`.
Nunca exponerla en frontend ni compartirla.

## 6) Levantar app

```powershell
npm install
npm run dev
```

Abrir:

- Landing: `http://localhost:3000`
- Admin: `http://localhost:3000/admin?key=tu_clave_privada_admin`

## 7) Prueba funcional completa (smoke test)

1. Completar formulario de taxista y enviar.
2. Completar formulario de empresa y enviar.
3. Ir a confirmacion y volver al inicio.
4. Abrir admin con clave y validar que aparecen ambos registros.

## 8) Errores comunes

- Error `Missing Supabase environment variables`:
  - Revisar `.env.local` y reiniciar `npm run dev`.

- Error al subir foto:
  - Verificar que existe el bucket `taxi-photos` y que sea publico.

- Admin sin datos:
  - Confirmar que los formularios enviaron bien.
  - Confirmar URL admin con `?key=` correcta.
  - Verificar `SUPABASE_SERVICE_ROLE_KEY` en `.env.local`.
