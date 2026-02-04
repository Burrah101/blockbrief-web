import { SponsoredCard, AdvertiseForm } from '@/components/Sponsored';
import type { SponsoredContent } from '@/lib/types';
import { Sparkles, TrendingUp, Users, Eye } from 'lucide-react';

// Sample sponsored content (in production, fetch from database)
const sampleSponsored: SponsoredContent[] = [
  {
    id: 'sp-1',
    sponsor: 'Phantom Wallet',
    sponsorLogo: undefined,
    title: 'The Most Trusted Solana Wallet',
    content: 'Join millions of users who trust Phantom for secure, seamless crypto management. Multi-chain support, built-in swaps, and NFT display all in one beautiful interface.',
    cta: 'Download Phantom',
    ctaUrl: 'https://phantom.app',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    impressions: 45230,
    clicks: 1847,
    isActive: true,
  },
  {
    id: 'sp-2',
    sponsor: 'Dune Analytics',
    sponsorLogo: undefined,
    title: 'Blockchain Data for Everyone',
    content: 'Query, visualize, and share blockchain data with the most powerful crypto analytics platform. Free to use, built for builders.',
    cta: 'Explore Dune',
    ctaUrl: 'https://dune.com',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    impressions: 32100,
    clicks: 1205,
    isActive: true,
  },
];

export default function SponsoredPage() {
  return (
    <main className="px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-amber-400" size={32} />
          <h1 className="text-3xl font-bold">Partner Content</h1>
        </div>
        <p className="text-gray-400 max-w-xl mx-auto">
          Curated sponsored content from projects we believe in. All sponsors are vetted for quality and relevance to our community.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-12 p-6 bg-white/5 rounded-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
            <Users size={24} />
            <span>50K+</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Monthly Readers</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
            <Eye size={24} />
            <span>68%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Open Rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
            <TrendingUp size={24} />
            <span>4.2%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Avg CTR</p>
        </div>
      </div>

      {/* Active Sponsored Content */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Active Sponsors
        </h2>
        <div className="space-y-6">
          {sampleSponsored.map((content) => (
            <SponsoredCard key={content.id} content={content} />
          ))}
        </div>
      </section>

      {/* Advertise With Us */}
      <section className="border-t border-white/10 pt-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Reach Crypto Builders & Investors</h2>
            <p className="text-gray-400">
              Partner with BlockBrief to reach a highly engaged audience of crypto professionals, developers, and long-term investors.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-bold mb-1">🎯 Targeted Audience</h3>
              <p className="text-sm text-gray-400">Builders, investors, and decision-makers in crypto</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-bold mb-1">📊 Transparent Metrics</h3>
              <p className="text-sm text-gray-400">Real-time impressions, clicks, and CTR tracking</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-bold mb-1">✨ Native Format</h3>
              <p className="text-sm text-gray-400">Seamlessly integrated with editorial content</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h3 className="font-bold mb-1">🛡️ Quality Control</h3>
              <p className="text-sm text-gray-400">All sponsors vetted for relevance and trust</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Start Your Campaign</h3>
            <AdvertiseForm />
          </div>
        </div>
      </section>
    </main>
  );
}
