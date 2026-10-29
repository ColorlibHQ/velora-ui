"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartCard, ChartTooltip, count } from "@/components/charts";

const DATA = [
  { axis: "Delivery", team: 82, benchmark: 70 },
  { axis: "Quality", team: 91, benchmark: 74 },
  { axis: "Velocity", team: 64, benchmark: 72 },
  { axis: "Collaboration", team: 88, benchmark: 68 },
  { axis: "Documentation", team: 47, benchmark: 65 },
  { axis: "On-call", team: 76, benchmark: 71 },
];

/**
 * A radar with a benchmark ring behind the measured series.
 *
 * A lone radar shape says nothing — the whole value is the comparison, so the benchmark is drawn
 * first and unfilled, letting the team's shape read as inside or outside it per axis. Documentation
 * dipping under the benchmark is the point of the chart.
 *
 * The radius axis is fixed to `[0, 100]` rather than auto-scaled. Auto-scaling a radar means the
 * shape changes when the data changes even if nothing crossed the benchmark, which makes two
 * screenshots incomparable.
 */
export function ChartRadarProfile() {
  return (
    <ChartCard title="Team scorecard" subtitle="Against the org benchmark" height={280}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={DATA} outerRadius="72%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
          {/* Fixed domain, so the shape is comparable between renders. */}
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip content={<ChartTooltip format={count} />} />
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            fill="none"
          />
          <Radar
            name="This team"
            dataKey="team"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
