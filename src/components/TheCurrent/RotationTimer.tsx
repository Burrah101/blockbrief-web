'use client';

import { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { ROTATION_CONFIG } from '@/lib/config';

interface RotationTimerProps {
  lastUpdate: Date;
  onRefresh?: () => void;
}

export default function RotationTimer({ lastUpdate, onRefresh }: RotationTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const nextUpdate = new Date(lastUpdate.getTime() + ROTATION_CONFIG.intervalHours * 60 * 60 * 1000);
      const now = new Date();
      const diff = nextUpdate.getTime() - now.getTime();
      
      if (diff <= 0) {
        return 'Refreshing...';
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    };

    setTimeRemaining(calculateTimeRemaining());
    
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lastUpdate]);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock size={16} />
        <span>Next rotation in <strong className="text-white">{timeRemaining}</strong></span>
      </div>
      
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
      >
        <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
        <span>{isRefreshing ? 'Refreshing...' : 'Refresh now'}</span>
      </button>
    </div>
  );
}
