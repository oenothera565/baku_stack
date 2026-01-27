"use client";

import { createContext, useContext, useEffect, useState } from "react";

type TerminalContextType = {
  isOpen: boolean;
  toggleTerminal: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
};

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

const STORAGE_KEY = "baku-stack-terminal";

function getStoredState(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  } catch {
    return false;
  }
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOpen(getStoredState());
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, String(isOpen));
    }
  }, [isOpen, mounted]);

  const toggleTerminal = () => setIsOpen((prev) => !prev);
  const openTerminal = () => setIsOpen(true);
  const closeTerminal = () => setIsOpen(false);

  return (
    <TerminalContext.Provider value={{ isOpen, toggleTerminal, openTerminal, closeTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
