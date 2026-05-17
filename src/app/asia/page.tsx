import Link from 'next/link';

const asiaSignals = [
  {
    title: 'Stablecoin Growth Across Asia',
    description:
      'Track how USDT, USDC, and regional stablecoin demand shape cross-border movement and local adoption.',
  },
  {
    title: 'Exchange & Banking Shifts',
    description:
      'Watch evolving relationships between banks, exchanges, and regulators across major Asian markets.',
  },
  {
    title: 'Builder Migration',
    description:
      'Monitor where founders, developers, creators, and AI startups are relocating or building.',
  },
  {
    title: 'Tourism + Crypto Economies',
    description:
      'Observe how tourism-heavy regions accelerate wallet behavior, digital payments, and crypto experimentation.',
  },
  {
    title: 'Asia Liquidity Flow',
    description:
      'Understand how regional liquidity movements affect global crypto sentiment and momentum.',
  },
  {
    title: 'Regional Regulation Radar',
    description:
      'Simplified intelligence around crypto policy developments across Asia.',
  },
];

export default function AsiaPage() {
  return (
    <main className="px-4 py-8">
      <section className="mb-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          Regional Intelligence Layer
        </p>

        <h1 className="mb-4 text-4xl font-bold">Asia Flow</h1>

        <p className="mx-auto max-w-2xl text-gray-400">
          Follow liquidity, regulation, adoption, tourism, builder migration,
          and crypto infrastructure trends shaping Asia.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {asiaSignals.map((signal) => (
          <div
            key={signal.title}
            className="rounded-xl border border-white/10 bg-slate-900/50 p-5 transition-all hover:border-white/20"
          >
            <div className="mb-3 text-2xl">🌏</div>

            <h2 className="mb-2 text-xl font-bold">
              {signal.title}
            </h2>

            <p className="text-sm leading-relaxed text-gray-400">
              {signal.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-3 text-xl font-bold">
          Why Asia Matters
        </h2>

        <p className="text-sm leading-relaxed text-gray-300">
          Asia remains one of the strongest real-world crypto regions globally.
          Tourism, mobile payments, remittance demand, stablecoin usage, QR
          systems, and digital-first behavior continue shaping the next wave of
          adoption.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            ← Back to The Current
          </Link>
        </div>
      </section>
    </main>
  );
}
