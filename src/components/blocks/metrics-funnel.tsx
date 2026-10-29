"use client";

const STAGES = [
  { label: "Visited pricing", value: 18420 },
  { label: "Started trial", value: 4210 },
  { label: "Activated", value: 2680 },
  { label: "Converted", value: 946 },
];

/**
 * A funnel that shows both drop-offs.
 *
 * Two percentages, and the distinction is the point: conversion from the *previous* stage tells
 * you where the leak is, conversion from the *top* tells you what it is costing. A funnel showing
 * only one of them can be read to mean either, which is how a 22% step-conversion gets reported
 * as a 22% funnel.
 *
 * Widths are relative to the top of the funnel so the taper is proportional; a per-stage scale
 * would draw every stage full and remove the shape entirely.
 */
export function MetricsFunnel() {
  const top = STAGES[0]!.value;

  return (
    <ol className="space-y-2">
      {STAGES.map((stage, index) => {
        const previous = index === 0 ? null : STAGES[index - 1]!.value;
        const fromPrevious = previous ? (stage.value / previous) * 100 : 100;
        const fromTop = (stage.value / top) * 100;

        return (
          <li key={stage.label}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{stage.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {stage.value.toLocaleString("en-US")}
              </span>
            </div>

            {/* The percentage sits BESIDE the bar, not inside it. 10px near-white on
                bg-primary/80 measures 3.76:1, under the 4.5:1 floor for normal text, and no
                amount of weight fixes that at this size. */}
            <div className="mt-1 flex items-center gap-2">
              <div className="h-7 flex-1 overflow-hidden rounded-md bg-muted">
                <div
                  className="h-full rounded-md bg-primary/80"
                  style={{ width: `${fromTop}%` }}
                />
              </div>
              <span className="w-12 shrink-0 text-end text-[11px] font-semibold tabular-nums">
                {fromTop.toFixed(1)}%
              </span>
            </div>

            {previous && (
              <p className="mt-1 text-[11px] tabular-nums text-muted-foreground">
                {fromPrevious.toFixed(1)}% from previous step ·{" "}
                {(previous - stage.value).toLocaleString("en-US")} lost
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
