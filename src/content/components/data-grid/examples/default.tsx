"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataGrid, type ColumnDef } from "@/components/velora/data-grid";

type Order = {
  id: string;
  customer: string;
  email: string;
  status: "Paid" | "Pending" | "Refunded" | "Failed";
  method: "Card" | "PayPal" | "Bank transfer";
  total: number;
  date: string;
};

const names = [
  "Ana Whitfield",
  "Marcus Oyelaran",
  "Priya Raman",
  "Tomas Berg",
  "Lena Kovač",
  "Diego Alvarez",
  "Mei Tanaka",
  "Samuel Okafor",
  "Ines Moreau",
  "Jonah Weiss",
  "Aisha Rahman",
  "Felix Lindqvist",
];
const statuses: Order["status"][] = [
  "Paid",
  "Paid",
  "Paid",
  "Pending",
  "Refunded",
  "Paid",
  "Failed",
  "Pending",
];
const methods: Order["method"][] = ["Card", "Card", "PayPal", "Bank transfer"];

// Deterministic, so server and client render the same rows.
const orders: Order[] = Array.from({ length: 48 }, (_, i) => {
  const name = names[(i * 7) % names.length];
  return {
    id: `ORD-${7940 - i}`,
    customer: name,
    email: `${name.split(" ")[0].toLowerCase()}@example.com`,
    status: statuses[(i * 5) % statuses.length],
    method: methods[(i * 3) % methods.length],
    total: Math.round(((i * 7919) % 180000) / 100 + 12),
    date: new Date(Date.UTC(2026, 9, 28 - Math.floor(i / 2)))
      .toISOString()
      .slice(0, 10),
  };
});

const dot = {
  Paid: "bg-emerald-500",
  Pending: "bg-amber-500",
  Refunded: "bg-muted-foreground",
  Failed: "bg-destructive",
} as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.customer}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="gap-1.5">
        <span
          aria-hidden
          className={`size-1.5 rounded-full ${dot[row.original.status]}`}
        />
        {row.original.status}
      </Badge>
    ),
  },
  { accessorKey: "method", header: "Method" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "total",
    header: () => <span className="ml-auto">Total</span>,
    meta: { label: "Total" },
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {currency.format(row.original.total)}
      </span>
    ),
  },
];

export default function DataGridDemo() {
  return (
    <DataGrid
      className="w-full"
      label="Orders"
      data={orders}
      columns={columns}
      getRowId={(o) => o.id}
      searchPlaceholder="Search orders…"
      filters={[
        { column: "status", title: "Status" },
        { column: "method", title: "Method" },
      ]}
      selectable
      defaultSort={[{ id: "date", desc: true }]}
      bulkActions={(rows, clear) => (
        <Button size="sm" variant="outline" onClick={clear}>
          Export {rows.length}
        </Button>
      )}
    />
  );
}
