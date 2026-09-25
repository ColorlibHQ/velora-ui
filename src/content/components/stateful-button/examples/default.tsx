"use client";

import { StatefulButton } from "@/components/velora/stateful-button";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function StatefulButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <StatefulButton onClick={() => wait(1500)} successText="Published">
        Publish post
      </StatefulButton>
      <StatefulButton
        onClick={() => wait(1500)}
        successText="Copied"
        className="text-brand-foreground [--surface:var(--color-brand)]"
      >
        Copy invite link
      </StatefulButton>
    </div>
  );
}
