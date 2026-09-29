"use client";

import {
  BookOpenIcon,
  CheckIcon,
  FileCodeIcon,
  HistoryIcon,
  LayersIcon,
  LayoutTemplateIcon,
  PackageIcon,
  PaletteIcon,
  PanelsTopLeftIcon,
  PaintbrushIcon,
} from "lucide-react";

import { AnimatedList } from "@/components/velora/animated-list";
import { BorderBeam } from "@/components/velora/border-beam";
import { Card3D, Card3DItem } from "@/components/velora/3d-card";
import { Dock, DockIcon } from "@/components/velora/dock";
import { Globe, type GlobeArc, type GlobeMarker } from "@/components/velora/globe";
import { MorphingText } from "@/components/velora/morphing-text";

/*
 * The homepage showcase tiles. Loaded as one lazy chunk, only once a tile
 * scrolls near the viewport, so none of it competes with the hero text.
 */

// Module-level so the globe doesn't rebuild its geometry on every render.
const markers: GlobeMarker[] = [
  { lat: 51.51, lng: -0.13 },
  { lat: 40.71, lng: -74.01 },
  { lat: 1.35, lng: 103.82 },
  { lat: -33.87, lng: 151.21 },
  { lat: 56.95, lng: 24.11 },
];
const arcs: GlobeArc[] = [
  { from: [51.51, -0.13], to: [40.71, -74.01] },
  { from: [56.95, 24.11], to: [1.35, 103.82] },
  { from: [1.35, 103.82], to: [-33.87, 151.21] },
];

export function GlobeDemo() {
  return (
    <Globe
      markers={markers}
      arcs={arcs}
      center={[30, 10]}
      label="Interactive globe: drag or use the arrow keys to spin it"
      className="w-[min(100%,20rem)]"
    />
  );
}

export function MorphingTextDemo() {
  return (
    <MorphingText
      texts={["Animated", "Accessible", "Tiny", "Yours"]}
      className="text-4xl font-semibold tracking-tight"
    />
  );
}

export function BorderBeamDemo() {
  return (
    <div className="relative w-[min(100%,17rem)] overflow-hidden rounded-xl border bg-background p-4 shadow-sm">
      <BorderBeam size={70} duration={6} />
      <p className="text-sm font-medium">Draw the eye</p>
      <p className="mt-1 text-xs text-muted-foreground">
        A beam that travels the border of any card, button or CTA.
      </p>
    </div>
  );
}

export function DockDemo() {
  return (
    <Dock>
      <DockIcon label="Components" href="/components">
        <LayersIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Blocks" href="/blocks">
        <PanelsTopLeftIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Templates" href="/templates">
        <LayoutTemplateIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Themes" href="/themes">
        <PaletteIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Get started" href="/components/get-started">
        <BookOpenIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Changelog" href="/changelog">
        <HistoryIcon className="size-5" />
      </DockIcon>
    </Dock>
  );
}

export function Card3DDemo() {
  return (
    <Card3D
      className="w-[min(100%,17rem)]"
      cardClassName="rounded-2xl border bg-background p-5 shadow-sm"
    >
      <Card3DItem depth={40} className="text-lg font-semibold tracking-tight">
        Depth on demand
      </Card3DItem>
      <Card3DItem depth={25} className="mt-1 text-xs text-muted-foreground">
        Hover or tab in: each layer lifts to its own height.
      </Card3DItem>
      <Card3DItem depth={80} className="relative mt-4">
        <div className="relative h-28 overflow-hidden rounded-xl bg-linear-to-br from-brand-from via-brand-via to-brand-to shadow-lg shadow-brand/25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.12)_1px,transparent_1px)] bg-size-[18px_18px]" />
        </div>
        <Card3DItem
          depth={40}
          className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-zinc-900 shadow-lg"
        >
          1.6 KB
        </Card3DItem>
      </Card3DItem>
    </Card3D>
  );
}

// What `shadcn add @velora/<name>` actually does, as a feed.
const steps = [
  { icon: PackageIcon, title: "Resolved @velora/hero-globe", detail: "1 block, 3 Velora components" },
  { icon: FileCodeIcon, title: "Wrote velora/globe.tsx", detail: "5.2 KB gzipped" },
  { icon: FileCodeIcon, title: "Wrote blocks/hero-globe.tsx", detail: "yours to edit" },
  { icon: PaintbrushIcon, title: "Updated globals.css", detail: "keyframes and brand tokens" },
  { icon: CheckIcon, title: "Done", detail: "no Velora package to update" },
];

export function AnimatedListDemo() {
  return (
    <div className="h-full w-full overflow-hidden px-4 pt-4 mask-[linear-gradient(to_bottom,black_70%,transparent)]">
      <AnimatedList delay={1600}>
        {steps.map((s) => (
          <div
            key={s.title}
            className="flex items-center gap-3 rounded-xl border bg-background p-3 shadow-sm"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium">{s.title}</p>
              <p className="truncate text-xs text-muted-foreground">{s.detail}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}
