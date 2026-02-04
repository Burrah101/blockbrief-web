'use client';

import type { Segment } from '@/lib/types';
import { SEGMENT_CONFIG } from '@/lib/types';

interface SegmentNavProps {
  activeSegment: Segment | 'all';
  onSegmentChange: (segment: Segment | 'all') => void;
}

export default function SegmentNav({ activeSegment, onSegmentChange }: SegmentNavProps) {
  const segments: (Segment | 'all')[] = ['all', 'market_pulse', 'capital_flow', 'builder_activity', 'context', 'positive_signal'];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {segments.map((segment) => {
        const isActive = activeSegment === segment;
        const config = segment === 'all' ? null : SEGMENT_CONFIG[segment];
        
        return (
          <button
            key={segment}
            onClick={() => onSegmentChange(segment)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              transition-all duration-200
              ${isActive 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {config && <span>{config.icon}</span>}
            <span>{segment === 'all' ? 'All Signals' : config?.label}</span>
          </button>
        );
      })}
    </div>
  );
}
