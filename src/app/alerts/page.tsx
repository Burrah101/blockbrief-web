'use client';

import { useEffect, useState } from 'react';
import {
  Bell,
  BellRing,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { ALERT_THRESHOLDS } from '@/lib/config';

type MarketItem = {
  symbol: string;
  price: number;
  change24h: number;
};

interface Alert {
  symbol: string;
  change: number;
  type: 'major' | 'fast';
  direction: 'up' | 'down';
}

export default function AlertsPage() {
  const [prices, setPrices] = useState<MarketItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);

      try {
        const res = await fetch('/api/prices');
        const data = await res.json();

        const market: MarketItem[] = data.market || [];

        setPrices(market);

        const newAlerts: Alert[] = [];

        market.forEach((item) => {
          const change = item?.change24h;

          if (typeof change !== 'number') return;

          const absChange = Math.abs(change);

          if (absChange >= ALERT_THRESHOLDS.major) {
            newAlerts.push({
              symbol: item.symbol,
              change,
              type: 'major',
              direction: change >= 0 ? 'up' : 'down',
            });
          } else if (absChange >= ALERT_THRESHOLDS.fast) {
            newAlerts.push({
              symbol: item.symbol,
              change,
              type: 'fast',
              direction: change >= 0 ? 'up' : 'down',
            });
          }
        });

        setAlerts(
          newAlerts.sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
        );
      } catch (error) {
        console.error('Failed to fetch prices:', error);
        setPrices([]);
        setAlerts([]);
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
          <div
            className={`p-2 rounded-lg ${
              alerts.length > 0 ? 'bg-red-500/20' : 'bg-green-500/20'
            }`}
          >
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
          <div
            className={`text-2xl font-bold ${
              alerts.length > 0 ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {alerts.length}
          </div>
          <div className="text-xs text-gray-400">Active Alerts</div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12 text-gray-400">
          Scanning market volatility...
        </div>
      )}

      {/* Alerts */}
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
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      alert.direction === 'up'
                        ? 'bg-green-500/20'
                        : 'bg-red-500/20'
                    }`}
                  >
                    {alert.direction === 'up' ? (
                      <TrendingUp className="text-green-400" size={20} />
                    ) : (
                      <TrendingDown className="text-red-400" size={20} />
                    )}
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400">
                      {alert.type === 'major' ? 'Major Move' : 'Fast Alert'}
                    </span>
                    <h3 className="text-lg font-bold uppercase">
                      {alert.symbol}
                    </h3>
                  </div>
                </div>

                <div
                  className={`text-2xl font-bold ${
                    alert.direction === 'up'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {typeof alert.change === 'number'
                    ? `${alert.change > 0 ? '+' : ''}${alert.change.toFixed(
                        2
                      )}%`
                    : 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No alerts */}
      {!isLoading && alerts.length === 0 && (
        <div className="text-center py-12 bg-green-500/10 border border-green-500/20 rounded-xl">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">All Clear</h2>
          <p className="text-gray-400">
            No significant price movements detected.
          </p>
        </div>
      )}

      {/* Assets */}
      {prices.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-4">All Assets</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {prices.map((item) => {
              const change = item.change24h;
              const isPositive = change >= 0;

              return (
                <div
                  key={item.symbol}
                  className="p-3 rounded-lg border bg-white/5 border-white/10"
                >
                  <div className="flex justify-between">
                    <span className="font-bold uppercase">
                      {item.symbol}
                    </span>
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {typeof change === 'number'
                      ? `${isPositive ? '+' : ''}${change.toFixed(2)}%`
                      : 'N/A'}
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