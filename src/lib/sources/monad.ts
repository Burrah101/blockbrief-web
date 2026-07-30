import { EcosystemNews, Headline } from "./types";
import { XMLParser } from "fast-xml-parser";

export async function getMonadNews(): Promise<EcosystemNews> {
  try {
    const response = await fetch("https://news.monad.xyz/rss.xml", {
      cache: "no-store",
      headers: {
        "User-Agent": "BlockBrief/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Monad RSS failed: ${response.status}`);
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
      source: "Monad",
      publishedAt: item.pubDate ?? "",
      importance: 95,
    }));

    return {
      ecosystem: "Monad",
      score: headlines.length > 0 ? 95 : 0,
      summary:
        headlines.length > 0
          ? `Collected ${headlines.length} official Monad updates.`
          : "No recent Monad updates.",
      headlines,
      builderUpdates: [],
      opportunities: [],
    };
  } catch (error) {
    console.error("Monad source failed:", error);

    return {
      ecosystem: "Monad",
      score: 0,
      summary: "Unable to load Monad news.",
      headlines: [],
      builderUpdates: [],
      opportunities: [],
    };
  }
}