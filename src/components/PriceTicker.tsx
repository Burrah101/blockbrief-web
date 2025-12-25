"use client";

import { useEffect, useState } from 'react';
import { ALERT_THRESHOLDS } from '@/lib/config';

type PriceData = {
    usd: number;
    usd_24h_change: number;
};

type Prices = {
    [key: string]: PriceData;
};

export default function PriceTicker() {
    const [prices, setPrices] = useState<Prices | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await fetch('/api/prices');
                if (res.ok) {
                    const data = await res.json();
                    setPrices(data);
                }
            } catch (error) {
                console.error("Failed to fetch prices", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-center opacity-50 py-4">Loading market data...</div>;
    if (!prices) return <div className="text-center text-red-500 py-4">Market data unavailable</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto mt-8">
            {Object.entries(prices).map(([symbol, data]) => {
                const change = data.usd_24h_change;
                const isMajor = Math.abs(change) >= ALERT_THRESHOLDS.major;
                const isFast = Math.abs(change) >= ALERT_THRESHOLDS.fast;

                let borderColor = "border-gray-800";
                if (isMajor) borderColor = "border-red-500";
                else if (isFast) borderColor = "border-yellow-500";

                return (
                    <div key={symbol} className={`border ${borderColor} rounded p-4 bg-gray-900 transition-all hover:bg-gray-800`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="uppercase font-bold text-lg">{symbol}</span>
                            <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {change > 0 ? '+' : ''}{change.toFixed(2)}%
                            </span>
                        </div>
                        <div className="text-2xl font-mono">
                            ${data.usd.toLocaleString()}
                        </div>
                        {(isMajor || isFast) && (
                            <div className="mt-2 text-xs font-bold uppercase tracking-wider text-center bg-white text-black rounded py-1">
                                {isMajor ? 'Major Move' : 'Volatile'}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
