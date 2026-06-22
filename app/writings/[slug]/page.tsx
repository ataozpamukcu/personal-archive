import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CommentSection } from "@/components/CommentSection";
import { Header } from "@/components/Header";
import { getArchiveTarget } from "@/lib/archive";
import { getApprovedComments } from "@/lib/comments";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = await getArchiveTarget("writing", slug);

  return writing
    ? { title: `${writing.title} — Açık Defter`, description: writing.excerpt }
    : { title: "Yazı bulunamadı — Açık Defter" };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const writing = await getArchiveTarget("writing", slug);

  if (!writing) notFound();

  await connection();
  const comments = await getApprovedComments("writing", slug);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <Header />

      <main className="min-w-0 px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
        <article className="py-8 sm:py-10">
          <div className="archive-heading">
            <Link href="/#writings">← Yazılar</Link>
            <span>{writing.type}</span>
          </div>

          <header className="border-y border-line py-8 sm:py-12">
            <h1 className="max-w-4xl font-serif text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.04em]">
              {writing.title}
            </h1>
            <div className="mt-8 flex flex-wrap justify-between gap-3 text-[10px] uppercase tracking-[0.1em] text-muted">
              {writing.excerpt && <p>{writing.excerpt}</p>}
              {writing.date ? (
                <time dateTime={writing.date}>{writing.displayDate}</time>
              ) : (
                <span>{writing.displayDate}</span>
              )}
            </div>
          </header>

          <div className="mx-auto min-h-48 max-w-2xl space-y-5 py-10 text-sm leading-7 text-muted">
            {writing.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <CommentSection
          comments={comments}
          targetSlug={slug}
          targetType="writing"
        />

        <footer className="flex justify-between border-t border-line pt-3 text-[10px] text-muted">
          <p>Açık Defter © 2026</p>
          <Link href="/">İndekse dön</Link>
        </footer>
      </main>
    </div>
  );
}
