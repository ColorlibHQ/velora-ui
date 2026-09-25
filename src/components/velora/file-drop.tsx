"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface FileDropProps {
  onFiles?: (files: File[]) => void;
  /** Passed straight to the underlying input */
  accept?: string;
  multiple?: boolean;
  className?: string;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

/**
 * Drag-and-drop upload zone that lifts and glows while a file is over it.
 * The zone is a `label` wrapping a real file input, so clicking, keyboard and
 * screen readers all work.
 */
export function FileDrop({
  onFiles,
  accept,
  multiple = true,
  className,
}: FileDropProps) {
  const [over, setOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const accept_ = (list: FileList | null) => {
    if (!list?.length) return;
    const next = Array.from(list);
    setFiles(next);
    onFiles?.(next);
  };

  return (
    <div className={cn("w-full", className)} data-slot="file-drop">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          accept_(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 motion-reduce:transition-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring",
          over
            ? "-translate-y-0.5 border-brand bg-brand/5 shadow-lg shadow-brand/10"
            : "border-border hover:border-muted-foreground/50 hover:bg-muted/40"
        )}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={cn(
            "transition-colors",
            over ? "text-brand" : "text-muted-foreground"
          )}
        >
          <path d="M12 15V3M8 7l4-4 4 4" />
          <path d="M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4" />
        </svg>
        {/* Spans, not paragraphs: a label only allows phrasing content. */}
        <span className="block text-sm font-medium">
          {over ? "Drop to upload" : "Drag files here, or click to browse"}
        </span>
        <span className="block text-xs text-muted-foreground">
          {accept ? accept.replace(/,/g, ", ") : "Any file type"}
        </span>

        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => accept_(event.target.files)}
          className="sr-only"
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {files.map((file) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2 text-sm"
            >
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {formatSize(file.size)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
