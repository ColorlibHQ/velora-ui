import { ArrowRightIcon, BookOpenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { RetroGrid } from "@/components/velora/retro-grid";
import { Terminal } from "@/components/velora/terminal";
import { Typewriter } from "@/components/velora/typewriter";

const ACCENTS = ["monorepos.", "TypeScript.", "every CI."];

// Keep lines under ~36 characters so they don't wrap on phones.
const SESSION = [
  "$ npm install -D tachyon",
  "added 1 package in 812ms",
  "$ npx tachyon build",
  "✓ 148 tasks restored from cache",
  "✓ 3 tasks rebuilt",
  "Done in 0.42s (31× faster)",
];

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"];

/**
 * Minimal developer-tool hero: a receding grid, a typed headline accent, an
 * install session in a terminal and two calls to action. Quiet enough to let
 * the command be the hero.
 */
export function HeroGridMinimal() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-3/4">
        <RetroGrid angle={65} cellSize={48} opacity={0.9} />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <BlurFade>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border bg-background/70 py-1 pr-2.5 pl-1 font-mono text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <span className="rounded-sm bg-foreground px-1.5 py-0.5 font-semibold text-background">
              v2.4
            </span>
            Remote cache is free for open source
            <ArrowRightIcon className="size-3" />
          </a>
        </BlurFade>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-6xl">
          Zero-config builds
          <br />
          for{" "}
          <Typewriter
            words={ACCENTS}
            className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent"
          />
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
          Tachyon caches every task, runs only what changed and shares the
          results with your team and CI. Drop it into any JavaScript repo — no
          config file required.
        </p>

        <BlurFade delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 w-full px-6 sm:w-auto" asChild>
              <a href="#">
                Get started <ArrowRightIcon />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 w-full px-6 sm:w-auto"
              asChild
            >
              <a href="#">
                <BookOpenIcon /> Read the docs
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>

      <BlurFade
        delay={0.4}
        className="relative mx-auto mt-16 max-w-2xl sm:mt-20"
      >
        <div
          aria-hidden
          className="absolute inset-x-12 -inset-y-6 -z-10 rounded-full bg-brand/20 blur-3xl"
        />
        {/* min-height holds the finished session's size so typing never shifts the page */}
        <Terminal
          lines={SESSION}
          title="~/acme-monorepo"
          className="min-h-[15.5rem]"
        />
        <p className="mt-5 text-center font-mono text-xs text-muted-foreground">
          Works with{" "}
          {PACKAGE_MANAGERS.map((pm, i) => (
            <span key={pm}>
              {i > 0 && <span aria-hidden> · </span>}
              <span className="text-foreground">{pm}</span>
              {i < PACKAGE_MANAGERS.length - 1 && (
                <span className="sr-only">,</span>
              )}
            </span>
          ))}
        </p>
      </BlurFade>
    </section>
  );
}
