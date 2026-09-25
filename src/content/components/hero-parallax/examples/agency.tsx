"use client";

import { useRef } from "react";

import { HeroParallax } from "@/components/velora/hero-parallax";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const projects = [
  { title: "Harbor Loft", image: photo("1493809842364-78817add7ffb"), href: "#harbor" },
  { title: "Atelier North", image: photo("1524758631624-e2822e304c36"), href: "#atelier" },
  { title: "Sage Residence", image: photo("1555041469-a586c61ea9bc"), href: "#sage" },
  { title: "Cedar House", image: photo("1600585154340-be6161a56a0c"), href: "#cedar" },
  { title: "Linden Villa", image: photo("1600607687939-ce8a6c25118c"), href: "#linden" },
  { title: "Yellow Room", image: photo("1586023492125-27b2c045efd7"), href: "#yellow" },
  { title: "Palm Pavilion", image: photo("1512917774080-9991f1c4c750"), href: "#palm" },
  { title: "Glasshaus Office", image: photo("1497366811353-6870744d04b2"), href: "#glasshaus" },
  { title: "Ember Lounge", image: photo("1618221195710-dd6b41faaea6"), href: "#ember" },
  { title: "Axis HQ", image: photo("1497366216548-37526070297c"), href: "#axis" },
  { title: "Meridian Tower", image: photo("1486406146926-c627a92ad1ab"), href: "#meridian" },
  { title: "Timber Court", image: photo("1600566753190-17f0baa2a6c3"), href: "#timber" },
];

export default function HeroParallaxAgencyDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-[28rem] w-full overflow-y-auto rounded-xl border @container-size"
    >
      <HeroParallax
        products={projects}
        drift={200}
        cardClassName="w-48 rounded-xl sm:w-56"
        container={scrollRef}
      >
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            Nordlicht Studio · Interiors &amp; architecture
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Spaces that feel considered
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Twelve recent homes and workplaces across Oslo, Riga and Copenhagen.
          </p>
        </div>
      </HeroParallax>
    </div>
  );
}
