import { calculateMarketScore } from "./marketScore";

export interface MarketPulse {
  score: number;
  sentiment: "Bullish" | "Neutral" | "Bearish";
  color: "green" | "yellow" | "red";
  summary: string;
}

export function generateMarketPulse(data: any): MarketPulse {
  const score = calculateMarketScore(data);

  let sentiment: MarketPulse["sentiment"] = "Neutral";
  let color: MarketPulse["color"] = "yellow";
  let summary =
    "Markets are showing mixed signals with no dominant trend.";

  if (score >= 75) {
    sentiment = "Bullish";
    color = "green";
    summary =
      "Momentum remains positive across multiple indicators. Builders and capital continue to support the market.";
  } else if (score <= 40) {
    sentiment = "Bearish";
    color = "red";
    summary =
      "Risk has increased and market conditions remain defensive. Monitor volatility closely.";
  }

  return {
    score,
    sentiment,
    color,
    summary,
  };
}