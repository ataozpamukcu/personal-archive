import type { ArchiveBlock } from "@/data/archive";

type BlockCardProps = {
  block: ArchiveBlock;
};

export function BlockCard({ block }: BlockCardProps) {
  const content = (
    <article className="flex min-h-72 flex-col border border-line bg-card p-4 transition-colors hover:border-ink sm:min-h-80">
      <div className="flex justify-between text-[10px] uppercase tracking-[0.1em] text-muted">
        <span>{block.type}</span>
        <span>{block.year}</span>
      </div>

      {block.type === "Görsel notu" && (
        <div
          className="image-placeholder mt-5 aspect-[4/3] border border-line"
          aria-label="Arşiv görseli için yer tutucu"
          role="img"
        />
      )}

      {block.type === "Alıntı" ? (
        <blockquote className="my-auto py-10 text-lg leading-[1.3] tracking-[-0.02em]">
          “{block.content}”
        </blockquote>
      ) : (
        <p className="my-auto py-8 text-xs leading-[1.6]">{block.content}</p>
      )}

      <p className="border-t border-line pt-3 text-[10px] leading-4 text-muted">
        {block.source}
        {block.href && <span aria-hidden="true"> ↗</span>}
      </p>
    </article>
  );

  return block.href ? (
    <a href={block.href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
