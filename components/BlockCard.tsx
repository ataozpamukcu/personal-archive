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

      {block.type === "Video" && block.mediaSrc ? (
        <div className="my-5">
          <video
            className="mx-auto aspect-[17/30] max-h-[70vh] w-auto max-w-full bg-black object-contain"
            controls
            playsInline
            poster={block.posterSrc}
            preload="metadata"
            src={block.mediaSrc}
          >
            Tarayıcın video oynatıcısını desteklemiyor.
          </video>
          <h3 className="mt-5 max-w-sm text-xl font-normal leading-[1.15] tracking-[-0.025em]">
            {block.content}
          </h3>
        </div>
      ) : block.type === "Müzik" && block.mediaSrc ? (
        <div className="my-auto py-8">
          <h3 className="max-w-sm text-xl font-normal leading-[1.15] tracking-[-0.025em]">
            {block.content}
          </h3>
          <audio
            className="mt-8 w-full"
            controls
            preload="metadata"
            src={block.mediaSrc}
          >
            Tarayıcın ses oynatıcısını desteklemiyor.
          </audio>
        </div>
      ) : block.type === "Alıntı" ? (
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
    <div className="mb-3 inline-block w-full break-inside-avoid lg:mb-4">
      <a href={block.href} className="block">
        {content}
      </a>
    </div>
  ) : (
    <div className="mb-3 inline-block w-full break-inside-avoid lg:mb-4">
      {content}
    </div>
  );
}
