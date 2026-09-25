import { Badge } from "@/components/ui/badge";

const BRAND = "Acme";
const TAGLINE =
  "The calm workspace for product teams — plan, build and ship in one place.";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features" },
      { label: "Integrations" },
      { label: "Pricing" },
      { label: "Changelog" },
      { label: "AI assistant", badge: "New" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Documentation" }, { label: "Guides" }, { label: "API reference" }, { label: "Community" }, { label: "Status" }],
  },
  {
    title: "Company",
    links: [{ label: "About" }, { label: "Customers" }, { label: "Careers", badge: "Hiring" }, { label: "Press" }, { label: "Contact" }],
  },
  {
    title: "Solutions",
    links: [{ label: "Startups" }, { label: "Enterprise" }, { label: "Agencies" }, { label: "Nonprofits" }],
  },
];

const LEGAL = ["Privacy", "Terms", "Cookies", "Security"];

const SOCIAL = [
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "GitHub",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Classic site footer: brand, tagline and social links on the left, four
 * link columns on the right, and a bottom bar with the copyright notice and
 * legal links. Edit the consts above to make it yours.
 */
export function FooterColumns() {
  return (
    <footer className="border-t bg-background px-6 pt-20 pb-10 sm:pt-24 lg:px-8">
      <h2 className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="max-w-xs">
            <a href="#" className={`inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight ${focusRing}`}>
              <span aria-hidden className="grid size-8 place-items-center rounded-[0.6rem] bg-linear-to-br from-brand-from to-brand-to text-brand-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4.5">
                  <path d="M5 20 12 4l7 16M8 14h8" />
                </svg>
              </span>
              {BRAND}
            </a>
            <p className="mt-5 text-sm leading-relaxed text-pretty text-muted-foreground">{TAGLINE}</p>
            <ul className="mt-6 flex gap-2">
              {SOCIAL.map(({ label, path }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={`${BRAND} on ${label}`}
                    className="grid size-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d={path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label} className="flex items-center gap-2">
                      <a href="#" className={`text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}>
                        {link.label}
                      </a>
                      {link.badge && (
                        <Badge variant="secondary" className="h-5 bg-primary/10 px-1.5 text-[0.7rem] text-primary">
                          {link.badge}
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {BRAND}, Inc. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL.map((label) => (
                <li key={label}>
                  <a href="#" className={`transition-colors hover:text-foreground ${focusRing}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
