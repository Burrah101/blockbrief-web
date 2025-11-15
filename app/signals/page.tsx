"use client";

import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { Flame, Activity, Radar } from "lucide-react";

export default function SignalsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-50 px-6 md:px-16 pb-24">
      {/* PAGE HEADER */}
      <section className="max-w-5xl mx-auto pt-16 md:pt-20 pb-10 border-b border-white/5">
        <p className="text-[10px] md:text-xs tracking-[0.25em] text-sky-400 mb-3">
          BLOCKBRIEF SIGNALS
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Early Signals from Real Builders &amp; Real Flows
        </h1>
        <p className="text-sm md:text-base text-slate-300/90 max-w-3xl">
          This is where BlockBrief highlights the earliest hints of rotation, new narratives,
          emerging ecosystems, and builder activity — BEFORE it trends on CT. For now,
          these examples are static, but this page is designed for live data.
        </p>
      </section>

      {/* SIGNAL GRID */}
      <section className="max-w-5xl mx-auto pt-10 space-y-8">
        {/* Row 1 */}
        <div className="grid gap-6 md:grid-cols-3">
          <SignalCard
            icon={<Flame className="w-5 h-5 text-orange-300" />}
            label="Narrative Heat"
            chain="Cross-Chain"
            description="Tracks which narratives (L2 scaling, restaking, RWAs, AI agents) are picking up multi-chain social + on-chain traction."
            badge="Soon"
          />
          <SignalCard
            icon={<Activity className="w-5 h-5 text-emerald-300" />}
            label="Liquidity Shift"
            chain="Solana, Ethereum"
            description="Spikes in liquidity moving between majors, perps OI, and new pools — early warning for volatility clusters."
            badge="Planned"
          />
          <SignalCard
            icon={<Radar className="w-5 h-5 text-sky-300" />}
            label="Builder Radar"
            chain="All Chains"
            description="New teams, funding rounds, and dev activity on repos and governance forums from credible builders."
            badge="Beta"
          />
        </div>

        {/* Row 2 - Description Block */}
        <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
          <div className="flex items-center gap-2 mb-3">
            <ArrowTrendingUpIcon className="w-5 h-5 text-sky-300" />
            <h2 className="text-sm md:text-base font-semibold">
              What Signals Will Look Like in Production
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-300/90 mb-2">
            In the live version, all of these blocks will be powered by real data: on-chain
            metrics, liquidity, perps OI, developer activity, and governance events. Instead of
            doomscrolling, you&apos;ll get a few high-conviction signals, with links back to the raw
            sources.
          </p>
          <p className="text-xs md:text-sm text-slate-400">
            BlockBrief doesn&apos;t try to guess tops or bottoms — it points out where builders,
            capital, and attention are actually flowing, across chains, in near real-time.
          </p>
        </div>
      </section>
    </main>
  );
}

function SignalCard({
  icon,
  label,
  chain,
  description,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  chain: string;
  description: string;
  badge: string;
}) {
  return (
    <article className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-5 shadow-[0_0_20px_rgba(56,189,248,0.2)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20">
          {icon}
        </div>
        <span className="text-[10px] rounded-full border border-sky-400/70 px-2 py-0.5 text-sky-200 bg-sky-500/10">
          {badge}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold">{label}</h3>
        <p className="text-[11px] uppercase tracking-[0.18em] text-sky-300">
          {chain}
        </p>
        <p className="mt-2 text-xs md:text-sm text-slate-300/90">{description}</p>
      </div>
    </article>
  );
}
