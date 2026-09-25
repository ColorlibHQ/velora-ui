import { ArrowRightIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AvatarCircles } from "@/components/velora/avatar-circles";
import { BlurFade } from "@/components/velora/blur-fade";
import { FlipWords } from "@/components/velora/flip-words";
import { ShimmerButton } from "@/components/velora/shimmer-button";
import { WavyBackground } from "@/components/velora/wavy-background";

const WORDS = ["alive", "effortless", "yours"];

// Sample social proof — replace with your own customers and numbers.
const SAMPLE_PEOPLE = [
  "Ava Moreno",
  "Kenji Sato",
  "Lena Fischer",
  "Omar Haddad",
  "Priya Nair",
];
const SAMPLE_EXTRA = 12400;
const SAMPLE_RATING = "4.9/5";

/**
 * Bold centered hero over flowing ribbons of brand colour. The last word of
 * the headline flips through a short list; an avatar row and rating carry
 * the social proof. Everything re-themes from your brand tokens.
 */
export function HeroWaves() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* Waves sit in the lower part and fade out towards the headline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[38%] bottom-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_50%)]"
      >
        <WavyBackground waves={6} blur={20} opacity={0.45} />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <BlurFade>
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Lumen Studio · Website builder
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <h1 className="mt-6 text-5xl font-bold tracking-tighter text-balance sm:text-7xl lg:text-8xl">
            Websites that feel
            {/* Own line: the slot is sized for the longest word, so centring
                it there keeps short words from leaving a gap mid-sentence. */}
            <span className="block">
              <FlipWords words={WORDS} className="text-center text-brand" />
            </span>
          </h1>
        </BlurFade>

        <BlurFade delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
            Drag in a section, pick a motion preset, publish. Lumen writes the
            clean, fast code you would have written — and keeps it responsive on
            every screen.
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ShimmerButton>
              Start building free <ArrowRightIcon className="size-4" />
            </ShimmerButton>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full bg-background/70 px-7 backdrop-blur"
              asChild
            >
              <a href="#">Browse templates</a>
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="mx-auto mt-14 flex w-fit flex-col items-center gap-3 rounded-3xl border bg-background/70 p-3 backdrop-blur sm:gap-4 sm:rounded-full sm:p-2 sm:flex-row sm:pr-6">
            <AvatarCircles people={SAMPLE_PEOPLE} extra={SAMPLE_EXTRA} />
            <div className="flex flex-col items-center pb-2 text-sm sm:items-start sm:pb-0">
              <div className="flex items-center gap-1.5">
                <span className="flex text-brand" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="font-semibold">{SAMPLE_RATING}</span>
                <span className="sr-only">average rating</span>
              </div>
              <p className="text-muted-foreground">
                from 12,000+ makers and studios
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
