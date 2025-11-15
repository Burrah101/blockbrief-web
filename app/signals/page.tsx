"use client";

import React, { useEffect, useState } from "react";

type Signal = {
  id: string;
  title: string;
  chain: string;
  type: "narrative" | "flow" | "builder" | "volatility";
  confidence: "low" | "medium" | "high";
  change24h: string;
  summary: string;
  timeAgo: string;
  source: string;
};

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSignals() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/signals");
        const data = await res.json();

        if (!res.ok || !data?.ok) {
          throw new Error(data?.message || "Failed to load signals");
        }

        setSignals(data.signals || []);
      } catch (err: any) {
        console.error("Signals error:", err);
        setError("Unable to load live signals right now.");
      } finally {
        setLoading(false);
      }
    }

    loadSignals();
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-10">
        {/* HEADER */}
        <section className="space-y-3">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-sky-400 uppercase">
            BLOCKBRIEF SIGNALS
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Early reads from builders, flows & narratives.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-3xl">
            These are example signals powered by a simple internal feed. In the future, this page
            will blend on-chain data, liquidity shifts, dev activity, and social heat into a small 
            set of high-conviction calls — not a firehose.
          </p>
        </section>

        {/* STATUS */}
        {loading && (
          <p className="text-xs md:text-sm text-slate-400">
            Loading BlockBrief signals for you…
          </p>
        )}
        {error && !loading && (
          <p className="text-xs md:text-sm text-red-400">{error}</p>
        )}

        {/* SIGNAL GRID */}
        {!loading && !error && (
          <section className="grid gap-6 md:grid-cols-2">
            {signals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </section>
        )}

        {/* EXPLAINER */}
        <section className="border-t border-slate-800 pt-8 mt-10">
          <h2 className="text-sm md:text-base font-semibold mb-2">
            How this evolves
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
            Right now these signals are coming from a mocked internal list — the pipes and structure 
            are live, but the data is static. Step by step, this feed will be wired into real APIs: 
            on-chain metrics, DEX volumes, perp funding, GitHub repos, governance forums and more.
          </p>
        </section>
      </div>
    </main>
  );
}

/* ------------- Subcomponent ------------- */

function SignalCard({ signal }: { signal: Signal }) {
  const badgeColor =
    signal.confidence === "high"
      ? "bg-emerald-500/10 border-emerald-400/70 text-emerald-200"
      : signal.confidence === "medium"
      ? "bg-amber-500/10 border-amber-400/70 text-amber-200"
      : "bg-slate-500/10 border-slate-400/70 text-slate-200";

  return (
    <article className="rounded-2xl border border-sky-500/40 bg-[#050b14]/80 p-5 shadow-[0_0_22px_rgba(56,189,248,0.25)] flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-sky-300">
            {signal.chain}
          </p>
          <h3 className="text-sm md:text-base font-semibold text-slate-50 mt-1">
            {signal.title}
          </h3>
        </div>
        <span
          className={
            "text-[10px] rounded-full border px-2 py-0.5 " + badgeColor
          }
        >
          {signal.confidence.toUpperCase()}
        </span>
      </div>

      <p className="text-xs md:text-sm text-slate-300/95">{signal.summary}</p>

      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 pt-2 border-t border-slate-800/60">
        <span>{signal.change24h}</span>
        <span>
          {signal.timeAgo} • {signal.type.toUpperCase()}
        </span>
      </div>
      <p className="text-[10px] text-slate-500 mt-1 italic">
        Source: {signal.source}
      </p>
    </article>
  );
}
