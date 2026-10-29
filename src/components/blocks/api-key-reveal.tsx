"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

/**
 * A secret shown masked, with a copy that works without revealing it.
 *
 * Copy reads from the full value in state, never from the visible text — so a user can hand the key
 * to a terminal without ever putting it on screen, which is the point of masking it.
 *
 * The masked form keeps the prefix and last four characters. A row of identical dots makes it
 * impossible to tell two keys apart, so people reveal both just to identify one.
 *
 * `navigator.clipboard` is guarded: it is undefined on insecure origins, so an unguarded call
 * throws in exactly the local-HTTP setup a customer develops against.
 */
export function ApiKeyReveal() {
  const keys = [
    { name: "Production", value: "ak_live_9Qv2mK7pRtY4wXz8BnC3dEfG", created: "12 Mar 2026", used: "2 minutes ago" },
    { name: "Staging", value: "ak_test_4Hj8nP2qLvB6yTr9WsX5mKdA", created: "4 Jan 2026", used: "6 days ago" },
  ];

  const [revealed, setRevealed] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const mask = (value: string) => `${value.slice(0, 8)}${"•".repeat(12)}${value.slice(-4)}`;

  async function copy(key: { name: string; value: string }) {
    // Undefined on insecure origins — an unguarded call throws under plain HTTP.
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(key.value);
    setCopied(key.name);
    setTimeout(() => setCopied(null), 1600);
  }

  return (
    <ul className="divide-y rounded-lg border">
      {keys.map((key) => {
        const shown = revealed.includes(key.name);
        return (
          <li key={key.name} className="space-y-2 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">{key.name}</p>
              <Badge variant="secondary" className="text-[10px]">
                Created {key.created}
              </Badge>
              <span className="text-xs text-muted-foreground ms-auto">Used {key.used}</span>
            </div>

            <div className="flex items-center gap-2">
              <code className="min-w-0 flex-1 truncate rounded-md bg-muted px-2 py-1.5 font-mono text-xs">
                {shown ? key.value : mask(key.value)}
              </code>

              <Button
                variant="outline"
                size="sm"
                aria-label={`${shown ? "Hide" : "Reveal"} the ${key.name} key`}
                aria-pressed={shown}
                onClick={() =>
                  setRevealed((previous) =>
                    shown ? previous.filter((name) => name !== key.name) : [...previous, key.name],
                  )
                }
              >
                {shown ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>

              {/* Copies from state, not from the rendered text, so masking never blocks it. */}
              <Button
                variant="outline"
                size="sm"
                aria-label={`Copy the ${key.name} key`}
                onClick={() => copy(key)}
              >
                {copied === key.name ? (
                  <Check className="h-4 w-4 text-success" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>

            <span role="status" className="sr-only">
              {copied === key.name ? `${key.name} key copied` : ""}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
