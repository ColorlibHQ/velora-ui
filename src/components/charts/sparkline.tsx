"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { cn } from "@/lib/utils";
import { useChartId } from "./use-chart-id";
import { CHART_TONES, type ChartTone } from "./tones";

/**
 * The trend line under a stat card.
 *
 * Extracted because the same twenty lines of `AreaChart` + `linearGradient` + two
 * `stop`s appeared under every stat card in the fleet, each with a hand-written gradient
 * id — `saas-stat-${index}`, `prod-grad-${index}`. Those ids are unique only within one
 * page rendering the component once; SVG resolves `url(#…)` against the whole document,
 * so a second instance silently paints with the first one's gradient. `useChartId`
 * removes the class of bug rather than the instance of it.
 *
 * Takes bare numbers. Callers were all mapping `values.map((v) => ({ v }))` into the
 * shape Recharts wants, which is this component's business, not theirs.
 */
export interface SparklineProps {
  values: readonly number[];
  /** Which chart colour to use. Pairs with StatCard's tone. */
  tone?: ChartTone;
  /** Height in pixels. The default matches the stat-card strip. */
  height?: number;
  className?: string;
}

export function Sparkline({ values, tone = 1, height = 48, className }: SparklineProps) {
  const gradientId = useChartId("sparkline");
  const stroke = CHART_TONES[tone].stroke;

  const data = React.useMemo(() => values.map((value) => ({ value })), [values]);

  // Nothing to draw, and Recharts warns about an empty dataset rather than no-op-ing.
  if (data.length === 0) return null;

  return (
    <div className={cn("w-full", className)} style={{ height }} aria-hidden="true">
      {/*
        aria-hidden, because a sparkline is decoration: the number it trends is already
        stated next to it, and announcing a wordless shape adds noise without adding
        information. A chart that carries data a screen reader cannot otherwise reach
        needs a table or a description instead — this is not that.
      */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
          /*
            accessibilityLayer={false} because the wrapper is aria-hidden.
            Recharts 3 adds `tabindex="0"` and a role to the chart surface by default, so an
            aria-hidden container ended up holding a focusable element — a keyboard user tabs
            into something a screen reader cannot see, which axe reports as `aria-hidden-focus`
            and which is genuinely disorienting: focus lands somewhere with no announcement.
            Decoration must be unreachable as well as unannounced.
          */
          accessibilityLayer={false}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.2} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
