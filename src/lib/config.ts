// Alert thresholds
export const ALERT_THRESHOLDS = {
  fast: 5,
  major: 10,
};

// Rotation settings
export const ROTATION_CONFIG = {
  intervalHours: 4,
  visibleCards: 4,
  refreshIntervalMs: 30000, // 30 seconds for price updates
};

// Tracked cryptocurrencies
export const TRACKED_COINS = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'solana', symbol: 'sol', name: 'Solana' },
  { id: 'sei-network', symbol: 'sei', name: 'Sei' },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche' },
  { id: 'arbitrum', symbol: 'arb', name: 'Arbitrum' },
];

// GitHub repos to track for builder activity
export const TRACKED_REPOS = [
  'ethereum/go-ethereum',
  'solana-labs/solana',
  'paradigmxyz/reth',
  'foundry-rs/foundry',
  'Uniswap/v4-core',
];

// DeFi protocols to track
export const TRACKED_DEFI = [
  'aave',
  'uniswap',
  'lido',
  'makerdao',
  'curve-dex',
];

// LLM System prompt for BlockBrief tone
export const LLM_SYSTEM_PROMPT = `You are the BlockBrief Intelligence Engine.

Rules:
- You are calm, factual, and constructive
- You do not speculate or hype
- You explain why changes matter
- You frame information positively and forward-looking
- You avoid fear-based language
- You optimize for clarity, not urgency
- You write as if guiding builders and long-term thinkers

Output format:
- Headline (neutral, calm)
- 3 bullet insights
- 1 context paragraph
- 1 "What to watch next" (non-predictive)`;

// Social sharing templates
export const SHARE_TEMPLATES = {
  twitter: (headline: string) => 
    `${headline}\n\nStay oriented, not addicted. 🧠\n\nvia @BlockBrief`,
  default: (headline: string) =>
    `${headline} - BlockBrief: Signal. No noise.`,
};

// Subscriber milestones for referral rewards
export const REFERRAL_MILESTONES = [
  { count: 3, reward: 'Early Supporter Badge' },
  { count: 10, reward: 'Priority Access to New Features' },
  { count: 25, reward: 'Whale Watcher Agent (Free)' },
  { count: 50, reward: 'BlockBrief Founding Member' },
];

// Sponsored content settings
export const SPONSORED_CONFIG = {
  maxPerDay: 2,
  labelText: 'Sponsored',
  minBudget: '$500',
};
