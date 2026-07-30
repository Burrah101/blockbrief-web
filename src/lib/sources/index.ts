import { NewsletterData } from "./types";

import { getCardanoFoundationNews } from "./cardanoFoundation";
import { getEthereumNews } from "./ethereum";
import { getMonadNews } from "./monad";

import { getBuilderOpportunities } from "./builderOpportunities";
import { getMacroEvents } from "./macro";

export async function getDailySources(): Promise<NewsletterData> {
  const [
    cardano,
    ethereum,
    monad,
    builderOpportunities,
    macro,
  ] = await Promise.all([
    getCardanoFoundationNews(),
    getEthereumNews(),
    getMonadNews(),
    getBuilderOpportunities(),
    getMacroEvents(),
  ]);

  return {
    generatedAt: new Date().toISOString(),

    marketPulse: "Neutral",

    ecosystems: [
      cardano,
      ethereum,
      monad,
    ],

    builderOpportunities,

    macro,
  };
}