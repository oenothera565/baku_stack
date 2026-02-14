import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { TerminalProvider } from "@/context/TerminalContext";
import { TerminalChat } from "@/components/TerminalChat";
import { ToastProvider } from "@/components/ToastProvider";

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
        <LanguageProvider>
          <TerminalProvider>
            <ThemeProvider>
              <Navbar />
              {children}
              <TerminalChat />
              <ToastProvider />
            </ThemeProvider>
          </TerminalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
