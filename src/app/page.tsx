import { CurrentDashboard } from '@/components/TheCurrent';
import MarketPulseCard from '@/components/TheCurrent/MarketPulseCard';
import { EmailCapture, SocialProof } from '@/components/Subscribe';
import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from '@/lib/fetchData';
import { generateAllInsights } from '@/lib/generateInsights';
import { saveBrief } from '@/lib/archive';
import { generateMarketPulse } from '@/lib/marketPulse';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export const revalidate = 300;

async function getPageData() {
  const [market, builders, defi, whales] = await Promise.all([
    getMarketData(),
    getBuilderActivity(),
    getDefiData(),
    getWhaleActivity(),
  ]);

  const insights = await generateAllInsights({
    market: market || undefined,
    builders: builders || undefined,
    defi: defi || undefined,
    whales: whales || undefined,
  });

  saveBrief({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    insights,
    metadata: {
      marketCount: market.length,
      builderCount: builders.length,
      defiCount: defi.length,
      whaleCount: whales.length,
    },
  });

  const pulse = generateMarketPulse({
    market,
    builders,
    defi,
    whales,
  });

  return { insights, pulse };
}

export default async function HomePage() {
  const { insights, pulse } = await getPageData();

  return (
    <main className="min-h-screen bg-[#090909] text-white bg-[radial-gradient(circle_at_top,rgba(255,180,0,0.08),transparent_40%)]">

      {/* HERO */}
      <section className="relative border-b border-white/10 overflow-hidden">

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* GLOW */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-amber-500/10 blur-[120px]" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest text-amber-300 uppercase mb-6">
              <Zap size={14} /> BlockBrief Intelligence
            </div>

            <h1 className="text-7xl md:text-8xl font-black leading-[0.9] tracking-tight">
              Signal
              <span className="block text-white/30 translate-x-6">No</span>
              Noise
            </h1>

            <p className="mt-8 text-xl text-gray-400 max-w-lg">
              Real signals from real ecosystems. No noise, no influencers, no recycled content.
            </p>

            <div className="mt-10 flex gap-4">
              <Link
                href="/subscribe"
                className="bg-amber-400 text-black px-8 py-4 rounded-xl font-bold shadow-[0_0_25px_rgba(255,180,0,0.5)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,180,0,0.6)] transition"
              >
                Join Free
              </Link>

              <Link
                href="/brief"
                className="border border-white/20 px-8 py-4 rounded-xl hover:bg-white/5 transition"
              >
                View Brief
              </Link>
            </div>

            <div className="mt-10">
              <SocialProof variant="compact" />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

            <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">
              Live System
            </div>

            {[
              ['Cardano', '7 Updates', 'green'],
              ['Ethereum', '5 Updates', 'blue'],
              ['Monad', '1 Update', 'amber'],
              ['Macro', 'Live', 'white'],
            ].map(([name, value, color]) => (
              <div key={name} className="flex justify-between items-center py-3 border-b border-white/5 last:border-none">

                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    color === 'green' ? 'bg-green-400' :
                    color === 'blue' ? 'bg-blue-400' :
                    color === 'amber' ? 'bg-amber-400' :
                    'bg-white'
                  } animate-pulse`} />
                  {name}
                </div>

                <div className="text-gray-400 text-sm">{value}</div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* MARKET PULSE */}
      <section className="mx-auto max-w-7xl px-6 mt-[-60px] relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <MarketPulseCard
            score={pulse.score}
            sentiment={pulse.sentiment}
            summary={pulse.summary}
          />
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-xs tracking-widest text-amber-300 uppercase">
              Intelligence Feed
            </div>
            <h2 className="text-4xl font-bold mt-2">
              Real-time ecosystem activity
            </h2>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-4 hover:shadow-[0_0_30px_rgba(255,180,0,0.1)] transition">
          <CurrentDashboard initialInsights={insights} />
        </div>

      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid md:grid-cols-3 gap-12">

          <div className="hover:scale-[1.02] transition">
            <div className="text-amber-400 text-sm mb-2">01</div>
            <h3 className="text-2xl font-bold">Official Sources</h3>
            <p className="text-gray-400 mt-4">
              No influencers. No recycled content. Only direct ecosystem signals.
            </p>
          </div>

          <div className="hover:scale-[1.02] transition">
            <div className="text-amber-400 text-sm mb-2">02</div>
            <h3 className="text-2xl font-bold">Builder Intelligence</h3>
            <p className="text-gray-400 mt-4">
              Funding, governance, development and ecosystem growth.
            </p>
          </div>

          <div className="hover:scale-[1.02] transition">
            <div className="text-amber-400 text-sm mb-2">03</div>
            <h3 className="text-2xl font-bold">Daily System</h3>
            <p className="text-gray-400 mt-4">
              Generated. Ranked. Delivered. Every day.
            </p>
          </div>

        </div>

      </section>

      {/* 🔥 ELITE CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">

        <h2 className="text-6xl font-black leading-tight">
          Stop scrolling.
          <br />
          Start understanding.
        </h2>

        <p className="mt-6 text-gray-400 text-lg">
          Daily intelligence from Cardano, Ethereum, Monad and macro markets.
        </p>

        {/* LIVE FEEL */}
        <div className="mt-6 flex justify-center items-center gap-3 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Updated live • No noise • Builder-first</span>
        </div>

        {/* EMAIL */}
        <div className="mt-10">
          <EmailCapture variant="hero" />
        </div>

        {/* SHARE LOOP */}
        <div className="mt-6 flex justify-center gap-2">

          <button className="text-xs px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 transition">
            Share
          </button>

          <button className="text-xs px-3 py-1 rounded-md bg-green-500/20 text-green-300 hover:bg-green-500/40 transition">
            Copy Link
          </button>

        </div>

        <div className="mt-4 text-xs text-gray-500">
          Join early users tracking real ecosystem signals
        </div>

      </section>

    </main>
  );
}