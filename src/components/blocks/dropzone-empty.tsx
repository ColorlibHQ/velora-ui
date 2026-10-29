"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

/**
 * A drop target that is also a real file input.
 *
 * The pattern most dropzones get wrong is being drop-only, which excludes anyone using a keyboard
 * and anyone on a touch device with no drag gesture. Here the whole zone is a `<label>` wrapping a
 * visually-hidden `<input type="file">`, so clicking, tapping and Enter all open the picker, and the
 * label text becomes the input's accessible name with no ARIA.
 *
 * `dragLeave` needs the guard: dragging over a *child* element fires `dragleave` on the parent, so
 * without checking `currentTarget.contains(relatedTarget)` the highlight flickers off as the pointer
 * crosses the icon.
 *
 * `sr-only` rather than `display: none` on the input — a hidden input cannot be focused, so the
 * keyboard path would silently break.
 */
export function DropzoneEmpty() {
  const [over, setOver] = useState(false);

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={(event) => {
        // Ignore leave events caused by moving onto a descendant.
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        setOver(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setOver(false);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors",
        over ? "border-primary bg-primary/5" : "hover:border-primary/40 hover:bg-accent/30",
      )}
    >
      <input type="file" multiple className="sr-only" />

      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
          over ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        <UploadCloud className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="space-y-1">
        <span className="block text-sm font-medium">
          Drop files here, or choose from your computer
        </span>
        <span className="block text-xs text-muted-foreground">
          PDF, PNG, JPG, XLSX or CSV · up to 100 MB each
        </span>
      </span>

      <Button variant="outline" size="sm" asChild>
        <span>Browse files</span>
      </Button>
    </label>
  );
}
