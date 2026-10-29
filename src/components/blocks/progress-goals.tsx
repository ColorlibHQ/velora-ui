"use client";

const GOALS = [
  { label: "Monthly revenue", current: 48295, target: 55000, unit: "$" },
  { label: "New customers", current: 847, target: 1000, unit: "" },
  { label: "Conversion rate", current: 6.2, target: 8, unit: "", suffix: "%" },
  { label: "Support CSAT", current: 4.6, target: 4.5, unit: "", suffix: "/5" },
];

/**
 * Several targets and how far along each one is.
 *
 * The percentage is computed rather than stored, so the bar and the number can never disagree —
 * the failure mode of a progress list is a hardcoded width beside a recalculated label.
 *
 * `aria-valuenow` on a `role="progressbar"` for each row, because the fill's width is a visual
 * fact only; without it a screen reader gets the label and nothing else.
 */
export function ProgressGoals() {
  return (
    <ul className="space-y-4">
      {GOALS.map((goal) => {
        const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
        const met = goal.current >= goal.target;

        return (
          <li key={goal.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{goal.label}</span>
              <span className="tabular-nums text-muted-foreground">{pct}%</span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${goal.label}: ${pct}% of target`}
              className="h-2 overflow-hidden rounded-full bg-muted"
            >
              <div
                className={met ? "h-full rounded-full bg-success" : "h-full rounded-full bg-primary"}
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground">
              <span>
                {goal.unit}
                {goal.current.toLocaleString("en-US")}
                {goal.suffix}
              </span>
              <span>
                Target {goal.unit}
                {goal.target.toLocaleString("en-US")}
                {goal.suffix}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
