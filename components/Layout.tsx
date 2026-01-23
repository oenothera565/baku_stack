import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors">
      {children}
    </main>
  );
}
