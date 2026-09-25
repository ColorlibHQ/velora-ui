"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Draw = (t: number, dt: number, still: boolean) => void;
type Build = (ctx: CanvasRenderingContext2D, w: number, h: number, el: HTMLCanvasElement) => Draw;

// CSS colour or "--token" → "r, g, b", so oklch() tokens work in gradients.
function rgb(el: Element, color: string) {
  const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
  c.fillStyle = color.startsWith("--") ? getComputedStyle(el).getPropertyValue(color) : color;
  c.fillRect(0, 0, 1, 1);
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
  return `${r}, ${g}, ${b}`;
}

// Rebuilds on resize/theme change. Loops only while visible and motion is
// allowed; otherwise paints one still frame.
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

// Stable pseudo-random 0–1: stars keep their places across rebuilds.
const seed = (i: number, k: number) => {
  const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stars per 10,000 px² */
  density?: number;
}

/**
 * A still field of stars that gently twinkle. Stars take the inherited text
 * colour (set `text-white` on a dark section); one in five is brand-tinted.
 * Absolutely positioned — stack `ShootingStars` on top for the full sky.
 */
export function StarsBackground({ density = 5, className, ...props }: StarsBackgroundProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  const build = useCallback<Build>(
    (ctx, w, h, el) => {
      const fg = `rgb(${rgb(el, getComputedStyle(el).color)})`;
      const brand = `rgb(${rgb(el, "--brand-via")})`;
      const stars = Array.from({ length: ((w * h) / 1e4) * density }, (_, i) => ({
        x: seed(i, 1) * w,
        y: seed(i, 2) * h,
        r: 0.4 + seed(i, 3) ** 3 * 1.4,
        c: seed(i, 4) < 0.2 ? brand : fg,
        a: 0.3 + seed(i, 5) * 0.6,
        // Two in three twinkle
        s: seed(i, 6) < 0.65 ? 0.0006 + seed(i, 7) * 0.002 : 0,
        p: seed(i, 8) * 7,
      }));
      return (t) => {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          ctx.globalAlpha = s.a * (s.s ? 0.6 + 0.4 * Math.sin(t * s.s + s.p) : 1);
          ctx.fillStyle = s.c;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 7);
          ctx.fill();
        }
      };
    },
    [density]
  );
  useCanvasLoop(ref, build);

  return (
    <div
      aria-hidden
      data-slot="stars-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  );
}

interface ShootingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Average pause between streaks in ms; each pause varies ±60% */
  delay?: number;
  /** Travel speed in px per second; each streak varies ±30% */
  speed?: number;
  /** Direction in degrees below horizontal; each streak varies ±12° */
  angle?: number;
  /** Trail length in px */
  length?: number;
  /** Any CSS colour or custom property name */
  color?: string;
}

/**
 * Occasional brand-tinted streaks crossing the section at a random angle,
 * speed and delay. Absolutely positioned — layer over `StarsBackground`.
 * Under reduced motion a single streak is shown frozen mid-flight.
 */
export function ShootingStars({
  delay = 2400,
  speed = 900,
  angle = 25,
  length = 150,
  color = "--brand-to",
  className,
  ...props
}: ShootingStarsProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  const build = useCallback<Build>(
    (ctx, w, h, el) => {
      const c = rgb(el, color);
      const rad = Math.PI / 180;
      // [x, y, dirX, dirY, px per ms, distance]
      const streaks: number[][] = [];
      let next = 0;
      // Draws a streak; returns true once its tail has left the canvas.
      const paint = ([x0, y0, dx, dy, , d]: number[]) => {
        const l = Math.min(length, d);
        const x = x0 + dx * d;
        const y = y0 + dy * d;
        const tx = x - dx * l;
        const ty = y - dy * l;
        const g = ctx.createLinearGradient(tx, ty, x, y);
        g.addColorStop(0, `rgba(${c}, 0)`);
        g.addColorStop(1, `rgb(${c})`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = ctx.shadowColor = `rgb(${c})`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
        return tx > w || ty > h;
      };
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      return (t, dt, still) => {
        ctx.clearRect(0, 0, w, h);
        if (still) {
          paint([w * 0.08, h * 0.1, Math.cos(angle * rad), Math.sin(angle * rad), 0, length * 1.5]);
          return;
        }
        if (t >= next) {
          const a = (angle + Math.random() * 24 - 12) * rad;
          const top = Math.random() < w / (w + h);
          streaks.push([
            top ? Math.random() * w * 0.8 : 0,
            top ? 0 : Math.random() * h * 0.6,
            Math.cos(a),
            Math.sin(a),
            (speed / 1000) * (0.7 + Math.random() * 0.6),
            0,
          ]);
          next = t + delay * (0.4 + Math.random() * 1.2);
        }
        for (let i = streaks.length; i--; ) {
          streaks[i][5] += streaks[i][4] * dt;
          if (paint(streaks[i])) streaks.splice(i, 1);
        }
      };
    },
    [delay, speed, angle, length, color]
  );
  useCanvasLoop(ref, build);

  return (
    <div
      aria-hidden
      data-slot="shooting-stars"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  );
}
