"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

/**
 * Validation errors wired up the way screen readers need.
 *
 * Three attributes do the work, and all three are usually missing.
 *
 * `aria-invalid` marks the field as failed, so it is announced as invalid on focus rather than
 * looking merely red. `aria-describedby` points at the message, so the *reason* is read out with the
 * field instead of being an orphaned red string nearby. And the message is `role="alert"`, so it is
 * announced when it appears without the user having to go looking.
 *
 * The summary at the top is a list of links to the failing fields. On a long form this is the
 * difference between a keyboard user finding the third error and tabbing through twenty fields
 * hunting for it — and it is why the fields need `id`s that the summary can target.
 *
 * Messages say what to do, not what went wrong: "Use the format name@company.com" beats "Invalid".
 */
export function FieldErrors() {
  const [submitted, setSubmitted] = useState(true);

  const errors = submitted
    ? [
        { id: "invoice-email", label: "Billing email", message: "Use the format name@company.com" },
        { id: "invoice-vat", label: "VAT number", message: "Must start with a two-letter country code" },
      ]
    : [];

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {/*
        The summary panel is border-only, with no `bg-destructive/5`.
        That tint looks harmless and costs the summary its WCAG AA contrast: `--destructive`
        measures 4.77:1 on the card but 4.36:1 on the tinted panel, because the wash lowers the
        background's luminance just enough to drop under 4.5:1. The red is doing real work here, so
        the background gives way rather than the text colour.
      */}
      {errors.length > 0 && (
        <div role="alert" className="space-y-2 rounded-lg border border-destructive/40 p-3">
          <p className="flex items-center gap-2 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {errors.length} fields need attention
          </p>
          <ul className="list-disc space-y-1 ps-6">
            {errors.map((error) => (
              <li key={error.id} className="text-sm">
                {/* A link, so the summary is navigable rather than merely informative. */}
                <a href={`#${error.id}`} className="text-destructive hover:underline">
                  {error.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="invoice-email">Billing email</Label>
        <Input
          id="invoice-email"
          type="email"
          defaultValue="ana@company"
          aria-invalid={submitted}
          aria-describedby={submitted ? "invoice-email-error" : undefined}
          className="scroll-mt-4"
        />
        {submitted && (
          <p id="invoice-email-error" role="alert" className="text-xs text-destructive">
            Use the format name@company.com
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="invoice-vat">VAT number</Label>
        <Input
          id="invoice-vat"
          defaultValue="99887766"
          aria-invalid={submitted}
          aria-describedby={submitted ? "invoice-vat-error" : undefined}
          className="scroll-mt-4"
        />
        {submitted && (
          <p id="invoice-vat-error" role="alert" className="text-xs text-destructive">
            Must start with a two-letter country code
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" size="sm">
          Save
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Clear errors
        </Button>
      </div>
    </form>
  );
}
