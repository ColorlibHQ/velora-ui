"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface TextRevealProps {
  /** Plain text — revealed word by word */
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** Seconds between each word */
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.045,
  once = true,
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  // Same markup on server and client. Under reduced motion the CSS
  // overrides keep every word visible (even before hydration) and the
  // JS transition is instant.
  return (
    <Tag data-slot="text-reveal" className={cn(className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block will-change-transform motion-reduce:transform-none! motion-reduce:opacity-100! motion-reduce:[filter:none]!"
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
              },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
