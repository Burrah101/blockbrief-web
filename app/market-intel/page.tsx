"use client";

import React from "react";
import { Activity, LineChart, BarChart3 } from "lucide-react";

export default function MarketIntelPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* HERO / INTRO */}
        <section className="mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-sky-400 mb-3 uppercase">
            BLOCKBRIEF MARKET INTEL
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            A Builder-Weighted View of the Crypto Market
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-3xl">
            Market structure, flows, and narratives — read through the lens of real builders,
            not just price candles. This page is where BlockBrief&apos;s future on-chain and
            market data will plug into clean, opinionated views of what actually matters.
            For now, these tiles are static examples, but the layout is ready for live feeds.
          </p>
        </section>

        {/* TOP ROW: HIGH-LEVEL STRUCTURE */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <TopCard
            icon={<LineChart className="w-5 h-5 text-sky-300" />}
            title="Macro Regime"
            description="Is the market leaning risk-on, risk-off, or chopping in place? This panel will blend BTC structure, funding, and macro cues."
          />
          <TopCard
            icon={<Activity className="w-5 h-5 text-emerald-300" />}
            title="Flows & Liquidity"
            description="Tracks where liquidity is moving: majors vs. L2s vs. alternatives. CEX + DEX volumes, stablecoin flows, and pool depth."
          />
          <TopCard
            icon={<BarChart3 className="w-5 h-5 text-orange-300" />}
            title="Narrative Stack"
            description="Which narratives actually have traction, measured by builder activity, usage, and real integration — not just tweets."
          />
        </section>

        {/* MARKET STRUCTURE GRID */}
        <section className="mb-16 space-y-6">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Market Structure Snapshots (Static Examples)
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
            These cards will eventually be powered by live prices, volumes, and volatility data. 
            Right now they illustrate how BlockBrief frames each core part of the market: 
            majors, smart contract base layers, and the rotating alt / narrative baskets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MarketCard
              label="BTC – Structural Anchor"
              bucket="MACRO • FUNDING • FLOWS"
              points={[
                "Macro risk gauge: strong BTC structure usually implies room for broader risk.",
                "Tracks perp funding, CEX/OTC flows, and realized volatility compression/expansion.",
                "Used as baseline to decide whether alt setups are worth taking seriously.",
              ]}
            />
            <MarketCard
              label="ETH – Execution & Liquidity Plane"
              bucket="ROLLUPS • L2 FEES • DEFI"
              points={[
                "Focus on L2 fees, rollup adoption, staking dynamics, and blue-chip DeFi volumes.",
                "Signals strength/weakness in the builder economy and UX for new users.",
                "Bridge this with narrative tiles: when infra + usage both pick up, ETH flows matter.",
              ]}
            />
            <MarketCard
              label="SOL – High-Velocity Ecosystem"
              bucket="HIGH THROUGHPUT • NFT + DEGEN FLOW"
              points={[
                "Tracks whether Solana is in 'tourist mode' or steady builder phase.",
                "Looks at DEX volume, meme flows, and tooling launches side by side.",
                "When infra, liquidity, and memecoins all light up — we highlight it as a real rotation.",
              ]}
            />
            <MarketCard
              label="Alt / Narrative Basket"
              bucket="L2S • GAMING • AI • RWAS"
              points={[
                "Instead of chasing every ticker, BlockBrief groups assets into narrative buckets.",
                "Each bucket’s heat will blend price action with dev updates, usage metrics, and partnership news.",
                "This is your 'meta map' — what themes matter this week, and which ones are fading.",
              ]}
            />
          </div>
        </section>

        {/* CTA ROW */}
        <section className="border-t border-slate-800 pt-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm md:text-base font-semibold mb-1">
              This is just the skeleton.
            </h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl">
              In the live version, this page will be powered by real APIs: price feeds, DEX stats,
              builder activity, and cross-chain liquidity moves. BlockBrief ties it all together
              into a story — not a spreadsheet.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/signals"
              className="rounded-full bg-sky-600 px-5 py-2 text-xs md:text-sm font-semibold shadow-[0_0_16px_rgba(56,189,248,0.7)] hover:bg-sky-500 transition"
            >
              View Live Signals
            </a>
            <a
              href="/daily-briefs"
              className="rounded-full border border-sky-500/80 bg-transparent px-5 py-2 text-xs md:text-sm font-medium text-sky-200 hover:bg-sky-500/10 transition"
            >
              Read Daily Briefs
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

/* ---------- Subcomponents ---------- */

function TopCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-sky-500/40 bg-[#030712]/70 px-5 py-5 shadow-[0_0_18px_rgba(56,189,248,0.2)]">
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15">
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-semibold text-slate-50">
          {title}
        </h3>
      </div>
      <p className="text-xs md:text-sm text-slate-300">{description}</p>
    </article>
  );
}

function MarketCard({
  label,
  bucket,
  points,
}: {
  label: string;
  bucket: string;
  points: string[];
}) {
  return (
    <article className="rounded-xl border border-sky-500/40 bg-[#030712]/70 px-5 py-5 shadow-[0_0_22px_rgba(15,23,42,0.9)]">
      <h3 className="text-sm md:text-base font-semibold text-slate-50 mb-1">
        {label}
      </h3>
      <p className="text-[10px] md:text-[11px] tracking-[0.22em] text-sky-300 uppercase mb-4">
        {bucket}
      </p>
      <ul className="space-y-2 text-xs md:text-sm text-slate-300/95">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-[2px] text-sky-400 text-xs">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
