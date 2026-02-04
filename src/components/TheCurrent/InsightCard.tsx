'use client';

import { formatDistanceToNow } from 'date-fns';
import { Share2, ExternalLink } from 'lucide-react';
import type { Insight } from '@/lib/types';
import { SEGMENT_CONFIG } from '@/lib/types';

interface InsightCardProps {
  insight: Insight;
  featured?: boolean;
  onShare?: (insight: Insight) => void;
}

export default function InsightCard({ insight, featured = false, onShare }: InsightCardProps) {
  const config = SEGMENT_CONFIG[insight.segment];
  
  const handleShare = () => {
    if (onShare) {
      onShare(insight);
    } else {
      // Default share behavior
      const text = `${insight.headline}\n\nvia BlockBrief - Signal. No noise.`;
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div 
      className={`
        relative rounded-lg border transition-all duration-300
        ${featured 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 p-6' 
          : 'bg-slate-900/50 border-white/10 p-4 hover:border-white/20'
        }
        ${insight.isSponsored ? 'border-amber-500/30' : ''}
      `}
    >
      {/* Sponsored Badge */}
      {insight.isSponsored && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
          <span>Sponsored</span>
          {insight.sponsorName && <span>by {insight.sponsorName}</span>}
        </div>
      )}

      {/* Segment Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{config.icon}</span>
        <span className={`text-xs font-medium uppercase tracking-wider text-${config.color}-400`}>
          {config.label}
        </span>
        <span className="text-xs text-gray-500 ml-auto">
          {formatDistanceToNow(new Date(insight.timestamp), { addSuffix: true })}
        </span>
      </div>

      {/* Headline */}
      <h3 className={`font-bold mb-3 ${featured ? 'text-xl' : 'text-lg'}`}>
        {insight.headline}
      </h3>

      {/* Bullets */}
      <ul className="space-y-2 mb-4">
        {insight.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="text-white/40 mt-1">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Context (featured only) */}
      {featured && (
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          {insight.context}
        </p>
      )}

      {/* Watch Next */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span className="font-medium text-gray-400">Watch next:</span>
        <span>{insight.watchNext}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {insight.sources.map((source, i) => (
            <span key={i} className="bg-white/5 px-2 py-0.5 rounded">
              {source}
            </span>
          ))}
        </div>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
