# Silver Labs — Official Website (Developer Preview)

This repository contains the public **Silver Labs Technology & Development**
website, representing the Silver Labs ecosystem independently from the Bitcoin
Silver organization's website. It is a static HTML/CSS/JavaScript site with no
production wallet, trading, market API, payout service or server-side secrets.

## Site map

- [Full project directory](projects/index.html) — eleven independently maintained project and service guides with build evidence, usage, participation and launch gates.
- [Project Growth](growth.html) — proposed listings, advertising billboards, analytics, campaign support and separated technical integration reviews.
- [Home and ecosystem](index.html) — product directory, current implementation
  status, architecture, Silver Scan research direction, developer resources.
- [About](about.html) — Silver Labs identity and developer principles.
- [Contact](contact.html) — GitHub contributor pathways; no fabricated email.
- [FAQ](faq.html) — practical distinctions between prototypes and live services.
- [Listing information](listing.html) — proposed asset-review workflow and
  a proposed **US$4,000** listing-review fee. Applications are **not open**, and
  this is **not** an active payable fee or guarantee of listing.
- [Privacy](privacy.html) / [Terms](terms.html) — draft informational policies
  requiring review, not final company legal documents.

Public project summaries live in [projects.mjs](projects.mjs), not in a hidden
database. The updated site distinguishes Silver Pool's locally tested BTCS
Stratum/API backend, Silver Scan's BTCS L1 indexer prototype, SilvEx's trading
terminal development, SilverPay's wallet direction, and BTCS L2 experiments.
Unverified production functions remain explicitly labeled.

## Run locally

Requires Node.js 18+; no installed dependencies:

```sh
node --test tests/*.test.mjs
node --check site.mjs
node --check projects.mjs
node scripts/serve.mjs
```

Open http://127.0.0.1:4173/. The local server and GitHub Pages publish
**static content only**. Silver Pool's API/Stratum, Silver Scan's Python
backend, token APIs and any future exchange services must be operated and
verified independently.

## Publishing

The repository default branch is `main`. The GitHub Pages deployment workflow
builds and publishes pushes to `website-development` and tests pull requests
to `main`. The workflow packages the homepage, project data, all eleven project pages, the project directory, Project Growth, and six additional information pages, with `info.css` and `project.css`.

Public Pages development site:
https://silver-labs-technology-development.github.io/Official-Website/

This address is the previous published site; a draft pull request does not
change it. Do not assume new pages are live until the publishing branch and
GitHub Pages workflow have been updated and verified.

## Accuracy rules

- Distinguish published code, local verification, hosted frontends, public
  APIs and independently verified real-value services.
- Never label outside-provider volume or coin listings as native SilvEx volume.
- Keep assets differentiated by network and contract/mint identity, not ticker.
- Silver Scan is a multi-coin research platform direction, not solely a BTCS
  explorer; BTC/BCH/LTC/DOGE test profiles in Silver Pool do not imply live
  mining for those coins.
- User-controlled SilverPay wallets and broader payments are separate
  implementation milestones; POW-S staking returns are future concepts.
- Do not publish real credentials or private endpoints in static files.
- Keep future AI systems or possible L3 as future research, not live features.

See each linked product repository for its latest test evidence, license and
security policy. Avoid production claims based on this static website alone.

## Release-date policy

Project guides distinguish published code from verified public operation. No calendar ETA is invented: each page instead records the next objective readiness gates and identifies whether a public date has actually been announced. Current development branches may contain features not yet merged to a project's default branch.
