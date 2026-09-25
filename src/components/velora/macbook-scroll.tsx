"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface MacbookScrollProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Screenshot shown on the screen */
  src?: string;
  /** Alt text for `src`; leave empty if the image is decorative */
  alt?: string;
  /** Custom screen content, used instead of `src`; `cqw` units scale with the screen */
  children?: React.ReactNode;
  /** Heading above the laptop, rendered in an h2 */
  title?: React.ReactNode;
  /** Small element on the lower-left of the deck, e.g. a logo */
  badge?: React.ReactNode;
  /** Scrollable element to track instead of the window */
  container?: React.RefObject<HTMLElement | null>;
}

// Bottom keyboard row: key widths in grid columns (14 per row).
const BOTTOM_ROW = [1, 1, 1, 2, 5, 2, 1, 1];

/**
 * A laptop drawn in CSS that pins in place, opens its lid and scales the
 * screenshot to fill the screen as you scroll. Heights use `cqh`, so inside a
 * `@container-size` scroll box they measure that box instead of the
 * viewport. Under `prefers-reduced-motion` the laptop renders open and still.
 */
export function MacbookScroll({
  src,
  alt = "",
  children,
  title,
  badge,
  container,
  className,
  ...props
}: MacbookScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 34 });

  const rotateX = useTransform(progress, [0, 0.6], [-122, 0]);
  const scale = useTransform(progress, [0.25, 0.85], [0.7, 1]);
  const titleY = useTransform(progress, [0, 0.6], [0, -16]);

  return (
    <div
      ref={ref}
      data-slot="macbook-scroll"
      className={cn("relative h-[200cqh] motion-reduce:h-auto", className)}
      {...props}
    >
      <div className="sticky top-0 flex h-[100cqh] flex-col items-center justify-center gap-[5cqh] overflow-x-clip px-4">
        {title && (
          <motion.h2
            style={{ y: titleY }}
            className="max-w-xl text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl motion-reduce:transform-none!"
          >
            {title}
          </motion.h2>
        )}

        <div className="flex w-[min(100%,44rem,78cqh)] flex-col items-center perspective-[1600px] @container">
          {/* Lid: the screen on the front face, the shell on the back. */}
          <motion.div
            style={{ rotateX }}
            className="relative z-10 w-[88%] origin-bottom transform-3d will-change-transform motion-reduce:transform-none!"
          >
            <div className="rounded-t-[2.4cqw] border border-b-0 border-zinc-700/60 bg-zinc-950 p-[1.6cqw] pb-[2.6cqw] shadow-2xl shadow-black/20 backface-hidden">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[0.8cqw] bg-black @container">
                <motion.div
                  style={{ scale }}
                  className="size-full overflow-hidden rounded-[0.8cqw] will-change-transform motion-reduce:transform-none!"
                >
                  {children ??
                    (src && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={alt} className="size-full object-cover object-top" />
                    ))}
                </motion.div>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute inset-0 flex rotate-x-180 items-center justify-center rounded-t-[2.4cqw] bg-gradient-to-b from-zinc-300 to-zinc-400 backface-hidden dark:from-zinc-700 dark:to-zinc-800"
            >
              <span className="size-[7cqw] rounded-full bg-gradient-to-br from-brand-from to-brand-to opacity-70" />
            </div>
          </motion.div>

          {/* Deck, laid back in perspective like a laptop seen from the front. */}
          <div className="relative -mb-[22cqw] w-[88%] origin-top rotate-x-[52deg] rounded-b-[2.4cqw] bg-gradient-to-b from-zinc-200 to-zinc-300 p-[2.5cqw] pt-[1.5cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] dark:from-zinc-700 dark:to-zinc-800 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]"
          >
            <div aria-hidden className="mx-auto mb-[2cqw] h-[1.2cqw] w-1/4 rounded-b-[0.8cqw] bg-zinc-400/70 dark:bg-zinc-900/70" />
            <div aria-hidden className="grid grid-cols-14 gap-[0.5cqw] rounded-[1cqw] bg-zinc-900 p-[0.8cqw]">
              {Array.from({ length: 70 }, (_, i) => (
                <span key={i} className="aspect-square rounded-[0.4cqw] bg-zinc-800 shadow-[inset_0_-1px_0_rgb(0_0_0/0.5)]" />
              ))}
              {BOTTOM_ROW.map((span, i) => (
                <span
                  key={`b${i}`}
                  style={{ gridColumn: `span ${span}` }}
                  className="h-[4.2cqw] rounded-[0.4cqw] bg-zinc-800 shadow-[inset_0_-1px_0_rgb(0_0_0/0.5)]"
                />
              ))}
            </div>
            <div aria-hidden className="mx-auto mt-[2.5cqw] aspect-[16/9] w-2/5 rounded-[1.2cqw] bg-zinc-300/80 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.06)] dark:bg-zinc-600/60 dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]" />
            {badge && (
              <div className="absolute bottom-[2.5cqw] left-[3cqw]">{badge}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
