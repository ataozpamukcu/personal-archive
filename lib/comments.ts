import { getSupabaseAdmin } from "@/lib/supabase/server";

export type CommentTargetType = "writing" | "block";

export type ArchiveComment = {
  id: string;
  target_type: CommentTargetType;
  target_slug: string;
  author_name: string;
  body: string;
  approved: boolean;
  created_at: string;
};

type LegacyComment = Omit<ArchiveComment, "target_type" | "target_slug"> & {
  post_slug: string;
};

type SupabaseError = {
  code?: string;
  message?: string;
};

const commentColumns =
  "id, target_type, target_slug, author_name, body, approved, created_at";
const legacyCommentColumns =
  "id, post_slug, author_name, body, approved, created_at";

function isLegacySchema(error: SupabaseError | null) {
  return Boolean(
    error &&
      (error.code === "42703" ||
        error.message?.includes("target_type") ||
        error.message?.includes("target_slug")),
  );
}

function toLegacySlug(targetType: CommentTargetType, targetSlug: string) {
  return targetType === "block" ? `block:${targetSlug}` : targetSlug;
}

function fromLegacyComment(comment: LegacyComment): ArchiveComment {
  const isBlock = comment.post_slug.startsWith("block:");

  return {
    id: comment.id,
    target_type: isBlock ? "block" : "writing",
    target_slug: isBlock ? comment.post_slug.slice(6) : comment.post_slug,
    author_name: comment.author_name,
    body: comment.body,
    approved: comment.approved,
    created_at: comment.created_at,
  };
}

export async function getApprovedComments(
  targetType: CommentTargetType,
  targetSlug: string,
) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("comments")
    .select(commentColumns)
    .eq("target_type", targetType)
    .eq("target_slug", targetSlug)
    .eq("approved", true)
    .order("created_at", { ascending: true });

  if (!error) return (data ?? []) as ArchiveComment[];
  if (!isLegacySchema(error)) {
    throw new Error(`Comments could not be loaded: ${error.message}`);
  }

  const legacy = await supabase
    .from("comments")
    .select(legacyCommentColumns)
    .eq("post_slug", toLegacySlug(targetType, targetSlug))
    .eq("approved", true)
    .order("created_at", { ascending: true });

  if (legacy.error) {
    throw new Error(`Comments could not be loaded: ${legacy.error.message}`);
  }

  return ((legacy.data ?? []) as LegacyComment[]).map(fromLegacyComment);
}

export async function getPendingComments() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("comments")
    .select(commentColumns)
    .eq("approved", false)
    .order("created_at", { ascending: true });

  if (!error) return (data ?? []) as ArchiveComment[];
  if (!isLegacySchema(error)) {
    throw new Error(`Comments could not be loaded: ${error.message}`);
  }

  const legacy = await supabase
    .from("comments")
    .select(legacyCommentColumns)
    .eq("approved", false)
    .order("created_at", { ascending: true });

  if (legacy.error) {
    throw new Error(`Comments could not be loaded: ${legacy.error.message}`);
  }

  return ((legacy.data ?? []) as LegacyComment[]).map(fromLegacyComment);
}

export async function createPendingComment(input: {
  targetType: CommentTargetType;
  targetSlug: string;
  authorName: string;
  body: string;
}) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("comments").insert({
    target_type: input.targetType,
    target_slug: input.targetSlug,
    author_name: input.authorName,
    body: input.body,
    approved: false,
  });

  if (!error) return;
  if (!isLegacySchema(error)) {
    throw new Error(`Comment could not be saved: ${error.message}`);
  }

  const legacy = await supabase.from("comments").insert({
    post_slug: toLegacySlug(input.targetType, input.targetSlug),
    author_name: input.authorName,
    body: input.body,
    approved: false,
  });

  if (legacy.error) {
    throw new Error(`Comment could not be saved: ${legacy.error.message}`);
  }
}

export async function approveComment(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("comments")
    .update({ approved: true })
    .eq("id", id)
    .eq("approved", false)
    .select("target_type, target_slug")
    .single();

  if (!error) {
    return data as {
      target_type: CommentTargetType;
      target_slug: string;
    };
  }

  if (!isLegacySchema(error)) {
    throw new Error(`Comment could not be approved: ${error.message}`);
  }

  const legacy = await supabase
    .from("comments")
    .update({ approved: true })
    .eq("id", id)
    .eq("approved", false)
    .select(legacyCommentColumns)
    .single();

  if (legacy.error) {
    throw new Error(`Comment could not be approved: ${legacy.error.message}`);
  }

  return fromLegacyComment(legacy.data as LegacyComment);
}

export async function deleteComment(id: string) {
  const { error } = await getSupabaseAdmin()
    .from("comments")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Comment could not be deleted: ${error.message}`);
}
