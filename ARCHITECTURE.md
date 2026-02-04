# BlockBrief Hybrid Platform Architecture

## Vision: Signal-Driven Crypto Intelligence with Sustainable Monetization

BlockBrief transforms from a basic price tracker to a **hybrid intelligence platform** that:
- Delivers calm, factual crypto insights every 4 hours
- Monetizes through sponsored content without compromising trust
- Scales free subscribers through viral mechanics and SEO

---

## Core Architecture

### 1. The Current (Homepage Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│                    BLOCKBRIEF - THE CURRENT                 │
│                   Last updated: 4 hours ago                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Market Pulse│  │ Capital Flow│  │ Builder     │         │
│  │ (Active)    │  │             │  │ Activity    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              FEATURED INSIGHT CARD                   │   │
│  │  LLM-generated analysis with context                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Card 1   │ │ Card 2   │ │ Card 3   │ │ Card 4   │       │
│  │ Rotating │ │ Rotating │ │ Rotating │ │ Rotating │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           📧 Subscribe for Daily Digest              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2. Data Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA SOURCES (Phase 1)                   │
├─────────────────────────────────────────────────────────────┤
│  CoinGecko    │  GitHub API   │  DefiLlama   │  Whale Alert │
│  (Prices)     │  (Dev Activity)│  (TVL Data)  │  (Whale Moves)│
└───────┬───────┴───────┬───────┴───────┬──────┴───────┬──────┘
        │               │               │              │
        └───────────────┴───────────────┴──────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   DATA NORMALIZER     │
                    │   (API Routes)        │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   LLM PROCESSOR       │
                    │   (OpenAI/Gemini)     │
                    │   - Summarize         │
                    │   - Apply tone        │
                    │   - Generate insights │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   CONTENT STORE       │
                    │   (JSON/LocalStorage) │
                    └───────────────────────┘
```

### 3. Monetization Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  REVENUE STREAMS                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ SPONSORED       │  │ PREMIUM AGENTS  │                  │
│  │ ARTICLES        │  │ (Future)        │                  │
│  │                 │  │                 │                  │
│  │ • Clearly       │  │ • Whale Watcher │                  │
│  │   labeled       │  │ • Alpha Scanner │                  │
│  │ • Native format │  │ • Portfolio     │                  │
│  │ • Trust-first   │  │   Tracker       │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ADVERTISER FLOW                         │   │
│  │  Contact Form → Review → Publish → Track            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## New Page Structure

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | The Current - Living Dashboard | NEW |
| `/insights` | Archive of past insights | NEW |
| `/sponsored` | Sponsored content section | NEW |
| `/brief` | Live market data | ENHANCED |
| `/alerts` | Movement radar | ENHANCED |
| `/agents` | AI agents marketplace | ENHANCED |
| `/subscribe` | Email subscription | NEW |
| `/advertise` | Sponsor submission | NEW |
| `/about` | About page | ENHANCED |

---

## Component Architecture

### New Components
```
src/
├── components/
│   ├── TheCurrent/
│   │   ├── CurrentDashboard.tsx    # Main rotating dashboard
│   │   ├── InsightCard.tsx         # Individual insight cards
│   │   ├── SegmentNav.tsx          # Market Pulse, Capital Flow, etc.
│   │   └── RotationTimer.tsx       # Shows time until next refresh
│   │
│   ├── Sponsored/
│   │   ├── SponsoredBadge.tsx      # Clear "Sponsored" label
│   │   ├── SponsoredCard.tsx       # Sponsored content card
│   │   └── AdvertiseForm.tsx       # Advertiser contact form
│   │
│   ├── Subscribe/
│   │   ├── EmailCapture.tsx        # Email subscription form
│   │   ├── SocialProof.tsx         # Subscriber count display
│   │   └── ShareWidget.tsx         # Social sharing buttons
│   │
│   ├── Insights/
│   │   ├── InsightFeed.tsx         # Historical insights
│   │   └── InsightDetail.tsx       # Single insight view
│   │
│   └── common/
│       ├── BriefCard.tsx           # Enhanced card component
│       ├── DataBadge.tsx           # Data source indicator
│       └── LoadingPulse.tsx        # Loading animation
```

---

## Data Types

```typescript
// Core insight type
interface Insight {
  id: string;
  segment: 'market_pulse' | 'capital_flow' | 'builder_activity' | 'context' | 'positive_signal';
  headline: string;
  bullets: string[];
  context: string;
  watchNext: string;
  timestamp: Date;
  sources: string[];
  isSponsored: boolean;
  sponsorName?: string;
}

// Subscriber type
interface Subscriber {
  email: string;
  subscribedAt: Date;
  referralCode: string;
  referredBy?: string;
}

// Sponsored content type
interface SponsoredContent {
  id: string;
  sponsor: string;
  title: string;
  content: string;
  cta: string;
  ctaUrl: string;
  startDate: Date;
  endDate: Date;
  impressions: number;
  clicks: number;
}
```

---

## Growth Mechanics

### 1. Viral Referral System
- Each subscriber gets unique referral code
- Track referrals in localStorage (MVP)
- Display referral leaderboard
- Unlock premium features at milestones

### 2. Social Sharing
- One-click share to Twitter/X
- Pre-formatted insight snippets
- "Shared from BlockBrief" branding

### 3. SEO Optimization
- Dynamic meta tags per insight
- Structured data for Google
- Shareable insight URLs

### 4. Email Capture Optimization
- Exit-intent popup
- Inline subscription forms
- Value proposition clarity

---

## Implementation Priority

### Phase 1: Core Platform (This Session)
1. ✅ Rotating "The Current" homepage
2. ✅ Multiple data source integration
3. ✅ LLM-powered content generation
4. ✅ Native email subscription

### Phase 2: Monetization (This Session)
1. ✅ Sponsored content section
2. ✅ Advertiser contact form
3. ✅ Clear sponsored labeling

### Phase 3: Growth (This Session)
1. ✅ Share widgets
2. ✅ Social proof elements
3. ✅ Referral code system

### Phase 4: Future Enhancements
- Database integration (Supabase)
- User authentication
- Premium tier
- Analytics dashboard
