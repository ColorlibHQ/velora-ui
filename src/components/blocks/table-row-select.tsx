"use client";

import { useRef, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Row selection with a genuinely indeterminate header checkbox.
 *
 * `indeterminate` is not an attribute — it exists only as a DOM property, so it cannot be set in
 * JSX and has to be written in an effect. Skipping it leaves the header showing *unchecked* when
 * some rows are selected, which reads as "nothing selected" while a bulk action would apply to
 * four rows.
 *
 * The header checkbox's accessible name changes with its meaning: "Select all" versus "Clear
 * selection". A control whose single label is "Select all" but which sometimes deselects is
 * mislabelled half the time.
 */
export function TableRowSelect() {
  const rows = [
    { id: "ORD-7891", customer: "Ana Whitfield", total: "$1,248.00" },
    { id: "ORD-7890", customer: "Marcus Oyelaran", total: "$842.50" },
    { id: "ORD-7889", customer: "Priya Raman", total: "$318.90" },
    { id: "ORD-7888", customer: "Tomas Berg", total: "$96.00" },
  ];

  const [selected, setSelected] = useState<string[]>(["ORD-7890", "ORD-7889"]);
  const headerRef = useRef<HTMLInputElement>(null);

  const all = selected.length === rows.length;
  const some = selected.length > 0 && !all;

  useEffect(() => {
    // Property, not attribute: there is no way to express this in JSX.
    if (headerRef.current) headerRef.current.indeterminate = some;
  }, [some]);

  return (
    <div className="space-y-2">
      <p role="status" className="text-xs tabular-nums text-muted-foreground">
        {selected.length} of {rows.length} selected
      </p>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input
                  ref={headerRef}
                  type="checkbox"
                  checked={all}
                  onChange={() => setSelected(all ? [] : rows.map((row) => row.id))}
                  aria-label={selected.length > 0 ? "Clear selection" : "Select all rows"}
                  className="size-4 accent-primary"
                />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-end">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => {
              const checked = selected.includes(row.id);
              return (
                <TableRow key={row.id} data-state={checked ? "selected" : undefined}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setSelected((previous) =>
                          checked
                            ? previous.filter((id) => id !== row.id)
                            : [...previous, row.id],
                        )
                      }
                      aria-label={`Select ${row.id}`}
                      className="size-4 accent-primary"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{row.id}</TableCell>
                  <TableCell className="text-sm">{row.customer}</TableCell>
                  <TableCell className="text-end text-sm tabular-nums">{row.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
