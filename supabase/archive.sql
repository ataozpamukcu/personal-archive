create table if not exists public.archive_items (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('writing', 'block')),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  content_type text not null,
  title text not null check (char_length(title) between 1 and 180),
  published boolean not null default true,
  date date,
  display_date text,
  excerpt text,
  body text not null default '',
  source text,
  source_href text,
  media_url text,
  media_path text,
  poster_url text,
  poster_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (target_type, slug)
);

create index if not exists archive_items_public_idx
  on public.archive_items (published, target_type, created_at desc);

alter table public.archive_items enable row level security;
revoke all on table public.archive_items from anon, authenticated;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'archive-media',
  'archive-media',
  true,
  104857600,
  array[
    'video/mp4',
    'video/quicktime',
    'video/webm',
    'video/x-m4v',
    'audio/mpeg',
    'audio/mp4',
    'audio/wav',
    'audio/ogg',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
