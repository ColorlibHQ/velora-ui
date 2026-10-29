"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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
  xAxisProps,
  yAxisProps,
} from "@/components/charts";
import { Button } from "@/components/ui/button";
import { LineChart as LineChartIcon } from "lucide-react";

const DATA = [
  { week: "W1", signups: 42 },
  { week: "W2", signups: 61 },
  { week: "W3", signups: 55 },
  { week: "W4", signups: 78 },
];

/**
 * What a chart card shows when there is nothing to plot.
 *
 * Recharts renders an empty grid and empty axes for an empty dataset, which looks like a chart that
 * failed to load rather than a chart with no data. So the empty case is not a chart at all — it
 * replaces the plot area with a message at the same height.
 *
 * Matching the height is the point. Swapping a 240px chart for a 60px message makes the whole page
 * reflow the moment data arrives, and on a dashboard of eight cards that is a visible jolt.
 *
 * The empty state says what would cause data to appear, rather than "No data". A chart that has
 * never had data and a chart filtered down to nothing need different sentences, and neither of them
 * is "No data available".
 */
export function ChartEmptyState() {
  const [empty, setEmpty] = useState(true);

  return (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={() => setEmpty((prev) => !prev)}>
        {empty ? "Show with data" : "Show empty"}
      </Button>

      {/* ChartCard owns the plot area's height, so both branches occupy the same box and
          nothing reflows when data arrives. */}
      <ChartCard title="Weekly signups" subtitle="New accounts per week" height={240}>
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <LineChartIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-medium">No signups in this range</p>
              <p className="text-sm text-muted-foreground">
                Widen the date range, or clear the channel filter to include organic traffic.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DATA} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="week" {...xAxisProps} />
              <YAxis {...yAxisProps} />
              <Tooltip content={<ChartTooltip format={count} />} />
              <Line
                {...lineSeriesProps}
                dataKey="signups"
                name="Signups"
                stroke="var(--chart-1)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
