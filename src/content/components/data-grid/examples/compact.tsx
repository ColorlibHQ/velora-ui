"use client";

import { DataGrid, type ColumnDef } from "@/components/velora/data-grid";

type Endpoint = { route: string; method: string; p95: number; errors: number };

const endpoints: Endpoint[] = [
  { route: "/api/orders", method: "GET", p95: 182, errors: 0.2 },
  { route: "/api/orders", method: "POST", p95: 341, errors: 1.4 },
  { route: "/api/customers", method: "GET", p95: 96, errors: 0.1 },
  { route: "/api/invoices", method: "GET", p95: 214, errors: 0.6 },
  { route: "/api/auth/session", method: "GET", p95: 41, errors: 0 },
  { route: "/api/search", method: "GET", p95: 508, errors: 2.1 },
  { route: "/api/webhooks/stripe", method: "POST", p95: 127, errors: 0.3 },
];

const columns: ColumnDef<Endpoint>[] = [
  {
    accessorKey: "route",
    header: "Route",
    cell: ({ getValue }) => (
      <code className="text-xs">{getValue<string>()}</code>
    ),
  },
  { accessorKey: "method", header: "Method" },
  {
    accessorKey: "p95",
    header: "p95 (ms)",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{getValue<number>()}</span>
    ),
  },
  {
    accessorKey: "errors",
    header: "Errors (%)",
    cell: ({ getValue }) => (
      <span className="tabular-nums">{getValue<number>().toFixed(1)}</span>
    ),
  },
];

export default function DataGridCompactDemo() {
  return (
    <DataGrid
      className="w-full"
      label="Endpoint latency"
      data={endpoints}
      columns={columns}
      density="compact"
      searchable={false}
      columnToggle={false}
      pageSize={5}
      pageSizes={[5, 10]}
      defaultSort={[{ id: "p95", desc: true }]}
    />
  );
}
