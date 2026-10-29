"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Boxes, CreditCard, Headset, RefreshCcw, Truck, Users } from "lucide-react";

/**
 * Six metrics as icon tiles, for a page that needs breadth over depth.
 *
 * The tone map is a `Record` of literal class strings. Tailwind's scanner reads source text, so
 * `bg-chart-${n}/10` would emit nothing and every tile would come out unstyled — the same
 * constraint the StatCard tone map documents.
 */
export function StatIconTiles() {
  const tiles = [
    { label: "Orders", value: "1,284", Icon: Boxes, tone: "bg-chart-1/10 text-chart-1" },
    { label: "Customers", value: "412", Icon: Users, tone: "bg-chart-2/10 text-chart-2" },
    { label: "Revenue", value: "$48.3k", Icon: CreditCard, tone: "bg-chart-3/10 text-chart-3" },
    { label: "Shipments", value: "968", Icon: Truck, tone: "bg-chart-4/10 text-chart-4" },
    { label: "Returns", value: "38", Icon: RefreshCcw, tone: "bg-chart-5/10 text-chart-5" },
    { label: "Tickets", value: "24", Icon: Headset, tone: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {tiles.map((tile) => (
        <Card key={tile.label}>
          <CardContent className="flex flex-col items-start gap-2 p-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-md ${tile.tone}`}
            >
              <tile.Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="space-y-0.5">
              <p className="text-lg font-bold tabular-nums leading-none">{tile.value}</p>
              <p className="text-xs text-muted-foreground">{tile.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
