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

  // Later we'll replace this with:
  // briefEngine()
  // getCurrentData()
  // narrativeEngine()
  // AI summary

  return {

    title: "BlockBrief Daily",

    date: new Date().toLocaleDateString(),

    marketPulse: "Neutral",

    summary:
      "Markets continue consolidating while builder activity remains healthy. Bitcoin is holding support while capital slowly rotates into infrastructure projects.",

    headlines: sources.ecosystems.flatMap((ecosystem) =>
      ecosystem.headlines.map((headline) => headline.title)
    ),

  };
}