import { MarketPulse } from "./marketPulse";

interface BriefComposerInput {
  pulse: MarketPulse;
  marketCount: number;
  builderCount: number;
  defiCount: number;
  whaleCount: number;
}

export interface DailyBrief {
  headline: string;
  summary: string;
  keyPoints: string[];
}

export function composeDailyBrief({
  pulse,
  marketCount,
  builderCount,
  defiCount,
  whaleCount,
}: BriefComposerInput): DailyBrief {

  let headline =
    "Markets remain balanced.";

  if (pulse.sentiment === "Bullish") {
    headline =
      "Builders and momentum continue supporting the market.";
  }

  if (pulse.sentiment === "Bearish") {
    headline =
      "Markets remain defensive as risk increases.";
  }

  const summary =
    `${marketCount} assets were analyzed. ` +
    `${builderCount} builder updates, ` +
    `${defiCount} DeFi updates, and ` +
    `${whaleCount} notable whale events were detected.`;

  const keyPoints = [
    `${pulse.sentiment} market sentiment (${pulse.score}/100).`,
    `${builderCount} builder updates tracked.`,
    `${defiCount} DeFi protocol updates.`,
    `${whaleCount} whale events monitored.`,
  ];

  return {
    headline,
    summary,
    keyPoints,
  };
}