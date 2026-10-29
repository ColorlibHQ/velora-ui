"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartCard,
  ChartTooltip,
  SegmentedControl,
  areaSeriesProps,
  compactCurrency,
  gridProps,
  useChartId,
  xAxisProps,
  yAxisProps,
} from "@/components/charts";

const DATA = [
  { month: "Jan", revenue: 31200, orders: 820, profit: 9100 },
  { month: "Feb", revenue: 33800, orders: 910, profit: 10400 },
  { month: "Mar", revenue: 32400, orders: 870, profit: 9800 },
  { month: "Apr", revenue: 37600, orders: 1010, profit: 12200 },
  { month: "May", revenue: 36100, orders: 960, profit: 11500 },
  { month: "Jun", revenue: 41900, orders: 1120, profit: 14100 },
  { month: "Jul", revenue: 44300, orders: 1180, profit: 15200 },
  { month: "Aug", revenue: 43100, orders: 1150, profit: 14700 },
  { month: "Sep", revenue: 48295, orders: 1290, profit: 16800 },
];

const SERIES = [
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "profit", label: "Profit" },
] as const;

/**
 * One chart, several series, switched rather than stacked.
 *
 * `useChartId` is not optional decoration. An SVG `url(#id)` reference resolves to the first
 * match in the *document*, not in this component's subtree — so two copies of this block on one
 * page with a hardcoded gradient id would both paint with whichever gradient rendered first.
 * The catalog page renders many blocks together, which is exactly that situation.
 */
export function ChartAreaTrend() {
  const [series, setSeries] = React.useState<string>("revenue");
  const gradientId = useChartId("area-trend");
  const active = SERIES.find((entry) => entry.key === series) ?? SERIES[0];

  return (
    <ChartCard
      title="Performance"
      subtitle="Monthly, current year"
      height={260}
      action={
        <SegmentedControl
          options={SERIES.map((entry) => ({ label: entry.label, value: entry.key }))}
          value={series}
          onChange={(next) => setSeries(next ?? "revenue")}
          label="Series"
        />
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...xAxisProps} />
          <YAxis {...yAxisProps} tickFormatter={(v) => compactCurrency(Number(v))} />
          <Tooltip content={<ChartTooltip format={compactCurrency} />} />
          <Area
            {...areaSeriesProps}
            dataKey={active.key}
            name={active.label}
            stroke="var(--chart-1)"
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
