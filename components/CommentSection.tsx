import { CommentForm } from "@/components/CommentForm";
import type { ArchiveComment, CommentTargetType } from "@/lib/comments";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function CommentSection({
  comments,
  targetType,
  targetSlug,
}: {
  comments: ArchiveComment[];
  targetType: CommentTargetType;
  targetSlug: string;
}) {
  return (
    <section className="border-t border-line py-8 sm:py-10">
      <div className="archive-heading">
        <h2>Yorumlar</h2>
        <span>{String(comments.length).padStart(2, "0")} onaylı</span>
      </div>

      {comments.length > 0 ? (
        <div className="mb-4 border-t border-line">
          {comments.map((comment) => (
            <article
              className="grid gap-3 border-b border-line py-5 sm:grid-cols-[180px_minmax(0,1fr)]"
              key={comment.id}
            >
              <div className="text-[10px] leading-4 text-muted">
                <p className="text-ink">{comment.author_name}</p>
                <time dateTime={comment.created_at}>
                  {dateFormatter.format(new Date(comment.created_at))}
                </time>
              </div>
              <p className="max-w-2xl whitespace-pre-wrap text-xs leading-5">
                {comment.body}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mb-4 border-y border-line py-5 text-xs text-muted">
          Henüz onaylanmış yorum yok.
        </p>
      )}

      <CommentForm targetType={targetType} targetSlug={targetSlug} />
    </section>
  );
}
