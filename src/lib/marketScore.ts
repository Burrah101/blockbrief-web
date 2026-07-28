import type {
  MarketData,
  BuilderActivity,
  DefiData,
  WhaleMove,
} from "./types";

export interface MarketScore {
  overall: number;
  sentiment: "Bullish" | "Neutral" | "Bearish";

  market: number;
  builders: number;
  defi: number;
  whales: number;

  reasons: string[];
}

export function calculateMarketScore(data: {
  market?: MarketData[];
  builders?: BuilderActivity[];
  defi?: DefiData[];
  whales?: WhaleMove[];
}): MarketScore {

  let score = 50;

  const reasons: string[] = [];

  const btc = data.market?.find(
    c => c.symbol.toLowerCase() === "btc"
  );

  const eth = data.market?.find(
    c => c.symbol.toLowerCase() === "eth"
  );

  //------------------------------------
  // BTC
  //------------------------------------

  if (btc) {

    if (btc.change24h > 5) {
      score += 12;
      reasons.push("Bitcoin showing strong momentum.");
    }

    else if (btc.change24h > 2) {
      score += 7;
      reasons.push("Bitcoin trading higher.");
    }

    else if (btc.change24h < -5) {
      score -= 12;
      reasons.push("Bitcoin under heavy selling.");
    }

    else if (btc.change24h < -2) {
      score -= 7;
      reasons.push("Bitcoin weakening.");
    }

  }

  //------------------------------------
  // ETH
  //------------------------------------

  if (eth) {

    if (eth.change24h > 5) {

      score += 8;

      reasons.push("Ethereum outperforming.");

    }

    else if (eth.change24h < -5) {

      score -= 8;

      reasons.push("Ethereum losing strength.");

    }

  }

  //------------------------------------
  // Builder Activity
  //------------------------------------

  if ((data.builders?.length ?? 0) >= 3) {

    score += 6;

    reasons.push("Developer activity remains healthy.");

  }

  //------------------------------------
  // DeFi
  //------------------------------------

  if ((data.defi?.length ?? 0) > 0) {

    score += 4;

    reasons.push("Major DeFi protocols remain active.");

  }

  //------------------------------------
  // Whale Activity
  //------------------------------------

  if ((data.whales?.length ?? 0) > 0) {

    reasons.push("Large wallet movements detected.");

  }

  //------------------------------------

  score = Math.max(0, Math.min(100, score));

  let sentiment: MarketScore["sentiment"] = "Neutral";

  if (score >= 70)
    sentiment = "Bullish";

  else if (score <= 40)
    sentiment = "Bearish";

  return {

    overall: score,

    sentiment,

    market: btc?.change24h ?? 0,

    builders: data.builders?.length ?? 0,

    defi: data.defi?.length ?? 0,

    whales: data.whales?.length ?? 0,

    reasons,

  };

}