import React from "react";

const perks = [
  {
    title: "Daily Crypto Pulse in 5 Minutes",
    body: "Top market moves, funding, and narratives boiled down into one clean brief you can read before your coffee cools.",
  },
  {
    title: "Full Caring Mode Alerts",
    body: "We highlight shutdowns, rug risks, regulatory hits, and smart-contract drama so you don’t get blindsided.",
  },
  {
    title: "Opportunities, Not Noise",
    body: "Hand-picked tokens, sectors, and tools worth watching — without turning your brain into a CT timeline.",
  },
];

const sampleItems = [
  "▪ BTC squeezes past $78k then wicks down — perp OI at 3-month high.",
  "▪ New USD1 integration: [PROJECT] adds it as base asset for LPs.",
  "▪ Security: Major bridge pauses withdrawals after suspicious flow.",
  "▪ Narrative watch: Real-world assets (RWA) volume hits new weekly high.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-50">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/25 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-10 pt-8 sm:px-6 lg:px-8">

        {/* Top bar */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 via-cyan-400 to-violet-500 text-xs font-bold tracking-tight">
              BB
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                BlockBrief
              </span>
              <span className="text-xs text-slate-500">
                Crypto in plain language. No fluff.
              </span>
            </div>
          </div>

          <span className="rounded-full border border-emerald-600/40 bg-black/40 px-3 py-1 text-xs text-emerald-400">
            Early Access · Founding Reader
          </span>
        </header>

        {/* Hero */}
        <section className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/40 px-3 py-1 text-xs text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              Daily crypto briefing, built for humans — not bots.
            </div>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Your no-bullshit{" "}
              <span className="bg-gradient-to-tr from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                crypto brief
              </span>{" "}
              in under 5 minutes.
            </h1>

            <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
              BlockBrief scans the chaos — charts, chains, funds, and rumors — and
              sends you a clean, readable summary twice a day. Warnings included.
              Alpha included. Drama filtered.
            </p>

            {/* Signup card */}
            <div className="mt-8 w-full max-w-xl">
              <div className="gradient-border rounded-3xl">
                <div className="relative rounded-3xl bg-zinc-950/70 p-5 shadow-xl backdrop-blur">
                  <form
                    action="https://formspree.io/f/YOUR_FORMSPREE_ID"
                    method="POST"
                    className="flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <div className="flex-1 space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400"
                      >
                        Get the brief
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@wallet.xyz"
                        className="w-full rounded-2xl border border-zinc-700/80 bg-black/60 px-3 py-2 text-sm text-slate-100 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 sm:mt-6 sm:self-end"
                    >
                      Join Early Access
                    </button>
                  </form>

                  <p className="mt-3 text-xs text-slate-500">
                    No spam. Just the daily crypto download and occasional alpha tools we use.
                  </p>
                </div>
              </div>
            </div>

            {/* Perks */}
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="rounded-2xl border border-white/5 bg-black/40 p-4 text-sm text-slate-300"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400">{perk.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sample issue preview */}
          <aside className="lg:mt-3">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-black/95 p-4 shadow-2xl shadow-black/60 backdrop-blur">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 font-medium text-emerald-300">
                  Sample Daily Brief
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  08:00 UTC • Inbox
                </span>
              </div>

              <h2 className="mt-4 text-sm font-semibold text-slate-50">
                Today in Crypto — {new Date().toLocaleDateString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Here’s how the last 24 hours actually mattered — without screenshots of PnL.
              </p>

              <div className="mt-4 space-y-2 rounded-2xl bg-black/60 p-3 text-xs text-slate-200">
                {sampleItems.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Risk / Red Flag Watch
                </p>
                <p className="mt-1 text-xs text-amber-100/80">
                  We’ll tell you when a project gets halted, exploited, or quietly rugged.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-500">
                <span>Built for founders, traders & the crypto-curious.</span>
                <span className="text-emerald-300">Boost × Ice · v0.1</span>
              </div>
            </div>
          </aside>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-white/5 pt-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} BlockBrief. All signals. No spam.</span>
            <span>Powered by Boost &amp; Ice · Early Builder Edition</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
