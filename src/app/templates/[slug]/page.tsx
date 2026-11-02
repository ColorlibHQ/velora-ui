import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon, CheckIcon } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TemplateShot } from "@/components/templates/template-shot";
import { proTemplateBySlug, proTemplates, templateStack } from "@/content/pro-templates";
import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return proTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = proTemplateBySlug(slug);
  if (!t) return {};
  return pageMetadata({
    absoluteTitle: `${t.name}: ${t.niche} dashboard template for Next.js | Velora Pro`,
    description: `${t.tagline} ${t.description}`,
    path: `/templates/${t.slug}`,
  });
}

export default async function ProTemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = proTemplateBySlug(slug);
  if (!t) notFound();
  const demo = `/demos/${t.slug}/`;
  const { pro } = siteConfig;

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Templates", path: "/templates" },
          { name: t.name, path: `/templates/${t.slug}` },
        ])}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pt-28 pb-24 lg:px-8">
        <Link href="/templates" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="size-4" aria-hidden /> Templates
        </Link>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-foreground">Velora Pro</span>
              <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{t.niche}</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance">{t.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{t.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={demo}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Live demo <ArrowUpRightIcon className="size-4" aria-hidden />
            </a>
            <Link
              href="/pricing"
              className="inline-flex h-10 items-center rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              {pro.onSale ? `Get All-Access · $${pro.allAccess.price}` : "Join the waitlist"}
            </Link>
          </div>
        </div>

        <a href={demo} className="mt-10 block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Open the ${t.name} live demo`}>
          <TemplateShot slug={t.slug} file="overview" alt={`${t.name} overview dashboard`} dark priority />
        </a>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
          {t.highlights.map((h) => (
            <li key={h} className="rounded-full border bg-card/50 px-3 py-1 text-sm text-muted-foreground">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {t.gallery.map((g) => (
            <TemplateShot key={g.file} slug={t.slug} file={g.file} alt={g.alt} />
          ))}
        </div>

        <section aria-labelledby="pages" className="mt-20">
          <h2 id="pages" className="text-2xl font-semibold tracking-tight">
            {t.pages.length} pages
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{t.description}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.pages.map((p) => (
              <li
                key={p.path}
                className="group/card relative rounded-2xl border bg-card/50 p-4 transition-colors focus-within:ring-2 focus-within:ring-ring hover:border-primary/40"
              >
                <h3 className="flex items-center justify-between font-medium">
                  <a href={`/demos/${t.slug}${p.path}`} className="outline-none after:absolute after:inset-0 after:rounded-2xl">
                    {p.title}
                  </a>
                  <ArrowUpRightIcon className="size-4 text-muted-foreground transition-transform group-hover/card:translate-x-0.5" aria-hidden />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stack" className="mt-20 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="stack" className="text-2xl font-semibold tracking-tight">What you get</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "The full Next.js project: run it, edit it, deploy it anywhere",
                "Every page wired to one data file, ready to swap for your API",
                "Pro blocks, the Data Grid and the chart kit, already included",
                "Light and dark themes from CSS variables; change four colours to rebrand",
                "Keyboard navigation, labelled controls and reduced-motion support",
                "Lifetime updates",
              ].map((f) => (
                <li key={f} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {templateStack.map((s) => (
                <li key={s} className="rounded-lg border bg-card/50 px-3 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Included with All-Access, alongside every Pro block and future template.{" "}
              <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
                See pricing
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
