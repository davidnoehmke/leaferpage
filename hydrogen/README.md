# Hydrogen workspace

This directory is reserved for the LEAFERSERVICE Hydrogen storefront.

## Current status

- The Shopify store and repository have been audited.
- Architecture, data contract, environment contract, cutover/rollback runbook and test matrix exist under `docs/headless/`.
- No Hydrogen application has been generated in this directory yet.
- No Oxygen storefront has been linked or deployed by this branch.

Do not hand-copy an old Hydrogen starter into this directory. Generate the current Shopify-supported scaffold in a Node.js development environment:

```bash
cd hydrogen
npm create @shopify/hydrogen@latest .
```

Select TypeScript and the standard Shopify routes unless an approved architecture change says otherwise. The generated application should retain support for:

- Home and catch-all routes.
- Product routes.
- Collection index and collection routes.
- Shopify Pages.
- Cart and discount routes.
- Search and predictive search.
- Policies.
- Customer accounts.
- `robots.txt` and `sitemap.xml`.

Then link it to the verified LEAFERSERVICE shop:

```bash
npx shopify hydrogen link
npx shopify hydrogen env pull
```

Verify `PUBLIC_STORE_DOMAIN` resolves to `rxpzut-qm.myshopify.com`. Never commit `.env` or any real token.

## Required checks before opening the implementation PR

```bash
npm install
npx shopify hydrogen codegen
npx shopify hydrogen check
npx shopify hydrogen build
```

Run the local Oxygen-compatible development runtime and test the active Shopify catalog:

```bash
npx shopify hydrogen dev
```

Deploy only to an Oxygen preview environment until the production gates in `docs/headless/cutover-runbook.md` are approved:

```bash
npx shopify hydrogen deploy
```

## First implementation slice

1. Port global LEAFERSERVICE tokens and application shell.
2. Read `main-menu` and `footer` from Shopify.
3. Implement `/`, `/collections/all`, `/products/:handle`, `/pages/:handle` and `/search`.
4. Implement cart mutations and Shopify checkout redirect.
5. Implement New Customer Accounts routes.
6. Query only the verified metafields in `docs/headless/data-contract.md`.
7. Port the substrate configurator with current version-controlled defaults and line attributes.
8. Add redirects, SEO, robots, sitemap, analytics and error boundaries.
9. Complete the test matrix on an immutable Oxygen preview.

## Guardrails

- Keep the Liquid theme intact as rollback.
- Do not publish draft or zero-price placeholder products.
- Do not hard-code product/variant IDs, prices, checkout URLs or customer copy that belongs in Shopify.
- Do not create metaobjects or metafields without a separately reviewed schema change.
- Do not switch the production domain from this workspace or CI.
