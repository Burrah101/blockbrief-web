import { CurrentDashboard } from '@/components/TheCurrent';
import { EmailCapture, SocialProof } from '@/components/Subscribe';
import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from '@/lib/fetchData';
import { generateAllInsights } from '@/lib/generateInsights';
import Link from 'next/link';

export const revalidate = 300; // Revalidate every 5 minutes

async function getInitialInsights() {
  try {
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

    return insights;
  } catch (error) {
    console.error('Error fetching initial insights:', error);
    return [];
  }
}

export default async function HomePage() {
  const insights = await getInitialInsights();

  return (
    <main className="px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">BlockBrief</h1>
        <p className="text-lg text-gray-400 mb-6">
          Signal-driven crypto intelligence. Stay oriented, not addicted.
        </p>
        <SocialProof variant="compact" />
      </section>

      {/* The Current Dashboard */}
      <section className="mb-12">
        <CurrentDashboard initialInsights={insights} />
      </section>

      {/* Email Subscription */}
      <section className="mb-12">
        <EmailCapture variant="hero" />
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Link
          href="/brief"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">📊</span>
          <h3 className="font-bold text-sm">Live Brief</h3>
          <p className="text-xs text-gray-400">Real-time prices</p>
        </Link>

        <Link
          href="/alerts"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">🚨</span>
          <h3 className="font-bold text-sm">Alerts</h3>
          <p className="text-xs text-gray-400">Movement radar</p>
        </Link>

        <Link
          href="/agents"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">🤖</span>
          <h3 className="font-bold text-sm">Agents</h3>
          <p className="text-xs text-gray-400">AI-powered tools</p>
        </Link>

        <Link
          href="/sponsored"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">💼</span>
          <h3 className="font-bold text-sm">Sponsored</h3>
          <p className="text-xs text-gray-400">Partner content</p>
        </Link>

        <Link
          href="/thailand"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">🇹🇭</span>
          <h3 className="font-bold text-sm">Thailand Pulse</h3>
          <p className="text-xs text-gray-400">Regional crypto signal</p>
        </Link>

        <Link
          href="/pattaya"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">🌴</span>
          <h3 className="font-bold text-sm">Pattaya Pulse</h3>
          <p className="text-xs text-gray-400">Ground-level adoption</p>
        </Link>

        <Link
          href="/guides"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">🧭</span>
          <h3 className="font-bold text-sm">Crypto Guides</h3>
          <p className="text-xs text-gray-400">Tourist + expat help</p>
        </Link>

        <Link
          href="/asia"
          className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-center"
        >
          <span className="text-2xl mb-2 block">🌏</span>
          <h3 className="font-bold text-sm">Asia Flow</h3>
          <p className="text-xs text-gray-400">Regional market shifts</p>
        </Link>
      </section>

      {/* Regional Thesis */}
      <section className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
          New regional layer
        </p>
        <h2 className="text-2xl font-bold mb-3">
          Global crypto intelligence with a Thailand edge.
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          BlockBrief is expanding into Thailand-focused crypto signals, Pattaya
          adoption notes, Asia market flow, and practical guides for tourists,
          expats, builders, and investors moving through the region.
        </p>
      </section>

      {/* Value Proposition */}
      <section className="text-center py-8 border-t border-white/10">
        <h2 className="text-xl font-bold mb-4">Why BlockBrief?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-2xl mb-2 block">🧠</span>
            <h3 className="font-bold mb-1">Calm & Factual</h3>
            <p className="text-gray-400">No hype, no panic. Just signal.</p>
          </div>

          <div>
            <span className="text-2xl mb-2 block">⏱️</span>
            <h3 className="font-bold mb-1">4-Hour Refresh</h3>
            <p className="text-gray-400">
              Auto-updated intelligence, always fresh.
            </p>
          </div>

          <div>
            <span className="text-2xl mb-2 block">🌊</span>
            <h3 className="font-bold mb-1">No Doom Scrolling</h3>
            <p className="text-gray-400">Curated cards, not endless feeds.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
