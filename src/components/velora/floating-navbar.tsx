"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface FloatingNavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Pixels scrolled before the bar is allowed to hide */
  revealAfter?: number;
  /** Scrollable element to watch instead of the window */
  scrollContainer?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

/**
 * Header that slides away as you scroll down and returns the moment you
 * scroll back up. Renders visible on the server, so there is no flash, and
 * slides back in whenever focus moves into it.
 */
export function FloatingNavbar({
  revealAfter = 120,
  scrollContainer,
  children,
  className,
  onFocus,
  ...props
}: FloatingNavbarProps) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = scrollContainer?.current;
    const target = container ?? window;
    const readY = () => (container ? container.scrollTop : window.scrollY);
    lastY.current = readY();
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = readY();
        const delta = y - lastY.current;
        // Ignore sub-pixel jitter and rubber-band scroll past the top.
        if (Math.abs(delta) < 4) return;
        const focused = ref.current?.contains(document.activeElement);
        setHidden(delta > 0 && y > revealAfter && !focused);
        lastY.current = y;
      });
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [revealAfter, scrollContainer]);

  return (
    <header
      {...props}
      ref={ref}
      data-slot="floating-navbar"
      onFocus={(event) => {
        // Keyboard focus must never land on an off-screen link.
        setHidden(false);
        onFocus?.(event);
      }}
      className={cn(
        "fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-3xl items-center justify-between gap-4 rounded-full border bg-background/80 px-5 py-2.5 shadow-lg shadow-foreground/5 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden ? "-translate-y-[calc(100%+1.5rem)]" : "translate-y-0",
        className
      )}
    >
      {children}
    </header>
  );
}
