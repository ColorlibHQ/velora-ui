/**
 * Shared Recharts axis, grid and series props.
 *
 * Every chart in the fleet spelled these out inline, and they drifted: some grids drew
 * horizontal lines, some vertical, some both; `strokeOpacity` was 0.5 on one chart and
 * absent on the next; tick colour was sometimes `var(--muted-foreground)` and sometimes
 * a hard-coded grey that ignored the theme. Two charts side by side on the same page
 * would not match.
 *
 * Spread these rather than restating them:
 *
 *     <CartesianGrid {...gridProps} />
 *     <XAxis dataKey="month" {...xAxisProps} />
 *     <YAxis {...yAxisProps} tickFormatter={compactCurrency} />
 *
 * Anything genuinely chart-specific still goes on the element, after the spread, where a
 * reader can see it is a deviation.
 *
 * No React, no "use client" — plain objects, so a server component can read them too.
 */

/** Tick label styling. Reads theme variables, so it follows light/dark automatically. */
const tick = { fill: "var(--muted-foreground)", fontSize: 12 } as const;

/**
 * Horizontal rules only.
 *
 * Vertical lines duplicate what the category axis already communicates and make dense
 * charts noisy, so this is the default and `verticalGridProps` is the exception.
 */
export const gridProps = {
  strokeDasharray: "3 3",
  vertical: false,
  stroke: "var(--border)",
  strokeOpacity: 0.5,
} as const;

/** For horizontal bar charts, where the value axis runs left to right. */
export const verticalGridProps = {
  strokeDasharray: "3 3",
  horizontal: false,
  stroke: "var(--border)",
  strokeOpacity: 0.5,
} as const;

/**
 * Category axis.
 *
 * No axis line and no tick marks: the grid already carries the structure, and the
 * doubled line reads as a border on the chart.
 */
export const xAxisProps = {
  axisLine: false,
  tickLine: false,
  tick,
  dy: 8,
} as const;

/** Value axis. `dx` pulls the labels off the plot area without a margin hack. */
export const yAxisProps = {
  axisLine: false,
  tickLine: false,
  tick,
  dx: -4,
} as const;

/** Area series: a smooth line with no dots, which only appear on hover. */
export const areaSeriesProps = {
  type: "monotone",
  strokeWidth: 2,
  dot: false,
  activeDot: { r: 4, strokeWidth: 2 },
} as const;

/** Line series. Same shape as an area, minus the fill. */
export const lineSeriesProps = areaSeriesProps;

/** Bar series. The radius is the top two corners only. */
export const barSeriesProps = {
  radius: [4, 4, 0, 0] as [number, number, number, number],
  maxBarSize: 48,
} as const;

/**
 * Hover highlight behind the cursor.
 *
 * Recharts defaults to a solid fill that obscures the bars underneath; this is the
 * faint tint the charts were each setting by hand.
 */
export const tooltipCursorProps = {
  fill: "var(--muted)",
  fillOpacity: 0.4,
} as const;
