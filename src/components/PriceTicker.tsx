"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALERT_THRESHOLDS } from '@/lib/config';
import clsx from 'clsx';

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
        const interval = setInterval(fetchPrices, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="flex gap-4 justify-center py-10">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="w-48 h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
        </div>
    );

    if (!prices) return <div className="text-center text-red-400 font-mono py-10">System Offline: Market Data Unavailable</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto mt-12 px-4">
            {Object.entries(prices).map(([symbol, data], index) => {
                const change = data.usd_24h_change;
                const isMajor = Math.abs(change) >= ALERT_THRESHOLDS.major;
                const isFast = Math.abs(change) >= ALERT_THRESHOLDS.fast;

                return (
                    <motion.div
                        key={symbol}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={clsx(
                            "relative group overflow-hidden rounded-xl border p-6 backdrop-blur-md transition-all duration-300",
                            "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 hover:-translate-y-1",
                            {
                                "shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] border-red-500/30": isMajor,
                                "shadow-[0_0_30px_-5px_rgba(234,179,8,0.2)] border-yellow-500/30": isFast && !isMajor,
                            }
                        )}
                    >
                        {/* Background Glow for Alerts */}
                        {(isMajor || isFast) && (
                            <div className={clsx(
                                "absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none",
                                isMajor ? "bg-red-500" : "bg-yellow-500"
                            )} />
                        )}

                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <span className="uppercase font-bold text-sm tracking-widest opacity-60">{symbol}</span>
                            <span className={clsx(
                                "font-mono text-sm px-2 py-0.5 rounded flex items-center gap-1",
                                change >= 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                            )}>
                                {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
                            </span>
                        </div>

                        <div className="text-3xl font-mono font-bold tracking-tight mb-2 relative z-10">
                            ${data.usd.toLocaleString()}
                        </div>

                        <div className="h-6 relative z-10">
                            <AnimatePresence>
                                {(isMajor || isFast) && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={clsx(
                                            "inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                                            isMajor ? "bg-red-500 text-black" : "bg-yellow-500 text-black"
                                        )}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                                        {isMajor ? 'Major Move' : 'Volatile'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
