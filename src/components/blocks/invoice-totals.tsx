"use client";

/**
 * An invoice total that adds up, computed rather than typed.
 *
 * Every figure below the line items is derived — subtotal from the items, tax from the subtotal,
 * total from all three. Hardcoding these in a template is how a demo ships with a total that does
 * not match its rows, which is the first thing anyone evaluating an invoice component checks.
 *
 * Money is held in integer cents and divided only at render. `0.1 + 0.2` is `0.30000000000000004`
 * in IEEE-754, and an invoice is exactly where that surfaces: summing floats gives totals a cent off
 * for no visible reason.
 *
 * The discount is negative and rendered with a leading minus rather than as a separate "you saved"
 * line, so the arithmetic is followable down the column. `tabular-nums` keeps the decimal points in
 * a single vertical line, which is the whole reason financial figures are set that way.
 */
export function InvoiceTotals() {
  // Integer cents throughout; never floats.
  const items = [
    { name: "Platform licence — annual", qty: 1, cents: 240000 },
    { name: "Additional seats", qty: 12, cents: 4500 },
    { name: "Onboarding (one-off)", qty: 1, cents: 75000 },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.cents, 0);
  const discount = -Math.round(subtotal * 0.1);
  const taxable = subtotal + discount;
  const tax = Math.round(taxable * 0.21);
  const total = taxable + tax;

  const money = (cents: number) =>
    `${cents < 0 ? "−" : ""}$${(Math.abs(cents) / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const rows = [
    { label: "Subtotal", cents: subtotal },
    { label: "Volume discount (10%)", cents: discount },
    { label: "VAT (21%)", cents: tax },
  ];

  return (
    <div className="rounded-lg border">
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.name} className="flex items-baseline gap-3 p-3">
            <span className="min-w-0 flex-1 text-sm">{item.name}</span>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {item.qty} × {money(item.cents)}
            </span>
            <span className="w-24 shrink-0 text-end text-sm tabular-nums">
              {money(item.qty * item.cents)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="space-y-2 border-t p-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="text-sm tabular-nums">{money(row.cents)}</dd>
          </div>
        ))}

        <div className="flex items-baseline justify-between gap-3 border-t pt-2">
          <dt className="text-sm font-semibold">Total due</dt>
          <dd className="text-lg font-bold tabular-nums">{money(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
