"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface DottedGlowBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance between dot centres in px */
  gap?: number;
  /** Dot radius in px (lit dots grow up to 1.6×) */
  radius?: number;
  /** Opacity of unlit dots, 0–1 */
  opacity?: number;
  /** Glow travel speed multiplier */
  speed?: number;
  /** Number of travelling glows */
  glows?: number;
  /** Pause while the pointer is over the parent element (focus inside it always pauses) */
  pauseOnHover?: boolean;
}

const LEVELS = 16;

// Resolves any CSS colour (oklch tokens included) to "r,g,b" via a 1×1 canvas.
function rgb(color: string) {
  const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
  c.fillStyle = color;
  c.fillRect(0, 0, 1, 1);
  return [...c.getImageData(0, 0, 1, 1).data.slice(0, 3)];
}

/**
 * A canvas dot grid with soft glows drifting across it; dots near a glow
 * brighten, grow and tint toward `--brand`. Unlit dots use the inherited text
 * colour. Absolutely positioned — place inside a `relative overflow-hidden`
 * element.
 */
export function DottedGlowBackground({
  gap = 18,
  radius = 1.2,
  opacity = 0.25,
  speed = 1,
  glows = 3,
  pauseOnHover = true,
  className,
  ...props
}: DottedGlowBackgroundProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const ctx = el.getContext("2d");
    const host = el.parentElement?.parentElement;
    if (!ctx || !host) return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let t = 0;
    let last = 0;
    let raf = 0;
    let seen = false;
    let hover = false;
    let focus = false;
    let tint = "0,0,0";
    let styles: string[] = [];

    const colors = () => {
      const cs = getComputedStyle(el);
      const a = rgb(cs.color);
      const b = rgb(cs.getPropertyValue("--brand") || cs.color);
      tint = b.join();
      styles = Array.from({ length: LEVELS + 1 }, (_, i) => {
        const k = i / LEVELS;
        return `rgba(${a.map((v, j) => Math.round(v + (b[j] - v) * k))},${opacity + (1 - opacity) * k})`;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const s = (t / 1000) * speed * 0.15;
      const R = Math.max(w, h) * 0.13 + 30;
      const lights = Array.from({ length: glows }, (_, i) => {
        const x = w * (0.5 + 0.45 * Math.sin(s * (0.9 + i * 0.37) + i * 2.1));
        const y = h * (0.5 + 0.45 * Math.cos(s * (0.7 + i * 0.23) + i * 1.3));
        // A faint brand halo under each glow
        const g = ctx.createRadialGradient(x, y, 0, x, y, R * 1.5);
        g.addColorStop(0, `rgba(${tint},.1)`);
        g.addColorStop(1, `rgba(${tint},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        return [x, y];
      });
      // Batch dots into one path per brightness level: a few fills per frame.
      const paths = styles.map(() => new Path2D());
      const inv = 1 / (2 * R * R);
      const d = Math.max(gap, 4);
      for (let x = (w % d) / 2 + d / 2; x < w; x += d) {
        for (let y = (h % d) / 2 + d / 2; y < h; y += d) {
          let v = 0;
          for (const [lx, ly] of lights) v += Math.exp(-((x - lx) ** 2 + (y - ly) ** 2) * inv);
          const i = Math.round(Math.min(v, 1) * LEVELS);
          const r = radius * (1 + (0.6 * i) / LEVELS);
          paths[i].moveTo(x + r, y);
          paths[i].arc(x, y, r, 0, 7);
        }
      }
      paths.forEach((p, i) => {
        ctx.fillStyle = styles[i];
        ctx.fill(p);
      });
    };

    const frame = (now: number) => {
      t += Math.min(now - last, 50);
      last = now;
      draw();
      raf = requestAnimationFrame(frame);
    };
    // Loop only on screen, in a visible tab, without reduced motion and while
    // nobody is hovering or focused inside; otherwise hold a still frame.
    const sync = () => {
      cancelAnimationFrame(raf);
      if (mq.matches || !seen || document.hidden || focus || (hover && pauseOnHover)) draw();
      else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    };
    const on = (e: Event) => {
      if (e.type == "pointerenter") hover = true;
      else if (e.type == "pointerleave") hover = false;
      else focus = host.contains((e as FocusEvent).relatedTarget as Node) || e.type == "focusin";
      sync();
    };
    const events = ["pointerenter", "pointerleave", "focusin", "focusout"];

    colors();
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      sync();
    });
    const mo = new MutationObserver(() => {
      colors();
      sync();
    });
    ro.observe(el);
    io.observe(el);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    events.forEach((n) => host.addEventListener(n, on));
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      events.forEach((n) => host.removeEventListener(n, on));
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
    };
  }, [gap, radius, opacity, speed, glows, pauseOnHover]);

  return (
    <div
      aria-hidden
      data-slot="dotted-glow-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  );
}
