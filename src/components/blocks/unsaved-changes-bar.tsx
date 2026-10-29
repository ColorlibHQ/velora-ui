"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * A settings form whose save bar appears only when something actually changed.
 *
 * "Dirty" is computed by comparing the current values against the values the form loaded with, not
 * by setting a flag in the change handler. That distinction matters: with a flag, typing a character
 * and deleting it again leaves the form permanently dirty, so the user is warned about discarding
 * changes they no longer have.
 *
 * The initial values live in a `useState` initialiser rather than a module constant, so the baseline
 * is captured per mount — which is what a real form does after a successful save.
 *
 * The bar is `role="region"` with a name, and its buttons state the count, so "Discard 2 changes" is
 * unambiguous about scope. A bare "Discard" next to a form is the button people fear most.
 */
export function UnsavedChangesBar() {
  const [initial] = useState({ name: "Acme Corporation", email: "billing@acme.test" });
  const [values, setValues] = useState(initial);

  const changed = (Object.keys(initial) as (keyof typeof initial)[]).filter(
    (key) => values[key] !== initial[key],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="org-name">Organisation name</Label>
        <Input
          id="org-name"
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="org-email">Billing email</Label>
        <Input
          id="org-email"
          type="email"
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        />
      </div>

      {changed.length > 0 ? (
        <div
          role="region"
          aria-label="Unsaved changes"
          className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-3 shadow-sm"
        >
          <p className="text-sm text-muted-foreground">
            {changed.length} unsaved {changed.length === 1 ? "change" : "changes"}
          </p>
          <div className="flex gap-2 ms-auto">
            <Button variant="outline" size="sm" onClick={() => setValues(initial)}>
              Discard {changed.length === 1 ? "change" : `${changed.length} changes`}
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Edit a field above — the save bar appears only once a value differs from what loaded, and
          disappears again if you undo it.
        </p>
      )}
    </div>
  );
}
