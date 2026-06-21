import { BlockCard } from "@/components/BlockCard";
import { Header } from "@/components/Header";
import { WritingCard } from "@/components/WritingCard";
import { blocks, profile, writings } from "@/data/archive";

export default function Home() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <Header />

      <main className="min-w-0 px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
        <section id="about" className="border-b border-line py-8 sm:py-10">
          <div className="archive-heading">
            <h1>Hakkında</h1>
            <span>Profil / 01</span>
          </div>

          <div className="grid border border-line bg-card md:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)]">
            <div className="flex min-h-80 flex-col justify-between p-5 sm:p-7">
              <div>
                <p className="mb-4 text-[10px] uppercase tracking-[0.1em] text-muted">
                  {profile.location} / {profile.since}
                </p>
                <h2 className="max-w-xl text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.035em]">
                  {profile.name}
                </h2>
              </div>

              <div className="max-w-xl space-y-3 text-sm leading-[1.55]">
                {profile.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t border-line p-5 md:border-l md:border-t-0 sm:p-7">
              <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                Kısa indeks
              </p>
              <dl className="mt-8 text-xs">
                {profile.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-2 gap-4 border-t border-line py-3"
                  >
                    <dt className="text-muted">{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-t border-line pt-3">
                <p className="text-[10px] uppercase tracking-[0.1em] text-muted">
                  Bağlantılar
                </p>
                <ul className="mt-3 space-y-2 text-xs">
                  {profile.links.map((link) => (
                    <li key={link.label}>
                      <span>{link.label}</span>
                      <a
                        className="ml-2 text-muted underline-offset-4 hover:underline"
                        href={link.href}
                      >
                        {link.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
            <div>
              <p className="text-xs text-muted">Açık Defter / Kişisel arşiv</p>
            </div>
            <p className="max-w-60 text-xs leading-[1.55] text-muted md:justify-self-end">
              Üzerinde uğraştığım şeyler.
            </p>
          </div>
        </section>

        <section id="writings" className="py-8 sm:py-10">
          <div className="archive-heading">
            <h2>Yazılar</h2>
            <span>{String(writings.length).padStart(2, "0")} kayıt</span>
          </div>

          {writings.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
              {writings.map((writing, index) => (
                <WritingCard
                  key={writing.slug}
                  writing={writing}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-44 items-center justify-center border border-dashed border-line text-center">
              <div>
                <p className="text-xs">Henüz yazı eklenmedi.</p>
                <p className="mt-1 text-[10px] text-muted">
                  Yeni metinler burada arşivlenecek.
                </p>
              </div>
            </div>
          )}
        </section>

        <section id="blocks" className="border-t border-line py-8 sm:py-10">
          <div className="archive-heading">
            <h2>Dağınık parçalar</h2>
            <span>{String(blocks.length).padStart(2, "0")} blok</span>
          </div>

          {blocks.length > 0 ? (
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 lg:gap-4 xl:columns-4">
              {blocks.map((block) => (
                <BlockCard key={block.slug} block={block} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-44 items-center justify-center border border-dashed border-line text-center">
              <div>
                <p className="text-xs">Henüz parça eklenmedi.</p>
                <p className="mt-1 text-[10px] text-muted">
                  Notlar, alıntılar ve görsel parçalar burada arşivlenecek.
                </p>
              </div>
            </div>
          )}
        </section>

        <footer className="flex justify-between border-t border-line pt-3 text-[10px] text-muted">
          <p>Açık Defter © 2026</p>
          <a href="#about" className="hover:text-ink">
            Başa dön ↑
          </a>
        </footer>
      </main>
    </div>
  );
}
