import { DailyBrief } from "./briefComposer";
import { MarketPulse } from "./marketPulse";

interface NarrativeInput {
  pulse: MarketPulse;
  brief: DailyBrief;
}

export interface MarketNarrative {
  title: string;
  body: string[];
}

export function generateNarrative({
  pulse,
  brief,
}: NarrativeInput): MarketNarrative {

  const paragraphs: string[] = [];

  if (pulse.sentiment === "Bullish") {
    paragraphs.push(
      "Market conditions remain constructive as buying pressure continues to outweigh selling pressure. While short-term volatility is expected, the broader trend continues to favor risk assets."
    );
  } else if (pulse.sentiment === "Bearish") {
    paragraphs.push(
      "Markets remain defensive with participants showing increased caution. Until momentum improves, traders are likely to favor capital preservation over aggressive positioning."
    );
  } else {
    paragraphs.push(
      "Markets remain balanced with neither buyers nor sellers maintaining a decisive advantage. Participants continue waiting for stronger catalysts before committing significant capital."
    );
  }

  paragraphs.push(
    `Builder activity continues supporting long-term network growth. ${brief.keyPoints[1]}`
  );

  paragraphs.push(
    `Infrastructure development remains active while DeFi participation and whale activity continue providing important signals for institutional sentiment.`
  );

  paragraphs.push(
    "Overall, today's market structure suggests monitoring trend continuation rather than reacting to individual headlines."
  );

  return {
    title: "Executive Narrative",
    body: paragraphs,
  };
}