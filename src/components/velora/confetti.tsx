"use client";

import { cn } from "@/lib/utils";

interface BurstOptions {
  /** Origin in viewport px; defaults to screen center */
  x?: number;
  y?: number;
  count?: number;
  colors?: string[];
}

const defaultColors = ["#8b5cf6", "#d946ef", "#22d3ee", "#fbbf24", "#34d399"];

/**
 * Fire a confetti burst — no canvas library, ~2s, cleans up after itself.
 * No-op when the user prefers reduced motion.
 */
export function confettiBurst({
  x = window.innerWidth / 2,
  y = window.innerHeight / 2,
  count = 90,
  colors = defaultColors,
}: BurstOptions = {}) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.cssText =
    "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const particles = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = 6 + Math.random() * 8;
    return {
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 4,
      size: 4 + Math.random() * 5,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    };
  });

  const start = performance.now();
  const tick = (now: number) => {
    const elapsed = (now - start) / 1000;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.vx *= 0.99;
      p.rotation += p.spin;
      p.life = Math.max(0, 1 - elapsed / 1.8);
      if (p.life <= 0) continue;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    if (alive) {
      requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  };
  requestAnimationFrame(tick);
}

interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ConfettiButton({
  children,
  className,
  onClick,
  ...props
}: ConfettiButtonProps) {
  return (
    <button
      data-slot="confetti-button"
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border bg-card px-6 text-sm font-medium transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97]",
        className
      )}
      onClick={(e) => {
        // Keyboard clicks (detail 0) have no pointer position; burst
        // from the button's centre instead of the viewport corner
        if (e.detail === 0) {
          const rect = e.currentTarget.getBoundingClientRect();
          confettiBurst({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        } else {
          confettiBurst({ x: e.clientX, y: e.clientY });
        }
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
