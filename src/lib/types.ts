// Core segment types for The Current
export type Segment =
  | 'market_pulse'
  | 'capital_flow'
  | 'builder_activity'
  | 'context'
  | 'positive_signal'
  | 'thailand_pulse'
  | 'pattaya_signal'
  | 'asia_flow'
  | 'tourist_alert';

export interface Insight {
  id: string;
  segment: Segment;
  headline: string;
  bullets: string[];
  context: string;
  watchNext: string;
  timestamp: Date;
  sources: string[];
  isSponsored: boolean;
  sponsorName?: string;
  sponsorLogo?: string;

  // Optional regional intelligence fields
  region?: 'global' | 'thailand' | 'pattaya' | 'asia';
  audience?: 'traders' | 'tourists' | 'expats' | 'builders' | 'businesses' | 'general';
  language?: 'en' | 'th' | 'zh' | 'ko' | 'hi' | 'ar' | 'ru' | 'de' | 'fr' | 'es';
  signalStrength?: number; // 0–100
  tags?: string[];
}

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export interface WhaleMove {
  id: string;
  type: 'transfer' | 'exchange_inflow' | 'exchange_outflow';
  amount: number;
  symbol: string;
  from: string;
  to: string;
  timestamp: Date;
  usdValue: number;
}

export interface BuilderActivity {
  repo: string;
  commits: number;
  contributors: number;
  stars: number;
  lastActivity: Date;
  description: string;
}

export interface DefiData {
  protocol: string;
  tvl: number;
  change24h: number;
  chain: string;
}

export interface RegionalSignal {
  id: string;
  region: 'global' | 'thailand' | 'pattaya' | 'asia';
  category:
    | 'regulation'
    | 'payments'
    | 'exchange'
    | 'tourism'
    | 'adoption'
    | 'event'
    | 'scam_alert'
    | 'business'
    | 'builder'
    | 'market';
  title: string;
  summary: string;
  sourceUrl?: string;
  sourceName?: string;
  observedAt: Date;
  confidence: number; // 0–100
  tags: string[];
}

export interface LocalGuide {
  id: string;
  title: string;
  slug: string;
  region: 'thailand' | 'pattaya' | 'asia';
  audience: 'tourists' | 'expats' | 'traders' | 'builders' | 'businesses' | 'general';
  summary: string;
  sections: {
    heading: string;
    body: string;
  }[];
  lastUpdated: Date;
  tags: string[];
}

export interface Subscriber {
  email: string;
  subscribedAt: Date;
  referralCode: string;
  referredBy?: string;
}

export interface SponsoredContent {
  id: string;
  sponsor: string;
  sponsorLogo?: string;
  title: string;
  content: string;
  cta: string;
  ctaUrl: string;
  startDate: Date;
  endDate: Date;
  impressions: number;
  clicks: number;
  isActive: boolean;
}

export interface AdvertiserInquiry {
  company: string;
  email: string;
  budget: string;
  message: string;
  submittedAt: Date;
}

// API response types
export interface PriceData {
  usd: number;
  usd_24h_change: number;
  usd_24h_vol?: number;
  usd_market_cap?: number;
}

export type PricesResponse = { [key: string]: PriceData };

// Segment configuration
export const SEGMENT_CONFIG: Record<Segment, { icon: string; label: string; color: string }> = {
  market_pulse: { icon: '🌱', label: 'Market Pulse', color: 'emerald' },
  capital_flow: { icon: '🐋', label: 'Capital Flow', color: 'blue' },
  builder_activity: { icon: '🧑‍💻', label: 'Builder Activity', color: 'purple' },
  context: { icon: '🧠', label: 'Context Layer', color: 'amber' },
  positive_signal: { icon: '🌤️', label: 'Positive Signal', color: 'green' },
  thailand_pulse: { icon: '🇹🇭', label: 'Thailand Pulse', color: 'red' },
  pattaya_signal: { icon: '🌴', label: 'Pattaya Signal', color: 'cyan' },
  asia_flow: { icon: '🌏', label: 'Asia Flow', color: 'indigo' },
  tourist_alert: { icon: '🧭', label: 'Tourist Alert', color: 'orange' },
};
