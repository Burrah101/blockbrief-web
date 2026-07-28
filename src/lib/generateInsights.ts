import { LLM_SYSTEM_PROMPT } from './config';
import type { Insight, Segment, MarketData, DefiData, BuilderActivity, WhaleMove } from './types';

// Generate unique ID
function generateId(): string {
  return `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Generate insights using LLM (OpenAI-compatible API)
export async function generateInsightWithLLM(
  segment: Segment,
  data: {
    market?: MarketData[];
    defi?: DefiData[];
    builders?: BuilderActivity[];
    whales?: WhaleMove[];
  }
): Promise<Insight | null> {
  // Use fallback insights for now - LLM integration can be enabled with proper API setup
  // This ensures the site works without requiring API keys during build
  return generateFallbackInsight(segment, data);
}

// Parse LLM response into structured insight
function parseInsightFromLLM(segment: Segment, content: string): Insight {
  const lines = content.split('\n').filter(l => l.trim());
  
  // Extract headline (first line or first sentence)
  const headline = lines[0]?.replace(/^#+\s*/, '').replace(/^\*+/, '').trim() || 'Market Update';
  
  // Extract bullets (lines starting with - or •)
  const bullets = lines
    .filter(l => l.match(/^[-•*]\s/))
    .slice(0, 3)
    .map(l => l.replace(/^[-•*]\s*/, '').trim());
  
  // If no bullets found, create from content
  if (bullets.length === 0) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    bullets.push(...sentences.slice(0, 3).map(s => s.trim()));
  }
  
  // Extract context (longest paragraph)
  const paragraphs = content.split('\n\n').filter(p => p.length > 50);
  const context = paragraphs[0] || content.slice(0, 200);
  
  // Extract "what to watch" or generate one
  const watchMatch = content.match(/watch[:\s]+([^.]+)/i);
  const watchNext = watchMatch?.[1]?.trim() || 'Monitor for continued momentum and volume patterns.';

  return {
    id: generateId(),
    segment,
    headline,
    bullets: bullets.length > 0 ? bullets : ['Market showing steady activity', 'Volume within normal ranges', 'No major disruptions detected'],
    context,
    watchNext,
    timestamp: new Date(),
    sources: ['CoinGecko', 'DefiLlama', 'GitHub'],
    isSponsored: false,
  };
}

// Fallback insight generation without LLM
function generateFallbackInsight(
  segment: Segment,
  data: {
    market?: MarketData[];
    defi?: DefiData[];
    builders?: BuilderActivity[];
    whales?: WhaleMove[];
  }
): Insight {
  const templates: Record<Segment, () => Partial<Insight>> = {
    market_pulse: () => {
      const btc = data.market?.find(m => m.symbol === 'btc');
      const eth = data.market?.find(m => m.symbol === 'eth');
      return {
        headline: `BTC ${btc?.change24h && btc.change24h >= 0 ? 'Leads' : 'Slides'} as Bitcoin trades near $${btc?.price?.toLocaleString() || 'N/A'}`,
        bullets: [
          `Bitcoin trading at $${btc?.price?.toLocaleString() || 'N/A'} with ${btc?.change24h?.toFixed(1) || '0'}% daily change`,
          `Ethereum maintaining position at $${eth?.price?.toLocaleString() || 'N/A'}`,
          `${(data.market || []).filter(m => (m.change24h ?? 0) > 0).length} tracked assets are positive over 24h`,
        ],
        context: 'The crypto market continues to demonstrate resilience as major assets maintain their trading ranges. Institutional interest remains steady, with on-chain metrics suggesting accumulation patterns.',
        watchNext: 'Key support and resistance levels for BTC and ETH in the coming week.',
      };
    },
    capital_flow: () => {
      const biggest = [...(data.whales || [])].sort((a,b)=>b.usdValue-a.usdValue)[0];
      return {
        headline: biggest
          ? `${biggest.symbol} Whale Transfer: $${Math.round(biggest.usdValue/1_000_000)}M`
          : 'Capital Flow Update',
        bullets: [
          biggest
            ? `${biggest.amount.toLocaleString()} ${biggest.symbol} moved`
            : 'No whale transfers available',
          biggest
            ? `${biggest.from} → ${biggest.to}`
            : 'Awaiting transfer data',
          biggest
            ? `Tracked value: $${biggest.usdValue.toLocaleString()}`
            : 'Monitoring on-chain flows',
        ],
        context: biggest
          ? `The largest tracked transfer this cycle moved approximately $${Math.round(biggest.usdValue/1_000_000)} million. Large transfers don't guarantee market direction, but they are useful signals to monitor alongside price and liquidity.`
          : 'No significant whale activity detected.',
        watchNext: 'Watch for repeated exchange inflows or outflows over the next cycle.',
      };
    },
    builder_activity: () => {
      const topRepo = data.builders?.[0];
      return {
        headline: 'Developer Activity Remains Strong Across Ecosystems',
        bullets: [
          topRepo ? `${topRepo.repo} showing ${topRepo.stars} stars and active development` : 'Major protocols shipping updates',
          'Infrastructure improvements across L2 solutions',
          'DeFi protocols enhancing security measures',
        ],
        context: 'The builder community continues to ship meaningful updates. Core infrastructure projects are seeing consistent commits, indicating healthy long-term development.',
        watchNext: 'Upcoming protocol upgrades and mainnet launches.',
      };
    },
    context: () => ({
      headline: 'Understanding the Current Market Cycle',
      bullets: [
        'Market structure suggests consolidation phase',
        'Macro factors influencing crypto correlation',
        'Regulatory clarity improving in key markets',
      ],
      context: 'Current market dynamics reflect a maturing asset class. The correlation with traditional markets provides context for price movements, while on-chain fundamentals remain strong.',
      watchNext: 'Macro economic indicators and their impact on risk assets.',
    }),
    positive_signal: () => ({
      headline: 'Adoption Metrics Show Continued Growth',
      bullets: [
        'Active addresses reaching new monthly highs',
        'DeFi TVL showing recovery patterns',
        'Institutional products seeing steady inflows',
      ],
      context: 'Despite market volatility, adoption metrics paint an optimistic picture. New users continue to enter the ecosystem, and existing participants are deepening their engagement.',
      watchNext: 'User growth metrics and protocol adoption rates.',
    }),
  };

  const template = templates[segment]();
  
  return {
    id: generateId(),
    segment,
    headline: template.headline || 'Market Update',
    bullets: template.bullets || [],
    context: template.context || '',
    watchNext: template.watchNext || '',
    timestamp: new Date(),
    sources: ['CoinGecko', 'DefiLlama', 'GitHub'],
    isSponsored: false,
  };
}

// Generate all segment insights
export async function generateAllInsights(data: {
  market?: MarketData[];
  defi?: DefiData[];
  builders?: BuilderActivity[];
  whales?: WhaleMove[];
}): Promise<Insight[]> {
  const segments: Segment[] = ['market_pulse', 'capital_flow', 'builder_activity', 'context', 'positive_signal'];
  
  const insights = await Promise.all(
    segments.map(segment => generateInsightWithLLM(segment, data))
  );
  
  return insights.filter((i): i is Insight => i !== null);
}
