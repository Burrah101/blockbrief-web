import Link from 'next/link';
import PriceTicker from '@/components/PriceTicker';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4">Blockbreif</h1>
      <p className="text-lg opacity-80 max-w-xl text-center">
        Crypto market briefs, alerts, and narratives — delivered in under 60 seconds.
      </p>

      <PriceTicker />

      <section className="mt-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Get Alerts</h2>
        <p className="text-sm opacity-80 mb-4">
          Subscribe to receive instant push alerts when crypto moves. No noise. Just signal.
        </p>
        <form action="https://blockbreif.substack.com/subscribe" method="post" target="_blank" className="flex justify-center">
          <input type="email" name="email" placeholder="you@example.com" required className="border px-4 py-2 rounded-l text-black" />
          <button type="submit" className="bg-white text-black px-4 py-2 rounded-r font-semibold">Subscribe</button>
        </form>
      </section>
      <footer className="text-sm text-center text-gray-500 py-6 mt-10">
        © Blockbreif 2025 · Built for real-time crypto signal delivery<br />
        Contact: <a href="mailto:sansingh77@gmail.com" className="underline">sansingh77@gmail.com</a>
        <br />
        <Link href="/about" className="underline mt-2 inline-block">About</Link>
      </footer>
    </main>
  );
}
