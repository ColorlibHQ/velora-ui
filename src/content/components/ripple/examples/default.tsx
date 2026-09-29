import { RadioIcon } from "lucide-react";

import { Ripple } from "@/components/velora/ripple";

export default function RippleDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-radial from-brand-from/15 to-background to-70%">
      <Ripple circles={6} baseSize={112} className="[&>span]:border-brand/60" />
      <div className="relative flex flex-col items-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <RadioIcon aria-hidden className="size-7" />
        </span>
        <div className="absolute top-full mt-6 text-center whitespace-nowrap">
          <p className="font-semibold">Looking for devices…</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep your phone nearby
          </p>
        </div>
      </div>
    </div>
  );
}
