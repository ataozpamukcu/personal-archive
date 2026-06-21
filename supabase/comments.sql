-- This file works for both a fresh install and the existing post_slug schema.
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('writing', 'block')),
  target_slug text not null check (char_length(target_slug) between 1 and 160),
  author_name text not null default 'Anonim' check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Existing projects: add the new columns without deleting any comments.
alter table public.comments add column if not exists target_type text;
alter table public.comments add column if not exists target_slug text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'comments'
      and column_name = 'post_slug'
  ) then
    execute $migration$
      update public.comments
      set target_type = coalesce(target_type, 'writing'),
          target_slug = coalesce(target_slug, post_slug)
      where target_type is null or target_slug is null
    $migration$;
  end if;
end $$;

alter table public.comments alter column target_type set not null;
alter table public.comments alter column target_slug set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'comments_target_type_check'
  ) then
    alter table public.comments
      add constraint comments_target_type_check
      check (target_type in ('writing', 'block'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'comments_target_slug_check'
  ) then
    alter table public.comments
      add constraint comments_target_slug_check
      check (char_length(target_slug) between 1 and 160);
  end if;
end $$;

drop index if exists public.comments_public_lookup_idx;
alter table public.comments drop column if exists post_slug;

create index if not exists comments_target_lookup_idx
  on public.comments (target_type, target_slug, approved, created_at);

alter table public.comments enable row level security;

-- The application uses the server-only service role key. Browser clients get
-- no direct table access; public reads and anonymous inserts go through Next.js.
revoke all on table public.comments from anon, authenticated;
