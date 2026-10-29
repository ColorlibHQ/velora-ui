"use client";

import { Badge } from "@/components/ui/badge";

/**
 * A release feed where the version is the heading.
 *
 * Each entry is a `<section>` with an `<h3>`, so the page gets a real heading outline and a screen
 * reader can jump between versions. A feed built from `<div>`s and bold text is one flat run of
 * prose with no way to skip a release.
 *
 * Change types are badges rather than coloured text, because "Breaking" needs to survive being
 * scanned quickly — and the badge variants already carry accessible contrast in both themes.
 *
 * Dates are `<time datetime>` with an ISO value, so the feed is machine-readable if it is ever
 * turned into an actual RSS or JSON feed.
 */
export function ReleaseNotesFeed() {
  const releases = [
    {
      version: "3.0.0",
      date: "2026-07-31",
      label: "31 July 2026",
      changes: [
        { kind: "Added" as const, text: "Twelve dashboard variants and six layout presets" },
        { kind: "Added" as const, text: "Column pinning, inline editing and saved views" },
        { kind: "Breaking" as const, text: "`perPage: 100` replaced with `perPage: \"all\"`" },
      ],
    },
    {
      version: "2.3.0",
      date: "2026-07-24",
      label: "24 July 2026",
      changes: [
        { kind: "Fixed" as const, text: "Dev server crashed on a Server Component barrel import" },
        { kind: "Added" as const, text: "Continuous integration across two Node versions" },
      ],
    },
  ];

  const variants = {
    Added: "success" as const,
    Fixed: "secondary" as const,
    Breaking: "destructive" as const,
  };

  return (
    <div className="space-y-6">
      {releases.map((release) => (
        <section key={release.version} className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-2 border-b pb-2">
            <h3 className="text-base font-semibold">v{release.version}</h3>
            <time dateTime={release.date} className="text-xs text-muted-foreground">
              {release.label}
            </time>
          </div>

          <ul className="space-y-2">
            {release.changes.map((change) => (
              <li key={change.text} className="flex flex-wrap items-baseline gap-2">
                <Badge variant={variants[change.kind]} className="text-[10px]">
                  {change.kind}
                </Badge>
                <span className="min-w-0 flex-1 text-sm text-muted-foreground">{change.text}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
