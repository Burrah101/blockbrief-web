import { CurrentDashboard } from '@/components/TheCurrent';
import { EmailCapture, SocialProof } from '@/components/Subscribe';
import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from '@/lib/fetchData';
import { generateAllInsights } from '@/lib/generateInsights';
import type { Insight } from '@/lib/types';
import Link from 'next/link';

export const revalidate = 300;

const regionalInsights: Insight[] = [
  {
    id: 'thailand-pulse-001',
    segment: 'thailand_pulse',
    headline: 'Thailand Is Becoming a Real-World Crypto Test Market',
    bullets: [
      'Tourists, expats, freelancers, and local businesses already rely heavily on mobile-first payments.',
      'QR payment culture makes wallet behavior easier to understand than in many Western markets.',
      'Stablecoins, exchanges, banking access, and regulation are the signals to watch.',
    ],
    context:
      'Thailand is not just a travel market. It is a live environment where crypto, tourism, banking friction, mobile payments, and cross-border money movement overlap every day.',
    watchNext:
      'Bank rules, exchange access, stablecoin usage, merchant adoption, and Thailand crypto regulation.',
    timestamp: new Date(),
    sources: ['Thailand Desk', 'BlockBrief'],
    isSponsored: false,
    region: 'thailand',
    audience: 'general',
    language: 'en',
    signalStrength: 84,
    tags: ['Thailand', 'payments', 'stablecoins', 'tourism'],
  },
  {
    id: 'pattaya-signal-001',
    segment: 'pattaya_signal',
    headline: 'Pattaya Is a Strong Ground-Level Crypto Signal Zone',
    bullets: [
      'The city has constant turnover from tourists, expats, freelancers, traders, and nightlife workers.',
      'Payment friction creates demand for practical crypto, wallet, and exchange guidance.',
      'Local merchant adoption, scam warnings, and tourist payment problems can become recurring content.',
    ],
    context:
      'Pattaya gives BlockBrief something most crypto media does not have: ground-level observation from a fast-moving international city where financial behavior changes week by week.',
    watchNext:
      'Crypto-friendly venues, tourist payment issues, exchange access, scam patterns, and local meetups.',
    timestamp: new Date(),
    sources: ['Pattaya Pulse', 'BlockBrief'],
    isSponsored: false,
    region: 'pattaya',
    audience: 'tourists',
    language: 'en',
    signalStrength: 88,
    tags: ['Pattaya', 'tourists', 'expats', 'adoption'],
  },
  {
    id: 'asia-flow-001',
    segment: 'asia_flow',
    headline: 'Asia Flow Connects Local Adoption With Global Crypto Liquidity',
    bullets: [
      'Asia continues to influence stablecoin demand, exchange activity, and market sentiment.',
      'Thailand can act as a local lens into larger Asia crypto behavior.',
      'Tourism, remittances, mobile payments, and regulation create useful intelligence signals.',
    ],
    context:
      'The Asia layer helps BlockBrief stay globally relevant while building a unique regional edge through Thailand and Pattaya.',
    watchNext:
      'Stablecoin flows, exchange regulation, builder migration, and cross-border payment demand.',
    timestamp: new Date(),
    sources: ['Asia Flow', 'BlockBrief'],
    isSponsored: false,
    region: 'asia',
    audience: 'traders',
    language: 'en',
    signalStrength: 79,
    tags: ['Asia', 'liquidity', 'regulation', 'stablecoins'],
  },
  {
    id: 'tourist-alert-001',
    segment: 'tourist_alert',
    headline: 'Crypto Tourists Need Practical Alerts, Not Hype',
    bullets: [
      'Travelers need simple guidance on exchanges, wallets, SIM cards, QR payments, and local scams.',
      'A practical alert layer can become more useful than generic crypto price news.',
      'This creates a strong newsletter angle for tourists arriving in Thailand.',
    ],
    context:
      'Tourist Alert should become the practical BlockBrief layer: what crypto users need to know before spending, trading, or moving money while traveling.',
    watchNext:
      'ATM issues, fake exchange services, wallet safety, QR payment limits, and banking access.',
    timestamp: new Date(),
    sources: ['Tourist Alert', 'BlockBrief'],
    isSponsored: false,
    region: 'thailand',
    audience: 'tourists',
    language: 'en',
    signalStrength: 91,
    tags: ['tourists', 'wallets', 'scams', 'safety'],
  },
];

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'TH', label: 'ไทย' },
  { code: '中文', label: 'Chinese' },
  { code: '한국어', label: 'Korean' },
  { code: 'हिंदी', label: 'Indian' },
  { code: 'RU', label: 'Russian' },
  { code: 'AR', label: 'Middle East' },
  { code: 'EU', label: 'Europe' },
];

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

    return [...regionalInsights, ...insights];
  } catch (error) {
    console.error('Error fetching initial insights:', error);
    return regionalInsights;
  }
}

export default async function HomePage() {
  const insights = await getInitialInsights();

  return (
    <main className="px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold">BlockBrief</h1>

        <p className="mb-6 text-lg text-gray-400">
          Signal-driven crypto intelligence. Stay oriented, not addicted.
        </p>

        <SocialProof variant="compact" />

        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {languages.map((language) => (
            <button
              key={language.code}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
              title={language.label}
            >
              {language.code}
            </button>
          ))}
        </div>

        <p className="mx-auto mt-3 max-w-xl text-xs text-gray-500">
          Multilingual summaries are being built for tourists, expats, builders,
          and crypto users moving through Thailand and Asia.
        </p>
      </section>

      <section className="mb-12">
        <CurrentDashboard initialInsights={insights} />
      </section>

      <section className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gray-500">
          Thailand Gateway
        </p>

        <h2 className="mb-3 text-2xl font-bold">
          Global crypto intelligence with a Thailand edge.
        </h2>

        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-gray-400">
          BlockBrief is expanding into Thailand-focused crypto signals, Pattaya
          ground reports, Asia market flow, and practical tourist guides. The
          goal is not another crypto blog. The goal is useful signal for people
          moving through Asia.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Link
            href="/thailand"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition-colors hover:border-white/20"
          >
            <span className="mb-3 block text-2xl">🇹🇭</span>
            <h3 className="mb-1 font-bold">Thailand Pulse</h3>
            <p className="text-xs text-gray-400">
              Regulation, exchanges, banks, QR payments, and adoption.
            </p>
          </Link>

          <Link
            href="/pattaya"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition-colors hover:border-white/20"
          >
            <span className="mb-3 block text-2xl">🌴</span>
            <h3 className="mb-1 font-bold">Pattaya Signal</h3>
            <p className="text-xs text-gray-400">
              Local merchant behavior, tourists, expats, and street-level crypto.
            </p>
          </Link>

          <Link
            href="/asia"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition-colors hover:border-white/20"
          >
            <span className="mb-3 block text-2xl">🌏</span>
            <h3 className="mb-1 font-bold">Asia Flow</h3>
            <p className="text-xs text-gray-400">
              Stablecoins, liquidity, regulation, and regional market movement.
            </p>
          </Link>

          <Link
            href="/guides"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition-colors hover:border-white/20"
          >
            <span className="mb-3 block text-2xl">🧭</span>
            <h3 className="mb-1 font-bold">Crypto Guides</h3>
            <p className="text-xs text-gray-400">
              Practical help for wallets, scams, QR payments, SIMs, and travel.
            </p>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <EmailCapture variant="hero" />
      </section>

      <section className="border-t border-white/10 py-8 text-center">
        <h2 className="mb-4 text-xl font-bold">Why BlockBrief?</h2>

        <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
          <div>
            <span className="mb-2 block text-2xl">🧠</span>
            <h3 className="mb-1 font-bold">Calm & Factual</h3>
            <p className="text-gray-400">No hype, no panic. Just signal.</p>
          </div>

          <div>
            <span className="mb-2 block text-2xl">⏱️</span>
            <h3 className="mb-1 font-bold">4-Hour Refresh</h3>
            <p className="text-gray-400">
              Auto-updated intelligence, always fresh.
            </p>
          </div>

          <div>
            <span className="mb-2 block text-2xl">🌊</span>
            <h3 className="mb-1 font-bold">No Doom Scrolling</h3>
            <p className="text-gray-400">Curated cards, not endless feeds.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
