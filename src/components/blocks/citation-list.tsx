"use client";

import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

/**
 * An answer whose claims are traceable to their sources.
 *
 * The numeric markers are `<sup>` inside real anchors pointing at the list below, so clicking a
 * citation moves to its source and the browser's back button returns. A `<span>` with an onClick
 * loses both, and loses the marker's meaning to a screen reader.
 *
 * Each marker's accessible name is written out — "Jump to source 1: Q3 revenue report" — because
 * "1" read aloud in the middle of a sentence is noise. The visible text stays a bare numeral.
 *
 * `scroll-mt-4` on the list items keeps a jumped-to source clear of a sticky header, which is the
 * usual reason in-page anchors appear to land in the wrong place.
 */
export function CitationList() {
  const sources = [
    { n: 1, title: "Q3 revenue report", detail: "invoices · 96 records", href: "#" },
    { n: 2, title: "Churn cohort analysis", detail: "customers · 412 records", href: "#" },
    { n: 3, title: "Support ticket volume", detail: "tickets · 1,284 records", href: "#" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed">
        Revenue rose 12.4% quarter over quarter, driven mostly by expansion in existing accounts
        <a
          href="#src-1"
          aria-label="Jump to source 1: Q3 revenue report"
          className="text-primary hover:underline"
        >
          <sup className="ms-0.5 text-[10px] font-semibold">1</sup>
        </a>
        . Churn was flat at 2.1%, though the enterprise cohort improved
        <a
          href="#src-2"
          aria-label="Jump to source 2: Churn cohort analysis"
          className="text-primary hover:underline"
        >
          <sup className="ms-0.5 text-[10px] font-semibold">2</sup>
        </a>
        , and support volume per account fell for the third quarter running
        <a
          href="#src-3"
          aria-label="Jump to source 3: Support ticket volume"
          className="text-primary hover:underline"
        >
          <sup className="ms-0.5 text-[10px] font-semibold">3</sup>
        </a>
        .
      </p>

      <div className="space-y-2 border-t pt-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Sources
        </p>
        <ul className="space-y-1.5">
          {sources.map((source) => (
            <li key={source.n} id={`src-${source.n}`} className="scroll-mt-4">
              <a
                href={source.href}
                className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent/50"
              >
                <Badge variant="secondary" className="h-5 w-5 justify-center p-0 text-[10px]">
                  {source.n}
                </Badge>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{source.title}</span>
                  <span className="block text-xs text-muted-foreground">{source.detail}</span>
                </span>
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
