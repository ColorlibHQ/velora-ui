"use client";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const ROWS = [
  { name: "Sofia Garcia", team: "Enterprise", value: 184200, move: 2 },
  { name: "James Chen", team: "Mid-market", value: 162800, move: 0 },
  { name: "Emma Wilson", team: "Enterprise", value: 148400, move: -1 },
  { name: "Alex Thompson", team: "SMB", value: 121900, move: 3 },
  { name: "Maria Santos", team: "Mid-market", value: 98600, move: -2 },
];

/**
 * Rows with a position, a delta and a figure.
 *
 * The movement arrow needs its direction in text as well as in colour and glyph — `sr-only`
 * below — because "up two places" is the entire content of that cell and an icon conveys none of
 * it to a screen reader. A zero move renders as a dash rather than an arrow: there is no
 * direction to show.
 */
export function TableLeague() {
  return (
    <ol className="divide-y divide-border">
      {ROWS.map((row, index) => (
        <li key={row.name} className="flex items-center gap-3 py-2.5">
          <span className="w-5 shrink-0 text-center text-sm font-semibold tabular-nums text-muted-foreground">
            {index + 1}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.team}</p>
          </div>

          <span
            className={cn(
              "flex shrink-0 items-center gap-0.5 text-xs font-medium tabular-nums",
              row.move > 0 && "text-success",
              row.move < 0 && "text-destructive",
              row.move === 0 && "text-muted-foreground",
            )}
          >
            {row.move > 0 && <ArrowUp className="size-3" aria-hidden="true" />}
            {row.move < 0 && <ArrowDown className="size-3" aria-hidden="true" />}
            {row.move === 0 && <Minus className="size-3" aria-hidden="true" />}
            {row.move !== 0 && Math.abs(row.move)}
            <span className="sr-only">
              {row.move === 0
                ? "no change in position"
                : `${row.move > 0 ? "up" : "down"} ${Math.abs(row.move)} places`}
            </span>
          </span>

          <span className="w-20 shrink-0 text-end text-sm font-semibold tabular-nums">
            ${(row.value / 1000).toFixed(1)}K
          </span>
        </li>
      ))}
    </ol>
  );
}
