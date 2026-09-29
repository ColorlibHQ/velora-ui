import Link from "next/link";
import {
  ArrowRightIcon,
  CodeIcon,
  GitPullRequestIcon,
  PlusIcon,
  RocketIcon,
  SendIcon,
  SparklesIcon,
} from "lucide-react";

import { BlockThumbnail } from "@/components/docs/block-thumbnail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GridPattern } from "@/components/velora/grid-pattern";
import { showcase, type ShowcaseEntry } from "@/content/showcase";
import { blocksMeta } from "@/lib/blocks-meta";
import { componentsMeta } from "@/lib/components-meta";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Showcase: built with Velora",
  description:
    "Sites and templates built with Velora UI's free animated React components and blocks. Built something with Velora? Submit it to be featured.",
  path: "/showcase",
});

const SUBMIT_URL = `${siteConfig.github}/issues/new?template=showcase.yml`;
const DATA_URL = `${siteConfig.github}/blob/main/src/content/showcase.ts`;

/** A showcase chip is a link, so every slug must exist — fail the build if not. */
function resolveUse(slug: string) {
  const component = componentsMeta.find((c) => c.slug === slug);
  if (component) return { title: component.title, href: `/components/${slug}` };
  const block = blocksMeta.find((b) => b.slug === slug);
  if (block) return { title: block.title, href: `/blocks/${block.category}#${slug}` };
  throw new Error(`showcase: "${slug}" is not a Velora component or block`);
}

for (const entry of showcase) entry.uses.forEach(resolveUse);

const steps = [
  {
    icon: RocketIcon,
    title: "Ship it",
    body: "Use Velora components or blocks on a live, public site — a product, a portfolio, docs, a client project.",
  },
  {
    icon: SendIcon,
    title: "Send it in",
    body: "The GitHub form asks for the URL, the Velora pieces you used, a screenshot, and your permission to feature it.",
  },
  {
    icon: SparklesIcon,
    title: "Get featured",
    body: "We check the site, add a card for it here with a link back to you, and close the issue with a note.",
  },
];

function SubmitButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SUBMIT_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
    >
      <PlusIcon aria-hidden className="size-4" />
      Submit your site
      <span className="sr-only">(opens a GitHub issue form)</span>
    </a>
  );
}

function Preview({ entry }: { entry: ShowcaseEntry }) {
  if ("live" in entry.preview) return <BlockThumbnail src={entry.preview.live} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized screenshot
    <img
      src={entry.preview.image}
      alt=""
      width={1280}
      height={800}
      loading="lazy"
      decoding="async"
      className="aspect-[16/10] w-full bg-muted object-cover object-top"
    />
  );
}

function EntryCard({ entry }: { entry: ShowcaseEntry }) {
  const internal = entry.url.startsWith("/");
  const uses = entry.uses.map((slug) => ({ slug, ...resolveUse(slug) }));

  return (
    <li className="group/card relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card/50 transition-all focus-within:ring-2 focus-within:ring-ring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <div className="border-b">
        <Preview entry={entry} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">
            {internal ? (
              <Link href={entry.url} className="outline-none after:absolute after:inset-0">
                {entry.name}
              </Link>
            ) : (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener"
                className="outline-none after:absolute after:inset-0"
              >
                {entry.name}
              </a>
            )}
          </h3>
          <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
            {entry.kind}
          </span>
          {entry.byColorlib && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Made by us
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-pretty text-muted-foreground">{entry.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          By{" "}
          {entry.authorUrl ? (
            <a
              href={entry.authorUrl}
              target="_blank"
              rel="noopener"
              className="relative z-10 text-foreground underline-offset-4 hover:underline"
            >
              {entry.author}
            </a>
          ) : (
            <span className="text-foreground">{entry.author}</span>
          )}
          {entry.byColorlib && ", the team behind Velora"}
        </p>

        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground">Uses</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {uses.map((u) => (
              <li key={u.slug}>
                <Link
                  href={u.href}
                  className="relative z-10 inline-flex rounded-md border bg-background px-2 py-0.5 text-xs transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {u.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm">
          <span className="inline-flex items-center gap-1 font-medium">
            {internal ? "View the template" : "Visit site"}
            <ArrowRightIcon
              aria-hidden
              className="size-3.5 transition-transform group-hover/card:translate-x-0.5"
            />
          </span>
          {entry.sourceUrl && (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener"
              className="relative z-10 inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <CodeIcon aria-hidden className="size-3.5" />
              Source
              <span className="sr-only"> for {entry.name} on GitHub</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

function SubmitCard() {
  return (
    <li className="relative flex min-w-0 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 py-12 text-center">
      <span
        aria-hidden
        className="flex size-12 items-center justify-center rounded-full border bg-background shadow-sm"
      >
        <PlusIcon className="size-5 text-primary" />
      </span>
      <h3 className="mt-5 font-medium">Your site here</h3>
      <p className="mt-2 max-w-xs text-sm text-pretty text-muted-foreground">
        Built something with Velora? Send it in — the form takes about two minutes.
      </p>
      <SubmitButton className="mt-6" />
    </li>
  );
}

export default function ShowcasePage() {
  const count = showcase.length;
  const thirdParty = showcase.filter((e) => !e.byColorlib).length;

  return (
    <>
      <SiteHeader />
      <main>
        <JsonLd
          data={[
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Showcase", path: "/showcase" },
            ]),
            {
              "@type": "CollectionPage",
              name: "Built with Velora",
              url: absoluteUrl("/showcase"),
              hasPart: showcase.map((e) => ({
                "@type": "CreativeWork",
                name: e.name,
                url: e.url.startsWith("/") ? absoluteUrl(e.url) : e.url,
                author: { "@type": "Organization", name: e.author },
              })),
            },
          ]}
        />

        <section className="relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-16">
          <GridPattern
            width={48}
            height={48}
            className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium text-primary">Showcase</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
              Built with Velora
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">
              Sites and templates made with Velora&apos;s free components and blocks, each with the
              pieces it uses so you can borrow the idea. The showcase is brand new
              {thirdParty === 0 ? ", so the first entry is our own" : ""} — yours could be
              next.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <SubmitButton />
              <a
                href="#how"
                className="inline-flex h-10 items-center rounded-lg border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                How featuring works
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="sites" className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <div className="flex items-baseline justify-between gap-4 border-b pb-3">
            <h2 id="sites" className="text-sm font-medium">
              {count} {count === 1 ? "site" : "sites"} so far
            </h2>
            <a
              href={DATA_URL}
              target="_blank"
              rel="noopener"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Showcase data on GitHub
            </a>
          </div>
          <ul
            className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 ${
              count >= 2 ? "lg:grid-cols-3" : "lg:mx-auto lg:max-w-4xl"
            }`}
          >
            {showcase.map((entry) => (
              <EntryCard key={entry.url} entry={entry} />
            ))}
            <SubmitCard />
          </ul>
        </section>

        <section
          id="how"
          aria-labelledby="how-heading"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-24 lg:px-8"
        >
          <h2 id="how-heading" className="text-2xl font-semibold tracking-tight lg:text-3xl">
            How to get featured
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            It&apos;s free, and it happens in public: each submission is a GitHub issue, so
            you can follow it from form to card.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border bg-card/50 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon aria-hidden className="size-4" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-medium">{step.title}</h3>
                <p className="mt-1.5 text-sm text-pretty text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
            <p className="rounded-2xl border border-dashed p-5">
              <strong className="font-medium text-foreground">What we look for.</strong> A
              live site that uses Velora where visitors can see it, and that you own or are
              allowed to submit. We don&apos;t feature placeholder pages, and we never add
              logos, quotes or names without the owner&apos;s permission.
            </p>
            <p className="rounded-2xl border border-dashed p-5">
              <GitPullRequestIcon aria-hidden className="mr-1.5 inline size-4 align-[-3px]" />
              <strong className="font-medium text-foreground">Prefer a pull request?</strong>{" "}
              Each entry is one object in{" "}
              <a
                href={DATA_URL}
                target="_blank"
                rel="noopener"
                className="font-mono text-[0.9em] text-foreground underline underline-offset-4"
              >
                src/content/showcase.ts
              </a>
              , with a 16:10 screenshot in <code className="font-mono text-[0.9em] text-foreground">public/showcase/</code>.
              The build checks that every component you list exists.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pt-20 pb-24 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 max-w-2xl rounded-full bg-gradient-to-r from-brand-from via-brand-via to-brand-to opacity-20 blur-3xl"
            />
            <h2 className="relative text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
              Shipped something with Velora?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Show it off. Featured sites get a card on this page with a link back — and
              you help the next person see what the components look like in the wild.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <SubmitButton />
              <Link
                href="/components"
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Browse components
                <ArrowRightIcon aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
