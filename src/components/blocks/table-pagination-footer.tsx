"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * A pager that states the range, not just the page number.
 *
 * "Page 3 of 52" tells a user nothing about where they are in 1,284 records. "1,001–1,050 of 1,284"
 * does, and it is the same information the server already has.
 *
 * The range is derived from page and size rather than stored, so it cannot disagree with the
 * controls. The last page is clamped with `Math.min`, which is what stops the final page reading
 * "1,251–1,300 of 1,284".
 *
 * Every chevron uses `rtl:rotate-180`: under RTL "next" is to the left, and an arrow that keeps
 * pointing right in a mirrored layout points backwards. The first/last double chevrons need it too —
 * that pair is the one usually missed.
 */
export function TablePaginationFooter() {
  const total = 1284;
  const [size, setSize] = useState(50);
  const [page, setPage] = useState(21);

  const pages = Math.ceil(total / size);
  const from = (page - 1) * size + 1;
  const to = Math.min(page * size, total);

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border p-3">
      <p className="text-sm tabular-nums text-muted-foreground">
        {from.toLocaleString("en-US")}&ndash;{to.toLocaleString("en-US")} of{" "}
        {total.toLocaleString("en-US")}
      </p>

      <div className="flex items-center gap-2 ms-auto">
        <label htmlFor="rows-per-page" className="text-xs text-muted-foreground">
          Rows
        </label>
        <Select
          value={String(size)}
          onValueChange={(value) => {
            setSize(Number(value));
            // Reset to page 1: page 21 of a 50-row pager does not exist at 200 rows a page.
            setPage(1);
          }}
        >
          <SelectTrigger id="rows-per-page" className="h-8 w-[72px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[25, 50, 100, 200].map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            aria-label="First page"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            <ChevronsLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Button>

          <span className="px-2 text-xs tabular-nums text-muted-foreground">
            {page} / {pages}
          </span>

          <Button
            variant="outline"
            size="sm"
            aria-label="Next page"
            disabled={page === pages}
            onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Last page"
            disabled={page === pages}
            onClick={() => setPage(pages)}
          >
            <ChevronsRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
