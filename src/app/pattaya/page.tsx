import Link from 'next/link';

export default function PattayaPage() {
  return (
    <main className="px-4 py-8">
      <section className="mb-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          Ground-Level Signal
        </p>

        <h1 className="mb-4 text-4xl font-bold">Pattaya Pulse</h1>

        <p className="mx-auto max-w-2xl text-gray-400">
          A local signal layer for crypto tourists, expats, builders, nightlife
          operators, freelancers, and businesses moving through Pattaya.
        </p>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <span className="mb-3 block text-2xl">🌴</span>
          <h2 className="mb-2 font-bold">Street Adoption</h2>
          <p className="text-sm text-gray-400">
            Track where crypto, stablecoins, QR payments, and wallet behavior
            show up in real local commerce.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <span className="mb-3 block text-2xl">🧳</span>
          <h2 className="mb-2 font-bold">Tourist Friction</h2>
          <p className="text-sm text-gray-400">
            Follow payment problems, exchange access, banking limits, SIM cards,
            and practical crypto survival needs for travelers.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <span className="mb-3 block text-2xl">📍</span>
          <h2 className="mb-2 font-bold">Local Intel</h2>
          <p className="text-sm text-gray-400">
            Watch meetups, coworking activity, merchant experiments, nightlife
            trends, and expat crypto behavior.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="mb-3 text-xl font-bold">Why Pattaya Matters</h2>

        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          Pattaya has a rare mix of short-term tourists, long-term expats,
          international freelancers, nightlife businesses, digital nomads,
          and crypto-curious visitors. That makes it a strong test market for
          real-world crypto payment behavior and adoption signals.
        </p>

        <ul className="space-y-3 text-sm text-gray-300">
          <li>• Crypto-friendly merchant sightings.</li>
          <li>• Stablecoin and wallet usage observations.</li>
          <li>• Scam and safety alerts for tourists.</li>
          <li>• Expat and digital nomad crypto behavior.</li>
        </ul>

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
