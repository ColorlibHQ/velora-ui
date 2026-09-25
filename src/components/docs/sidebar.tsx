"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { categories, categorySlug, componentsMeta } from "@/lib/components-meta";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <Link
            href={`/components/category/${categorySlug(category)}`}
            className="mb-2 block text-xs font-semibold tracking-wide text-foreground uppercase hover:text-primary"
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
                      className={cn(
                        "-ml-px block border-l py-1 pl-4 text-sm transition-colors",
                        active
                          ? "border-primary font-medium text-primary"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      )}
                    >
                      {c.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
