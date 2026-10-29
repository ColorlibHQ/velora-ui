"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * A version history where the current version is not offered a "restore".
 *
 * Offering restore on the version you are already looking at is a no-op dressed as an action, and
 * users click it to find out what it does. The current row gets a badge instead.
 *
 * Sizes carry a signed delta against the previous version, which is what makes a history scannable:
 * a sudden −40% is how you spot the revision where someone deleted half the document.
 */
export function DocumentVersions() {
  const versions = [
    { v: 7, when: "2 hours ago", who: "Ana Whitfield", initials: "AW", size: "4.1 MB", delta: "+180 KB", current: true },
    { v: 6, when: "Yesterday", who: "Marcus Oyelaran", initials: "MO", size: "3.9 MB", delta: "−2.4 MB", current: false },
    { v: 5, when: "3 days ago", who: "Ana Whitfield", initials: "AW", size: "6.3 MB", delta: "+420 KB", current: false },
    { v: 4, when: "Last week", who: "Priya Raman", initials: "PR", size: "5.9 MB", delta: "+1.1 MB", current: false },
  ];

  return (
    <ul className="divide-y rounded-lg border">
      {versions.map((version) => (
        <li key={version.v} className="flex flex-wrap items-center gap-3 p-3">
          <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">
            v{version.v}
          </span>

          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="text-[10px]">{version.initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">{version.who}</p>
            <p className="text-xs text-muted-foreground">{version.when}</p>
          </div>

          <div className="shrink-0 text-end">
            <p className="text-xs tabular-nums">{version.size}</p>
            <p
              className={
                version.delta.startsWith("−")
                  ? "text-[11px] tabular-nums text-destructive"
                  : "text-[11px] tabular-nums text-muted-foreground"
              }
            >
              {version.delta}
            </p>
          </div>

          {/* No restore on the version you are already viewing. */}
          {version.current ? (
            <Badge variant="success" className="shrink-0 text-[10px]">
              Current
            </Badge>
          ) : (
            <Button variant="outline" size="sm" className="shrink-0">
              Restore
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
