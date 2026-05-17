import Link from 'next/link';

const guides = [
  {
    title: 'Crypto Survival Guide for Thailand',
    description:
      'Banking, exchanges, QR payments, SIM cards, and stablecoin tips for travelers and expats.',
    category: 'Tourists',
  },
  {
    title: 'Best Wallet Setup for Travelers',
    description:
      'Practical wallet combinations for daily spending, trading, and secure movement while abroad.',
    category: 'Security',
  },
  {
    title: 'Understanding Thai QR Payments',
    description:
      'How PromptPay culture works and why it matters for crypto adoption in Thailand.',
    category: 'Payments',
  },
  {
    title: 'Avoiding Common Crypto Tourist Scams',
    description:
      'Ground-level scam awareness for exchange usage, OTC deals, fake services, and payment traps.',
    category: 'Safety',
  },
  {
    title: 'Crypto-Friendly Coworking & Cafés',
    description:
      'Places digital nomads and builders naturally gather across Thailand.',
    category: 'Lifestyle',
  },
  {
    title: 'Asia Crypto Flow Explained',
    description:
      'How regional liquidity, regulation, and stablecoin movement shape local behavior.',
    category: 'Markets',
  },
];

export default function GuidesPage() {
  return (
    <main className="px-4 py-8">
      <section className="mb-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          Practical Intelligence
        </p>

        <h1 className="mb-4 text-4xl font-bold">Crypto Guides</h1>

        <p className="mx-auto max-w-2xl text-gray-400">
          Calm, practical crypto knowledge for tourists, expats, builders,
          traders, and businesses navigating Thailand and Asia.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <div
            key={guide.title}
            className="rounded-xl border border-white/10 bg-slate-900/50 p-5 transition-all hover:border-white/20"
          >
            <div className="mb-3 inline-block rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-gray-400">
              {guide.category}
            </div>

            <h2 className="mb-2 text-xl font-bold">{guide.title}</h2>

            <p className="text-sm leading-relaxed text-gray-400">
              {guide.description}
            </p>

            <div className="mt-5 text-sm text-gray-500">
              Coming soon →
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="mb-3 text-xl font-bold">
          Why These Guides Matter
        </h2>

        <p className="text-sm leading-relaxed text-gray-300">
          Most crypto content focuses on speculation. BlockBrief focuses on
          practical movement — how people actually use crypto while traveling,
          living abroad, building businesses, or navigating unfamiliar systems.
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
