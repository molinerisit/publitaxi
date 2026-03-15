-- DATABASE_SCHEMA.sql

create table taxi_drivers (
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

create table companies (
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

create table campaign_requests (
id uuid primary key default uuid_generate_v4(),
company_id uuid,
driver_id uuid,
status text,
message text,
created_at timestamp default now()
);