import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Baku Stack",
  description: "Master Coding. Build Future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
