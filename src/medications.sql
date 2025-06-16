create table medications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  name text not null,
  dosage text not null,
  frequency text,
  taken_on date[]
);
