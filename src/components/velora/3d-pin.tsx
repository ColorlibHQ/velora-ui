"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Pin3DProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  /** Label shown in the chip at the top of the pin */
  title: string;
  /** Makes the whole card a link; without it the root is a plain div */
  href?: string;
  /** Classes for the card surface that holds the children */
  cardClassName?: string;
  /** Card content, drawn on the tilting surface */
  children: React.ReactNode;
}

const RINGS = [0, 1, 2];

/**
 * Card that tilts back in perspective on hover or keyboard focus while a
 * glowing pin rises from its centre, topped by a `title` chip, with rings
 * rippling out across the card at the pin's base. Pass `href` to make the
 * whole card a link. Leave room above the card for the pin (about 1.5rem).
 */
export function Pin3D({
  title,
  href,
  cardClassName,
  className,
  children,
  ...props
}: Pin3DProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const rings = useRef<(HTMLSpanElement | null)[]>([]);
  const active = hovered || focused;

  useEffect(() => {
    if (!active || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations = rings.current.map((ring, i) =>
      ring?.animate(
        [
          { transform: "scale(0.1)", opacity: 0 },
          { opacity: 1, offset: 0.25 },
          { transform: "scale(1)", opacity: 0 },
        ],
        { duration: 3600, delay: i * 1200, iterations: Infinity, easing: "ease-out", fill: "backwards" }
      )
    );
    return () => animations.forEach((a) => a?.cancel());
  }, [active]);

  const Root = (href ? "a" : "div") as "a";

  return (
    <Root
      {...props}
      href={href}
      data-slot="3d-pin"
      data-active={active || undefined}
      className={cn(
        "group/pin relative block outline-none perspective-[1000px]",
        className
      )}
      onPointerEnter={(e) => {
        setHovered(true);
        props.onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setHovered(false);
        props.onPointerLeave?.(e);
      }}
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        props.onBlur?.(e);
      }}
    >
      <div className="relative transform-3d transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none motion-safe:group-data-active/pin:scale-84 motion-safe:group-data-active/pin:rotate-x-40">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border bg-card p-3 text-card-foreground shadow-sm transition-shadow duration-700 group-focus-visible/pin:ring-2 group-focus-visible/pin:ring-ring group-focus-visible/pin:ring-offset-2 group-focus-visible/pin:ring-offset-background group-data-active/pin:shadow-2xl group-data-active/pin:shadow-brand/15",
            cardClassName
          )}
        >
          {children}
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 opacity-0 transition-opacity duration-500 group-data-active/pin:opacity-100 motion-reduce:transition-none"
        >
          {RINGS.map((i) => (
            <span
              key={i}
              ref={(el) => {
                rings.current[i] = el;
              }}
              style={{ transform: `scale(${0.3 + i * 0.2})`, opacity: 0.7 - i * 0.2 }}
              className="absolute -top-24 -left-24 size-48 rounded-full border border-brand/60 bg-brand/5 shadow-[0_0_28px_-6px_var(--brand)]"
            />
          ))}
        </span>
      </div>

      <span className="pointer-events-none absolute inset-x-0 -top-5 bottom-1/2 z-10 flex flex-col items-center opacity-0 transition duration-500 group-data-active/pin:opacity-100 motion-safe:translate-y-4 motion-safe:group-data-active/pin:translate-y-0 motion-safe:group-data-active/pin:delay-150 motion-reduce:transition-none">
        <span className="relative flex items-center gap-1.5 rounded-full border bg-background/85 px-3 py-1 text-xs font-medium whitespace-nowrap text-foreground shadow-lg shadow-brand/10 backdrop-blur">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {title}
          <span
            aria-hidden
            className="absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-transparent via-brand to-transparent"
          />
        </span>
        <span
          aria-hidden
          className="relative w-px flex-1 origin-bottom bg-linear-to-b from-transparent via-brand/60 to-brand transition-transform duration-700 motion-safe:scale-y-0 motion-safe:group-data-active/pin:scale-y-100 motion-reduce:transition-none"
        >
          <span className="absolute inset-y-0 -left-px w-[3px] [background:inherit] blur-[2px]" />
        </span>
        <span
          aria-hidden
          className="-mb-1 size-2 rounded-full bg-brand shadow-[0_0_12px_2px_var(--brand)] ring-4 ring-brand/20"
        />
      </span>
    </Root>
  );
}
