"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";

/**
 * Feedback controls where a thumbs-down asks what was wrong.
 *
 * A bare thumbs-down records that someone was unhappy and nothing about why, which is close to
 * useless. Revealing reason chips turns one bit into something actionable, and it costs the user one
 * extra click only when they were already dissatisfied.
 *
 * The two thumbs are mutually exclusive and use `aria-pressed`, so the chosen state is announced
 * rather than only shown as a filled icon. Selecting one clears the other in state, not just
 * visually — otherwise a rapid up-then-down submits both.
 */
export function ResponseFeedback() {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  const reasons = ["Factually wrong", "Missed the question", "Too vague", "Wrong tone"];

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Revenue rose 12.4% quarter over quarter, driven mostly by expansion in existing accounts.
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Good response"
          aria-pressed={vote === "up"}
          onClick={() => {
            setVote(vote === "up" ? null : "up");
            setReason(null);
          }}
          className={vote === "up" ? "text-success" : undefined}
        >
          <ThumbsUp className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          aria-label="Poor response"
          aria-pressed={vote === "down"}
          onClick={() => setVote(vote === "down" ? null : "down")}
          className={vote === "down" ? "text-destructive" : undefined}
        >
          <ThumbsDown className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button variant="ghost" size="sm" aria-label="Copy response" className="ms-auto">
          <Copy className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Only asked when the answer is that something was wrong. */}
      {vote === "down" && (
        <div className="space-y-2 border-t pt-3">
          <p className="text-xs text-muted-foreground">What was wrong with it?</p>
          <div className="flex flex-wrap gap-2">
            {reasons.map((option) => (
              <button key={option} type="button" onClick={() => setReason(option)}>
                <Badge
                  variant={reason === option ? "default" : "secondary"}
                  className="cursor-pointer"
                >
                  {option}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      <span role="status" aria-live="polite" className="sr-only">
        {vote === "up" ? "Marked as a good response" : ""}
        {vote === "down" && reason ? `Marked as poor: ${reason}` : ""}
      </span>
    </div>
  );
}
