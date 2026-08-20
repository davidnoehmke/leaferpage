# Shopify data contract

Audit source: verified live Shopify Admin API data on 2026-08-04. This document records existing objects only. It does not create or assume new metafield or metaobject definitions.

## Shop

| Field | Verified value / rule |
|---|---|
| Store name | `Leaferservice Deutschland` |
| Custom domain | `leaferservice.com` |
| Shopify domain | `rxpzut-qm.myshopify.com` |
| Currency | `EUR` |
| Timezone | `Europe/Berlin` |
| Primary locale | `de`, published |
| Customer accounts | Optional |
| Account version | New Customer Accounts |
| Login at checkout | Not required |
| Checkout API support | Available |

Fallback: configuration must fail visibly during startup if the store domain or required Oxygen credentials are missing. It must not silently use Mock.shop in production.

## Menus

### `main-menu`

- Startseite → `/`
- Katalog → `/collections/all`
- Kontakt → `/pages/contact`

### `footer`

- Suche → `/search`

### `customer-account-main-menu`

- Bestellungen → Shopify customer-account orders URL
- Profil → Shopify customer-account profile URL

Fallback: render the logo/home link and essential cart/account controls when a menu is missing. Do not hard-code a second full navigation tree.

## Pages

| Handle | Title | Published |
|---|---|---|
| `contact` | Kontakt | yes |

Fallback: return a proper 404 when a requested page does not exist or is unpublished to the relevant storefront context.

## Collections

| GID | Handle | Title | Products at audit |
|---|---|---|---:|
| `gid://shopify/Collection/675545776475` | `frontpage` | Startseite | 1 |

The current Liquid product template references a collection with handle `new-arrivals`; no such collection was found. The headless storefront must use Storefront product recommendations or an explicitly approved existing collection instead.

Fallback: hide the section or use approved recommendations when a configured collection is missing. Never invent collection IDs or handles.

## Product publication state

Five products were active at audit time:

1. Aktivkohle – Filterkohle für Pflanzsubstrate
2. Kokoschips – grober Substratzusatz
3. Pflanzgranulat – mineralisches Substrat
4. Sphagnum-Moos – für Stecklinge & Aroiden
5. Tongranulat – Drainage & Hydrokultur

A draft query returned 50 products and indicated more pages. Many drafts have zero inventory, no media and `0.00 EUR` placeholder prices. Draft status must remain authoritative. The Hydrogen storefront must not expose or create links to draft products.

## Core product object

| Shopify field | Type / usage | Fallback |
|---|---|---|
| `id` | ID; internal cache and cart references | required |
| `handle` | URL identifier | required; 404 if missing route target |
| `title` | customer-facing name | required |
| `description` / `descriptionHtml` | PDP information | omit description region when blank |
| `vendor` | optional brand fallback | use verified `leafer_catalog.brand`, then vendor |
| `productType` | category eyebrow/fallback | omit when blank |
| `tags` | search/merchandising only | never treat as authoritative structured content |
| `seo.title` / `seo.description` | route metadata | fall back to title and short description |
| `featuredImage` / media connection | gallery and cards | accessible placeholder with fixed aspect ratio |
| `options` | variant controls | hide controls for default-only product |
| `selectedOrFirstAvailableVariant` | initial purchase state | disable purchase when no available variant |
| `variants` | variant selection | query ID, title, selected options, availability, quantity rules and money |
| `priceRange` | collection-card display | show minimum price only when variants differ |
| `availableForSale` | card/PDP state | disable CTA when false |
| `requiresSellingPlan` / selling plans | subscriptions if present | do not render subscription UI when absent |
| recommendations | cross-sell | hide section when empty |

## Variant and cart contract

Each purchasable variant must provide:

- Variant ID.
- Title and selected options.
- Current price and compare-at price where applicable.
- `availableForSale` and quantity availability where exposed.
- Product/variant image fallback.
- SKU only for operational display where approved.
- Selling-plan allocations when the product supports subscriptions.

Cart lines must preserve:

- Merchandise variant ID.
- Quantity.
- Selected options for display.
- Current line cost and cart totals from Shopify.
- Line attributes/properties added by the configurator or other customer input.
- User errors and warnings returned by Shopify.

No product ID, variant ID, price or checkout URL may be hard-coded.

## Verified product metafields

### `leafer_catalog`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `catalog_id` | `single_line_text_field` | internal catalog reference | omit from customer UI |
| `subtitle` | `single_line_text_field` | product subtitle | product type or omit |
| `brand` | `single_line_text_field` | display brand | product vendor |
| `product_world` | `single_line_text_field` | merchandising family | product type or omit |
| `category` | `single_line_text_field` | category label | product type or omit |
| `subcategory` | `single_line_text_field` | secondary category | omit |
| `priority` | `single_line_text_field` | merchandising input | never expose automatically |
| `material` | `single_line_text_field` | product facts | omit row |
| `color` | `single_line_text_field` | product facts | omit row |

### `leafer_properties`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `peat_free` | `boolean` | property badge | hide when null/false unless false is meaningful in context |
| `natural` | `boolean` | property badge | hide when null/false |
| `mineral` | `boolean` | property badge | hide when null/false |
| `organic` | `boolean` | property badge | hide when null/false |
| `reusable` | `boolean` | property badge | hide when null/false |
| `ph_value` | `single_line_text_field` | pH statement | omit row |

Boolean parsing must use typed `jsonValue`, not string truthiness.

### `leafer_content`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `hero_title` | `single_line_text_field` | PDP decision-support heading | product title |
| `hero_subtitle` | `multi_line_text_field` | PDP supporting copy | `short_description`, then product description excerpt |
| `hero_cta` | `single_line_text_field` | descriptive purchase CTA label | localized “In den Warenkorb” |
| `short_description` | `multi_line_text_field` | card/PDP summary | product description excerpt |

The current Liquid code reads `product.metafields.leafer.short_claim`, which is not part of the verified definitions. Hydrogen must use the fields above.

### `leafer_usps`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `usp_1` | `single_line_text_field` | benefit 1 | omit item |
| `usp_2` | `single_line_text_field` | benefit 2 | omit item |
| `usp_3` | `single_line_text_field` | benefit 3 | omit item |
| `usp_4` | `single_line_text_field` | benefit 4 | omit item |
| `icon_1` | `single_line_text_field` | decorative icon paired to USP 1 | no icon; keep text |
| `icon_2` | `single_line_text_field` | decorative icon paired to USP 2 | no icon; keep text |
| `icon_3` | `single_line_text_field` | decorative icon paired to USP 3 | no icon; keep text |
| `icon_4` | `single_line_text_field` | decorative icon paired to USP 4 | no icon; keep text |

Emoji/icon values are decorative and must be hidden from assistive technology unless they add information not present in the text.

### `leafer_performance`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `aeration` | `number_integer` | performance score | omit metric |
| `drainage` | `number_integer` | performance score | omit metric |
| `water_storage` | `number_integer` | performance score | omit metric |
| `structural_stability` | `number_integer` | performance score | omit metric |
| `nutrient_storage` | `number_integer` | performance score | omit metric |

Validated sample values use a five-point scale. UI must clamp visual output defensively and expose the numeric value in accessible text. A formal validation range was not confirmed in the API audit, so the application must not assume that every value is 1–5 without checking.

### `leafer_usage`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `focus_keyword` | `single_line_text_field` | editorial/SEO input | do not render as visible copy by default |
| `keywords` | `list.single_line_text_field` | search/editorial input | empty list |
| `mix_ratio` | `single_line_text_field` | usage fact | omit row |
| `ideal_for` | `list.single_line_text_field` | application list | empty list |
| `application` | `multi_line_text_field` | instructions | omit section |

List fields must use typed list values and render each item independently.

### `leafer_solutions`

| Key | Shopify type | Use | Fallback |
|---|---|---|---|
| `solution_3` | `single_line_text_field` | problem/solution statement | omit item |
| `solution_4` | `single_line_text_field` | problem/solution statement | omit item |

Only keys 3 and 4 exist in the verified definitions. Do not query or fabricate `solution_1` or `solution_2` without a later schema audit.

## Metaobjects

No metaobject definitions were found at audit time.

The following therefore require a separate approved schema change before becoming Shopify-managed headless content:

- Substrate configurator ingredient definitions.
- Reusable editorial landing-page modules.
- Shared icon/benefit entities.
- Complex recommendation rules.

Until then, configurator parity may use version-controlled data migrated from the current Theme Editor block configuration.

## Configurator source contract

Current default ingredients in the Liquid product template:

| Name | Function | Default |
|---|---|---:|
| Pinienrinde | Struktur und Luftführung | 30% |
| Perlite | Lockerheit und Drainage | 20% |
| Lavagranulat | Mineralische Stabilität | 20% |
| Blähton | Grobporen und Drainage | 15% |
| Zeolith | Wasser- und Nährstoffpuffer | 15% |

Rules to preserve:

- Range 0–100 per ingredient, step 5.
- Total is valid only at exactly 100%.
- Recipe is available as accessible live output.
- Copy action must handle clipboard failure.
- When a recipe is purchased, store it as cart line attributes/properties with stable, localized labels.
- The component must not display on unrelated products unless an approved data rule enables it.

## Environment contract

Oxygen supplies the storefront-specific values after the Hydrogen storefront is linked:

```dotenv
PRIVATE_STOREFRONT_API_TOKEN=
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=
PUBLIC_CUSTOMER_ACCOUNT_API_URL=
PUBLIC_STORE_DOMAIN=rxpzut-qm.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=
PUBLIC_STOREFRONT_ID=
SESSION_SECRET=
```

Only the variable names and non-secret verified store domain may appear in source control. Local `.env` files and Oxygen values must remain secret.
