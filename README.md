# LEAFerservice Headless Storefront

Hydrogen storefront for the LEAFerservice headless Shopify setup.

## What is included

- Shopify Hydrogen / React Router storefront
- LEAFerservice homepage at `/`
- Storefront API query for live products, collections, images, prices and metafields
- Cart drawer and add-to-cart buttons
- Product, collection, search, blog, policy and account routes from the Hydrogen skeleton
- German locale defaults for Storefront API context

## Local development

```bash
npm install
npm run dev
```

The generated `.env` is only for local development. To connect the real shop, set:

```env
SESSION_SECRET="change-me"
PUBLIC_STORE_DOMAIN="your-shop.myshopify.com"
PUBLIC_STOREFRONT_API_TOKEN="your-public-storefront-token"
PRIVATE_STOREFRONT_API_TOKEN="your-private-storefront-token"
PUBLIC_CHECKOUT_DOMAIN="your-shop.myshopify.com"
PUBLIC_STOREFRONT_ID="oxygen-storefront-id"
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=""
PUBLIC_CUSTOMER_ACCOUNT_API_URL=""
SHOP_ID=""
```

When the project is created through Shopify Hydrogen / Oxygen, most of these values are generated in Shopify Admin automatically.

## Oxygen deployment

1. Open Shopify Admin.
2. Go to Headless / Hydrogen.
3. Create a storefront and connect GitHub.
4. Select repository `davidnoehmke/leaferpage`.
5. Select branch `switch-to-headless`.
6. Let Shopify create or provide the Oxygen deployment token.
7. Push to the branch to deploy.

If Shopify does not create the GitHub workflow automatically, add the Oxygen token as the GitHub secret `OXYGEN_DEPLOYMENT_TOKEN` and use `.github/workflows/oxygen-deploy.yml`.

## Homepage data model

The homepage already reads these product metafields when present:

- `leafer.short_claim`
- `leafer.mixing_ratio`
- `leafer.ingredients`

That keeps the start page ready for the content system where Shopify products and metafields drive the frontend.
