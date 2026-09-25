import {
  BarChart3,
  Cloud,
  CreditCard,
  Database,
  Lock,
  Mail,
  MessageSquare,
  Webhook,
} from "lucide-react";

import { HoverCards } from "@/components/velora/card-hover-effect";

const integrations = [
  { title: "Payments", description: "Cards, wallets and invoices.", href: "#payments", icon: <CreditCard /> },
  { title: "Email", description: "Transactional mail that lands.", href: "#email", icon: <Mail /> },
  { title: "Analytics", description: "Events, funnels, retention.", href: "#analytics", icon: <BarChart3 /> },
  { title: "Auth", description: "SSO, passkeys and MFA.", href: "#auth", icon: <Lock /> },
  { title: "Database", description: "Managed Postgres, branched.", href: "#database", icon: <Database /> },
  { title: "Storage", description: "Files and images at the edge.", href: "#storage", icon: <Cloud /> },
  { title: "Chat", description: "In-app support conversations.", href: "#chat", icon: <MessageSquare /> },
  { title: "Webhooks", description: "Signed, retried, replayable.", href: "#webhooks", icon: <Webhook /> },
];

export default function HoverCardsIntegrationsDemo() {
  return (
    <section className="w-full max-w-5xl space-y-6">
      <div className="mx-auto max-w-md space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Plugs into your stack</h2>
        <p className="text-sm text-muted-foreground">
          Connect the services you already use in a couple of clicks.
        </p>
      </div>
      <HoverCards items={integrations} columns={4} />
    </section>
  );
}
