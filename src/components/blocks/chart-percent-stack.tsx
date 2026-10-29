"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartCard,
  ChartTooltip,
  gridProps,
  percent,
  xAxisProps,
  yAxisProps,
} from "@/components/charts";

const RAW = [
  { month: "Feb", free: 620, pro: 240, enterprise: 40 },
  { month: "Mar", free: 640, pro: 290, enterprise: 52 },
  { month: "Apr", free: 610, pro: 350, enterprise: 61 },
  { month: "May", free: 580, pro: 420, enterprise: 78 },
  { month: "Jun", free: 540, pro: 480, enterprise: 96 },
  { month: "Jul", free: 505, pro: 540, enterprise: 118 },
];

/**
 * A 100%-stacked area, normalised in the data rather than by the chart.
 *
 * Recharts has `stackOffset="expand"`, which normalises for the *drawing* but leaves the raw counts
 * in the tooltip — so the chart shows 46% while the tooltip says 505, and the reader has to work out
 * that they describe the same thing. Converting to shares up front makes the axis, the areas and the
 * tooltip all agree.
 *
 * The trade-off is losing the absolute totals, so the subtitle carries them. A share chart with no
 * magnitude anywhere cannot tell growth from redistribution.
 */
const DATA = RAW.map((row) => {
  const total = row.free + row.pro + row.enterprise;
  return {
    month: row.month,
    total,
    free: (row.free / total) * 100,
    pro: (row.pro / total) * 100,
    enterprise: (row.enterprise / total) * 100,
  };
});

export function ChartPercentStack() {
  const latest = DATA[DATA.length - 1]!;

  return (
    <ChartCard
      title="Plan mix"
      subtitle={`Share of ${latest.total.toLocaleString("en-US")} accounts`}
      height={260}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...xAxisProps} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => percent(Number(v))} {...yAxisProps} />
          <Tooltip content={<ChartTooltip format={percent} />} />
          {[
            { key: "free", name: "Free", tone: "var(--chart-3)" },
            { key: "pro", name: "Pro", tone: "var(--chart-1)" },
            { key: "enterprise", name: "Enterprise", tone: "var(--chart-2)" },
          ].map((series) => (
            <Area
              key={series.key}
              type="monotone"
              dataKey={series.key}
              name={series.name}
              stackId="mix"
              stroke={series.tone}
              fill={series.tone}
              fillOpacity={0.25}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
