import { CalendarDays, Inbox, LayoutDashboard, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/velora/animated-sidebar";

export default function AnimatedSidebarNarrowDemo() {
  return (
    <Sidebar className="h-96 w-full max-w-sm overflow-hidden rounded-xl border bg-background">
      <SidebarBody
        logo={
          <span className="size-7 rounded-full bg-linear-to-br from-brand-from via-brand-via to-brand-to" />
        }
        title="Daybook"
        footer={<SidebarLink href="#settings" label="Settings" icon={<Settings />} />}
      >
        <SidebarLink href="#today" label="Today" icon={<LayoutDashboard />} active />
        <SidebarLink href="#inbox" label="Inbox" icon={<Inbox />} />
        <SidebarLink href="#calendar" label="Calendar" icon={<CalendarDays />} />
      </SidebarBody>
      <main className="flex-1 space-y-3 overflow-auto p-4">
        <p className="text-sm text-muted-foreground">
          Open the menu for the full-height drawer.
        </p>
        {["Stand-up", "Design review", "Lunch with Maya", "Ship v2.4"].map(
          (item, i) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <span className="w-12 text-xs text-muted-foreground tabular-nums">
                {9 + i * 2}:00
              </span>
              <span className="text-sm font-medium">{item}</span>
            </div>
          )
        )}
      </main>
    </Sidebar>
  );
}
