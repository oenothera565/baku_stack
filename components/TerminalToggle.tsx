"use client";

import { useTerminal } from "@/context/TerminalContext";

export function TerminalToggle() {
  const { isOpen, toggleTerminal } = useTerminal();

  return (
    <button
      onClick={toggleTerminal}
      className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center gap-2"
      aria-label="Toggle terminal"
    >
      <span className="text-green-500">{'>'}_</span>
      <span>{isOpen ? "CLOSE" : "AI"}</span>
    </button>
  );
}
