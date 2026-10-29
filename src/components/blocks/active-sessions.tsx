"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Tablet } from "lucide-react";

/**
 * Where the account is signed in, and how to end a session.
 *
 * The current session is marked and has no revoke button — offering "Sign out" on the row you are
 * reading it from is a trap, because it looks like the same action as revoking a stranger's device
 * but logs you out instead. Ending the current session belongs on a separate, clearly-labelled
 * control.
 *
 * Locations and times are the point of the block: a user can only spot an unfamiliar session if the
 * rows say where and when. "Chrome on macOS" alone is every session they have.
 */
export function ActiveSessions() {
  const sessions = [
    {
      device: "MacBook Pro · Chrome",
      where: "Riga, LV",
      when: "Active now",
      Icon: Laptop,
      current: true,
    },
    {
      device: "iPhone 16 · Safari",
      where: "Riga, LV",
      when: "2 hours ago",
      Icon: Smartphone,
      current: false,
    },
    {
      device: "iPad · Safari",
      where: "Berlin, DE",
      when: "4 days ago",
      Icon: Tablet,
      current: false,
    },
  ];

  return (
    <ul className="divide-y rounded-lg border">
      {sessions.map((session) => (
        <li key={session.device} className="flex items-center gap-3 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <session.Icon className="h-4 w-4" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-medium">{session.device}</p>
              {session.current && (
                <Badge variant="success" className="text-[10px]">
                  This device
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {session.where} · {session.when}
            </p>
          </div>

          {!session.current && (
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
