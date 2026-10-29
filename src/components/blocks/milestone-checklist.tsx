"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * A checklist whose progress bar is derived from the boxes, not tracked separately.
 *
 * Two sources of truth for "how complete is this" is how a checklist ends up showing 60% with four
 * of five ticked. The percentage here is computed on every render from the items themselves, so they
 * cannot disagree.
 *
 * The items are real `<input type="checkbox">` elements inside labels, not divs with click handlers.
 * That gives Space to toggle, the correct role and checked state, and grouping of label to control —
 * all of which a `role="checkbox"` div has to reimplement, usually incompletely.
 *
 * The completed label is struck through with `line-through` *and* the checkbox's own checked state
 * carries the meaning, so the strike-through is decoration rather than the only signal.
 */
export function MilestoneChecklist() {
  const [items, setItems] = useState([
    { id: "scope", label: "Scope signed off", done: true },
    { id: "design", label: "Design review complete", done: true },
    { id: "build", label: "Implementation merged", done: true },
    { id: "qa", label: "QA sign-off", done: false },
    { id: "launch", label: "Launch checklist cleared", done: false },
  ]);

  const done = items.filter((item) => item.done).length;
  const pct = Math.round((done / items.length) * 100);

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-medium">Release 3.0 readiness</p>
          <p className="text-xs tabular-nums text-muted-foreground">
            {done} of {items.length}
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Release readiness"
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-valuenow={done}
          aria-valuetext={`${done} of ${items.length} complete`}
          className="h-1.5 overflow-hidden rounded-full bg-muted"
        >
          <div
            className={cn("h-full rounded-full transition-all", pct === 100 ? "bg-success" : "bg-primary")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-md p-1.5 transition-colors hover:bg-accent/40">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() =>
                  setItems((prev) =>
                    prev.map((entry) =>
                      entry.id === item.id ? { ...entry, done: !entry.done } : entry,
                    ),
                  )
                }
                className="peer sr-only"
              />
              {/* The visual box. `peer-checked:` reads the real input's state, so the two can
                  never fall out of sync — and `peer-focus-visible:` keeps a visible focus ring
                  even though the input itself is sr-only.
                  The tick uses `peer-checked:[&>svg]:` rather than a bare `peer-checked:` on the
                  icon: peer variants only match SIBLINGS of the peer, and the icon is a
                  descendant of this span, so `peer-checked:opacity-100` on it would never
                  apply and the tick would stay invisible when checked. */}
              <span
                aria-hidden="true"
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors [&>svg]:opacity-0 peer-checked:border-success peer-checked:bg-success peer-checked:text-success-foreground peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
              >
                <Check className="h-3 w-3" />
              </span>
              <span
                className={cn(
                  "text-sm",
                  item.done ? "text-muted-foreground line-through" : "text-foreground",
                )}
              >
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
