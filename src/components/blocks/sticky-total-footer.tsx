"use client";

import { Button } from "@/components/ui/button";

/**
 * A summary bar pinned to the bottom of a scrolling list.
 *
 * `position: sticky` with `bottom-0` on a footer *inside* the scroll container, rather than a fixed
 * overlay. A fixed bar sits above everything on the page including modals and has to be manually
 * offset on every layout; a sticky one participates in the flow and stops at the container's edge.
 *
 * The container needs an explicit height for sticky to have anything to stick within — `max-h` plus
 * `overflow-y-auto` here. Sticky inside an auto-height parent silently does nothing, which is the
 * usual reason it "doesn't work".
 */
export function StickyTotalFooter() {
  const lines = [
    { name: "Platform licence — annual", amount: "$2,400.00" },
    { name: "Additional seats × 12", amount: "$540.00" },
    { name: "Onboarding (one-off)", amount: "$750.00" },
    { name: "Priority support", amount: "$300.00" },
    { name: "Data migration", amount: "$1,200.00" },
    { name: "Custom domain", amount: "$120.00" },
    { name: "Extra storage — 500 GB", amount: "$180.00" },
  ];

  return (
    <div className="max-h-[280px] overflow-y-auto rounded-lg border">
      <ul className="divide-y">
        {lines.map((line) => (
          <li key={line.name} className="flex items-baseline justify-between gap-3 p-3">
            <span className="min-w-0 flex-1 truncate text-sm">{line.name}</span>
            <span className="shrink-0 text-sm tabular-nums">{line.amount}</span>
          </li>
        ))}
      </ul>

      {/* Sticky, not fixed: it stops at the container edge and needs no page-level offset. */}
      <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t bg-card/95 p-3 backdrop-blur">
        <div className="me-auto">
          <p className="text-xs text-muted-foreground">Total due</p>
          <p className="text-lg font-bold tabular-nums">$5,490.00</p>
        </div>
        <Button variant="outline" size="sm">
          Save draft
        </Button>
        <Button size="sm">Send invoice</Button>
      </div>
    </div>
  );
}
