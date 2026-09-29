"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  categories,
  categorySlug,
  componentsMeta,
  isNew,
} from "@/lib/components-meta";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mounted = useRef(false);

  // Bring the current page's link into view inside the scrollable sidebar:
  // instantly on load, smoothly on later navigations unless motion is reduced.
  useEffect(() => {
    const active = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    const smooth =
      mounted.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    mounted.current = true;
    active?.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "instant" });
  }, [pathname]);

  return (
    <nav ref={navRef} aria-label="Components" className="space-y-6">
      <ul className="space-y-0.5 border-l border-border/60">
        {[
          { href: "/components/get-started", label: "Get started" },
          { href: "/components", label: "All components" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "-ml-px block border-l py-1 pl-4 text-sm transition-colors",
                pathname === link.href
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {categories.map((category) => {
        const href = `/components/category/${categorySlug(category)}`;
        return (
          <div key={category}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "mb-2 block text-xs font-semibold tracking-wide uppercase hover:text-primary",
                pathname === href ? "text-primary" : "text-foreground"
              )}
            >
              {category}
            </Link>
            <ul className="space-y-0.5 border-l border-border/60">
              {componentsMeta
                .filter((c) => c.category === category)
                .map((c) => {
                  const href = `/components/${c.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={c.slug}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "-ml-px flex items-center gap-2 border-l py-1 pl-4 text-sm transition-colors",
                          active
                            ? "border-primary font-medium text-primary"
                            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                        )}
                      >
                        <span className="min-w-0 truncate">{c.title}</span>
                        {isNew(c) && (
                          <span className="shrink-0 rounded-full bg-primary/10 px-1.5 text-[10px] leading-4 font-medium text-primary ring-1 ring-primary/20 ring-inset">
                            New
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
