"use client";

import { Sparkline } from "@/components/charts";
import { cn } from "@/lib/utils";

const ROWS = [
  { label: "Sign-ups", value: "1,284", change: 8.4, series: [18, 20, 19, 23, 25, 24, 28, 31] },
  { label: "Activation", value: "62.1%", change: 2.1, series: [55, 57, 56, 58, 59, 61, 60, 62] },
  { label: "Churn", value: "2.4%", change: 1.8, invert: true, series: [1.9, 2.0, 2.1, 2.0, 2.2, 2.3, 2.4] },
  { label: "Avg. session", value: "8m 12s", change: -3.2, series: [9.4, 9.1, 8.9, 8.8, 8.6, 8.4, 8.2] },
];

/**
 * A dense row of trends.
 *
 * For a page that needs eight metrics visible at once, where a card grid would need scrolling.
 * The sparkline carries the shape and the number carries the value — neither is enough alone,
 * which is why this is not just a table.
 *
 * `invert` on churn is the detail that matters: without it a rising churn rate renders in the
 * positive colour, which reads as reassurance about a number that is getting worse.
 */
export function MetricsSparklineRow() {
  return (
    <ul className="divide-y divide-border">
      {ROWS.map((row) => {
        const good = row.invert ? row.change < 0 : row.change > 0;

        return (
          <li key={row.label} className="flex items-center gap-4 py-3">
            <span className="w-28 shrink-0 text-sm text-muted-foreground">{row.label}</span>

            <span className="w-20 shrink-0 text-sm font-semibold tabular-nums">{row.value}</span>

            <div className="h-8 min-w-0 flex-1">
              <Sparkline values={row.series} tone={good ? 2 : 5} height={32} />
            </div>

            <span
              className={cn(
                "w-16 shrink-0 text-end text-xs font-medium tabular-nums",
                good ? "text-success" : "text-destructive",
              )}
            >
              {row.change > 0 ? "+" : ""}
              {row.change}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}
