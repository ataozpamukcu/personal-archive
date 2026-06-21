import { BlockCard } from "@/components/BlockCard";
import { Header } from "@/components/Header";
import { WritingCard } from "@/components/WritingCard";
import { blocks, writings } from "@/data/archive";

export default function Home() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <Header />

      <main className="min-w-0 px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
        <section id="about" className="border-b border-line py-8 sm:py-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_240px] md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.13em] text-muted">
                Kanal / Açık Defter
              </p>
              <h1 className="max-w-xl text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.035em]">
                Yazılar, şiirler, notlar ve dağınık parçalar
              </h1>
            </div>
            <p className="max-w-60 text-xs leading-[1.55] text-muted md:justify-self-end">
              Bitmiş metinlerle henüz yerini bulamamış düşünceler için açık,
              kişisel bir indeks.
            </p>
          </div>
        </section>

        <section id="writings" className="py-8 sm:py-10">
          <div className="archive-heading">
            <h2>Yazılar</h2>
            <span>{String(writings.length).padStart(2, "0")} kayıt</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {writings.map((writing, index) => (
              <WritingCard key={writing.id} writing={writing} index={index} />
            ))}
          </div>
        </section>

        <section id="blocks" className="border-t border-line py-8 sm:py-10">
          <div className="archive-heading">
            <h2>Dağınık parçalar</h2>
            <span>{String(blocks.length).padStart(2, "0")} blok</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
            {blocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
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
