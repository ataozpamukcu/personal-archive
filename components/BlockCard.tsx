import type { ArchiveBlock } from "@/data/archive";

type BlockCardProps = {
  block: ArchiveBlock;
};

export function BlockCard({ block }: BlockCardProps) {
  return (
    <article className="flex min-h-72 flex-col justify-between border-b border-r border-ink/80 p-5 sm:min-h-80 sm:p-6">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.13em] text-muted">
        <span>{block.type}</span>
        <span>{block.year}</span>
      </div>

      {block.type === "Quotation" ? (
        <blockquote className="my-12 font-serif text-xl leading-snug tracking-[-0.015em] sm:text-2xl">
          “{block.content}”
        </blockquote>
      ) : (
        <p className="my-12 max-w-sm text-sm leading-6">{block.content}</p>
      )}

      <p className="text-[10px] leading-4 text-muted">{block.source}</p>
    </article>
  );
}
