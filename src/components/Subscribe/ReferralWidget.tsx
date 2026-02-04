'use client';

import { useState, useEffect } from 'react';
import { Gift, Users, Copy, CheckCircle } from 'lucide-react';
import { REFERRAL_MILESTONES } from '@/lib/config';

interface ReferralWidgetProps {
  referralCode?: string;
}

export default function ReferralWidget({ referralCode }: ReferralWidgetProps) {
  const [code, setCode] = useState(referralCode || '');
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get or generate referral code from localStorage
    if (!code) {
      const stored = localStorage.getItem('blockbrief_referral_code');
      if (stored) {
        setCode(stored);
      } else {
        const newCode = `BB${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        localStorage.setItem('blockbrief_referral_code', newCode);
        setCode(newCode);
      }
    }

    // Get referral count
    const count = parseInt(localStorage.getItem('blockbrief_referral_count') || '0');
    setReferralCount(count);
  }, [code]);

  const referralUrl = `https://blockbrief.io?ref=${code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const nextMilestone = REFERRAL_MILESTONES.find(m => m.count > referralCount);
  const progress = nextMilestone 
    ? (referralCount / nextMilestone.count) * 100 
    : 100;

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="text-purple-400" size={24} />
        <h3 className="text-lg font-bold">Invite Friends, Earn Rewards</h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Share BlockBrief and unlock exclusive features when friends subscribe.
      </p>

      {/* Referral Link */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 truncate">
          {referralUrl}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="flex items-center gap-1 text-gray-400">
            <Users size={14} />
            <span>{referralCount} referrals</span>
          </span>
          {nextMilestone && (
            <span className="text-purple-400">
              {nextMilestone.count - referralCount} more for: {nextMilestone.reward}
            </span>
          )}
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-2 gap-2">
        {REFERRAL_MILESTONES.slice(0, 4).map((milestone) => (
          <div 
            key={milestone.count}
            className={`text-xs p-2 rounded border ${
              referralCount >= milestone.count 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}
          >
            <span className="font-bold">{milestone.count} refs:</span> {milestone.reward}
          </div>
        ))}
      </div>
    </div>
  );
}
