"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface LoaderStep {
  /** What is happening during this step */
  text: string;
}

interface MultiStepLoaderProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "title" | "open" | "onClose"> {
  /** Show the overlay */
  loading: boolean;
  /** Steps, in order */
  steps: LoaderStep[];
  /** Active step index (steps.length = all done); omit to auto-advance */
  current?: number;
  /** Milliseconds per step when auto-advancing */
  duration?: number;
  /** Start again after the last step instead of finishing */
  loop?: boolean;
  /** Visible heading, also the dialog's accessible name */
  title?: string;
  /** Called one `duration` after every auto-advanced step is done */
  onComplete?: () => void;
  /** Renders a close button and lets Escape dismiss the overlay */
  onClose?: () => void;
}

/**
 * Full-screen progress overlay for multi-step work (deploys, sign-up
 * provisioning, imports). Open it with `loading`; it either auto-advances
 * every `duration` ms or follows a `current` index you control. Built on
 * a modal `<dialog>`, so it traps focus and sits above everything.
 */
export function MultiStepLoader({
  loading,
  steps,
  current,
  duration = 1600,
  loop = false,
  title,
  onComplete,
  onClose,
  className,
  ...props
}: MultiStepLoaderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const titleId = useId();
  const [auto, setAuto] = useState(0);
  const [wasLoading, setWasLoading] = useState(loading);
  const [paused, setPaused] = useState(false);
  const completeRef = useRef(onComplete);
  useEffect(() => {
    completeRef.current = onComplete;
  });

  // Restart from the first step each time the overlay opens.
  if (loading !== wasLoading) {
    setWasLoading(loading);
    if (loading) setAuto(0);
  }

  const index = Math.min(Math.max(current ?? auto, 0), steps.length);
  const active = Math.min(index, steps.length - 1);

  // Open/close the native modal: focus, scroll lock and focus return.
  // A layout effect, so the list below is measured while the modal is open.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !loading) return;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    dialog.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [loading]);

  // Auto-advance (uncontrolled only). A loop holds while hovered or focused.
  useEffect(() => {
    if (!loading || current !== undefined || (loop && paused)) return;
    const done = auto >= steps.length;
    const t = setTimeout(() => {
      if (done) completeRef.current?.();
      else setAuto((i) => (loop ? (i + 1) % steps.length : i + 1));
    }, duration);
    return () => clearTimeout(t);
  }, [loading, current, loop, paused, auto, steps.length, duration]);

  // Keep the active step centred in the viewport.
  useLayoutEffect(() => {
    const list = listRef.current;
    const row = list?.children[active] as HTMLElement | undefined;
    if (!list || !row || !loading) return;
    list.style.transform = `translateY(${-(row.offsetTop + row.offsetHeight / 2)}px)`;
  }, [active, loading]);

  const status =
    index >= steps.length
      ? `All ${steps.length} steps complete`
      : `Step ${index + 1} of ${steps.length}: ${steps[index]?.text}`;

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : "Progress"}
      {...props}
      onCancel={(e) => {
        // Escape only dismisses when the parent can react to it.
        e.preventDefault();
        onClose?.();
        props.onCancel?.(e);
      }}
      onClose={(e) => {
        // Browsers may force-close after repeated Escape presses: sync up.
        if (!loading) return;
        if (onClose) onClose();
        else e.currentTarget.showModal();
      }}
      onMouseEnter={(e) => {
        setPaused(true);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setPaused(false);
        props.onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        if (e.target !== e.currentTarget) setPaused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setPaused(false);
        props.onBlur?.(e);
      }}
      className={cn(
        "fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none place-items-center border-0 bg-background/80 p-6 text-foreground opacity-0 backdrop-blur-md outline-none transition-[opacity,display,overlay] transition-discrete duration-300 backdrop:bg-transparent open:grid open:opacity-100 motion-reduce:transition-none starting:open:opacity-0",
        className
      )}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-5"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
      <div className="w-full max-w-sm">
        {title && (
          <h2 id={titleId} className="mb-2 text-center text-lg font-semibold">
            {title}
          </h2>
        )}
        <div className="relative h-72 overflow-hidden [mask-image:linear-gradient(transparent,black_35%,black_65%,transparent)]">
          <ol
            ref={listRef}
            className="absolute inset-x-0 top-1/2 transition-transform duration-500 ease-out motion-reduce:transition-none"
          >
            {steps.map((step, i) => {
              const done = i < index;
              const now = i === index;
              return (
                <li
                  key={i}
                  aria-current={now ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-3 py-2.5 transition-[color,opacity] duration-300 motion-reduce:transition-none",
                    now ? "font-medium" : "text-muted-foreground",
                    !done && !now && "opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full",
                      done
                        ? "bg-brand text-brand-foreground"
                        : now
                          ? "text-brand"
                          : "border-2 border-current"
                    )}
                  >
                    {(done || now) && (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={done ? "size-3.5" : "size-6 motion-safe:animate-spin"}
                      >
                        {done ? (
                          <path d="m5 12.5 4.5 4.5L19 7.5" />
                        ) : (
                          <>
                            <circle cx="12" cy="12" r="9.5" opacity="0.25" />
                            <path d="M21.5 12A9.5 9.5 0 0 0 12 2.5" />
                          </>
                        )}
                      </svg>
                    )}
                  </span>
                  {step.text}
                  {done && <span className="sr-only"> (done)</span>}
                </li>
              );
            })}
          </ol>
        </div>
        <div aria-hidden className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${(index / Math.max(steps.length, 1)) * 100}%` }}
          />
        </div>
        <p role="status" className="sr-only">
          {loading ? status : ""}
        </p>
      </div>
    </dialog>
  );
}
