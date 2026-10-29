"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartCard,
  ChartTooltip,
  count,
  gridProps,
  lineSeriesProps,
  withSuffix,
  xAxisProps,
  yAxisProps,
} from "@/components/charts";

const DATA = [
  { day: "Mon", p95: 780 },
  { day: "Tue", p95: 820 },
  { day: "Wed", p95: 910 },
  { day: "Thu", p95: 1180 },
  { day: "Fri", p95: 1420 },
  { day: "Sat", p95: 940 },
  { day: "Sun", p95: 860 },
];

// withSuffix wraps a formatter; it does not create one from a bare suffix.
const ms = withSuffix(count, "ms");

/**
 * A series read against the range it is supposed to stay inside.
 *
 * The band is the point: latency of 1,180ms means nothing until you know the budget was 1,000.
 * `ReferenceArea` is drawn before the line so the line paints over it, and the band uses a
 * low-opacity fill rather than a solid one — a solid block would read as data.
 */
export function ChartReferenceBand() {
  return (
    <ChartCard title="Response time" subtitle="p95, against a 1,000ms budget" height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={DATA}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="day" {...xAxisProps} />
          <YAxis {...yAxisProps} domain={[0, 1600]} tickFormatter={(v) => ms(Number(v))} />
          <ReferenceArea y1={0} y2={1000} fill="var(--success)" fillOpacity={0.07} />
          <ReferenceLine
            y={1000}
            stroke="var(--warning)"
            strokeDasharray="4 4"
            label={{ value: "Budget", position: "insideTopRight", fontSize: 11, fill: "var(--warning)" }}
          />
          <Tooltip content={<ChartTooltip format={ms} />} />
          <Line {...lineSeriesProps} dataKey="p95" name="p95" stroke="var(--chart-2)" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
