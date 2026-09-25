"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Milliseconds for a ripple to finish expanding */
  duration?: number;
  /** Any CSS colour; defaults to a translucent version of the text colour */
  rippleColor?: string;
  children: React.ReactNode;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Button that expands a ripple from the exact point you pressed.
 * Ripples are skipped entirely under `prefers-reduced-motion`.
 */
export function RippleButton({
  duration = 600,
  rippleColor = "currentColor",
  children,
  className,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      const rect = event.currentTarget.getBoundingClientRect();
      // Diameter that reaches the furthest corner from the press point.
      const size = Math.max(rect.width, rect.height) * 2;
      // Keyboard activation (detail 0) has no pointer position: use the centre.
      const keyboard = event.detail === 0;
      const ripple: Ripple = {
        id: Date.now() + Math.random(),
        x: (keyboard ? rect.width / 2 : event.clientX - rect.left) - size / 2,
        y: (keyboard ? rect.height / 2 : event.clientY - rect.top) - size / 2,
        size,
      };
      setRipples((current) => [...current, ripple]);
      window.setTimeout(
        () => setRipples((current) => current.filter((r) => r.id !== ripple.id)),
        duration
      );
    }
    onClick?.(event);
  };

  return (
    <button
      {...props}
      data-slot="ripple-button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="pointer-events-none absolute inset-0">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full opacity-30 motion-safe:animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              background: rippleColor,
              animationDuration: `${duration}ms`,
            }}
          />
        ))}
      </span>
    </button>
  );
}
