import { EcosystemNews, Headline } from "./types";
import { cleanText, absoluteUrl } from "./parsers/html";
import * as cheerio from "cheerio";

const MONAD_URL = "https://www.monad.xyz/announcements";

export async function getMonadNews(): Promise<EcosystemNews> {
  try {
    const response = await fetch(MONAD_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "BlockBrief/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Monad request failed: ${response.status}`);
    }

    const html = await response.text();

    const $ = cheerio.load(html);

    const headlines: Headline[] = [];

    $("h2, h3").each((_, element) => {
      if (headlines.length >= 8) return false;

      const title = cleanText($(element).text());

      if (!title || title.length < 8) return;

      const parent = $(element).closest("a");

      let href = parent.attr("href");

      if (!href) {
        href = $(element)
          .parent()
          .find("a")
          .first()
          .attr("href");
      }

      headlines.push({
        title,
        summary: "",
        url: absoluteUrl(MONAD_URL, href),
        source: "Monad Foundation",
        publishedAt: "",
        importance: 95,
      });
    });

    console.log(`Monad: collected ${headlines.length} headlines`);

    return {
      ecosystem: "Monad",
      score: headlines.length ? 95 : 0,
      summary: headlines.length
        ? `Collected ${headlines.length} official Monad announcements.`
        : "No recent Monad announcements.",
      headlines,
      builderUpdates: [],
      opportunities: [],
    };
  } catch (error) {
    console.error("Monad parser failed:", error);

    return {
      ecosystem: "Monad",
      score: 0,
      summary: "Unable to load Monad announcements.",
      headlines: [],
      builderUpdates: [],
      opportunities: [],
    };
  }
}