"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A gradient line that draws itself down the side of long-form content as you
 * read. Pairs well with blog posts and changelogs.
 */
export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 10%", "end 85%"],
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Track height so the beam stays accurate as images and fonts settle.
    const observer = new ResizeObserver(() =>
      setHeight(element.getBoundingClientRect().height)
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const drawn = useSpring(useTransform(scrollYProgress, [0, 1], [0, height]), {
    stiffness: 480,
    damping: 90,
  });

  return (
    <div
      ref={ref}
      data-slot="tracing-beam"
      className={cn("relative w-full", className)}
    >
      <div
        aria-hidden
        className="absolute -left-4 top-0 hidden h-full w-px bg-border md:block"
      >
        <motion.div
          style={{ height: drawn }}
          // Reduced motion: show the beam fully drawn instead of tracking scroll.
          className="w-px bg-gradient-to-b from-brand-from via-brand-via to-brand-to motion-reduce:h-full!"
        />
      </div>
      {children}
    </div>
  );
}
