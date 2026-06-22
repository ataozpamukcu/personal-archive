"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitComment } from "@/app/comments/actions";
import { initialCommentFormState } from "@/lib/comment-form";
import type { CommentTargetType } from "@/lib/comments";

export function CommentForm({
  targetType,
  targetSlug,
}: {
  targetType: CommentTargetType;
  targetSlug: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitComment,
    initialCommentFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="border border-line bg-card p-4 sm:p-5">
      <input name="targetType" type="hidden" value={targetType} />
      <input name="targetSlug" type="hidden" value={targetSlug} />

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`website-${targetType}-${targetSlug}`}>Website</label>
        <input
          id={`website-${targetType}-${targetSlug}`}
          name="website"
          tabIndex={-1}
          type="text"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-[10px] uppercase tracking-[0.1em] text-muted">
          İsim / rumuz <span className="normal-case tracking-normal">(isteğe bağlı)</span>
          <input
            className="h-10 border border-line bg-paper px-3 text-xs normal-case tracking-normal text-ink outline-none focus:border-ink"
            maxLength={80}
            name="authorName"
            type="text"
          />
        </label>

        <label className="grid gap-2 text-[10px] uppercase tracking-[0.1em] text-muted">
          Yorum
          <textarea
            className="min-h-32 resize-y border border-line bg-paper p-3 text-xs leading-5 normal-case tracking-normal text-ink outline-none focus:border-ink"
            maxLength={1000}
            name="body"
            required
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-line pt-4 sm:flex-row sm:items-center">
        <p className="text-[10px] leading-4 text-muted" aria-live="polite">
          {state.message || "İsim boş bırakılırsa yorum Anonim olarak gönderilir."}
        </p>
        <button
          className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper disabled:cursor-wait disabled:opacity-50"
          disabled={pending}
          type="submit"
        >
          {pending ? "Gönderiliyor…" : "Yorumu gönder"}
        </button>
      </div>
    </form>
  );
}
