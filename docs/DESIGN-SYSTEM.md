# Silver Labs design system v1 — aligned with Silver Pool

This is the current shared presentation contract for Silver Labs web properties.
The initial implementation lives in `shell.css` and `shell.mjs` in the
Official Website. Its design vocabulary is based on published Silver Pool
`site/styles.css`, not on the older standalone dark information-page nav.

## Canonical visual tokens

| Token | Value | Intent |
| --- | --- | --- |
| `--charcoal` | `#101315` | Sticky header, dark hero and footer |
| `--charcoal-2` | `#191e22` | Elevated dark surfaces |
| `--white` | `#ffffff` | Main content and interactive cards |
| `--paper` | `#f4f6f7` | Neutral alternating sections |
| `--silver` | `#d7dce0` | Brand support and borders |
| `--silver-2` | `#eef1f3` | Secondary neutral backgrounds |
| `--gold` | `#b99642` | Accents and metadata |
| `--gold-light` | `#e4c778` | Important actions and active nav |
| `--accent` | `#1a6fba` | Information links and minor controls |
| `--ink` | `#15181b` | Main readable text |
| `--muted` | `#66707a` | Secondary readable text |
| `--line` | `#dfe3e7` | Dividers and card edges |
| `--radius` | `14px` | Regular cards |

Type: Inter or Segoe UI system fallback, not a bundled proprietary font.
Spacing: 1160px comfortable content measure with responsive mobile gutter.
Accessibility: visible keyboard focus, understandable status, working keyboard
navigation, sufficient contrast, and `prefers-reduced-motion`.

## Site-wide navigation contract

Every public page uses **one** shared dark header with stable links to:

1. Overview — `index.html`
2. Projects — `projects/index.html`
3. Architecture — `architecture.html`
4. Roadmap — `roadmap.html`
5. Developers — `developers.html`
6. Project Growth — `growth.html`
7. About — `about.html`
8. Contact — `contact.html`

Each item opens a **different real information page**, never a long homepage
anchor. The selected destination has `aria-current="page"` and a gold
indicator. Mobile uses one keyboard-operable disclosure menu. Project detail
pages inherit the same header and mark Projects as active. All pages also have
the same footer and page-level breadcrumb links.

The homepage may summarize features, but product names and architecture cards
must lead to detailed pages. An actionable-looking card/button should link to
a destination or trigger a real action. Don't style dummy text as an active
button. The only allowed fragment jump is an accessibility skip link or a
deliberate in-page reading aid **not** used as a primary site tab.

## Cross-product usage

Silver Pool is the design reference; the Official Website now implements the
design vocabulary and site-wide layout. The same tokens should guide future
Silver Scan, SilverPay, SilverForge, SilvEx and ecosystem web UI passes, but
each repository needs **its own tested implementation and deployment**.

Product-specific navigation remains valid: a mining pool may have Statistics,
Miners and Blocks, while a researcher may have Markets, Coin Profiles,
Mining, Explorer and DEX. These links should open meaningful routes/views and
provide evidence/source labels rather than dead cards or manufactured numbers.

## Information and release rules

Published code is not public availability. Local test results are not
production readiness. Promotional content must be labeled sponsored.
External provider data is not Silver Labs trading volume; paid placement does
not alter research rankings. Never invent launch ETAs, miners, balances,
prices, rewards or guarantees. The product guide should describe next
readiness gates and verifiable state.

## Implementation checklist

- Add the shared site-wide header/footer to every new HTML page.
- Import `shell.css` **after** legacy page styles and `shell.mjs` for
  the mobile menu. New pages should minimize page-specific overrides.
- Give each top-level navigation item a distinct local HTML route.
- Keep links relative to the current path for GitHub Pages support.
- Add new pages and assets to `.github/workflows/pages.yml`.
- Expand `tests/site.test.mjs` with route, navigation, accessibility,
  packaging and link assertions.
- Verify on mobile, tablet and desktop before public release.
