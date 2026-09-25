"use client";

import { useId, useState } from "react";
import { ArrowRightIcon, CheckCircle2Icon, MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarCircles } from "@/components/velora/avatar-circles";
import { DottedGlowBackground } from "@/components/velora/dotted-glow-background";

const TITLE = "The Friday changelog";
const COPY =
  "One short email a week: what we shipped, what we learned and the best reads on building calm software.";
const SUBSCRIBERS = ["Maya Chen", "Jonas Berg", "Priya Nair", "Leo Martins"];
const SUBSCRIBER_COUNT = "12,400";
const PRIVACY_NOTE = "We only use your email to send the newsletter. Unsubscribe in one click.";
const PRIVACY_HREF = "#";

/**
 * Newsletter sign-up card over a dot grid whose glows drift and brighten
 * the dots they pass. The form only shows a thank-you state — wire
 * `handleSubmit` to your email provider.
 */
export function CtaNewsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(email);
    setEmail("");
  }

  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-card px-6 py-14 shadow-sm sm:px-12 sm:py-16 lg:px-16">
        {/* Fades the dots out behind the copy so the text stays easy to read. */}
        <DottedGlowBackground
          gap={16}
          opacity={0.22}
          glows={3}
          className="-z-10 [mask-image:linear-gradient(to_bottom,transparent_20%,black_70%)] lg:[mask-image:linear-gradient(to_right,transparent_30%,black_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-xl -translate-x-1/2 rounded-full bg-brand/15 blur-3xl"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <span className="grid size-11 place-items-center rounded-xl border bg-background/80 text-primary shadow-sm backdrop-blur">
              <MailIcon aria-hidden className="size-5" />
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {TITLE}
            </h2>
            <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">{COPY}</p>
            <div className="mt-8 flex items-center gap-4">
              <AvatarCircles aria-hidden people={SUBSCRIBERS} />
              <p className="text-sm text-muted-foreground">
                Join <span className="font-medium text-foreground">{SUBSCRIBER_COUNT}+</span> product
                builders
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-background/80 p-5 shadow-lg shadow-brand/5 backdrop-blur sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Label htmlFor={`${id}-email`}>Email address</Label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-describedby={`${id}-privacy`}
                  className="h-11 rounded-full bg-background px-4"
                />
                <Button type="submit" size="lg" className="h-11 rounded-full px-5">
                  Subscribe
                  <ArrowRightIcon aria-hidden />
                </Button>
              </div>
            </form>

            {/* Always rendered so screen readers announce the message when it appears. */}
            <p role="status" className="text-sm font-medium text-primary">
              {subscribed ? (
                <span className="mt-3 flex items-center gap-2">
                  <CheckCircle2Icon aria-hidden className="size-4 shrink-0" />
                  <span className="min-w-0 wrap-break-word">Thanks! Check {subscribed} to confirm.</span>
                </span>
              ) : null}
            </p>

            <p id={`${id}-privacy`} className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {PRIVACY_NOTE}{" "}
              <a
                href={PRIVACY_HREF}
                className="rounded-sm font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
