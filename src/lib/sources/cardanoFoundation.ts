import { EcosystemNews, Headline } from "./types";
import { cleanText, absoluteUrl } from "./parsers/html";
import * as cheerio from "cheerio";

const NEWS_URL = "https://cardano.org/news";

export async function getCardanoFoundationNews(): Promise<EcosystemNews> {
  try {
    const response = await fetch(NEWS_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "BlockBrief/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Cardano News request failed: ${response.status}`);
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    const headlines: Headline[] = [];

    const selectors = [
      "article",
      ".news-card",
      ".post-card",
      ".card",
      "[class*=news]",
      "[class*=article]",
    ];

    for (const selector of selectors) {
      const cards = $(selector);

      if (!cards.length) continue;

      cards.each((_, element) => {
        if (headlines.length >= 8) return false;

        const title =
          cleanText(
            $(element)
              .find("h1,h2,h3,h4,a")
              .first()
              .text()
          ) || "";

        if (!title || title.length < 8) return;

        const href =
          $(element).find("a").first().attr("href") ?? "";

        const summary = cleanText(
          $(element)
            .find("p")
            .first()
            .text()
        );

        const date =
          $(element).find("time").attr("datetime") ??
          $(element).find("time").text() ??
          "";

        headlines.push({
          title,
          summary,
          url: absoluteUrl(NEWS_URL, href),
          source: "Cardano Foundation",
          publishedAt: date,
          importance: 90,
        });
      });

      if (headlines.length) break;
    }

    console.log(`Cardano: collected ${headlines.length} headlines`);

    return {
      ecosystem: "Cardano",
      score: headlines.length ? 90 : 0,
      summary:
        headlines.length > 0
          ? "Cardano builder activity remains steady with continued infrastructure development."
          : "No recent Cardano updates.",
      headlines,
      builderUpdates: [],
      opportunities: [],
    };
  } catch (error) {
    console.error("Cardano parser failed:", error);

    return {
      ecosystem: "Cardano",
      score: 0,
      summary: "Unable to load Cardano news.",
      headlines: [],
      builderUpdates: [],
      opportunities: [],
    };
  }
}