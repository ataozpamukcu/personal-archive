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

const commentColumns =
  "id, target_type, target_slug, author_name, body, approved, created_at";

export async function getApprovedComments(
  targetType: CommentTargetType,
  targetSlug: string,
) {
  const { data, error } = await getSupabaseAdmin()
    .from("comments")
    .select(commentColumns)
    .eq("target_type", targetType)
    .eq("target_slug", targetSlug)
    .eq("approved", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Comments could not be loaded: ${error.message}`);
  return (data ?? []) as ArchiveComment[];
}

export async function getPendingComments() {
  const { data, error } = await getSupabaseAdmin()
    .from("comments")
    .select(commentColumns)
    .eq("approved", false)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Comments could not be loaded: ${error.message}`);
  return (data ?? []) as ArchiveComment[];
}

export async function createPendingComment(input: {
  targetType: CommentTargetType;
  targetSlug: string;
  authorName: string;
  body: string;
}) {
  const { error } = await getSupabaseAdmin().from("comments").insert({
    target_type: input.targetType,
    target_slug: input.targetSlug,
    author_name: input.authorName,
    body: input.body,
    approved: false,
  });

  if (error) throw new Error(`Comment could not be saved: ${error.message}`);
}

export async function approveComment(id: string) {
  const { data, error } = await getSupabaseAdmin()
    .from("comments")
    .update({ approved: true })
    .eq("id", id)
    .eq("approved", false)
    .select("target_type, target_slug")
    .single();

  if (error) throw new Error(`Comment could not be approved: ${error.message}`);
  return data as {
    target_type: CommentTargetType;
    target_slug: string;
  };
}

export async function deleteComment(id: string) {
  const { error } = await getSupabaseAdmin()
    .from("comments")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Comment could not be deleted: ${error.message}`);
}
