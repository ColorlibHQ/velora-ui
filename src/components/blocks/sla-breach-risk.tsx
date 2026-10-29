"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Time-remaining bars where the colour is driven by risk, not by fill.
 *
 * A naive countdown bar goes red when it is nearly full, which is backwards for an SLA: a ticket at
 * 90% of its window is the urgent one, and a ticket at 10% is fine. The tone here is chosen from the
 * *fraction consumed* crossing named thresholds, so the mapping is explicit and readable rather than
 * emergent.
 *
 * Breached rows are not clamped to 100% — they state how far over they are. Capping the display at
 * "100%" hides the difference between one minute late and two days late, which is the only thing
 * anyone triaging wants to know.
 *
 * The tone map is a lookup keyed by a computed level, not nested ternaries in the className. That
 * keeps the thresholds in one place where they can be read and changed together.
 */
export function SlaBreachRisk() {
  const tickets = [
    { id: "SUP-4821", subject: "Checkout returns 502", consumed: 0.28, left: "17h left" },
    { id: "SUP-4818", subject: "Duty charged twice", consumed: 0.71, left: "6h left" },
    { id: "SUP-4802", subject: "Cannot export invoices", consumed: 0.94, left: "1h left" },
    { id: "SUP-4791", subject: "SSO login loop", consumed: 1.4, left: "9h overdue" },
  ];

  const tones = {
    ok: { bar: "bg-success", badge: "success" as const, label: "On track" },
    warn: { bar: "bg-warning", badge: "warning" as const, label: "At risk" },
    breach: { bar: "bg-destructive", badge: "destructive" as const, label: "Breached" },
  };

  const levelFor = (consumed: number) =>
    consumed >= 1 ? "breach" : consumed >= 0.6 ? "warn" : "ok";

  return (
    <ul className="divide-y rounded-lg border">
      {tickets.map((ticket) => {
        const tone = tones[levelFor(ticket.consumed)];
        return (
          <li key={ticket.id} className="space-y-2 p-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{ticket.subject}</span>
              <Badge variant={tone.badge} className="text-[10px]">
                {tone.label}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <div
                role="progressbar"
                aria-label={`SLA window consumed for ${ticket.id}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(ticket.consumed * 100)}
                aria-valuetext={`${Math.round(ticket.consumed * 100)}% of the window used, ${ticket.left}`}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className={cn("h-full rounded-full", tone.bar)}
                  // The BAR is capped so it cannot overflow its track; the label below is not,
                  // because how far past the deadline something is matters.
                  style={{ width: `${Math.min(100, ticket.consumed * 100)}%` }}
                />
              </div>
              <span className="w-24 shrink-0 text-end text-xs tabular-nums text-muted-foreground">
                {ticket.left}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
