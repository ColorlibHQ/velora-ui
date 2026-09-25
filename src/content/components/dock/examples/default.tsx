import {
  GaugeIcon,
  LayersIcon,
  PaletteIcon,
  RocketIcon,
  ZapIcon,
} from "lucide-react";

import { Dock, DockIcon } from "@/components/velora/dock";

export default function DockDemo() {
  return (
    <Dock>
      <DockIcon label="Layers">
        <LayersIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Palette">
        <PaletteIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Speed">
        <GaugeIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Energy">
        <ZapIcon className="size-5" />
      </DockIcon>
      <DockIcon label="Launch">
        <RocketIcon className="size-5" />
      </DockIcon>
    </Dock>
  );
}
