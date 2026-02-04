'use client';

import { Sparkles } from 'lucide-react';

interface SponsoredBadgeProps {
  sponsorName?: string;
  variant?: 'inline' | 'card';
}

export default function SponsoredBadge({ sponsorName, variant = 'inline' }: SponsoredBadgeProps) {
  if (variant === 'card') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
        <Sparkles size={14} className="text-amber-400" />
        <span className="text-xs font-medium text-amber-400">
          Sponsored{sponsorName ? ` by ${sponsorName}` : ''}
        </span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded">
      <Sparkles size={10} />
      <span>Sponsored</span>
    </span>
  );
}
