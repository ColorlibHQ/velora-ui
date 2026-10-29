"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Section tabs with counts, driven by real roving-tabindex keyboard behaviour.
 *
 * Hand-rolled tab strips usually put every tab in the tab order and respond only to clicks, which
 * means a keyboard user tabs through all five to reach the content. The correct pattern — and what
 * this does — is one stop for the whole group, with arrow keys moving between tabs.
 *
 * `aria-controls` is deliberately omitted rather than pointed at a panel that is not in this
 * block: a dangling idref is worse than none, because assistive tech announces a relationship the
 * user cannot follow. Wire it up when you pair this with panels.
 */
export function SectionTabs() {
  const tabs = [
    { id: "all", label: "All", count: 1284 },
    { id: "open", label: "Open", count: 42 },
    { id: "paid", label: "Paid", count: 1180 },
    { id: "refunded", label: "Refunded", count: 38 },
    { id: "failed", label: "Failed", count: 24 },
  ];
  const [active, setActive] = useState("open");

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    // Wraps at both ends, which is what a tablist does. Note the arrow keys are NOT flipped for
    // RTL: the browser already mirrors ArrowRight/ArrowLeft semantics for the user's writing mode
    // in a horizontal tablist, so remapping them here would double the flip.
    const next = (index + delta + tabs.length) % tabs.length;
    setActive(tabs[next]!.id);
  }

  return (
    <div className="border-b">
      <div role="tablist" aria-label="Order status" className="flex gap-1 overflow-x-auto">
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={selected}
              // One tab stop for the group: only the selected tab is reachable by Tab.
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              <Badge
                variant={selected ? "default" : "secondary"}
                className="h-5 px-1.5 text-[10px] tabular-nums"
              >
                {tab.count.toLocaleString("en-US")}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
