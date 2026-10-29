"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Adding an item without leaving the list.
 *
 * The form replaces the button in place rather than opening a dialog, because a single-field
 * create does not warrant losing sight of what you are adding to. Escape closes it and Enter
 * submits, which are the two keys anyone will try.
 *
 * The input is focused when it appears — an inline form that requires a second click to type in
 * is slower than the dialog it was meant to replace.
 */
export function FormInlineCreate() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState(["Design review", "Q3 roadmap", "Vendor security audit"]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setItems([...items, trimmed]);
    setValue("");
    // Left open, so adding several in a row does not need a click between each.
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item} className="py-2 text-sm">
            {item}
          </li>
        ))}
      </ul>

      {open ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
          className="flex items-center gap-2"
        >
          <Input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
            placeholder="What needs doing?"
            aria-label="New item"
            className="h-8 text-sm"
          />
          <Button type="submit" size="sm" className="h-8 shrink-0" disabled={!value.trim()}>
            Add
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setOpen(true)}>
          <Plus className="size-3.5" />
          Add item
        </Button>
      )}
    </div>
  );
}
