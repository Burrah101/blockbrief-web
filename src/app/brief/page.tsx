import Link from "next/link";
import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from "@/lib/fetchData";

import { generateMarketPulse } from "@/lib/marketPulse";
import { composeDailyBrief } from "@/lib/briefComposer";
import { generateNarrative } from "@/lib/narrativeEngine";

export const revalidate = 300;

export default async function DailyBriefPage() {
  const [market, builders, defi, whales] = await Promise.all([
    getMarketData(),
    getBuilderActivity(),
    getDefiData(),
    getWhaleActivity(),
  ]);

  const pulse = generateMarketPulse({
    market,
    builders,
    defi,
    whales,
  });

  const brief = composeDailyBrief({
    pulse,
    marketCount: market.length,
    builderCount: builders.length,
    defiCount: defi.length,
    whaleCount: whales.length,
  });

  const narrative = generateNarrative({
    pulse,
    brief,
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Today's Brief
          </div>

          <h1 className="text-4xl font-bold mt-2">
            {brief.headline}
          </h1>

          <p className="text-gray-400 mt-3 max-w-3xl">
            {brief.summary}
          </p>
        </div>

        <Link
          href="/"
          className="border border-white/10 rounded-lg px-4 py-2 hover:bg-white/5 transition"
        >
          Dashboard
        </Link>
      </div>

      {/* Market Pulse */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-8 mb-8">
        <div className="text-sm uppercase tracking-widest text-gray-500">
          Market Pulse
        </div>

        <div className="text-6xl font-bold mt-4">
          {pulse.score}
          <span className="text-2xl text-gray-500"> /100</span>
        </div>

        <div className="text-2xl font-semibold mt-2">
          {pulse.sentiment}
        </div>

        <p className="mt-6 text-gray-300 leading-7">
          {pulse.summary}
        </p>
      </section>

      {/* Key Points */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Key Points
        </h2>

        <ul className="space-y-4">
          {brief.keyPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3"
            >
              <span className="text-green-400 mt-1">
                ●
              </span>

              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Executive Narrative */}
      <section className="rounded-xl border border-white/10 bg-white/5 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          {narrative.title}
        </h2>

        <div className="space-y-6">
          {narrative.body.map((paragraph) => (
            <p
              key={paragraph}
              className="leading-8 text-gray-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-gray-400">
            Assets Analyzed
          </div>

          <div className="text-5xl font-bold mt-3">
            {market.length}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-gray-400">
            Builder Updates
          </div>

          <div className="text-5xl font-bold mt-3">
            {builders.length}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-gray-400">
            DeFi Updates
          </div>

          <div className="text-5xl font-bold mt-3">
            {defi.length}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-gray-400">
            Whale Events
          </div>

          <div className="text-5xl font-bold mt-3">
            {whales.length}
          </div>
        </div>
      </section>
    </main>
  );
}