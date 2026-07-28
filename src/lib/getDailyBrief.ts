import { getCurrentData } from "./getCurrentData";
import { calculateMarketScore } from "./marketScore";
import { generateDailyBrief } from "./briefEngine";

export async function getDailyBrief() {
  const {
    market,
    builders,
    defi,
    whales,
  } = await getCurrentData();

  const marketScore = calculateMarketScore({
    market,
    builders,
    defi,
    whales,
  });

  const dailyBrief = generateDailyBrief(
    marketScore,
    market,
    builders,
    defi,
    whales
  );

  return {
    market,
    builders,
    defi,
    whales,
    marketScore,
    dailyBrief,
  };
}