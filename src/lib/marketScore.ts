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
  // Market Breadth
  //------------------------------------

  const gainers =
    data.market?.filter(c => c.change24h > 0).length ?? 0;

  const losers =
    (data.market?.length ?? 0) - gainers;

  if ((data.market?.length ?? 0) > 0) {

    if (gainers >= Math.ceil((data.market?.length ?? 0) * 0.7)) {
      score += 8;
      reasons.push(
        `${gainers} of ${data.market?.length} tracked assets are positive.`
      );
    }

    if (losers >= Math.ceil((data.market?.length ?? 0) * 0.7)) {
      score -= 8;
      reasons.push(
        `${losers} tracked assets are under pressure.`
      );
    }

  }

  //------------------------------------
  // Builder Quality
  //------------------------------------

  if ((data.builders?.length ?? 0) >= 3) {
    score += 6;
    reasons.push("Developer activity remains healthy.");
  }

  const topBuilder =
    Math.max(...(data.builders?.map(b => b.commits) ?? [0]));

  if (topBuilder >= 120) {
    score += 8;
    reasons.push("Builder activity accelerating.");
  }

  else if (topBuilder >= 60) {
    score += 4;
    reasons.push("Healthy developer momentum.");
  }

  //------------------------------------
  // DeFi
  //------------------------------------

  if ((data.defi?.length ?? 0) > 0) {
    score += 4;
    reasons.push("Major DeFi protocols remain active.");
  }

  const positiveDefi =
    data.defi?.filter(d => d.change24h > 0).length ?? 0;

  const negativeDefi =
    (data.defi?.length ?? 0) - positiveDefi;

  if (positiveDefi > negativeDefi) {
    score += 5;
    reasons.push("DeFi TVL improving.");
  }

  if (negativeDefi > positiveDefi) {
    score -= 5;
    reasons.push("DeFi TVL weakening.");
  }

  //------------------------------------
  // Whale Activity
  //------------------------------------

  if ((data.whales?.length ?? 0) > 0) {
    reasons.push("Large wallet movements detected.");
  }

  const exchangeOutflows =
    data.whales?.filter(
      w => w.type === "exchange_outflow"
    ).length ?? 0;

  const exchangeInflows =
    data.whales?.filter(
      w => w.type === "exchange_inflow"
    ).length ?? 0;

  if (exchangeOutflows > exchangeInflows) {
    score += 4;
    reasons.push("More assets leaving exchanges.");
  }

  if (exchangeInflows > exchangeOutflows) {
    score -= 4;
    reasons.push("Exchange deposits increasing.");
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