-- ElektroVizsga: personal exam results. Run in Supabase SQL editor.
create table if not exists public.exam_attempts (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 score integer not null check(score >= 0),
 total integer not null check(total between 1 and 100),
 topic text not null default 'Összes témakör',
 answers jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 constraint valid_score check(score <= total)
);
create index if not exists exam_attempts_user_created_idx on public.exam_attempts(user_id,created_at desc);
alter table public.exam_attempts enable row level security;
create policy "Users can read only own attempts" on public.exam_attempts for select to authenticated using ((select auth.uid())=user_id);
create policy "Users can insert only own attempts" on public.exam_attempts for insert to authenticated with check ((select auth.uid())=user_id);

-- Public-facing learner usernames are separate from private e-mail identities.
create table if not exists public.learner_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 username text not null check (username ~ '^[A-Za-z0-9_]{3,24}$'),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create unique index if not exists learner_profiles_username_ci_idx on public.learner_profiles (lower(username));
alter table public.learner_profiles enable row level security;
create policy "Learners can view own profile" on public.learner_profiles for select to authenticated using ((select auth.uid())=user_id);
create policy "Learners can insert own profile" on public.learner_profiles for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Learners can update own username" on public.learner_profiles for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

-- API privileges: row access is still restricted by the RLS policies above.
revoke all on table public.exam_attempts from anon, authenticated;
revoke all on table public.learner_profiles from anon, authenticated;
grant select, insert on public.exam_attempts to authenticated;
grant select, insert, update(username) on public.learner_profiles to authenticated;
