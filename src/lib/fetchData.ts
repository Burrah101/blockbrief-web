// lib/fetchData.ts

// =============================
// MARKET DATA (basic placeholder)
// =============================
export async function getMarketData() {
  try {
    return {
      marketPulse: "Neutral",
      score: 67,
    };
  } catch (err) {
    console.error("Market data error:", err);
    return {
      marketPulse: "Neutral",
      score: 50,
    };
  }
}

// =============================
// BUILDER ACTIVITY
// =============================
export async function getBuilderActivity() {
  try {
    // Placeholder — replace later with GitHub / ecosystem feeds
    return [
      {
        ecosystem: "Cardano",
        commits: 7,
      },
      {
        ecosystem: "Ethereum",
        commits: 5,
      },
      {
        ecosystem: "Monad",
        commits: 1,
      },
    ];
  } catch (err) {
    console.error("Builder activity error:", err);
    return [];
  }
}

// =============================
// DEFI DATA (FIXED FOR VERCEL)
// =============================
export async function getDefiData() {
  try {
    const res = await fetch("https://api.llama.fi/protocols", {
      cache: "no-store", // 🚨 CRITICAL FIX (prevents 2MB cache crash)
    });

    const data = await res.json();

    // 🚨 LIMIT SIZE (prevents memory + deployment issues)
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
// WHALE ACTIVITY (SIMPLE MOCK)
// =============================
export async function getWhaleActivity() {
  try {
    return [
      {
        asset: "BTC",
        type: "large transfer",
        volume: "high",
      },
      {
        asset: "ETH",
        type: "large transfer",
        volume: "high",
      },
    ];
  } catch (err) {
    console.error("Whale activity error:", err);
    return [];
  }
}

// =============================
// MACRO DATA (RSS SAFE)
// =============================
export async function getMacroData() {
  try {
    // Keep only working sources (IMF removed — causes 403)
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