"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Radial gauges drawn with one SVG circle and `stroke-dasharray`.
 *
 * No charting library: an arc is a circle with a dash pattern, and `pathLength={100}` makes the
 * dash values literal percentages instead of multiples of 2πr. That removes the radius from the
 * arithmetic entirely, so changing the size cannot silently break the fill.
 *
 * The rotation is applied to the `<svg>` rather than the circle, and it is `-rotate-90` in both
 * directions — a gauge starts at twelve o'clock and fills clockwise regardless of writing mode.
 * Mirroring it under RTL would make the fill run backwards, which is why this is one of the few
 * places a physical transform is correct.
 *
 * Over-100% is not clamped in the label, only in the arc, so 118% is visible as an achievement
 * rather than rounded down to a full ring indistinguishable from exactly meeting the target.
 */
export function MetricsGoalGauge() {
  const goals = [
    { label: "New MRR", pct: 118, value: "$23,600", target: "$20,000" },
    { label: "Activation", pct: 74, value: "1,480", target: "2,000" },
    { label: "Retention", pct: 96, value: "91.2%", target: "95%" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {goals.map((goal) => {
        const complete = goal.pct >= 100;
        return (
          <Card key={goal.label}>
            <CardContent className="flex flex-col items-center gap-3 p-4">
              <div className="relative h-28 w-28">
                {/* -rotate-90 in BOTH directions: a gauge fills clockwise from twelve o'clock
                    whatever the writing mode, so this transform must not mirror. */}
                <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    strokeWidth="4"
                    className="stroke-muted"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    // pathLength=100 makes the dash values plain percentages, so the radius
                    // never enters the calculation.
                    pathLength={100}
                    strokeDasharray={`${Math.min(100, goal.pct)} 100`}
                    className={cn(complete ? "stroke-success" : "stroke-primary")}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={cn(
                      "text-xl font-bold tabular-nums",
                      complete && "text-success",
                    )}
                  >
                    {goal.pct}%
                  </span>
                  <span className="text-[10px] text-muted-foreground">of target</span>
                </div>
              </div>

              <div className="space-y-0.5 text-center">
                <p className="text-sm font-medium">{goal.label}</p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  {goal.value} / {goal.target}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
