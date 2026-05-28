-- NextAuth Google sign-in (separate from Supabase Auth public.users profile table)
create table if not exists public.thor_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create index if not exists thor_users_email_idx on public.thor_users (email);
