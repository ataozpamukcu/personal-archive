"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
};

export function ShareButton({ title }: ShareButtonProps) {
  const [message, setMessage] = useState("");

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setMessage("Bağlantı kopyalandı.");
      window.setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(url);
        setMessage("Bağlantı kopyalandı.");
      } catch {
        setMessage("Bağlantı kopyalanamadı.");
      }
    }
  }

  return (
    <div className="flex min-h-9 items-center justify-end gap-3 border-t border-line pt-3">
      <span aria-live="polite" className="text-[10px] text-muted">
        {message}
      </span>
      <button
        className="border border-line px-3 py-2 text-[10px] uppercase tracking-[0.1em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        onClick={handleShare}
        type="button"
      >
        Paylaş ↗
      </button>
    </div>
  );
}
