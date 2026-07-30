import * as cheerio from "cheerio";

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

export function absoluteUrl(base: string, href?: string) {
  if (!href) return "";

  try {
    return new URL(href, base).toString();
  } catch {
    return href;
  }
}

export function extractArticles(
  html: string,
  selectors: string[]
): cheerio.Cheerio<any> {
  const $ = cheerio.load(html);

  for (const selector of selectors) {
    const found = $(selector);

    if (found.length) {
      return found;
    }
  }

  return cheerio.load("<div></div>")("div");
}