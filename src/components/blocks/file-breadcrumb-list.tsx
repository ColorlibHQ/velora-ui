"use client";

import { useState } from "react";
import { ChevronRight, Folder, FileText, ArrowUp } from "lucide-react";

/**
 * A file browser row list with a path that is navigable, not decorative.
 *
 * The breadcrumb is a `<nav>` containing an `<ol>`, which is what gives "3 of 4" and lets a screen
 * reader understand the depth. The current folder is the last item and is *not* a link —
 * `aria-current="page"` marks it instead, so there is no control that navigates to where you
 * already are.
 *
 * The separator chevrons use `rtl:rotate-180`, since a path reads right-to-left in RTL and an
 * unmirrored chevron would point back toward the root.
 *
 * Folders sort before files regardless of name. That is what every file manager does, and doing it
 * with a single comparator on a boolean is clearer than maintaining two arrays.
 */
export function FileBreadcrumbList() {
  const [path] = useState(["Home", "Projects", "Apex", "Design"]);

  const entries = [
    { name: "Wireframes", folder: true, meta: "12 items" },
    { name: "Exports", folder: true, meta: "4 items" },
    { name: "brand-guidelines.pdf", folder: false, meta: "4.1 MB" },
    { name: "logo-mark.svg", folder: false, meta: "18 KB" },
    { name: "colour-tokens.json", folder: false, meta: "6 KB" },
  ].sort((a, b) => Number(b.folder) - Number(a.folder) || a.name.localeCompare(b.name));

  return (
    <div className="space-y-3">
      <nav aria-label="Folder path">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {path.map((segment, index) => {
            const last = index === path.length - 1;
            return (
              <li key={segment} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="font-medium">
                    {segment}
                  </span>
                ) : (
                  <>
                    <a href="#" className="text-muted-foreground hover:text-foreground hover:underline">
                      {segment}
                    </a>
                    <ChevronRight
                      className="h-3.5 w-3.5 text-muted-foreground rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <ul className="divide-y rounded-lg border">
        <li>
          <button
            type="button"
            className="flex w-full items-center gap-3 p-3 text-start transition-colors hover:bg-accent/40"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-sm text-muted-foreground">Up one level</span>
          </button>
        </li>

        {entries.map((entry) => (
          <li key={entry.name}>
            <button
              type="button"
              className="flex w-full items-center gap-3 p-3 text-start transition-colors hover:bg-accent/40"
            >
              <span
                className={
                  entry.folder
                    ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-chart-1/10 text-chart-1"
                    : "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
                }
              >
                {entry.folder ? (
                  <Folder className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <FileText className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{entry.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {entry.meta}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
