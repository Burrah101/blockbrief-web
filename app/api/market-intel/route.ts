// src/app/api/market-intel/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [cgGlobal, cgGainers, ethTicker, fearGreed] = await Promise.all([
      // 1) Global market data (mcap, dominance)
      fetch("https://api.coingecko.com/api/v3/global").then((r) => r.json()),
      // 2) Top gainers from top 250 by mcap
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      ).then((r) => r.json()),
      // 3) ETH ticker (used as a cheap gas proxy / interest proxy)
      fetch("https://api.blockchain.com/v3/exchange/tickers/ETH-USD").then((r) =>
        r.json()
      ),
      // 4) Fear & Greed Index
      fetch("https://api.alternative.me/fng/?limit=1").then((r) => r.json()),
    ]);

    const totalMarketCap =
      cgGlobal?.data?.total_market_cap?.usd !== undefined
        ? Number(cgGlobal.data.total_market_cap.usd).toLocaleString()
        : "N/A";

    const btcDominance =
      cgGlobal?.data?.market_cap_percentage?.btc !== undefined
        ? Number(cgGlobal.data.market_cap_percentage.btc).toFixed(2)
        : "N/A";

    const ethPrice = typeof ethTicker?.last === "number" ? ethTicker.last : null;

    const fgValue =
      fearGreed?.data && fearGreed.data[0]
        ? fearGreed.data[0].value
        : "N/A";

    // Top 3 gainers by 24h %
    const movers =
      Array.isArray(cgGainers) && cgGainers.length > 0
        ? cgGainers
            .filter((c: any) => c.price_change_percentage_24h !== null)
            .sort(
              (a: any, b: any) =>
                b.price_change_percentage_24h - a.price_change_percentage_24h
            )
            .slice(0, 3)
            .map((c: any) => ({
              name: c.name,
              price: c.current_price,
              change: c.price_change_percentage_24h.toFixed(2),
            }))
        : [];

    return NextResponse.json(
      {
        ok: true,
        timestamp: new Date().toISOString(),
        marketCap: totalMarketCap,
        btcDominance,
        ethPrice,
        fearGreed: fgValue,
        topGainers: movers,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Market Intel API error:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch market intel." },
      { status: 500 }
    );
  }
}
