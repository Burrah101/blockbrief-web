"use client";

import { useEffect, useState } from 'react';
import { ALERT_THRESHOLDS } from '@/lib/config';

type PriceData = {
    usd: number;
    usd_24h_change: number;
};
type Prices = { [key: string]: PriceData };

export default function AlertsPage() {
    const [prices, setPrices] = useState<Prices | null>(null);

    useEffect(() => {
        fetch('/api/prices').then(res => res.json()).then(setPrices).catch(console.error);
    }, []);

    return (
        <main className="px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Active Alerts</h1>

            {!prices ? (
                <div className="text-gray-500 animate-pulse">Scanning market volatility...</div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(prices).map(([symbol, data]) => {
                        const change = data.usd_24h_change;
                        const absChange = Math.abs(change);
                        const isMajor = absChange >= ALERT_THRESHOLDS.major;
                        const isFast = absChange >= ALERT_THRESHOLDS.fast;

                        if (!isFast && !isMajor) return null;

                        return (
                            <div key={symbol} className={`p-4 rounded shadow border-l-4 ${isMajor ? 'bg-red-100 text-black border-red-500' : 'bg-yellow-100 text-black border-yellow-500'}`}>
                                <strong className={`uppercase text-xs tracking-wider ${isMajor ? 'text-red-700' : 'text-yellow-700'}`}>
                                    {isMajor ? 'Major Move' : 'Fast Alert'}
                                </strong>
                                <p className="font-semibold text-lg mt-1">
                                    {symbol.toUpperCase()} moved {change > 0 ? '+' : ''}{change.toFixed(2)}% in the last 24h
                                </p>
                            </div>
                        );
                    })}

                    {/* Fallback if no alerts */}
                    {prices && !Object.values(prices).some(d => Math.abs(d.usd_24h_change) >= ALERT_THRESHOLDS.fast) && (
                        <p className="text-sm opacity-60 italic mt-4">No active alerts. Market is stable for now. Check back during volatility.</p>
                    )}
                </div>
            )}
        </main>
    );
}
