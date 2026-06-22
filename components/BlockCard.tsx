import Link from "next/link";
import type { ArchiveBlock } from "@/data/archive";

type BlockCardProps = {
  block: ArchiveBlock;
};

function isAudioMedia(src: string) {
  return /\.(mp3|m4a|wav|ogg)(?:\?|$)/i.test(src);
}

export function BlockCard({ block }: BlockCardProps) {
  return (
    <div className="mb-3 inline-block w-full break-inside-avoid lg:mb-4">
      <Link
        aria-label={`${block.title ?? block.type} bloğunu aç`}
        className="group flex min-h-72 flex-col border border-line bg-card p-4 transition-colors hover:border-ink sm:min-h-80"
        href={`/blocks/${block.slug}`}
      >
        <div className="flex justify-between text-[10px] uppercase tracking-[0.1em] text-muted">
          <span>{block.type}</span>
          <span>{block.displayDate ?? "—"}</span>
        </div>

        {block.posterSrc && !block.mediaSrc && (
          <div
            className="mt-5 aspect-[4/3] border border-line bg-cover bg-center"
            aria-label={`${block.title ?? block.type} kapak görseli`}
            role="img"
            style={{ backgroundImage: `url(${block.posterSrc})` }}
          />
        )}

        {block.mediaSrc && isAudioMedia(block.mediaSrc) ? (
          <div className="my-auto py-8">
            {block.posterSrc && (
              <div
                aria-label={`${block.title ?? block.type} kapak görseli`}
                className="mb-5 aspect-square border border-line bg-cover bg-center"
                role="img"
                style={{ backgroundImage: `url(${block.posterSrc})` }}
              />
            )}
            {block.title && (
              <h3 className="text-xl tracking-[-0.025em] group-hover:opacity-55">
                {block.title}
              </h3>
            )}
          </div>
        ) : block.mediaSrc ? (
          <div className="my-5">
            <div
              className="mx-auto aspect-[17/30] max-h-[70vh] w-auto max-w-full bg-black bg-contain bg-center bg-no-repeat"
              style={
                block.posterSrc
                  ? { backgroundImage: `url(${block.posterSrc})` }
                  : undefined
              }
              role="img"
              aria-label={`${block.title ?? "Video"} önizlemesi`}
            />
            <h3 className="mt-5 max-w-sm text-xl font-normal leading-[1.15] tracking-[-0.025em] group-hover:opacity-55">
              {block.title}
            </h3>
          </div>
        ) : block.type.toLocaleLowerCase("tr-TR") === "alıntı" ? (
          <div className="my-auto py-10">
            {block.title && (
              <h3 className="mb-5 text-xl tracking-[-0.025em] group-hover:opacity-55">
                {block.title}
              </h3>
            )}
            <blockquote className="text-lg leading-[1.3] tracking-[-0.02em]">
              “{block.excerpt ?? block.body[0]}”
            </blockquote>
          </div>
        ) : (
          <div className="my-auto py-8">
            {block.title && (
              <h3 className="text-xl tracking-[-0.025em] group-hover:opacity-55">
                {block.title}
              </h3>
            )}
            {block.excerpt && (
              <p className="mt-3 text-xs leading-[1.6]">{block.excerpt}</p>
            )}
          </div>
        )}

        {block.source && (
          <p className="mt-auto border-t border-line pt-3 text-[10px] leading-4 text-muted">
            {block.source}
          </p>
        )}
      </Link>
    </div>
  );
}
