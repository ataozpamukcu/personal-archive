import { BlockCard } from "@/components/BlockCard";
import { Header } from "@/components/Header";
import { WritingCard } from "@/components/WritingCard";
import { blocks, writings } from "@/data/archive";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-[1600px] px-5 sm:px-8 lg:px-12">
      <Header />

      <main>
        <section
          id="about"
          className="grid min-h-[54vh] border-b border-ink/80 py-12 sm:py-16 lg:grid-cols-12 lg:py-20"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted lg:col-span-3">
            Kişisel arşiv / İstanbul, 2026
          </p>
          <div className="mt-16 lg:col-span-7 lg:col-start-5 lg:mt-0">
            <h1 className="font-serif text-[clamp(2.5rem,6vw,6.75rem)] font-normal leading-[0.94] tracking-[-0.045em]">
              Açık Defter
              <br />
              <span className="text-muted">dağınık bir arşiv.</span>
            </h1>
            <p className="mt-10 max-w-md text-sm leading-6 text-muted sm:ml-auto sm:mt-14">
              Yazılar, şiirler, notlar ve dağınık parçalar. Bitmiş metinlerle
              henüz yerini bulamamış düşünceler için açık bir defter.
            </p>
          </div>
        </section>

        <section id="writings" className="border-b border-ink/80 py-12 sm:py-16">
          <div className="mb-12 flex items-baseline justify-between sm:mb-16">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em]">
              Yazılar
            </h2>
            <span className="text-[10px] tabular-nums text-muted">
              {String(writings.length).padStart(2, "0")} kayıt
            </span>
          </div>

          <div>
            {writings.map((writing, index) => (
              <WritingCard key={writing.id} writing={writing} index={index} />
            ))}
          </div>
        </section>

        <section id="blocks" className="py-12 sm:py-16">
          <div className="mb-12 flex items-baseline justify-between sm:mb-16">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em]">
              Dağınık parçalar
            </h2>
            <span className="text-[10px] tabular-nums text-muted">
              {String(blocks.length).padStart(2, "0")} parça
            </span>
          </div>

          <div className="grid border-l border-t border-ink/80 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-3 border-t border-ink/80 py-6 text-[10px] uppercase tracking-[0.14em] text-muted sm:flex-row sm:justify-between">
        <p>Açık Defter / Kişisel edebiyat arşivi</p>
        <p>Son düzenleme: Haziran 2026</p>
      </footer>
    </div>
  );
}
