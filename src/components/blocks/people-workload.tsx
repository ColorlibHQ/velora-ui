"use client";

import { cn } from "@/lib/utils";

const TEAM = [
  { name: "Ada Lovelace", initials: "AL", role: "Engineering", assigned: 21, capacity: 24 },
  { name: "Grace Hopper", initials: "GH", role: "Engineering", assigned: 28, capacity: 24 },
  { name: "Alan Turing", initials: "AT", role: "Research", assigned: 18, capacity: 24 },
  { name: "Katherine Johnson", initials: "KJ", role: "Analysis", assigned: 12, capacity: 20 },
];

/**
 * Who is over-committed.
 *
 * The bar is scaled to the largest capacity in the team, not to each person's own — otherwise
 * someone at 12/20 and someone at 21/24 would draw nearly identical bars, and the comparison the
 * list exists for becomes impossible. Over-capacity is called out in words as well as colour,
 * because "over by 4" is the actionable part.
 */
export function PeopleWorkload() {
  const scale = Math.max(...TEAM.map((person) => person.capacity));

  return (
    <ul className="space-y-3">
      {TEAM.map((person) => {
        const over = person.assigned > person.capacity;
        return (
          <li key={person.name} className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
              {person.initials}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-medium">{person.name}</p>
                <p
                  className={cn(
                    "shrink-0 text-xs tabular-nums",
                    over ? "font-semibold text-destructive" : "text-muted-foreground",
                  )}
                >
                  {person.assigned}/{person.capacity}
                  {over && ` · over by ${person.assigned - person.capacity}`}
                </p>
              </div>

              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", over ? "bg-destructive" : "bg-primary")}
                  style={{ width: `${Math.min(100, (person.assigned / scale) * 100)}%` }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
