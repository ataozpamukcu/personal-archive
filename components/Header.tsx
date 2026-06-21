const navigation = [
  { label: "Yazılar", href: "#writings" },
  { label: "Parçalar", href: "#blocks" },
  { label: "Hakkında", href: "#about" },
];

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ink/80 text-[11px] uppercase tracking-[0.14em]">
      <a href="#about" className="font-medium">
        Açık Defter
        <span className="ml-2 hidden text-muted sm:inline">Arşiv</span>
      </a>

      <nav aria-label="Ana navigasyon">
        <ul className="flex gap-4 sm:gap-8">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="underline-offset-4 transition-opacity hover:opacity-50 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
