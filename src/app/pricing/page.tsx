import Link from "next/link";
import { ArrowRightIcon, CheckIcon, MinusIcon } from "lucide-react";

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
import { blockCategories, freeBlocks, proBlocks } from "@/lib/blocks-meta";
import { componentsMeta } from "@/lib/components-meta";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const { pro } = siteConfig;
const proCategories = blockCategories.filter((c) => c.pro).length;

export const metadata = pageMetadata({
  title: "Pricing",
  description: `Components and marketing sections are free and MIT licensed. Velora Pro adds ${proBlocks.length} application blocks for dashboards and SaaS apps — $${pro.personal.price} once, lifetime updates.`,
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    price: 0,
    unit: "forever",
    blurb: "Landing pages",
    features: [
      `${componentsMeta.length} animated components`,
      `${freeBlocks.length} marketing sections`,
      "SaaS landing template",
      "shadcn CLI install",
      "MIT license",
    ],
    cta: { label: "Browse components", href: "/components" },
  },
  {
    name: "Personal",
    price: pro.personal.price,
    unit: "once",
    blurb: "One developer",
    features: [
      "Everything in Free",
      `${proBlocks.length} application blocks`,
      `${proCategories} categories: KPIs, charts, tables, AI…`,
      "Chart kit + theme tokens",
      "Lifetime updates",
    ],
    cta: { label: "Get Personal", href: pro.personal.checkout },
    featured: true,
  },
  {
    name: "Team",
    price: pro.team.price,
    unit: "once",
    blurb: "Up to 10 developers",
    features: [
      "Everything in Personal",
      "10 developer seats",
      "One organization",
      "Unlimited end products",
      "Lifetime updates",
    ],
    cta: { label: "Get Team", href: pro.team.checkout },
  },
] as const;

const comparison: {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
}[] = [
  {
    feature: "Animated components",
    free: `${componentsMeta.length}`,
    pro: `${componentsMeta.length}`,
  },
  {
    feature: "Marketing sections",
    free: `${freeBlocks.length}`,
    pro: `${freeBlocks.length}`,
  },
  { feature: "SaaS landing template", free: true, pro: true },
  { feature: "Application blocks", free: false, pro: `${proBlocks.length}` },
  { feature: "Chart kit (Recharts)", free: false, pro: true },
  { feature: "Works without Next.js", free: true, pro: true },
  { feature: "Dark mode + reduced motion", free: true, pro: true },
  { feature: "Commercial use", free: true, pro: true },
  { feature: "Lifetime updates", free: true, pro: true },
  { feature: "License", free: "MIT", pro: "Commercial" },
];

const faqs = [
  {
    q: "Is Pro a subscription?",
    a: "No. One payment, lifetime access and lifetime updates.",
  },
  {
    q: "What's the difference between Personal and Team?",
    a: "Seats. Personal covers one developer; Team covers up to 10 in one organization. Both allow unlimited end products, including client work.",
  },
  {
    q: "How do I get the code?",
    a: "Checkout runs on dashboardpack.com, our template store. After paying, download the zip from your account there; new versions appear in the same place.",
  },
  {
    q: "Can I see the blocks before buying?",
    a: "Yes. Every Pro block has a live, responsive preview on the blocks page, in light and dark mode.",
  },
  {
    q: "Does the free tier change?",
    a: "No. Components and marketing sections stay free and MIT licensed.",
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckIcon className="size-3" />
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === false)
    return (
      <>
        <MinusIcon
          className="inline size-4 text-muted-foreground/50"
          aria-hidden
        />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-sm font-medium tabular-nums">{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Free components.{" "}
            <span className="text-primary">Pro app blocks.</span>
          </>
        }
        description="One-time payment. Lifetime updates."
      />

      {/* Plans */}
      <section className="pb-12">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 lg:px-8">
          {plans.map((plan, i) => {
            const external = plan.cta.href.startsWith("http");
            const featured = "featured" in plan && plan.featured;
            return (
              <BlurFade key={plan.name} delay={i * 0.08}>
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-8",
                    featured && "border-primary/40",
                  )}
                >
                  {featured && <BorderBeam size={80} duration={8} />}
                  <div className="flex items-center justify-between">
                    <h2
                      className={cn(
                        "text-lg font-semibold",
                        featured && "text-primary",
                      )}
                    >
                      {plan.name}
                    </h2>
                    {plan.price > 0 && (
                      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-foreground">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.blurb}
                  </p>
                  <p className="mt-6 text-5xl font-semibold tracking-tight tabular-nums">
                    ${plan.price}
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      {plan.unit}
                    </span>
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <CheckIcon className="size-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={featured ? "default" : "outline"}
                    size="lg"
                    className="mt-8 w-full rounded-full"
                    asChild
                  >
                    {external ? (
                      <a href={plan.cta.href}>{plan.cta.label}</a>
                    ) : (
                      <Link href={plan.cta.href}>{plan.cta.label}</Link>
                    )}
                  </Button>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* Club Pass */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <h2 className="font-semibold">Lifetime Club Pass</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Velora Pro + every DashboardPack admin template, from $495 once.
              </p>
            </div>
            <a
              href={pro.clubPass}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              See the Club Pass
              <ArrowRightIcon className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              Compare plans
            </h2>
            <div className="relative mt-10 overflow-x-auto rounded-2xl border">
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
