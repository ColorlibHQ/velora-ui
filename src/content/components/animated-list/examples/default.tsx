import { ZapIcon } from "lucide-react";

import { AnimatedList } from "@/components/velora/animated-list";

export default function AnimatedListDemo() {
  return (
    <div className="h-56 w-full max-w-sm overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
      <AnimatedList delay={1500}>
        {[
          "Deploy succeeded",
          "New signup",
          "Payment received",
          "New review",
        ].map((title) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border bg-card p-3 text-sm shadow-sm"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ZapIcon className="size-4" />
            </span>
            {title}
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}
