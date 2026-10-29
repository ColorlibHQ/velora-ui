"use client";

import * as React from "react";
import { Check, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const KEY = "ak_live_9f2b7c41a8e04d63b5170ce9d24af8b1";

/**
 * A secret that is hidden by default and revealed on request.
 *
 * Masked to a prefix plus dots rather than replaced entirely: the prefix is how someone
 * identifies *which* key this is without revealing it, which is the whole reason to show
 * anything at all. Copy works while the key is still hidden — needing to reveal a secret in order
 * to copy it defeats the masking on a shared screen.
 *
 * The visible characters are the *start*, not the end. A trailing fragment is the part that
 * would let someone reconstruct a guessed key; a prefix is a label.
 */
export function FormApiKeyRow() {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(KEY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard denied — the key is still selectable when revealed */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Production key</p>
          <Badge variant="success" className="text-[10px]">Active</Badge>
        </div>
        <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
          {revealed ? KEY : `${KEY.slice(0, 11)}${"•".repeat(24)}`}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Created 12 Mar 2026 · last used 4 hours ago
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setRevealed(!revealed)}
          aria-label={revealed ? "Hide key" : "Reveal key"}
        >
          {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={copy}
          aria-label={copied ? "Key copied" : "Copy key"}
        >
          {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Revoke key">
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
