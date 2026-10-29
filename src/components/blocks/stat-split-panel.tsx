"use client";

import { Card, CardContent } from "@/components/ui/card";

/**
 * One headline figure with its components broken out beside it.
 *
 * For a total that is only meaningful once you can see what it is made of — revenue split by
 * plan, pipeline split by stage. The parts sum to the headline, which is a constraint worth
 * keeping: a breakdown that does not add up is the fastest way to lose a reader's trust.
 */
export function StatSplitPanel() {
  const parts = [
    { label: "Subscriptions", value: 31200 },
    { label: "One-off licences", value: 12400 },
    { label: "Support plans", value: 4695 },
  ];
  const total = parts.reduce((sum, part) => sum + part.value, 0);

  return (
    <Card>
      <CardContent className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_2fr] sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">Revenue this month</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            ${total.toLocaleString("en-US")}
          </p>
          <p className="mt-1 text-xs text-success">+12.5% on last month</p>
        </div>

        <div className="space-y-3">
          {parts.map((part) => {
            const share = Math.round((part.value / total) * 100);
            return (
              <div key={part.label} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span>{part.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    ${part.value.toLocaleString("en-US")} · {share}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${share}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
