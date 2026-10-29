"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

/**
 * A password field that says what it wants before you get it wrong.
 *
 * Requirements are listed up front and tick as they are met, rather than being revealed by a
 * rejection after submit. That is the whole point — a strength meter with no criteria tells you
 * "weak" without telling you what would fix it.
 *
 * The rules list is a `role="status"` region with `aria-live="polite"`, so a screen-reader user
 * hears requirements being satisfied as they type. Without it the ticks are purely visual and the
 * form is unusable without sight. `aria-hidden` on the icons keeps the announcement to the text.
 *
 * The score drives `aria-valuetext` on the meter as a word, not a number: "Strong" is meaningful
 * where "3" is not.
 */
export function PasswordStrength() {
  const [value, setValue] = useState("Tr0ubadour");

  const rules = [
    { label: "At least 12 characters", met: value.length >= 12 },
    { label: "A number", met: /\d/.test(value) },
    { label: "An uppercase letter", met: /[A-Z]/.test(value) },
    { label: "A symbol", met: /[^\w\s]/.test(value) },
  ];

  const score = rules.filter((rule) => rule.met).length;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const tones = [
    "bg-muted",
    "bg-destructive",
    "bg-warning",
    "bg-warning",
    "bg-success",
  ];

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-password">New password</Label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>

      <div
        role="meter"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={score}
        aria-valuetext={labels[score]}
        className="space-y-1.5"
      >
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index < score ? tones[score] : "bg-muted",
              )}
            />
          ))}
        </div>
        <p className="text-xs font-medium text-muted-foreground">{labels[score]}</p>
      </div>

      {/*
        The live region is a wrapper, NOT the <ul> itself.
        `role="status"` on the list would REPLACE its implicit `list` role, leaving every <li>
        with a parent that is not a list — axe reports it as `listitem`, serious, and a screen
        reader stops announcing "1 of 4". Wrapping keeps both: the announcement and the list.
      */}
      <div role="status" aria-live="polite">
        <ul className="space-y-1.5">
          {rules.map((rule) => (
            <li
              key={rule.label}
              className={cn(
                "flex items-center gap-2 text-xs",
                rule.met ? "text-success" : "text-muted-foreground",
              )}
            >
              {rule.met ? (
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              ) : (
                <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              {rule.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
