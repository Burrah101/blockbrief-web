// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BlockBrief – Crypto News, Alpha & Signals from Builders Worldwide",
  description:
    "Verified crypto alpha, on-chain insights, market intel, and daily briefs curated from real builders — not influencers. No noise. Just builder-first signal.",
  keywords: [
    "crypto news",
    "crypto alpha",
    "on-chain data",
    "builder-first analysis",
    "crypto signals",
    "market intelligence",
    "web3 research",
  ],
  openGraph: {
    title: "BlockBrief – Crypto News, Alpha & Signals from Builders Worldwide",
    description:
      "Verified crypto insights and high-signal intel directly from founders and top teams across every chain.",
    url: "https://blockbrief-web.vercel.app",
    siteName: "BlockBrief",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlockBrief – Real Crypto Insights",
    description:
      "No noise. No hype. Just verified alpha and builder-first signals across every chain.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-slate-100 antialiased">
        {/* GLOBAL NAVBAR */}
        <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            {/* Logo + wordmark */}
            <Link href="/" className="flex items-center gap-2 select-none">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
              <span className="text-[17px] font-semibold tracking-[0.22em] uppercase text-white drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]">
                BlockBrief
              </span>
            </Link>

            {/* Main nav links */}
            <div className="hidden md:flex items-center gap-8 text-xs md:text-sm text-slate-300">
              <Link href="/daily-briefs" className="hover:text-sky-400 transition">
                Daily Briefs
              </Link>
              <Link href="/signals" className="hover:text-sky-400 transition">
                Signals
              </Link>
              <Link href="/market-intel" className="hover:text-sky-400 transition">
                Market Intel
              </Link>
              <Link href="/dashboards" className="hover:text-sky-400 transition">
                Dashboards
              </Link>
              <Link href="/about" className="hover:text-sky-400 transition">
                About
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4 text-xs md:text-sm">
              <Link
                href="/login"
                className="text-slate-300 hover:text-sky-400 transition"
              >
                Login
              </Link>
              <Link
                href="/join"
                className="rounded-full bg-gradient-to-br from-sky-400 to-blue-600 px-4 py-1.5 text-white shadow-[0_0_12px_rgba(56,189,248,0.8)] hover:shadow-[0_0_20px_rgba(56,189,248,1)] transition"
              >
                Join Free
              </Link>
            </div>
          </nav>
        </header>

        {/* Spacer so content isn't hidden */}
        <div className="h-20" />

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
