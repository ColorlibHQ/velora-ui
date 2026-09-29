"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
}

/**
 * "On this page" list with scroll-spy. A section becomes current once its
 * heading crosses the top third of the viewport; at the very bottom of the
 * page the last section wins, since short final sections never get there.
 */
export function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(headings[headings.length - 1].id);
        return;
      }
      const line = window.innerHeight / 3;
      let current = headings[0].id;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    // The observers only tell us *when* something crossed a boundary (the
    // top-third line, the viewport edges, the end of the page); the current
    // section is then read from layout, which handles both scroll directions
    // and long jumps.
    const band = new IntersectionObserver(update, {
      rootMargin: "0px 0px -66% 0px",
    });
    const viewport = new IntersectionObserver(update);
    headings.forEach((el) => {
      band.observe(el);
      viewport.observe(el);
    });

    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.height = "1px";
    document.body.appendChild(sentinel);
    viewport.observe(sentinel);

    update();
    return () => {
      band.disconnect();
      viewport.disconnect();
      sentinel.remove();
    };
  }, [items]);

  const onClick = (id: string) => {
    setActive(id);
    // <html> is scroll-smooth; jump instead for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const root = document.documentElement;
      root.style.setProperty("scroll-behavior", "auto");
      requestAnimationFrame(() => root.style.removeProperty("scroll-behavior"));
    }
  };

  return (
    <nav aria-labelledby="on-this-page">
      <h2 id="on-this-page" className="text-sm font-semibold">
        On this page
      </h2>
      <ul className="mt-3 space-y-0.5 border-l border-border/60 text-sm">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                onClick={() => onClick(item.id)}
                className={cn(
                  "-ml-px block border-l py-1 pl-4 transition-colors",
                  current
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
