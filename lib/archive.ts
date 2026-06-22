import { cache } from "react";
import {
  blocks as staticBlocks,
  writings as staticWritings,
  type ArchiveBlock,
  type Writing,
} from "@/data/archive";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type ManagedArchiveItem = {
  id: string;
  target_type: "writing" | "block";
  slug: string;
  content_type: string;
  title: string;
  published: boolean;
  date: string | null;
  display_date: string | null;
  excerpt: string | null;
  body: string;
  source: string | null;
  source_href: string | null;
  media_url: string | null;
  media_path: string | null;
  poster_url: string | null;
  poster_path: string | null;
  created_at: string;
};

const archiveColumns = [
  "id",
  "target_type",
  "slug",
  "content_type",
  "title",
  "published",
  "date",
  "display_date",
  "excerpt",
  "body",
  "source",
  "source_href",
  "media_url",
  "media_path",
  "poster_url",
  "poster_path",
  "created_at",
].join(", ");

function isMissingArchiveTable(error: { code?: string; message?: string } | null) {
  return Boolean(
    error &&
      (error.code === "PGRST205" || error.message?.includes("archive_items")),
  );
}

function splitBody(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function rowToWriting(row: ManagedArchiveItem): Writing {
  return {
    slug: row.slug,
    title: row.title,
    type: row.content_type as Writing["type"],
    date: row.date ?? undefined,
    displayDate: row.display_date ?? "Tarihsiz",
    excerpt: row.excerpt ?? undefined,
    body: splitBody(row.body),
  };
}

function rowToBlock(row: ManagedArchiveItem): ArchiveBlock {
  return {
    slug: row.slug,
    title: row.title,
    type: row.content_type as ArchiveBlock["type"],
    date: row.date ?? undefined,
    displayDate: row.display_date ?? undefined,
    excerpt: row.excerpt ?? undefined,
    body: splitBody(row.body),
    source: row.source ?? undefined,
    sourceHref: row.source_href ?? undefined,
    mediaSrc: row.media_url ?? undefined,
    posterSrc: row.poster_url ?? undefined,
  };
}

async function getPublishedRows() {
  const { data, error } = await getSupabaseAdmin()
    .from("archive_items")
    .select(archiveColumns)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (isMissingArchiveTable(error)) return [];
  if (error) throw new Error(`Archive content could not be loaded: ${error.message}`);
  return (data ?? []) as unknown as ManagedArchiveItem[];
}

export const getArchiveIndex = cache(async () => {
  const rows = await getPublishedRows();
  const dynamicWritings = rows
    .filter((row) => row.target_type === "writing")
    .map(rowToWriting);
  const dynamicBlocks = rows
    .filter((row) => row.target_type === "block")
    .map(rowToBlock);

  const writingSlugs = new Set(dynamicWritings.map((item) => item.slug));
  const blockSlugs = new Set(dynamicBlocks.map((item) => item.slug));

  return {
    writings: [
      ...dynamicWritings,
      ...staticWritings.filter((item) => !writingSlugs.has(item.slug)),
    ],
    blocks: [
      ...dynamicBlocks,
      ...staticBlocks.filter((item) => !blockSlugs.has(item.slug)),
    ],
  };
});

export function getArchiveTarget(
  targetType: "writing",
  slug: string,
): Promise<Writing | undefined>;
export function getArchiveTarget(
  targetType: "block",
  slug: string,
): Promise<ArchiveBlock | undefined>;
export async function getArchiveTarget(
  targetType: "writing" | "block",
  slug: string,
) {
  const archive = await getArchiveIndex();
  return targetType === "writing"
    ? archive.writings.find((item) => item.slug === slug)
    : archive.blocks.find((item) => item.slug === slug);
}

export async function getManagedArchiveItems() {
  const { data, error } = await getSupabaseAdmin()
    .from("archive_items")
    .select(archiveColumns)
    .order("created_at", { ascending: false });

  if (isMissingArchiveTable(error)) return [];
  if (error) throw new Error(`Admin content could not be loaded: ${error.message}`);
  return (data ?? []) as unknown as ManagedArchiveItem[];
}

export async function createManagedArchiveItem(
  input: Omit<ManagedArchiveItem, "id" | "created_at">,
) {
  const { error } = await getSupabaseAdmin().from("archive_items").insert(input);
  if (error) throw new Error(`Content could not be saved: ${error.message}`);
}

export async function deleteManagedArchiveItem(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("archive_items")
    .delete()
    .eq("id", id)
    .select("media_path, poster_path")
    .single();

  if (error) throw new Error(`Content could not be deleted: ${error.message}`);

  const paths = [data.media_path, data.poster_path].filter(
    (path): path is string => Boolean(path),
  );
  if (paths.length > 0) {
    await supabase.storage.from("archive-media").remove(paths);
  }
}
