"use client";

import { CreditCard, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CARDS = [
  { brand: "Visa", last4: "4242", expiry: "04 / 28", primary: true },
  { brand: "Mastercard", last4: "8210", expiry: "11 / 26", primary: false },
  { brand: "Amex", last4: "1005", expiry: "02 / 26", primary: false, expiringSoon: true },
];

/**
 * Saved cards, with the one thing a billing page must surface.
 *
 * An expiring card is called out, because a payment that fails silently at renewal is the most
 * expensive avoidable event on a billing page. It is flagged in words, not by colouring the
 * expiry date — colour alone is invisible to anyone with reduced colour vision, and this is the
 * warning that must not be missed.
 *
 * Only the last four digits, ever. A template that shows a full card number teaches the wrong
 * pattern to whoever copies it.
 */
export function CommercePaymentMethods() {
  return (
    <div className="space-y-2">
      <ul className="divide-y divide-border">
        {CARDS.map((card) => (
          <li key={card.last4} className="flex items-center gap-3 py-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="size-4 text-muted-foreground" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-medium">
                {card.brand} ending {card.last4}
                {card.primary && (
                  <Badge variant="secondary" className="text-[10px]">Default</Badge>
                )}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Expires {card.expiry}
                {card.expiringSoon && (
                  <span className="ms-1.5 font-semibold text-foreground">· expiring soon</span>
                )}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 text-xs"
              aria-label={`Manage ${card.brand} ending ${card.last4}`}
            >
              Manage
            </Button>
          </li>
        ))}
      </ul>

      <Button variant="outline" size="sm" className="gap-1.5">
        <Plus className="size-3.5" />
        Add payment method
      </Button>
    </div>
  );
}
