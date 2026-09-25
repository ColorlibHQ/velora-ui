import Link from "next/link";

import { CopyButton } from "@/components/docs/copy-button";
import { PackageManagerCommand } from "@/components/docs/install-tabs";
import { highlight } from "@/lib/highlight";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const REGISTRY = `${siteConfig.url}/r/{name}.json`;

export const metadata = pageMetadata({
  title: "Get started",
  description:
    "Install Velora UI components with the shadcn CLI: requirements, the @velora registry namespace, AI agent setup (MCP, llms.txt) and theming in one page.",
  path: "/components/get-started",
});

const componentsJson = `{
  "registries": {
    "@velora": "${REGISTRY}"
  }
}`;

const usage = `import { Marquee } from "@/components/velora/marquee";

export function Logos() {
  return (
    <Marquee pauseOnHover>
      <span>Acme</span>
      <span>Northwind</span>
      <span>Lumen</span>
    </Marquee>
  );
}`;

function Code({ html, text, label }: { html: string; text: string; label: string }) {
  return (
    <div className="relative mt-3">
      <CopyButton
        text={text}
        label={`Copy ${label}`}
        className="absolute top-3 right-3 z-10 border-white/15 bg-neutral-900 text-neutral-300"
      />
      <div
        className="overflow-x-auto rounded-xl border text-sm [&_pre]:p-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function Step({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted-foreground [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground">
        {children}
      </div>
    </section>
  );
}

export default async function GetStartedPage() {
  const [jsonHtml, usageHtml] = await Promise.all([
    highlight(componentsJson, "ts"),
    highlight(usage),
  ]);

  return (
    <article className="max-w-3xl">
      <JsonLd
        data={[
          breadcrumbs([
            { name: "Components", path: "/components" },
            { name: "Get started", path: "/components/get-started" },
          ]),
          {
            "@type": "TechArticle",
            headline: "Get started with Velora UI",
            url: absoluteUrl("/components/get-started"),
          },
        ]}
      />
      <h1 className="text-4xl font-semibold tracking-tight">Get started</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Velora components are source files you own. The shadcn CLI copies them into your
        project with the keyframes, tokens and dependencies they need — there is no Velora
        package to install or update.
      </p>

      <Step id="requirements" title="1. Requirements">
        <p>
          React 19, Tailwind CSS v4 and a shadcn/ui project. Starting fresh? Create one with:
        </p>
        <PackageManagerCommand type="dlx" args="shadcn@latest init" />
        <p>
          Velora doesn&apos;t import Radix or Base UI, so it works whichever primitive layer
          your shadcn project uses. About half the components need{" "}
          <code>motion</code>; the CLI installs it when one does.
        </p>
      </Step>

      <Step id="add" title="2. Add a component">
        <p>Every component page has its install command. Paste the registry URL:</p>
        <PackageManagerCommand type="dlx" args={`shadcn@latest add ${siteConfig.url}/r/marquee.json`} />
        <p>
          That writes <code>components/velora/marquee.tsx</code> and merges any keyframes and
          brand tokens into your <code>globals.css</code>. Then use it:
        </p>
        <Code html={usageHtml} text={usage} label="usage example" />
        <p>
          <Link href="/blocks" className="text-foreground underline underline-offset-4">
            Blocks
          </Link>{" "}
          install the same way and bring every component they use along.
        </p>
      </Step>

      <Step id="namespace" title="3. Use the @velora namespace (optional)">
        <p>Register Velora once and install by name instead of URL:</p>
        <PackageManagerCommand type="dlx" args={`shadcn@latest registry add @velora=${REGISTRY}`} />
        <p>
          or add it to <code>components.json</code> yourself:
        </p>
        <Code html={jsonHtml} text={componentsJson} label="components.json registries" />
        <p>Then:</p>
        <PackageManagerCommand type="dlx" args="shadcn@latest add @velora/marquee @velora/hero-globe" />
      </Step>

      <Step id="ai" title="4. Let your AI agent do it">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">shadcn MCP server:</strong> run{" "}
            <code>npx shadcn@latest mcp init</code> and, with the <code>@velora</code> namespace
            registered, agents in Cursor, Claude Code or VS Code can search and install Velora
            components for you.
          </li>
          <li>
            <strong className="text-foreground">Copy prompt:</strong> every component page has a
            button that copies the install command, a working example and the props — paste it
            into any chat.
          </li>
          <li>
            <strong className="text-foreground">llms.txt:</strong>{" "}
            <a href="/llms.txt" className="text-foreground underline underline-offset-4">
              /llms.txt
            </a>{" "}
            indexes everything;{" "}
            <a href="/llms-full.txt" className="text-foreground underline underline-offset-4">
              /llms-full.txt
            </a>{" "}
            adds props, accessibility notes and an example for every component.
          </li>
        </ul>
      </Step>

      <Step id="theming" title="5. Make it yours">
        <p>
          Gradients, beams and glows read four brand variables (<code>--brand</code>,{" "}
          <code>--brand-from</code>, <code>--brand-via</code>, <code>--brand-to</code>) that the
          CLI adds to your CSS, next to your shadcn tokens. Change them and every component
          follows —{" "}
          <Link href="/themes" className="text-foreground underline underline-offset-4">
            pick a preset on the themes page
          </Link>
          .
        </p>
      </Step>

      <Step id="accessibility" title="6. Accessibility, built in">
        <p>
          Every animated component respects <code>prefers-reduced-motion</code> on its own —
          so it still does after you install it — and each docs page lists what reduced-motion,
          keyboard and screen-reader users get. Anything that loops pauses on hover and focus.
        </p>
      </Step>

      <p className="mt-14">
        <Link
          href="/components"
          className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
        >
          Browse the components
        </Link>
      </p>
    </article>
  );
}
