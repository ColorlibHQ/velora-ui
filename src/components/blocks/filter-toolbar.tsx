"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

/**
 * A filter bar whose active filters are visible and individually removable.
 *
 * The pattern this replaces is a "Filters (3)" button that hides which three. Users then cannot
 * tell why a table looks empty, and the only way out is a reset that throws away the filters they
 * did want.
 *
 * Each chip is a `<button>` with its own accessible name — "Remove filter: Status is Paid" — so a
 * screen-reader user can clear one filter without discovering the set by trial and error. The × is
 * `aria-hidden`; the name carries the meaning.
 */
export function FilterToolbar() {
  const [filters, setFilters] = useState([
    { id: "status", label: "Status", value: "Paid" },
    { id: "channel", label: "Channel", value: "Online" },
    { id: "range", label: "Date", value: "Last 30 days" },
  ]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
          <Input placeholder="Search orders…" className="ps-9" />
        </div>
        <Button variant="outline" size="sm">
          Status
        </Button>
        <Button variant="outline" size="sm">
          Channel
        </Button>
        <Button variant="outline" size="sm">
          Date range
        </Button>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Active:</span>
          {filters.map((filter) => (
            <Badge key={filter.id} variant="secondary" className="gap-1 ps-2 pe-1">
              <span className="text-xs">
                {filter.label} is {filter.value}
              </span>
              <button
                type="button"
                onClick={() => setFilters((prev) => prev.filter((f) => f.id !== filter.id))}
                aria-label={`Remove filter: ${filter.label} is ${filter.value}`}
                className="rounded-full p-0.5 transition-colors hover:bg-background/60"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => setFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
