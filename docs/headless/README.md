# LEAFERSERVICE Headless / Oxygen Migration

Status: **Foundation prepared — not deployed, not connected to the production domain**  
Audit date: 2026-08-04  
Target shop: `leaferservice.com` (`rxpzut-qm.myshopify.com`)  
Repository: `davidnoehmke/leaferpage`

## Decision

The current Online Store 2.0 theme stays intact as the production fallback. A Shopify Hydrogen storefront will be scaffolded in a dedicated `hydrogen/` workspace and deployed to Oxygen preview environments before any domain cutover. Production traffic must not be switched until catalog readiness, commerce parity, accessibility, SEO redirects, customer accounts, and checkout have passed the test matrix.

## Why this shape

- The repository currently contains a Liquid theme, not a runnable Hydrogen application.
- Product, cart, navigation, product-configurator, and Theme Editor behavior must be migrated explicitly.
- The live catalog contains five active products and at least 50 draft products; some draft variants use `0.00 EUR` placeholder prices.
- Shopify already has New Customer Accounts enabled and checkout support available.
- Forty product metafield definitions exist and are the authoritative content contract; no metaobject definitions exist.

## Target repository layout

```text
/
├── assets/, config/, layout/, locales/, sections/, snippets/, templates/  # rollback theme
├── hydrogen/                                                               # Hydrogen app, created by Shopify CLI
└── docs/headless/                                                          # migration contract and runbooks
```

## Delivery phases

1. **Foundation:** store/repository audit, architecture decision, data contract, runbook, and test matrix.
2. **Scaffold:** create the Hydrogen app with the current Shopify CLI, link it to the Hydrogen sales channel, and add only non-secret environment variable names to source control.
3. **Parity:** implement routes, Storefront API queries, cart mutations, checkout redirect, customer-account flow, SEO, menus, page content, and the existing configurator behavior.
4. **Preview:** deploy to Oxygen preview, run automated checks and manual commerce tests against active products only.
5. **Cutover:** approve redirects and domain change, retain the Liquid theme as rollback, monitor errors and conversion, then close the rollback window.

## Documents

- [Architecture](architecture.md)
- [Shopify data contract](data-contract.md)
- [Cutover and rollback runbook](cutover-runbook.md)
- [Test matrix](test-matrix.md)
- [Environment variable contract](environment.example)

## Explicit non-actions in this foundation change

- No live theme was changed or published.
- No Shopify domain was changed.
- No Oxygen deployment was created.
- No Storefront API token or Customer Account API secret was written to GitHub.
- No draft product was published or repriced.
