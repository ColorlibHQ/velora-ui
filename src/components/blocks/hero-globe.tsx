import { ArrowRightIcon, GlobeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import {
  Globe,
  type GlobeArc,
  type GlobeMarker,
} from "@/components/velora/globe";
import { NumberTicker } from "@/components/velora/number-ticker";

const REGIONS: GlobeMarker[] = [
  { lat: 37.77, lng: -122.42, label: "San Francisco" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: -23.55, lng: -46.63, label: "São Paulo" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 50.11, lng: 8.68 }, // unlabelled: too close to London to name both
  { lat: 6.52, lng: 3.38, label: "Lagos" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
];

const ROUTES: GlobeArc[] = [
  { from: [37.77, -122.42], to: [40.71, -74.01] },
  { from: [40.71, -74.01], to: [51.51, -0.13] },
  { from: [51.51, -0.13], to: [50.11, 8.68] },
  { from: [40.71, -74.01], to: [-23.55, -46.63] },
  { from: [50.11, 8.68], to: [6.52, 3.38] },
  { from: [50.11, 8.68], to: [1.35, 103.82] },
];

const STATS = [
  { value: 42, suffix: "", label: "edge regions" },
  { value: 38, suffix: "ms", label: "median global latency" },
  { value: 99.99, suffix: "%", decimals: 2, label: "uptime, last 12 months" },
];

/**
 * Split hero for infrastructure and global products: copy, calls to action
 * and headline numbers on the left, an interactive dotted globe with live
 * routes on the right. Stacks with the globe below on small screens.
 */
export function HeroGlobe() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* Soft brand wash behind the globe side */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 w-full bg-radial-[at_75%_50%] from-brand/10 to-transparent to-60% lg:w-2/3"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <BlurFade>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border bg-background/60 py-1 pr-3 pl-1 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                New
              </span>
              Lagos and São Paulo are live
              <ArrowRightIcon className="size-3.5" />
            </a>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Deploy once. Run{" "}
              <span className="bg-gradient-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
                next to every user.
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mt-6 text-lg text-pretty text-muted-foreground">
              Orbit pushes your app, data and cache to 42 regions in a single
              command, then routes every request to the closest one. No servers
              to size, no regions to pick.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="h-11 rounded-full px-6" asChild>
                <a href="#">
                  Start deploying <ArrowRightIcon />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 rounded-full px-6"
                asChild
              >
                <a href="#">
                  <GlobeIcon /> See the network map
                </a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t pt-8">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col-reverse justify-end gap-1"
                >
                  <dt className="text-xs text-muted-foreground sm:text-sm">
                    {s.label}
                  </dt>
                  <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    <NumberTicker
                      value={s.value}
                      suffix={s.suffix}
                      decimalPlaces={s.decimals ?? 0}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </BlurFade>
        </div>

        <BlurFade
          delay={0.2}
          direction="none"
          className="relative flex justify-center"
        >
          <Globe
            markers={REGIONS}
            arcs={ROUTES}
            center={[28, -20]}
            speed={5}
            className="max-w-[min(100%,34rem)]"
            label="Globe showing Orbit edge regions and the routes between them"
          />
        </BlurFade>
      </div>
    </section>
  );
}
