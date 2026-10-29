"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Plus, SlidersHorizontal } from "lucide-react";

/**
 * The header every index page needs: title, context, actions.
 *
 * The actions wrap onto their own line below the title on small screens rather than shrinking,
 * because a truncated "Create order" button is worse than a stacked one. `flex-wrap` plus
 * `justify-between` does that with no breakpoint: the row splits when it no longer fits.
 *
 * `me-auto` on the title group rather than `justify-between` on the parent — that keeps the
 * buttons together as a unit when they wrap, instead of pushing them to opposite edges.
 */
export function PageHeaderActions() {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="me-auto space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <Badge variant="secondary" className="tabular-nums">
            1,284
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Every order placed across all channels, updated live.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New order
        </Button>
      </div>
    </div>
  );
}
