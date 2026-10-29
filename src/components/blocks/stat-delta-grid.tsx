"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

/**
 * Metrics compared against a named prior period, including the flat case.
 *
 * Most trend indicators handle up and down and then render 0% with an upward arrow in a success
 * colour, which reads as growth. A third state for "no change" costs three lines and removes that
 * lie.
 *
 * The direction is never conveyed by colour alone: each cell carries an arrow glyph *and* an
 * `sr-only` word. A red number is invisible as a signal to anyone with a red-green deficiency, and
 * WCAG 1.4.1 is explicit that colour cannot be the only means of conveying information.
 */
export function StatDeltaGrid() {
  const metrics = [
    { label: "Sessions", value: "48,291", delta: 12.4 },
    { label: "Conversion", value: "3.28%", delta: -0.6 },
    { label: "Avg order", value: "$84.20", delta: 0 },
    { label: "Refund rate", value: "1.9%", delta: -0.4, invert: true },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const flat = metric.delta === 0;
        // `invert` marks metrics where a fall is the good outcome — refunds, churn, latency.
        const good = metric.invert ? metric.delta < 0 : metric.delta > 0;
        const Icon = flat ? Minus : metric.delta > 0 ? ArrowUp : ArrowDown;
        const word = flat ? "no change" : metric.delta > 0 ? "up" : "down";

        return (
          <Card key={metric.label}>
            <CardContent className="space-y-2 p-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold tabular-nums">{metric.value}</p>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  flat ? "text-muted-foreground" : good ? "text-success" : "text-destructive",
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="tabular-nums">{Math.abs(metric.delta)}%</span>
                <span className="sr-only">{word}</span>
                <span className="font-normal text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
