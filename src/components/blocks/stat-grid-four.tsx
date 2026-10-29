"use client";

import { DollarSign, Eye, ShoppingCart, Users } from "lucide-react";
import { StatCard, StatCardGrid } from "@/components/charts";

/**
 * The four-metric opener.
 *
 * `tone` indexes the chart palette rather than naming a colour, so the set stays coherent when
 * the theme's preset changes — hardcoding `text-emerald-500` here would survive a theme switch
 * and clash with everything around it.
 */
export function StatGridFour() {
  return (
    <StatCardGrid>
      <StatCard
        index={0}
        title="Total revenue"
        value="$48,295"
        change={12.5}
        icon={DollarSign}
        tone={1}
        sparkline={[31, 34, 33, 38, 36, 41, 44, 43, 48]}
      />
      <StatCard
        index={1}
        title="Active users"
        value="2,847"
        change={8.2}
        icon={Users}
        tone={2}
        sparkline={[19, 21, 20, 24, 26, 25, 27, 28, 28]}
      />
      <StatCard
        index={2}
        title="Orders"
        value="1,432"
        change={-3.1}
        icon={ShoppingCart}
        tone={3}
        sparkline={[16, 15, 17, 16, 14, 15, 14, 15, 14]}
      />
      <StatCard
        index={3}
        title="Page views"
        value="284K"
        change={24.7}
        icon={Eye}
        tone={4}
        sparkline={[18, 20, 22, 21, 24, 25, 27, 26, 28]}
      />
    </StatCardGrid>
  );
}
