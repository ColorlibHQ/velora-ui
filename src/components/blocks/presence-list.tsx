"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * Presence indicators that do not rely on colour alone.
 *
 * A green or amber dot is the standard pattern and it fails WCAG 1.4.1 — the state is conveyed only
 * by hue. Each row carries the status as text too, and the dot is `aria-hidden`, so nothing depends
 * on distinguishing green from amber.
 *
 * Offline uses a hollow ring rather than a grey fill, so the three states differ in *shape* as well
 * as colour and remain distinguishable in a greyscale screenshot.
 */
export function PresenceList() {
  const people = [
    { name: "Ana Whitfield", initials: "AW", state: "online" as const, detail: "In a call" },
    { name: "Marcus Oyelaran", initials: "MO", state: "online" as const, detail: "Reviewing PR #482" },
    { name: "Priya Raman", initials: "PR", state: "away" as const, detail: "Back in 20 minutes" },
    { name: "Tomas Berg", initials: "TB", state: "offline" as const, detail: "Last seen 4h ago" },
  ];

  const states = {
    online: { label: "Online", dot: "bg-success", tone: "text-success" },
    away: { label: "Away", dot: "bg-warning", tone: "text-warning" },
    offline: { label: "Offline", dot: "border-2 border-muted-foreground/50", tone: "text-muted-foreground" },
  };

  return (
    <ul className="divide-y rounded-lg border">
      {people.map((person) => {
        const state = states[person.state];
        return (
          <li key={person.name} className="flex items-center gap-3 p-3">
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-[11px]">{person.initials}</AvatarFallback>
              </Avatar>
              {/* Decorative: the state is in text below, so nothing is lost if this is unseen. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-0 h-3 w-3 rounded-full ring-2 ring-background end-0",
                  state.dot,
                )}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{person.name}</p>
              <p className="truncate text-xs text-muted-foreground">{person.detail}</p>
            </div>

            <span className={cn("shrink-0 text-xs font-medium", state.tone)}>{state.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
