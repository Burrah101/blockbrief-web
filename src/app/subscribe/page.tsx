'use client';

import { useEffect, useState } from 'react';
import { EmailCapture, SocialProof, ReferralWidget, ShareWidget } from '@/components/Subscribe';
import { CheckCircle, Zap, Clock, Shield, Gift } from 'lucide-react';

export default function SubscribePage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [referralCode, setReferralCode] = useState<string | undefined>();

  useEffect(() => {
    // Check if user is already subscribed
    const subscribed = localStorage.getItem('blockbrief_subscribed');
    const code = localStorage.getItem('blockbrief_referral_code');
    if (subscribed) {
      setIsSubscribed(true);
      setReferralCode(code || undefined);
    }

    // Check for referral code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
      localStorage.setItem('blockbrief_referred_by', ref);
    }
  }, []);

  const handleSubscribe = (email: string, code?: string) => {
    localStorage.setItem('blockbrief_subscribed', 'true');
    if (code) {
      localStorage.setItem('blockbrief_referral_code', code);
      setReferralCode(code);
    }
    setIsSubscribed(true);
  };

  return (
    <main className="px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Stay Oriented, Not Addicted</h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto">
          Get calm, factual crypto intelligence delivered to your inbox. Free forever.
        </p>
      </section>

      {/* Social Proof */}
      <section className="mb-12">
        <SocialProof variant="full" />
      </section>

      {/* Subscription Form or Referral Widget */}
      <section className="max-w-xl mx-auto mb-12">
        {isSubscribed ? (
          <div className="space-y-8">
            <div className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">You&apos;re Subscribed!</h2>
              <p className="text-gray-400">
                Welcome to BlockBrief. Your first digest will arrive within 24 hours.
              </p>
            </div>
            
            <ReferralWidget referralCode={referralCode} />
            
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">Share BlockBrief with your network</p>
              <ShareWidget variant="horizontal" />
            </div>
          </div>
        ) : (
          <EmailCapture variant="hero" onSubscribe={handleSubscribe} />
        )}
      </section>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">What You Get</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/5 rounded-xl">
            <Zap className="text-amber-400 mb-3" size={32} />
            <h3 className="font-bold mb-2">Daily Intelligence Digest</h3>
            <p className="text-sm text-gray-400">
              Curated insights on market pulse, capital flow, and builder activity — delivered every morning.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <Clock className="text-blue-400 mb-3" size={32} />
            <h3 className="font-bold mb-2">4-Hour Refresh Cycle</h3>
            <p className="text-sm text-gray-400">
              Our intelligence engine updates every 4 hours, so you always have fresh, relevant signals.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <Shield className="text-green-400 mb-3" size={32} />
            <h3 className="font-bold mb-2">No Hype, No Panic</h3>
            <p className="text-sm text-gray-400">
              We filter out noise and fear-based content. Only calm, factual analysis that helps you think clearly.
            </p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <Gift className="text-purple-400 mb-3" size={32} />
            <h3 className="font-bold mb-2">Referral Rewards</h3>
            <p className="text-sm text-gray-400">
              Invite friends and unlock exclusive features like the Whale Watcher agent and Founding Member status.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">What Readers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-xl">
            <p className="text-sm text-gray-300 mb-4">
              &quot;Finally, a crypto newsletter that doesn&apos;t make me anxious. BlockBrief is my morning coffee companion.&quot;
            </p>
            <p className="text-xs text-gray-500">— @cryptobuilder</p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <p className="text-sm text-gray-300 mb-4">
              &quot;The builder activity section alone is worth subscribing. I discovered 3 new protocols last month.&quot;
            </p>
            <p className="text-xs text-gray-500">— @defi_dev</p>
          </div>
          <div className="p-6 bg-white/5 rounded-xl">
            <p className="text-sm text-gray-300 mb-4">
              &quot;Signal without the noise. Exactly what I needed to stay informed without doom scrolling.&quot;
            </p>
            <p className="text-xs text-gray-500">— @eth_investor</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="font-bold mb-2">Is it really free?</h3>
            <p className="text-sm text-gray-400">
              Yes, 100% free. We monetize through sponsored content from vetted partners, not subscriptions.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="font-bold mb-2">How often will I receive emails?</h3>
            <p className="text-sm text-gray-400">
              One daily digest in the morning. No spam, no multiple emails per day.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h3 className="font-bold mb-2">Can I unsubscribe anytime?</h3>
            <p className="text-sm text-gray-400">
              Absolutely. One-click unsubscribe in every email. No hard feelings.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
