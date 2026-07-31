import Link from "next/link";
import {
  Flame,
  Zap,
  Rocket,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from "@/lib/fetchData";

import { generateMarketPulse } from "@/lib/marketPulse";
import { composeDailyBrief } from "@/lib/briefComposer";
import { generateNarrative } from "@/lib/narrativeEngine";
import { generateEdge } from "@/lib/edgeEngine";
import { scoreOpportunities } from "@/lib/opportunityScore";

export const revalidate = 300;

export default async function DailyBriefPage() {
  const [market, builders, defi, whales] = await Promise.all([
    getMarketData(),
    getBuilderActivity(),
    getDefiData(),
    getWhaleActivity(),
  ]);

  const pulse = generateMarketPulse({ market, builders, defi, whales });

  const brief = composeDailyBrief({
    pulse,
    marketCount: market.length,
    builderCount: builders.length,
    defiCount: defi.length,
    whaleCount: whales.length,
  });

  const narrative = generateNarrative({ pulse, brief });

  const edge = generateEdge({
    ecosystems: brief.ecosystems || [],
    opportunities: brief.builderOpportunities || [],
    macro: brief.macro || [],
  });

  const opportunityMap = scoreOpportunities(brief.ecosystems || []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-14 text-white">

      {/* HEADER */}
      <div className="mb-14 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs tracking-[0.4em] uppercase font-semibold">
            <Flame size={14} />
            BlockBrief Intelligence
          </div>

          <h1 className="text-5xl font-extrabold mt-4 leading-tight">
            {brief.headline}
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl text-lg">
            {brief.summary}
          </p>

          <p className="text-gray-500 text-sm mt-3">
            ● Updated {new Date().toLocaleTimeString()} — Live signal engine
          </p>
        </div>

        <Link
          href="/"
          className="border border-white/10 rounded-lg px-4 py-2 hover:bg-white/5 transition"
        >
          Dashboard
        </Link>
      </div>

      {/* TODAY’S EDGE */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest mb-4">
          <Zap size={14} />
          Today’s Edge
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-8 shadow-[0_0_40px_rgba(251,191,36,0.1)]">

          <div className="text-xl font-bold text-amber-300">
            → {edge.positioning}
          </div>

        </div>
      </section>

      {/* OPPORTUNITY MAP */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-blue-400 text-xs uppercase tracking-widest mb-4">
          <Rocket size={14} />
          Opportunity Map
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {opportunityMap.map((eco) => (
            <div
              key={eco.name}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-black p-6 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] transition cursor-pointer"
            >

              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">{eco.name}</div>
                <div className="text-2xl font-bold">{eco.score}</div>
              </div>

              <div className={`mt-2 text-sm font-semibold ${eco.color}`}>
                {eco.label}
              </div>

              <div className="text-gray-400 text-xs mt-3">
                {eco.description}
              </div>

              <div className="mt-4 text-xs text-blue-400">
                Explore →
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* WHAT CHANGED */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-green-400 text-xs uppercase tracking-widest mb-4">
          <TrendingUp size={14} />
          What Changed
        </div>

        <div className="rounded-2xl border border-green-400/20 bg-gradient-to-br from-green-500/10 to-transparent p-6 space-y-2">
          <div>↗ Builder activity rising</div>
          <div>⚡ Monad gaining traction</div>
          <div>🧠 Macro neutral</div>
        </div>
      </section>

      {/* WHALE SIGNALS */}
      <section className="mb-12">
        <div className="flex items-center gap-2 text-red-400 text-xs uppercase tracking-widest mb-4">
          <Activity size={14} />
          Whale Signals
        </div>

        <div className="rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/10 to-transparent p-6 space-y-2">
          {whales.slice(0, 3).map((w: any, i: number) => (
            <div key={i}>
              🔴 {w.symbol || "Asset"} — high volume movement
            </div>
          ))}
        </div>
      </section>

      {/* MARKET STATE */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-black p-8 mb-12 shadow-[0_0_60px_rgba(0,0,0,0.6)]">

        <div className="text-xs uppercase tracking-widest text-gray-500">
          Market State
        </div>

        <div className="flex items-end gap-4 mt-4">
          <div className="text-8xl font-extrabold">{pulse.score}</div>
          <div className="text-gray-500 text-xl mb-2">/100</div>
        </div>

        <div className={`text-2xl font-bold mt-3 ${
          pulse.sentiment === "Bullish"
            ? "text-green-400"
            : pulse.sentiment === "Bearish"
            ? "text-red-400"
            : "text-yellow-400"
        }`}>
          {pulse.sentiment}
        </div>

        <p className="mt-6 text-gray-300 text-lg max-w-3xl">
          {pulse.summary}
        </p>

      </section>

      {/* STRATEGIC VIEW */}
      <section>
        <div className="text-xs uppercase tracking-widest text-purple-400 mb-4">
          🧠 Strategic View
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-bold mb-6">
            {narrative.title}
          </h2>

          <div className="space-y-6 text-gray-300">
            {narrative.body.map((p: string) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}