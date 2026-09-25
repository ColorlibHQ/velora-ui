"use client";

import { useRef } from "react";

import { HeroParallax } from "@/components/velora/hero-parallax";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const products = [
  { title: "Ledger Analytics", image: photo("1460925895917-afdab827c52f"), href: "#ledger" },
  { title: "Pulse Dashboard", image: photo("1551288049-bebda4e38f71"), href: "#pulse" },
  { title: "Wander Mobile", image: photo("1545235617-9465d2a55698"), href: "#wander" },
  { title: "Flowboard", image: photo("1531403009284-440f080d1e12"), href: "#flowboard" },
  { title: "Hue Design System", image: photo("1561070791-2526d30994b5"), href: "#hue" },
  { title: "Aurora Brand Kit", image: photo("1618005182384-a83a8bd57fbe"), href: "#aurora" },
  { title: "Helix Identity", image: photo("1618172193622-ae2d025f4032"), href: "#helix" },
  { title: "Sketchpad Pro", image: photo("1558655146-9f40138edfeb"), href: "#sketchpad" },
  { title: "Northwind Docs", image: photo("1517694712202-14dd9538aa97"), href: "#northwind" },
  { title: "Tidal Campaign", image: photo("1604871000636-074fa5117945"), href: "#tidal" },
  { title: "Reactor CLI", image: photo("1633356122544-f134324a6cee"), href: "#reactor" },
  { title: "Studio Desk", image: photo("1498050108023-c5249f4df085"), href: "#studio" },
  { title: "Arcade Rewind", image: photo("1550745165-9bc0b252726f"), href: "#arcade" },
  { title: "Prism Labs", image: photo("1523961131990-5ea7c61b2107"), href: "#prism" },
  { title: "Glow Wallpapers", image: photo("1579546929518-9e396f3cc809"), href: "#glow" },
];

export default function HeroParallaxDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    // `@container-size` makes the component's cqh heights measure this
    // box instead of the viewport. On a real page, drop it and `container`.
    <div
      ref={scrollRef}
      className="relative h-[28rem] w-full overflow-y-auto rounded-xl border @container-size"
    >
      <HeroParallax products={products} container={scrollRef}>
        <p className="text-sm font-medium text-muted-foreground">
          Product studio
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          We design and ship{" "}
          <span className="bg-gradient-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
            software people love
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Fifteen launches this year, from analytics suites to brand systems.
          Scroll to browse the work.
        </p>
      </HeroParallax>
    </div>
  );
}
