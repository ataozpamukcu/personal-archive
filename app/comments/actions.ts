"use server";

import { createPendingComment } from "@/lib/comments";
import type { CommentTargetType } from "@/lib/comments";
import type { CommentFormState } from "@/lib/comment-form";
import { getArchiveTarget } from "@/lib/archive";

export async function submitComment(
  _previousState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const targetType = String(formData.get("targetType") ?? "").trim();
  const targetSlug = String(formData.get("targetSlug") ?? "").trim();
  const authorName = String(formData.get("authorName") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (website) {
    return { success: false, message: "Yorum gönderilemedi." };
  }

  if (targetType !== "writing" && targetType !== "block") {
    return { success: false, message: "Yorum hedefi bulunamadı." };
  }

  const target =
    targetType === "writing"
      ? await getArchiveTarget("writing", targetSlug)
      : await getArchiveTarget("block", targetSlug);
  if (!target) return { success: false, message: "Yorum hedefi bulunamadı." };

  if (!body) {
    return { success: false, message: "Yorum alanı boş bırakılamaz." };
  }

  if (body.length > 1000) {
    return { success: false, message: "Yorum en fazla 1000 karakter olabilir." };
  }

  if (authorName.length > 80) {
    return { success: false, message: "İsim en fazla 80 karakter olabilir." };
  }

  try {
    await createPendingComment({
      targetType: targetType as CommentTargetType,
      targetSlug,
      authorName: authorName || "Anonim",
      body,
    });

    return {
      success: true,
      message: "Yorumun gönderildi. Onaylandıktan sonra görünecek.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Yorum şu anda gönderilemedi. Lütfen daha sonra tekrar dene.",
    };
  }
}
