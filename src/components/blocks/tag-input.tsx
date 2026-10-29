"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

/**
 * A tag field where Backspace on an empty input removes the last tag.
 *
 * That behaviour is what makes a tag input feel native rather than like a list with a text box
 * above it, and it is the part most implementations skip. Enter and comma both commit, since people
 * type both.
 *
 * Duplicates are rejected case-insensitively but the original casing is kept — adding "React" after
 * "react" should be a no-op, not a second tag, and not a silent rewrite of the first.
 *
 * The live region announces additions and removals. Without it a screen-reader user gets no
 * confirmation that Enter did anything, because the input clears either way.
 */
export function TagInput() {
  const [tags, setTags] = useState(["nextjs", "typescript", "tailwind"]);
  const [draft, setDraft] = useState("");
  const [announcement, setAnnouncement] = useState("");

  function add(raw: string) {
    const value = raw.trim();
    if (!value) return;
    // Case-insensitive dedupe that preserves the existing casing.
    if (tags.some((tag) => tag.toLowerCase() === value.toLowerCase())) {
      setAnnouncement(`${value} is already added`);
      setDraft("");
      return;
    }
    setTags((previous) => [...previous, value]);
    setAnnouncement(`${value} added`);
    setDraft("");
  }

  function remove(tag: string) {
    setTags((previous) => previous.filter((entry) => entry !== tag));
    setAnnouncement(`${tag} removed`);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="tag-field">Topics</Label>

      <div className="flex flex-wrap items-center gap-1.5 rounded-md border p-2 focus-within:border-primary/50">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              aria-label={`Remove ${tag}`}
              className="rounded-full p-0.5 transition-colors hover:bg-background/60"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </span>
        ))}

        <input
          id="tag-field"
          value={draft}
          placeholder={tags.length ? "" : "Add a topic…"}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              add(draft);
              return;
            }
            // The behaviour that makes this feel like a real tag field.
            if (event.key === "Backspace" && draft === "" && tags.length > 0) {
              remove(tags[tags.length - 1]!);
            }
          }}
          className="min-w-[120px] flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Enter or comma to add. Backspace on an empty field removes the last tag.
      </p>

      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
