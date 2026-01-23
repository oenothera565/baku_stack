"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="min-h-[30vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Path */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          {t.login.path}
        </div>

        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight text-center font-sans">
          {t.login.title}
        </h1>
        <p className="text-lg font-mono mt-6 text-gray-600 dark:text-gray-400">
          {t.login.subtitle}
        </p>
      </section>

      {/* Login Form */}
      <section className="min-h-[70vh] flex items-center justify-center p-16">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="border-2 border-black dark:border-white p-12">
            <div className="mb-8">
              <label htmlFor="email" className="block font-mono text-sm font-bold uppercase mb-3">
                {t.login.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 font-mono text-black dark:text-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="cadet@bakustack.com"
              />
            </div>

            <div className="mb-10">
              <label htmlFor="password" className="block font-mono text-sm font-bold uppercase mb-3">
                {t.login.passwordLabel}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-2 border-black dark:border-white bg-transparent px-4 py-3 font-mono text-black dark:text-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                placeholder="•••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-none border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black px-6 py-4 text-lg font-bold uppercase tracking-wide hover:opacity-90 transition-opacity font-sans"
            >
              {t.login.buttonText}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="font-mono text-sm hover:underline"
            >
              {t.login.createAccount}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
