"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  /** Shown only once the card is expanded */
  children: React.ReactNode;
  /** Rendered in both the collapsed card and the expanded panel */
  media?: React.ReactNode;
  className?: string;
}

/**
 * Card that expands into a centred panel, with the title and media animating
 * between the two positions via a shared layout id.
 */
export function ExpandableCard({
  title,
  subtitle,
  children,
  media,
  className,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Modal focus handling: move focus in, keep Tab inside, Escape closes, and
  // hand focus back to the trigger however the dialog was closed.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    dialog?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!first || !dialog.contains(active)) {
        event.preventDefault();
        (first ?? dialog).focus();
      } else if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const spring = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 32 };

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={`card-${id}`}
        onClick={() => setOpen(true)}
        transition={spring}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? `dialog-${id}` : undefined}
        data-slot="expandable-card"
        className={cn(
          "flex w-full max-w-sm cursor-pointer flex-col gap-3 rounded-2xl border bg-card p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className
        )}
      >
        {media && (
          <motion.div
            layoutId={`media-${id}`}
            transition={spring}
            className="overflow-hidden rounded-xl"
          >
            {media}
          </motion.div>
        )}
        {/* Buttons only allow phrasing content, so the title is a span here
            and becomes the dialog's heading once expanded. */}
        <motion.span
          layoutId={`title-${id}`}
          transition={spring}
          className="font-medium"
        >
          {title}
        </motion.span>
        {subtitle && (
          <span className="-mt-2 text-sm text-muted-foreground">{subtitle}</span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            />
            <motion.div
              ref={dialogRef}
              id={`dialog-${id}`}
              layoutId={`card-${id}`}
              transition={spring}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${id}`}
              tabIndex={-1}
              className="relative flex w-full max-w-lg flex-col gap-4 rounded-2xl border bg-card p-6 shadow-2xl outline-none"
            >
              {media && (
                <motion.div
                  layoutId={`media-${id}`}
                  transition={spring}
                  className="overflow-hidden rounded-xl"
                >
                  {media}
                </motion.div>
              )}
              <motion.h3
                id={`title-${id}`}
                layoutId={`title-${id}`}
                transition={spring}
                className="text-lg font-semibold"
              >
                {title}
              </motion.h3>
              <div className="text-sm text-muted-foreground">{children}</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="self-start rounded-lg border px-3 py-1.5 text-sm transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
