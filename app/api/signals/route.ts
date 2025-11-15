// src/app/api/signals/route.ts
import { NextResponse } from "next/server";

type Signal = {
  id: string;
  title: string;
  chain: string;
  type: "narrative" | "flow" | "builder" | "volatility";
  confidence: "low" | "medium" | "high";
  change24h: string;
  summary: string;
  timeAgo: string;
  source: string;
};

const MOCK_SIGNALS: Signal[] = [
  {
    id: "sol-builder-heat",
    title: "Solana builder heat picking up again",
    chain: "Solana",
    type: "builder",
    confidence: "high",
    change24h: "+13% dev commits",
    summary:
      "Multiple new infra repos shipped, validator upgrades pushed, and two new tools moved to mainnet. Activity suggests continued conviction from core teams.",
    timeAgo: "2h ago",
    source: "Solana GitHub + ecosystem trackers",
  },
  {
    id: "eth-rollup-infra",
    title: "ETH rollup infra quietly improving UX",
    chain: "Ethereum / L2s",
    type: "narrative",
    confidence: "medium",
    change24h: "-8% avg L2 fees",
    summary:
      "Several rollups deployed prover and RPC improvements, with fees dropping modestly. Not a hype spike, but a steady builder trend worth watching.",
    timeAgo: "6h ago",
    source: "L2Beat + team announcements",
  },
  {
    id: "btc-vol-compression",
    title: "BTC volatility compression ahead of event",
    chain: "Bitcoin",
    type: "volatility",
    confidence: "medium",
    change24h: "Realized vol near local lows",
    summary:
      "Options markets show tightening ranges, with perp funding flat. Historically, similar patterns precede sharp directional moves within a few days.",
    timeAgo: "10h ago",
    source: "Perp funding + options OI",
  },
  {
    id: "ai-narrative-rotation",
    title: "AI + Agents narrative still in rotation",
    chain: "Cross-chain",
    type: "narrative",
    confidence: "high",
    change24h: "Social + dev mentions elevated",
    summary:
      "AI + agent frameworks continue to see both attention and real integration. Builders are experimenting across infra, bots, and UX layers.",
    timeAgo: "1d ago",
    source: "Social + repo activity blend",
  },
  {
    id: "rwa-cooling",
    title: "RWAs cooling vs. infra and L2s",
    chain: "Cross-chain",
    type: "flow",
    confidence: "low",
    change24h: "-12% volume vs last week",
    summary:
      "RWA tokens show declining relative volume and fewer new launches. Capital seems to be rotating back into infra, L2 scaling, and base layer plays.",
    timeAgo: "1d ago",
    source: "DEX/CEX volumes sample",
  },
];

export async function GET() {
  // In future: replace MOCK_SIGNALS with real API calls & data.
  return NextResponse.json({
    ok: true,
    asOf: new Date().toISOString(),
    signals: MOCK_SIGNALS,
  });
}
