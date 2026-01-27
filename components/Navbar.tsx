"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { TerminalToggle } from "./TerminalToggle";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-bold uppercase text-lg hover:underline">
          Baku Stack
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="hidden md:block font-mono text-sm font-medium hover:underline"
          >
            /{t.nav.home}
          </Link>
          <Link
            href="/courses"
            className="hidden md:block font-mono text-sm font-medium hover:underline"
          >
            /{t.nav.courses}
          </Link>
          <Link
            href="/login"
            className="font-mono text-sm font-medium hover:underline"
          >
            /{t.nav.login}
          </Link>
          <Link
            href="/dashboard"
            className="font-mono text-sm font-medium hover:underline"
          >
            /{t.nav.dashboard}
          </Link>

          <LanguageToggle />
          <TerminalToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
