"use client";

import { Switch } from "@/components/ui/switch";

const SETTINGS = [
  {
    id: "weekly-digest",
    label: "Weekly digest",
    detail: "A summary of activity every Monday at 09:00 in your timezone.",
    on: true,
  },
  {
    id: "mentions",
    label: "Mentions",
    detail: "Email me when someone @-mentions me in a comment.",
    on: true,
  },
  {
    id: "product-news",
    label: "Product news",
    detail: "Occasional notes about new features. No more than monthly.",
    on: false,
  },
];

/**
 * A list of toggles with room to explain each one.
 *
 * The label is a real `<label htmlFor>` rather than adjacent text, so clicking the words toggles
 * the switch — and the detail line is joined by `aria-describedby` rather than being another
 * label, because a screen reader should announce the setting's *name* and then its explanation,
 * not one run-on string.
 *
 * The detail is where the promise lives: "Weekly digest" alone leaves the reader guessing when
 * and how often, which is the question that stops people enabling notifications.
 */
export function FormSettingsRows() {
  return (
    <ul className="divide-y divide-border">
      {SETTINGS.map((setting) => (
        <li key={setting.id} className="flex items-start justify-between gap-6 py-4">
          <div className="min-w-0">
            <label htmlFor={setting.id} className="text-sm font-medium">
              {setting.label}
            </label>
            <p id={`${setting.id}-detail`} className="mt-0.5 text-sm text-muted-foreground">
              {setting.detail}
            </p>
          </div>
          <Switch
            id={setting.id}
            defaultChecked={setting.on}
            aria-describedby={`${setting.id}-detail`}
            className="mt-0.5 shrink-0"
          />
        </li>
      ))}
    </ul>
  );
}
