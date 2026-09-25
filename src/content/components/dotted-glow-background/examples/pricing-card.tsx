import { Check } from "lucide-react";

import { DottedGlowBackground } from "@/components/velora/dotted-glow-background";

const features = ["Unlimited projects", "Preview deployments", "Priority support"];

export default function DottedGlowBackgroundPricingDemo() {
  return (
    <div className="flex w-full justify-center py-6">
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border bg-card p-8 shadow-lg">
        <DottedGlowBackground gap={14} radius={1} opacity={0.18} glows={2} />
        <div className="relative">
          <p className="inline-flex rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-medium backdrop-blur">
            Pro
          </p>
          <p className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight">$24</span>
            <span className="text-sm text-muted-foreground">per seat / month</span>
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check aria-hidden className="size-4 text-brand" />
                {feature}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-8 flex h-10 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
          >
            Start 14-day trial
          </a>
        </div>
      </div>
    </div>
  );
}
