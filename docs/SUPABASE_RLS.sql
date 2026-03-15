-- RLS minimo seguro para MVP Publitaxi
-- Permite inserts desde la landing y bloquea lectura publica de tablas.

alter table taxi_drivers enable row level security;
alter table companies enable row level security;

-- Permitir alta de taxistas desde cliente anon/authenticated
DROP POLICY IF EXISTS "anon_insert_taxi_drivers" ON taxi_drivers;
CREATE POLICY "anon_insert_taxi_drivers"
ON taxi_drivers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permitir alta de empresas desde cliente anon/authenticated
DROP POLICY IF EXISTS "anon_insert_companies" ON companies;
CREATE POLICY "anon_insert_companies"
ON companies
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permitir upload de fotos al bucket taxi-photos desde landing
DROP POLICY IF EXISTS "anon_insert_taxi_photos" ON storage.objects;
CREATE POLICY "anon_insert_taxi_photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'taxi-photos');
