"use client";

const MEMBERS = [
  { name: "Ada Lovelace", initials: "AL" },
  { name: "Grace Hopper", initials: "GH" },
  { name: "Alan Turing", initials: "AT" },
  { name: "Katherine Johnson", initials: "KJ" },
  { name: "Barbara Liskov", initials: "BL" },
  { name: "Edsger Dijkstra", initials: "ED" },
  { name: "Margaret Hamilton", initials: "MH" },
];

/**
 * Overlapping avatars with an overflow count.
 *
 * The visible avatars are `aria-hidden` and the whole group carries one accessible name listing
 * everyone — seven separate announcements of two-letter initials tell a screen-reader user
 * nothing, while "Shared with Ada Lovelace, Grace Hopper and 5 others" is the actual content.
 *
 * `-ms-2` for the overlap rather than `-ml-2`, so the stack overlaps in the reading direction
 * and reverses correctly under RTL. The ring is `ring-background`, which keeps the separation
 * visible in both themes without a hardcoded white.
 */
export function PeopleAvatarStack() {
  const shown = MEMBERS.slice(0, 4);
  const extra = MEMBERS.length - shown.length;

  const label =
    `Shared with ${shown.map((member) => member.name).join(", ")}` +
    (extra > 0 ? ` and ${extra} ${extra === 1 ? "other" : "others"}` : "");

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center" role="img" aria-label={label}>
        {shown.map((member) => (
          <span
            key={member.name}
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-muted text-[11px] font-semibold ring-2 ring-background first:ms-0 -ms-2"
          >
            {member.initials}
          </span>
        ))}
        {extra > 0 && (
          <span
            aria-hidden="true"
            className="-ms-2 flex size-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary ring-2 ring-background"
          >
            +{extra}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">{MEMBERS.length} collaborators</p>
    </div>
  );
}
