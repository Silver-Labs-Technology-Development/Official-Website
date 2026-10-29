# Silver Labs design system v2 — midnight blue, ice blue and silver

This is the current shared presentation contract for Silver Labs web properties.
The initial implementation lives in `shell.css` and `shell.mjs` in the
Official Website. The updated design uses the user's blue/silver direction across Silver Scan,
Silver Pool and the Official Website. The earlier white/gold implementation is
superseded. Each product has its own isolated review branch.

## Canonical visual tokens

| Token | Value | Intent |
| --- | --- | --- |
| `--charcoal` | `#0b1524` | Sticky dark header, hero and footer |
| `--charcoal-2` | `#122439` | Dark secondary surfaces |
| `--white` | `#101b2d` | Primary deep-navy cards; token is legacy-named |
| `--paper` | `#122237` | Section surfaces |
| `--silver` | `#d7e7f6` | Silver/light text |
| `--silver-2` | `#213b54` | Secondary surface |
| `--gold` | `#70bff8` | Legacy variable; repurposed to blue |
| `--gold-light` | `#90d4ff` | Primary icy-blue action |
| `--accent` | `#81c9ff` | Interaction and link blue |
| `--ink` | `#dfe9f7` | Main light text |
| `--muted` | `#99acc2` | Muted readable text |
| `--line` | `#30465c` | Dividers |
| `--radius` | `14px` | Cards |

Use navy, light blue and silver. Do not reintroduce gold-heavy or bright
white card layouts in product views. Transitional CSS variable names are kept
for compatibility with existing components while their visual values are blue.

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
anchor. The selected destination has `aria-current="page"` and an icy-blue
indicator. Mobile uses one keyboard-operable disclosure menu. Project detail
pages inherit the same header and mark Projects as active. All pages also have
the same footer and page-level breadcrumb links.

The homepage may summarize features, but product names and architecture cards
must lead to detailed pages. An actionable-looking card/button should link to
a destination or trigger a real action. Don't style dummy text as an active
button. The only allowed fragment jump is an accessibility skip link or a
deliberate in-page reading aid **not** used as a primary site tab.

## Cross-product usage

The Official Website, Silver Scan and Silver Pool now have dedicated
blue/silver styling work on independent review branches. Other projects can
adopt the same tokens and typography, but **each repository requires its own
tested implementation and deployment**.

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
