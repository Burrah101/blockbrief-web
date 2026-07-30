import { Headline } from "./types";
import { XMLParser } from "fast-xml-parser";

export async function getCardanoFoundationNews(): Promise<Headline[]> {
  try {
    const response = await fetch(
      "https://cardano.org/rss.xml",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`RSS request failed: ${response.status}`);
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });

    const feed = parser.parse(xml);

    const items = feed?.rss?.channel?.item ?? [];

    return items.slice(0, 8).map((item: any) => ({
      title: item.title ?? "",
      summary:
        item.description
          ?.replace(/<[^>]+>/g, "")
          ?.substring(0, 220) ?? "",
      url: item.link ?? "",
      source: "Cardano",
      publishedAt: item.pubDate ?? "",
      importance: 90,
    }));
  } catch (error) {
    console.error("Cardano RSS failed:", error);
    return [];
  }
}