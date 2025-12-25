"use client";

import Link from 'next/link';
import PriceTicker from '@/components/PriceTicker';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-3xl"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono mb-6 text-gray-400">
          v1.0.0 // SYSTEM ONLINE
        </span>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Blockbreif
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto leading-relaxed">
          Crypto market briefs, alerts, and narratives — delivered in <span className="text-white font-semibold">under 60 seconds</span>.
        </p>
      </motion.div>

      {/* Ticker Section */}
      <div className="w-full relative z-10 mb-24">
        <PriceTicker />
      </div>

      {/* Subscribe Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center max-w-md w-full relative z-10"
      >
        <h2 className="text-2xl font-semibold mb-3">Get Signal. No Noise.</h2>
        <p className="text-sm text-gray-500 mb-8">
          Subscribe to receive instant push alerts when crypto moves.
        </p>

        <form action="https://blockbreif.substack.com/subscribe" method="post" target="_blank" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative flex bg-black rounded-lg border border-white/10 p-1">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="bg-transparent flex-1 px-4 py-3 outline-none text-white placeholder-gray-600 font-mono text-sm"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition-colors uppercase text-xs tracking-wider"
            >
              Subscribe
            </button>
          </div>
        </form>
      </motion.section>

      {/* Footer */}
      <footer className="text-xs text-center text-gray-600 py-10 mt-20 font-mono">
        <p>© BLOCKBREIF 2025 · REAL-TIME SIGNAL DELIVERY</p>
        <div className="flex justify-center gap-4 mt-4 opacity-50">
          <a href="mailto:sansingh77@gmail.com" className="hover:text-white transition-colors">CONTACT</a>
          <span>·</span>
          <Link href="/about" className="hover:text-white transition-colors">ABOUT</Link>
        </div>
      </footer>
    </main>
  );
}
