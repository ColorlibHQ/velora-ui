import {
  Bell,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/velora/animated-sidebar";

const links = [
  { label: "Dashboard", icon: <LayoutDashboard />, active: true },
  { label: "Projects", icon: <FolderKanban /> },
  { label: "Team", icon: <Users /> },
  { label: "Notifications", icon: <Bell /> },
];

export default function AnimatedSidebarDemo() {
  return (
    <Sidebar className="h-96 w-full overflow-hidden rounded-xl border bg-background">
      <SidebarBody
        logo={
          <span className="size-7 rounded-lg bg-linear-to-br from-brand-from via-brand-via to-brand-to" />
        }
        title="Northwind"
        footer={<SidebarLink href="#settings" label="Settings" icon={<Settings />} />}
      >
        {links.map((link) => (
          <SidebarLink
            key={link.label}
            href={`#${link.label.toLowerCase()}`}
            label={link.label}
            icon={link.icon}
            active={link.active}
          />
        ))}
      </SidebarBody>
      <main className="@container flex-1 space-y-4 overflow-auto p-6">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Hover the rail or Tab into it to expand it. Pin it open with the
          toggle at the bottom.
        </p>
        <div className="grid gap-3 @lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl border bg-muted/50" />
          ))}
        </div>
        <div className="h-32 rounded-xl border bg-muted/50" />
      </main>
    </Sidebar>
  );
}
