import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from "./fetchData";

export async function getCurrentData() {
  const [market, builders, defi, whales] = await Promise.all([
    getMarketData(),
    getBuilderActivity(),
    getDefiData(),
    getWhaleActivity(),
  ]);

  return {
    market,
    builders,
    defi,
    whales,
  };
}