"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Capacity per person, where over-allocation is the state worth designing for.
 *
 * A workload bar that stops at 100% cannot show the only problem it exists to reveal. Here the
 * track holds a 100% marker and the fill is allowed to run past it, so someone at 130% is visibly
 * different from someone at exactly capacity.
 *
 * Widths are scaled against the highest allocation rather than against 100, so the over-allocated
 * bar fits its track and the others stay proportional to it. Scaling against 100 and letting the
 * overflow clip would make 130% and 180% look identical.
 *
 * The marker is `aria-hidden` and each row carries `aria-valuetext` with the real percentage, so
 * the capacity line is a visual aid and the number is what gets announced.
 */
export function TeamWorkload() {
  const team = [
    { name: "Ana Whitfield", initials: "AW", pct: 130, tasks: 13 },
    { name: "Marcus Oyelaran", initials: "MO", pct: 96, tasks: 9 },
    { name: "Priya Raman", initials: "PR", pct: 72, tasks: 7 },
    { name: "Tomas Berg", initials: "TB", pct: 38, tasks: 4 },
  ];

  // Scale against the busiest person, never against 100 — otherwise every over-allocation
  // clips to the same full bar and the degree of the problem is lost.
  const scale = Math.max(100, ...team.map((member) => member.pct));

  return (
    <ul className="divide-y rounded-lg border">
      {team.map((member) => {
        const over = member.pct > 100;
        return (
          <li key={member.name} className="flex items-center gap-3 p-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="text-[11px]">{member.initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="min-w-0 flex-1 truncate text-sm font-medium">{member.name}</p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  {member.tasks} tasks
                </p>
                {over && (
                  <Badge variant="warning" className="text-[10px]">
                    Over capacity
                  </Badge>
                )}
              </div>

              <div
                role="progressbar"
                aria-label={`Allocation for ${member.name}`}
                aria-valuemin={0}
                aria-valuemax={scale}
                aria-valuenow={member.pct}
                aria-valuetext={`${member.pct}% allocated`}
                className="relative h-2 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className={cn("h-full rounded-full", over ? "bg-warning" : "bg-primary")}
                  style={{ width: `${(member.pct / scale) * 100}%` }}
                />
                {/* The 100% capacity line, positioned logically so it mirrors under RTL. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 w-px bg-foreground/40"
                  style={{ insetInlineStart: `${(100 / scale) * 100}%` }}
                />
              </div>
            </div>

            <span className="w-12 shrink-0 text-end text-sm font-semibold tabular-nums">
              {member.pct}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}
