"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Search, active filters, and a way out.
 *
 * The Clear button appears only when something is filtered. A permanently visible Reset invites
 * the reader to wonder what state they are in — its absence is itself the signal that nothing is
 * applied.
 *
 * Each active filter is removable individually, which is the difference between a filter bar and
 * a filter *display*: narrowing by four things and then wanting to undo one of them is the normal
 * case, and an all-or-nothing Clear forces re-applying the other three.
 */
export function FormFilterBar() {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(["Status: Active", "Region: EMEA"]);
  const isFiltered = query.length > 0 || active.length > 0;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customers…"
            aria-label="Search customers"
            className="ps-9"
          />
        </div>

        <Button variant="outline" size="sm" className="gap-1.5">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setActive([]);
            }}
          >
            Clear
            <X className="ms-1 size-3.5" />
          </Button>
        )}
      </div>

      {active.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {active.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1 ps-2 text-[11px] font-normal">
              {filter}
              <button
                type="button"
                onClick={() => setActive(active.filter((entry) => entry !== filter))}
                aria-label={`Remove filter ${filter}`}
                className="rounded p-0.5 hover:bg-background/60"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
