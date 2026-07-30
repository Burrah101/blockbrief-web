import { EcosystemNews } from "./types";
import { getCardanoFoundationNews } from "./cardanoFoundation";

export async function getCardanoNews(): Promise<EcosystemNews> {
  const foundationHeadlines = await getCardanoFoundationNews();

  return {
    ecosystem: "Cardano",

    score: 90,

    summary:
      "Cardano builder activity remains steady with continued infrastructure development.",

    headlines: foundationHeadlines,

    builderUpdates: [],

    opportunities: [],
  };
}