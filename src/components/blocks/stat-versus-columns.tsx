"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * This period against last, as paired bars rather than a percentage.
 *
 * A single "+12.4%" hides whether the base was 10 or 10,000. Showing both magnitudes makes a large
 * relative change on a tiny base obvious, which is the most common way a KPI card misleads.
 *
 * Both bars scale against the larger of the pair, so the taller one always fills the track and the
 * comparison is readable per row without a shared axis across rows of different units.
 */
export function StatVersusColumns() {
  const metrics = [
    { label: "Revenue", now: 48295, then: 42960, unit: "$" },
    { label: "Orders", now: 1284, then: 1361, unit: "" },
    { label: "New customers", now: 412, then: 288, unit: "" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric) => {
        const max = Math.max(metric.now, metric.then);
        const up = metric.now >= metric.then;
        const delta = ((metric.now - metric.then) / metric.then) * 100;

        return (
          <Card key={metric.label}>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    up ? "text-success" : "text-destructive",
                  )}
                >
                  {up ? "+" : ""}
                  {delta.toFixed(1)}%
                </p>
              </div>

              <div className="flex items-end gap-3">
                {[
                  { caption: "This month", value: metric.now, tone: "bg-primary" },
                  { caption: "Last month", value: metric.then, tone: "bg-muted-foreground/30" },
                ].map((bar) => (
                  <div key={bar.caption} className="flex-1 space-y-1">
                    <div className="flex h-16 items-end">
                      <div
                        className={cn("w-full rounded-t", bar.tone)}
                        style={{ height: `${(bar.value / max) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs font-medium tabular-nums">
                      {metric.unit}
                      {bar.value.toLocaleString("en-US")}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{bar.caption}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
