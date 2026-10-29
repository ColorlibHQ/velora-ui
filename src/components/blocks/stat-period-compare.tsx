"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * One metric across three period lengths, switched rather than stacked.
 *
 * A dashboard that shows "revenue this month" invites the question "compared to what", and stacking
 * 7/30/90-day cards triples the space to answer it. Switching keeps one card and makes the
 * comparison explicit.
 *
 * The period control is a `radiogroup`, since exactly one range applies. Rendering three
 * `aria-pressed` toggles would let assistive tech report that several ranges are active at once,
 * which is not a state this component can be in.
 *
 * Absolute values are recomputed per period rather than scaled from a single number, so the figures
 * stay internally consistent — a 90-day total that is not 3× the 30-day one is the realistic case,
 * and faking it with multiplication produces numbers nobody would believe.
 */
export function StatPeriodCompare() {
  const periods = {
    "7d": { label: "7 days", revenue: "$11,480", orders: 312, prior: 8.2 },
    "30d": { label: "30 days", revenue: "$48,295", orders: 1284, prior: 12.4 },
    "90d": { label: "90 days", revenue: "$132,910", orders: 3641, prior: -2.8 },
  } as const;

  const [period, setPeriod] = useState<keyof typeof periods>("30d");
  const current = periods[period];

  return (
    <Card>
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Revenue</p>

          <div
            role="radiogroup"
            aria-label="Period"
            className="inline-flex rounded-md bg-muted p-0.5"
          >
            {(Object.keys(periods) as (keyof typeof periods)[]).map((key) => {
              const active = key === period;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setPeriod(key)}
                  className={cn(
                    "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                    active
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {periods[key].label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-3xl font-bold tabular-nums">{current.revenue}</p>

        <dl className="grid grid-cols-2 gap-4 border-t pt-3">
          <div>
            <dt className="text-xs text-muted-foreground">Orders</dt>
            <dd className="text-sm font-semibold tabular-nums">
              {current.orders.toLocaleString("en-US")}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">vs previous {current.label}</dt>
            <dd
              className={cn(
                "text-sm font-semibold tabular-nums",
                current.prior > 0 ? "text-success" : "text-destructive",
              )}
            >
              {current.prior > 0 ? "+" : ""}
              {current.prior}%
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
