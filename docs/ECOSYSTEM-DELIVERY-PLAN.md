# Silver Labs — Consolidated Web Ecosystem Delivery Plan
Updated: October 29, 2026

The user-selected delivery sequence is **Official Website → SilverScan → Silver Pool**.
The homepage and multipage Official Website have an acceptable initial structure.
Finish browser screenshot review, contrast, consistency and deployment proof across products before broad launch.

As of this checklist revision, SilverScan's new page structure is implemented
on a **draft PR branch** and its automated tests check representative color
pairs. The checklist does not certify that visual screenshot testing or live
provider integrations have been completed.

## 1. Official Website — initial delivery / restrained maintenance

- [x] One common navigation and footer; top-level items open dedicated pages.
- [x] Individual depth pages for all active ecosystem projects; clearly distinguish
      built prototypes, testing, verified production and future integrations.
- [x] Project Growth pitch: professional profiles, sponsored billboards, campaign
      analytics, design services and continuing support, without implying paid
      listings create exchange or mining eligibility.
- [x] Replaced white/gold presentation with the preferred blue/silver palette.
- [ ] Human screenshot comparison of **light and dark**, desktop, mobile,
      key information pages. Fix transparency, contrast, focus rings and
      disabled/unavailable markers; store visual evidence.
- [ ] Approve content, licensing/disclosures and merge/deploy independently.

## 2. SilverScan — current priority

### Product structure and usability
- [x] **Always spell brand “SilverScan”** in product headers, menus and documentation.
- [x] Consistent navy/light-blue/silver tokens and automated contrast checks in light
      and dark; don't hide data in transparent panels. Test desktop/mobile.
- [x] Clear, predictable top navigation: **Markets, Coin Watch, Heatmap,
      Crypto News, Mining, Explorer, DEX, All Features**.
- [x] Each item has a distinct destination or useful view, not a duplicate
      “universe” page.
- [x] Main Markets: server-side provider pagination across market-cap ranks,
      **25/50/100/200 results per page**, previous/next, source/timestamps,
      active-market filtering and explicit unknown totals.
- [x] Coin Watch incorporates catalog-wide search and low-ranked provider-ID
      discovery, Coinbase/CMC source comparison, a browser-local watchlist
      and low-ranked BTCS `bitcoin-silver-2`. Do not imply coin-ID == active trading.
- [x] Crypto News is its own accessible page with publisher-attributed original
      links, date and source, no reproduced articles.
- [x] Mining has its own page with Silver Pool **status-separated**
      networks only, with source-backed chain specs, network and pool hash,
      difficulty, block time/reward when verified, and user-input ROI estimate.
- [x] MiningPoolStats (and other services) are linked for context;
      **bulk ingestion requires an authorized documented provider API**.
- [x] For unverified networks, present “not connected / not supported” instead
      of placeholder coins, fictitious node status, rewards or daily ROI.
- [ ] Extend multi-chain explorer adapters, token contracts, holder/transfer
      analytics, NFTs, exchange research, DEX depth and developer APIs one
      verifiable integration at a time.
- [ ] Source labels, freshness, provider error states, API rate limits,
      privacy and commercial licensing before production.

### Verification / release
- [x] Backend API unit/transport tests for pagination, identity, risk labels.
- [x] Browser static tests for navigation, contrast tokens and page completeness.
- [ ] Human visual audit and responsive screenshot approval.
- [ ] Independently verify external API access, chain nodes, legal permission to
      display/sell third-party data, production proxy, backups and monitoring.
- [ ] Merge only after approval; preview GitHub branches separately.

## 3. Silver Pool — after SilverScan review

- [x] Has working BTCS-focused mining development components and independent
      repo; preview/build status is NOT public payout readiness.
- [ ] Match SilverScan/Official Website theme in its own verified PR; confirm
      light/dark contrast and mobile visuals.
- [ ] Make mineable-coin registry the single source of truth for live, testing,
      configuring and proposed coins. Never conflate listing with readiness.
- [ ] Add network-specific nodes, mining algorithms, jobs, stratum listeners,
      maturity, wallets and bounded accounting independently per coin.
- [ ] Publish actual fees and pool rules per network rather than deriving them
      from unverified third-party copy.
- [ ] Connect a read-only public-safe pool statistics feed to SilverScan's
      Mining page, with integrity checks and no miner PII leakage.
- [ ] Verify public DNS, TLS/Caddy on host, external Stratum access, backups,
      monitoring, restart/recovery and capacity.
- [ ] **Payouts remain disabled** until independently tested maturity, signing,
      reconciliation, recovery and security procedures pass.
- [ ] Stage PoW-S eligible asset proposal only after legal and security review.
- [ ] Separately authorize production launch; don't restart or deploy from a
      review PR.

## Shared platform rules
- One consistent brand, reliable UI/UX, and rich data with no manufactured stats.
- Provider IDs and chain/contract identity must not be merged by ticker alone.
- A paid listing or sponsored campaign must not change independent rankings,
  guarantee a wallet/DEX integration or promise investment outcomes.
- Production API keys remain server-side; services are independently audited.
- Local uncommitted worktrees and other agents' work must remain untouched.
