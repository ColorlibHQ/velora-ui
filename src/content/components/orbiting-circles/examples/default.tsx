import {
  GaugeIcon,
  LayersIcon,
  MoonIcon,
  PaletteIcon,
  SparklesIcon,
} from "lucide-react";

import { OrbitingCircles } from "@/components/velora/orbiting-circles";

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-64 w-full items-center justify-center">
      <SparklesIcon className="size-7 text-primary" />
      <OrbitingCircles radius={80} iconSize={26} duration={18}>
        <LayersIcon className="size-4 text-muted-foreground" />
        <PaletteIcon className="size-4 text-muted-foreground" />
        <GaugeIcon className="size-4 text-muted-foreground" />
        <MoonIcon className="size-4 text-muted-foreground" />
      </OrbitingCircles>
    </div>
  );
}
