"use client";

import { useEffect, useState } from 'react';
import BriefCard from '@/components/BriefCard';

type PriceData = {
    usd: number;
    usd_24h_change: number;
};
type Prices = { [key: string]: PriceData };

export default function BriefPage() {
    const [prices, setPrices] = useState<Prices | null>(null);

    useEffect(() => {
        fetch('/api/prices').then(res => res.json()).then(setPrices).catch(console.error);
    }, []);

    return (
        <main className="px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Live Brief</h1>

            {!prices ? (
                <div className="text-gray-500 animate-pulse">Scanning market data...</div>
            ) : (
                <div className="grid gap-4">
                    {Object.entries(prices).map(([symbol, data]) => (
                        <BriefCard
                            key={symbol}
                            symbol={symbol}
                            price={data.usd}
                            change={data.usd_24h_change}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
