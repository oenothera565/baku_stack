"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { TerminalToggle } from "./TerminalToggle";
import { useLanguage } from "@/context/LanguageContext";
import { getCurrentUserProfile, signOut, type Profile } from "@/lib/supabase";

export function Navbar() {
  const { t } = useLanguage();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentUserProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');

    try {
      await signOut();
      setProfile(null);
      toast.success('Logged out successfully', { id: toastId });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Failed to logout', { id: toastId });
    }
  };

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
          {!loading && (
            <>
              {profile ? (
                // Logged in: show profile name, dashboard, logout
                <>
                  <Link
                    href="/dashboard"
                    className="font-mono text-sm font-medium hover:underline"
                  >
                    /{t.nav.dashboard}
                  </Link>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-black dark:border-white">
                    <span className="font-mono text-xs uppercase">
                      {profile.full_name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="font-mono text-sm font-medium px-3 py-1 border border-black dark:border-white hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                // Not logged in: show login and signup
                <>
                  <Link
                    href="/login"
                    className="font-mono text-sm font-medium hover:underline"
                  >
                    /{t.nav.login}
                  </Link>
                  <Link
                    href="/signup"
                    className="font-mono text-sm font-medium px-3 py-1 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    SIGNUP
                  </Link>
                </>
              )}
            </>
          )}

          <LanguageToggle />
          <TerminalToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
