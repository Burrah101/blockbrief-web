import Link from "next/link";
import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from "@/lib/fetchData";
import { generateMarketPulse } from "@/lib/marketPulse";

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

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Daily Brief
          </h1>

          <p className="text-gray-400 mt-2">
            Your one-minute crypto intelligence update.
          </p>
        </div>

        <Link
          href="/"
          className="border border-white/10 rounded-lg px-4 py-2 hover:bg-white/5"
        >
          Dashboard
        </Link>
      </div>

      <section className="rounded-xl border border-white/10 bg-white/5 p-8 mb-8">
        <div className="text-sm uppercase tracking-widest text-gray-500">
          Market Pulse
        </div>

        <div className="text-4xl font-bold mt-2">
          {pulse.sentiment}
        </div>

        <div className="text-6xl font-bold mt-4">
          {pulse.score}
          <span className="text-2xl text-gray-500"> /100</span>
        </div>

        <p className="mt-6 text-gray-300 leading-7">
          {pulse.summary}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Builders
          </h2>

          <p className="text-5xl font-bold">
            {builders.length}
          </p>

          <p className="text-gray-400 mt-2">
            Builder updates detected.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Market Coverage
          </h2>

          <p className="text-5xl font-bold">
            {market.length}
          </p>

          <p className="text-gray-400 mt-2">
            Assets analyzed.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-4">
            DeFi
          </h2>

          <p className="text-5xl font-bold">
            {defi.length}
          </p>

          <p className="text-gray-400 mt-2">
            Protocol updates.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Whale Activity
          </h2>

          <p className="text-5xl font-bold">
            {whales.length}
          </p>

          <p className="text-gray-400 mt-2">
            Significant events.
          </p>
        </div>
      </section>
    </main>
  );
}