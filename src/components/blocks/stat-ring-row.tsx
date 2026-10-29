"use client";

import { Card, CardContent } from "@/components/ui/card";

/**
 * Four completion rings in a row, each an SVG circle with `pathLength={100}`.
 *
 * `pathLength` makes the dash values literal percentages, so the radius drops out of the
 * arithmetic — resizing the ring cannot silently break the fill. `-rotate-90` is applied in both
 * directions on purpose: a ring fills clockwise from twelve o'clock whatever the writing mode, so
 * mirroring it under RTL would run the fill backwards.
 */
export function StatRingRow() {
  const rings = [
    { label: "Profile", pct: 100, tone: "stroke-success" },
    { label: "Billing", pct: 75, tone: "stroke-chart-1" },
    { label: "Team", pct: 50, tone: "stroke-chart-3" },
    { label: "Integrations", pct: 20, tone: "stroke-chart-4" },
  ];

  return (
    <Card>
      <CardContent className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
        {rings.map((ring) => (
          <div key={ring.label} className="flex flex-col items-center gap-2">
            <div className="relative h-20 w-20">
              <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" strokeWidth="3.5" className="stroke-muted" />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={`${ring.pct} 100`}
                  className={ring.tone}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">
                {ring.pct}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{ring.label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
