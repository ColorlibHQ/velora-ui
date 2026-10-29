"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

/**
 * Settings rows where the description is tied to the switch, not just near it.
 *
 * `aria-describedby` on the switch pointing at the description's id is what makes the explanation
 * part of the control. Otherwise a screen-reader user hears "Weekly digest, switch, on" and never
 * the sentence explaining what it sends — the text is visually adjacent and programmatically
 * unrelated.
 *
 * A dependent row is disabled *and* explains why, rather than being hidden. A control that vanishes
 * when its parent is off leaves the user unable to discover the option exists.
 */
export function SettingsToggleRows() {
  const [settings, setSettings] = useState({
    email: true,
    digest: true,
    mentions: false,
    marketing: false,
  });

  const rows = [
    {
      id: "email",
      label: "Email notifications",
      description: "The master switch. Turning this off silences every email below.",
      dependsOn: null,
    },
    {
      id: "digest",
      label: "Weekly digest",
      description: "A Monday summary of orders, revenue and open tickets.",
      dependsOn: "email" as const,
    },
    {
      id: "mentions",
      label: "Mentions",
      description: "When someone @-mentions you in a comment or a ticket.",
      dependsOn: "email" as const,
    },
    {
      id: "marketing",
      label: "Product updates",
      description: "New features and release notes. At most once a month.",
      dependsOn: "email" as const,
    },
  ] as const;

  return (
    <ul className="divide-y rounded-lg border">
      {rows.map((row) => {
        const blocked = row.dependsOn ? !settings[row.dependsOn] : false;
        return (
          <li key={row.id} className="flex items-start justify-between gap-4 p-3">
            <div className="min-w-0 space-y-0.5">
              <Label htmlFor={`toggle-${row.id}`} className="text-sm font-medium">
                {row.label}
              </Label>
              <p id={`toggle-${row.id}-hint`} className="text-xs text-muted-foreground">
                {blocked ? "Turn on email notifications to enable this." : row.description}
              </p>
            </div>

            <Switch
              id={`toggle-${row.id}`}
              checked={settings[row.id] && !blocked}
              disabled={blocked}
              // The description becomes part of the control's accessible name chain.
              aria-describedby={`toggle-${row.id}-hint`}
              onCheckedChange={(next) =>
                setSettings((previous) => ({ ...previous, [row.id]: next }))
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
