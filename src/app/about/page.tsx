import { EmailCapture } from '@/components/Subscribe';
import { Brain, Clock, Shield, Zap, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About BlockBrief</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A positive, signal-driven crypto intelligence stream that helps people stay oriented, not addicted.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-xl">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              BlockBrief was created to give crypto participants one thing: <strong className="text-white">clarity</strong>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              We cut through the noise, filter out the fear and hype, and deliver only the most meaningful signals — calm, factual, and forward-looking.
            </p>
            <p className="text-gray-400 leading-relaxed">
              In a world of endless feeds and panic-driven headlines, we offer something different: <strong className="text-white">a grounded place to think clearly</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* What We Are / What We're Not */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-green-400">What BlockBrief Is</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Auto-published intelligence every 4 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Rotating insights that surface what matters now</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Calm, factual, and constructive analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Built for builders and long-term thinkers</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-red-400">What BlockBrief Is NOT</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Not a news clone or aggregator</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Not a trading signals group</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Not alpha bait or pump content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Not &quot;breaking news panic&quot;</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-blue-400" size={24} />
            </div>
            <h3 className="font-bold mb-2">1. Data Collection</h3>
            <p className="text-sm text-gray-400">
              We pull from CoinGecko, GitHub, DefiLlama, and on-chain sources every 4 hours.
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="text-purple-400" size={24} />
            </div>
            <h3 className="font-bold mb-2">2. AI Processing</h3>
            <p className="text-sm text-gray-400">
              Our LLM applies the BlockBrief tone: calm, factual, constructive, and forward-looking.
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-green-400" size={24} />
            </div>
            <h3 className="font-bold mb-2">3. Auto-Publish</h3>
            <p className="text-sm text-gray-400">
              Insights rotate on the homepage and get archived for historical reference.
            </p>
          </div>
        </div>
      </section>

      {/* The Current Segments */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">The Current Segments</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
            <span className="text-2xl mb-2 block">🌱</span>
            <h3 className="font-bold text-sm">Market Pulse</h3>
            <p className="text-xs text-gray-400 mt-1">Macro + chain health</p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
            <span className="text-2xl mb-2 block">🐋</span>
            <h3 className="font-bold text-sm">Capital Flow</h3>
            <p className="text-xs text-gray-400 mt-1">Whales + liquidity</p>
          </div>
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
            <span className="text-2xl mb-2 block">🧑‍💻</span>
            <h3 className="font-bold text-sm">Builder Activity</h3>
            <p className="text-xs text-gray-400 mt-1">Devs shipping</p>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
            <span className="text-2xl mb-2 block">🧠</span>
            <h3 className="font-bold text-sm">Context Layer</h3>
            <p className="text-xs text-gray-400 mt-1">Why it matters</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
            <span className="text-2xl mb-2 block">🌤️</span>
            <h3 className="font-bold text-sm">Positive Signal</h3>
            <p className="text-xs text-gray-400 mt-1">Growth + adoption</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-3 gap-4 p-8 bg-white/5 rounded-xl">
          <div className="text-center">
            <Users className="mx-auto mb-2 text-blue-400" size={32} />
            <div className="text-3xl font-bold">50K+</div>
            <p className="text-sm text-gray-400">Subscribers</p>
          </div>
          <div className="text-center">
            <Clock className="mx-auto mb-2 text-green-400" size={32} />
            <div className="text-3xl font-bold">4hr</div>
            <p className="text-sm text-gray-400">Refresh Cycle</p>
          </div>
          <div className="text-center">
            <TrendingUp className="mx-auto mb-2 text-purple-400" size={32} />
            <div className="text-3xl font-bold">68%</div>
            <p className="text-sm text-gray-400">Open Rate</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-xl mx-auto">
        <EmailCapture variant="hero" />
      </section>

      {/* Footer Note */}
      <section className="text-center mt-16 pt-8 border-t border-white/10">
        <p className="text-gray-500 text-sm">
          BlockBrief grows like a river — never breaks its banks, just widens.
        </p>
        <p className="font-bold mt-4">Powered by Boost</p>
      </section>
    </main>
  );
}
