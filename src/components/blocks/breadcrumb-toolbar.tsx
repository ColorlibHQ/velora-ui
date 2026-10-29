"use client";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";

/**
 * A detail-page toolbar: where you are, plus how to move between siblings.
 *
 * The previous/next pair is the part worth copying. On a record page reached from a table, the
 * next thing a user wants is almost always the next row — without it they go back, find their
 * place, and click again.
 *
 * The chevrons use `rtl:rotate-180` rather than swapping the icons, so "previous" stays on the
 * inline-start side in both directions and the arrow still points the way you are going.
 */
export function BreadcrumbToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b pb-4">
      <Breadcrumb className="me-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/orders">Orders</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>ORD-7891</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" aria-label="Previous order">
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </Button>
        <span className="px-2 text-xs tabular-nums text-muted-foreground">412 of 1,284</span>
        <Button variant="outline" size="sm" aria-label="Next order">
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
        </Button>
        <Button size="sm" className="ms-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  );
}
