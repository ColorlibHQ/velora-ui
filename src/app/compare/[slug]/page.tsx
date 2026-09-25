import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  comparisons,
  measuredOn,
  velora,
  type LibraryFacts,
} from "@/content/compare";
import { componentsMeta } from "@/lib/components-meta";
import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";

// A switching-guide row pointing at a missing component is a broken link.
for (const c of comparisons) {
  for (const [, ours] of c.equivalents) {
    if (!componentsMeta.some((m) => m.slug === ours)) {
      throw new Error(`compare/${c.slug}: no Velora component "${ours}"`);
    }
  }
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = comparisons.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    absoluteTitle: `Velora UI vs ${c.them.name}: a free, MIT ${c.them.name} alternative`,
    description: `${c.them.name} or Velora UI? A measured comparison of components, blocks, licence, price, reduced-motion support and install completeness — plus a component-by-component switching guide.`,
    path: `/compare/${slug}`,
    image: `/compare/${slug}/opengraph-image`,
  });
}

const rows: { label: string; value: (l: LibraryFacts) => string }[] = [
  { label: "Free components", value: (l) => String(l.freeComponents) },
  { label: "Free section blocks", value: (l) => l.freeBlocks },
  { label: "Templates", value: (l) => l.templates },
  { label: "Licence", value: (l) => l.license },
  { label: "Price", value: (l) => l.pricing },
  { label: "Tailwind CSS", value: (l) => l.tailwind },
  {
    label: "Reduced motion handled in source",
    value: (l) => `${l.reducedMotion} of ${l.freeComponents}`,
  },
  {
    label: "ARIA attributes or roles in source",
    value: (l) => `${l.aria} of ${l.freeComponents}`,
  },
  {
    label: "No npm dependencies",
    value: (l) => `${l.zeroDeps} of ${l.freeComponents}`,
  },
  {
    label: "CLI installs missing their keyframes",
    value: (l) => String(l.incompleteInstalls),
  },
];

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = comparisons.find((x) => x.slug === slug);
  if (!c) notFound();
  const title = (s: string) =>
    componentsMeta.find((m) => m.slug === s)?.title ?? s;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 pt-28 pb-24 lg:px-8">
        <JsonLd
          data={[
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: `Velora UI vs ${c.them.name}`, path: `/compare/${slug}` },
            ]),
          ]}
        />
        <p className="text-sm font-medium text-primary">Comparison</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance">
          Velora UI vs {c.them.name}
        </h1>
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          {c.summary}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Measured {measuredOn}. How we measured is{" "}
          <a
            href="#method"
            className="text-foreground underline underline-offset-4"
          >
            below
          </a>
          .
        </p>

        <div className="mt-10 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="sr-only">
              Velora UI and {c.them.name} compared, measured {measuredOn}
            </caption>
            <thead className="border-b bg-muted/40">
              <tr>
                <th
                  scope="col"
                  className="w-1/3 px-4 py-3 font-medium text-muted-foreground"
                >
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {velora.name}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  {c.them.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr key={row.label} className="align-top">
                  <th scope="row" className="px-4 py-3 font-medium">
                    {row.label}
                  </th>
                  <td className="px-4 py-3">{row.value(velora)}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.value(c.them)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section aria-labelledby="they-win">
            <h2 id="they-win" className="text-xl font-semibold">
              Where {c.them.name} is stronger
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {c.theyWin.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <CheckIcon
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="we-win">
            <h2 id="we-win" className="text-xl font-semibold">
              Where Velora UI is stronger
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {c.weWin.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <CheckIcon
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="switch" className="mt-16">
          <h2 id="switch" className="text-2xl font-semibold tracking-tight">
            Switching from {c.them.name}
          </h2>
          <p className="mt-2 text-muted-foreground">
            The closest Velora component for each {c.them.name} component. APIs
            differ, so check the props table on each page — most swaps take a
            few minutes.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                {c.them.name} components and their Velora equivalents
              </caption>
              <thead className="border-b bg-muted/40">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    {c.them.name}
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-medium">
                    Velora UI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {c.equivalents.map(([theirs, ours]) => (
                  <tr key={theirs}>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {theirs}
                    </td>
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/components/${ours}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {title(ours)}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          aria-labelledby="method"
          className="mt-16 rounded-xl border bg-card/50 p-6"
        >
          <h2 id="method" className="text-lg font-semibold">
            How we measured
          </h2>
          <div className="mt-3 space-y-3 text-sm text-muted-foreground">
            <p>
              On {measuredOn} we downloaded every free component each library
              publishes in its public shadcn registry and scanned the source
              with one script, run identically on all of them.
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-foreground">Reduced motion:</strong> the
                source checks <code>prefers-reduced-motion</code>, uses{" "}
                <code>useReducedMotion</code>, or uses Tailwind&apos;s{" "}
                <code>motion-safe:</code>/<code>motion-reduce:</code> variants.
                Mentioning it doesn&apos;t prove the behaviour is right — we
                audited and fixed our own components by hand — and a component
                that doesn&apos;t animate needs no check.
              </li>
              <li>
                <strong className="text-foreground">ARIA:</strong> the source
                sets an <code>aria-*</code> attribute or a <code>role</code>.
                Decorative components may rightly need neither.
              </li>
              <li>
                <strong className="text-foreground">
                  No npm dependencies:
                </strong>{" "}
                the registry item lists no <code>dependencies</code>.
              </li>
              <li>
                <strong className="text-foreground">Missing keyframes:</strong>{" "}
                the component uses a custom <code>animate-*</code> utility whose
                keyframes aren&apos;t included in its registry item, so a CLI
                install needs a manual CSS step. Tailwind&apos;s built-in
                animations and the ones every shadcn project ships are excluded.
              </li>
            </ul>
            <p>
              Prices and counts come from each library&apos;s own website on the
              same date. Spot a mistake?{" "}
              <a
                href="https://github.com/ColorlibHQ/velora-ui/issues"
                className="text-foreground underline underline-offset-4"
              >
                Open an issue
              </a>{" "}
              and we&apos;ll correct it.
            </p>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/components"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Browse all components
          </Link>
          <Link
            href="/blocks"
            className="inline-flex h-10 items-center rounded-lg border px-5 text-sm font-medium"
          >
            See the free blocks
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
