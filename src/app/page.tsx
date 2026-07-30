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

  return {
    insights,
    pulse,
  };
}

export default async function HomePage() {
  const { insights, pulse } = await getPageData();

  return (
    <main className="px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          BlockBrief
        </h1>

        <p className="text-lg text-gray-400 mb-6">
          Signal-driven crypto intelligence.
        </p>

        <SocialProof variant="compact" />
      </section>

      <MarketPulseCard
        score={pulse.score}
        sentiment={pulse.sentiment}
        summary={pulse.summary}
      />

      <section className="mb-12">
        <CurrentDashboard initialInsights={insights} />
      </section>

      <section className="mb-12">
        <EmailCapture variant="hero" />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link
          href="/brief"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-center"
        >
          📊
          <div className="font-bold mt-2">Live Brief</div>
        </Link>

        <Link
          href="/alerts"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-center"
        >
          🚨
          <div className="font-bold mt-2">Alerts</div>
        </Link>

        <Link
          href="/builders"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-center"
        >
          🛠
          <div className="font-bold mt-2">
            Builder Watch
          </div>
        </Link>

        <Link
          href="/sponsored"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-center"
        >
          💼
          <div className="font-bold mt-2">
            Sponsored
          </div>
        </Link>
      </section>
    </main>
  );
}