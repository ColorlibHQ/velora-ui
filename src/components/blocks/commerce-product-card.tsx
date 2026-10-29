"use client";

import { Package, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PRODUCTS = [
  { name: "Pro Dashboard License", category: "Templates", price: 299, rating: 4.8, reviews: 214, stock: 999 },
  { name: "UI Component Pack", category: "Components", price: 149, rating: 4.6, reviews: 96, stock: 12 },
  { name: "Enterprise License", category: "Templates", price: 1499, rating: 4.9, reviews: 41, stock: 0 },
];

/**
 * A product tile with the states that matter.
 *
 * Three stock states, not two: in stock, low, and none. Collapsing "low" into "in stock" removes
 * the only stock information anyone acts on, and the button changes with it — offering "Add to
 * cart" for something unavailable is the version of this component people complain about.
 *
 * The rating is a number beside a single star rather than five drawn stars. Five glyphs at this
 * size are hard to read, need a half-star case, and say less than "4.8".
 */
export function CommerceProductCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.map((product) => {
        const out = product.stock === 0;
        const low = !out && product.stock < 20;

        return (
          <Card key={product.name} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex h-24 items-center justify-center rounded-lg bg-muted">
                <Package className="size-7 text-muted-foreground" aria-hidden="true" />
              </div>

              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {product.category}
                </p>
                <p className="mt-0.5 font-medium leading-snug">{product.name}</p>

                <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 fill-warning text-warning" aria-hidden="true" />
                  <span className="tabular-nums">{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold tabular-nums">
                  ${product.price.toLocaleString("en-US")}
                </span>
                {out ? (
                  <Badge variant="secondary" className="text-[11px]">Out of stock</Badge>
                ) : low ? (
                  <Badge variant="warning" className="text-[11px]">{product.stock} left</Badge>
                ) : (
                  <Badge variant="success" className="text-[11px]">In stock</Badge>
                )}
              </div>

              <Button size="sm" className="w-full" disabled={out}>
                {out ? "Notify me" : "Add to cart"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
