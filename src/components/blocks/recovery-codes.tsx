"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Copy, Download, TriangleAlert } from "lucide-react";

/**
 * One-time recovery codes, gated behind an acknowledgement.
 *
 * "Continue" stays disabled until the checkbox is ticked. These codes are shown exactly once, and a
 * user who clicks past the screen has locked themselves out of their own account — one of the few
 * places where a deliberate speed bump is clearly worth it.
 *
 * Used codes are struck through *and* labelled, so the state does not rest on `line-through` alone,
 * which a screen reader ignores entirely.
 *
 * Copy pulls from the array rather than the DOM, so it captures every code regardless of what is
 * scrolled into view.
 */
export function RecoveryCodes() {
  const codes = [
    "4f9k-2m7p", "8xr3-qw1z", "7bt6-nv4c", "2ld9-hs8y",
    "6cp1-wk3m", "9zn5-tf2q", "3gv8-rb7j", "5hy4-xd6l",
  ];
  const used = ["8xr3-qw1z", "9zn5-tf2q"];

  const [acknowledged, setAcknowledged] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyAll() {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(codes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-warning/20 text-warning">
            <TriangleAlert className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Save your recovery codes</h2>
            <p className="text-sm text-muted-foreground">
              Each code works once. This is the only time they will be shown — regenerating replaces
              all eight.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-3">
          {codes.map((code) => {
            const spent = used.includes(code);
            return (
              <li
                key={code}
                className={
                  spent
                    ? "font-mono text-xs text-muted-foreground line-through"
                    : "font-mono text-xs"
                }
              >
                {code}
                {spent && <span className="sr-only"> — already used</span>}
              </li>
            );
          })}
        </ul>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={copyAll}>
            {copied ? (
              <Check className="h-4 w-4 text-success" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            Copy all
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </Button>
        </div>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
            className="mt-0.5 size-4 accent-primary"
          />
          <span className="text-xs text-muted-foreground">
            I have saved these codes somewhere I can reach without this account.
          </span>
        </label>

        {/* Disabled until acknowledged: clicking past this screen locks you out. */}
        <Button className="w-full" disabled={!acknowledged}>
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
