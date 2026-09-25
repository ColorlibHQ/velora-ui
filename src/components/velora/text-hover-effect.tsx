"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

interface TextHoverEffectProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "children"> {
  /** The word or short phrase to draw */
  text: string;
  /** Outline width in SVG units (the glyphs are 100 units tall) */
  strokeWidth?: number;
  /** Radius of the pointer reveal, as a percentage of the drawing's size */
  revealRadius?: number;
  /** Seconds the outline takes to draw itself in on mount */
  drawDuration?: number;
}

const PAD = 4;

/**
 * Oversized outlined text that draws itself in, then reveals a brand-gradient
 * version of the word inside a soft spotlight that follows the pointer.
 * Size it with a width class (`w-full`); the height follows the text. Weight
 * and font come from the className, e.g. `font-black`.
 */
export function TextHoverEffect({
  text,
  strokeWidth = 0.75,
  revealRadius = 28,
  drawDuration = 3,
  className,
  onPointerMove,
  ...props
}: TextHoverEffectProps) {
  const id = useId();
  const outlineRef = useRef<SVGTextElement>(null);
  const reducedMotion = useReducedMotion();
  // A rough first guess so the server render has sensible proportions; the
  // real glyph box is measured once the font has loaded.
  const [box, setBox] = useState({ w: text.length * 64 + PAD * 2, h: 80, x: PAD, y: 76 });

  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const spring = { stiffness: 260, damping: 32, mass: 0.6 };
  const cx = useMotionTemplate`${useSpring(px, spring)}%`;
  const cy = useMotionTemplate`${useSpring(py, spring)}%`;

  useEffect(() => {
    let live = true;
    document.fonts.ready.then(() => {
      const el = outlineRef.current;
      if (!live || !el) return;
      // Width from the layout box; height from the glyphs' actual ink, so
      // caps-only words aren't padded out by empty descender space.
      const bb = el.getBBox();
      const css = getComputedStyle(el);
      const ctx = document.createElement("canvas").getContext("2d")!;
      ctx.font = `${css.fontStyle} ${css.fontWeight} 100px ${css.fontFamily}`;
      const ink = ctx.measureText(text);
      const top = ink.actualBoundingBoxAscent;
      setBox({
        w: bb.width + PAD * 2,
        h: top + ink.actualBoundingBoxDescent + PAD * 2,
        x: PAD - bb.x,
        y: PAD + top,
      });
    });
    return () => {
      live = false;
    };
  }, [text]);

  // Draw-in: the CSS starts the dash fully offset (motion-safe only); reading
  // the computed style commits that state before we transition to zero.
  useEffect(() => {
    const el = outlineRef.current;
    if (!el) return;
    void getComputedStyle(el).strokeDashoffset;
    el.style.strokeDashoffset = "0";
  }, []);

  const frame = { maskUnits: "userSpaceOnUse", x: 0, y: 0, width: "100%", height: "100%" } as const;
  const word = (attrs: React.SVGProps<SVGTextElement>) => (
    <text transform={`translate(${box.x} ${box.y})`} fontSize={100} {...attrs}>
      {text}
    </text>
  );

  return (
    <svg
      role="img"
      aria-label={text}
      viewBox={`0 0 ${box.w} ${box.h}`}
      data-slot="text-hover-effect"
      className={cn("group/text-hover h-auto w-full select-none font-bold", className)}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        px.set(((event.clientX - rect.left) / rect.width) * 100);
        py.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-ink`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" style={{ stopColor: "var(--brand-from)" }} />
          <stop offset="50%" style={{ stopColor: "var(--brand-via)" }} />
          <stop offset="100%" style={{ stopColor: "var(--brand-to)" }} />
        </linearGradient>
        <motion.radialGradient
          id={`${id}-spot`}
          gradientUnits="userSpaceOnUse"
          cx={cx}
          cy={cy}
          r={`${revealRadius}%`}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="55%" stopColor="white" stopOpacity={0.55} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </motion.radialGradient>
        <mask id={`${id}-spot-mask`} {...frame}>
          <rect width="100%" height="100%" fill={`url(#${id}-spot)`} />
        </mask>
        {/* Hides everything inside the glyphs, so variable fonts' overlapping
            contours never show through the outline. */}
        <mask id={`${id}-outside`} {...frame}>
          <rect width="100%" height="100%" fill="white" />
          {word({ fill: "black" })}
        </mask>
      </defs>

      <g mask={`url(#${id}-outside)`}>
        {word({
          ref: outlineRef,
          strokeWidth: strokeWidth * 2,
          style: { transitionDuration: `${drawDuration}s` },
          className:
            "fill-none stroke-foreground/35 transition-[stroke-dashoffset] ease-in-out [stroke-dasharray:1000] motion-safe:[stroke-dashoffset:1000] motion-reduce:transition-none",
          onTransitionEnd: (event) => {
            event.currentTarget.style.strokeDasharray = "none";
          },
        })}
      </g>

      <g
        mask={`url(#${id}-spot-mask)`}
        className="opacity-0 transition-opacity duration-500 group-hover/text-hover:opacity-100 motion-reduce:duration-150"
      >
        {word({ fill: `url(#${id}-ink)`, fillOpacity: 0.3 })}
        <g mask={`url(#${id}-outside)`}>
          {word({ fill: "none", stroke: `url(#${id}-ink)`, strokeWidth: strokeWidth * 3 })}
        </g>
      </g>
    </svg>
  );
}
