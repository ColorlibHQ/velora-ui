"use client";

import { cn } from "@/lib/utils";

/**
 * A conversion funnel showing both rates that matter.
 *
 * Step-to-step conversion and conversion from the top are different numbers, and a funnel that
 * shows only one is misleading either way: 80% step conversion looks healthy until you see it is
 * 12% of the original traffic. Both are derived from the counts, so neither can be typed wrong.
 *
 * The biggest single drop-off is highlighted rather than left to the reader to find by comparing
 * five percentages — that comparison is the reason someone opens a funnel.
 */
export function MetricsFunnelSteps() {
  const steps = [
    { label: "Visited pricing", count: 24800 },
    { label: "Started signup", count: 8400 },
    { label: "Verified email", count: 6900 },
    { label: "Created workspace", count: 3100 },
    { label: "Invited a teammate", count: 1480 },
  ];

  const top = steps[0]!.count;
  const drops = steps.map((step, index) =>
    index === 0 ? 0 : 1 - step.count / steps[index - 1]!.count,
  );
  const worst = drops.indexOf(Math.max(...drops));

  return (
    <ol className="space-y-2">
      {steps.map((step, index) => {
        const fromTop = (step.count / top) * 100;
        const fromPrevious = index === 0 ? 100 : (step.count / steps[index - 1]!.count) * 100;
        const isWorst = index === worst;

        return (
          <li key={step.label} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="min-w-0 flex-1 text-sm font-medium">{step.label}</span>
              <span className="text-sm tabular-nums">{step.count.toLocaleString("en-US")}</span>
              <span className="w-16 text-end text-xs tabular-nums text-muted-foreground">
                {fromTop.toFixed(1)}%
              </span>
            </div>

            <div className="h-6 overflow-hidden rounded bg-muted">
              <div
                className={cn(
                  "flex h-full items-center rounded px-2",
                  isWorst ? "bg-destructive/25" : "bg-primary/25",
                )}
                style={{ width: `${fromTop}%` }}
              >
                {index > 0 && (
                  <span className="whitespace-nowrap text-[10px] font-medium tabular-nums">
                    {fromPrevious.toFixed(0)}% of previous
                  </span>
                )}
              </div>
            </div>

            {isWorst && (
              <p className="text-xs text-destructive">
                Largest drop-off: {((1 - fromPrevious / 100) * 100).toFixed(0)}% lost at this step
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
