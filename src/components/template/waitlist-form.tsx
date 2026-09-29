"use client";

import { useId, useState } from "react";
import { CheckIcon, Loader2Icon, MailIcon, RocketIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/velora/shimmer-button";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "pending" }
  | { kind: "already" }
  | { kind: "error"; message: string };

/**
 * Velora Pro waitlist. Posts to /api/waitlist (a Pages Function that
 * subscribes the address to a double opt-in Sendy list).
 */
export function WaitlistForm({ className }: { className?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), company: form.get("company") }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        status?: string;
        message?: string;
      };
      if (body.status === "pending") setStatus({ kind: "pending" });
      else if (body.status === "already") setStatus({ kind: "already" });
      else
        setStatus({
          kind: "error",
          message: body.message ?? "Something went wrong. Please try again.",
        });
    } catch {
      setStatus({ kind: "error", message: "You seem to be offline. Please try again." });
    }
  }

  if (status.kind === "pending" || status.kind === "already") {
    return (
      <div
        role="status"
        className={cn("rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm", className)}
      >
        <p className="flex items-center gap-2 font-medium">
          {status.kind === "pending" ? (
            <MailIcon className="size-4 text-primary" />
          ) : (
            <CheckIcon className="size-4 text-primary" />
          )}
          {status.kind === "pending" ? "Check your inbox" : "You're already on the list"}
        </p>
        <p className="mt-1 text-muted-foreground">
          {status.kind === "pending"
            ? "We've sent a confirmation link. Click it to secure early access and launch pricing."
            : "Thanks — we'll email you the moment Velora Pro opens."}
        </p>
      </div>
    );
  }

  const describedBy = `${id}-note`;

  return (
    <form onSubmit={onSubmit} noValidate={false} className={cn("space-y-3", className)}>
      <label htmlFor={`${id}-email`} className="text-sm font-medium">
        Get early access and launch pricing
      </label>
      <Input
        id={`${id}-email`}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        aria-describedby={describedBy}
        aria-invalid={status.kind === "error" || undefined}
        className="h-11"
      />
      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <ShimmerButton type="submit" className="w-full" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? (
          <Loader2Icon className="size-4 motion-safe:animate-spin" />
        ) : (
          <RocketIcon className="size-4" />
        )}
        {status.kind === "sending" ? "Joining…" : "Join the waitlist"}
      </ShimmerButton>
      <p id={describedBy} className="text-xs text-muted-foreground">
        We&apos;ll send one email to confirm your address, then only Velora Pro news.
        Unsubscribe anytime.
      </p>
      <p role="alert" className="text-sm text-destructive empty:hidden">
        {status.kind === "error" ? status.message : ""}
      </p>
    </form>
  );
}
