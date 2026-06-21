import Link from "next/link";
import type { Writing } from "@/data/archive";

type WritingCardProps = {
  writing: Writing;
  index: number;
};

export function WritingCard({ writing, index }: WritingCardProps) {
  return (
    <Link
      aria-label={`${writing.title} yazısını aç`}
      className="group flex min-h-72 flex-col border border-line bg-card p-4 transition-colors hover:border-ink sm:min-h-80"
      href={`/writings/${writing.slug}`}
    >
      <div className="flex justify-between text-[10px] uppercase tracking-[0.1em] text-muted">
        <span>{writing.type}</span>
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="my-auto py-10">
        <h3 className="text-xl font-normal leading-[1.12] tracking-[-0.025em] transition-opacity group-hover:opacity-55">
          {writing.title}
        </h3>
        {writing.excerpt && (
          <p className="mt-4 max-w-sm text-xs leading-[1.55] text-muted">
            {writing.excerpt}
          </p>
        )}
      </div>

      <div className="border-t border-line pt-3 text-[10px] uppercase tracking-[0.09em] text-muted">
        {writing.date ? (
          <time dateTime={writing.date}>{writing.displayDate}</time>
        ) : (
          <span>{writing.displayDate}</span>
        )}
      </div>
    </Link>
  );
}
