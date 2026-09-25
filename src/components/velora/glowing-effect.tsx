"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface GlowingEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance in px outside the card at which the glow starts to fade in */
  proximity?: number;
  /** Length of the lit arc, in degrees of the border */
  spread?: number;
  /** Thickness of the glowing border in px */
  borderWidth?: number;
  /** Add a soft blurred halo behind the lit border */
  halo?: boolean;
}

const OFF = -1e5;

/**
 * A glowing arc on a card's border that turns to face the pointer and fades
 * in as the pointer comes within `proximity` px. Place it as a direct child
 * of a `relative` card; it inherits the card's border radius. Keyboard focus
 * inside the card lights the whole border.
 */
export function GlowingEffect({
  proximity = 64,
  spread = 80,
  borderWidth = 2,
  halo = true,
  className,
  style,
  ...props
}: GlowingEffectProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let x = OFF;
    let y = OFF;
    let angle = 0;
    let lit = false;
    let raf = 0;

    const frame = () => {
      raf = 0;
      if (reduce.matches) {
        el.style.removeProperty("--glow-o");
        return;
      }
      const r = el.getBoundingClientRect();
      const dx = Math.max(r.left - x, 0, x - r.right);
      const dy = Math.max(r.top - y, 0, y - r.bottom);
      const near = Math.max(0, 1 - Math.hypot(dx, dy) / Math.max(proximity, 1));
      el.style.setProperty("--glow-o", near.toFixed(3));
      if (!near) {
        lit = false;
        return;
      }
      const target =
        (Math.atan2(x - r.left - r.width / 2, r.top + r.height / 2 - y) * 180) / Math.PI;
      // Ease along the shortest way round; snap when the glow first appears.
      const d = ((((target - angle) % 360) + 540) % 360) - 180;
      angle += !lit || Math.abs(d) < 0.5 ? d : d * 0.2;
      lit = true;
      el.style.setProperty("--glow-a", `${angle.toFixed(2)}deg`);
      if (angle !== target && Math.abs(d) >= 0.5) raf = requestAnimationFrame(frame);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      queue();
    };
    const onOut = (e: PointerEvent) => {
      if (e.relatedTarget) return;
      x = y = OFF;
      queue();
    };

    const listen = (on: boolean) => {
      if (on) {
        document.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerout", onOut);
        window.addEventListener("scroll", queue, { passive: true });
        queue();
      } else {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerout", onOut);
        window.removeEventListener("scroll", queue);
      }
    };
    // Listen only while the card is on screen.
    const io = new IntersectionObserver((entries) =>
      listen(entries[entries.length - 1].isIntersecting)
    );
    io.observe(el);
    return () => {
      io.disconnect();
      listen(false);
      cancelAnimationFrame(raf);
    };
  }, [proximity]);

  const arc = (ring: string) => (
    <div className="absolute inset-0 rounded-[inherit] [mask-image:conic-gradient(from_calc(var(--glow-a)-var(--glow-s)/2),var(--glow-m),#000_calc(var(--glow-s)*0.35),#000_calc(var(--glow-s)*0.65),var(--glow-m)_var(--glow-s),var(--glow-m))]">
      <div className="absolute inset-0 rounded-[inherit] bg-[conic-gradient(from_var(--glow-a),var(--brand-from),var(--brand-via),var(--brand-to),var(--brand-via),var(--brand-from))] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]" style={{ padding: ring }} />
    </div>
  );

  return (
    <div
      {...props}
      ref={ref}
      aria-hidden
      data-slot="glowing-effect"
      style={
        { "--glow-s": `${spread}deg`, "--glow-w": `${borderWidth}px`, ...style } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute -inset-px rounded-[inherit] opacity-(--glow-o,0) transition-opacity duration-300 [--glow-a:0deg] [--glow-m:transparent]",
        "motion-reduce:[:hover>&]:opacity-70 motion-reduce:[:hover>&]:[--glow-m:#000]",
        "[:is(:focus-visible,:has(:focus-visible))>&]:opacity-100 [:is(:focus-visible,:has(:focus-visible))>&]:[--glow-m:#000]",
        className
      )}
    >
      {halo && (
        <div className="absolute -inset-1 rounded-[inherit] opacity-70 blur-[6px]">
          {arc("calc(var(--glow-w) + 6px)")}
        </div>
      )}
      {arc("var(--glow-w)")}
    </div>
  );
}
