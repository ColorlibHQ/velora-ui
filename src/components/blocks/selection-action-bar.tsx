"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Archive, Tag, Trash2, X } from "lucide-react";

/**
 * The bar that appears when rows are selected.
 *
 * Two details make this usable rather than decorative.
 *
 * It is a `role="status"` region, so the selection count is announced as it changes. A silent
 * bulk-action bar is invisible to a screen-reader user, who then has no way to know a destructive
 * action now applies to 12 records.
 *
 * The destructive action sits apart from the others with a separator. Putting "Delete" adjacent to
 * "Archive" in a bar that appears under the cursor is how people delete twelve rows by accident.
 */
export function SelectionActionBar() {
  const [count, setCount] = useState(12);

  if (count === 0) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
        Nothing selected. Select rows in a table to reveal the bar.
        <Button variant="link" size="sm" onClick={() => setCount(12)}>
          Select 12
        </Button>
      </div>
    );
  }

  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-3 shadow-sm"
    >
      <p className="text-sm font-medium tabular-nums">{count} selected</p>

      <div className="flex flex-wrap items-center gap-2 ms-auto">
        <Button variant="outline" size="sm">
          <Tag className="h-4 w-4" />
          Tag
        </Button>
        <Button variant="outline" size="sm">
          <Archive className="h-4 w-4" />
          Archive
        </Button>

        <span aria-hidden="true" className="h-5 w-px bg-border" />

        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
        <Button variant="ghost" size="sm" aria-label="Clear selection" onClick={() => setCount(0)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
