"use client";

import { Badge } from "@/components/ui/badge";
import { FileArchive, FileImage, FileSpreadsheet, FileText, Film } from "lucide-react";

/**
 * A file grid keyed on type, with no thumbnails to load.
 *
 * Icon-and-extension tiles are the honest choice for a mixed file list: a real thumbnail grid needs
 * a generated preview per file, and falling back to a generic icon for the ones that have none
 * produces a grid that looks half-broken. This is consistent at every size and costs no requests.
 *
 * The type map is a `Record` of literal Tailwind classes, not interpolation. Tailwind's scanner
 * reads source text, so `bg-chart-${n}/10` would never be emitted and every tile would come out
 * unstyled — the same constraint the StatCard tone map documents.
 */
export function AttachmentGrid() {
  const types = {
    doc: { Icon: FileText, tone: "bg-chart-1/10 text-chart-1" },
    sheet: { Icon: FileSpreadsheet, tone: "bg-chart-2/10 text-chart-2" },
    image: { Icon: FileImage, tone: "bg-chart-3/10 text-chart-3" },
    video: { Icon: Film, tone: "bg-chart-4/10 text-chart-4" },
    archive: { Icon: FileArchive, tone: "bg-chart-5/10 text-chart-5" },
  } as const;

  const files = [
    { name: "Contract-2026.pdf", size: "1.2 MB", type: "doc" as const },
    { name: "Q3-model.xlsx", size: "486 KB", type: "sheet" as const },
    { name: "hero-shot.png", size: "3.4 MB", type: "image" as const },
    { name: "walkthrough.mp4", size: "88 MB", type: "video" as const },
    { name: "assets.zip", size: "24 MB", type: "archive" as const },
    { name: "Minutes.docx", size: "62 KB", type: "doc" as const },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {files.map((file) => {
        const { Icon, tone } = types[file.type];
        return (
          <li key={file.name}>
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-lg border p-3 text-start transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${tone}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{file.name}</span>
                <span className="block text-xs tabular-nums text-muted-foreground">
                  {file.size}
                </span>
              </span>
            </button>
          </li>
        );
      })}
      <li className="flex items-center justify-center rounded-lg border border-dashed p-3">
        <Badge variant="secondary">+ 12 more</Badge>
      </li>
    </ul>
  );
}
