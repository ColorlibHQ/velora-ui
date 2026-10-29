"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ChartCard } from "@/components/charts";

const DATA = [
  { label: "Direct", value: 35, colour: "var(--chart-1)" },
  { label: "Organic", value: 28, colour: "var(--chart-2)" },
  { label: "Referral", value: 22, colour: "var(--chart-3)" },
  { label: "Social", value: 15, colour: "var(--chart-4)" },
];

/**
 * A breakdown where the legend carries the numbers.
 *
 * Slice labels on a donut are unreadable below about 8% and overlap each other besides, so the
 * figures live in a list beside the chart. That list is also the accessible version: the chart
 * is `aria-hidden`, because a screen reader gets nothing from a pie and everything from the rows.
 */
export function ChartDonutLegend() {
  const total = DATA.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ChartCard title="Traffic sources" subtitle="Share of sessions" height={220}>
      <div className="flex h-full flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-full w-full max-w-[200px] shrink-0" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                dataKey="value"
                nameKey="label"
                innerRadius="62%"
                outerRadius="92%"
                paddingAngle={2}
                strokeWidth={0}
              >
                {DATA.map((entry) => (
                  <Cell key={entry.label} fill={entry.colour} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tabular-nums">{total}%</span>
            <span className="text-[10px] text-muted-foreground">tracked</span>
          </div>
        </div>

        <ul className="w-full space-y-2.5">
          {DATA.map((entry) => (
            <li key={entry.label} className="flex items-center gap-2.5 text-sm">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: entry.colour }}
                aria-hidden="true"
              />
              <span className="flex-1 text-muted-foreground">{entry.label}</span>
              <span className="font-semibold tabular-nums">{entry.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}
