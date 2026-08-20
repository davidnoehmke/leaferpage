# Cutover and rollback runbook

Owner: LEAFERSERVICE  
Target: `leaferservice.com` on Shopify Hydrogen / Oxygen  
Rollback target: current Online Store 2.0 Liquid theme  
Status: **Not approved for production**

## Non-negotiable rule

Do not change the production domain target, publish a redirect theme, or remove the Liquid fallback until every production gate below is explicitly approved. A successful preview deployment is not permission to cut over production traffic.

## Phase 0 — Baseline capture

Before implementation:

- Record the current primary and redirect domains.
- Record the currently published theme and theme ID in Shopify Admin.
- Export or capture existing URL redirects.
- Capture representative URLs for home, active products, collection/catalog, contact, search, cart, account and checkout.
- Record current analytics identifiers, consent setup, pixels, feeds and notification-domain settings.
- Record active markets, shipping countries, tax behavior and payment methods.
- Confirm Online Store password protection is disabled before final checkout testing.
- Preserve the current theme repository state and production commit.

Evidence must be linked in the release ticket or pull request.

## Phase 1 — Scaffold and link

1. Install the Hydrogen sales channel in the verified Shopify store.
2. Create the Hydrogen storefront for LEAFERSERVICE.
3. Generate the app with the current Hydrogen scaffold inside `hydrogen/`.
4. Link the project to the Shopify storefront:

   ```bash
   npx shopify hydrogen link
   npx shopify hydrogen env pull
   ```

5. Confirm the environment exposes:
   - `PRIVATE_STOREFRONT_API_TOKEN`
   - `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`
   - `PUBLIC_CUSTOMER_ACCOUNT_API_URL`
   - `PUBLIC_STORE_DOMAIN`
   - `PUBLIC_STOREFRONT_API_TOKEN`
   - `PUBLIC_STOREFRONT_ID`
   - `SESSION_SECRET`
6. Confirm `.env` is ignored and no secret appears in Git history.
7. Run code generation and the standard route check.
8. Connect GitHub only after the scaffold builds locally.
9. Review and merge Shopify's Oxygen workflow pull request only after its permissions and working directory match the monorepo layout.

## Phase 2 — Catalog publication

- Publish only intentionally sellable products to the Hydrogen sales channel.
- At audit time, five products were active and at least 50 products were drafts.
- Drafts with `0.00 EUR`, zero stock or incomplete media remain unpublished.
- Confirm the same products needed for shared carts are published to both Online Store and Hydrogen during transition.
- Confirm each active product has valid variants, price, availability, images, SEO and required metafields.
- Confirm the `frontpage` collection and menu resources are published/available to the Storefront API.

Gate: merchandising owner signs off the exact Hydrogen catalog.

## Phase 3 — Preview deployment

Deploy to an Oxygen preview environment. The Basic plan supports one public environment; keep previews private unless public access is needed for review and has been approved.

Run:

```bash
npx shopify hydrogen codegen
npx shopify hydrogen check
npx shopify hydrogen build
npx shopify hydrogen deploy
```

Select a preview environment. Capture the immutable deployment URL and commit SHA.

Required evidence:

- Build output.
- Route-check output.
- Preview deployment URL.
- Tested commit SHA.
- Completed `test-matrix.md`.
- No leaked secrets in logs or browser bundles.

## Phase 4 — Production readiness

### Commerce

- Product variants update URL, image, price and availability consistently.
- Add-to-cart, quantity, remove, discounts, attributes and errors work.
- Cart survives navigation and expected channel transitions.
- Checkout URL opens Shopify checkout on the approved checkout subdomain.
- Payments, shipping, tax and confirmation flow are tested with approved test orders.
- New Customer Accounts login, logout, order history and profile links work.

### Content and SEO

- Main and footer menus match Shopify.
- Contact page renders from Shopify.
- Canonicals use `https://leaferservice.com`.
- Product, collection and page structured data validate.
- `robots.txt` blocks non-production deployments and permits the approved production domain.
- Sitemap contains only intended public routes.
- Every changed legacy URL has an explicit permanent redirect.
- 404s return status 404 and useful navigation.
- Existing order-status URLs and notification links are handled.

### Accessibility and performance

- Keyboard-only purchase path passes.
- Focus order, focus trapping and focus return pass for mobile navigation/dialogs.
- Reduced motion is respected.
- Text and controls meet contrast and touch-target requirements.
- Product titles/cards remain legible on narrow screens.
- Core Web Vitals and image behavior meet the release thresholds agreed in the test matrix.

### Operations

- Analytics and consent are verified with real-time/debug tools.
- Monitoring owner and escalation path are named.
- Product feeds and advertising destinations use the final domain where required.
- Notification URLs are updated where required.
- Support staff have the rollback steps and know how to identify Hydrogen orders/carts.

Gate: product, engineering, operations and business owners approve production deployment and domain cutover separately.

## Phase 5 — Production deployment

1. Deploy the approved commit to the Oxygen production environment.
2. Confirm the production environment is healthy on its Oxygen URL.
3. Verify production environment variables and Customer Account API callback/origin/logout URLs.
4. Set the production environment URL privacy to Public.
5. Connect/verify the primary storefront domain and checkout subdomain in Shopify Domains.
6. Set the checkout subdomain target to Online Store and make it the checkout-facing primary as required by Shopify's domain flow.
7. Change `leaferservice.com` target to the production Hydrogen storefront.
8. Update redirect domains to point to Hydrogen.
9. Verify certificate, DNS, canonical URL, robots and sitemap from an external network.
10. Run the smoke suite immediately.

Publishing Shopify's Hydrogen redirect theme for direct `{shop}.myshopify.com` Online Store traffic is a separate, explicit action after the Hydrogen domain is healthy. Keep a copy of the previous published theme and do not delete it.

## Immediate smoke suite

- `/`
- `/collections/all`
- all five active product URLs
- `/pages/contact`
- `/search`
- `/cart`
- add available variant → update quantity → remove
- add with configured line attributes where applicable
- checkout redirect and return path
- account login/logout
- mobile navigation
- one invalid product/page URL
- canonical, robots and sitemap
- analytics page view, product view, add-to-cart and checkout-start events

## Rollback triggers

Rollback immediately when any of these occurs and cannot be safely mitigated without customer impact:

- Checkout unavailable or wrong shop/domain.
- Material price, currency, tax or availability mismatch.
- Cart loss or inability to add/update/remove items.
- Authentication loop or account data exposed incorrectly.
- Widespread 5xx/4xx errors.
- Critical accessibility blocker in the purchase path.
- Production domain/certificate failure.
- Analytics or consent failure that creates legal/compliance risk.

## Rollback procedure

1. Announce rollback in the release channel and name the incident owner.
2. In Shopify Domains, restore `leaferservice.com` target to the Online Store.
3. Confirm the approved Liquid theme is published and responsive.
4. If a Hydrogen redirect theme was published, republish the preserved full Liquid theme.
5. Keep the checkout subdomain configuration compatible with the restored Online Store.
6. Verify home, product, cart, checkout, account and order-status links.
7. Pause further production Oxygen changes; do not delete the failed deployment.
8. Record failing URLs, deployment ID, commit SHA, logs and time of rollback.
9. Restore notification/feed domain settings only when the rollback requires it.
10. Open an incident and corrective pull request before another cutover.

Because Oxygen deployments are immutable, rolling back application code can also use a previously verified production deployment, but domain restoration to the Online Store remains the fastest independent commerce fallback.

## Post-cutover observation window

For the agreed observation period:

- Compare sessions, add-to-cart, checkout-start and conversion against baseline.
- Watch 404/5xx rates, Storefront API errors, cart mutation errors and account failures.
- Review search queries and no-result rates.
- Verify product price/inventory updates propagate.
- Test at least one purchase on desktop and mobile after material catalog changes.
- Keep the full Liquid rollback theme intact.

Close the rollback window only after business and engineering approval. Theme deletion is out of scope for this migration.
