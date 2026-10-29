"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paperclip, SendHorizonal, Square } from "lucide-react";

/**
 * A prompt box that grows with its content and submits on Enter.
 *
 * The auto-grow is done by writing the scroll height back onto the element in the change handler,
 * capped so a pasted essay cannot push the send button off screen. Bootstrap-style CSS cannot do
 * this: a textarea has no intrinsic content height, which is why `field-sizing-content` exists but
 * is not yet safe to rely on alone.
 *
 * Enter sends and Shift+Enter inserts a newline — the convention every chat UI uses. It is checked
 * with `!event.shiftKey` rather than a keyCode, and `event.preventDefault()` stops the newline that
 * would otherwise be inserted before state updates.
 *
 * While a response streams, the send button becomes Stop. Rendering both, with one disabled, gives
 * the user two targets for one job and invites clicking the wrong one.
 */
export function PromptComposer() {
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);

  const suggestions = ["Summarise last week", "Why did churn rise?", "Draft a status update"];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button key={suggestion} type="button" onClick={() => setValue(suggestion)}>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/70">
              {suggestion}
            </Badge>
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-2 focus-within:border-primary/50">
        <label htmlFor="ai-prompt" className="sr-only">
          Ask a question
        </label>
        <textarea
          id="ai-prompt"
          rows={1}
          value={value}
          placeholder="Ask anything about your data…"
          onChange={(event) => {
            setValue(event.target.value);
            // Reset first, or the height only ever ratchets upward as text is deleted.
            event.target.style.height = "auto";
            event.target.style.height = `${Math.min(event.target.scrollHeight, 160)}px`;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (value.trim()) setStreaming(true);
            }
          }}
          className="w-full resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
        />

        <div className="flex items-center gap-2 pt-1">
          <Button variant="ghost" size="sm" aria-label="Attach a file">
            <Paperclip className="h-4 w-4" aria-hidden="true" />
          </Button>
          <p className="text-[11px] text-muted-foreground">
            Enter to send · Shift+Enter for a new line
          </p>
          {streaming ? (
            <Button size="sm" variant="outline" className="ms-auto" onClick={() => setStreaming(false)}>
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              className="ms-auto"
              disabled={!value.trim()}
              onClick={() => setStreaming(true)}
            >
              <SendHorizonal className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              Send
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
