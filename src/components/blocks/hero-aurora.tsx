import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { BlurFade } from "@/components/velora/blur-fade";
import { DotPattern } from "@/components/velora/grid-pattern";
import { ShimmerButton } from "@/components/velora/shimmer-button";

/**
 * Centered hero with a drifting aurora, a dotted backdrop and staggered
 * copy. Replace the copy and links; everything else re-themes from your
 * brand tokens.
 */
export function HeroAurora() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <AuroraBackground intensity="medium" />
      <DotPattern
        aria-hidden
        className="absolute inset-0 -z-10 size-full fill-foreground/10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <BlurFade>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <SparklesIcon className="size-4 text-primary" />
            Announcing our Series A
            <ArrowRightIcon className="size-3.5" />
          </a>
        </BlurFade>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          The workspace where{" "}
          <AnimatedGradientText>ideas ship</AnimatedGradientText>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
          Plan, build and launch in one calm place. Acme keeps your roadmap,
          docs and releases in sync — so your team can focus on the work.
        </p>

        <BlurFade delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ShimmerButton>Start for free</ShimmerButton>
            <Button variant="ghost" size="lg" asChild>
              <a href="#">
                Book a demo <ArrowRightIcon />
              </a>
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="mt-8 text-sm text-muted-foreground">
            Free for teams up to 10 · No credit card required
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
