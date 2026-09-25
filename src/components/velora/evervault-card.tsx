"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*+=<>/";

interface EvervaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Centred badge content (text or an icon) drawn above the character field */
  label?: React.ReactNode;
  /** Radius of the reveal mask in px */
  radius?: number;
  /** Minimum ms between re-randomising the characters while the pointer moves */
  interval?: number;
}

/**
 * Card that reveals a field of random, brand-tinted characters through a
 * soft circular mask that follows the pointer; the characters reshuffle as
 * it moves. Keyboard focus inside the card reveals the mask at the centre.
 * `label` renders a centred badge; `children` render below it.
 */
export function EvervaultCard({
  label,
  radius = 140,
  interval = 60,
  className,
  style,
  children,
  ...props
}: EvervaultCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLParagraphElement>(null);
  const last = useRef(0);

  const scramble = (force = false) => {
    const el = ref.current;
    const p = field.current;
    if (!el || !p) return;
    const now = performance.now();
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!force && (still || now - last.current < interval)) return;
    if (still && p.textContent) return;
    last.current = now;
    const count = Math.ceil((el.offsetWidth * el.offsetHeight) / 60);
    let text = "";
    for (let i = 0; i < count; i++) text += CHARS[(Math.random() * CHARS.length) | 0];
    p.textContent = text;
  };

  const place = (x: string, y: string) => {
    ref.current?.style.setProperty("--ev-x", x);
    ref.current?.style.setProperty("--ev-y", y);
  };

  return (
    <div
      {...props}
      ref={ref}
      data-slot="evervault-card"
      style={{ "--ev-r": `${radius}px`, ...style } as React.CSSProperties}
      className={cn(
        "group/ev relative isolate flex flex-col overflow-hidden rounded-3xl border bg-card text-card-foreground [--ev-x:50%] [--ev-y:50%]",
        className
      )}
      onPointerEnter={(e) => {
        props.onPointerEnter?.(e);
        scramble(true);
      }}
      onPointerMove={(e) => {
        props.onPointerMove?.(e);
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = e.currentTarget.getBoundingClientRect();
        place(`${e.clientX - rect.left}px`, `${e.clientY - rect.top}px`);
        scramble();
      }}
      onFocus={(e) => {
        props.onFocus?.(e);
        if (!e.target.matches(":focus-visible")) return;
        place("50%", "50%");
        scramble(true);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 [mask-image:radial-gradient(circle_var(--ev-r)_at_var(--ev-x)_var(--ev-y),#000_15%,transparent)] group-hover/ev:opacity-100 group-has-[:focus-visible]/ev:opacity-100"
      >
        <div className="absolute inset-0 bg-linear-to-br from-brand-from/25 via-brand-via/15 to-brand-to/25" />
        <p
          ref={field}
          className="absolute inset-0 overflow-hidden bg-linear-to-br from-brand-from via-brand-via to-brand-to bg-clip-text font-mono text-[10px] leading-3 font-semibold break-all text-transparent"
        />
      </div>
      {label != null && (
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="relative">
            <span
              aria-hidden
              className="absolute -inset-3 rounded-full bg-linear-to-br from-brand-from via-brand-via to-brand-to opacity-0 blur-xl transition-opacity duration-500 group-hover/ev:opacity-50 group-has-[:focus-visible]/ev:opacity-50"
            />
            <div className="relative flex size-32 items-center justify-center rounded-full border bg-card/85 text-center text-2xl font-semibold tracking-tight shadow-xl backdrop-blur-sm">
              {label}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
