"use client";

import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Nothing here yet, and what to do about it.
 *
 * A first-run state should teach, so it names the thing that will appear and gives one primary
 * action plus one way to learn more. It must never be shown for a search that found nothing —
 * that is a different state with a different next step, and conflating them tells someone who
 * mistyped a filter to create a record they already have.
 */
export function EmptyFirstRun() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
        <FileText className="size-6 text-primary" aria-hidden="true" />
      </div>

      <div className="max-w-sm">
        <p className="font-medium">No invoices yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Invoices appear here once you bill a customer. You can create one by hand, or let them
          be generated from a subscription.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          New invoice
        </Button>
        <Button variant="ghost" size="sm">
          How billing works
        </Button>
      </div>
    </div>
  );
}
