"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartCard,
  ChartTooltip,
  barSeriesProps,
  compact,
  verticalGridProps,
  xAxisProps,
  yAxisProps,
} from "@/components/charts";

const DATA = [
  { source: "Organic search", visits: 48200 },
  { source: "Paid search", visits: 31400 },
  { source: "Direct", visits: 22800 },
  { source: "Referral", visits: 14100 },
  { source: "Social", visits: 8600 },
];

/**
 * Reads `<html dir>` and re-renders when it changes.
 *
 * Deliberately local to this block rather than imported: a copy-paste block should work in a
 * customer's project without dragging a hook along with it. The server snapshot is `"ltr"`, which
 * is what the static export prerenders, so the first client render matches and there is no
 * hydration mismatch — the flip happens on the commit after.
 */
function useHtmlDirection(): "ltr" | "rtl" {
  return useSyncExternalStore(
    useCallback((onChange: () => void) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
      return () => observer.disconnect();
    }, []),
    () => (document.documentElement.dir === "rtl" ? "rtl" : "ltr"),
    () => "ltr" as const,
  );
}

/**
 * A horizontal bar chart that actually mirrors under RTL.
 *
 * This is the limitation the RTL docs page calls out. Recharts lays out in pixels, so a
 * `layout="vertical"` chart grows left-to-right and puts the category axis on the left regardless of
 * `dir` — the one chart form that does not mirror for free.
 *
 * `reversed` on the value axis and `orientation` on the category axis are what flip it. Nothing in
 * CSS can: the bars are SVG rects positioned by the library.
 */
export function ChartHorizontalBars() {
  const rtl = useHtmlDirection() === "rtl";

  return (
    <ChartCard title="Traffic by source" subtitle="Visits, last 30 days" height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 12 }}>
          <CartesianGrid {...verticalGridProps} />
          <XAxis type="number" reversed={rtl} tickFormatter={(v) => compact(Number(v))} {...xAxisProps} />
          <YAxis
            type="category"
            dataKey="source"
            width={110}
            orientation={rtl ? "right" : "left"}
            {...yAxisProps}
          />
          <Tooltip content={<ChartTooltip format={compact} />} />
          <Bar dataKey="visits" name="Visits" fill="var(--chart-1)" {...barSeriesProps} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
