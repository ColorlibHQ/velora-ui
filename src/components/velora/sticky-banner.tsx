"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface StickyBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hide the dismiss button for banners that must stay put */
  dismissible?: boolean;
  /** Called after the banner is dismissed; focus has already moved to the next focusable element */
  onDismiss?: () => void;
  children: React.ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Announcement bar that pins to the top of the page and can be dismissed.
 * Sits above a sticky header when both are present. Dismissing moves focus
 * to the next focusable element on the page instead of dropping it.
 */
export function StickyBanner({
  dismissible = true,
  onDismiss,
  children,
  className,
  ...props
}: StickyBannerProps) {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const dismiss = () => {
    const root = ref.current;
    const next = root
      ? Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).find(
          (el) =>
            !root.contains(el) &&
            root.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING &&
            el.getClientRects().length > 0
        )
      : undefined;
    next?.focus();
    setOpen(false);
    onDismiss?.();
  };

  if (!open) return null;

  return (
    <div
      {...props}
      ref={ref}
      data-slot="sticky-banner"
      className={cn(
        "sticky top-0 z-60 flex items-center justify-center gap-3 bg-gradient-to-r from-brand-from via-brand-via to-brand-to px-4 py-2.5 text-center text-sm text-brand-foreground",
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={dismiss}
          className="-mr-1 shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </button>
      )}
    </div>
  );
}
