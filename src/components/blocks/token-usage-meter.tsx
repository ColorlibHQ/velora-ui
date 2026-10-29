"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Spend against a budget, with the projection that makes it actionable.
 *
 * A usage bar showing 68% on day 20 of 30 is fine; the same 68% on day 8 is a problem. So the block
 * projects the month-end total from the run rate and states whether that lands over budget. Without
 * it the reader has to do the arithmetic, and mostly will not.
 *
 * The warning threshold compares the *projection* to the budget, not current usage. Alerting only
 * when the bar is already full alerts after it is too late to change anything.
 */
export function TokenUsageMeter() {
  const budget = 500;
  const spent = 341.2;
  const dayOfMonth = 19;
  const daysInMonth = 31;

  const projected = (spent / dayOfMonth) * daysInMonth;
  const overBudget = projected > budget;
  const pct = Math.round((spent / budget) * 100);

  return (
    <Card>
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Spend this month</p>
            <p className="text-2xl font-bold tabular-nums">
              ${spent.toFixed(2)}{" "}
              <span className="text-sm font-normal text-muted-foreground">of ${budget}</span>
            </p>
          </div>
          <Badge variant={overBudget ? "warning" : "secondary"} className="tabular-nums">
            {pct}%
          </Badge>
        </div>

        <div
          role="meter"
          aria-label="Monthly spend against budget"
          aria-valuemin={0}
          aria-valuemax={budget}
          aria-valuenow={spent}
          aria-valuetext={`$${spent.toFixed(2)} of $${budget} spent`}
          className="h-2 overflow-hidden rounded-full bg-muted"
        >
          <div
            className={cn("h-full rounded-full", overBudget ? "bg-warning" : "bg-primary")}
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t pt-3">
          <div>
            <dt className="text-xs text-muted-foreground">Run rate</dt>
            <dd className="text-sm font-semibold tabular-nums">
              ${(spent / dayOfMonth).toFixed(2)} / day
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Projected</dt>
            <dd
              className={cn(
                "text-sm font-semibold tabular-nums",
                overBudget ? "text-foreground" : "text-success",
              )}
            >
              ${projected.toFixed(0)}
              <span className="ms-1 text-xs font-normal">
                {overBudget ? "over budget" : "within budget"}
              </span>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
