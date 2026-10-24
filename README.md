# Silver Labs Official Website

Responsive static developer-preview site for Silver Labs Technology & Development.
The content describes observed engineering status; it does not announce product
availability or production readiness.

## Preview locally

Requires Node.js 18 or newer; there are no runtime or build dependencies.

```sh
node --test tests/*.test.mjs
node scripts/serve.mjs
```

Open <http://127.0.0.1:4173/>. To use another port, set `PORT`, for example
`PORT=8080 node scripts/serve.mjs`.

## Check changes

```sh
node --test tests/*.test.mjs
node --check site.mjs
node --check projects.mjs
node --check scripts/serve.mjs
```

The site is plain HTML, CSS, and JavaScript; it has no transpile/build step.
The project directory and status labels are maintained in `projects.mjs`.

## GitHub Pages deployment

The repository is **public**, with `main` as the default branch. The
`website-development` branch is the verified Pages publishing source, and the
published URL is
<https://silver-labs-technology-development.github.io/Official-Website/>.
The tracked `pages.yml` workflow tests the site, packages only its static
runtime files, and deploys commits pushed to `website-development`. Pull
requests to `main` run validation without publishing. GitHub Pages is configured
to use Actions, and the `github-pages` environment allows both `main` and
`website-development`; the deploy job requires Pages write and OIDC permissions.
No custom domain is configured.

GitHub Pages serves the static output only. It does not provide the website
with a database, private API, RPC service, or backend execution environment.
The live site was verified after a successful Actions deployment from
`website-development`. The `main` branch is kept in sync with the verified
website source; Actions currently publishes from `website-development`.

## Status and source-link policy

- Link only to source repositories and documentation verified to exist.
- The public Silver Labs repository currently found for Bitcoin Silver is a
  fork of `bitcoin-silver/core`; it is not the separate BTCS L2 codebase.
- SilverPay is one product encompassing its wallet and payment services; the
  wallet is not a separate product. The public `silver-wallet` repository
  contains the wallet application. Its current local service provides partial
  read-only L1/L2 views; payment processing remains a later phase.
- SilverForge has local token-tooling prototypes, including a separate static
  frontend preview. The public `SilverForge-Studio` repository and the
  `silver-labs-l2` branch of `Silver-Labs-Bitcoin-Silver-Development` contain
  the corresponding development source. The static frontend includes an
  experimental, identity-gated BTCS L2 local-node profile; it has no public L2
  deployment integration. The frontend has not been independently deployed.
- SilvEx CEX, SilvEx DEX, and SilvEx DEX Node are separate planned workstreams.
  No operational exchange, swap, or node service was found. OpenCEX has an
  Apache-2.0 license but is described by its maintainers as unmaintained and
  as-is; it has not been adopted and is not suitable for real funds as-is.
- Silver Scan has no dedicated indexer/explorer implementation. BTCS L2 Studio
  has a bounded local L2 block/transaction view and block/transaction lookup,
  but no address history, token/NFT indexing, L1 indexer, or reorg-aware
  explorer service.
- No BTCS pool service or POW-S implementation was found. Pool compatibility
  with CKPool looks promising at source level but is not runtime-tested. CKPool
  is GPL-3.0, so licensing and notice obligations require review before reuse.
  L2 sequencing is not mining.
- Website project cards distinguish local prototypes from planned systems and
  link only verified public repositories. They do not publish private source
  links or claim real-value exchange, cross-network transfer, or trustless L2
  settlement.
- Existing upstream license and security notices remain with their source
  repository. This website repository has no license file; no new license is
  implied here.

## Contributions and security

Please keep changes small, test the static site, and verify project status and
links against source before updating public claims. The linked BTCS Core fork's
`SECURITY.md` currently directs reports to the community Discord; it does not
provide a Discord invite in that document. Do not invent a security contact.
