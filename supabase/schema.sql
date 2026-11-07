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
