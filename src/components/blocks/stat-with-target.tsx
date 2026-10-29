"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * A number next to what it was aiming at.
 *
 * A figure on its own is rarely readable — $48,295 is good or bad only against the target. The
 * bar is capped at 100% so an over-achieving metric does not overflow its track, but the
 * *percentage* is not capped: 112% is the interesting case and clamping it would hide it.
 */
export function StatWithTarget() {
  const items = [
    { label: "Monthly revenue", value: 48295, target: 55000, prefix: "$" },
    { label: "New customers", value: 847, target: 1000, prefix: "" },
    { label: "Support SLA", value: 112, target: 100, prefix: "", suffix: "%" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const pct = Math.round((item.value / item.target) * 100);
        return (
          <Card key={item.label}>
            <CardContent className="space-y-3 p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-2xl font-bold tabular-nums">
                  {item.prefix}
                  {item.value.toLocaleString("en-US")}
                  {item.suffix}
                </p>
                <p
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    pct >= 100 ? "text-success" : "text-muted-foreground",
                  )}
                >
                  {pct}%
                </p>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", pct >= 100 ? "bg-success" : "bg-primary")}
                  // Capped so the fill cannot escape its track; the label above is not capped,
                  // because exceeding the target is the thing worth seeing.
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Target {item.prefix}
                {item.target.toLocaleString("en-US")}
                {item.suffix}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
