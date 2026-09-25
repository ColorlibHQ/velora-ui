import { TextHoverEffect } from "@/components/velora/text-hover-effect";

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Docs", "Guides", "Status", "Security"] },
];

export default function TextHoverEffectFooterDemo() {
  return (
    <footer className="w-full overflow-hidden rounded-2xl border bg-card">
      <div className="grid gap-8 p-8 sm:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="max-w-xs space-y-3">
          <p className="font-semibold tracking-tight">Northwind</p>
          <p className="text-sm text-muted-foreground">
            Calm, reliable infrastructure for teams who would rather ship than
            babysit servers.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="space-y-3">
            <p className="text-sm font-medium">{column.title}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-2 border-t px-8 py-4 text-xs text-muted-foreground">
        <span>© 2026 Northwind Labs, Inc.</span>
        <span>Made with care in Lisbon</span>
      </div>
      <TextHoverEffect
        text="northwind"
        strokeWidth={0.6}
        className="-mb-[2%] px-6 pt-6 font-black tracking-tight"
      />
    </footer>
  );
}
