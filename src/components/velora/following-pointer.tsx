"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

const SPRING = { stiffness: 520, damping: 38, mass: 0.5 };

interface FollowingPointerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** Content of the name tag next to the arrow; leave empty for an arrow only */
  label?: React.ReactNode;
  /** Any CSS colour for the arrow and tag */
  color?: string;
  children: React.ReactNode;
}

/**
 * Wrap a region to swap the system cursor for a coloured arrow and name tag,
 * like a collaborator's cursor, that trail the pointer on a spring. It only
 * takes over for a mouse on a fine-pointer device; touch keeps the defaults,
 * and the overlay never blocks clicks.
 */
export function FollowingPointer({
  label,
  color = "var(--brand)",
  className,
  children,
  ...props
}: FollowingPointerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  // Position relative to the region, from the last known client point.
  const place = useCallback((jump: boolean) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = last.current.x - rect.left;
    const ny = last.current.y - rect.top;
    x.set(nx);
    y.set(ny);
    if (jump) {
      springX.jump(nx);
      springY.jump(ny);
    }
  }, [x, y, springX, springY]);

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !matchMedia("(pointer: fine)").matches) return;
    last.current = { x: event.clientX, y: event.clientY };
    place(!active);
    setActive(true);
  };

  // Keep the arrow under the (hidden) pointer while the page scrolls.
  useEffect(() => {
    if (!active) return;
    const onScroll = () => place(false);
    addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => removeEventListener("scroll", onScroll, { capture: true });
  }, [active, place]);

  return (
    <div
      ref={ref}
      data-slot="following-pointer"
      className={cn("relative", active && "cursor-none! [&_*]:cursor-none!", className)}
      {...props}
      onPointerMove={(event) => {
        track(event);
        props.onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        setActive(false);
        props.onPointerLeave?.(event);
      }}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-[inherit]"
      >
        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute top-0 left-0"
              style={reducedMotion ? { x, y } : { x: springX, y: springY }}
              initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reducedMotion ? undefined : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg
                viewBox="0 0 20 20"
                className="absolute -top-0.5 -left-0.5 size-5 drop-shadow-sm"
              >
                <path
                  d="M2.5 2.5 17 8.4l-6.4 2.2L8.4 17Z"
                  fill={color}
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              {label != null && label !== "" && (
                <div
                  style={{ backgroundColor: color }}
                  className="absolute top-4 left-3.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap text-brand-foreground shadow-md ring-1 ring-white/70"
                >
                  {label}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
