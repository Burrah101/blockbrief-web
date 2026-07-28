import {
  MarketData,
  BuilderActivity,
  DefiProtocol,
  WhaleActivity,
  MarketScore,
} from "./types";

export interface DailyBrief {
  headline: string;
  summary: string;
  marketPulse: string;
  builderWatch: string;
  capitalFlow: string;
  risk: string;
  opportunity: string;
  marketScore: number;
  confidence: string;
  newsletter: string;
  xThread: string[];
  telegram: string;
  linkedin: string;
}

export function generateDailyBrief(
  score: MarketScore,
  market: MarketData[],
  builders: BuilderActivity[],
  defi: DefiProtocol[],
  whales: WhaleActivity[]
): DailyBrief {

  const btc = market.find(
    c => c.symbol.toLowerCase() === "btc"
  );

  const bestCoin =
    [...market].sort((a, b) => b.change24h - a.change24h)[0];

  const worstCoin =
    [...market].sort((a, b) => a.change24h - b.change24h)[0];

  const topBuilder =
    [...builders].sort((a, b) => b.commits - a.commits)[0];

  const largestWhale =
    [...whales].sort((a, b) => b.amount - a.amount)[0];

  const headline =
    score.score >= 70
      ? "Crypto Market Holds Firm as Builders Continue Shipping"
      : score.score >= 50
      ? "Crypto Market Mixed While Development Remains Active"
      : "Risk Appetite Weakens Across Digital Assets";

  const summary =
    `${btc?.name ?? "Bitcoin"} trades ${btc?.change24h >= 0 ? "higher" : "lower"} today while developer activity remains ${
      builders.length ? "healthy" : "limited"
    }. DeFi protocols continue to evolve and whale activity remains worth monitoring.`;

  const marketPulse =
    `${bestCoin.name} leads today's market with ${bestCoin.change24h.toFixed(
      2
    )}% while ${worstCoin.name} is today's weakest performer at ${worstCoin.change24h.toFixed(
      2
    )}%.`;

  const builderWatch =
    topBuilder
      ? `${topBuilder.name} leads tracked repositories with ${topBuilder.commits} activity points.`
      : "No builder activity available.";

  const capitalFlow =
    largestWhale
      ? `${largestWhale.amount.toLocaleString()} ${largestWhale.symbol} moved from ${largestWhale.from} to ${largestWhale.to}.`
      : "No significant whale transfers detected.";

  const risk =
    worstCoin.change24h < -5
      ? `${worstCoin.name} is showing elevated downside momentum.`
      : "No major market risks detected.";

  const opportunity =
    bestCoin.change24h > 5
      ? `${bestCoin.name} is demonstrating strong momentum worth monitoring.`
      : "Watch builder activity for emerging opportunities.";

  const newsletter = `
${headline}

${summary}

Market Pulse
${marketPulse}

Builder Watch
${builderWatch}

Capital Flow
${capitalFlow}

Risk
${risk}

Opportunity
${opportunity}
`;

  const xThread = [
    headline,
    summary,
    marketPulse,
    builderWatch,
    capitalFlow,
    `Market Score: ${score.score}/100`,
  ];

  const telegram = `
📊 Daily Brief

Market Score: ${score.score}/100

${headline}

${marketPulse}
`;

  const linkedin = `${headline}

${summary}

${marketPulse}

${builderWatch}

${capitalFlow}

#crypto #blockchain`;

  return {
    headline,
    summary,
    marketPulse,
    builderWatch,
    capitalFlow,
    risk,
    opportunity,
    marketScore: score.score,
    confidence: "High",
    newsletter,
    xThread,
    telegram,
    linkedin,
  };
}