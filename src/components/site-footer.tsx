import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const groups = [
  {
    title: "Product",
    links: [
      { text: "Components", href: "/components" },
      { text: "Blocks", href: "/blocks" },
      { text: "Themes", href: "/themes" },
      { text: "Pricing", href: "/pricing" },
      { text: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Template pages",
    links: [
      { text: "Blog", href: "/blog" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
      { text: "Log in", href: "/login" },
      { text: "Sign up", href: "/signup" },
      { text: "404 page", href: "/404-demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "GitHub", href: siteConfig.github },
      { text: "llms.txt", href: "/llms.txt" },
      { text: "vs Aceternity UI", href: "/compare/aceternity-ui" },
      { text: "vs Magic UI", href: "/compare/magic-ui" },
      { text: "shadcn registry", href: "/components" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <SparklesIcon className="size-5 text-primary" />
            Velora UI
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Free, MIT-licensed animated components and complete landing
            templates for React. Works with Base UI and Radix shadcn/ui
            projects.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Built with Next.js 16, Tailwind CSS 4 &amp; Motion
          </p>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
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
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-border/40 px-4 pt-6 text-xs text-muted-foreground md:flex-row lg:px-8">
        <span>Velora UI — MIT licensed, free forever.</span>
        <span>Every animation respects prefers-reduced-motion.</span>
      </div>
    </footer>
  );
}
