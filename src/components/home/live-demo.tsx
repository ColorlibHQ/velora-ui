"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// One lazy chunk for every tile; nothing loads until a tile nears the viewport.
const load = () => import("./showcase-demos");
const demos = {
  globe: dynamic(() => load().then((m) => m.GlobeDemo), { ssr: false }),
  "morphing-text": dynamic(() => load().then((m) => m.MorphingTextDemo), { ssr: false }),
  "border-beam": dynamic(() => load().then((m) => m.BorderBeamDemo), { ssr: false }),
  dock: dynamic(() => load().then((m) => m.DockDemo), { ssr: false }),
  "3d-card": dynamic(() => load().then((m) => m.Card3DDemo), { ssr: false }),
  "animated-list": dynamic(() => load().then((m) => m.AnimatedListDemo), { ssr: false }),
};

export type LiveDemoName = keyof typeof demos;

/** Mounts a showcase demo once its tile is within 200px of the viewport. */
export function LiveDemo({ name }: { name: LiveDemoName }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Demo = demos[name];
  return (
    <div ref={ref} className="flex size-full items-center justify-center">
      {visible && <Demo />}
    </div>
  );
}
