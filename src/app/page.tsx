import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Blockbreif</h1>
      <p className="text-lg opacity-80 max-w-xl mb-10">
        Crypto market briefs, alerts, and narratives — delivered in under 60 seconds.
      </p>

      <section className="w-full max-w-md">
        <form action="https://blockbreif.substack.com/subscribe" method="post" target="_blank" className="flex shadow-sm">
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="flex-1 border px-4 py-2 rounded-l text-black focus:outline-none"
            required
          />
          <button type="submit" className="bg-white text-black px-6 py-2 rounded-r font-semibold hover:bg-gray-200 transition-colors">
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Join the radar. No noise.
        </p>
      </section>

      <div className="grid grid-cols-2 gap-4 mt-16 w-full max-w-sm">
        <Link href="/brief" className="block p-4 border border-white/20 rounded hover:bg-white/10 transition">
          <h3 className="font-bold">Live Brief</h3>
          <p className="text-xs text-gray-400">Market Data</p>
        </Link>
        <Link href="/alerts" className="block p-4 border border-white/20 rounded hover:bg-white/10 transition">
          <h3 className="font-bold">Alerts</h3>
          <p className="text-xs text-gray-400">Movement Radar</p>
        </Link>
      </div>
    </main>
  );
}
