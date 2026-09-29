import Link from "next/link";

import { CopyButton } from "@/components/docs/copy-button";
import { PackageManagerCommand } from "@/components/docs/install-tabs";
import { blocksMeta } from "@/lib/blocks-meta";
import { componentsMeta } from "@/lib/components-meta";
import { highlight } from "@/lib/highlight";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/*
 * Every command and config below was checked against the shadcn docs
 * (ui.shadcn.com/docs/mcp, /docs/registry/namespace, /docs/registry/open-in-v0)
 * and run with shadcn 4.21.0 on September 29, 2026. Re-check before editing.
 */

const REGISTRY = `${siteConfig.url}/r/{name}.json`;

export const metadata = pageMetadata({
  title: "AI & MCP",
  description:
    "Let AI coding agents find and install Velora UI: set up the shadcn MCP server in Claude Code, Cursor, VS Code or Windsurf, register the @velora namespace, and use Copy prompt, llms.txt and Open in v0.",
  path: "/components/ai",
});

const componentsJson = `{
  "registries": {
    "@velora": "${REGISTRY}"
  }
}`;

const mcpServers = `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`;

const vscodeServers = `{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`;

const prompts = [
  "Show me the components in the @velora registry",
  "Add @velora/marquee and use it for the logo strip on the home page",
  "Build a landing page from the hero, features and pricing blocks in @velora",
  "Find a Velora background for the hero and make it respect reduced motion",
];

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

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-14">
      <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted-foreground [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground">
        {children}
      </div>
    </section>
  );
}

function Client({
  id,
  name,
  file,
  children,
}: {
  id: string;
  name: string;
  file: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card/50 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={id} className="scroll-mt-24 font-medium text-foreground">
          {name}
        </h3>
        <code className="text-xs">{file}</code>
      </div>
      <div className="mt-3 space-y-3 text-sm">{children}</div>
    </div>
  );
}

const linkClass = "text-foreground underline underline-offset-4";

export default async function AiPage() {
  const [jsonHtml, serversHtml, vscodeHtml] = await Promise.all([
    highlight(componentsJson, "ts"),
    highlight(mcpServers, "ts"),
    highlight(vscodeServers, "ts"),
  ]);

  return (
    <article className="max-w-3xl">
      <JsonLd
        data={[
          breadcrumbs([
            { name: "Components", path: "/components" },
            { name: "AI & MCP", path: "/components/ai" },
          ]),
          {
            "@type": "TechArticle",
            headline: "Use Velora UI with AI coding agents",
            description:
              "Set up the shadcn MCP server, register the @velora namespace, and use Copy prompt, llms.txt and Open in v0.",
            url: absoluteUrl("/components/ai"),
          },
        ]}
      />
      <h1 className="text-4xl font-semibold tracking-tight">AI &amp; MCP</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Velora is a shadcn registry, so any agent that can run the shadcn CLI can find and
        install it. Register the <code className="font-mono text-[0.9em] text-foreground">@velora</code>{" "}
        namespace once, and your agent can search all {componentsMeta.length} components and{" "}
        {blocksMeta.length} blocks by name.
      </p>

      <nav aria-label="On this page" className="mt-8 rounded-xl border bg-card/50 p-5">
        <p className="text-sm font-medium">On this page</p>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            ["namespace", "1. Register the @velora namespace"],
            ["mcp", "2. Set up the shadcn MCP server"],
            ["prompts", "3. Prompts to try"],
            ["copy-prompt", "4. Copy prompt"],
            ["llms-txt", "5. llms.txt and llms-full.txt"],
            ["v0", "6. Open in v0"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="transition-colors hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="namespace" title="1. Register the @velora namespace">
        <p>
          The shadcn CLI, and the MCP server built on it, only know the registries listed in
          your project&apos;s <code>components.json</code>. Add Velora with one command:
        </p>
        <PackageManagerCommand type="dlx" args={`shadcn@latest registry add "@velora=${REGISTRY}"`} />
        <p>
          or add the entry yourself — <code>{"{name}"}</code> is filled in with the item you ask
          for:
        </p>
        <Code html={jsonHtml} text={componentsJson} label="components.json registries" />
        <p>Check it works — this lists every Velora item with “marquee” in it:</p>
        <PackageManagerCommand type="dlx" args={`shadcn@latest search @velora --query marquee`} />
        <p>
          From then on, <code>@velora/marquee</code> works anywhere a component name does —
          in <code>shadcn add</code>, <code>shadcn view</code> and in your agent&apos;s requests.
        </p>
      </Section>

      <Section id="mcp" title="2. Set up the shadcn MCP server">
        <p>
          The{" "}
          <a href="https://ui.shadcn.com/docs/mcp" className={linkClass}>
            shadcn MCP server
          </a>{" "}
          gives your editor&apos;s agent tools to browse, search and install items from every
          registry in <code>components.json</code> — Velora included. There is nothing
          Velora-specific to install. <code>mcp init</code> writes the config for your editor
          and adds <code>shadcn</code> to your dev dependencies.
        </p>

        <div className="space-y-4 pt-2">
          <Client id="claude-code" name="Claude Code" file=".mcp.json">
            <PackageManagerCommand type="dlx" args="shadcn@latest mcp init --client claude" />
            <p>
              Restart Claude Code and run <code>/mcp</code>: the shadcn server should show{" "}
              <strong className="font-medium text-foreground">Connected</strong>. The file it
              writes:
            </p>
            <Code html={serversHtml} text={mcpServers} label=".mcp.json" />
          </Client>

          <Client id="cursor" name="Cursor" file=".cursor/mcp.json">
            <PackageManagerCommand type="dlx" args="shadcn@latest mcp init --client cursor" />
            <p>
              Then open Cursor Settings and enable the shadcn MCP server. A green dot next to
              it means it&apos;s running. The config uses the same <code>mcpServers</code>{" "}
              block as Claude Code.
            </p>
          </Client>

          <Client id="vscode" name="VS Code (GitHub Copilot)" file=".vscode/mcp.json">
            <PackageManagerCommand type="dlx" args="shadcn@latest mcp init --client vscode" />
            <p>
              Open <code>.vscode/mcp.json</code> and click <strong className="font-medium text-foreground">Start</strong>{" "}
              next to the shadcn server, then ask Copilot Chat. VS Code uses a{" "}
              <code>servers</code> key instead of <code>mcpServers</code>:
            </p>
            <Code html={vscodeHtml} text={vscodeServers} label=".vscode/mcp.json" />
          </Client>

          <Client id="windsurf" name="Windsurf" file="mcp_config.json">
            <p>
              The shadcn CLI can&apos;t write Windsurf&apos;s config, so add it by hand. In the
              Cascade panel, open the <strong className="font-medium text-foreground">…</strong>{" "}
              menu, choose <strong className="font-medium text-foreground">Open MCP config file</strong>,
              add the shadcn entry under <code>mcpServers</code> (the same block shown for Claude
              Code above) and save. Toggle the server on in the MCPs list if it isn&apos;t
              already.{" "}
              <a href="https://docs.windsurf.com/windsurf/cascade/mcp" className={linkClass}>
                Windsurf&apos;s MCP docs
              </a>{" "}
              have the file&apos;s location on each OS.
            </p>
          </Client>
        </div>

        <p className="pt-2 text-sm">
          The CLI also supports <code>--client codex</code> and <code>--client opencode</code>;
          see the{" "}
          <a href="https://ui.shadcn.com/docs/mcp" className={linkClass}>
            shadcn MCP docs
          </a>{" "}
          for those and for troubleshooting.
        </p>
      </Section>

      <Section id="prompts" title="3. Prompts to try">
        <p>
          Name the registry so the agent searches Velora rather than the default shadcn/ui
          one:
        </p>
        <ul className="space-y-2">
          {prompts.map((p) => (
            <li
              key={p}
              className="flex items-start justify-between gap-3 rounded-lg border bg-card/50 py-2 pr-2 pl-4 text-sm text-foreground"
            >
              <span className="py-1">{p}</span>
              <CopyButton text={p} label={`Copy prompt: ${p}`} />
            </li>
          ))}
        </ul>
        <p>
          Installs go through the same CLI, so they bring the keyframes, brand tokens and npm
          dependencies each component needs.
        </p>
      </Section>

      <Section id="copy-prompt" title="4. Copy prompt, on every component page">
        <p>
          No MCP? Every component page has a{" "}
          <strong className="font-medium text-foreground">Copy prompt</strong> button under
          its title. It copies a self-contained brief you can paste into any chat or agent:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>the install command, and the file and dependencies it adds;</li>
          <li>a working usage example;</li>
          <li>every prop, with its type and default;</li>
          <li>what the component does when reduced motion is on;</li>
          <li>a link back to its docs page.</li>
        </ul>
        <p>
          Try it on{" "}
          <Link href="/components/marquee" className={linkClass}>
            Marquee
          </Link>{" "}
          or{" "}
          <Link href="/components/globe" className={linkClass}>
            Globe
          </Link>
          .
        </p>
      </Section>

      <Section id="llms-txt" title="5. llms.txt and llms-full.txt">
        <p>For agents that read the web rather than run tools, Velora publishes two plain-text files:</p>
        <ul className="space-y-3">
          <li className="rounded-lg border bg-card/50 p-4 text-sm">
            <a href="/llms.txt" className={`font-mono font-medium ${linkClass}`}>
              /llms.txt
            </a>
            <p className="mt-1">
              An index of every component and block with a one-line description and its
              install command, plus each component&apos;s gzipped size and dependencies.
            </p>
          </li>
          <li className="rounded-lg border bg-card/50 p-4 text-sm">
            <a href="/llms-full.txt" className={`font-mono font-medium ${linkClass}`}>
              /llms-full.txt
            </a>
            <p className="mt-1">
              The whole catalogue in one file: props, reduced-motion, keyboard and
              screen-reader notes, and a working example for every component. Hand it to an
              agent as context before it builds a page.
            </p>
          </li>
        </ul>
        <p>
          Both are generated from the same metadata as these docs, alongside the registry
          itself, so they list exactly what you can install.
        </p>
      </Section>

      <Section id="v0" title="6. Open in v0">
        <p>
          The <strong className="font-medium text-foreground">Open in v0</strong> button on
          each component page sends its registry item to{" "}
          <a href="https://v0.app" className={linkClass}>
            v0
          </a>
          , so you can start a chat with the component already loaded and ask for changes.
        </p>
        <p>
          One limit, from{" "}
          <a href="https://ui.shadcn.com/docs/registry/open-in-v0" className={linkClass}>
            the shadcn docs
          </a>
          : v0 doesn&apos;t load a registry item&apos;s <code>css</code> or{" "}
          <code>cssVars</code>. Components that ship their own keyframes or brand tokens may
          look static or unstyled there until you paste them in — the{" "}
          <strong className="font-medium text-foreground">Manual</strong> install tab on each
          page lists that CSS.
        </p>
      </Section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/components"
          className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
        >
          Browse the components
        </Link>
        <Link
          href="/components/get-started"
          className="inline-flex h-10 items-center rounded-lg border px-5 text-sm font-medium"
        >
          Get started
        </Link>
      </div>
    </article>
  );
}
