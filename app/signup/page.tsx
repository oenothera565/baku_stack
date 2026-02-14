"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { signUp } from "@/lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, fullName);
      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'message' in err
        ? String(err.message)
        : "Failed to create account. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[30vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Path */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          /signup
        </div>

        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-center font-sans">
          CREATE ACCOUNT
        </h1>
        <p className="text-lg font-mono mt-6 text-gray-600 dark:text-gray-400">
          Join Baku Stack and start learning
        </p>
      </section>

      {/* Signup Form */}
      <section className="min-h-[70vh] flex items-center justify-center p-16">
        <div className="w-full max-w-md">
          {/* Success Message */}
          {success && (
            <div className="mb-6 border-2 border-green-600 bg-green-50 dark:bg-green-900/20 p-4">
              <p className="font-mono text-sm text-green-600 dark:text-green-400">
                ✓ Account created successfully! Redirecting...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 border-2 border-red-600 bg-red-50 dark:bg-red-900/20 p-4">
              <p className="font-mono text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="border-2 border-black dark:border-white p-12">
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block font-mono text-sm font-bold uppercase mb-3">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 font-mono text-black dark:text-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block font-mono text-sm font-bold uppercase mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 font-mono text-black dark:text-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block font-mono text-sm font-bold uppercase mb-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 font-mono text-black dark:text-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="•••••••••"
              />
              <p className="text-xs font-mono text-gray-500 mt-2">
                Minimum 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-10">
              <label htmlFor="confirmPassword" className="block font-mono text-sm font-bold uppercase mb-3">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 font-mono text-black dark:text-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="•••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full rounded-none border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black px-6 py-4 text-lg font-bold uppercase tracking-wide hover:opacity-90 transition-opacity font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "CREATING ACCOUNT..." : success ? "SUCCESS!" : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="font-mono text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
