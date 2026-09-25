"use client";

import { createContext, useContext, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

// 0 = flat, 1 = fully lifted. Every Card3DItem scales its own depth by it.
const LiftContext = createContext<MotionValue<number> | null>(null);

const SPRING = { stiffness: 180, damping: 20, mass: 0.6 };
const FOCUS_LIFT = 0.4;

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation toward the pointer, in degrees */
  maxTilt?: number;
  /** CSS perspective distance in px (smaller = stronger 3D) */
  perspective?: number;
  /** Classes for the rotating surface (avoid overflow-hidden: it flattens the layers) */
  cardClassName?: string;
  /** Card content; wrap layers that should lift in Card3DItem */
  children: React.ReactNode;
}

/**
 * Perspective card that rotates toward the pointer. Wrap parts of its
 * content in `Card3DItem` with a `depth` (px) and they lift off the surface
 * at different heights while the pointer is over the card. Keyboard focus
 * inside the card lifts the items to a gentle resting depth without tilting.
 */
export function Card3D({
  maxTilt = 10,
  perspective = 1000,
  cardClassName,
  className,
  style,
  children,
  ...props
}: Card3DProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const liftTarget = useMotionValue(0);
  const lift = useSpring(liftTarget, SPRING);
  const springX = useSpring(rotateX, SPRING);
  const springY = useSpring(rotateY, SPRING);
  const state = useRef({ hover: false, focus: false });

  const settle = () => {
    const { hover, focus } = state.current;
    liftTarget.set(reducedMotion ? 0 : hover ? 1 : focus ? FOCUS_LIFT : 0);
  };

  return (
    <div
      {...props}
      data-slot="3d-card"
      className={cn("group/card3d", className)}
      style={{ perspective, ...style }}
      onPointerMove={(e) => {
        props.onPointerMove?.(e);
        if (reducedMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-y * maxTilt * 2);
        rotateY.set(x * maxTilt * 2);
        state.current.hover = true;
        settle();
      }}
      onPointerLeave={(e) => {
        props.onPointerLeave?.(e);
        rotateX.set(0);
        rotateY.set(0);
        state.current.hover = false;
        settle();
      }}
      onFocus={(e) => {
        props.onFocus?.(e);
        state.current.focus = e.target.matches(":focus-visible");
        settle();
      }}
      onBlur={(e) => {
        props.onBlur?.(e);
        if (e.currentTarget.contains(e.relatedTarget)) return;
        state.current.focus = false;
        settle();
      }}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        className={cn(
          "relative transform-3d [&_*]:transform-3d",
          cardClassName
        )}
      >
        <LiftContext.Provider value={lift}>{children}</LiftContext.Provider>
      </motion.div>
    </div>
  );
}

interface Card3DItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How far the item lifts toward the viewer, in px (translateZ) */
  depth?: number;
  /** Extra rotation around the X axis at full lift, in degrees */
  rotateX?: number;
  /** Extra rotation around the Y axis at full lift, in degrees */
  rotateY?: number;
  /** Extra rotation around the Z axis at full lift, in degrees */
  rotateZ?: number;
}

/**
 * A layer inside `Card3D` that floats `depth` px above the card surface.
 */
export function Card3DItem({
  depth = 40,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  className,
  children,
  ...props
}: Card3DItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fallback = useMotionValue(0);
  const lift = useContext(LiftContext) ?? fallback;

  useMotionValueEvent(lift, "change", (v) => {
    if (!ref.current) return;
    ref.current.style.transform =
      v < 0.001
        ? ""
        : `translateZ(${v * depth}px) rotateX(${v * rotateX}deg) rotateY(${v * rotateY}deg) rotateZ(${v * rotateZ}deg)`;
  });

  return (
    <div
      {...props}
      ref={ref}
      data-slot="3d-card-item"
      className={className}
    >
      {children}
    </div>
  );
}
