"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * Overlapping avatars with an overflow count.
 *
 * The overlap uses a negative *logical* margin — `-ms-2` — so the stack leans the correct way in
 * both directions. `-ml-2` is the obvious way to write this and it reverses the overlap under RTL:
 * the avatars pile onto the wrong edge and the ring order inverts, which is subtle enough that
 * nobody notices until an RTL user does. This is the case the project's lint rule was written for.
 *
 * `ring-background` rather than `border` for the separation, because a ring draws outside the box
 * and so does not shrink the avatar or shift the overlap arithmetic.
 *
 * Names are in a single `sr-only` sentence rather than one per avatar, so a screen reader reads
 * "Ana Whitfield, Marcus Oyelaran and 4 others" instead of announcing five separate images. The
 * avatars themselves are decorative once the list exists.
 */
export function AvatarStack() {
  const people = [
    { name: "Ana Whitfield", initials: "AW" },
    { name: "Marcus Oyelaran", initials: "MO" },
    { name: "Priya Raman", initials: "PR" },
    { name: "Tomas Berg", initials: "TB" },
  ];
  const extra = 4;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          {people.map((person, index) => (
            <Avatar
              key={person.name}
              // -ms-2, not -ml-2: the logical form keeps the lean correct under RTL.
              className={index === 0 ? "h-9 w-9 ring-2 ring-background" : "-ms-2 h-9 w-9 ring-2 ring-background"}
            >
              <AvatarFallback className="text-[11px]">{person.initials}</AvatarFallback>
            </Avatar>
          ))}
          <span className="-ms-2 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-[11px] font-medium ring-2 ring-background">
            +{extra}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          <span className="sr-only">
            Assigned to {people.map((person) => person.name).join(", ")} and {extra} others.
          </span>
          <span aria-hidden="true">
            {people.length + extra} people assigned
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center">
          {people.slice(0, 3).map((person, index) => (
            <Avatar
              key={person.name}
              className={index === 0 ? "h-7 w-7 ring-2 ring-background" : "-ms-1.5 h-7 w-7 ring-2 ring-background"}
            >
              <AvatarFallback className="text-[10px]">{person.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Compact variant, for a table cell</p>
      </div>
    </div>
  );
}
