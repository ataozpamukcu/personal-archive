import type { Writing } from "@/data/archive";

type WritingCardProps = {
  writing: Writing;
  index: number;
};

export function WritingCard({ writing, index }: WritingCardProps) {
  return (
    <article className="group grid border-t border-ink/80 py-6 first:border-t-0 sm:grid-cols-12 sm:gap-4 sm:py-8">
      <span className="text-[10px] tabular-nums text-muted sm:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="mt-5 sm:col-span-6 sm:mt-0">
        <h3 className="font-serif text-2xl leading-tight tracking-[-0.02em] transition-opacity group-hover:opacity-55 sm:text-3xl">
          {writing.title}
        </h3>
        <p className="mt-3 max-w-lg text-xs leading-5 text-muted">
          {writing.excerpt}
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between text-[10px] uppercase tracking-[0.12em] text-muted sm:col-span-5 sm:mt-0 sm:justify-end sm:gap-12">
        <span>{writing.kind}</span>
        <time dateTime={writing.date}>{writing.displayDate}</time>
      </div>
    </article>
  );
}
