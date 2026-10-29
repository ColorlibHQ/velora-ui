"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * A storage meter broken down by what is using the space.
 *
 * A single "68% used" bar prompts the question it does not answer: used by what. The segmented bar
 * and the legend beneath it are the answer, and they come from one array so the two can never
 * disagree.
 *
 * The segments are a flex row of percentage widths rather than a stack of absolutely positioned
 * offsets, which means no cumulative arithmetic and no rounding gap at the end. The free space is
 * the track showing through, not a fifth segment, so the widths always sum to the used total.
 *
 * Colours come from the chart tokens, so the bar and any pie chart of the same data agree.
 */
export function StorageQuota() {
  const total = 500;
  const segments = [
    { label: "Documents", gb: 182, tone: "bg-chart-1" },
    { label: "Images", gb: 96, tone: "bg-chart-2" },
    { label: "Video", gb: 54, tone: "bg-chart-3" },
    { label: "Backups", gb: 8, tone: "bg-chart-4" },
  ];

  const used = segments.reduce((sum, segment) => sum + segment.gb, 0);
  const pct = Math.round((used / total) * 100);

  return (
    <Card>
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Storage used</p>
            <p className="text-2xl font-bold tabular-nums">
              {used} GB{" "}
              <span className="text-sm font-normal text-muted-foreground">of {total} GB</span>
            </p>
          </div>
          <p className="text-sm font-semibold tabular-nums">{pct}%</p>
        </div>

        <div
          role="meter"
          aria-label="Storage used"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={used}
          aria-valuetext={`${used} of ${total} gigabytes used`}
          className="flex h-2.5 overflow-hidden rounded-full bg-muted"
        >
          {segments.map((segment) => (
            <div
              key={segment.label}
              className={segment.tone}
              style={{ width: `${(segment.gb / total) * 100}%` }}
            />
          ))}
        </div>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${segment.tone}`}
              />
              <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                {segment.label}
              </span>
              <span className="text-xs font-medium tabular-nums">{segment.gb}</span>
            </li>
          ))}
        </ul>

        <Button variant="outline" size="sm" className="w-full">
          Manage storage
        </Button>
      </CardContent>
    </Card>
  );
}
