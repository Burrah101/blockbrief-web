import Link from 'next/link';

export default function ThailandPage() {
  return (
    <main className="px-4 py-8">
      <section className="mb-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
          Regional Intelligence
        </p>

        <h1 className="mb-4 text-4xl font-bold">Thailand Pulse</h1>

        <p className="mx-auto max-w-2xl text-gray-400">
          Crypto signals from Thailand — regulation, exchanges, QR payments,
          tourism, startups, and ground-level adoption.
        </p>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <span className="mb-3 block text-2xl">🏦</span>
          <h2 className="mb-2 font-bold">Banking & Exchanges</h2>
          <p className="text-sm text-gray-400">
            Track Thai exchange access, bank transfer friction, stablecoin usage,
            and compliance signals.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <span className="mb-3 block text-2xl">📲</span>
          <h2 className="mb-2 font-bold">QR Payment Culture</h2>
          <p className="text-sm text-gray-400">
            Watch how Thailand&apos;s scan-to-pay habits shape crypto wallet,
            stablecoin, and tourist payment behavior.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <span className="mb-3 block text-2xl">🌏</span>
          <h2 className="mb-2 font-bold">Asia Market Flow</h2>
          <p className="text-sm text-gray-400">
            Connect Thai crypto signals with broader Asia liquidity, regulation,
            and builder activity.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="mb-3 text-xl font-bold">Launch Focus</h2>

        <ul className="space-y-3 text-sm text-gray-300">
          <li>• Thai regulatory updates explained in plain English.</li>
          <li>• Exchange, bank, wallet, and stablecoin access notes.</li>
          <li>• Pattaya and Bangkok ground-level adoption signals.</li>
          <li>• Tourist and expat crypto survival guides.</li>
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
