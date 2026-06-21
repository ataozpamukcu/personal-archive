"use server";

import { createPendingComment } from "@/lib/comments";
import type { CommentFormState } from "@/lib/comment-form";
import { writings } from "@/data/archive";

export async function submitComment(
  _previousState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const postSlug = String(formData.get("postSlug") ?? "").trim();
  const authorName = String(formData.get("authorName") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (website) {
    return { success: false, message: "Yorum gönderilemedi." };
  }

  if (!writings.some((writing) => writing.id === postSlug)) {
    return { success: false, message: "Bu yazı bulunamadı." };
  }

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
      postSlug,
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
