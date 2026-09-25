import {
  Accessibility,
  Feather,
  Gauge,
  Layers,
  Palette,
  ShieldCheck,
} from "lucide-react";

import { GlowingEffect } from "@/components/velora/glowing-effect";

const features = [
  { icon: Gauge, title: "Fast by default", text: "Ships static HTML and hydrates only what moves." },
  { icon: Palette, title: "Themeable", text: "Seven CSS variables re-skin every component." },
  { icon: Accessibility, title: "Accessible", text: "Keyboard paths and reduced-motion states built in." },
  { icon: Feather, title: "Tiny", text: "Most components weigh under 2 KB gzipped." },
  { icon: Layers, title: "Composable", text: "Plain React and Tailwind, no wrappers to fight." },
  { icon: ShieldCheck, title: "MIT licensed", text: "Copy it, change it, ship it commercially." },
];

export default function GlowingEffectFeatureGridDemo() {
  return (
    <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-3">
      {features.map(({ icon: Icon, title, text }) => (
        <div key={title} className="relative rounded-2xl border bg-card p-5">
          <GlowingEffect proximity={80} />
          <Icon className="size-5 text-brand" aria-hidden />
          <h3 className="mt-3 text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}
