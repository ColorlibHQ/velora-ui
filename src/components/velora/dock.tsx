"use client";

import { createContext, useContext, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

interface DockContextValue {
  mouseX: MotionValue<number>;
  baseSize: number;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

interface DockProps {
  children: React.ReactNode;
  className?: string;
  /** Icon size at rest, px */
  baseSize?: number;
  /** Icon size under the cursor, px */
  magnification?: number;
  /** Cursor influence radius, px */
  distance?: number;
}

export function Dock({
  children,
  className,
  baseSize = 40,
  magnification = 64,
  distance = 140,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, baseSize, magnification, distance }}>
      <motion.div
        data-slot="dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-16 w-fit items-end gap-2 rounded-2xl border bg-card/70 px-3 pb-2 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  /** Accessible name; also used as the tooltip title */
  label?: string;
  /** Render as a link to this URL instead of a button */
  href?: string;
  /** Click handler for the button (or link) */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function DockIcon({
  children,
  className,
  label,
  href,
  onClick,
}: DockIconProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const fallbackX = useMotionValue(Infinity);
  const ctx = useContext(DockContext);
  const mouseX = ctx?.mouseX ?? fallbackX;
  const baseSize = ctx?.baseSize ?? 40;
  const magnification = ctx?.magnification ?? 64;
  const distance = ctx?.distance ?? 140;

  const distanceFromCursor = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });

  const sizeTarget = useTransform(
    distanceFromCursor,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );
  const size = useSpring(sizeTarget, {
    mass: 0.1,
    stiffness: 160,
    damping: 13,
  });

  const shared = {
    "data-slot": "dock-icon",
    "aria-label": label,
    title: label,
    onClick,
    // Magnify around the focused icon for keyboard users, like a hover would
    onFocus: () => {
      const bounds = ref.current?.getBoundingClientRect();
      if (bounds) mouseX.set(bounds.x + bounds.width / 2);
    },
    onBlur: () => mouseX.set(Infinity),
    style: reducedMotion
      ? { width: baseSize, height: baseSize }
      : { width: size, height: size },
    className: cn(
      "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      className
    ),
  };

  return href ? (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      {...shared}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      {...shared}
    >
      {children}
    </motion.button>
  );
}
