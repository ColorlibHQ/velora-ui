"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight, Database, Check } from "lucide-react";

/**
 * What a model did, before it says what it found.
 *
 * A tool call is the part of an AI answer users are most suspicious of, so it should be inspectable
 * rather than summarised. Collapsed it states the tool, the target and the duration; expanded it
 * shows the arguments and the shape of the result.
 *
 * Built as a `<details>`/`<summary>` pair, not a div with an onClick. That gives keyboard operation,
 * the correct expanded/collapsed semantics and in-page find-in-page behaviour with no ARIA and no
 * state — and it still works if the JavaScript for this island never arrives.
 *
 * The chevron rotates via the `group-open:` variant, so the open state drives the visual from CSS
 * rather than from a React boolean that could disagree with the element.
 */
export function ToolCallCard() {
  const [calls] = useState([
    {
      tool: "query_orders",
      target: "orders",
      ms: 142,
      rows: 1284,
      args: '{ "status": "refunded", "since": "2026-06-01" }',
    },
    {
      tool: "aggregate_revenue",
      target: "invoices",
      ms: 88,
      rows: 96,
      args: '{ "groupBy": "month", "currency": "USD" }',
    },
  ]);

  return (
    <div className="space-y-2">
      {calls.map((call) => (
        <details key={call.tool} className="group rounded-lg border bg-card">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Database className="h-4 w-4" aria-hidden="true" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-mono text-xs font-medium">{call.tool}</span>
              <span className="block text-xs text-muted-foreground">
                {call.rows.toLocaleString("en-US")} rows from {call.target}
              </span>
            </span>

            <Badge variant="secondary" className="gap-1 tabular-nums">
              <Check className="h-3 w-3" aria-hidden="true" />
              {call.ms}ms
            </Badge>

            <ChevronRight
              aria-hidden="true"
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                "group-open:rotate-90 rtl:rotate-180 rtl:group-open:-rotate-90",
              )}
            />
          </summary>

          <div className="space-y-2 border-t px-3 py-2">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Arguments
            </p>
            <pre className="overflow-x-auto rounded-md bg-muted p-2 font-mono text-xs">
              {call.args}
            </pre>
          </div>
        </details>
      ))}
    </div>
  );
}
