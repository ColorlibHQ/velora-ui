import { Sparkles } from "lucide-react";

import { GlowingEffect } from "@/components/velora/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <div className="relative w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
      <GlowingEffect />
      <div className="flex size-10 items-center justify-center rounded-xl border bg-background shadow-sm">
        <Sparkles className="size-5 text-brand" aria-hidden />
      </div>
      <h3 className="mt-4 font-semibold tracking-tight">Follows your pointer</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Bring the cursor near any edge and the border lights up where you are.
      </p>
      <a
        href="#"
        className="mt-4 inline-block rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Learn more
      </a>
    </div>
  );
}
