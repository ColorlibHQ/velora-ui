"use client";

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkline } from "./sparkline";
import { CHART_TONES, type ChartTone } from "./tones";

/**
 * A metric card: title, value, trend, tinted icon, optional sparkline.
 *
 * There were four copies of this, around a hundred lines each, differing only in their
 * data. Same markup, same hover transitions, same stagger, same trend logic — and each
 * copy carried its own `{ color, bg, stroke }` triple per stat and its own hand-written
 * gradient id.
 *
 * Two details that look cosmetic and are not:
 *
 * `invertTrend` exists because "up is good" is wrong for about a third of real metrics —
 * churn, burn rate, cost per lead, average transit time. The copies each re-derived this
 * with a local `isGood` variable, so a page could easily colour rising churn green.
 *
 * The sparkline sits outside `CardContent`, as a sibling. That is deliberate: the
 * density rules key off `[data-slot="card-content"]`, so a chart nested inside it would
 * gain padding that changes with the density setting and misalign against the cards
 * either side of it.
 */
export interface StatCardProps {
  title: string;
  /** Pre-formatted — the caller knows whether this is money, a count or a percentage. */
  value: React.ReactNode;
  /** Percentage change. Sign drives the arrow direction. */
  change?: number;
  /**
   * Treat a fall as good — churn, burn rate, cost per acquisition.
   *
   * Without this a rising bad metric renders green, which is worse than showing no
   * colour at all: it reads as reassurance.
   */
  invertTrend?: boolean;
  icon?: LucideIcon;
  tone?: ChartTone;
  /** Bare values; the card wraps them for Recharts. */
  sparkline?: readonly number[];
  /**
   * Position in a grid, used only to stagger the entrance animation.
   *
   * Optional because the stagger is decoration — a card rendered on its own should not
   * need to know where it would have been.
   */
  index?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  invertTrend = false,
  icon: Icon,
  tone = 1,
  sparkline,
  index = 0,
  className,
}: StatCardProps) {
  const styles = CHART_TONES[tone];
  const rose = (change ?? 0) > 0;
  const good = invertTrend ? !rose : rose;
  const TrendIcon = rose ? TrendingUp : TrendingDown;
  const trendClass = good ? "text-success" : "text-destructive";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-md",
        className,
      )}
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "slide-in-up 0.4s ease-out backwards",
      }}
    >
      <CardContent className={cn("p-5", sparkline && "pb-0")}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>

            {change !== undefined && (
              <div className="flex items-center gap-1.5">
                <TrendIcon aria-hidden="true" className={cn("h-3.5 w-3.5", trendClass)} />
                <span className={cn("text-xs font-semibold", trendClass)}>
                  {rose ? "+" : ""}
                  {change}%
                </span>
              </div>
            )}
          </div>

          {Icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                styles.bg,
              )}
            >
              <Icon aria-hidden="true" className={cn("h-5 w-5", styles.text)} />
            </div>
          )}
        </div>
      </CardContent>

      {/* Sibling, not nested — see the note above about the density rule. */}
      {sparkline && <Sparkline values={sparkline} tone={tone} />}
    </Card>
  );
}

/**
 * The four-across grid the stat cards always sit in.
 *
 * Same breakpoints in every copy. Here so a page states what it is showing rather than
 * restating the layout.
 */
export function StatCardGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {children}
    </div>
  );
}
