"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquarePlus, Trash2 } from "lucide-react";

/**
 * A conversation sidebar grouped by recency.
 *
 * Grouped under "Today" / "Yesterday" / "Earlier" headings rather than a flat list, because a chat
 * history is navigated by when rather than by title — and the groups are `<section>`s with real
 * headings, so a screen reader can skip between them.
 *
 * The delete button appears on hover *and* on focus (`group-focus-within:`). Hover-only reveals are
 * unreachable by keyboard, which makes the action effectively nonexistent for anyone not using a
 * mouse — the single most common failure in this pattern.
 */
export function ConversationList() {
  const groups = [
    {
      label: "Today",
      items: [
        { id: "a", title: "Why did EU refunds spike?", preview: "The VAT threshold changed on the 25th…" },
        { id: "b", title: "Draft the Q3 board summary", preview: "Revenue rose 12.4% quarter over…" },
      ],
    },
    {
      label: "Yesterday",
      items: [{ id: "c", title: "Churn by cohort", preview: "Enterprise improved while SMB…" }],
    },
    {
      label: "Earlier",
      items: [
        { id: "d", title: "Latency regression after v3", preview: "p95 moved from 412ms to 680ms…" },
        { id: "e", title: "Which SKUs are unprofitable?", preview: "Four SKUs have negative margin…" },
      ],
    },
  ];

  const [active, setActive] = useState("a");

  return (
    <div className="space-y-3 rounded-lg border p-2">
      <Button variant="outline" size="sm" className="w-full">
        <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
        New conversation
      </Button>

      {groups.map((group) => (
        <section key={group.label} className="space-y-1">
          <h3 className="px-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {group.label}
          </h3>

          <ul>
            {group.items.map((item) => (
              <li key={item.id} className="group relative">
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "w-full rounded-md p-2 pe-9 text-start transition-colors",
                    active === item.id ? "bg-accent" : "hover:bg-accent/50",
                  )}
                >
                  <span className="block truncate text-sm font-medium">{item.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {item.preview}
                  </span>
                </button>

                {/* Focus-within as well as hover: a hover-only control is invisible to a keyboard. */}
                <button
                  type="button"
                  aria-label={`Delete conversation: ${item.title}`}
                  className="absolute top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 end-1"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
