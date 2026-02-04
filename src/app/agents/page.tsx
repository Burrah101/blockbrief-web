'use client';

import { useState } from 'react';
import { Bot, Lock, Zap, Crown, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Agent {
  id: string;
  name: string;
  description: string;
  features: string[];
  access: 'free' | 'referral' | 'pro';
  referralsRequired?: number;
  icon: string;
  status: 'active' | 'coming_soon' | 'beta';
}

const agents: Agent[] = [
  {
    id: 'news-aggregator',
    name: 'News Aggregator',
    description: 'Filters crypto Twitter for verified breaking news. Cuts through noise to surface what matters.',
    features: ['Real-time Twitter monitoring', 'Verified source filtering', 'Breaking news alerts'],
    access: 'free',
    icon: '📰',
    status: 'active',
  },
  {
    id: 'sentiment-bot',
    name: 'Sentiment Bot',
    description: 'Analyzes social volume vs price action. Identifies divergences before they become obvious.',
    features: ['Social volume tracking', 'Price correlation analysis', 'Divergence alerts'],
    access: 'free',
    icon: '📊',
    status: 'beta',
  },
  {
    id: 'whale-watcher',
    name: 'Whale Watcher',
    description: 'Tracks wallets >$10M movement on-chain. Know when big money moves before the market reacts.',
    features: ['Large wallet tracking', 'Exchange flow monitoring', 'Smart money alerts'],
    access: 'referral',
    referralsRequired: 25,
    icon: '🐋',
    status: 'active',
  },
  {
    id: 'alpha-scanner',
    name: 'Alpha Scanner',
    description: 'Scans for early-stage opportunities across DeFi, NFTs, and new token launches.',
    features: ['New token detection', 'Liquidity analysis', 'Risk scoring'],
    access: 'pro',
    icon: '🔍',
    status: 'coming_soon',
  },
  {
    id: 'portfolio-tracker',
    name: 'Portfolio Tracker',
    description: 'Connect your wallets and get personalized insights based on your holdings.',
    features: ['Multi-wallet support', 'P&L tracking', 'Tax reporting'],
    access: 'pro',
    icon: '💼',
    status: 'coming_soon',
  },
  {
    id: 'narrative-radar',
    name: 'Narrative Radar',
    description: 'Identifies emerging narratives and trends before they go mainstream.',
    features: ['Trend detection', 'Narrative mapping', 'Early signal alerts'],
    access: 'referral',
    referralsRequired: 10,
    icon: '🎯',
    status: 'beta',
  },
];

export default function AgentsPage() {
  const [selectedAccess, setSelectedAccess] = useState<'all' | 'free' | 'referral' | 'pro'>('all');

  const filteredAgents = selectedAccess === 'all' 
    ? agents 
    : agents.filter(a => a.access === selectedAccess);

  const getAccessBadge = (agent: Agent) => {
    switch (agent.access) {
      case 'free':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded">
            <Zap size={10} />
            FREE
          </span>
        );
      case 'referral':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">
            <Lock size={10} />
            {agent.referralsRequired} Referrals
          </span>
        );
      case 'pro':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded">
            <Crown size={10} />
            PRO
          </span>
        );
    }
  };

  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return null;
      case 'beta':
        return (
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
            BETA
          </span>
        );
      case 'coming_soon':
        return (
          <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs font-medium rounded">
            COMING SOON
          </span>
        );
    }
  };

  return (
    <main className="px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bot className="text-blue-400" size={32} />
          <h1 className="text-3xl font-bold">AI Agents</h1>
        </div>
        <p className="text-gray-400 max-w-xl mx-auto">
          Specialized AI agents that work for you 24/7. Unlock more agents by subscribing and referring friends.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {(['all', 'free', 'referral', 'pro'] as const).map((access) => (
          <button
            key={access}
            onClick={() => setSelectedAccess(access)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedAccess === access
                ? 'bg-white text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {access === 'all' ? 'All Agents' : access.charAt(0).toUpperCase() + access.slice(1)}
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid gap-6 mb-12">
        {filteredAgents.map((agent) => (
          <div 
            key={agent.id}
            className={`p-6 rounded-xl border transition-all ${
              agent.status === 'coming_soon'
                ? 'bg-white/5 border-white/10 opacity-60'
                : 'bg-gradient-to-br from-slate-900 to-slate-800 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{agent.icon}</span>
                <div>
                  <h2 className="text-lg font-bold">{agent.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {getAccessBadge(agent)}
                    {getStatusBadge(agent.status)}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-4">{agent.description}</p>

            <ul className="space-y-2 mb-6">
              {agent.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={14} className="text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {agent.status === 'coming_soon' ? (
                <button disabled className="flex-1 py-3 bg-white/10 text-gray-500 font-medium rounded-lg cursor-not-allowed">
                  Coming Soon
                </button>
              ) : agent.access === 'free' || agent.status === 'beta' ? (
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  <span>Activate Agent</span>
                  <ArrowRight size={16} />
                </button>
              ) : agent.access === 'referral' ? (
                <Link 
                  href="/subscribe"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <span>Unlock with Referrals</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition-colors">
                  <Crown size={16} />
                  <span>Upgrade to Pro</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="text-center p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Want More Agents?</h2>
        <p className="text-gray-400 mb-6">
          Subscribe for free and start referring friends to unlock premium agents.
        </p>
        <Link 
          href="/subscribe"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span>Subscribe Free</span>
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
