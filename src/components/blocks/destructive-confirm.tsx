"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

/**
 * A destructive action gated on typing the resource name.
 *
 * The type-to-confirm pattern exists because a second "Are you sure?" dialog trains people to click
 * through it. Requiring the exact name forces the user to read what they are about to destroy, and it
 * makes the dangerous action impossible to trigger by muscle memory or a stray Enter.
 *
 * The comparison is deliberately case-sensitive and untrimmed. Accepting "ACME-PROD " defeats the
 * point: the check is not there to be passed conveniently.
 *
 * The confirm button is `disabled` rather than hidden, so its existence and its precondition are
 * both visible. `aria-describedby` ties the button to the instruction, so a screen-reader user
 * reaching a disabled button is told why it is disabled instead of being left to guess.
 */
export function DestructiveConfirm() {
  const target = "acme-prod";
  const [typed, setTyped] = useState("");
  const armed = typed === target;

  return (
    <div className="space-y-4 rounded-lg border border-destructive/40 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium">Delete this environment</p>
          <p className="text-sm text-muted-foreground">
            This removes the database, all 1,284 stored records and every API key. It cannot be
            undone and there is no backup older than 24 hours.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-name" id="confirm-hint" className="text-xs font-normal">
          Type <span className="font-mono font-semibold text-foreground">{target}</span> to confirm
        </Label>
        <Input
          id="confirm-name"
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          // Every one of these off: an autocorrected or capitalised value would never match, and the
          // user would be left retyping a name that looks correct on screen.
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={target}
          className="font-mono"
        />
      </div>

      <Button
        variant="destructive"
        disabled={!armed}
        aria-describedby="confirm-hint"
        className="w-full"
      >
        Delete environment
      </Button>
    </div>
  );
}
