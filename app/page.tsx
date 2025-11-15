"use client";

import { Shield, Zap, Database } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-[#030712] text-white">
      {/* HERO SECTION */}
      <section
        id="top"
        className="w-full px-6 pt-16 md:pt-20 pb-32 bg-gradient-to-b from-[#0a1628] to-[#030712]"
      >
        <div className="max-w-4xl mx-auto text-center relative">
          {/* glow background */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,#0ea5e9_0,transparent_60%)] opacity-40" />
          <div className="relative">
            {/* Mini title */}
            <p className="text-[10px] md:text-xs tracking-[0.25em] text-slate-400 mb-4">
              CRYPTO INTELLIGENCE
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Crypto News, Alpha &amp; Insights <br />
              from Builders{" "}
              <span className="text-sky-400">Worldwide</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
              Where verified data meets fun, clarity, and culture. Daily briefs,
              market intel, and on-chain signals curated from the best teams
              across every chain. No noise, no drama—just builder-first signal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button className="inline-flex items-center rounded-full bg-gradient-to-b from-[#38bdf8] to-[#0ea5e9] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(56,189,248,0.85)] hover:shadow-[0_0_30px_rgba(56,189,248,1)] transition">
                Join Free
              </button>

              <button className="inline-flex items-center rounded-full border border-sky-400/80 px-6 py-2.5 text-xs md:text-sm font-medium text-slate-100 bg-white/5 hover:bg-white/10 transition">
                View Today&apos;s Brief
              </button>
            </div>

            {/* EMAIL CAPTURE ROW */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-[11px] md:text-xs text-slate-400">
                Stay ahead of every move. Drop your email and we&apos;ll send
                you the Daily Brief.
              </p>

              <form
                className="flex flex-col sm:flex-row items-center gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="you@wallet.com"
                  className="w-64 sm:w-80 rounded-full border border-sky-500/60 bg-black/50 px-4 py-2 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-sky-500/90 px-5 py-2 text-xs md:text-sm font-semibold text-white shadow-[0_0_16px_rgba(56,189,248,0.8)] hover:bg-sky-400 hover:shadow-[0_0_22px_rgba(56,189,248,1)] transition"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNAL > NOISE SECTION */}
      <section id="signals" className="px-6 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-slate-500">
            SIGNAL &gt; NOISE
          </p>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-2">
            AI-powered crypto intelligence that&apos;s accurate, concise, and
            actually fun to read. Every brief is weighted, checked, and ranked
            so you don&apos;t waste time.
          </p>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {/* Card 1 */}
            <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Shield className="w-7 h-7 text-sky-300 mb-3" />
              <h3 className="font-semibold mb-2">Builder-First Reporting</h3>
              <p className="text-sm text-slate-400">
                News and insights sourced directly from founders, core
                contributors, and protocol teams—not random influencers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Zap className="w-7 h-7 text-sky-300 mb-3" />
              <h3 className="font-semibold mb-2">Verified Alpha, Not Rumors</h3>
              <p className="text-sm text-slate-400">
                Every claim is fact-checked, tied to on-chain data, liquidity
                flows, and reputable research you can act on with conviction.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Database className="w-7 h-7 text-sky-300 mb-3" />
              <h3 className="font-semibold mb-2">
                Real Sources &amp; Chain Data
              </h3>
              <p className="text-sm text-slate-400">
                Each brief links out to the original governance posts, GitHub
                commits, threads, and on-chain transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT FOOTER (SIMPLE FOR NOW) */}
      <section
        id="about"
        className="border-t border-slate-800 bg-black/80 px-6 md:px-16 py-10 text-[11px] md:text-xs text-slate-400"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} BlockBrief — Built for clarity, culture
            &amp; fun.
          </p>
          <p className="text-center md:text-right text-slate-500">
            Real builders. Real data. Real signal.
          </p>
        </div>
      </section>
    </main>
  );
}
