"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface HeroParallaxProduct {
  /** Caption on the card; also the link's accessible name */
  title: string;
  /** Image URL, shown with empty alt text since the title labels it */
  image: string;
  /** Turns the card into a link */
  href?: string;
}

interface HeroParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cards, split evenly across three rows */
  products: HeroParallaxProduct[];
  /** Hero copy shown above the rows */
  children?: React.ReactNode;
  /** How far each row slides sideways over the scroll, in px */
  drift?: number;
  /** Extra classes for every card, e.g. to resize them */
  cardClassName?: string;
  /** Scrollable element to track instead of the window */
  container?: React.RefObject<HTMLElement | null>;
}

/**
 * Hero copy over three rows of cards that slide in opposite directions
 * while the whole block tilts from a 3D angle into flat as you scroll.
 * Heights use `cqh`, so inside a `@container-size` scroll box they measure
 * that box instead of the viewport. Under `prefers-reduced-motion` the block
 * stays flat and the rows wrap so every card is visible.
 */
export function HeroParallax({
  products,
  children,
  drift = 480,
  cardClassName,
  container,
  className,
  ...props
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40 });

  const rotateX = useTransform(progress, [0, 0.22], [18, 0]);
  const rotateZ = useTransform(progress, [0, 0.22], [12, 0]);
  const y = useTransform(progress, [0, 0.22], [60, 0]);
  const opacity = useTransform(progress, [0, 0.22], [0.5, 1]);
  const right = useTransform(progress, [0, 1], [0, drift]);
  const left = useTransform(progress, [0, 1], [0, -drift]);

  const size = Math.ceil(products.length / 3);
  const rows = [0, 1, 2].map((i) => products.slice(i * size, (i + 1) * size));

  return (
    <div
      ref={ref}
      data-slot="hero-parallax"
      className={cn("relative overflow-clip pb-[16cqh]", className)}
      {...props}
    >
      {children && (
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-[14cqh] pb-[10cqh]">
          {children}
        </div>
      )}
      <motion.div
        style={{ rotateX, rotateZ, y, opacity, transformPerspective: 1000 }}
        className="flex origin-top flex-col gap-5 will-change-transform motion-reduce:transform-none! motion-reduce:opacity-100!"
      >
        {rows.map((row, i) => (
          <Row
            key={i}
            items={row}
            x={i === 1 ? left : right}
            root={ref}
            cardClassName={cardClassName}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Row({
  items,
  x,
  root,
  cardClassName,
}: {
  items: HeroParallaxProduct[];
  x: MotionValue<number>;
  root: React.RefObject<HTMLDivElement | null>;
  cardClassName?: string;
}) {
  // Extra offset that slides a keyboard-focused card back inside the clip.
  const nudge = useMotionValue(0);
  const shifted = useTransform(() => x.get() + nudge.get());

  const reveal = (event: React.FocusEvent) => {
    const box = root.current?.getBoundingClientRect();
    const card = (event.target as Element).getBoundingClientRect();
    if (!box) return;
    const gap = 24;
    if (card.left < box.left) nudge.set(nudge.get() + box.left - card.left + gap);
    else if (card.right > box.right)
      nudge.set(nudge.get() + box.right - card.right - gap);
  };

  if (!items.length) return null;

  return (
    <motion.ul
      role="list"
      style={{ x: shifted }}
      onFocus={reveal}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) nudge.set(0);
      }}
      className="flex justify-center gap-5 will-change-transform motion-reduce:transform-none! motion-reduce:flex-wrap"
    >
      {items.map((item, i) => {
        const Tag = item.href ? "a" : "div";
        return (
          <li key={`${item.title}-${i}`} className="shrink-0">
            <Tag
              href={item.href}
              className={cn(
                "group/hero-card relative block aspect-[4/3] w-60 overflow-hidden rounded-2xl border bg-muted shadow-lg shadow-black/5 outline-none sm:w-72",
                item.href &&
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                cardClassName
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover/hero-card:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">
                {item.title}
              </span>
            </Tag>
          </li>
        );
      })}
    </motion.ul>
  );
}
