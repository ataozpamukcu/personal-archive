import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import {
  approvePendingComment,
  deletePendingComment,
  loginCommentsAdmin,
  logoutCommentsAdmin,
} from "@/app/admin/comments/actions";
import { isCommentsAdmin } from "@/lib/comments-admin";
import { getPendingComments } from "@/lib/comments";

export const metadata: Metadata = {
  title: "Yorum moderasyonu — Açık Defter",
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function CommentsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await connection();
  const authorized = await isCommentsAdmin();
  const { error } = await searchParams;

  if (!authorized) {
    return (
      <main className="mx-auto min-h-screen max-w-md px-4 py-12 sm:py-20">
        <div className="archive-heading">
          <h1>Yorum moderasyonu</h1>
          <Link href="/">Açık Defter ↗</Link>
        </div>

        <form action={loginCommentsAdmin} className="border border-line bg-card p-5">
          <label className="grid gap-2 text-[10px] uppercase tracking-[0.1em] text-muted">
            Yönetici parolası
            <input
              autoComplete="current-password"
              className="h-10 border border-line bg-paper px-3 text-xs normal-case tracking-normal text-ink outline-none focus:border-ink"
              name="password"
              required
              type="password"
            />
          </label>
          {error && (
            <p className="mt-3 text-[10px] text-muted">
              Parola doğrulanamadı. Lütfen tekrar dene.
            </p>
          )}
          <button
            className="mt-5 border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper"
            type="submit"
          >
            Giriş yap
          </button>
        </form>
      </main>
    );
  }

  const comments = await getPendingComments();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex items-start justify-between border-b border-line pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
            Açık Defter / Admin
          </p>
          <h1 className="mt-2 text-2xl tracking-[-0.03em]">Bekleyen yorumlar</h1>
        </div>
        <form action={logoutCommentsAdmin}>
          <button className="text-[10px] text-muted hover:text-ink" type="submit">
            Çıkış yap
          </button>
        </form>
      </header>

      <div className="py-8">
        <div className="archive-heading">
          <h2>Moderasyon kuyruğu</h2>
          <span>{String(comments.length).padStart(2, "0")} bekleyen</span>
        </div>

        {comments.length === 0 ? (
          <p className="border-y border-line py-8 text-center text-xs text-muted">
            Bekleyen yorum yok.
          </p>
        ) : (
          <div className="border-t border-line">
            {comments.map((comment) => (
              <article className="border-b border-line py-5" key={comment.id}>
                <div className="flex flex-wrap justify-between gap-2 text-[10px] text-muted">
                  <p>
                    <span className="text-ink">{comment.author_name}</span>
                    {" / "}
                    <Link
                      className="underline-offset-4 hover:underline"
                      href={`/${comment.target_type}s/${comment.target_slug}`}
                    >
                      {comment.target_type === "writing" ? "yazı" : "blok"}
                      {" / "}
                      {comment.target_slug}
                    </Link>
                  </p>
                  <time dateTime={comment.created_at}>
                    {dateFormatter.format(new Date(comment.created_at))}
                  </time>
                </div>
                <p className="my-5 max-w-3xl whitespace-pre-wrap text-xs leading-5">
                  {comment.body}
                </p>
                <div className="flex gap-2">
                  <form action={approvePendingComment}>
                    <input name="id" type="hidden" value={comment.id} />
                    <button
                      className="border border-ink px-3 py-2 text-[10px] uppercase tracking-[0.08em] hover:bg-ink hover:text-paper"
                      type="submit"
                    >
                      Onayla
                    </button>
                  </form>
                  <form action={deletePendingComment}>
                    <input name="id" type="hidden" value={comment.id} />
                    <button
                      className="border border-line px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-muted hover:border-ink hover:text-ink"
                      type="submit"
                    >
                      Sil
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
