"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Member rows where the role is editable in place and the owner is protected.
 *
 * The owner's row renders a static badge instead of a select. An organisation that lets its last
 * owner demote themselves locks everybody out of billing, and a disabled select still reads as
 * "temporarily unavailable" rather than "not possible" — so it is not rendered as a control at all.
 *
 * Each select carries its own accessible name naming the person, because "Role" repeated four times
 * is indistinguishable when a screen reader lists the form controls on the page. `aria-label` on the
 * trigger is required here: a `role="combobox"` never takes its name from its contents.
 */
export function RoleAssignmentRow() {
  const [members, setMembers] = useState([
    { name: "Ana Whitfield", email: "ana@acme.test", initials: "AW", role: "owner" },
    { name: "Marcus Oyelaran", email: "marcus@acme.test", initials: "MO", role: "admin" },
    { name: "Priya Raman", email: "priya@acme.test", initials: "PR", role: "editor" },
    { name: "Tomas Berg", email: "tomas@acme.test", initials: "TB", role: "viewer" },
  ]);

  const roles = [
    { id: "admin", label: "Admin" },
    { id: "editor", label: "Editor" },
    { id: "viewer", label: "Viewer" },
  ];

  return (
    <ul className="divide-y rounded-lg border">
      {members.map((member) => (
        <li key={member.email} className="flex flex-wrap items-center gap-3 p-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="text-[11px]">{member.initials}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{member.name}</p>
            <p className="truncate text-xs text-muted-foreground">{member.email}</p>
          </div>

          {member.role === "owner" ? (
            // Not a disabled select: this is not a temporarily unavailable control, it is a
            // role that cannot be changed from here at all.
            <Badge variant="secondary">Owner</Badge>
          ) : (
            <Select
              value={member.role}
              onValueChange={(role) =>
                setMembers((prev) =>
                  prev.map((entry) => (entry.email === member.email ? { ...entry, role } : entry)),
                )
              }
            >
              <SelectTrigger className="h-8 w-[120px]" aria-label={`Role for ${member.name}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </li>
      ))}
    </ul>
  );
}
