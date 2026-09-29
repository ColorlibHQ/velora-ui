import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import { categorySlug, componentsMeta } from "@/lib/components-meta";
import { siteConfig } from "@/lib/site-config";

// The six categories with the most components, from the catalogue itself.
const topCategories = Object.entries(
  componentsMeta.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {}),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 6)
  .map(([category]) => category);

const groups = [
  {
    title: "Product",
    links: [
      { text: "Components", href: "/components" },
      { text: "Blocks", href: "/blocks" },
      { text: "Templates", href: "/templates" },
      { text: "Themes", href: "/themes" },
      { text: "Pricing", href: "/pricing" },
      { text: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Get started", href: "/components/get-started" },
      { text: "AI & MCP", href: "/components/ai" },
      { text: "Showcase", href: "/showcase" },
      { text: "Blog", href: "/blog" },
      { text: "llms.txt", href: "/llms.txt" },
      { text: "GitHub", href: siteConfig.github },
    ],
  },
  {
    title: "Compare",
    links: [
      { text: "vs Aceternity UI", href: "/compare/aceternity-ui" },
      { text: "vs Magic UI", href: "/compare/magic-ui" },
      { text: "vs React Bits", href: "/compare/react-bits" },
    ],
  },
  {
    title: "Categories",
    links: [
      ...topCategories.map((category) => ({
        text: category,
        href: `/components/category/${categorySlug(category)}`,
      })),
      { text: "All components", href: "/components" },
    ],
  },
  {
    title: "Template demo",
    links: [
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
      { text: "Log in", href: "/login" },
      { text: "Sign up", href: "/signup" },
      { text: "404 page", href: "/404-demo" },
    ],
  },
];

const headingId = (title: string) =>
  `footer-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-4 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)] lg:px-8">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <SparklesIcon className="size-5 text-primary" />
            Velora UI
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Free, MIT-licensed animated components and section blocks for
            React, Tailwind CSS 4 and shadcn/ui.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Built with Next.js 16, Tailwind CSS 4 &amp; Motion
          </p>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-labelledby={headingId(group.title)}>
            <h2 id={headingId(group.title)} className="text-sm font-semibold">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.text}>
                  {/* External URLs and files (llms.txt) aren't Next routes. */}
                  {/^https?:|\.\w+$/.test(link.href) ? (
                    <a
                      href={link.href}
                      rel="noopener"
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      // The 404 demo intentionally points at a missing route.
                      prefetch={link.href === "/404-demo" ? false : undefined}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border/40 px-4 pt-6 text-center text-xs text-muted-foreground md:flex-row md:text-left lg:px-8">
        <span>
          © {new Date().getFullYear()} Velora UI — MIT licensed, free forever.
        </span>
        <span>Every animation respects prefers-reduced-motion.</span>
        <span>
          Made by{" "}
          <a
            href="https://colorlib.com"
            rel="noopener"
            className="font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Colorlib
          </a>
        </span>
      </div>
    </footer>
  );
}
