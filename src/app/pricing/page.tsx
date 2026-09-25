import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, MinusIcon, RocketIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { ShimmerButton } from "@/components/velora/shimmer-button";
import { componentsMeta } from "@/lib/components-meta";

export const metadata: Metadata = {
  title: "Pricing",
  alternates: { canonical: "/pricing" },
  description:
    "Every component and the complete landing template are free forever. Pro adds more niches, more variants and more shortcuts — one-time payment.",
};

const freeFeatures = [
  `${componentsMeta.length} animated components`,
  "Complete multi-page SaaS template",
  "Blog, auth, changelog & contact pages",
  "Dark mode + full accessibility",
  "shadcn registry + CLI install",
  "MIT license — commercial use OK",
  "Community support",
];

const proFeatures = [
  "5 niche templates (AI, dev tool, mobile…)",
  "50+ section design variants",
  "Figma source file",
  "Waitlist, newsletter & Stripe wiring",
  "Team license included",
  "Private registry + lifetime updates",
  "Priority support",
];

const comparison: {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
}[] = [
  { feature: "Animated components", free: `${componentsMeta.length}`, pro: "All + variants" },
  { feature: "SaaS landing template", free: true, pro: true },
  { feature: "Blog, auth & changelog pages", free: true, pro: true },
  { feature: "Niche templates (AI, dev tool, mobile…)", free: false, pro: "5+" },
  { feature: "Section design variants", free: false, pro: "50+" },
  { feature: "Figma source file", free: false, pro: true },
  { feature: "Waitlist / newsletter / Stripe wiring", free: false, pro: true },
  { feature: "Reduced-motion & a11y support", free: true, pro: true },
  { feature: "Commercial use", free: true, pro: true },
  { feature: "Lifetime updates", free: true, pro: true },
  { feature: "License", free: "MIT", pro: "Commercial" },
];

const faqs = [
  {
    q: "Is the free tier really enough to ship?",
    a: "Yes. Everything on this site — every animation, page and section — is the free tier. If your product needs one great landing site, you never have to pay us anything.",
  },
  {
    q: "Is Pro a subscription?",
    a: "No. Pro is a one-time payment with lifetime access and lifetime updates. No renewals, no seat counting for small teams.",
  },
  {
    q: "How does this compare to Magic UI Pro or Aceternity Pro?",
    a: "Those run $169–$199 for templates and sections. Velora gives away a complete multi-page template for free and prices Pro at $99 — with a team license included instead of sold separately.",
  },
  {
    q: "What happens when Pro launches?",
    a: "Waitlist members get launch pricing and early access. The free tier stays free forever — Pro only ever adds breadth on top.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckIcon className="size-3" />
      </span>
    );
  if (value === false)
    return <MinusIcon className="inline size-4 text-muted-foreground/50" />;
  return <span className="text-sm font-medium">{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Free forever. <span className="text-primary">Pro when you scale.</span>
          </>
        }
        description="Every component and the complete landing template are MIT licensed and free. Pro adds more niches, more variants and more shortcuts — as a one-time payment."
      />

      {/* Plans */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 md:grid-cols-2 lg:px-8">
          <BlurFade>
            <div className="flex h-full flex-col rounded-2xl border bg-card p-8">
              <h2 className="text-lg font-semibold">Free</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything you see on this site.
              </p>
              <p className="mt-6 text-5xl font-semibold tracking-tight">
                $0
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  forever
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="lg"
                className="mt-8 w-full rounded-full"
                asChild
              >
                <Link href="/components">Browse components</Link>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.12}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-8">
              <BorderBeam size={80} duration={8} />
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primary">Pro</h2>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  Coming soon
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For teams shipping more than one page.
              </p>
              <p className="mt-6 text-5xl font-semibold tracking-tight">
                $99
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  lifetime
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <ShimmerButton className="mt-8 w-full">
                <RocketIcon className="size-4" />
                Join the waitlist
              </ShimmerButton>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              Compare plans
            </h2>
            <div className="mt-10 overflow-x-auto rounded-2xl border">
              <table className="w-full min-w-[32rem] border-collapse text-left">
                <thead>
                  <tr className="border-b bg-muted/40 text-sm">
                    <th className="p-4 font-medium">Feature</th>
                    <th className="w-32 p-4 text-center font-medium">Free</th>
                    <th className="w-32 p-4 text-center font-medium text-primary">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b last:border-0">
                      <td className="p-4 text-muted-foreground">
                        {row.feature}
                      </td>
                      <td className="p-4 text-center">
                        <Cell value={row.free} />
                      </td>
                      <td className="p-4 text-center">
                        <Cell value={row.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              Pricing questions
            </h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
