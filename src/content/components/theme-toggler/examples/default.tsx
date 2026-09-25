"use client";

import { useTheme } from "next-themes";

import { ThemeToggler } from "@/components/velora/theme-toggler";

export default function ThemeTogglerDemo() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-3">
      <ThemeToggler
        isDark={resolvedTheme === "dark"}
        onToggle={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      <p className="text-sm text-muted-foreground">
        Wipes the theme in from the button
      </p>
    </div>
  );
}
