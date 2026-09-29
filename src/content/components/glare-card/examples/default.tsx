import { SparklesIcon } from "lucide-react";

import { GlareCard } from "@/components/velora/glare-card";

export default function GlareCardDemo() {
  return (
    <GlareCard className="w-full max-w-sm bg-linear-to-br from-brand-from/25 via-card to-card shadow-xl shadow-black/10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Velora Pass</span>
        <SparklesIcon aria-hidden className="size-5 text-primary" />
      </div>
      <p className="mt-10 font-mono text-lg tracking-[0.2em]">•••• •••• 4821</p>
      <div className="mt-6 flex items-end justify-between text-xs">
        <div>
          <p className="text-muted-foreground">Member</p>
          <p className="mt-0.5 text-sm font-medium">Priya Raman</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Valid thru</p>
          <p className="mt-0.5 text-sm font-medium tabular-nums">09/28</p>
        </div>
      </div>
    </GlareCard>
  );
}
