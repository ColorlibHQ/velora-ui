"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const GAUGES = [
  { label: "Uptime", value: 99.8, tone: "var(--chart-2)" },
  { label: "SLA met", value: 94.2, tone: "var(--chart-1)" },
  { label: "Capacity", value: 104, tone: "var(--destructive)" },
];

/**
 * Radial gauges, including one over 100%.
 *
 * The domain runs to 110, not 100, and that is the whole design decision: an arc that cannot
 * exceed its track makes "at capacity" and "over capacity" look identical, which is the one
 * reading anyone needs to act on. The printed number is never clamped.
 *
 * `PolarAngleAxis` with an explicit domain is what makes a RadialBar behave as a gauge rather
 * than scaling to whatever the largest value happens to be.
 */
export function MetricsGaugeRow() {
  const SCALE = 110;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {GAUGES.map((gauge) => (
        <div key={gauge.label} className="flex flex-col items-center">
          <div className="relative h-32 w-full" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                // Recharts 3 adds tabindex="0" by default. Inside an aria-hidden wrapper that
                // makes a focusable element unreachable to assistive tech but still tabbable —
                // axe reports it as aria-hidden-focus. The value is in the sr-only text below.
                accessibilityLayer={false}
                data={[{ value: Math.min(gauge.value, SCALE), fill: gauge.tone }]}
                innerRadius="72%"
                outerRadius="100%"
                startAngle={210}
                endAngle={-30}
              >
                <PolarAngleAxis type="number" domain={[0, SCALE]} tick={false} axisLine={false} />
                <RadialBar dataKey="value" cornerRadius={8} background />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-xl font-bold tabular-nums">{gauge.value}%</span>
            </div>
          </div>

          <p className="-mt-2 text-sm text-muted-foreground">
            {gauge.label}
            {/* The value again, in text, because the chart above is aria-hidden. */}
            <span className="sr-only">: {gauge.value} percent</span>
          </p>
        </div>
      ))}
    </div>
  );
}
