"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

const FINE = "(pointer: fine)";
const subscribeFine = (onChange: () => void) => {
  const query = matchMedia(FINE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const SPRING = { stiffness: 300, damping: 28, mass: 0.6 };

interface SmoothCursorProps {
  /** Limit the cursor to this element; defaults to the whole document */
  container?: React.RefObject<HTMLElement | null>;
  /** Hide the system cursor while the custom one is showing */
  hideNativeCursor?: boolean;
  /** CSS selector for elements that make the ring grow */
  interactiveSelector?: string;
  /** Classes for the dot */
  dotClassName?: string;
  /** Classes for the trailing ring */
  ringClassName?: string;
}

/**
 * A page-level custom cursor: a dot that sits on the pointer and a ring that
 * trails it on a spring and grows over links, buttons and form controls.
 * Mount it once (e.g. in a layout). It only runs for a mouse on a
 * fine-pointer device, hides while the pointer is outside the window or
 * container, and never receives pointer events.
 */
export function SmoothCursor({
  container,
  hideNativeCursor = true,
  interactiveSelector = "a, button, [role=button], input, select, textarea, label, summary",
  dotClassName,
  ringClassName,
}: SmoothCursorProps) {
  // false on the server and on touch screens, so nothing renders there.
  const fine = useSyncExternalStore(subscribeFine, () => matchMedia(FINE).matches, () => false);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const shown = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, SPRING);
  const ringY = useSpring(y, SPRING);

  useEffect(() => {
    if (!fine) return;
    const root = container ? container.current : document.documentElement;
    if (!root) return;

    const hide = () => {
      shown.current = false;
      setVisible(false);
      setPressed(false);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return hide();
      x.set(event.clientX);
      y.set(event.clientY);
      if (!shown.current) {
        ringX.jump(event.clientX);
        ringY.jump(event.clientY);
        shown.current = true;
        setVisible(true);
      }
      const target = event.target as Element | null;
      setHovering(!!target?.closest?.(interactiveSelector));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    // relatedTarget is null when the pointer leaves the window.
    const out = (event: PointerEvent) => !event.relatedTarget && hide();

    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointerleave", hide);
    addEventListener("pointerup", up);
    addEventListener("blur", hide);
    document.addEventListener("pointerout", out);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointerleave", hide);
      removeEventListener("pointerup", up);
      removeEventListener("blur", hide);
      document.removeEventListener("pointerout", out);
      hide();
    };
  }, [fine, container, interactiveSelector, x, y, ringX, ringY]);

  // Hide the system cursor only while ours is on screen; restored on unmount.
  useEffect(() => {
    const root = container ? container.current : document.documentElement;
    if (!root || !visible || !hideNativeCursor) return;
    root.setAttribute("data-smooth-cursor", "");
    return () => root.removeAttribute("data-smooth-cursor");
  }, [visible, hideNativeCursor, container]);

  if (!fine) return null;

  const snap = reducedMotion ? { duration: 0 } : { duration: 0.2 };
  const scale = (hovering ? 1.8 : 1) * (pressed ? 0.8 : 1);

  return createPortal(
    <div
      aria-hidden
      data-slot="smooth-cursor"
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <style>{"[data-smooth-cursor],[data-smooth-cursor] *{cursor:none!important}"}</style>
      <motion.div
        style={reducedMotion ? { x, y } : { x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          initial={false}
          animate={{ scale, opacity: visible ? 1 : 0 }}
          transition={snap}
          className={cn(
            "-mt-4 -ml-4 size-8 rounded-full border-[1.5px] border-primary/60 transition-colors motion-reduce:transition-none",
            hovering && "bg-primary/10",
            ringClassName
          )}
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.5 : 1 }}
        transition={snap}
        className={cn("absolute -top-1 -left-1 size-2 rounded-full bg-primary", dotClassName)}
      />
    </div>,
    document.body
  );
}
