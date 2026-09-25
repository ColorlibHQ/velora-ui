"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Edge = "top" | "right" | "bottom" | "left";

const ENTER: Record<Edge, string> = {
  top: "-translate-y-full",
  right: "translate-x-full",
  bottom: "translate-y-full",
  left: "-translate-x-full",
};

interface DirectionAwareHoverProps {
  children: React.ReactNode;
  /** Slides in from whichever edge the cursor crossed */
  overlay: React.ReactNode;
  className?: string;
}

/**
 * Overlay that enters from the edge the cursor actually crossed and leaves the
 * same way. Zero dependencies — the maths is one arctangent.
 */
export function DirectionAwareHover({
  children,
  overlay,
  className,
}: DirectionAwareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<Edge>("bottom");
  const [hovered, setHovered] = useState(false);

  const edgeFrom = (event: React.MouseEvent<HTMLDivElement>): Edge => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return "bottom";
    // Angle from the centre, corrected for aspect ratio, mapped to quadrants.
    const x = (event.clientX - rect.left - rect.width / 2) * (rect.height / rect.width);
    const y = event.clientY - rect.top - rect.height / 2;
    const quadrant = Math.round(Math.atan2(y, x) / (Math.PI / 2) + 4) % 4;
    return (["right", "bottom", "left", "top"] as const)[quadrant];
  };

  return (
    <div
      ref={ref}
      // Focusable so keyboard users can reveal the overlay too.
      tabIndex={0}
      data-slot="direction-aware-hover"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        setEdge(edgeFrom(event));
        setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setEdge(edgeFrom(event));
        setHovered(false);
      }}
      // Touch and pen have no hover: a tap toggles the overlay instead.
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") setHovered((value) => !value);
      }}
      onFocus={(event) => {
        // Keyboard focus only; a tap is already handled by onPointerUp.
        if ((event.target as HTMLElement).matches(":focus-visible")) {
          setHovered(true);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHovered(false);
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className
      )}
    >
      {children}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-from to-brand-to text-brand-foreground transition-transform duration-300 ease-out motion-reduce:transition-none",
          hovered ? "translate-x-0 translate-y-0" : ENTER[edge]
        )}
      >
        {overlay}
      </div>
    </div>
  );
}
