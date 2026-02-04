'use client';

import { useState, useEffect } from 'react';
import InsightCard from './InsightCard';
import SegmentNav from './SegmentNav';
import RotationTimer from './RotationTimer';
import type { Insight, Segment } from '@/lib/types';
import { ROTATION_CONFIG } from '@/lib/config';

interface CurrentDashboardProps {
  initialInsights: Insight[];
}

export default function CurrentDashboard({ initialInsights }: CurrentDashboardProps) {
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [activeSegment, setActiveSegment] = useState<Segment | 'all'>('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Filter insights based on active segment
  const filteredInsights = activeSegment === 'all' 
    ? insights 
    : insights.filter(i => i.segment === activeSegment);

  // Get featured insight (first non-sponsored, or first overall)
  const featuredInsight = filteredInsights.find(i => !i.isSponsored) || filteredInsights[0];
  const otherInsights = filteredInsights.filter(i => i.id !== featuredInsight?.id);

  // Limit visible cards based on config
  const visibleInsights = otherInsights.slice(0, ROTATION_CONFIG.visibleCards - 1);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/insights');
      if (res.ok) {
        const data = await res.json();
        setInsights(data.insights);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Failed to refresh insights:', error);
    }
    setIsLoading(false);
  };

  const handleShare = (insight: Insight) => {
    const text = `${insight.headline}\n\nStay oriented, not addicted. 🧠\n\nvia @BlockBrief`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">The Current</h1>
        <p className="text-gray-400">
          Signal-driven crypto intelligence, refreshed every 4 hours
        </p>
      </div>

      {/* Rotation Timer */}
      <RotationTimer lastUpdate={lastUpdate} onRefresh={handleRefresh} />

      {/* Segment Navigation */}
      <SegmentNav activeSegment={activeSegment} onSegmentChange={setActiveSegment} />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-400">Loading fresh insights...</div>
        </div>
      )}

      {/* Insights Grid */}
      {!isLoading && (
        <div className="space-y-4">
          {/* Featured Insight */}
          {featuredInsight && (
            <InsightCard 
              insight={featuredInsight} 
              featured={true} 
              onShare={handleShare}
            />
          )}

          {/* Other Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleInsights.map((insight) => (
              <InsightCard 
                key={insight.id} 
                insight={insight} 
                onShare={handleShare}
              />
            ))}
          </div>

          {/* Show more link */}
          {otherInsights.length > ROTATION_CONFIG.visibleCards - 1 && (
            <div className="text-center pt-4">
              <button 
                onClick={() => setActiveSegment('all')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                View all {insights.length} insights →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredInsights.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No insights available for this segment.</p>
          <button 
            onClick={() => setActiveSegment('all')}
            className="mt-2 text-sm text-white hover:underline"
          >
            View all signals
          </button>
        </div>
      )}
    </div>
  );
}
