"use client";

import React from "react";
import { Users, Waves, Globe2 } from "lucide-react";

export default function DashboardsPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* HERO / INTRO */}
        <section className="mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-sky-400 mb-3 uppercase">
            BLOCKBRIEF ALPHA DASHBOARDS
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            One Place for All Your Builder-Weighted Views
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-3xl">
            As BlockBrief evolves, this is where you&apos;ll get real-time dashboards that blend
            builder activity, on-chain flows, and narrative heat into clear, opinionated intel.
            Right now, these panels are static placeholders — but the layout is ready for live data.
          </p>
        </section>

        {/* DASHBOARD MODULES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <DashCard
            icon={<Users className="w-5 h-5 text-sky-300" />}
            title="Builder Flows"
            description="Tracks teams actually shipping: new repos, commits, governance posts, and protocol upgrades across chains."
            tag="Builders"
          />
          <DashCard
            icon={<Waves className="w-5 h-5 text-emerald-300" />}
            title="Whale Watch"
            description="Monitors meaningful, non-noise capital moves across majors, perps, and DEX pools — no random whale tweets."
            tag="Capital"
          />
          <DashCard
            icon={<Globe2 className="w-5 h-5 text-purple-300" />}
            title="Cross-Chain Heatmap"
            description="A higher-level view of where attention, liquidity, and dev energy are converging this week."
            tag="Cross-Chain"
          />
        </section>

        {/* PLACEHOLDER DASHES GRID */}
        <section className="space-y-6 mb-16">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Dashboards Coming Online
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
            Below is a simple grid that represents where future visualizations will live — charts,
            counters, time-series, and custom queries. The goal is to let you log in, glance once,
            and know exactly what buckets of the market are worth caring about.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashPanel
              title="Chain Rotation Monitor"
              description="Which chains are seeing rising builder + liquidity energy together? This panel will highlight rotations that aren’t just short-lived hype."
            />
            <DashPanel
              title="Narrative Heat Timeline"
              description="A time-series of how different narratives (AI, gaming, L2s, infra, RWAs) rise and fade. Think of it as an x-ray of CT plus actual usage."
            />
            <DashPanel
              title="Perp & Volatility Monitor"
              description="Where is leverage building up, where is it flushing, and what it means for directional risk in the next 24–72 hours."
            />
            <DashPanel
              title="Builder & Fund Alignment"
              description="Highlights where builders and capital are moving in the same direction. When both line up, BlockBrief flags it as a higher-conviction area."
            />
          </div>
        </section>

        {/* CTA ROW */}
        <section className="border-t border-slate-800 pt-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm md:text-base font-semibold mb-1">
              Dashboards are where BlockBrief turns into a cockpit.
            </h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl">
              This page is intentionally simple today — so we can wire it cleanly to real data
              tomorrow. Every panel and block you see here will eventually be fed by live APIs,
              on-chain data, and internal models.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/signals"
              className="rounded-full bg-sky-600 px-5 py-2 text-xs md:text-sm font-semibold shadow-[0_0_18px_rgba(56,189,248,0.7)] hover:bg-sky-500 transition"
            >
              Explore Signals
            </a>
            <a
              href="/daily-briefs"
              className="rounded-full border border-sky-500/80 bg-transparent px-5 py-2 text-xs md:text-sm font-medium text-sky-200 hover:bg-sky-500/10 transition"
            >
              Read Today&apos;s Briefs
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- Subcomponents ---------- */

function DashCard({
  icon,
  title,
  description,
  tag,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}) {
  return (
    <article className="rounded-xl border border-sky-500/50 bg-[#030712]/80 px-5 py-6 shadow-[0_0_20px_rgba(56,189,248,0.25)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15">
          {icon}
        </div>
        <span className="text-[10px] rounded-full border border-sky-400/70 px-2 py-0.5 text-sky-200 bg-sky-500/10">
          {tag}
        </span>
      </div>
      <h3 className="text-sm md:text-base font-semibold text-slate-50 mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-slate-300">{description}</p>
    </article>
  );
}

function DashPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-slate-700/80 bg-[#020617]/80 px-5 py-5 shadow-[0_0_18px_rgba(15,23,42,0.9)]">
      <h4 className="text-sm md:text-base font-semibold text-slate-50 mb-1">
        {title}
      </h4>
      <p className="text-xs md:text-sm text-slate-300">{description}</p>
    </article>
  );
}
