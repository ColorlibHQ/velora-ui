import {
  ArrowUpRightIcon,
  BookOpenIcon,
  MailIcon,
  MessagesSquareIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/velora/blur-fade";
import { SpotlightCard } from "@/components/velora/spotlight-card";

const FAQS = [
  {
    question: "What exactly is Lumen?",
    answer:
      "Lumen is an analytics workspace for product teams. It connects to your warehouse, lets anyone explore events without SQL, and turns the answers into dashboards your whole company can read.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams see their first dashboard within an hour. Connect your warehouse, pick the tables that hold your events, and Lumen maps users, sessions and properties for you.",
  },
  {
    question: "Which data sources do you support?",
    answer:
      "All the major cloud warehouses, Postgres and MySQL, plus event streams through our SDKs for web, iOS, Android and server-side languages. New connectors ship every month.",
  },
  {
    question: "Do you copy our data?",
    answer:
      "No. Queries run directly in your warehouse, and only aggregated results are cached — encrypted and for at most 24 hours. Your raw events never leave your infrastructure.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "By the number of tracked users per month, not by seats — invite your whole company at no extra cost. If you go over your limit, we'll let you know before anything changes on your bill.",
  },
  {
    question: "Can we self-host Lumen?",
    answer:
      "Self-hosting is available on the Enterprise plan as a container you run in your own cloud account, with the same release cadence as our hosted version.",
  },
  {
    question: "What happens to our dashboards if we leave?",
    answer:
      "You can export every dashboard as SQL and every chart as CSV or PNG at any time. After cancellation your workspace stays readable for 30 days, then it's permanently deleted.",
  },
];

const CONTACTS = [
  {
    icon: MessagesSquareIcon,
    label: "Chat with the team",
    detail: "Replies in under 10 minutes",
    href: "#",
  },
  {
    icon: MailIcon,
    label: "hello@lumen.example",
    detail: "For billing and contracts",
    href: "#",
  },
  {
    icon: BookOpenIcon,
    label: "Read the docs",
    detail: "Guides, API and changelog",
    href: "#",
  },
];

/**
 * Two-column FAQ: the heading and ways to get in touch stay pinned on the
 * left on wide screens while the numbered questions scroll on the right.
 */
export function FaqTwoColumn() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <BlurFade className="lg:sticky lg:top-12">
            <p className="text-sm font-medium text-primary">Support</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Frequently asked questions
            </h2>
            <p className="mt-5 text-lg text-pretty text-muted-foreground">
              The short answers to what teams ask before switching to Lumen. For
              anything else, a real person is on the other end.
            </p>

            <SpotlightCard className="mt-10 p-2">
              <ul className="divide-y">
                {CONTACTS.map(({ icon: Icon, label, detail, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group/contact flex items-center gap-4 rounded-xl p-4 outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background">
                        <Icon aria-hidden className="size-5 text-primary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {label}
                        </span>
                        <span className="block text-sm text-muted-foreground">
                          {detail}
                        </span>
                      </span>
                      <ArrowUpRightIcon
                        aria-hidden
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5 group-hover/contact:text-foreground motion-reduce:transition-none"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </BlurFade>
        </div>

        <BlurFade delay={0.1} className="lg:col-span-7">
          <Accordion
            type="multiple"
            defaultValue={["item-0"]}
            className="border-t"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`item-${i}`}
                className="border-b"
              >
                <AccordionTrigger className="gap-4 py-6 text-base hover:no-underline sm:text-lg">
                  <span className="flex gap-4 sm:gap-6">
                    <span
                      aria-hidden
                      className="mt-0.5 font-mono text-sm text-muted-foreground tabular-nums group-aria-expanded/accordion-trigger:text-primary sm:mt-1"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-6 pl-8 text-[0.9375rem] leading-relaxed text-pretty text-muted-foreground sm:pl-10">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}
