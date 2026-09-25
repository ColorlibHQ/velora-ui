"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { ThemeToggler } from "@/components/velora/theme-toggler";

const noop = () => () => {};

export default function ThemeTogglerDemo() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is unknown on the server; match its markup until hydrated.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <div className="flex flex-col items-center gap-3">
      <ThemeToggler
        isDark={isDark}
        onToggle={() => setTheme(isDark ? "light" : "dark")}
      />
      <p className="text-sm text-muted-foreground">
        Wipes the theme in from the button
      </p>
    </div>
  );
}
