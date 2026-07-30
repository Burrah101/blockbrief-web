import { getCardanoNews } from "./cardano";
import { getEthereumNews } from "./ethereum";
import { getMonadNews } from "./monad";
import { getBuilderOpportunities } from "./builder";
import { getMacroEvents } from "./macro";

export async function getDailySources() {
  const [
    cardano,
    ethereum,
    monad,
    builderOpportunities,
    macro
  ] = await Promise.all([
    getCardanoNews(),
    getEthereumNews(),
    getMonadNews(),
    getBuilderOpportunities(),
    getMacroEvents()
  ]);

  return {
    ecosystems: [
      cardano,
      ethereum,
      monad
    ],
    builderOpportunities,
    macro
  };
}