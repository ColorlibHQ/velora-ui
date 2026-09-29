import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "You're on the waitlist",
  description: "Your email is confirmed — you'll get early access and launch pricing when Velora Pro opens.",
  path: "/waitlist/confirmed",
  noindex: true,
});

/** Sendy redirects here after someone clicks the confirmation link. */
export default function WaitlistConfirmedPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden px-4 pt-40 pb-32 text-center">
        <AuroraBackground intensity="subtle" />
        <div className="relative mx-auto max-w-xl">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <CheckIcon className="size-6" />
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">You&apos;re on the list</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your email is confirmed. You&apos;ll get early access and launch pricing the
            moment Velora Pro opens — and nothing else in between.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Meanwhile, everything free is yours to use today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/blocks"
              className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              Browse free blocks
            </Link>
            <Link
              href="/components"
              className="inline-flex h-10 items-center rounded-lg border bg-background/60 px-5 text-sm font-medium"
            >
              See all components
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
