import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-bold uppercase text-lg hover:underline">
          Baku Stack
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/courses"
            className="font-mono text-sm font-medium hover:underline"
          >
            /courses
          </Link>
          <Link
            href="/login"
            className="font-mono text-sm font-medium hover:underline"
          >
            /login
          </Link>
          <Link
            href="/dashboard"
            className="font-mono text-sm font-medium hover:underline"
          >
            /dashboard
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
