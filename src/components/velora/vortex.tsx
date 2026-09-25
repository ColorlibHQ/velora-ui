"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Draw = (t: number, dt: number, still: boolean) => void;
type Build = (ctx: CanvasRenderingContext2D, w: number, h: number, el: HTMLCanvasElement) => Draw;

// Resolves any CSS colour (or a "--custom-property") to RGBA bytes through a
// 1×1 canvas, so oklch() theme tokens can be blended on every browser.
function probe(el: Element, color: string) {
  const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
  c.fillStyle = color.startsWith("--") ? getComputedStyle(el).getPropertyValue(color) : color;
  c.fillRect(0, 0, 1, 1);
  return c.getImageData(0, 0, 1, 1).data;
}

// Runs `build` on resize and theme change; loops only while on screen, the tab
// is visible and motion is allowed — otherwise paints a single still frame.
function useCanvasLoop(ref: React.RefObject<HTMLCanvasElement | null>, build: Build) {
  useEffect(() => {
    const el = ref.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    let draw: Draw | undefined;
    let raf = 0;
    let t = 0;
    let last = 0;
    let seen = false;
    const frame = (now: number) => {
      const dt = Math.max(0, Math.min(now - last, 50));
      last = now;
      t += dt;
      draw?.(t, dt, false);
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (!draw) return;
      if (mq.matches) draw(t, 0, true);
      else if (seen && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const setup = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = el.clientWidth;
      const h = el.clientHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw = w && h ? build(ctx, w, h, el) : undefined;
      sync();
    };
    const ro = new ResizeObserver(setup);
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      sync();
    });
    const mo = new MutationObserver(setup);
    ro.observe(el);
    io.observe(el);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
    };
  }, [ref, build]);
}

interface Particle {
  a: number;
  r: number;
  life: number;
  ttl: number;
  c: number;
  w: number;
}

interface VortexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum particle count; capped by container area so small screens draw fewer */
  particles?: number;
  /** Rotation speed multiplier */
  speed?: number;
  /** How far the swirl reaches towards the edges, 0–1 */
  range?: number;
}

/**
 * A field of brand-tinted particles spiralling into the centre, leaving
 * fading trails. Absolutely positioned — place inside a `relative
 * overflow-hidden` section. Trails glow additively when the inherited text
 * colour is light (i.e. on a dark section).
 */
export function Vortex({
  particles = 520,
  speed = 1,
  range = 1,
  className,
  ...props
}: VortexProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  const build = useCallback<Build>(
    (ctx, w, h, el) => {
      // Light text means a dark section: let overlapping trails add up to a glow.
      const fg = probe(el, getComputedStyle(el).color);
      const glow = fg[0] * 0.3 + fg[1] * 0.59 + fg[2] * 0.11 > 128;
      // Twelve steps along the brand ramp.
      const [a, b, c] = ["--brand-from", "--brand-via", "--brand-to"].map((v) => probe(el, v));
      const ramp = Array.from({ length: 12 }, (_, i) => {
        const k = i / 11;
        const [x, y] = k < 0.5 ? [a, b] : [b, c];
        const m = k < 0.5 ? k * 2 : k * 2 - 1;
        return `rgb(${[0, 1, 2].map((j) => x[j] + (y[j] - x[j]) * m).join(", ")})`;
      });
      const cx = w / 2;
      const cy = h / 2;
      const rx = (w / 2) * range;
      const ry = (h / 2) * range * 1.15;
      const spawn = (p: Partial<Particle> = {}): Particle =>
        Object.assign(p, {
          a: Math.random() * Math.PI * 2,
          r: 0.2 + Math.sqrt(Math.random()) * 0.8,
          life: 0,
          ttl: 180 + Math.random() * 320,
          c: (Math.random() * 12) | 0,
          w: 0.6 + Math.random() * 1.4,
        });
      const list = Array.from({ length: Math.min(particles, (w * h) / 450) | 0 }, () => {
        const p = spawn();
        p.life = Math.random() * p.ttl;
        return p;
      });

      const step = (f: number) => {
        // Trails: erase a little of every pixel each frame. Erasing (rather
        // than painting the background colour over) leaves no 8-bit ghosting
        // and lets trails fade into whatever sits behind, gradients included.
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 0.18;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = glow ? "lighter" : "source-over";
        for (const p of list) {
          const x = cx + Math.cos(p.a) * p.r * rx;
          const y = cy + Math.sin(p.a) * p.r * ry;
          // Faster near the centre, with a slow inward drift.
          p.a += (f * speed * 0.008) / (0.15 + p.r);
          p.r -= f * speed * 0.0005 * (0.4 + p.r);
          p.life += f;
          ctx.globalAlpha = Math.sin((Math.PI * p.life) / p.ttl) * 0.9;
          ctx.strokeStyle = ramp[p.c];
          ctx.lineWidth = p.w;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(cx + Math.cos(p.a) * p.r * rx, cy + Math.sin(p.a) * p.r * ry);
          ctx.stroke();
          if (p.life > p.ttl || p.r < 0.03) spawn(p);
        }
      };

      ctx.lineCap = "round";
      return (_t, dt, still) => {
        if (!still) return step(dt / 16.7);
        // Reduced motion: run 90 steps at once and show the frozen swirl.
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < 90; i++) step(1);
      };
    },
    [particles, speed, range]
  );
  useCanvasLoop(ref, build);

  return (
    <div
      aria-hidden
      data-slot="vortex"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  );
}
