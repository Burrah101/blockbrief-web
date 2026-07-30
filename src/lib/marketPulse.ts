import { calculateMarketScore } from "./marketScore";

export interface MarketPulse {
  score: number;
  sentiment: "Bullish" | "Neutral" | "Bearish";
  color: "green" | "yellow" | "red";
  summary: string;
  reasons: string[];
}

export function generateMarketPulse(data: any): MarketPulse {
  const result = calculateMarketScore(data);

  let color: MarketPulse["color"] = "yellow";
  let summary =
    "Markets are showing mixed signals with no dominant trend.";

  if (result.sentiment === "Bullish") {
    color = "green";
    summary =
      "Momentum remains positive across multiple indicators. Builders and capital continue to support the market.";
  } else if (result.sentiment === "Bearish") {
    color = "red";
    summary =
      "Risk has increased and market conditions remain defensive. Monitor volatility closely.";
  }

  return {
    score: result.overall,
    sentiment: result.sentiment,
    color,
    summary,
    reasons: result.reasons,
  };
}