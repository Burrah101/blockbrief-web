"use client";

import React from "react";

export default function DailyBriefsPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-white">
      {/* Page Container */}
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Today’s <span className="text-sky-400">Daily Briefs</span>
          </h1>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            High-signal updates curated from real builders, market structure,
            chain flows, and narrative shifts — verified and noise-free.
          </p>

          {/* Email Capture */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-[11px] md:text-xs text-slate-400">
              Get the Daily Brief delivered each morning.
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

        {/* Briefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div className="rounded-xl border border-sky-500/40 bg-[#030712]/60 px-6 py-6 shadow-[0_0_18px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
            <h3 className="text-lg font-semibold mb-2">Solana – Builder Heat</h3>
            <p className="text-xs text-sky-400 mb-4">ON-CHAIN • DEV ACTIVITY</p>
            <p className="text-sm text-slate-300">
              Solana dev activity jumped 13% in the last 24h — new infra repos,
              validator upgrades, and two liquidity routing tools shipping into
              mainnet. Early signs of narrative continuation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-sky-500/40 bg-[#030712]/60 px-6 py-6 shadow-[0_0_18px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
            <h3 className="text-lg font-semibold mb-2">Ethereum – Infra Updates</h3>
            <p className="text-xs text-sky-400 mb-4">ROLLUPS • EXECUTION LAYER</p>
            <p className="text-sm text-slate-300">
              Quiet but meaningful infra changes: multiple rollups rolled out
              prover optimizations, L2 fees decreased ~8%, and infra teams
              coordinated the next testnet checkpoint upgrade.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-sky-500/40 bg-[#030712]/60 px-6 py-6 shadow-[0_0_18px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
            <h3 className="text-lg font-semibold mb-2">Bitcoin – Market Structure</h3>
            <p className="text-xs text-sky-400 mb-4">CEX FLOWS • VOLATILITY</p>
            <p className="text-sm text-slate-300">
              Exchange inflows slowed while OTC desk flows picked up — a quiet
              accumulation signal. Volatility compression suggests a major move
              soon.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-sky-500/40 bg-[#030712]/60 px-6 py-6 shadow-[0_0_18px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition">
            <h3 className="text-lg font-semibold mb-2">Narratives – What’s Rotating?</h3>
            <p className="text-xs text-sky-400 mb-4">THEMES • META SHIFTS</p>
            <p className="text-sm text-slate-300">
              AI + Agents continues to dominate attention flow. RWAs cooled.
              Infra (consensus innovation + security layers) is quietly moving.
            </p>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Want deeper insights? BlockBrief Pro unlocks chain rotation models,
            narrative forecasting, and real-time builder signals.
          </p>

          <a
            href="/signals"
            className="inline-block rounded-full bg-sky-600 px-6 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:bg-sky-500 transition"
          >
            View Live Signals
          </a>
        </div>

      </div>
    </main>
  );
}
