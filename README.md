# BlockBrief

**BlockBrief** is a builder-first crypto intelligence app that turns the entire market firehose into a few high-signal views — Daily Briefs, Signals, Market Intel, and Dashboards.

Live site: **https://blockbrief.io**

> No noise. No drama. Just builder-first signal.

---

## 🌐 What BlockBrief Does

BlockBrief exists for people who actually build, trade, or invest — but don’t want to waste 8 hours a day doomscrolling.

The app focuses on three core questions:

1. **What actually changed since yesterday?**  
2. **Where are builders, liquidity, and narratives moving?**  
3. **What’s worth paying attention to — and what isn’t?**

---

## 📚 Current Pages (v1)

### `/` – Home

- Hero: **Crypto News, Alpha & Insights from Builders Worldwide**
- Email capture (“Notify Me”) – wired to a backend POST API
- **Live Market Snapshot**  
  - BTC / ETH / SOL price & 24h change  
  - Powered by CoinGecko simple price API  
  - Auto-refreshes every ~60s
- “Signal > Noise” feature cards
- Simple footer with BlockBrief mission line

### `/signals`

- “Early Signals from Real Builders & Real Flows”
- Fetches data from `/api/signals`
- Displays Signal cards with:
  - Chain
  - Title
  - Confidence (low/medium/high)
  - 24h change summary
  - Time + source
- Currently backed by a **mocked feed**, but API structure is ready for real on-chain & liquidity data.

### `/daily-briefs`

- Hero: “Today’s Daily Briefs”
- Email capture (join the Brief mailing list)
- Card grid with static example briefs:
  - Solana builder heat
  - Ethereum infra insights
  - Bitcoin market structure
  - Rotating narratives
- Footer CTA linking to Signals.

### `/market-intel`

- Hero: “A Builder-Weighted View of the Crypto Market”
- Top row cards for:
  - Macro regime
  - Flows & liquidity
  - Narrative stack
- 2x2 grid describing how BlockBrief frames:
  - BTC as structural anchor
  - ETH as execution/rollup plane
  - SOL as high-velocity ecosystem
  - Alt/Narrative baskets
- CTA row linking back to Signals + Daily Briefs.

### `/dashboards`

- “Alpha Dashboards” skeleton page
- Cards for:
  - Builder Flows
  - Whale Watch
  - Cross-Chain Heatmap
- Lower “Coming Online” panels that describe future visualizations:
  - Chain rotation monitor
  - Narrative heat timeline
  - Perp & volatility monitor
  - Builder & fund alignment.

### `/about`

- Founder’s Note / Story
- Why BlockBrief exists
- Mission in one line
- Principles:
  - Builders > influencers
  - Signal > speed
  - On-chain data > vibes
- Promise to users:
  - Don’t waste your time.
  - Don’t lie.
  - Don’t pretend to know the future.
  - Do show what builders + markets are actually doing.
- Personal note from the founder.

---

## 🧠 Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Icons:** lucide-react
- **Data:**
  - Live market strip → Coingecko `/simple/price` endpoint
  - Signals API → currently mocked, structured for future real feeds

---

## 🔌 API Routes

### `POST /api/subscribe`

Handles email capture from the homepage hero form.

- Expects JSON:
  ```json
  { "email": "you@wallet.com" }
