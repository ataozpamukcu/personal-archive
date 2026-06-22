"use client";

import { useRef, useState } from "react";
import { createArchiveContent } from "@/app/admin/content/actions";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type UploadResult = {
  bucket: string;
  path: string;
  token: string;
  publicUrl: string;
};

async function uploadFile(file: File) {
  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });

  const signed = (await response.json()) as UploadResult & { message?: string };
  if (!response.ok) throw new Error(signed.message ?? "Upload hazırlanamadı.");

  const { error } = await getSupabaseBrowser()
    .storage.from(signed.bucket)
    .uploadToSignedUrl(signed.path, signed.token, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;
  return signed;
}

export function AdminContentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [targetType, setTargetType] = useState("writing");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("İçerik hazırlanıyor…");

    try {
      const formData = new FormData(event.currentTarget);
      const media = formData.get("mediaFile");
      const poster = formData.get("posterFile");

      if (targetType === "block" && media instanceof File && media.size > 0) {
        setMessage("Medya Supabase’e yükleniyor…");
        const uploadedMedia = await uploadFile(media);
        formData.set("mediaUrl", uploadedMedia.publicUrl);
        formData.set("mediaPath", uploadedMedia.path);
      }

      if (poster instanceof File && poster.size > 0) {
        setMessage("Kapak görseli yükleniyor…");
        const uploadedPoster = await uploadFile(poster);
        formData.set("posterUrl", uploadedPoster.publicUrl);
        formData.set("posterPath", uploadedPoster.path);
      }

      formData.delete("mediaFile");
      formData.delete("posterFile");
      const result = await createArchiveContent(formData);
      setMessage(result.message);

      if (result.success) {
        formRef.current?.reset();
        setTargetType("writing");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "İçerik eklenemedi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="border border-line bg-card p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="admin-field">
          Bölüm
          <select
            className="admin-input"
            name="targetType"
            value={targetType}
            onChange={(event) => setTargetType(event.target.value)}
          >
            <option value="writing">Yazılar</option>
            <option value="block">Dağınık parçalar</option>
          </select>
        </label>
        <label className="admin-field">
          Tarih <span className="normal-case tracking-normal">(isteğe bağlı)</span>
          <input className="admin-input" name="date" type="date" />
        </label>
      </div>

      <label className="admin-field mt-4">
        Tür / etiket
        <input
          className="admin-input"
          name="contentType"
          placeholder={targetType === "writing" ? "deneme, şiir, inceleme…" : "alıntı, müzik, video, not…"}
          required
        />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="admin-field">
          Başlık
          <input className="admin-input" maxLength={180} name="title" required />
        </label>
        <label className="admin-field">
          Slug <span className="normal-case tracking-normal">(boşsa otomatik)</span>
          <input className="admin-input" name="slug" placeholder="ornek-baslik" />
        </label>
      </div>

      <label className="admin-field mt-4">
        Kısa açıklama <span className="normal-case tracking-normal">(isteğe bağlı)</span>
        <textarea className="admin-textarea min-h-20" name="excerpt" />
      </label>

      <label className="admin-field mt-4">
        Tam içerik
        {targetType === "block" && (
          <span className="normal-case tracking-normal"> (isteğe bağlı)</span>
        )}
        <textarea
          className="admin-textarea min-h-52"
          name="body"
          placeholder="Paragrafları boş bir satırla ayırabilirsin."
          required={targetType === "writing"}
        />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="admin-field">
          Kaynak <span className="normal-case tracking-normal">(isteğe bağlı)</span>
          <input className="admin-input" name="source" />
        </label>
        <label className="admin-field">
          Kaynak bağlantısı <span className="normal-case tracking-normal">(isteğe bağlı)</span>
          <input className="admin-input" name="sourceHref" type="url" />
        </label>
      </div>

      <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
        {targetType === "block" && (
          <label className="admin-field">
            Medya dosyası <span className="normal-case tracking-normal">(video veya ses, isteğe bağlı)</span>
            <input
              accept="video/mp4,video/quicktime,video/webm,video/x-m4v,audio/mpeg,audio/mp4,audio/wav,audio/ogg"
              className="admin-file"
              name="mediaFile"
              type="file"
            />
          </label>
        )}
        <label className="admin-field">
          Kapak görseli <span className="normal-case tracking-normal">(yazı ve parçalar için isteğe bağlı)</span>
          <input
            accept="image/jpeg,image/png,image/webp"
            className="admin-file"
            name="posterFile"
            type="file"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
        <p className="text-[10px] leading-4 text-muted" aria-live="polite">
          {message || "İçerik kaydedildiğinde doğrudan yayına alınır."}
        </p>
        <button
          className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.1em] hover:bg-ink hover:text-paper disabled:opacity-50"
          disabled={pending}
          type="submit"
        >
          {pending ? "Bekle…" : "Yayınla"}
        </button>
      </div>
    </form>
  );
}
