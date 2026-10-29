"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Printer } from "lucide-react";

/**
 * A record header that carries the four facts you would otherwise scroll for.
 *
 * The summary row is a `<dl>`, not a grid of divs. Label/value pairs are exactly what a definition
 * list is for, and it means a screen reader reads "Total, $1,248.00" as a pair instead of two
 * unrelated strings — for free, with no ARIA.
 *
 * Values are `tabular-nums` so the columns stay aligned when the numbers change width; without it
 * a live-updating total visibly jitters.
 */
export function DetailSummaryHeader() {
  const facts = [
    { label: "Total", value: "$1,248.00" },
    { label: "Placed", value: "12 Mar 2026" },
    { label: "Channel", value: "Online" },
    { label: "Items", value: "7" },
  ];

  return (
    <Card>
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-start gap-3">
          <div className="me-auto space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tabular-nums">ORD-7891</h2>
              <Badge variant="success">Paid</Badge>
              <Badge variant="outline">Fulfilled</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Ana Whitfield · ana@example.com</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" aria-label="More actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="space-y-1">
              <dt className="text-xs text-muted-foreground">{fact.label}</dt>
              <dd className="text-sm font-semibold tabular-nums">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
