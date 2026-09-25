import { MessageCircleIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AvatarCircles } from "@/components/velora/avatar-circles";
import { BlurFade } from "@/components/velora/blur-fade";
import { DotPattern } from "@/components/velora/grid-pattern";

const FAQS = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Sign up with your work email and you get every feature for 14 days — no credit card needed. When the trial ends you can pick a plan or drop to the free tier; nothing is deleted either way.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Upgrades take effect immediately and are prorated to the day. Downgrades apply at the end of your current billing period, so you never lose time you've paid for.",
  },
  {
    question: "Who counts as a paid seat?",
    answer:
      "Anyone who can create or edit work. Viewers, commenters and external guests are free and unlimited on every paid plan.",
  },
  {
    question: "Can I import from the tools we already use?",
    answer:
      "Our importers bring over projects, docs, comments and attachments from most popular project and wiki tools in a few minutes. For large workspaces, our team will run the migration with you.",
  },
  {
    question: "Where is our data stored, and is it secure?",
    answer:
      "Data is encrypted in transit and at rest, stored in the EU or US region of your choice, and backed up every hour. We're SOC 2 Type II audited and publish our security report on request.",
  },
  {
    question: "Does it work offline?",
    answer:
      "The desktop and mobile apps keep your recent projects available offline and sync your changes the moment you reconnect.",
  },
  {
    question: "Do you offer discounts for non-profits or education?",
    answer:
      "Registered non-profits, schools and universities get 50% off any paid plan. Send us proof of status from your organisation's email and we'll apply it the same day.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "From Settings → Billing, in two clicks. You keep access until the end of the period, and you can export your whole workspace at any time.",
  },
];

const SUPPORT_TEAM = ["Nora Vance", "Luis Ortega", "Amara Obi"];

/**
 * Centered FAQ: a single-open accordion of common questions, then a
 * contact row for anything the list doesn't answer.
 */
export function FaqAccordion() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <DotPattern
        aria-hidden
        className="absolute inset-0 -z-10 size-full fill-foreground/10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_55%)]"
      />

      <div className="mx-auto max-w-3xl">
        <BlurFade className="text-center">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Questions, answered
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            Everything you need to know about trials, billing and your data.
            Can&apos;t find what you&apos;re looking for? We&apos;re a message
            away.
          </p>
        </BlurFade>

        <BlurFade delay={0.1} className="mt-14">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="rounded-2xl border bg-card/80 px-6 shadow-sm backdrop-blur sm:px-8"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger className="py-5 text-base hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-5 text-[0.9375rem] leading-relaxed text-pretty text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>

        <BlurFade delay={0.2} className="mt-10">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed bg-muted/40 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
            <AvatarCircles
              people={SUPPORT_TEAM}
              aria-hidden
              className="shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold">Still have questions?</h3>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">
                Our support team replies within a few hours, every day of the
                week.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-10 shrink-0 rounded-full px-5"
            >
              <a href="#">
                <MessageCircleIcon aria-hidden />
                Contact support
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
