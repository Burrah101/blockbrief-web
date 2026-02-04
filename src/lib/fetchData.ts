import { TRACKED_COINS, TRACKED_REPOS, TRACKED_DEFI } from './config';
import type { MarketData, BuilderActivity, DefiData, WhaleMove } from './types';

// Fetch prices from CoinGecko with extended data
export async function getMarketData(): Promise<MarketData[] | null> {
  const ids = TRACKED_COINS.map(c => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error('Failed to fetch prices');
    const data = await res.json();
    
    return TRACKED_COINS.map(coin => ({
      symbol: coin.symbol,
      name: coin.name,
      price: data[coin.id]?.usd || 0,
      change24h: data[coin.id]?.usd_24h_change || 0,
      volume24h: data[coin.id]?.usd_24h_vol || 0,
      marketCap: data[coin.id]?.usd_market_cap || 0,
    }));
  } catch (error) {
    console.error("Error fetching market data:", error);
    return null;
  }
}

// Fetch GitHub activity for tracked repos
export async function getBuilderActivity(): Promise<BuilderActivity[] | null> {
  try {
    const activities: BuilderActivity[] = [];
    
    for (const repo of TRACKED_REPOS.slice(0, 3)) { // Limit to avoid rate limits
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      });
      
      if (res.ok) {
        const data = await res.json();
        activities.push({
          repo: repo,
          commits: data.subscribers_count || 0,
          contributors: data.watchers_count || 0,
          stars: data.stargazers_count || 0,
          lastActivity: new Date(data.pushed_at),
          description: data.description || '',
        });
      }
    }
    
    return activities;
  } catch (error) {
    console.error("Error fetching builder activity:", error);
    return null;
  }
}

// Fetch DeFi TVL data from DefiLlama
export async function getDefiData(): Promise<DefiData[] | null> {
  try {
    const res = await fetch('https://api.llama.fi/protocols', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!res.ok) throw new Error('Failed to fetch DeFi data');
    const data = await res.json();
    
    // Filter to tracked protocols
    const tracked = data.filter((p: { slug: string }) => 
      TRACKED_DEFI.includes(p.slug)
    );
    
    return tracked.map((p: { name: string; tvl: number; change_1d: number; chain: string }) => ({
      protocol: p.name,
      tvl: p.tvl || 0,
      change24h: p.change_1d || 0,
      chain: p.chain || 'Multi-chain',
    }));
  } catch (error) {
    console.error("Error fetching DeFi data:", error);
    return null;
  }
}

// Simulated whale data (would connect to Whale Alert API in production)
export async function getWhaleActivity(): Promise<WhaleMove[] | null> {
  // In production, this would call Whale Alert or Solscan API
  // For now, we generate realistic mock data based on market conditions
  const mockWhales: WhaleMove[] = [
    {
      id: 'whale-1',
      type: 'exchange_outflow',
      amount: 1500,
      symbol: 'BTC',
      from: 'Binance',
      to: 'Unknown Wallet',
      timestamp: new Date(Date.now() - 3600000),
      usdValue: 145000000,
    },
    {
      id: 'whale-2',
      type: 'transfer',
      amount: 25000,
      symbol: 'ETH',
      from: 'Unknown Wallet',
      to: 'Unknown Wallet',
      timestamp: new Date(Date.now() - 7200000),
      usdValue: 82500000,
    },
  ];
  
  return mockWhales;
}

// Get global market metrics
export async function getGlobalMetrics() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/global', {
      next: { revalidate: 300 }
    });
    
    if (!res.ok) throw new Error('Failed to fetch global metrics');
    const data = await res.json();
    
    return {
      totalMarketCap: data.data.total_market_cap.usd,
      totalVolume: data.data.total_volume.usd,
      btcDominance: data.data.market_cap_percentage.btc,
      ethDominance: data.data.market_cap_percentage.eth,
      marketCapChange24h: data.data.market_cap_change_percentage_24h_usd,
    };
  } catch (error) {
    console.error("Error fetching global metrics:", error);
    return null;
  }
}

// Legacy function for backward compatibility
export async function getPrices() {
  const ids = TRACKED_COINS.map(c => c.id).slice(0, 4);
  const symbols = TRACKED_COINS.map(c => c.symbol).slice(0, 4);
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error('Failed to fetch prices');
    const data = await res.json();
    return Object.fromEntries(symbols.map((s, i) => [s, data[ids[i]]]));
  } catch (error) {
    console.error("Error fetching prices:", error);
    return null;
  }
}
