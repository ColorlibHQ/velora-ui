"use client";

const GROUPS = [
  {
    day: "Today",
    items: [
      { time: "14:02", text: "Invoice INV-2043 marked paid" },
      { time: "11:20", text: "New customer: Northwind Ltd" },
      { time: "09:48", text: "Nightly export completed" },
    ],
  },
  {
    day: "Yesterday",
    items: [
      { time: "17:35", text: "Plan changed to Business, annual" },
      { time: "10:04", text: "API key rotated by Ada L." },
    ],
  },
];

/**
 * The same stream, with the date breaks a long feed needs.
 *
 * A hundred events with no grouping is a wall. The day heading is `sticky` inside the scroll
 * container so it stays put while its own group scrolls past — which is the behaviour that makes
 * a long feed navigable rather than merely divided.
 */
export function FeedGrouped() {
  return (
    <div className="max-h-72 overflow-y-auto pe-1">
      {GROUPS.map((group) => (
        <section key={group.day}>
          <h4 className="sticky top-0 z-10 bg-background/95 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur">
            {group.day}
          </h4>
          <ul className="mb-2 space-y-0.5">
            {group.items.map((item) => (
              <li key={item.time} className="flex gap-3 py-1.5 text-sm">
                <time className="w-12 shrink-0 tabular-nums text-xs text-muted-foreground">
                  {item.time}
                </time>
                <span className="min-w-0">{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
