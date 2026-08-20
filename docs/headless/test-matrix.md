# Hydrogen / Oxygen test matrix

Status values: `NOT RUN`, `PASS`, `FAIL`, `BLOCKED`  
A production cutover requires every Critical row to be `PASS` with evidence attached to the release pull request.

## Test data

Use intentionally published products covering:

- Single/default variant if available.
- Multiple available variants.
- Unavailable variant.
- Product with multiple images.
- Product with missing optional metafields.
- Product using the substrate configurator.
- Product with compare-at price or selling plan only when such data exists.

At audit time, the five active products are the initial commerce set. Draft and `0.00 EUR` placeholder products are excluded.

## Desktop

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Home route | Loads Shopify menus/content and only intended published products | NOT RUN |
| Critical | Product route | Correct title, media, selected variant, price, availability and CTA | NOT RUN |
| Critical | Variant change | URL and all dependent product state update without stale price or availability | NOT RUN |
| Critical | Add to cart | Correct variant, quantity and attributes added once | NOT RUN |
| Critical | Cart update/remove | Shopify totals and line state remain authoritative | NOT RUN |
| Critical | Checkout | Redirects to the verified Shopify checkout for this shop | NOT RUN |
| High | Catalog/collection | Pagination and empty states work; no draft products | NOT RUN |
| High | Search | Query, results and no-results state work | NOT RUN |
| High | Contact page | Shopify `contact` page renders and form/instructions work as designed | NOT RUN |
| High | Header/footer | Menu links, account and cart destinations are correct | NOT RUN |
| Medium | Missing image | Stable accessible placeholder; no layout shift/broken image | NOT RUN |
| Medium | Long title | No clipping or collision at supported widths | NOT RUN |

## Mobile

Test at 320, 360, 390 and 430 CSS pixels, plus one tablet width.

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Mobile navigation closed state | Hamburger is left-aligned, menu closed by default, no invisible overlay intercepts input | NOT RUN |
| Critical | Mobile navigation open/close | Body scroll locks; Escape/backdrop/close work; focus returns to trigger | NOT RUN |
| Critical | Accordion submenu | Native/accessible controls, correct expanded state, no hover dependency | NOT RUN |
| Critical | Product purchase controls | Variant, quantity and CTA remain visible, legible and usable | NOT RUN |
| Critical | Sticky purchase UI | Does not obscure content, consent UI, browser controls or error messages | NOT RUN |
| Critical | Cart and checkout | Entire purchase path works with touch and virtual keyboard | NOT RUN |
| High | Media gallery | Swipe/scroll behavior does not trap page scroll; active media is understandable | NOT RUN |
| High | Product cards | Image, title, price and status remain readable at 320px | NOT RUN |
| High | Configurator | Sliders/inputs, total, status and copy action usable without precision gestures | NOT RUN |
| Medium | Landscape | Navigation and purchase controls remain usable | NOT RUN |

## Theme/editor migration parity

Hydrogen has no Online Store Theme Editor. Validate that every customer-facing dependency from the current theme has an explicit replacement.

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Global tokens | Cream/natural palette, typography, spacing, focus and reduced-motion behavior preserved | NOT RUN |
| High | Header/footer settings | Shopify menu changes appear without a code deployment | NOT RUN |
| High | Product composition | Main product, usage, recipe/configurator and recommendations have defined sources | NOT RUN |
| High | Configurator defaults | Current five ingredients and percentages match the approved migration snapshot | NOT RUN |
| High | Missing `new-arrivals` | No broken cross-sell; approved recommendations/empty state used | NOT RUN |
| High | Invalid `leafer.short_claim` | New implementation uses verified `leafer_content` contract | NOT RUN |
| Medium | Content ownership | Team knows which changes require Shopify data vs GitHub deployment | NOT RUN |

## Accessibility

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Keyboard purchase path | Header → product options → quantity → add → cart → checkout without pointer | NOT RUN |
| Critical | Focus visibility | Visible focus on links, buttons, fields, summaries and custom controls | NOT RUN |
| Critical | Dialog/drawer focus | Focus trapped only while open; Escape closes; trigger regains focus | NOT RUN |
| Critical | Form labels/errors | Programmatic labels, inline errors and live regions identify affected fields | NOT RUN |
| Critical | Color contrast | Text, muted copy, controls, borders and focus indicators meet target contrast | NOT RUN |
| High | Heading landmarks | One meaningful H1; logical headings and landmark structure | NOT RUN |
| High | Images | Product imagery has useful alt text; decorative icons are hidden | NOT RUN |
| High | Motion | `prefers-reduced-motion` removes nonessential movement and smooth scrolling | NOT RUN |
| High | Screen reader variant state | Selected option, price, availability and cart result announced appropriately | NOT RUN |
| High | Configurator | Each input has a label/output; total validity is not communicated by color alone | NOT RUN |
| Medium | Zoom/reflow | 200% zoom and narrow reflow without loss of content/function | NOT RUN |

## Variants, price and availability

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Initial variant | Uses URL-selected available variant or first available fallback | NOT RUN |
| Critical | Unavailable combination | Cannot be purchased; descriptive status shown | NOT RUN |
| Critical | Price | Currency and amount exactly match Shopify response | NOT RUN |
| Critical | Compare-at price | Shown only when valid and greater than current price | NOT RUN |
| Critical | Inventory change | Fresh server/cart response overrides optimistic UI | NOT RUN |
| High | Direct variant URL | Reload preserves selected variant and metadata | NOT RUN |
| High | Default-only product | No redundant option UI; correct variant submitted | NOT RUN |
| High | Selling plan | Correct plan, price and allocation only when present | NOT RUN |
| High | Multiple products in cart | Independent quantities, variants and properties | NOT RUN |

## Cart and line properties

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Empty cart | Useful state and continue-shopping route | NOT RUN |
| Critical | Add line | Correct merchandise ID, quantity and properties | NOT RUN |
| Critical | Update quantity | Valid quantities accepted; errors visible; totals refreshed | NOT RUN |
| Critical | Remove line | Line removed and empty state appears when last line is removed | NOT RUN |
| Critical | Mutation error | User error shown without losing current cart state | NOT RUN |
| Critical | Checkout URL | Comes from current Shopify cart, never hard-coded | NOT RUN |
| High | Discount route/code | Valid and invalid discount feedback works if enabled | NOT RUN |
| High | Configurator recipe | Stable line attributes/properties survive cart and checkout | NOT RUN |
| High | Cart persistence | Expected cart survives reload and Liquid/Headless transition during migration | NOT RUN |
| Medium | Concurrent update | Stale optimistic state reconciles with Shopify response | NOT RUN |

## Customer accounts

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Login | New Customer Accounts authorization completes on approved domain | NOT RUN |
| Critical | Callback | `/account/authorize` and configured callback/origin are accepted | NOT RUN |
| Critical | Logout | Session cleared and user returned to approved storefront URL | NOT RUN |
| High | Orders | Authenticated user sees own order history only | NOT RUN |
| High | Profile | Profile page/link works | NOT RUN |
| High | Expired token | Refresh or re-authentication handled without loop | NOT RUN |
| High | Guest checkout | Remains available because login is not required | NOT RUN |

## Empty and failure states

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Missing product/page | Proper HTTP 404, no false 200 | NOT RUN |
| Critical | API failure | Branded error boundary, retry/navigation, no secret leakage | NOT RUN |
| High | Empty collection | Clear message and route back to catalog/home | NOT RUN |
| High | No search results | Query retained and recovery options shown | NOT RUN |
| High | Missing metafields | Optional regions collapse cleanly | NOT RUN |
| High | Missing menu | Essential home/cart/account navigation remains | NOT RUN |
| High | Clipboard failure | Configurator exposes selectable recipe and error message | NOT RUN |
| Medium | Slow request | Stable skeleton/loading state without layout jump | NOT RUN |

## SEO, routing and domains

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Canonical | Uses final `https://leaferservice.com` public URL | NOT RUN |
| Critical | Redirect map | Every changed legacy URL returns intended permanent redirect | NOT RUN |
| Critical | robots | Preview blocked; production custom domain serves intended policy | NOT RUN |
| Critical | sitemap | Public products, collections, pages and policies only | NOT RUN |
| Critical | Checkout subdomain | Correct Shopify target and TLS | NOT RUN |
| High | Metadata | Unique title/description/social image per route with fallbacks | NOT RUN |
| High | Structured data | Product price/availability/currency match visible and Shopify data | NOT RUN |
| High | Pagination canonical | No duplicate/incorrect canonical behavior | NOT RUN |
| High | Search indexing | Internal search results follow approved indexing policy | NOT RUN |
| High | 404 status | Invalid routes not cached/indexed as successful pages | NOT RUN |

## Performance

Release thresholds should be confirmed by the team; the following are minimum engineering checks.

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Production build | `shopify hydrogen build` succeeds without hidden runtime fallback | NOT RUN |
| Critical | Route check | `shopify hydrogen check` passes or each exception is documented | NOT RUN |
| High | LCP image | Correct responsive sizes, dimensions and priority only for true LCP | NOT RUN |
| High | JavaScript | No external library added for behavior available natively/Hydrogen | NOT RUN |
| High | Cache policy | Public catalog cached; cart/account/session never publicly cached | NOT RUN |
| High | Fonts | No render-blocking unapproved font payload | NOT RUN |
| High | CLS | Reserved media/layout space; no sticky dock jumps | NOT RUN |
| Medium | Third parties | Consent-aware and deferred; failure does not block purchase | NOT RUN |
| Medium | Private previews | Performance comparison accounts for preview authentication overhead | NOT RUN |

## Analytics and operations

| Priority | Test | Expected result | Status |
|---|---|---|---|
| Critical | Consent | No nonessential tracking before required consent | NOT RUN |
| Critical | Commerce events | Product view, add-to-cart, cart view, checkout start recorded once | NOT RUN |
| High | Page views | Client navigation does not double-count | NOT RUN |
| High | Error logging | Route, API and cart errors include correlation context without PII/secrets | NOT RUN |
| High | Product feeds | Final Hydrogen domain used where required | NOT RUN |
| High | Notifications | Customer-facing URLs resolve to intended storefront/account/status pages | NOT RUN |
| High | Rollback drill | Domain/theme restoration steps verified by authorized owner | NOT RUN |

## Evidence format

For each Critical and failed High test, attach:

- Commit SHA and immutable Oxygen deployment URL.
- Device/browser or automated test environment.
- Product/variant handle used, without customer PII.
- Screenshot/video or log excerpt.
- Expected vs actual result.
- Owner and linked fix/waiver.

A waiver requires named business and engineering approval and must never cover checkout, price, availability, customer-data isolation or critical accessibility failures.
