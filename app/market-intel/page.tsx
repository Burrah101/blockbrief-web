"use client";

import React from "react";
import { Activity, LineChart, BarChart3 } from "lucide-react";

export default function MarketIntelPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* HERO / INTRO */}
        <section className="mb-10">
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
          </p>
        </section>

        {/* LIVE MARKET INTEL PANEL */}
        <section className="mb-16">
          <LiveMarketIntel />
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

        {/* MARKET STRUCTURE GRID (STATIC EXAMPLES) */}
        <section className="mb-16 space-y-6">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Market Structure Snapshots
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

/* ---------- LIVE MARKET INTEL COMPONENT ---------- */

function LiveMarketIntel() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadIntel() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/market-intel");
        const json = await res.json();
        if (!json.ok) throw new Error("Bad response");
        setData(json);
      } catch (e) {
        console.error(e);
        setError("Unable to load live market intel right now.");
      } finally {
        setLoading(false);
      }
    }

    loadIntel();
    const id = setInterval(loadIntel, 60000);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="text-xs md:text-sm text-slate-400">
        Loading live market intel…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-xs md:text-sm text-red-400">
        {error || "Unable to load intel."}
      </div>
    );
  }

  return (
    <div className="border border-sky-500/30 rounded-2xl bg-[#030712]/60 shadow-[0_0_24px_rgba(56,189,248,0.25)] p-6">
      <p className="text-[10px] md:text-xs text-sky-300 tracking-[0.25em] mb-4">
        LIVE MARKET INTEL
      </p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm md:text-base">
        <IntelTile label="Total Market Cap" value={`$${data.marketCap}`} />
        <IntelTile label="BTC Dominance" value={`${data.btcDominance}%`} />
        <IntelTile
          label="ETH Price (proxy gas)"
          value={
            data.ethPrice
              ? `$${Number(data.ethPrice).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}`
              : "N/A"
          }
        />
        <IntelTile label="Fear & Greed" value={data.fearGreed} />
        <IntelTile
          label="Top Gainers"
          value={
            Array.isArray(data.topGainers) && data.topGainers.length > 0
              ? data.topGainers
                  .map(
                    (c: any) => `${c.name} (${c.change}%)`
                  )
                  .join(", ")
              : "N/A"
          }
        />
      </div>
    </div>
  );
}

function IntelTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-sky-500/20 bg-[#040b18]/80 p-4 shadow-[0_0_14px_rgba(15,23,42,0.9)]">
      <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-md md:text-lg font-semibold text-slate-50 break-words">
        {value}
      </p>
    </div>
  );
}

/* ---------- EXISTING COMPONENTS (UNCHANGED) ---------- */

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
