"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "@/components/charts";
import { cn } from "@/lib/utils";

/**
 * Eight trends at a glance, one sparkline each.
 *
 * `Sparkline` calls `useChartId()` internally, which is what makes this density safe: an SVG
 * `url(#id)` resolves to the first match in the *document*, so eight tiles sharing a hardcoded
 * gradient id would all render in the first tile's colour. `useId()` behind the primitive means the
 * caller cannot get that wrong.
 *
 * It also sets `accessibilityLayer={false}`. Recharts 3 adds `tabindex="0"` to every chart by
 * default, so eight of these would put eight stops in the tab order for graphics carrying nothing a
 * keyboard user can act on — the value and delta beside each one are the accessible content.
 *
 * `invert` marks series where a fall is good, so latency dropping reads green while sessions
 * dropping reads red. Colour follows meaning, not direction.
 */
export function ChartSparklineGrid() {
  const series = [
    { label: "Revenue", value: "$48.3k", delta: 12.4, tone: 1 as const, data: [31, 34, 33, 38, 42, 44, 48] },
    { label: "Orders", value: "1,284", delta: 6.1, tone: 1 as const, data: [980, 1020, 1110, 1090, 1180, 1240, 1284] },
    { label: "Sessions", value: "92.4k", delta: -2.8, tone: 5 as const, data: [98, 97, 95, 96, 94, 93, 92] },
    { label: "Conversion", value: "3.28%", delta: 0.4, tone: 2 as const, data: [2.9, 3.0, 3.1, 3.0, 3.2, 3.2, 3.3] },
    { label: "p95 latency", value: "412ms", delta: -18.2, invert: true, tone: 2 as const, data: [720, 690, 640, 580, 500, 450, 412] },
    { label: "Error rate", value: "0.14%", delta: -0.06, invert: true, tone: 2 as const, data: [0.3, 0.28, 0.24, 0.2, 0.18, 0.16, 0.14] },
    { label: "Churn", value: "2.1%", delta: 0.1, invert: true, tone: 5 as const, data: [1.8, 1.9, 1.9, 2.0, 2.0, 2.0, 2.1] },
    { label: "NPS", value: "48", delta: 4, tone: 3 as const, data: [38, 40, 41, 43, 44, 46, 48] },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {series.map((item) => {
        const good = item.invert ? item.delta < 0 : item.delta > 0;
        return (
          <Card key={item.label}>
            <CardContent className="space-y-2 p-3">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-base font-bold tabular-nums">{item.value}</p>
                <p
                  className={cn(
                    "text-[11px] font-semibold tabular-nums",
                    good ? "text-success" : "text-destructive",
                  )}
                >
                  {item.delta > 0 ? "+" : ""}
                  {item.delta}
                </p>
              </div>
              <Sparkline values={item.data} tone={item.tone} height={28} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
