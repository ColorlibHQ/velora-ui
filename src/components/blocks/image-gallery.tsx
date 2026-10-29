"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ImageIcon } from "lucide-react";

/**
 * A selectable media grid using gradient placeholders rather than image files.
 *
 * The placeholders are deliberate: a block that ships with six JPEGs adds weight to every customer's
 * repository for a demo they will delete. Gradients from the chart tokens carry the layout, adapt to
 * dark mode with no second asset, and make the aspect ratio obvious.
 *
 * `aspect-square` on the tile with the content absolutely positioned inside is what keeps the grid
 * from reflowing as images load in the real version — the box reserves its height before anything
 * arrives, so there is no layout shift.
 *
 * Selection is a checkbox group, not a radio group: several images can be chosen at once, and
 * `aria-checked` on each tile says so.
 */
export function ImageGallery() {
  const items = [
    { id: "a", name: "hero-desktop", tone: "from-chart-1/40 to-chart-1/10" },
    { id: "b", name: "hero-mobile", tone: "from-chart-2/40 to-chart-2/10" },
    { id: "c", name: "team-offsite", tone: "from-chart-3/40 to-chart-3/10" },
    { id: "d", name: "product-01", tone: "from-chart-4/40 to-chart-4/10" },
    { id: "e", name: "product-02", tone: "from-chart-5/40 to-chart-5/10" },
    { id: "f", name: "warehouse", tone: "from-chart-1/40 to-chart-3/10" },
  ];

  const [selected, setSelected] = useState<string[]>(["b", "d"]);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground" role="status">
        {selected.length} of {items.length} selected
      </p>

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {items.map((item) => {
          const active = selected.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggle(item.id)}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-lg border-2 transition-colors",
                  active ? "border-primary" : "border-transparent hover:border-border",
                )}
              >
                <span
                  className={cn("absolute inset-0 bg-gradient-to-br", item.tone)}
                  aria-hidden="true"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon
                    className="h-5 w-5 text-foreground/30"
                    aria-hidden="true"
                  />
                </span>
                <span className="sr-only">{item.name}</span>

                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground ltr:right-1 rtl:left-1"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
