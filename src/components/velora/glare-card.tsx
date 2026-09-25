"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card with a sheet of light that tracks the cursor across its surface, like
 * a foil trading card. CSS custom properties do the work — no dependency.
 */
export function GlareCard({ children, className }: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty(
      "--glare-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`
    );
    element.style.setProperty(
      "--glare-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  return (
    <div
      ref={ref}
      data-slot="glare-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group/glare relative overflow-hidden rounded-2xl border bg-card p-6 [--glare-x:50%] [--glare-y:50%]",
        className
      )}
    >
      <span
        aria-hidden
        style={{ opacity: active ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),color-mix(in_oklch,var(--brand)_28%,transparent),transparent_55%)] transition-opacity duration-300 motion-reduce:transition-none"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
