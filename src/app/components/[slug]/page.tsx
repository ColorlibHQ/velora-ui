import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleAlertIcon,
  FileTextIcon,
  PencilIcon,
  SparklesIcon,
} from "lucide-react";

import { componentExamples } from "@/content/components";
import { ComponentPreview } from "@/components/docs/component-preview";
import { CopyButton } from "@/components/docs/copy-button";
import { InstallTabs } from "@/components/docs/install-tabs";
import { OnThisPage, type TocItem } from "@/components/docs/on-this-page";
import { PropsTable } from "@/components/docs/props-table";
import { componentProps } from "@/lib/component-props";
import componentStats from "@/lib/component-stats.json";
import { categorySlug, componentsMeta } from "@/lib/components-meta";
import { buildCopyPrompt } from "@/lib/copy-prompt";
import { highlight } from "@/lib/highlight";
import { manualCss } from "@/lib/registry-css";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbs,
  pageMetadata,
  publisher,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const REGISTRY_BASE =
  process.env.NEXT_PUBLIC_REGISTRY_URL ?? `${siteConfig.url}/r`;

const stats = componentStats as Record<
  string,
  { bytes: number; gzip: number; deps: string[] }
>;

export function generateStaticParams() {
  return componentsMeta.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = componentsMeta.find((c) => c.slug === slug);
  if (!meta) return {};
  const s = stats[slug];
  const facts = [
    s && `${(s.gzip / 1024).toFixed(1)} KB gzipped`,
    s &&
      (s.deps.length
        ? `only depends on ${s.deps.join(", ")}`
        : "zero dependencies"),
    meta.a11y && "reduced-motion safe",
  ].filter(Boolean);
  return pageMetadata({
    absoluteTitle: `${meta.title} – React & Tailwind CSS Component | Velora UI`,
    description: `${meta.description} Free and MIT licensed: ${facts.join(", ")}. Install it with the shadcn CLI.`,
    path: `/components/${slug}`,
    image: `/components/${slug}/opengraph-image`,
  });
}

const readExample = (slug: string, name: string) =>
  fs.readFile(
    path.join(
      process.cwd(),
      "src/content/components",
      slug,
      "examples",
      `${name}.tsx`,
    ),
    "utf8",
  );

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-14 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight"
    >
      <a href={`#${id}`} className="hover:underline hover:underline-offset-4">
        {children}
      </a>
    </h2>
  );
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = componentsMeta.findIndex((c) => c.slug === slug);
  const meta = componentsMeta[index];
  if (!meta) notFound();

  const registryUrl = `${REGISTRY_BASE}/${slug}.json`;
  const target = `components/velora/${slug}.tsx`;
  const source = await fs.readFile(
    path.join(process.cwd(), "src/components/velora", `${slug}.tsx`),
    "utf8",
  );
  const css = manualCss(slug);
  const props = componentProps[slug];

  const examples = await Promise.all(
    meta.examples.map(async (ex) => {
      const code = await readExample(slug, ex.name);
      const Demo = componentExamples[slug]?.find(
        (e) => e.name === ex.name,
      )?.Component;
      return { ...ex, code, html: await highlight(code), Demo };
    }),
  );
  const [primary, ...more] = examples;

  const [sourceHtml, cssHtml, typeHtml] = await Promise.all([
    highlight(source),
    css ? highlight(css, "css") : null,
    Promise.all(
      (props?.types ?? []).map(async (t) => ({
        name: t.name,
        html: await highlight(t.source, "ts"),
      })),
    ),
  ]);

  const prompt = buildCopyPrompt({
    meta,
    props,
    registryUrl,
    example: primary.code,
  });
  const s = stats[slug];
  const chips = [
    s && `${(s.gzip / 1024).toFixed(1)} KB gzipped`,
    s &&
      (s.deps.length === 0
        ? "Zero dependencies"
        : `Deps: ${s.deps.join(", ")}`),
    meta.a11y && "Reduced-motion safe",
    "Base UI & Radix compatible",
  ].filter(Boolean) as string[];

  const prev = componentsMeta[index - 1];
  const next = componentsMeta[index + 1];
  const hasProps = !!props?.components.length;

  const toc: TocItem[] = [
    { id: "preview", title: "Preview" },
    { id: "installation", title: "Installation" },
    more.length > 0 && { id: "examples", title: "Examples" },
    hasProps && { id: "props", title: "Props" },
    meta.a11y && { id: "accessibility", title: "Accessibility" },
  ].filter(Boolean) as TocItem[];
  const contribute = [
    {
      text: "Edit on GitHub",
      href: `${siteConfig.github}/blob/main/src/components/velora/${slug}.tsx`,
      icon: PencilIcon,
    },
    {
      text: "Edit docs",
      href: `${siteConfig.github}/tree/main/src/content/components/${slug}`,
      icon: FileTextIcon,
    },
    {
      text: "Report an issue",
      href: `${siteConfig.github}/issues/new?title=${encodeURIComponent(`[${meta.title}] `)}`,
      icon: CircleAlertIcon,
    },
  ];

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-8">
      <article className="min-w-0">
        <JsonLd
          data={[
            breadcrumbs([
              { name: "Components", path: "/components" },
              {
                name: meta.category,
                path: `/components/category/${categorySlug(meta.category)}`,
              },
              { name: meta.title, path: `/components/${slug}` },
            ]),
            {
              "@type": "SoftwareSourceCode",
              name: `${meta.title} — Velora UI`,
              description: meta.description,
              url: absoluteUrl(`/components/${slug}`),
              codeRepository: siteConfig.github,
              programmingLanguage: ["TypeScript", "React"],
              runtimePlatform: "React",
              license: "https://opensource.org/licenses/MIT",
              isAccessibleForFree: true,
              publisher,
            },
          ]}
        />
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/components"
                className="transition-colors hover:text-foreground"
              >
                Components
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/components/category/${categorySlug(meta.category)}`}
                className="transition-colors hover:text-foreground"
              >
                {meta.category}
              </Link>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {meta.description}
        </p>
        {meta.credits && (
          <p className="mt-1.5 max-w-2xl text-xs text-muted-foreground/80">
            {meta.credits}
          </p>
        )}

        {/* Receipts — generated at build time by scripts/component-stats.mjs */}
        <ul className="mt-5 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {chip}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <CopyButton text={prompt} label="Copy prompt for AI agents">
            Copy prompt
          </CopyButton>
          <a
            href={`https://v0.app/chat/api/open?url=${encodeURIComponent(registryUrl)}`}
            target="_blank"
            rel="noopener"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SparklesIcon className="size-4" />
            Open in v0
          </a>
        </div>

        <section
          id="preview"
          aria-labelledby="preview-heading"
          className="mt-8 scroll-mt-24"
        >
          <h2 id="preview-heading" className="sr-only">
            Preview
          </h2>
          <ComponentPreview
            title={meta.title}
            code={primary.code}
            highlighted={primary.html}
          >
            {primary.Demo ? <primary.Demo /> : null}
          </ComponentPreview>
        </section>

        <SectionHeading id="installation">Installation</SectionHeading>
        <InstallTabs
          registryUrl={registryUrl}
          dependencies={meta.dependencies}
          target={target}
          source={source}
          sourceHtml={sourceHtml}
          css={css}
          cssHtml={cssHtml}
        />

        {more.length > 0 && (
          <>
            <SectionHeading id="examples">Examples</SectionHeading>
            <div className="space-y-12">
              {more.map((ex) => (
                <section key={ex.name} aria-labelledby={`example-${ex.name}`}>
                  <h3 id={`example-${ex.name}`} className="font-semibold">
                    {ex.title}
                  </h3>
                  {ex.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ex.description}
                    </p>
                  )}
                  <ComponentPreview
                    className="mt-4"
                    title={`${meta.title}: ${ex.title}`}
                    code={ex.code}
                    highlighted={ex.html}
                  >
                    {ex.Demo ? <ex.Demo /> : null}
                  </ComponentPreview>
                </section>
              ))}
            </div>
          </>
        )}

        {hasProps && (
          <>
            <SectionHeading id="props">Props</SectionHeading>
            <PropsTable doc={props} highlightedTypes={typeHtml} />
          </>
        )}

        {meta.a11y && (
          <>
            <SectionHeading id="accessibility">Accessibility</SectionHeading>
            <dl className="divide-y rounded-xl border text-sm">
              {[
                ["Reduced motion", meta.a11y.motion],
                [
                  "Keyboard",
                  meta.a11y.keyboard ?? "Decorative — nothing to operate.",
                ],
                ["Screen readers", meta.a11y.screenReader],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="font-medium">{term}</dt>
                  <dd className="text-muted-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        <nav
          aria-label="More components"
          className="mt-16 flex items-center justify-between gap-4 border-t pt-6 text-sm"
        >
          {prev ? (
            <Link
              href={`/components/${prev.slug}`}
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeftIcon className="size-4" />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/components/${next.slug}`}
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {next.title}
              <ChevronRightIcon className="size-4" />
            </Link>
          )}
        </nav>
      </article>

      <aside
        aria-label="Page outline and links"
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto xl:block"
      >
        <OnThisPage items={toc} />
        <ul className="mt-6 space-y-2 border-t border-border/60 pt-5 text-sm">
          {contribute.map(({ text, href, icon: Icon }) => (
            <li key={text}>
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-3.5 shrink-0" aria-hidden />
                {text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
