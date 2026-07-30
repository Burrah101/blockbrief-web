import { getDailySources } from "./sources";

export interface Newsletter {
  title: string;
  date: string;
  marketPulse: string;
  summary: string;
  headlines: string[];
}

export async function generateNewsletter(): Promise<Newsletter> {
  const sources = await getDailySources();

  console.log("BlockBrief Sources", sources);

  const rankedHeadlines = sources.ecosystems
    .flatMap((ecosystem) =>
      ecosystem.headlines.map((headline) => ({
        ...headline,
        ecosystem: ecosystem.ecosystem,
      }))
    )
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10);

  const summary =
    rankedHeadlines.length > 0
      ? `Today's crypto builder activity is led by ${
          rankedHeadlines[0].ecosystem
        }. ${sources.ecosystems
          .filter((e) => e.headlines.length > 0)
          .map((e) => `${e.ecosystem} (${e.headlines.length})`)
          .join(", ")} produced notable updates today.`
      : "No significant ecosystem updates were collected today.";

  return {
    title: "BlockBrief Daily",

    date: new Date().toLocaleDateString(),

    marketPulse: "Neutral",

    summary,

    headlines: rankedHeadlines.map(
      (headline) => `[${headline.ecosystem}] ${headline.title}`
    ),
  };
}