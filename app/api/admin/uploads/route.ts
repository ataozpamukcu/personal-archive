import { randomUUID } from "node:crypto";
import { isCommentsAdmin } from "@/lib/comments-admin";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const allowedTypes = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const allowedExtensions = new Set([
  "mp4",
  "mov",
  "webm",
  "m4v",
  "jpg",
  "jpeg",
  "png",
  "webp",
]);

export async function POST(request: Request) {
  if (!(await isCommentsAdmin())) {
    return Response.json({ message: "Yetkisiz istek." }, { status: 401 });
  }

  const input = (await request.json()) as {
    filename?: string;
    contentType?: string;
    size?: number;
  };
  const extension = input.filename?.split(".").pop()?.toLowerCase() ?? "";

  if (
    !input.filename ||
    !input.contentType ||
    !allowedTypes.has(input.contentType) ||
    !allowedExtensions.has(extension) ||
    !input.size ||
    input.size > 100 * 1024 * 1024
  ) {
    return Response.json(
      { message: "Dosya türü veya boyutu uygun değil." },
      { status: 400 },
    );
  }

  const path = `${new Date().getFullYear()}/${randomUUID()}.${extension}`;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage
    .from("archive-media")
    .createSignedUploadUrl(path);

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  const publicUrl = supabase.storage.from("archive-media").getPublicUrl(path)
    .data.publicUrl;

  return Response.json({
    bucket: "archive-media",
    path,
    token: data.token,
    publicUrl,
  });
}
