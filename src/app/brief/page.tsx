'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import type { MarketData } from '@/lib/types';

interface GlobalMetrics {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  ethDominance: number;
  marketCapChange24h: number;
}

interface ExtendedData {
  assets: MarketData[];
  global: GlobalMetrics | null;
  timestamp: string;
}

export default function BriefPage() {
  const [data, setData] = useState<ExtendedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/prices?extended=true');
      if (res.ok) {
        const result = await res.json();
        setData(result);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(decimals)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <main className="px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
        <div>
          <h1 className="text-2xl font-bold">Live Brief</h1>
          <p className="text-sm text-gray-400">
            Real-time market data, refreshed every 30 seconds
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          <span className="text-sm">Refresh</span>
        </button>
      </div>

      {/* Last Update */}
      {lastUpdate && (
        <p className="text-xs text-gray-500 mb-6">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      )}

      {/* Global Metrics */}
      {data?.global && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
              <DollarSign size={12} />
              <span>Total Market Cap</span>
            </div>
            <div className="text-xl font-bold">{formatNumber(data.global.totalMarketCap)}</div>
            <div className={`text-xs ${data.global.marketCapChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.global.marketCapChange24h >= 0 ? '+' : ''}{data.global.marketCapChange24h.toFixed(2)}% 24h
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
              <BarChart3 size={12} />
              <span>24h Volume</span>
            </div>
            <div className="text-xl font-bold">{formatNumber(data.global.totalVolume)}</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-gray-400 text-xs mb-1">BTC Dominance</div>
            <div className="text-xl font-bold">{data.global.btcDominance.toFixed(1)}%</div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="text-gray-400 text-xs mb-1">ETH Dominance</div>
            <div className="text-xl font-bold">{data.global.ethDominance.toFixed(1)}%</div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && !data && (
        <div className="text-center py-12">
          <div className="animate-pulse text-gray-400">Scanning market data...</div>
        </div>
      )}

      {/* Asset Cards */}
      {data?.assets && (
        <section>
          <h2 className="text-lg font-bold mb-4">Tracked Assets</h2>
          <div className="grid gap-4">
            {data.assets.map((asset) => {
              const isPositive = asset.change24h >= 0;
              return (
                <div 
                  key={asset.symbol}
                  className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold uppercase">{asset.symbol}</span>
                      <span className="text-sm text-gray-400">{asset.name}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400 block text-xs">Price</span>
                      <span className="font-semibold">${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-xs">24h Volume</span>
                      <span className="font-semibold">{formatNumber(asset.volume24h)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-xs">Market Cap</span>
                      <span className="font-semibold">{formatNumber(asset.marketCap)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Data Sources */}
      <section className="mt-8 pt-6 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center">
          Data sourced from CoinGecko API. Prices update every 30 seconds. Not financial advice.
        </p>
      </section>
    </main>
  );
}
