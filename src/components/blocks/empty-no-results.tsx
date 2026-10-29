"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A search that found nothing.
 *
 * Distinct from having no data at all, and the distinction matters: this one echoes the term
 * that failed and offers to clear it, because the useful next action is "undo my filter", not
 * "create your first record". Showing a first-run empty state to someone who has mistyped a
 * search is the most common version of this mistake.
 */
export function EmptyNoResults() {
  const term = "quarterly forecast";

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-medium">No results for “{term}”</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Check the spelling, or widen the filters — there may be matches outside the current
          date range.
        </p>
      </div>
      <Button variant="outline" size="sm">
        Clear search
      </Button>
    </div>
  );
}
