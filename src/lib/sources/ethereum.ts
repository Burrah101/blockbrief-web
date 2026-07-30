import { EcosystemNews, Headline } from "./types";
import { XMLParser } from "fast-xml-parser";

export async function getEthereumNews(): Promise<EcosystemNews> {
  try {
    const response = await fetch("https://blog.ethereum.org/feed.xml", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Ethereum RSS failed: ${response.status}`);
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });

    const feed = parser.parse(xml);

    const items = feed?.rss?.channel?.item ?? [];

    const headlines: Headline[] = items.slice(0, 5).map((item: any) => ({
      title: item.title ?? "",
      summary:
        item.description
          ?.replace(/<[^>]+>/g, "")
          ?.replace(/\s+/g, " ")
          ?.trim()
          ?.substring(0, 220) ?? "",
      url: item.link ?? "",
      source: "Ethereum Foundation",
      publishedAt: item.pubDate ?? "",
      importance: 90,
    }));

    return {
      ecosystem: "Ethereum",
      score: 92,
      summary:
        headlines.length > 0
          ? `Collected ${headlines.length} official Ethereum updates.`
          : "No recent Ethereum updates.",
      headlines,
      builderUpdates: [],
      opportunities: [],
    };
  } catch (error) {
    console.error("Ethereum source failed:", error);

    return {
      ecosystem: "Ethereum",
      score: 0,
      summary: "Unable to load Ethereum news.",
      headlines: [],
      builderUpdates: [],
      opportunities: [],
    };
  }
}