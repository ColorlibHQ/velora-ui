"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartCard,
  ChartTooltip,
  barSeriesProps,
  compactCurrency,
  gridProps,
  lineSeriesProps,
  percent,
  xAxisProps,
  yAxisProps,
} from "@/components/charts";

const DATA = [
  { month: "Apr", revenue: 37600, margin: 32.4 },
  { month: "May", revenue: 36100, margin: 31.8 },
  { month: "Jun", revenue: 41900, margin: 33.6 },
  { month: "Jul", revenue: 44300, margin: 34.3 },
  { month: "Aug", revenue: 43100, margin: 34.1 },
  { month: "Sep", revenue: 48295, margin: 34.8 },
];

/**
 * Two series in different units.
 *
 * A dual axis is easy to make unreadable. Two things keep it honest here: each axis is tinted
 * with its own series' colour, so there is no guessing which scale a line belongs to, and the
 * two series use different marks — bars for the amount, a line for the rate — because two lines
 * on two scales invite a comparison of slopes that means nothing.
 *
 * `orientation="right"` is physical, not logical, and there is no logical alternative: Recharts
 * lays out in pixels and its axis API accepts only "left" or "right". So the secondary axis stays
 * on the right under RTL while the rest of the page mirrors. That is one of the documented RTL
 * limitations of chart internals rather than something to work around here — the alternative is
 * swapping the axes in JavaScript on direction change, which moves the *data* to a different
 * scale and is far more confusing than an axis on the unexpected side.
 */
export function ChartDualAxis() {
  return (
    <ChartCard title="Revenue and margin" subtitle="Six months" height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={DATA}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...xAxisProps} />
          <YAxis
            {...yAxisProps}
            yAxisId="amount"
            tickFormatter={(v) => compactCurrency(Number(v))}
            tick={{ fontSize: 11, fill: "var(--chart-1)" }}
          />
          <YAxis
            {...yAxisProps}
            yAxisId="rate"
            orientation="right"
            domain={[0, 50]}
            tickFormatter={(v) => percent(Number(v))}
            tick={{ fontSize: 11, fill: "var(--chart-4)" }}
          />
          <Tooltip
            content={
              <ChartTooltip
                // Branches on the series NAME, which is what a tooltip point carries — there
                // is no dataKey on it. Two series in different units need two formats, or the
                // margin reads as $34.80.
                format={(value, point) =>
                  point?.name === "Margin" ? percent(value) : compactCurrency(value)
                }
              />
            }
          />
          <Bar
            {...barSeriesProps}
            yAxisId="amount"
            dataKey="revenue"
            name="Revenue"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            {...lineSeriesProps}
            yAxisId="rate"
            dataKey="margin"
            name="Margin"
            stroke="var(--chart-4)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
