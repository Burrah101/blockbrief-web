import Parser from "rss-parser";
import { MacroEvent } from "./types";

const parser = new Parser();

export async function getMacroEvents(): Promise<MacroEvent[]> {
  try {
    const feeds = [
      "https://www.federalreserve.gov/feeds/press_all.xml",
      "https://www.imf.org/en/News/RSS",
      "https://www.ecb.europa.eu/rss/press.html"
    ];

    const events: MacroEvent[] = [];

    for (const url of feeds) {
      try {
        const feed = await parser.parseURL(url);

        feed.items.slice(0, 3).forEach((item) => {
          events.push({
            title: item.title ?? "Untitled",
            summary:
              item.contentSnippet ??
              item.content ??
              item.title ??
              "",
            url: item.link ?? "",
            source: feed.title ?? "Macro",
            publishedAt: item.pubDate ?? new Date().toISOString(),
          });
        });
      } catch (err) {
        console.error(`Failed to load ${url}`, err);
      }
    }

    return events
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      )
      .slice(0, 10);
  } catch (error) {
    console.error("Macro:", error);
    return [];
  }
}