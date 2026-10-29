"use client";

import { cn } from "@/lib/utils";

const SITES = [
  { name: "Rotterdam", used: 104 },
  { name: "Hamburg", used: 92 },
  { name: "Felixstowe", used: 78 },
  { name: "Gdansk", used: 54 },
];

/**
 * Utilisation that can exceed 100%, and has to show it.
 *
 * The whole point of a capacity meter is the over-capacity case, so the track runs to 110 rather
 * than 100: a bar clamped at full is indistinguishable from a bar at exactly full, which hides
 * the one reading anyone needs to act on. The number is never clamped.
 */
export function ProgressCapacity() {
  const SCALE = 110;

  return (
    <ul className="space-y-3">
      {SITES.map((site) => {
        const over = site.used > 100;
        return (
          <li key={site.name} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{site.name}</span>
              <span
                className={cn(
                  "tabular-nums",
                  over ? "font-semibold text-destructive" : "text-muted-foreground",
                )}
              >
                {site.used}%
              </span>
            </div>

            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              {/* The 100% mark, so an over-capacity bar has something to be over. */}
              <span
                className="absolute inset-y-0 z-10 w-px bg-border"
                style={{ insetInlineStart: `${(100 / SCALE) * 100}%` }}
                aria-hidden="true"
              />
              <div
                className={cn("h-full rounded-full", over ? "bg-destructive" : "bg-primary")}
                style={{ width: `${Math.min(100, (site.used / SCALE) * 100)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
