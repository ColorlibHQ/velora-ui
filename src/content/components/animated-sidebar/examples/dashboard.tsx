import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Search,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/velora/animated-sidebar";

const stats = [
  { label: "Revenue", value: "$48,210", change: "+12.4%" },
  { label: "Orders", value: "1,284", change: "+4.1%" },
  { label: "Customers", value: "912", change: "+8.9%" },
];

const bars = [38, 52, 44, 68, 57, 80, 62, 90, 74, 86, 70, 96];

const orders = [
  { id: "#3021", customer: "Lena Park", total: "$240.00", status: "Paid" },
  { id: "#3020", customer: "Omar Haddad", total: "$89.50", status: "Pending" },
  { id: "#3019", customer: "Iris Chen", total: "$412.10", status: "Paid" },
];

export default function AnimatedSidebarDashboardDemo() {
  return (
    <Sidebar className="h-[30rem] w-full overflow-hidden rounded-xl border bg-background">
      <SidebarBody
        logo={
          <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-brand-from via-brand-via to-brand-to text-sm font-bold text-brand-foreground">
            A
          </span>
        }
        title="Acme Store"
        label="Dashboard"
        footer={
          <>
            <SidebarLink href="#support" label="Support" icon={<LifeBuoy />} />
            <SidebarLink
              href="#account"
              label="Ada Lovelace"
              icon={
                <span className="grid size-6 place-items-center rounded-full bg-muted text-[10px] font-semibold text-foreground">
                  AL
                </span>
              }
            />
          </>
        }
      >
        <SidebarLink href="#overview" label="Overview" icon={<LayoutDashboard />} active />
        <SidebarLink href="#orders" label="Orders" icon={<Package />} />
        <SidebarLink href="#customers" label="Customers" icon={<Users />} />
        <SidebarLink href="#reports" label="Reports" icon={<BarChart3 />} />
        <SidebarLink href="#billing" label="Billing" icon={<CreditCard />} />
      </SidebarBody>

      <main className="@container flex-1 overflow-auto">
        <div className="flex items-center justify-between gap-4 border-b px-6 py-3">
          <h2 className="font-semibold">Overview</h2>
          <div className="flex h-9 w-full max-w-56 items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground">
            <Search className="size-4" aria-hidden />
            Search orders…
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="grid gap-3 @lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-4">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-brand">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm font-medium">Sales, last 12 weeks</p>
            <div className="mt-4 flex h-28 items-end gap-2" aria-hidden>
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t-md bg-linear-to-t from-brand-from/70 to-brand-to"
                />
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-left text-sm">
              <caption className="px-4 pt-3 text-left text-sm font-medium">
                Recent orders
              </caption>
              <thead className="text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Order</th>
                  <th className="px-4 py-2 font-medium">Customer</th>
                  <th className="px-4 py-2 font-medium">Total</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2.5 tabular-nums">{order.id}</td>
                    <td className="px-4 py-2.5">{order.customer}</td>
                    <td className="px-4 py-2.5 tabular-nums">{order.total}</td>
                    <td className="px-4 py-2.5">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Sidebar>
  );
}
