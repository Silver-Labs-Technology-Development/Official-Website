# Silver Labs Official Website

Responsive static developer-preview site for Silver Labs Technology & Development.
The content describes observed engineering status; it does not announce product
availability or production readiness.

## Preview locally

Requires Node.js 18 or newer; there are no runtime or build dependencies.

```sh
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

## Deployment and preview boundary

The repository is currently **public**, with `main` as the default branch; the
published Pages site is also reachable publicly. These are observed existing
settings, not a visibility change made for this work. Active website changes
are on `website-development`. Do not merge this branch or change repository
visibility or live deployment configuration without owner review. The current
published site is
<https://silver-labs-technology-development.github.io/Official-Website/>.
GitHub Actions reports a successful Pages build/deployment for the current
default branch. The deployment workflow is GitHub-managed and is not present
in the tracked repository tree. The repository has no tracked `CNAME` file;
the unauthenticated Pages settings endpoint returned HTTP 404, so the detailed
Pages configuration could not be inspected.
Use the local preview above until the organization approves a branch preview
or reviews deployment changes.

## Status and source-link policy

- Link only to source repositories and documentation verified to exist.
- The public Silver Labs repository currently found for Bitcoin Silver is a
  fork of `bitcoin-silver/core`; it is not the separate BTCS L2 codebase.
- SilverPay is one unified product, with wallet/account functionality as its
  initial scope. Its current local service provides read-only L1/L2 views.
- SilverForge has local token-tooling prototypes, including a separate static
  frontend preview. The frontend has not been deployed, and neither prototype
  has a verified public organization repository URL.
- SilvEx CEX, SilvEx DEX, and SilvEx DEX Node are separate planned workstreams.
  No operational exchange, swap, or node service was found. OpenCEX is an
  upstream candidate under assessment, not adopted software.
- Silver Scan has no dedicated indexer/explorer implementation. BTCS L2 Studio
  has partial local RPC views, but they are not a substitute for an explorer.
- No BTCS pool service or POW-S implementation was found. Pool compatibility
  with upstream software remains under investigation; L2 sequencing is not
  mining.
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
