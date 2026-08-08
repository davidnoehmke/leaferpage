# Target architecture: Hydrogen on Oxygen

## Scope

This document defines the production target for migrating `leaferservice.com` from the current Online Store 2.0 Liquid theme to Shopify Hydrogen hosted on Oxygen. It is an architecture contract, not evidence of a deployed storefront.

## Repository strategy

The current Liquid theme remains in the repository and on Shopify as the rollback implementation. The Hydrogen app will live in a dedicated `hydrogen/` directory so that theme maintenance and headless development remain separable during migration.

```text
/
├── assets/
├── config/
├── layout/
├── locales/
├── sections/
├── snippets/
├── templates/
├── hydrogen/
│   ├── app/
│   │   ├── components/
│   │   ├── graphql/
│   │   ├── lib/
│   │   ├── routes/
│   │   └── styles/
│   ├── public/
│   └── package.json
└── docs/headless/
```

The actual app must be generated with the current Shopify Hydrogen scaffold rather than hand-copying an old template. The expected command is:

```bash
npm create @shopify/hydrogen@latest
```

After generation, the project must be linked to the verified shop and its Oxygen environment variables pulled through Shopify CLI:

```bash
npx shopify hydrogen link
npx shopify hydrogen env pull
```

No generated secret may be committed.

## Runtime and deployment

- **Framework:** Shopify Hydrogen on React Router.
- **Hosting:** Shopify Oxygen.
- **Commerce data:** Storefront API through Hydrogen's server-side Storefront client.
- **Cart:** Storefront Cart API using Hydrogen's cart handler and cart cookie.
- **Checkout:** redirect to Shopify-hosted checkout through the cart's `checkoutUrl`.
- **Customer accounts:** New Customer Accounts through Hydrogen's Customer Account API client.
- **Deployment:** Oxygen preview for every migration change; production only after approval gates.
- **Rollback:** current Liquid theme and Online Store target remain available until the rollback window closes.

## Route contract

| Route | Source | Required behavior |
|---|---|---|
| `/` | Shopify shop, menu, `frontpage` collection, selected active products | Home page; no hard-coded product IDs |
| `/products/:handle` | Product, variants, media, metafields, recommendations | Variant selection, price, availability, quantity, cart, SEO, empty states |
| `/collections` | Collections | Index with graceful empty state |
| `/collections/:handle` | Collection and products | Pagination, product cards, filters only when supported |
| `/collections/all` | Products published to Hydrogen | Catalog route matching current menu URL |
| `/pages/:handle` | Shopify Pages | Includes existing `contact` page |
| `/search` | Storefront search | Query, no-results state, keyboard-accessible form |
| `/api/predictive-search` | Storefront predictive search | Same-origin suggestions; progressive enhancement |
| `/cart` and `/cart/*` | Cart API | Add, update, remove, discounts, line attributes, checkout |
| `/account/*` | Customer Account API | Login, logout, orders, profile |
| `/policies/*` | Shop policies | Legal pages from Shopify |
| `/robots.txt` | Hydrogen route | Index only in public production with custom domain |
| `/sitemap.xml` | Hydrogen route | Products, collections, pages, policies |
| `/:catchAll` | Redirect/404 resolution | Preserve legacy URLs and return proper status codes |

## Liquid-to-Hydrogen component mapping

| Current source | Hydrogen target | Notes |
|---|---|---|
| `layout/theme.liquid` | `root` document, global layout, CSS tokens | Preserve cream/natural palette, skip link, reduced motion, focus styles |
| header section group | `Header` + mobile navigation components | Hamburger left, closed by default, accordion submenus, body scroll lock |
| footer section group | `Footer` | Read Shopify `footer` menu |
| `sections/main-product.liquid` | product route + `ProductForm`, media gallery, purchase panel | Selected variant must drive URL, price, availability and cart line |
| `templates/product.json` | product route composition | Theme Editor block order does not automatically exist headlessly |
| `sections/substrate-configurator.liquid` | `SubstrateConfigurator` component | Preserve keyboard controls, validation and copy action |
| `sections/main-cart.liquid` | cart route and cart components | Cart mutations must be server-backed and optimistic only where safe |
| product recommendation/cross-sell section | Storefront recommendations | Current `new-arrivals` collection reference is invalid in live data |

## Design-system migration

The existing global tokens are the starting point, not a second design system:

- Background and surface: calm cream/natural tones.
- Text and muted colors from current theme settings.
- Accent and accent-soft for actions and highlights.
- Maximum content width: `1400px`.
- Heading stack: Georgia / Times fallback.
- Existing radius, border, shadow and motion values should be ported to CSS custom properties.
- Preserve `prefers-reduced-motion` behavior and visible keyboard focus.

Theme settings cannot be read by Hydrogen at runtime. During parity work, values must be copied into versioned CSS tokens or migrated to an approved Shopify content model. No new metaobject definition is assumed in this foundation.

## Data-loading rules

1. Query only fields rendered by a route.
2. Use server-side private Storefront credentials for server loaders; never expose private tokens.
3. Cache catalog and content data at the edge where safe; do not cache cart, account, personalized pricing or session data publicly.
4. Request variants, availability and money fields together so UI state cannot drift.
5. Product cards and PDPs render only products published to the Hydrogen sales channel.
6. All metafields use the verified namespaces and keys in `data-contract.md`.
7. Missing images, descriptions and metafields must produce intentional empty states, not broken markup.

## Configurator decision

The current substrate configurator is stored in Liquid Theme Editor blocks. No equivalent Shopify metaobject definition currently exists. The first headless parity implementation will preserve its current ingredient configuration in version-controlled application data. Moving it to metaobjects requires a separate approved data-model change and migration; it must not be invented implicitly.

When the configurator adds a purchasable item, its recipe must be sent as cart line attributes or line-item properties using stable keys. A copied recipe alone is not considered commerce parity.

## SEO and domains

- Render per-route title, description, canonical URL, social metadata and structured data.
- Preserve existing product, collection, page and search URLs wherever possible.
- Add explicit redirects for any changed route before cutover.
- Keep checkout on a Shopify-targeted subdomain approved during the cutover procedure.
- Preview environments remain non-indexable; production robots and sitemap activate only on the public custom domain.
- Do not publish Shopify's Hydrogen redirect theme until the production storefront has passed the complete test matrix and rollback has been approved.

## Security

- No Storefront, Customer Account or session secret in GitHub.
- Rotate any credential exposed in logs or commits and redeploy Oxygen; deployments are immutable.
- Use secure, HTTP-only session cookies with a production-grade `SESSION_SECRET`.
- Treat rendered product HTML and rich content as untrusted input and use framework-safe rendering.
- Do not proxy Admin API access through the storefront.

## Approval gates

1. Hydrogen scaffold generated and dependency lockfile reviewed.
2. Shopify Hydrogen sales channel and storefront linked.
3. Storefront and Customer Account API environments available in Oxygen.
4. Active catalog intentionally published to Hydrogen.
5. Product, variant, cart, checkout, account, SEO and accessibility parity passed.
6. Redirect and domain plan approved.
7. Production deployment approved explicitly.
8. Domain target switch approved explicitly.
