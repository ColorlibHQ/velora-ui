"use client";

import { useEffect, useState } from "react";

import { CopyButton } from "@/components/docs/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const managers = ["pnpm", "npm", "yarn", "bun"] as const;
type Manager = (typeof managers)[number];

const STORAGE_KEY = "velora:package-manager";

const runner: Record<Manager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
};

const adder: Record<Manager, string> = {
  pnpm: "pnpm add",
  npm: "npm install",
  yarn: "yarn add",
  bun: "bun add",
};

function usePackageManager() {
  const [manager, setManager] = useState<Manager>("pnpm");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Manager | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore a per-viewer preference after hydration
      if (saved && managers.includes(saved)) setManager(saved);
    } catch {
      // storage unavailable — keep the default
    }
    // Keep every switcher on the page in step.
    const sync = (e: Event) => setManager((e as CustomEvent<Manager>).detail);
    window.addEventListener(STORAGE_KEY, sync);
    return () => window.removeEventListener(STORAGE_KEY, sync);
  }, []);
  const choose = (value: string) => {
    window.dispatchEvent(new CustomEvent(STORAGE_KEY, { detail: value }));
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  };
  return [manager, choose] as const;
}

function CommandLine({ command }: { command: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border bg-neutral-950 px-4 py-3 font-mono text-sm text-neutral-200">
      <code className="overflow-x-auto whitespace-nowrap">{command}</code>
      <CopyButton
        text={command}
        label="Copy command"
        className="shrink-0 border-white/15 bg-white/5 text-neutral-300"
      />
    </div>
  );
}

/**
 * A CLI command with a pnpm/npm/yarn/bun switcher; the choice is shared
 * with every other install block on the site.
 */
export function PackageManagerCommand({
  type,
  args,
}: {
  /** "dlx" runs a package (shadcn); "add" installs dependencies */
  type: "dlx" | "add";
  args: string;
}) {
  const [manager, setManager] = usePackageManager();
  return (
    <Tabs value={manager} onValueChange={setManager} className="gap-2">
      <TabsList variant="line" className="h-7">
        {managers.map((m) => (
          <TabsTrigger key={m} value={m} className="px-2 font-mono text-xs">
            {m}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((m) => (
        <TabsContent key={m} value={m}>
          <CommandLine
            command={`${type === "dlx" ? runner[m] : adder[m]} ${args}`}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative pl-10">
      <span className="absolute top-0 left-0 flex size-7 items-center justify-center rounded-full border bg-card text-xs font-medium">
        {n}
      </span>
      <p className="pt-0.5 font-medium">{title}</p>
      <div className="mt-3">{children}</div>
    </li>
  );
}

export function InstallTabs({
  registryUrl,
  dependencies,
  target,
  source,
  sourceHtml,
  css,
  cssHtml,
}: {
  registryUrl: string;
  dependencies: string[];
  /** Path the file lands at, e.g. components/velora/marquee.tsx */
  target: string;
  source: string;
  sourceHtml: string;
  css: string | null;
  cssHtml: string | null;
}) {
  const [manager, setManager] = usePackageManager();

  const managerTabs = (render: (m: Manager) => React.ReactNode) => (
    <Tabs value={manager} onValueChange={setManager} className="gap-2">
      <TabsList variant="line" className="h-7">
        {managers.map((m) => (
          <TabsTrigger key={m} value={m} className="px-2 font-mono text-xs">
            {m}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((m) => (
        <TabsContent key={m} value={m}>
          {render(m)}
        </TabsContent>
      ))}
    </Tabs>
  );

  let step = 0;

  return (
    <Tabs defaultValue="cli" className="gap-4">
      <TabsList>
        <TabsTrigger value="cli" className="px-3">
          CLI
        </TabsTrigger>
        <TabsTrigger value="manual" className="px-3">
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli">
        {managerTabs((m) => (
          <CommandLine command={`${runner[m]} shadcn@latest add ${registryUrl}`} />
        ))}
        <p className="mt-3 text-sm text-muted-foreground">
          Adds <code className="font-mono text-foreground">{target}</code>
          {dependencies.length > 0 && <>, installs {dependencies.join(", ")}</>}
          {css && <> and merges the keyframes and tokens into your CSS</>}.
        </p>
      </TabsContent>

      <TabsContent value="manual">
        <ol className="space-y-8">
          {dependencies.length > 0 && (
            <Step n={++step} title="Install the dependencies">
              {managerTabs((m) => (
                <CommandLine command={`${adder[m]} ${dependencies.join(" ")}`} />
              ))}
            </Step>
          )}
          <Step n={++step} title="Add the cn() helper if you don't have it">
            {managerTabs((m) => (
              <CommandLine command={`${adder[m]} clsx tailwind-merge`} />
            ))}
            <p className="mt-3 text-sm text-muted-foreground">
              Export{" "}
              <code className="font-mono text-foreground">
                cn = (...inputs) =&gt; twMerge(clsx(inputs))
              </code>{" "}
              from <code className="font-mono text-foreground">lib/utils.ts</code>.
              shadcn/ui projects already have it.
            </p>
          </Step>
          <Step n={++step} title={`Copy the source into ${target}`}>
            <div className="relative">
              <CopyButton
                text={source}
                label="Copy source"
                className="absolute top-3 right-3 z-10 border-white/15 bg-neutral-900 text-neutral-300"
              />
              <div
                className="overflow-x-auto rounded-xl border text-sm [&_pre]:max-h-[28rem] [&_pre]:overflow-auto [&_pre]:p-5"
                dangerouslySetInnerHTML={{ __html: sourceHtml }}
              />
            </div>
          </Step>
          {css && cssHtml && (
            <Step n={++step} title="Add the keyframes and tokens to globals.css">
              <div className="relative">
                <CopyButton
                  text={css}
                  label="Copy CSS"
                  className="absolute top-3 right-3 z-10 border-white/15 bg-neutral-900 text-neutral-300"
                />
                <div
                  className="overflow-x-auto rounded-xl border text-sm [&_pre]:max-h-[28rem] [&_pre]:overflow-auto [&_pre]:p-5"
                  dangerouslySetInnerHTML={{ __html: cssHtml }}
                />
              </div>
            </Step>
          )}
        </ol>
      </TabsContent>
    </Tabs>
  );
}
