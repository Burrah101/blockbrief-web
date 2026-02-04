# BlockBrief - Signal. No noise.

A signal-driven crypto intelligence platform that helps people stay oriented, not addicted.

## 🚀 Live Preview

The development server is running at: https://3000-itg5jho7hakbu686vad15-befe61b3.sg1.manus.computer

## 🧠 What is BlockBrief?

BlockBrief is a **hybrid crypto intelligence platform** that:
- Auto-publishes calm, factual insights every 4 hours
- Surfaces what matters now through rotating segments
- Monetizes through sponsored content without compromising trust
- Scales free subscribers through viral referral mechanics

### What BlockBrief Is
- ✅ Auto-published intelligence every 4 hours
- ✅ Rotating insights that surface what matters now
- ✅ Calm, factual, and constructive analysis
- ✅ Built for builders and long-term thinkers

### What BlockBrief Is NOT
- ❌ Not a news clone or aggregator
- ❌ Not a trading signals group
- ❌ Not alpha bait or pump content
- ❌ Not "breaking news panic"

## 📊 Features

### The Current (Homepage Dashboard)
A living dashboard refreshed every 4 hours with rotating segments:
- 🌱 **Market Pulse** - Macro trends and chain health
- 🐋 **Capital Flow** - Whale movements and liquidity shifts
- 🧑‍💻 **Builder Activity** - Developer shipping and repo activity
- 🧠 **Context Layer** - Why changes matter
- 🌤️ **Positive Signal** - Growth, adoption, and resilience

### Data Sources
- **CoinGecko** - Price, volume, market cap data
- **GitHub API** - Developer activity tracking
- **DefiLlama** - TVL and DeFi metrics
- **Whale Alert** - Large transaction monitoring (simulated)

### Monetization
- **Sponsored Articles** - Clearly labeled native content
- **Advertiser Portal** - Easy sponsor onboarding
- **Premium Agents** - Unlockable via referrals

### Growth Mechanics
- **Referral System** - Unique codes with milestone rewards
- **Social Sharing** - One-click Twitter/LinkedIn sharing
- **Email Subscription** - Native capture (replaces Substack)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Dates**: date-fns
- **AI**: OpenAI-compatible API (optional)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage with The Current
│   ├── brief/page.tsx        # Live market data
│   ├── alerts/page.tsx       # Movement radar
│   ├── agents/page.tsx       # AI agents marketplace
│   ├── sponsored/page.tsx    # Sponsored content
│   ├── advertise/page.tsx    # Advertiser portal
│   ├── subscribe/page.tsx    # Subscription page
│   ├── about/page.tsx        # About page
│   └── api/
│       ├── prices/route.ts   # Market data API
│       ├── insights/route.ts # Insights generation API
│       ├── subscribe/route.ts # Subscription API
│       └── advertise/route.ts # Advertiser inquiry API
├── components/
│   ├── TheCurrent/           # Dashboard components
│   ├── Sponsored/            # Sponsored content components
│   ├── Subscribe/            # Subscription & growth components
│   └── common/               # Shared components
└── lib/
    ├── types.ts              # TypeScript types
    ├── config.ts             # Configuration
    ├── fetchData.ts          # Data fetching utilities
    └── generateInsights.ts   # Insight generation
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy

```bash
# Push changes to GitHub
git add .
git commit -m "BlockBrief v2.0 - Hybrid Platform"
git push origin main
```

### Environment Variables (Optional)

For LLM-powered insights, set:
```
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📈 Monetization Strategy

### Revenue Streams

1. **Sponsored Content** ($500-$5,000/week)
   - Insight cards in The Current
   - Newsletter features
   - Full takeover packages

2. **Premium Agents** (Future)
   - Whale Watcher
   - Alpha Scanner
   - Portfolio Tracker

### Pricing Tiers

| Package | Price | Includes |
|---------|-------|----------|
| Insight Card | $500/week | Featured in The Current |
| Newsletter Feature | $2,000/issue | 50K+ email subscribers |
| Full Takeover | $5,000/week | Homepage + Newsletter + Social |

## 🎯 Growth Strategy

### Referral Milestones

| Referrals | Reward |
|-----------|--------|
| 3 | Early Supporter Badge |
| 10 | Priority Access to New Features |
| 25 | Whale Watcher Agent (Free) |
| 50 | BlockBrief Founding Member |

### Target: 1M+ Free Subscribers

1. **Viral Mechanics** - Referral rewards incentivize sharing
2. **SEO Optimization** - Dynamic meta tags, structured data
3. **Social Proof** - Subscriber counts, testimonials
4. **Quality Content** - Calm, factual, trust-building

## 📝 Future Enhancements

- [ ] Database integration (Supabase)
- [ ] User authentication
- [ ] Premium subscription tier
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Push notifications
- [ ] Telegram bot integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

---

**BlockBrief** - Signal. No noise.

*Built with ❤️ for crypto builders and long-term thinkers*
