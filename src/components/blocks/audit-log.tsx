"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * An audit trail showing what changed, from what, to what.
 *
 * A log line saying "Ana updated the order" is almost useless in an audit context. The before and
 * after values are the entire reason the log exists, so they are the emphasised part here, with the
 * old value struck through.
 *
 * `<del>` and `<ins>` rather than styled spans: they are the elements HTML has for removed and
 * inserted content, so the change is conveyed semantically rather than by a line-through that a
 * screen reader ignores. `line-through` on a `<span>` is decoration; `<del>` is meaning.
 *
 * Rows are grouped under a date heading, because an audit log is read by scanning to a day. A flat
 * list of 200 timestamps is not.
 */
export function AuditLog() {
  const days = [
    {
      date: "Today",
      entries: [
        {
          who: "Ana Whitfield",
          what: "Order status",
          from: "Pending",
          to: "Paid",
          when: "09:14",
          tone: "success" as const,
        },
        {
          who: "Marcus Oyelaran",
          what: "Shipping address",
          from: "12 Elm St, Berlin",
          to: "44 Oak Ave, Berlin",
          when: "08:52",
          tone: "neutral" as const,
        },
      ],
    },
    {
      date: "Yesterday",
      entries: [
        {
          who: "System",
          what: "Payment method",
          from: "visa ···4242",
          to: "mastercard ···8891",
          when: "17:31",
          tone: "neutral" as const,
        },
        {
          who: "Priya Raman",
          what: "Discount",
          from: "0%",
          to: "15%",
          when: "14:06",
          tone: "warning" as const,
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <section key={day.date} className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {day.date}
          </h3>
          <ul className="divide-y rounded-lg border">
            {day.entries.map((entry) => (
              <li key={`${entry.what}-${entry.when}`} className="flex gap-3 p-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    entry.tone === "success" && "bg-success",
                    entry.tone === "warning" && "bg-warning",
                    entry.tone === "neutral" && "bg-muted-foreground/40",
                  )}
                />

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{entry.who}</span>
                    <span className="text-muted-foreground"> changed </span>
                    <span className="font-medium">{entry.what}</span>
                  </p>
                  <p className="text-xs">
                    {/* <del>/<ins> carry the change semantically, not just visually. */}
                    <del className="text-muted-foreground">{entry.from}</del>
                    <span aria-hidden="true" className="mx-1.5 text-muted-foreground">
                      →
                    </span>
                    <ins className="font-medium no-underline">{entry.to}</ins>
                  </p>
                </div>

                <Badge variant="outline" className="shrink-0 tabular-nums text-[10px]">
                  {entry.when}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
