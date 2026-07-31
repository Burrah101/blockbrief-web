import {
  BuilderOpportunity,
  EcosystemNews,
  Headline,
  MacroEvent,
  NewsletterData,
} from "./sources/types";

export interface IntelligenceReport {
  generatedAt: string;

  marketPulse: "Bullish" | "Neutral" | "Bearish";

  executiveSummary: string;

  topStory?: Headline & {
    ecosystem: string;
  };

  headlines: (Headline & {
    ecosystem: string;
  })[];

  builderScores: {
    ecosystem: string;
    score: number;
  }[];

  builderOpportunities: BuilderOpportunity[];

  macro: MacroEvent[];
}

export function buildIntelligence(
  data: NewsletterData
): IntelligenceReport {
  const mergedHeadlines = data.ecosystems
    .flatMap((ecosystem) =>
      ecosystem.headlines.map((headline) => ({
        ...headline,
        ecosystem: ecosystem.ecosystem,
      }))
    )
    // remove duplicates by URL
    .filter(
      (headline, index, array) =>
        array.findIndex((item) => item.url === headline.url) === index
    )
    // highest importance first
    .sort((a, b) => b.importance - a.importance);

  const builderScores = data.ecosystems
    .map((ecosystem) => ({
      ecosystem: ecosystem.ecosystem,
      score: ecosystem.score,
    }))
    .sort((a, b) => b.score - a.score);

  let marketPulse: IntelligenceReport["marketPulse"] = "Neutral";

  const averageScore =
    builderScores.reduce((sum, item) => sum + item.score, 0) /
    Math.max(builderScores.length, 1);

  if (averageScore >= 85) {
    marketPulse = "Bullish";
  } else if (averageScore < 50) {
    marketPulse = "Bearish";
  }

  const topStory = mergedHeadlines[0];

  const executiveSummary =
    topStory != null
      ? `Today's builder activity is led by ${topStory.ecosystem}. ${builderScores
          .map((score) => `${score.ecosystem} (${score.score})`)
          .join(", ")} remain the most active ecosystems tracked today.`
      : "No significant builder activity was detected today.";

  return {
    generatedAt: data.generatedAt,

    marketPulse,

    executiveSummary,

    topStory,

    headlines: mergedHeadlines,

    builderScores,

    builderOpportunities: data.builderOpportunities,

    macro: data.macro,
  };
}