"use client";

import { Mail, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PEOPLE = [
  { name: "Ada Lovelace", initials: "AL", email: "ada@example.com", role: "Admin", status: "Active" },
  { name: "Grace Hopper", initials: "GH", email: "grace@example.com", role: "Editor", status: "Active" },
  { name: "Alan Turing", initials: "AT", email: "alan@example.com", role: "Viewer", status: "Invited" },
];

/**
 * A directory row with the actions people actually take.
 *
 * Two things worth copying. The row actions are always present rather than revealed on hover: a
 * hover-only control does not exist on a touch device, and this is a list people operate from a
 * tablet as often as a desktop.
 *
 * And every icon-only button has an accessible name that includes *whose* row it is — six
 * buttons all called "More" give a screen-reader user a list of six identical options.
 */
export function PeopleDirectoryRow() {
  return (
    <ul className="divide-y divide-border">
      {PEOPLE.map((person) => (
        <li key={person.email} className="flex items-center gap-3 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {person.initials}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{person.name}</p>
            <p className="truncate text-xs text-muted-foreground">{person.email}</p>
          </div>

          <Badge variant="outline" className="hidden shrink-0 text-[11px] sm:inline-flex">
            {person.role}
          </Badge>

          <Badge
            variant={person.status === "Active" ? "success" : "secondary"}
            className="shrink-0 text-[11px]"
          >
            {person.status}
          </Badge>

          <div className="flex shrink-0 items-center">
            <Button variant="ghost" size="icon" className="size-8" aria-label={`Email ${person.name}`}>
              <Mail className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label={`More actions for ${person.name}`}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
