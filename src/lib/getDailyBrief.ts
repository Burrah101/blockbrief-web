import {
  getMarketData,
  getBuilderActivity,
  getDefiData,
  getWhaleActivity,
} from "./fetchData";

import { calculateMarketScore } from "./marketScore";
import { generateDailyBrief } from "./briefEngine";

export async function getDailyBrief() {
  const [market, builders, defi, whales] = await Promise.all([
    getMarketData(),
    getBuilderActivity(),
    getDefiData(),
    getWhaleActivity(),
  ]);

  const score = calculateMarketScore({
    market,
    builders,
    defi,
    whales,
  });

  const brief = generateDailyBrief(
    score,
    market,
    builders,
    defi,
    whales
  );

  return {
    score,
    brief,
    market,
    builders,
    defi,
    whales,
  };
}