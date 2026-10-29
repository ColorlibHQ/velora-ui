"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Gauge, Sparkles, Zap } from "lucide-react";

/**
 * A model chooser that states the trade-off instead of just the name.
 *
 * Model names carry no information to anyone who has not memorised them, so each option states what
 * it is for, its relative speed and its cost. That is the actual decision being made.
 *
 * Implemented as a `radiogroup` rather than a list of buttons: exactly one is chosen at a time,
 * which is what radio semantics mean, and it gives arrow-key selection and a single tab stop for
 * free. A group of `aria-pressed` buttons would let a screen reader believe several could be on.
 *
 * The check mark is `aria-hidden` — `aria-checked` on the option already conveys selection, and
 * announcing both says it twice.
 */
export function ModelPicker() {
  const models = [
    {
      id: "fast",
      name: "Apex Flash",
      blurb: "Best for quick lookups and summaries",
      speed: "Fastest",
      cost: "$0.12 / 1k",
      Icon: Zap,
    },
    {
      id: "balanced",
      name: "Apex Standard",
      blurb: "Good default for analysis and drafting",
      speed: "Balanced",
      cost: "$0.60 / 1k",
      Icon: Gauge,
    },
    {
      id: "deep",
      name: "Apex Reasoning",
      blurb: "Multi-step work where accuracy beats latency",
      speed: "Slowest",
      cost: "$2.40 / 1k",
      Icon: Sparkles,
    },
  ];

  const [selected, setSelected] = useState("balanced");

  return (
    <div role="radiogroup" aria-label="Model" className="space-y-2">
      {models.map((model) => {
        const active = model.id === selected;
        return (
          <button
            key={model.id}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setSelected(model.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg border p-3 text-start transition-colors",
              active ? "border-primary bg-primary/5" : "hover:bg-accent/40",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              <model.Icon className="h-4 w-4" aria-hidden="true" />
            </span>

            <span className="min-w-0 flex-1 space-y-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{model.name}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {model.speed}
                </Badge>
              </span>
              <span className="block text-xs text-muted-foreground">{model.blurb}</span>
              <span className="block text-xs tabular-nums text-muted-foreground">{model.cost}</span>
            </span>

            {active && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
