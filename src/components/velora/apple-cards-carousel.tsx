"use client";

import { Children, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4">
    <path d={d} />
  </svg>
);

interface CardsCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `CarouselCard` elements */
  children: React.ReactNode;
  /** Accessible name for the scrollable region */
  label?: string;
}

/** Snap-scrolling row of `CarouselCard`s with previous/next buttons. */
export function CardsCarousel({
  children,
  label = "Carousel",
  className,
  ...props
}: CardsCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [edge, setEdge] = useState(1); // 1: at start, 2: at end

  const measure = () => {
    const el = ref.current!;
    setEdge(+(el.scrollLeft < 2) | (+(el.scrollLeft > el.scrollWidth - el.clientWidth - 2) << 1));
  };

  useEffect(() => {
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div data-slot="cards-carousel" className={cn("w-full min-w-0", className)} {...props}>
      <motion.div
        ref={ref}
        layoutScroll
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={measure}
        className="snap-x snap-mandatory scroll-px-2 overflow-x-auto rounded-3xl scrollbar-none focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-4 px-2 py-4">
          {Children.map(children, (child) => (
            <li className="snap-start">{child}</li>
          ))}
        </ul>
      </motion.div>
      <div className="mt-1 flex justify-end gap-2 px-2">
        {[-1, 1].map((direction, i) => (
          <button
            key={direction}
            type="button"
            aria-label={i ? "Next cards" : "Previous cards"}
            disabled={!!(edge & (i + 1))}
            onClick={() =>
              ref.current?.scrollBy({
                left: direction * ref.current.clientWidth * 0.8,
                behavior: reducedMotion ? "auto" : "smooth",
              })
            }
            className="inline-flex size-10 items-center justify-center rounded-full border bg-card shadow-xs transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Icon d={i ? "m9 18 6-6-6-6" : "m15 18-6-6 6-6"} />
          </button>
        ))}
      </div>
    </div>
  );
}

interface CarouselCardProps {
  /** Cover image URL */
  src: string;
  /** Small label above the title */
  category: string;
  /** Card title and dialog heading */
  title: string;
  /** Rich content shown once the card is opened */
  children: React.ReactNode;
  /** Extra classes for the card */
  className?: string;
}

/** A tall image card for `CardsCarousel`; clicking it morphs into a modal dialog. */
export function CarouselCard({
  src,
  category,
  title,
  children,
  className,
}: CarouselCardProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Modal: scroll lock, focus trap, Escape, focus restore.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current!;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href],button:not(:disabled),input:not(:disabled),select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey ? active === first || active === dialog : active === last) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const layers = (inDialog: boolean) => {
    const Title = inDialog ? motion.h2 : motion.span;
    return (
      <>
        <motion.img
          layoutId={`${id}-img`}
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-linear-to-b from-black/75 via-black/20 to-black/20" />
        <motion.span layoutId={`${id}-category`} className="relative text-sm font-medium text-white/80">
          {category}
        </motion.span>
        <Title
          id={inDialog ? `${id}-heading` : undefined}
          layoutId={`${id}-title`}
          className={cn(
            "relative mt-1.5 max-w-lg font-semibold leading-tight tracking-tight text-balance text-white",
            inDialog ? "text-2xl md:text-4xl" : "text-xl sm:text-2xl"
          )}
        >
          {title}
        </Title>
      </>
    );
  };

  // Portal the dialog to <body> so a transformed ancestor can't trap it.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  return (
    <MotionConfig
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
    >
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={`${id}-card`}
        style={{ borderRadius: 24 }}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-slot="carousel-card"
        className={cn(
          "group/carousel-card relative flex h-80 w-56 flex-col items-start overflow-hidden bg-muted p-6 text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-[26rem] sm:w-72",
          className
        )}
      >
        {layers(false)}
        <span aria-hidden className="absolute right-4 bottom-4 flex size-8 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition-transform motion-safe:group-hover/carousel-card:scale-110">
          <Icon d="M12 5v14M5 12h14" />
        </span>
      </motion.button>

      {hydrated && createPortal(
      <AnimatePresence>
        {open && (
          <motion.div layoutScroll className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 md:py-12">
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-md"
            />
            <motion.div
              ref={dialogRef}
              layoutId={`${id}-card`}
              style={{ borderRadius: 24 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-heading`}
              tabIndex={-1}
              className="relative mx-auto max-w-3xl overflow-hidden bg-card shadow-2xl outline-none"
            >
              <div className="relative flex h-64 flex-col items-start p-6 md:h-80 md:p-10">
                {layers(true)}
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Icon d="M18 6 6 18M6 6l12 12" />
                </button>
              </div>
              <div className="space-y-4 p-6 leading-relaxed text-muted-foreground md:p-10">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </MotionConfig>
  );
}
