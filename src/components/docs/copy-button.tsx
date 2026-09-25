"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** Icon button by default; pass `children` for a labelled text button. */
export function CopyButton({
  text,
  label = "Copy to clipboard",
  className,
  children,
}: {
  text: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-label={children ? undefined : label}
      title={children ? undefined : label}
      className={cn(
        "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground",
        children ? "px-3 text-sm font-medium" : "w-8",
        className
      )}
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? (
        <CheckIcon className="size-4 text-emerald-500" />
      ) : (
        <CopyIcon className="size-4" />
      )}
      {children}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
