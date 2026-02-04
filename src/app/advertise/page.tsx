import { AdvertiseForm } from '@/components/Sponsored';
import { Sparkles, CheckCircle, TrendingUp, Users, Eye, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdvertisePage() {
  return (
    <main className="px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-amber-400" size={40} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Advertise with BlockBrief</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Reach a highly engaged audience of crypto builders, investors, and decision-makers through native, trust-first sponsored content.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="text-center p-6 bg-white/5 rounded-xl">
          <Users className="mx-auto mb-2 text-blue-400" size={32} />
          <div className="text-3xl font-bold">50K+</div>
          <p className="text-sm text-gray-400">Monthly Readers</p>
        </div>
        <div className="text-center p-6 bg-white/5 rounded-xl">
          <Mail className="mx-auto mb-2 text-green-400" size={32} />
          <div className="text-3xl font-bold">68%</div>
          <p className="text-sm text-gray-400">Email Open Rate</p>
        </div>
        <div className="text-center p-6 bg-white/5 rounded-xl">
          <TrendingUp className="mx-auto mb-2 text-purple-400" size={32} />
          <div className="text-3xl font-bold">4.2%</div>
          <p className="text-sm text-gray-400">Average CTR</p>
        </div>
        <div className="text-center p-6 bg-white/5 rounded-xl">
          <Eye className="mx-auto mb-2 text-amber-400" size={32} />
          <div className="text-3xl font-bold">2.5M</div>
          <p className="text-sm text-gray-400">Monthly Impressions</p>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Partner with BlockBrief?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="text-blue-400" size={20} />
              Quality Audience
            </h3>
            <p className="text-gray-400 text-sm">
              Our readers are serious crypto participants — developers, investors, and founders who make decisions. No casual browsers.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/20 rounded-xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="text-green-400" size={20} />
              Trust-First Approach
            </h3>
            <p className="text-gray-400 text-sm">
              All sponsored content is clearly labeled and vetted for quality. We only partner with projects we believe in.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/20 rounded-xl">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="text-purple-400" size={20} />
              Native Integration
            </h3>
            <p className="text-gray-400 text-sm">
              Your content appears seamlessly alongside our editorial insights, not as intrusive banner ads.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Sponsorship Options</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-bold mb-2">Insight Card</h3>
            <div className="text-3xl font-bold text-amber-400 mb-4">$500<span className="text-sm text-gray-400">/week</span></div>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Featured in The Current</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> ~10K impressions</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Clear sponsored label</li>
            </ul>
            <Link href="#form" className="block text-center py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              Get Started
            </Link>
          </div>
          <div className="p-6 bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-lg font-bold mb-2">Newsletter Feature</h3>
            <div className="text-3xl font-bold text-amber-400 mb-4">$2,000<span className="text-sm text-gray-400">/issue</span></div>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Featured in daily digest</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> ~50K email subscribers</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> 68% open rate</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Dedicated CTA button</li>
            </ul>
            <Link href="#form" className="block text-center py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition-colors">
              Get Started
            </Link>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-lg font-bold mb-2">Full Takeover</h3>
            <div className="text-3xl font-bold text-amber-400 mb-4">$5,000<span className="text-sm text-gray-400">/week</span></div>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Homepage feature</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Newsletter inclusion</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Social promotion</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /> Dedicated landing page</li>
            </ul>
            <Link href="#form" className="block text-center py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Start Your Campaign</h2>
          <p className="text-gray-400 text-center mb-8">
            Fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
          <AdvertiseForm />
        </div>
      </section>
    </main>
  );
}
