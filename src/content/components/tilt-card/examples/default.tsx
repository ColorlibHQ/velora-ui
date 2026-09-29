import { CalendarIcon, UsersIcon } from "lucide-react";

import { TiltCard } from "@/components/velora/tilt-card";

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-full max-w-sm">
      <article className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-black/10">
        <div className="relative h-24 bg-linear-to-br from-brand-from via-brand-via to-brand-to">
          <span className="absolute top-3 left-3 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium backdrop-blur">
            Live workshop
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold">Motion for product teams</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Springs, layout animation and reduced motion in two hours.
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CalendarIcon aria-hidden className="size-4" />
              Thu, 14:00 UTC
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-primary">
              <UsersIcon aria-hidden className="size-4" />
              12 seats left
            </span>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
