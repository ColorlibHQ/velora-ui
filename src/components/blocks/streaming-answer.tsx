"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Square } from "lucide-react";

const ANSWER =
  "Refunds rose 38% week over week, and all of the increase is in the EU store. The VAT threshold changed on the 25th, so checkout is quoting duty that customers are then charged again on delivery. Support tickets corroborate it: every one mentions an unexpected charge on arrival.";

/**
 * `prefers-reduced-motion` as a subscription, so the value is known during render.
 *
 * Setting state from inside the effect to handle the reduced case triggers a second render pass
 * before paint — React's lint rule flags it. Reading it here means the stream simply never starts.
 * Server snapshot `false` matches what the static export prerenders.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    useCallback((onChange: () => void) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    }, []),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * A streaming response that respects `prefers-reduced-motion`.
 *
 * Under reduced motion the answer appears whole rather than typing out. That is not a nicety — text
 * revealing itself character by character is exactly the continuous motion the setting exists to
 * suppress, and for some readers it makes the content unreadable while it runs.
 *
 * The region is `aria-live="polite"` with `aria-busy` while streaming, so a screen reader is not
 * read a partial sentence on every tick. Announcing each chunk is worse than announcing nothing:
 * the user hears the same sentence restart twenty times.
 *
 * The interval is cleared in the effect's cleanup, which matters because this block can be unmounted
 * mid-stream by its lazy preview scrolling out of range.
 */
export function StreamingAnswer() {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);
  const [streaming, setStreaming] = useState(true);

  useEffect(() => {
    if (!streaming || reduced) return;

    const timer = setInterval(() => {
      setShown((previous) => {
        const next = previous + 3;
        if (next >= ANSWER.length) {
          clearInterval(timer);
          return ANSWER.length;
        }
        return next;
      });
    }, 24);

    return () => clearInterval(timer);
  }, [streaming, reduced]);

  // Reduced motion yields the whole response; otherwise show however much has arrived.
  const visible = reduced ? ANSWER.length : shown;
  const running = streaming && !reduced && visible < ANSWER.length;

  return (
    <div className="space-y-3">
      <div
        aria-live="polite"
        aria-busy={running}
        className="min-h-[96px] rounded-lg border bg-card p-4"
      >
        <p className="text-sm leading-relaxed">
          {ANSWER.slice(0, visible)}
          {running && (
            <span
              aria-hidden="true"
              className="ms-0.5 inline-block h-4 w-1.5 animate-pulse bg-primary align-text-bottom"
            />
          )}
        </p>
      </div>

      <div className="flex gap-2">
        {running ? (
          <Button variant="outline" size="sm" onClick={() => setStreaming(false)}>
            <Square className="h-3.5 w-3.5" aria-hidden="true" />
            Stop
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={reduced}
            onClick={() => {
              setShown(0);
              setStreaming(true);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Regenerate
          </Button>
        )}
      </div>
    </div>
  );
}
