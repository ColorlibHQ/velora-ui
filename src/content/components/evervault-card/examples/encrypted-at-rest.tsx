import { LockKeyhole } from "lucide-react";

import { EvervaultCard } from "@/components/velora/evervault-card";

export default function EvervaultCardEncryptedAtRestDemo() {
  return (
    <EvervaultCard
      label={<LockKeyhole className="size-10 text-brand" aria-hidden />}
      className="w-full max-w-sm"
    >
      <div className="border-t bg-card/60 p-6 backdrop-blur-sm">
        <h3 className="font-semibold tracking-tight">Encrypted at rest</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Every record is sealed with AES-256-GCM. Keys live in a separate HSM
          and rotate every 30 days.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {["AES-256", "SOC 2"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="#"
            className="rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Security docs
          </a>
        </div>
      </div>
    </EvervaultCard>
  );
}
