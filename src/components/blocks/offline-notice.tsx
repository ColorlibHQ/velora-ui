"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Wifi, WifiOff } from "lucide-react";

/**
 * A connection notice driven by the real `online` / `offline` events.
 *
 * `navigator.onLine` is read through `useSyncExternalStore` with a server snapshot of `true`, which
 * matters under static export: reading it during render would make the prerendered HTML disagree
 * with the client whenever a visitor loads the page offline, and that is a hydration mismatch.
 *
 * `navigator.onLine` only reports whether an interface is up, not whether the internet is reachable
 * — a captive portal reports online. So the copy says "looks offline" rather than asserting it, and
 * a real app should confirm with a request before showing anything stronger.
 */
function useOnline(): boolean {
  return useSyncExternalStore(
    useCallback((onChange: () => void) => {
      window.addEventListener("online", onChange);
      window.addEventListener("offline", onChange);
      return () => {
        window.removeEventListener("online", onChange);
        window.removeEventListener("offline", onChange);
      };
    }, []),
    () => navigator.onLine,
    // Server snapshot: the export is prerendered as online, so hydration matches.
    () => true,
  );
}

export function OfflineNotice() {
  const online = useOnline();

  return (
    <div className="space-y-3">
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 rounded-lg border p-3",
          online ? "border-border bg-muted/40" : "border-warning/40 bg-warning/10",
        )}
      >
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            online ? "bg-success/10 text-success" : "bg-warning/20 text-warning",
          )}
        >
          {online ? (
            <Wifi className="h-4 w-4" aria-hidden="true" />
          ) : (
            <WifiOff className="h-4 w-4" aria-hidden="true" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{online ? "Connected" : "You look offline"}</p>
          <p className="text-sm text-muted-foreground">
            {online
              ? "Changes are saving normally."
              : "Edits are kept locally and will sync when the connection returns."}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Toggle your network, or use the browser devtools&rsquo; offline mode, to see this switch.
      </p>
    </div>
  );
}
