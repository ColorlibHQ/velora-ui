/**
 * Chart primitives.
 *
 * A barrel for convenience, but note that every module here is also importable directly —
 * `@/components/charts/formatters` — and the non-React ones
 * (`formatters`, `chart-theme`, `tones`) carry no "use client", so a server component can
 * read them without pulling Recharts into its graph.
 */
export { ChartTooltip, type ChartTooltipProps } from "./chart-tooltip";
export {
  bySeries,
  compact,
  compactCurrency,
  count,
  currency,
  percent,
  withSuffix,
  type SeriesPoint,
  type ValueFormatter,
} from "./formatters";
export {
  areaSeriesProps,
  barSeriesProps,
  gridProps,
  lineSeriesProps,
  tooltipCursorProps,
  verticalGridProps,
  xAxisProps,
  yAxisProps,
} from "./chart-theme";
export { CHART_TONES, CHART_TONE_VALUES, toneForIndex, type ChartTone } from "./tones";
export { useChartId, useChartIds } from "./use-chart-id";
export { Sparkline, type SparklineProps } from "./sparkline";
export { StatCard, StatCardGrid, type StatCardProps } from "./stat-card";
export { ChartCard, type ChartCardProps } from "./chart-card";
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedOption,
} from "./segmented-control";
