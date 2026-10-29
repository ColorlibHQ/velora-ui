"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * A titled card with a fixed-height chart area and optional header controls.
 *
 * Encodes the shape every chart card in the fleet already had, including one thing worth
 * making structural: none of them used `CardDescription`. They put a subtitle in a
 * `<p className="text-xs text-muted-foreground">` under the title instead, because
 * `CardDescription`'s spacing is tuned for forms and looked wrong here. Four copies made
 * that same decision independently; this makes it the interface, so the fifth does not
 * have to rediscover it.
 *
 * The chart area gets an explicit height because `ResponsiveContainer` measures its
 * parent — given a parent with no height it measures zero and renders nothing, which is
 * the single most common way one of these ends up blank.
 */
export interface ChartCardProps {
  title: React.ReactNode;
  /** Rendered under the title, in the muted style the fleet settled on. */
  subtitle?: React.ReactNode;
  /** Header-right slot: a SegmentedControl, a date range, a link. */
  action?: React.ReactNode;
  /**
   * Height of the chart area in pixels.
   *
   * Required rather than defaulted. ResponsiveContainer measures its parent, so a missing
   * height means an invisible chart — and a default here would just move the guess
   * somewhere less visible.
   */
  height: number;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  subtitle,
  action,
  height,
  children,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader
        className={cn(
          "pb-2",
          // Only becomes a row when there is something to put on the right, so a
          // title-only header keeps its normal block layout.
          action && "flex flex-row items-center justify-between gap-4",
        )}
      >
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </CardHeader>

      <CardContent className={contentClassName}>
        <div style={{ height }}>{children}</div>
      </CardContent>
    </Card>
  );
}
