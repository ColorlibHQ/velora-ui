"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

/**
 * Pending invitations, with the expiry that makes the resend button meaningful.
 *
 * An invite list showing only email addresses cannot answer the question people actually have: is
 * this one still valid. So each row states how long is left, and an expired invite is visually
 * distinct and offers a resend rather than a revoke.
 *
 * Expiry is shown as a remaining duration rather than a date, because "expires in 2 days" is
 * immediately actionable where "expires 30 Jul" requires knowing today's date. The absolute date
 * stays in the `title` for anyone who needs it.
 *
 * The initial-less rows use a mail icon rather than fabricating initials from an email local part —
 * "an" from "ana@" reads as a name the system has invented.
 */
export function InvitePendingList() {
  const invites = [
    { email: "dana@partner.test", role: "Editor", left: "6 days", exact: "6 August 2026", expired: false },
    { email: "sam@contractor.test", role: "Viewer", left: "2 days", exact: "2 August 2026", expired: false },
    { email: "old@vendor.test", role: "Viewer", left: "Expired", exact: "24 July 2026", expired: true },
  ];

  return (
    <ul className="divide-y rounded-lg border">
      {invites.map((invite) => (
        <li key={invite.email} className="flex flex-wrap items-center gap-3 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{invite.email}</p>
            <p className="text-xs text-muted-foreground">
              Invited as {invite.role} ·{" "}
              <span title={invite.exact}>
                {invite.expired ? "Expired" : `Expires in ${invite.left}`}
              </span>
            </p>
          </div>

          {invite.expired ? (
            <>
              <Badge variant="outline" className="text-destructive">
                Expired
              </Badge>
              <Button variant="outline" size="sm">
                Resend
              </Button>
            </>
          ) : (
            <>
              <Badge variant="secondary">Pending</Badge>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
