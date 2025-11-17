"use client";

import React, { useEffect, useState } from "react";
import { Shield, Zap, Database } from "lucide-react";

type MarketAsset = {
  id: string;
  label: string;
  symbol: string;
  price: number;
  change24h: number;
};

export default function Page() {
  // Email subscribe state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(data?.message || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll see you in tomorrow’s Brief. 💙");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#030712] text-white">
      {/* HERO SECTION */}
      <section
        id="top"
        className="w-full px-6 pt-16 md:pt-20 pb-32 bg-gradient-to-b from-[#0a1628] to-[#030712]"
      >
        <div className="max-w-4xl mx-auto text-center relative">
          {/* glow background */}
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,#0ea5e9_0,transparent_60%)] opacity-40" />
          <div className="relative">
            {/* Mini title */}
            <p className="text-[10px] md:text-xs tracking-[0.25em] text-slate-400 mb-4">
              CRYPTO INTELLIGENCE
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Crypto News, Alpha &amp; Insights <br />
              from Builders <span className="text-sky-400">Worldwide</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
              Where verified data meets fun, clarity, and culture. Daily briefs,
              market intel, and on-chain signals curated from the best teams
              across every chain. No noise, no drama—just builder-first signal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button className="inline-flex items-center rounded-full bg-gradient-to-b from-[#38bdf8] to-[#0ea5e9] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(56,189,248,0.85)] hover:shadow-[0_0_30px_rgba(56,189,248,1)] transition">
                Join Free
              </button>

              <button className="inline-flex items-center rounded-full border border-sky-400/80 px-6 py-2.5 text-xs md:text-sm font-medium text-slate-100 bg-white/5 hover:bg-white/10 transition">
                View Today&apos;s Brief
              </button>
            </div>

            {/* EMAIL CAPTURE ROW (REAL) */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <p className="text-[11px] md:text-xs text-slate-400">
                Stay ahead of every move. Drop your email and we&apos;ll send
                you the Daily Brief.
              </p>

              <form
                className="flex flex-col sm:flex-row items-center gap-3"
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  required
                  placeholder="you@wallet.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64 sm:w-80 rounded-full border border-sky-500/60 bg-black/50 px-4 py-2 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center rounded-full bg-sky-500/90 px-5 py-2 text-xs md:text-sm font-semibold text-white shadow-[0_0_16px_rgba(56,189,248,0.8)] hover:bg-sky-400 hover:shadow-[0_0_22px_rgba(56,189,248,1)] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Notify Me"}
                </button>
              </form>

              {status === "success" && (
                <p className="text-[11px] md:text-xs text-emerald-400 mt-1">
                  {message}
                </p>
              )}
              {status === "error" && (
                <p className="text-[11px] md:text-xs text-red-400 mt-1">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE MARKET STRIP */}
      <MarketStrip />

      {/* SIGNAL > NOISE SECTION */}
      <section id="signals" className="px-6 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] md:text-xs tracking-[0.25em] text-slate-500">
            SIGNAL &gt; NOISE
          </p>

          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mt-2">
            AI-powered crypto intelligence that&apos;s accurate, concise, and
            actually fun to read. Every brief is weighted, checked, and ranked
            so you don&apos;t waste time.
          </p>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {/* Card 1 */}
            <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Shield className="w-7 h-7 text-sky-300 mb-3" />
              <h3 className="font-semibold mb-2">Builder-First Reporting</h3>
              <p className="text-sm text-slate-400">
                News and insights sourced directly from founders, core
                contributors, and protocol teams—not random influencers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Zap className="w-7 h-7 text-sky-300 mb-3" />
              <h3 className="font-semibold mb-2">Verified Alpha, Not Rumors</h3>
              <p className="text-sm text-slate-400">
                Every claim is fact-checked, tied to on-chain data, liquidity
                flows, and reputable research you can act on with conviction.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-sky-500/40 bg-[#050b14] p-6 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Database className="w-7 h-7 text-sky-300 mb-3" />
              <h3 className="font-semibold mb-2">
                Real Sources &amp; Chain Data
              </h3>
              <p className="text-sm text-slate-400">
                Each brief links out to the original governance posts, GitHub
                commits, threads, and on-chain transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE ABOUT/FOOTER SECTION */}
      <section
        id="about"
        className="border-t border-slate-800 bg-black/80 px-6 md:px-16 py-10 text-[11px] md:text-xs text-slate-400"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} BlockBrief — Built for clarity, culture
            &amp; fun.
          </p>
          <p className="text-center md:text-right text-slate-500">
            Real builders. Real data. Real signal.
          </p>
        </div>
      </section>
    </main>
  );
}

/* ------------ LIVE MARKET STRIP COMPONENT ------------ */

function MarketStrip() {
  const [assets, setAssets] = useState<MarketAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarket() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
        );
        if (!res.ok) throw new Error("Failed to fetch market data");
        const data = await res.json();

        const next: MarketAsset[] = [
          {
            id: "bitcoin",
            label: "Bitcoin",
            symbol: "BTC",
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change,
          },
          {
            id: "ethereum",
            label: "Ethereum",
            symbol: "ETH",
            price: data.ethereum.usd,
            change24h: data.ethereum.usd_24h_change,
          },
          {
            id: "solana",
            label: "Solana",
            symbol: "SOL",
            price: data.solana.usd,
            change24h: data.solana.usd_24h_change,
          },
        ];

        setAssets(next);
      } catch (err) {
        console.error(err);
        setError("Unable to load market data right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchMarket();

    // Optional: auto-refresh every 60s
    const id = setInterval(fetchMarket, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-6 pb-10 bg-[#030712] border-b border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] md:text-xs text-slate-400">
            LIVE MARKET SNAPSHOT
          </p>
          {loading && (
            <p className="text-[11px] md:text-xs text-slate-500">Updating…</p>
          )}
          {!loading && !error && (
            <p className="text-[11px] md:text-xs text-slate-500">
              Powered by CoinGecko · refreshed every ~60s
            </p>
          )}
        </div>

        {error && (
          <p className="text-xs md:text-sm text-red-400 mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assets.map((asset) => {
            const isUp = asset.change24h >= 0;
            const changeColor = isUp ? "text-emerald-400" : "text-red-400";

            return (
              <div
                key={asset.id}
                className="rounded-2xl border border-sky-500/30 bg-[#020617] px-4 py-3 shadow-[0_0_18px_rgba(56,189,248,0.25)] flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-50">
                    {asset.label}{" "}
                    <span className="text-[11px] text-slate-400">
                      ({asset.symbol})
                    </span>
                  </span>
                </div>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-lg font-semibold text-slate-50">
                    ${asset.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className={`text-xs font-medium ${changeColor}`}>
                    {asset.change24h.toFixed(2)}% 24h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
