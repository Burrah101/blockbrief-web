'use client';

import { Users, TrendingUp, Star } from 'lucide-react';

interface SocialProofProps {
  subscriberCount?: number;
  variant?: 'compact' | 'full';
}

export default function SocialProof({ subscriberCount = 10847, variant = 'compact' }: SocialProofProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Users size={16} />
        <span><strong className="text-white">{formatNumber(subscriberCount)}</strong> readers</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white">
          <Users size={24} />
          <span>{formatNumber(subscriberCount)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Subscribers</p>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white">
          <TrendingUp size={24} />
          <span>4.9</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Avg Rating</p>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-white">
          <Star size={24} />
          <span>68%</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Open Rate</p>
      </div>
    </div>
  );
}
