// src/lib/fetchData.ts

// =============================
// MARKET DATA (FIXED STRUCTURE)
// =============================
export async function getMarketData() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum",
      {
        cache: "no-store", // prevents Vercel cache crash
      }
    );

    const data = await res.json();

    return data.map((coin: any) => ({
      symbol: coin.symbol,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
    }));

  } catch (err) {
    console.error("Market data error:", err);

    // SAFE fallback (prevents crash)
    return [
      { symbol: "btc", price: 0, change24h: 0 },
      { symbol: "eth", price: 0, change24h: 0 },
    ];
  }
}

// =============================
// BUILDER ACTIVITY
// =============================
export async function getBuilderActivity() {
  try {
    return [
      { ecosystem: "Cardano", commits: 7 },
      { ecosystem: "Ethereum", commits: 5 },
      { ecosystem: "Monad", commits: 1 },
    ];
  } catch (err) {
    console.error("Builder activity error:", err);
    return [];
  }
}

// =============================
// DEFI DATA (VERCEL SAFE)
// =============================
export async function getDefiData() {
  try {
    const res = await fetch("https://api.llama.fi/protocols", {
      cache: "no-store", // CRITICAL
    });

    const data = await res.json();

    // limit payload size
    const trimmed = data.slice(0, 50);

    return trimmed.map((protocol: any) => ({
      name: protocol.name,
      tvl: protocol.tvl,
      chain: protocol.chain,
      category: protocol.category,
    }));

  } catch (err) {
    console.error("DeFi fetch failed:", err);
    return [];
  }
}

// =============================
// WHALE ACTIVITY
// =============================
export async function getWhaleActivity() {
  try {
    return [
      { symbol: "BTC", type: "large transfer", volume: "high" },
      { symbol: "ETH", type: "large transfer", volume: "high" },
    ];
  } catch (err) {
    console.error("Whale activity error:", err);
    return [];
  }
}

// =============================
// MACRO DATA (CLEAN + SAFE)
// =============================
export async function getMacroData() {
  try {
    return [
      {
        title: "Federal Reserve issues FOMC statement",
        source: "Federal Reserve",
      },
      {
        title: "ECB updates economic outlook",
        source: "European Central Bank",
      },
    ];
  } catch (err) {
    console.error("Macro data error:", err);
    return [];
  }
}