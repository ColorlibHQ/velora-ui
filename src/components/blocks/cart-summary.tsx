"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

/**
 * A cart whose quantity controls change the totals, in integer cents.
 *
 * Money is held as cents and divided only at render. Summing floats puts a cart a penny out for no
 * visible reason — `0.1 + 0.2` is `0.30000000000000004` — and a cart total is precisely where that
 * gets noticed.
 *
 * Decrement stops at 1 rather than reaching 0, because a quantity of zero is a removal and should
 * go through the explicit remove control. Silently deleting a line when someone clicks minus once
 * too often is a small hostile surprise.
 *
 * Each stepper button names its line — "Increase quantity of Aurora Desk Lamp" — since six buttons
 * all labelled "+" are indistinguishable when a screen reader lists them.
 */
export function CartSummary() {
  const [lines, setLines] = useState([
    { id: "lamp", name: "Aurora Desk Lamp", cents: 8900, qty: 2 },
    { id: "chair", name: "Ridge Task Chair", cents: 42000, qty: 1 },
    { id: "mat", name: "Felt Desk Mat", cents: 3200, qty: 3 },
  ]);

  const subtotal = lines.reduce((sum, line) => sum + line.cents * line.qty, 0);
  const shipping = subtotal > 50000 ? 0 : 995;
  const tax = Math.round((subtotal + shipping) * 0.21);
  const total = subtotal + shipping + tax;

  const money = (cents: number) =>
    `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  function setQty(id: string, delta: number) {
    setLines((previous) =>
      previous.map((line) =>
        // Floors at 1: zero is a removal, and that has its own button.
        line.id === id ? { ...line, qty: Math.max(1, line.qty + delta) } : line,
      ),
    );
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <ul className="divide-y">
        {lines.map((line) => (
          <li key={line.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{line.name}</p>
              <p className="text-xs tabular-nums text-muted-foreground">{money(line.cents)} each</p>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                aria-label={`Decrease quantity of ${line.name}`}
                disabled={line.qty === 1}
                onClick={() => setQty(line.id, -1)}
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
              <span className="w-8 text-center text-sm tabular-nums">{line.qty}</span>
              <Button
                variant="outline"
                size="sm"
                aria-label={`Increase quantity of ${line.name}`}
                onClick={() => setQty(line.id, 1)}
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>

            <span className="w-20 text-end text-sm font-medium tabular-nums">
              {money(line.cents * line.qty)}
            </span>

            <Button
              variant="ghost"
              size="sm"
              aria-label={`Remove ${line.name}`}
              onClick={() => setLines((previous) => previous.filter((entry) => entry.id !== line.id))}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </li>
        ))}
      </ul>

      <dl className="space-y-1.5 border-t pt-3">
        <div className="flex justify-between gap-2 text-sm">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-2 text-sm">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="tabular-nums">
            {shipping === 0 ? <span className="text-success">Free</span> : money(shipping)}
          </dd>
        </div>
        <div className="flex justify-between gap-2 text-sm">
          <dt className="text-muted-foreground">VAT (21%)</dt>
          <dd className="tabular-nums">{money(tax)}</dd>
        </div>
        <div className="flex justify-between gap-2 border-t pt-2">
          <dt className="text-sm font-semibold">Total</dt>
          <dd className="text-lg font-bold tabular-nums">{money(total)}</dd>
        </div>
      </dl>

      {shipping > 0 && (
        <p className="text-xs text-muted-foreground">
          Add {money(50000 - subtotal)} more for free shipping.
        </p>
      )}

      <Button className="w-full">Checkout</Button>
    </div>
  );
}
