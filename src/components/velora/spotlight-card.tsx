"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Radius of the spotlight in px */
  radius?: number;
  /** Any CSS color for the glow */
  color?: string;
}

export function SpotlightCard({
  children,
  className,
  radius = 320,
  color = "color-mix(in oklab, var(--brand) 14%, transparent)",
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      data-slot="spotlight-card"
      onMouseMove={handleMouseMove}
      className={cn(
        "group/spotlight relative overflow-hidden rounded-2xl border bg-card",
        className
      )}
      style={
        {
          "--spot-radius": `${radius}px`,
          "--spot-color": color,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-radius) circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--spot-color), transparent 65%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
