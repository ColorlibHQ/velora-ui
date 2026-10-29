"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartCard,
  ChartTooltip,
  barSeriesProps,
  count,
  gridProps,
  xAxisProps,
  yAxisProps,
} from "@/components/charts";

const DATA = [
  { week: "W1", direct: 240, organic: 180, referral: 90, social: 60 },
  { week: "W2", direct: 260, organic: 195, referral: 105, social: 72 },
  { week: "W3", direct: 235, organic: 205, referral: 98, social: 81 },
  { week: "W4", direct: 288, organic: 224, referral: 120, social: 95 },
  { week: "W5", direct: 301, organic: 240, referral: 112, social: 88 },
  { week: "W6", direct: 322, organic: 258, referral: 134, social: 104 },
];

const SERIES = [
  { key: "direct", label: "Direct", colour: "var(--chart-1)" },
  { key: "organic", label: "Organic", colour: "var(--chart-2)" },
  { key: "referral", label: "Referral", colour: "var(--chart-3)" },
  { key: "social", label: "Social", colour: "var(--chart-4)" },
];

/**
 * How a total divides, over time.
 *
 * `stackId` on every series is what makes it a composition rather than four overlapping bars.
 * Only the last series in the stack gets a rounded top: rounding them all would put a curve in
 * the middle of the column where two segments meet.
 */
export function ChartStackedBars() {
  return (
    <ChartCard title="Sessions by channel" subtitle="Last six weeks" height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="week" {...xAxisProps} />
          <YAxis {...yAxisProps} tickFormatter={(v) => count(Number(v))} />
          <Tooltip content={<ChartTooltip format={count} />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
          {SERIES.map((entry, index) => (
            <Bar
              {...barSeriesProps}
              key={entry.key}
              dataKey={entry.key}
              name={entry.label}
              stackId="channels"
              fill={entry.colour}
              radius={index === SERIES.length - 1 ? [4, 4, 0, 0] : 0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
