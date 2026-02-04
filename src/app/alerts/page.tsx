'use client';

import { useEffect, useState } from 'react';
import { Bell, BellRing, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { ALERT_THRESHOLDS } from '@/lib/config';

type PriceData = {
  usd: number;
  usd_24h_change: number;
};
type Prices = { [key: string]: PriceData };

interface Alert {
  symbol: string;
  change: number;
  type: 'major' | 'fast';
  direction: 'up' | 'down';
}

export default function AlertsPage() {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/prices');
        if (res.ok) {
          const data = await res.json();
          setPrices(data);
          
          // Process alerts
          const newAlerts: Alert[] = [];
          Object.entries(data).forEach(([symbol, priceData]) => {
            const change = (priceData as PriceData).usd_24h_change;
            const absChange = Math.abs(change);
            
            if (absChange >= ALERT_THRESHOLDS.major) {
              newAlerts.push({
                symbol,
                change,
                type: 'major',
                direction: change >= 0 ? 'up' : 'down',
              });
            } else if (absChange >= ALERT_THRESHOLDS.fast) {
              newAlerts.push({
                symbol,
                change,
                type: 'fast',
                direction: change >= 0 ? 'up' : 'down',
              });
            }
          });
          
          setAlerts(newAlerts.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)));
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
      setIsLoading(false);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${alerts.length > 0 ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
            {alerts.length > 0 ? (
              <BellRing className="text-red-400" size={24} />
            ) : (
              <Bell className="text-green-400" size={24} />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Movement Radar</h1>
            <p className="text-sm text-gray-400">
              Tracking significant price movements in real-time
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${alerts.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {alerts.length}
          </div>
          <div className="text-xs text-gray-400">Active Alerts</div>
        </div>
      </div>

      {/* Threshold Info */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-yellow-400" />
            <span className="font-bold text-yellow-400">Fast Alert</span>
          </div>
          <p className="text-sm text-gray-400">
            Triggered at ±{ALERT_THRESHOLDS.fast}% in 24h
          </p>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <BellRing size={16} className="text-red-400" />
            <span className="font-bold text-red-400">Major Move</span>
          </div>
          <p className="text-sm text-gray-400">
            Triggered at ±{ALERT_THRESHOLDS.major}% in 24h
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-pulse text-gray-400">Scanning market volatility...</div>
        </div>
      )}

      {/* Alerts List */}
      {!isLoading && alerts.length > 0 && (
        <div className="space-y-4 mb-8">
          {alerts.map((alert) => (
            <div 
              key={alert.symbol}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'major' 
                  ? 'bg-red-500/10 border-red-500' 
                  : 'bg-yellow-500/10 border-yellow-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    alert.direction === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {alert.direction === 'up' ? (
                      <TrendingUp className="text-green-400" size={20} />
                    ) : (
                      <TrendingDown className="text-red-400" size={20} />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      alert.type === 'major' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {alert.type === 'major' ? 'Major Move' : 'Fast Alert'}
                    </span>
                    <h3 className="text-lg font-bold uppercase">{alert.symbol}</h3>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${
                  alert.direction === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {alert.change > 0 ? '+' : ''}{alert.change.toFixed(2)}%
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {alert.symbol.toUpperCase()} has moved {Math.abs(alert.change).toFixed(2)}% {alert.direction} in the last 24 hours
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No Alerts State */}
      {!isLoading && alerts.length === 0 && (
        <div className="text-center py-12 bg-green-500/10 border border-green-500/20 rounded-xl">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">All Clear</h2>
          <p className="text-gray-400">
            No significant price movements detected. Market is stable for now.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Alerts trigger when assets move ±{ALERT_THRESHOLDS.fast}% or more in 24 hours.
          </p>
        </div>
      )}

      {/* All Assets Status */}
      {prices && (
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-4">All Tracked Assets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(prices).map(([symbol, data]) => {
              const change = data.usd_24h_change;
              const isPositive = change >= 0;
              const hasAlert = Math.abs(change) >= ALERT_THRESHOLDS.fast;
              
              return (
                <div 
                  key={symbol}
                  className={`p-3 rounded-lg border ${
                    hasAlert 
                      ? 'bg-yellow-500/10 border-yellow-500/30' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold uppercase">{symbol}</span>
                    {hasAlert && <BellRing size={12} className="text-yellow-400" />}
                  </div>
                  <div className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
