"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, FileText, RotateCcw, X } from "lucide-react";

/**
 * An upload queue showing all four states at once: done, uploading, failed, queued.
 *
 * The failed row is the reason this block exists. Most upload lists show progress and success and
 * then silently drop failures, so a user believes six files uploaded when five did. Here a failure
 * keeps its row, states the reason, and offers a retry that does not require re-picking the file.
 *
 * Each bar is a `role="progressbar"` with `aria-valuetext` giving a percentage in words, and the
 * whole list is `aria-live="polite"` so completions are announced. A visual-only progress bar tells
 * a screen-reader user nothing about whether it is safe to navigate away.
 */
export function UploadProgressList() {
  const files = [
    { name: "q3-forecast.xlsx", size: "248 KB", state: "done" as const, pct: 100 },
    { name: "brand-guidelines.pdf", size: "4.1 MB", state: "uploading" as const, pct: 62 },
    {
      name: "warehouse-audit.mov",
      size: "184 MB",
      state: "failed" as const,
      pct: 0,
      error: "Exceeds the 100 MB limit",
    },
    { name: "supplier-list.csv", size: "38 KB", state: "queued" as const, pct: 0 },
  ];

  return (
    <div aria-live="polite" className="space-y-2 rounded-lg border p-3">
      {files.map((file) => (
        <div key={file.name} className="flex items-center gap-3 rounded-md p-2">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
              file.state === "done" && "bg-success/10 text-success",
              file.state === "failed" && "bg-destructive/10 text-destructive",
              (file.state === "uploading" || file.state === "queued") &&
                "bg-muted text-muted-foreground",
            )}
          >
            {file.state === "done" ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : file.state === "failed" ? (
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
            ) : (
              <FileText className="h-4 w-4" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              {/* min-w-0 above plus truncate here: without the parent's min-w-0 a long
                  filename stretches the flex row instead of ellipsing. */}
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="shrink-0 text-xs tabular-nums text-muted-foreground">{file.size}</p>
            </div>

            {file.state === "failed" ? (
              <p className="text-xs text-destructive">{file.error}</p>
            ) : file.state === "queued" ? (
              <p className="text-xs text-muted-foreground">Waiting…</p>
            ) : (
              <div
                role="progressbar"
                aria-label={`Uploading ${file.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={file.pct}
                aria-valuetext={`${file.pct}% uploaded`}
                className="h-1 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className={cn(
                    "h-full rounded-full",
                    file.state === "done" ? "bg-success" : "bg-primary",
                  )}
                  style={{ width: `${file.pct}%` }}
                />
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            aria-label={file.state === "failed" ? `Retry ${file.name}` : `Remove ${file.name}`}
          >
            {file.state === "failed" ? (
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            ) : (
              <X className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
