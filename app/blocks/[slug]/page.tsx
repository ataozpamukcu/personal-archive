import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CommentSection } from "@/components/CommentSection";
import { Header } from "@/components/Header";
import { getArchiveTarget } from "@/lib/archive";
import { getApprovedComments } from "@/lib/comments";

type BlockPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlockPageProps): Promise<Metadata> {
  const { slug } = await params;
  const block = await getArchiveTarget("block", slug);

  return block
    ? {
        title: `${block.title ?? block.type} — Açık Defter`,
        description: block.excerpt ?? block.body[0],
      }
    : { title: "Blok bulunamadı — Açık Defter" };
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = await getArchiveTarget("block", slug);

  if (!block) notFound();

  await connection();
  const comments = await getApprovedComments("block", slug);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <Header />

      <main className="min-w-0 px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
        <article className="py-8 sm:py-10">
          <div className="archive-heading">
            <Link href="/#blocks">← Dağınık parçalar</Link>
            <span>{block.type}</span>
          </div>

          <header className="border-y border-line py-8 sm:py-12">
            <h1 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-serif font-normal leading-[1.02] tracking-[-0.04em]">
              {block.title ?? block.type}
            </h1>
            <div className="mt-8 flex flex-wrap justify-between gap-3 text-[10px] uppercase tracking-[0.1em] text-muted">
              {block.excerpt && <p>{block.excerpt}</p>}
              {block.date ? (
                <time dateTime={block.date}>{block.displayDate}</time>
              ) : (
                <span>{block.displayDate ?? "Tarihsiz"}</span>
              )}
            </div>
          </header>

          {block.type === "video" && block.mediaSrc && (
            <div className="mx-auto max-w-md py-8 sm:py-10">
              <video
                className="aspect-[17/30] w-full bg-black object-contain"
                controls
                playsInline
                poster={block.posterSrc}
                preload="metadata"
                src={block.mediaSrc}
              >
                Tarayıcın video oynatıcısını desteklemiyor.
              </video>
            </div>
          )}

          {block.type === "müzik" && block.mediaSrc && (
            <div className="mx-auto max-w-2xl py-8 sm:py-10">
              <audio className="w-full" controls preload="metadata" src={block.mediaSrc}>
                Tarayıcın ses oynatıcısını desteklemiyor.
              </audio>
            </div>
          )}

          {(block.body.length > 0 || block.source) && (
            <div className="mx-auto max-w-2xl space-y-5 py-10 text-sm leading-7 text-muted">
              {block.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {block.source && (
                <p className="border-t border-line pt-4 text-[10px] uppercase tracking-[0.08em]">
                  Kaynak:{" "}
                  {block.sourceHref ? (
                    <a
                      className="underline underline-offset-4"
                      href={block.sourceHref}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {block.source} ↗
                    </a>
                  ) : (
                    block.source
                  )}
                </p>
              )}
            </div>
          )}
        </article>

        <CommentSection
          comments={comments}
          targetSlug={slug}
          targetType="block"
        />

        <footer className="flex justify-between border-t border-line pt-3 text-[10px] text-muted">
          <p>Açık Defter © 2026</p>
          <Link href="/">İndekse dön</Link>
        </footer>
      </main>
    </div>
  );
}
