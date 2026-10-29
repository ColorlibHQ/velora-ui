"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * An in-page nav that highlights the section you are reading.
 *
 * Driven by `IntersectionObserver`, not by scroll offsets. Measuring `getBoundingClientRect()` on
 * every scroll event runs layout dozens of times a second; the observer fires only on crossings and
 * costs nothing in between.
 *
 * `rootMargin: "-20% 0px -70% 0px"` narrows the trigger band to roughly a fifth down the viewport,
 * which is where a reader's eye is. Without it, two sections are intersecting most of the time and
 * the highlight flickers between them.
 */
export function InpageSectionNav() {
  const sections = [
    { id: "sec-overview", label: "Overview" },
    { id: "sec-billing", label: "Billing" },
    { id: "sec-team", label: "Team" },
    { id: "sec-danger", label: "Danger zone" },
  ];

  const [active, setActive] = useState(sections[0]!.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A narrow band near the top, so only one section qualifies at a time.
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-6">
      <nav aria-label="On this page" className="sticky top-4 hidden h-fit w-40 shrink-0 sm:block">
        <ul className="space-y-1 border-s">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "-ms-px block border-s-2 py-1 ps-3 text-xs transition-colors",
                  active === section.id
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 flex-1 space-y-4">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-4 rounded-lg border p-4">
            <h3 className="text-sm font-semibold">{section.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Scroll the page and watch the nav follow. Each panel is tall enough to cross the
              trigger band on its own.
            </p>
            <div className="mt-3 h-24 rounded bg-muted/50" />
          </section>
        ))}
      </div>
    </div>
  );
}
