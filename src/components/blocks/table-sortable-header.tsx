"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A sortable table whose sort state is exposed to assistive tech.
 *
 * `aria-sort` on the `<th>` is the whole point, and it is the attribute hand-rolled tables almost
 * always omit. Without it the sort direction lives only in an icon, so a screen-reader user can
 * activate the column header and get no confirmation that anything happened — or which way.
 *
 * Only the active column carries `aria-sort`; the spec allows exactly one sorted column per table,
 * and setting `"none"` on the rest is legal but noisy. The unsorted columns get the neutral
 * double-chevron so they still read as sortable.
 *
 * The header button spans the cell and carries its own accessible name including the next action —
 * "Total, sorted descending, activate to sort ascending" — because the icon alone does not say what
 * clicking will do.
 */
export function TableSortableHeader() {
  const columns = [
    { id: "order", label: "Order", numeric: false },
    { id: "customer", label: "Customer", numeric: false },
    { id: "total", label: "Total", numeric: true },
  ] as const;

  const rows = [
    { order: "ORD-7891", customer: "Ana Whitfield", total: 1248 },
    { order: "ORD-7890", customer: "Marcus Oyelaran", total: 842.5 },
    { order: "ORD-7889", customer: "Priya Raman", total: 318.9 },
    { order: "ORD-7888", customer: "Tomas Berg", total: 96 },
  ];

  const [sort, setSort] = useState<{ id: string; desc: boolean }>({ id: "total", desc: true });

  const sorted = [...rows].sort((a, b) => {
    const key = sort.id as keyof typeof a;
    const left = a[key];
    const right = b[key];
    const cmp =
      typeof left === "number" && typeof right === "number"
        ? left - right
        : String(left).localeCompare(String(right));
    return sort.desc ? -cmp : cmp;
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const active = sort.id === column.id;
              const Icon = !active ? ChevronsUpDown : sort.desc ? ArrowDown : ArrowUp;
              const direction = sort.desc ? "descending" : "ascending";

              return (
                <TableHead
                  key={column.id}
                  // Exactly one column carries aria-sort, per the ARIA spec.
                  aria-sort={active ? (sort.desc ? "descending" : "ascending") : undefined}
                  className={column.numeric ? "text-end" : undefined}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSort((prev) =>
                        prev.id === column.id
                          ? { id: column.id, desc: !prev.desc }
                          : { id: column.id, desc: true },
                      )
                    }
                    aria-label={
                      active
                        ? `${column.label}, sorted ${direction}. Activate to sort ${
                            sort.desc ? "ascending" : "descending"
                          }.`
                        : `${column.label}, not sorted. Activate to sort descending.`
                    }
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground",
                      active ? "text-foreground" : "text-muted-foreground",
                      column.numeric && "flex-row-reverse",
                    )}
                  >
                    {column.label}
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.order}>
              <TableCell className="font-mono text-xs">{row.order}</TableCell>
              <TableCell className="text-sm">{row.customer}</TableCell>
              <TableCell className="text-end text-sm tabular-nums">
                ${row.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
