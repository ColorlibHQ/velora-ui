"use client";

import { Separator } from "@/components/ui/separator";

const LINES = [
  { label: "Pro Dashboard License × 2", value: 598 },
  { label: "Extended support, 12 months", value: 249 },
];
const DISCOUNT = 84.7;
const TAX_RATE = 0.2;

/**
 * An order total that shows its arithmetic.
 *
 * Every figure below the lines is computed, not written down — the fastest way to lose a buyer's
 * trust is a total that does not equal the sum above it, and hardcoding the total in a template
 * guarantees that the moment someone edits a line.
 *
 * The discount is negative and coloured, and tax is calculated on the *discounted* subtotal,
 * which is the order almost every jurisdiction requires and the one people get wrong.
 */
export function CommerceOrderSummary() {
  const subtotal = LINES.reduce((sum, line) => sum + line.value, 0);
  const taxable = subtotal - DISCOUNT;
  const tax = taxable * TAX_RATE;
  const total = taxable + tax;

  const money = (value: number) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {LINES.map((line) => (
          <li key={line.label} className="flex justify-between gap-4 text-sm">
            <span className="min-w-0 text-muted-foreground">{line.label}</span>
            <span className="shrink-0 tabular-nums">{money(line.value)}</span>
          </li>
        ))}
      </ul>

      <Separator />

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Discount (LAUNCH10)</dt>
          <dd className="tabular-nums text-success">−{money(DISCOUNT)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">VAT at {TAX_RATE * 100}%</dt>
          <dd className="tabular-nums">{money(tax)}</dd>
        </div>
      </dl>

      <Separator />

      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold">Total</span>
        <span className="text-lg font-bold tabular-nums">{money(total)}</span>
      </div>
    </div>
  );
}
