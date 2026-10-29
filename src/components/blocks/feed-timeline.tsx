"use client";

import { CheckCircle2, GitCommit, MessageSquare, UserPlus } from "lucide-react";

const EVENTS = [
  { icon: GitCommit, title: "Deployed v2.4.1 to production", who: "Ada L.", when: "12 minutes ago" },
  { icon: CheckCircle2, title: "Closed 4 issues in the checkout milestone", who: "Grace H.", when: "1 hour ago" },
  { icon: MessageSquare, title: "Commented on “Payment provider migration”", who: "Alan T.", when: "3 hours ago" },
  { icon: UserPlus, title: "Invited two collaborators", who: "Katherine J.", when: "Yesterday" },
];

/**
 * A vertical run of events with a connecting rail.
 *
 * The rail is a pseudo-element on each item rather than one absolutely positioned line, so it
 * stops naturally at the last event — a single line has to be told where to end, and gets it
 * wrong the moment the list length changes.
 *
 * `start-4` and `ms-*`, not `left-4`: the rail belongs on the reading-order side, so it moves to
 * the right under RTL with no extra rules.
 */
export function FeedTimeline() {
  return (
    <ol className="space-y-1">
      {EVENTS.map((event, index) => {
        const Icon = event.icon;
        const isLast = index === EVENTS.length - 1;

        return (
          <li key={event.title} className="relative flex gap-3 pb-4 last:pb-0">
            {!isLast && (
              <span
                className="absolute start-4 top-8 bottom-0 w-px bg-border"
                aria-hidden="true"
              />
            )}
            <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted ring-4 ring-background">
              <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0 pt-1">
              <p className="text-sm">{event.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {event.who} · {event.when}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
