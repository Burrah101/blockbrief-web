'use client';

import { ExternalLink, Eye, MousePointer } from 'lucide-react';
import SponsoredBadge from './SponsoredBadge';
import type { SponsoredContent } from '@/lib/types';

interface SponsoredCardProps {
  content: SponsoredContent;
  onView?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function SponsoredCard({ content, onView, onClick }: SponsoredCardProps) {
  const handleClick = () => {
    if (onClick) onClick(content.id);
    window.open(content.ctaUrl, '_blank');
  };

  // Track view on mount
  if (onView && typeof window !== 'undefined') {
    onView(content.id);
  }

  return (
    <div className="relative bg-gradient-to-br from-amber-900/10 to-orange-900/10 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-colors">
      {/* Sponsored Badge */}
      <div className="absolute top-4 right-4">
        <SponsoredBadge sponsorName={content.sponsor} variant="card" />
      </div>

      {/* Sponsor Logo */}
      {content.sponsorLogo && (
        <div className="mb-4">
          <img 
            src={content.sponsorLogo} 
            alt={content.sponsor} 
            className="h-8 object-contain"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 pr-24">{content.title}</h3>

      {/* Content */}
      <p className="text-gray-300 mb-6 leading-relaxed">{content.content}</p>

      {/* CTA Button */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors"
      >
        <span>{content.cta}</span>
        <ExternalLink size={16} />
      </button>

      {/* Stats (for admin view) */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Eye size={12} />
          {content.impressions.toLocaleString()} views
        </span>
        <span className="flex items-center gap-1">
          <MousePointer size={12} />
          {content.clicks.toLocaleString()} clicks
        </span>
        <span className="ml-auto">
          CTR: {content.impressions > 0 ? ((content.clicks / content.impressions) * 100).toFixed(1) : 0}%
        </span>
      </div>
    </div>
  );
}
