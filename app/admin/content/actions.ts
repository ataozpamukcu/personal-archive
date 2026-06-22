"use server";

import { revalidatePath } from "next/cache";
import { isCommentsAdmin } from "@/lib/comments-admin";
import {
  createManagedArchiveItem,
  deleteManagedArchiveItem,
} from "@/lib/archive";

export type AdminContentState = {
  success: boolean;
  message: string;
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(date: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export async function createArchiveContent(
  formData: FormData,
): Promise<AdminContentState> {
  if (!(await isCommentsAdmin())) {
    return { success: false, message: "Admin oturumu bulunamadı." };
  }

  const itemType = String(formData.get("itemType") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const source = String(formData.get("source") ?? "").trim();
  const sourceHref = String(formData.get("sourceHref") ?? "").trim();
  const mediaUrl = String(formData.get("mediaUrl") ?? "").trim();
  const mediaPath = String(formData.get("mediaPath") ?? "").trim();
  const posterUrl = String(formData.get("posterUrl") ?? "").trim();
  const posterPath = String(formData.get("posterPath") ?? "").trim();

  const typeMap = {
    writing: { targetType: "writing", contentType: "deneme" },
    poem: { targetType: "writing", contentType: "şiir" },
    quote: { targetType: "block", contentType: "alıntı" },
    video: { targetType: "block", contentType: "video" },
  } as const;
  const mappedType = typeMap[itemType as keyof typeof typeMap];
  const slug = slugify(requestedSlug || title);

  if (!mappedType || !title || !slug || !body) {
    return { success: false, message: "Tür, başlık ve içerik zorunludur." };
  }

  if (itemType === "video" && (!mediaUrl || !mediaPath)) {
    return { success: false, message: "Video dosyası yüklenmelidir." };
  }

  try {
    await createManagedArchiveItem({
      target_type: mappedType.targetType,
      slug,
      content_type: mappedType.contentType,
      title,
      published: true,
      date: date || null,
      display_date: formatDate(date) ?? (mappedType.targetType === "writing" ? "Taslak" : null),
      excerpt: excerpt || null,
      body,
      source: source || null,
      source_href: sourceHref || null,
      media_url: mediaUrl || null,
      media_path: mediaPath || null,
      poster_url: posterUrl || null,
      poster_path: posterPath || null,
    });

    revalidatePath("/");
    revalidatePath(`/${mappedType.targetType}s/${slug}`);
    revalidatePath("/admin/comments");
    return { success: true, message: `“${title}” yayınlandı.` };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "İçerik kaydedilemedi. Slug kullanılıyor veya Supabase tablosu hazır değil.",
    };
  }
}

export async function deleteArchiveContent(formData: FormData) {
  if (!(await isCommentsAdmin())) return;
  const id = String(formData.get("id") ?? "");
  if (!uuidPattern.test(id)) return;

  await deleteManagedArchiveItem(id);
  revalidatePath("/");
  revalidatePath("/admin/comments");
}
