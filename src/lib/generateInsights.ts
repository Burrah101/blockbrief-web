// src/lib/generateInsights.ts

type Segment = "market_pulse" | "builder_activity" | "defi" | "capital_flow";

type Insight = {
  headline: string;
  bullets: string[];
};

type InputData = {
  market?: any[];
  builders?: any[];
  defi?: any[];
  whales?: any[];
};

// =============================
// MAIN ENTRY
// =============================
export function generateAllInsights(data: InputData) {
  const segments: Segment[] = [
    "market_pulse",
    "builder_activity",
    "defi",
    "capital_flow",
  ];

  return segments.map((segment) =>
    generateInsightWithLLM(segment, data)
  );
}

// =============================
// FALLBACK ENGINE (NO LLM)
// =============================
function generateInsightWithLLM(segment: Segment, data: InputData): Insight {
  return generateFallbackInsight(segment, data);
}

function generateFallbackInsight(segment: Segment, data: InputData): Insight {
  const templates: Record<Segment, () => Insight> = {

    // =============================
    // MARKET PULSE
    // =============================
    market_pulse: () => {
      const btc = data.market?.find(
        (m) => m.symbol?.toLowerCase() === "btc"
      );

      const eth = data.market?.find(
        (m) => m.symbol?.toLowerCase() === "eth"
      );

      return {
        headline: `BTC ${
          btc?.change24h && btc.change24h >= 0 ? "Leads" : "Slides"
        } as Bitcoin trades near $${btc?.price?.toLocaleString() || "N/A"}`,

        bullets: [
          eth?.price
            ? `ETH trading at $${eth.price.toLocaleString()}`
            : "ETH data unavailable",

          btc?.change24h
            ? `24h change: ${btc.change24h.toFixed(2)}%`
            : "Market movement stable",

          "Monitoring overall sentiment across major assets",
        ],
      };
    },

    // =============================
    // BUILDER ACTIVITY
    // =============================
    builder_activity: () => {
      return {
        headline: "Builder Activity Across Ecosystems",

        bullets: [
          "Cardano leading development commits",
          "Ethereum maintaining steady activity",
          "Monad showing early traction",
        ],
      };
    },

    // =============================
    // DEFI
    // =============================
    defi: () => {
      const top = data.defi?.[0];

      return {
        headline: top
          ? `${top.name} leads DeFi activity`
          : "DeFi Activity Update",

        bullets: [
          top?.tvl
            ? `TVL: $${Math.round(top.tvl).toLocaleString()}`
            : "TVL data unavailable",

          top?.chain
            ? `Chain: ${top.chain}`
            : "Chain data unavailable",

          "Monitoring liquidity flows across protocols",
        ],
      };
    },

    // =============================
    // CAPITAL FLOW (FIXED 🚨)
    // =============================
    capital_flow: () => {
      const biggest = data.whales?.[0];

      return {
        headline: biggest
          ? `${biggest.symbol} Whale Activity Detected`
          : "Capital Flow Update",

        bullets: [
          biggest?.amount
            ? `${biggest.amount.toLocaleString()} ${biggest.symbol} moved`
            : "No whale transfer size available",

          biggest?.from && biggest?.to
            ? `${biggest.from} → ${biggest.to}`
            : "Awaiting transfer route data",

          biggest?.usdValue
            ? `Tracked value: $${biggest.usdValue.toLocaleString()}`
            : "Monitoring on-chain flows",
        ],
      };
    },
  };

  return templates[segment]();
}