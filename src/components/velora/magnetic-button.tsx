"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

// style and the drag/animation handlers are owned by motion.button, whose
// signatures differ from the DOM ones.
interface MagneticButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  children: React.ReactNode;
  className?: string;
  /** How far the button is allowed to travel toward the cursor, in px */
  strength?: number;
}

/**
 * Button that leans toward the cursor while it is nearby and springs back
 * when the pointer leaves.
 */
export function MagneticButton({
  children,
  className,
  strength = 14,
  type = "button",
  onMouseMove,
  onMouseLeave,
  onBlur,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 16, mass: 0.4 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(event);
    if (reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    // Offset from centre, normalised to -1..1, then scaled by `strength`.
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2 * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      {...props}
      ref={ref}
      type={type}
      data-slot="magnetic-button"
      onMouseMove={handleMouseMove}
      onMouseLeave={(event) => {
        reset();
        onMouseLeave?.(event);
      }}
      onBlur={(event) => {
        reset();
        onBlur?.(event);
      }}
      style={{ x: springX, y: springY }}
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
