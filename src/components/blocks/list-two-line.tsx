"use client";

import { Box, CreditCard, Globe, Server } from "lucide-react";

const ROWS = [
  { icon: Server, name: "Compute", detail: "12 instances · eu-west-1", value: "$1,284.00" },
  { icon: Box, name: "Object storage", detail: "4.2 TB stored", value: "$96.40" },
  { icon: Globe, name: "Bandwidth", detail: "18.7 TB egress", value: "$412.00" },
  { icon: CreditCard, name: "Support plan", detail: "Business, annual", value: "$250.00" },
];

/**
 * A label and its context, with a value on the end.
 *
 * The second line is what makes this worth having over a plain list: "Compute · $1,284" invites
 * the question the detail line answers. Icons are `aria-hidden` — each one duplicates the label
 * beside it, and announcing both would just double the row.
 */
export function ListTwoLine() {
  return (
    <ul className="divide-y divide-border">
      {ROWS.map((row) => {
        const Icon = row.icon;
        return (
          <li key={row.name} className="flex items-center gap-3 py-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{row.name}</p>
              <p className="truncate text-xs text-muted-foreground">{row.detail}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold tabular-nums">{row.value}</span>
          </li>
        );
      })}
    </ul>
  );
}
