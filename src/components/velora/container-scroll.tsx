"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  /** Headline area above the panel */
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Screenshot panel that starts tilted back in 3D and rotates flat as it
 * scrolls into view — the standard "here is the product" hero moment.
 * Under `prefers-reduced-motion` a CSS override keeps both parts flat and
 * still, so server and client render identical markup.
 */
export function ContainerScroll({
  header,
  children,
  className,
}: ContainerScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.45], [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.92, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.45], [40, 0]);

  return (
    <div
      ref={ref}
      data-slot="container-scroll"
      className={cn("flex flex-col items-center", className)}
    >
      {header && (
        <motion.div
          style={{ y: translateY }}
          className="mb-10 text-center motion-reduce:transform-none!"
        >
          {header}
        </motion.div>
      )}
      <motion.div
        style={{ rotateX, scale, transformPerspective: 1200 }}
        className="w-full origin-top rounded-2xl border bg-card p-2 shadow-2xl shadow-brand/10 will-change-transform motion-reduce:transform-none!"
      >
        <div className="overflow-hidden rounded-xl border bg-muted">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
