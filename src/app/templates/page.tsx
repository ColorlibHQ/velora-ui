import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CircleOffIcon,
  HistoryIcon,
  LayoutTemplateIcon,
  LogInIcon,
  MailIcon,
  TagIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { BlockThumbnail } from "@/components/docs/block-thumbnail";
import { CopyButton } from "@/components/docs/copy-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/template/waitlist-form";
import { BorderBeam } from "@/components/velora/border-beam";
import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Free Next.js landing page templates",
  description:
    "A free, MIT-licensed multi-page SaaS template built from Velora UI components — landing, pricing, MDX blog, changelog, about, contact, login, sign-up and 404. Clone the repo and ship it.",
  path: "/templates",
});

const pages: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    title: "Landing",
    description: "Animated hero, bento features, integrations, testimonials, pricing and FAQ",
    href: "/templates/saas",
    icon: LayoutTemplateIcon,
  },
  {
    title: "Pricing",
    description: "Free vs. Pro tiers with a feature comparison table",
    href: "/pricing",
    icon: TagIcon,
  },
  {
    title: "Blog",
    description: "MDX posts with an index, categories and reading time",
    href: "/blog",
    icon: BookOpenIcon,
  },
  {
    title: "Changelog",
    description: "A release timeline with version and tag badges",
    href: "/changelog",
    icon: HistoryIcon,
  },
  {
    title: "About",
    description: "Company story and principles",
    href: "/about",
    icon: UsersIcon,
  },
  {
    title: "Contact",
    description: "A labelled, frontend-only contact form",
    href: "/contact",
    icon: MailIcon,
  },
  {
    title: "Log in",
    description: "Split-screen auth page, ready for your provider",
    href: "/login",
    icon: LogInIcon,
  },
  {
    title: "Sign up",
    description: "Matching sign-up screen",
    href: "/signup",
    icon: UserPlusIcon,
  },
  {
    title: "404",
    description: "A styled not-found page",
    href: "/404",
    icon: CircleOffIcon,
  },
];

const clone = `git clone ${siteConfig.github}
cd velora-ui
pnpm install
pnpm dev`;

const niches = ["AI product", "Developer tool", "Mobile app", "Portfolio"];

export default function TemplatesPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Templates", path: "/templates" }])} />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pt-28 pb-24 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-balance">
          Free Next.js landing page templates
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Complete, multi-page sites assembled from Velora components. One template
          is available today — free and MIT licensed. Niche templates are coming with
          Velora Pro.
        </p>

        {/* The one template that exists today */}
        <section
          aria-labelledby="saas"
          className="mt-12 overflow-hidden rounded-3xl border bg-card/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="min-w-0 border-b p-3 sm:p-4 lg:col-span-3 lg:border-r lg:border-b-0">
              <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
                <div className="flex items-center gap-1.5 border-b px-3 py-2">
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
                    /templates/saas
                  </span>
                </div>
                <BlockThumbnail src="/templates/saas" />
              </div>
            </div>

            <div className="flex min-w-0 flex-col p-6 lg:col-span-2 lg:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-foreground">
                  Free
                </span>
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  MIT licensed
                </span>
              </div>
              <h2 id="saas" className="mt-4 text-2xl font-semibold tracking-tight">
                SaaS landing template
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A full product site: an animated landing page plus pricing, an MDX blog,
                changelog, about, contact, auth screens and a 404. Next.js 16, React 19,
                Tailwind CSS 4 and shadcn/ui — every section built from Velora components
                you can also install on their own.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/templates/saas"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Live preview
                  <ArrowRightIcon className="size-4" />
                </Link>
                <a
                  href={siteConfig.github}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Source on GitHub
                  <ArrowUpRightIcon className="size-4" />
                </a>
              </div>

              <h3 className="mt-8 text-sm font-medium">Clone it</h3>
              <div className="mt-2 overflow-hidden rounded-xl border bg-neutral-950 text-neutral-200">
                <div className="flex items-center justify-between border-b border-white/10 py-1.5 pr-1.5 pl-4">
                  <span className="font-mono text-xs text-neutral-400">Terminal</span>
                  <CopyButton
                    text={clone}
                    label="Copy clone commands"
                    className="border-white/15 bg-neutral-900 text-neutral-300"
                  />
                </div>
                <pre
                  tabIndex={0}
                  aria-label="Commands to clone and run the template"
                  className="overflow-x-auto p-4 font-mono text-xs leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <code>{clone}</code>
                </pre>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                The template ships inside the Velora repo. The landing page lives at{" "}
                <code className="font-mono text-foreground">
                  src/app/templates/saas/page.tsx
                </code>{" "}
                — move it to <code className="font-mono text-foreground">src/app/page.tsx</code>{" "}
                to make it your homepage, and swap the token block in{" "}
                <code className="font-mono text-foreground">globals.css</code> for your
                brand.
              </p>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section aria-labelledby="included" className="mt-20">
          <h2 id="included" className="text-2xl font-semibold tracking-tight">
            What&apos;s included
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Nine pages, all static-rendered, all live on this site — open any of them.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => {
              const Icon = page.icon;
              // /404 has no route of its own to prefetch.
              const Anchor = page.href === "/404" ? "a" : Link;
              return (
                <li
                  key={page.title}
                  className="group/card relative flex items-start gap-4 rounded-2xl border bg-card/50 p-4 transition-colors focus-within:ring-2 focus-within:ring-ring hover:border-primary/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium">
                      <Anchor
                        href={page.href}
                        className="outline-none after:absolute after:inset-0 after:rounded-2xl"
                      >
                        {page.title}
                      </Anchor>
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {page.description}
                    </p>
                  </div>
                  <ArrowRightIcon className="ml-auto size-4 shrink-0 self-center text-muted-foreground transition-transform group-hover/card:translate-x-0.5" />
                </li>
              );
            })}
          </ul>
        </section>

        {/* Pro */}
        <section
          id="pro"
          aria-labelledby="pro-heading"
          className="relative mt-20 overflow-hidden rounded-3xl border bg-card/50 p-6 sm:p-10"
        >
          <BorderBeam size={90} duration={9} />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-foreground">
                Coming soon
              </span>
              <h2
                id="pro-heading"
                className="mt-4 text-2xl font-semibold tracking-tight text-balance"
              >
                Pro niche templates
              </h2>
              <p className="mt-2 text-muted-foreground">
                Velora Pro adds templates for specific products, more section variants
                and a private registry — $99, paid once. It isn&apos;t out yet: join the
                waitlist and we&apos;ll email you when it opens.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {niches.map((niche) => (
                  <li
                    key={niche}
                    className="rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground"
                  >
                    {niche}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <Link
                  href="/pricing"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Compare Free and Pro →
                </Link>
              </p>
            </div>
            <WaitlistForm className="self-center" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
