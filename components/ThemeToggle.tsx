"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-6 z-50 rounded-none border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-4 py-3 text-sm font-bold uppercase transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
