"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4">
    <path d={d} />
  </svg>
);

export interface SliderImage {
  /** Image URL */
  src: string;
  /** Alternative text ("" when the image is purely decorative) */
  alt: string;
}

interface ImageSliderProps extends React.HTMLAttributes<HTMLElement> {
  /** Images to cycle through */
  images: SliderImage[];
  /** Content layered above the images (headline, call-to-action…) */
  children?: React.ReactNode;
  /** Advance automatically (never starts on its own under reduced motion) */
  autoplay?: boolean;
  /** ms each slide stays on screen while autoplaying */
  interval?: number;
  /** Darken the images so overlay text and controls stay legible */
  scrim?: boolean;
  /** Accessible name for the carousel region */
  label?: string;
}

const button =
  "pointer-events-auto grid size-9 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Full-bleed crossfading image slider with autoplay, dots, arrows, arrow
 * keys and swipe; children are layered above the images. Autoplay pauses on
 * hover/focus and offscreen, and never starts itself under reduced motion.
 */
export function ImageSlider({
  images,
  children,
  autoplay = true,
  interval = 5000,
  scrim = true,
  label = "Image slider",
  className,
  ...props
}: ImageSliderProps) {
  const ref = useRef<HTMLElement>(null);
  const startX = useRef<number | null>(null);
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduced = !!useReducedMotion() && hydrated;
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<boolean | null>(null);
  // Bits: 1 hovered, 2 focused
  const [held, setHeld] = useState(0);
  const [visible, setVisible] = useState(true);
  const n = images.length;
  const playing = choice ?? (autoplay && !reduced);
  const running = playing && !held && visible && n > 1;

  const go = (delta: number) => setIndex((i) => (i + delta + n) % n);

  // Offscreen or in a hidden tab: stop
  useEffect(() => {
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      update();
    });
    observer.observe(ref.current!);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Re-armed on every slide change, so manual navigation resets it
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setIndex((index + 1) % n), interval);
    return () => clearTimeout(timer);
  }, [running, index, interval, n]);

  // Preload the next image
  useEffect(() => {
    if (n > 1) new Image().src = images[(index + 1) % n].src;
  }, [index, images, n]);

  const image = images[index];

  return (
    <section
      {...props}
      ref={ref}
      aria-roledescription="carousel"
      aria-label={label}
      data-slot="image-slider"
      className={cn("relative isolate h-96 w-full touch-pan-y overflow-hidden bg-muted text-white", className)}
    >
      {/* display: contents — leaves the consumer's handlers on <section> alone */}
      <div
        className="contents"
        onMouseEnter={() => setHeld((h) => h | 1)}
        onMouseLeave={() => setHeld((h) => h & 2)}
        onFocus={() => setHeld((h) => h | 2)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld((h) => h & 1)}
        onKeyDown={(e) => {
          const k = ["ArrowLeft", "ArrowRight", "Home", "End"].indexOf(e.key);
          if (n < 2 || k < 0 || (e.target as HTMLElement).matches("input,textarea,select")) return;
          e.preventDefault();
          if (k < 2) go(k * 2 - 1);
          else setIndex(k > 2 ? n - 1 : 0);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          const dx = e.clientX - (startX.current ?? e.clientX);
          startX.current = null;
          if (n > 1 && Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        {n > 1 && (
          <button
            type="button"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setChoice(!playing)}
            className={cn(button, "absolute right-4 bottom-4 z-20")}
          >
            <Icon d={playing ? "M9 5v14M15 5v14" : "M7 4.5v15L19.5 12Z"} />
          </button>
        )}

        <div aria-live={running ? "off" : "polite"} className="absolute inset-0">
          <AnimatePresence initial={false}>
            {image && (
              <motion.div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${n}`}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1, zIndex: 1 }}
                // The old slide stays opaque underneath until the new one has faded in
                exit={{ opacity: 0, zIndex: 0, transition: { duration: 0, delay: reduced ? 0 : 0.9 } }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.9, ease: "easeOut", scale: { duration: 1.8, ease: [0.2, 0.7, 0.2, 1] } }
                }
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} draggable={false} className="size-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {scrim && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-2 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
        )}

        <div className="relative z-10 size-full">{children}</div>

        {n > 1 && (
          <>
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                aria-label={d < 0 ? "Previous slide" : "Next slide"}
                onClick={() => go(d)}
                className={cn(button, "absolute top-1/2 z-20 -translate-y-1/2", d < 0 ? "left-3 sm:left-4" : "right-3 sm:right-4")}
              >
                <Icon d={d < 0 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
              </button>
            ))}
            <div className="pointer-events-none absolute inset-x-16 bottom-5 z-20 flex flex-wrap items-center justify-center gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index || undefined}
                  onClick={() => setIndex(i)}
                  className="pointer-events-auto grid h-6 min-w-6 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    className={cn(
                      "h-1.5 rounded-full bg-white/55 transition-all motion-reduce:transition-none",
                      i === index ? "w-6 bg-white" : "w-1.5"
                    )}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
