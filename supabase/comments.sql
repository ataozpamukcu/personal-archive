create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null check (char_length(post_slug) between 1 and 160),
  author_name text not null default 'Anonim' check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists comments_public_lookup_idx
  on public.comments (post_slug, approved, created_at);

alter table public.comments enable row level security;

-- The application uses the server-only service role key. Browser clients get
-- no direct table access; public reads and anonymous inserts go through Next.js.
revoke all on table public.comments from anon, authenticated;
