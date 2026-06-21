const navigation = [
  { label: "Writings", href: "#writings" },
  { label: "Blocks", href: "#blocks" },
  { label: "About", href: "#about" },
];

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ink/80 text-[11px] uppercase tracking-[0.14em]">
      <a href="#about" className="font-medium">
        Commonplace
        <span className="ml-2 text-muted">Archive</span>
      </a>

      <nav aria-label="Primary navigation">
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
