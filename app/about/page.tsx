"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 space-y-16">
        
        {/* INTRO */}
        <section className="space-y-4">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-sky-400 uppercase">
            FOUNDER&apos;S NOTE
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            BlockBrief was born from overload, not opportunity.
          </h1>
          <p className="text-sm md:text-base text-slate-300">
            Like most people who care about crypto and builders, I was drowning in tabs, 
            tweets, threads, Discord screenshots, and charts. Everyone was loud. 
            Almost nobody was clear. BlockBrief is my answer to that problem —
            a place where real builders and real data come first, and noise gets left outside.
          </p>
        </section>

        {/* ORIGIN STORY */}
        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Why BlockBrief exists
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            This didn&apos;t start as a &quot;media company idea&quot;. It started as survival.
            I wanted a way to check the crypto market quickly, without losing half my day.
            A way to know what builders were really doing, not just what influencers were
            yelling about. A way to see rotation, narratives, and on-chain shifts before 
            they turned into echo chambers.
          </p>
          <p className="text-sm md:text-base text-slate-300">
            So instead of opening 12 platforms, I imagined one: a clean panel that says,
            “Here&apos;s what actually changed. Here&apos;s where builders, liquidity, and
            attention moved. Here&apos;s what matters — and here&apos;s what doesn&apos;t.”
          </p>
        </section>

        {/* MISSION */}
        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            The mission (in one line)
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            BlockBrief exists to give every serious human in crypto the same quality of 
            information as a well-networked fund — without the games, the gatekeeping, 
            or the bullshit.
          </p>
        </section>

        {/* PRINCIPLES */}
        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            What we believe
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-slate-300">
            <li>• Builders matter more than influencers.</li>
            <li>• Signal matters more than speed.</li>
            <li>• On-chain data beats vibes.</li>
            <li>• People should not need 8 hours a day to stay informed.</li>
            <li>• Good tools feel calm, not chaotic.</li>
          </ul>
        </section>

        {/* HOW BLOCKBRIEF TREATS YOU */}
        <section className="space-y-3">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            What BlockBrief promises you
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            If you give BlockBrief your attention — whether it&apos;s 30 seconds in the
            morning or a full deep dive on the weekend — the job is simple:
          </p>
          <ul className="space-y-2 text-sm md:text-base text-slate-300">
            <li>• Don&apos;t waste your time.</li>
            <li>• Don&apos;t lie to you.</li>
            <li>• Don&apos;t pretend to know the future.</li>
            <li>• Do show you what builders and markets are actually doing.</li>
            <li>• Do make it easier to think clearly and act on your own terms.</li>
          </ul>
        </section>

        {/* FOUNDER NOTE */}
        <section className="space-y-3 border-t border-slate-800 pt-6">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            A personal note
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            I don&apos;t come from a Wall Street or VC background. I come from the reality 
            of trying to make things work, learning the hard way, and wanting my time 
            and brain back. BlockBrief is as much a tool for me as it is for anyone 
            who&apos;s tired of scrolling for &quot;alpha&quot; and ending up more confused 
            than when they started.
          </p>
          <p className="text-sm md:text-base text-slate-300">
            If this hits you the way it hits me, welcome. You&aposre early to BlockBrief. 
            We&aposll build the rest in the open.
          </p>
          <p className="text-sm text-slate-400 mt-2">
            — Founder, BlockBrief
          </p>
        </section>
      </div>
    </main>
  );
}
