"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearCommentsAdminCookie,
  isCommentsAdmin,
  setCommentsAdminCookie,
  verifyCommentsAdminPassword,
} from "@/lib/comments-admin";
import { approveComment, deleteComment } from "@/lib/comments";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function requireAdmin() {
  if (!(await isCommentsAdmin())) redirect("/admin/comments?error=unauthorized");
}

export async function loginCommentsAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyCommentsAdminPassword(password)) {
    redirect("/admin/comments?error=wrong-password");
  }

  await setCommentsAdminCookie();
  redirect("/admin/comments");
}

export async function logoutCommentsAdmin() {
  await clearCommentsAdminCookie();
  redirect("/admin/comments");
}

export async function approvePendingComment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!uuidPattern.test(id)) return;

  const postSlug = await approveComment(id);
  revalidatePath("/admin/comments");
  revalidatePath(`/writings/${postSlug}`);
}

export async function deletePendingComment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!uuidPattern.test(id)) return;

  await deleteComment(id);
  revalidatePath("/admin/comments");
}
