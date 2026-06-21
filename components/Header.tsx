import Link from "next/link";

const navigation = [
  { label: "Hakkında", count: "—", href: "/#about" },
  { label: "Yazılar", count: "01", href: "/#writings" },
  { label: "Parçalar", count: "02", href: "/#blocks" },
];

export function Header() {
  return (
    <header className="flex border-b border-line bg-canvas px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:border-b-0 lg:border-r lg:px-5 lg:py-5">
      <div className="flex w-full items-center justify-between lg:block">
        <Link href="/" className="text-sm font-medium tracking-[-0.02em]">
          Açık Defter
        </Link>
        <span className="text-[10px] uppercase tracking-[0.12em] text-muted lg:mt-1 lg:block">
          Kişisel arşiv
        </span>
      </div>

      <p className="mt-8 hidden max-w-40 text-xs leading-[1.45] text-muted lg:block">
        Üzerinde uğraştığım şeyler
      </p>

      <nav aria-label="Ana navigasyon" className="mt-16 hidden lg:block">
        <ul className="border-t border-line">
          {navigation.map((item) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                className="flex justify-between py-2.5 text-xs transition-opacity hover:opacity-45"
              >
                <span>{item.label}</span>
                <span className="tabular-nums text-muted">{item.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto hidden text-[10px] leading-4 text-muted lg:block">
        <p>İstanbul</p>
        <p>Son düzenleme 21.06.2026</p>
      </div>
    </header>
  );
}
