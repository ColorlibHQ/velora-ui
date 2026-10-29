"use client";

import { Flame, LogOut, Target } from "lucide-react";
import { StatCard, StatCardGrid } from "@/components/charts";

/**
 * Metrics where a fall is an improvement.
 *
 * `invertTrend` is the whole point. Without it a rising churn rate renders in the positive
 * colour, which is worse than showing no colour at all — it reads as reassurance about a number
 * that is getting worse. Burn rate, churn, attrition, cost per acquisition and average
 * resolution time all belong in this group.
 */
export function StatInvertedTrend() {
  return (
    <StatCardGrid className="sm:grid-cols-3 lg:grid-cols-3">
      <StatCard
        index={0}
        title="Monthly burn"
        value="$182K"
        change={-6.4}
        invertTrend
        icon={Flame}
        tone={3}
        sparkline={[208, 204, 199, 196, 190, 187, 182]}
      />
      <StatCard
        index={1}
        title="Churn rate"
        value="2.4%"
        change={1.8}
        invertTrend
        icon={LogOut}
        tone={5}
        sparkline={[1.9, 2.0, 2.1, 2.0, 2.2, 2.3, 2.4]}
      />
      <StatCard
        index={2}
        title="Cost per lead"
        value="$38.20"
        change={-11.2}
        invertTrend
        icon={Target}
        tone={2}
        sparkline={[47, 45, 44, 42, 41, 39, 38]}
      />
    </StatCardGrid>
  );
}
