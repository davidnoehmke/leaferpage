import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => {
  const product = data?.product;

  return [
    {title: `${product?.seo?.title || product?.title || 'Produkt'} | LEAFerservice`},
    ...(product?.seo?.description || product?.description
      ? [
          {
            name: 'description',
            content: (product.seo?.description || product.description).slice(
              0,
              155,
            ),
          },
        ]
      : []),
    {
      rel: 'canonical',
      href: `/products/${product?.handle}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions: getSelectedProductOptions(request)},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {product};
}

function loadDeferredData({context, params}: Route.LoaderArgs) {
  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const collection = product.collections.nodes[0] ?? null;
  const eyebrow = [product.vendor, product.productType]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="page-shell product-page">
      <Breadcrumbs
        items={[
          {label: 'Start', to: '/'},
          {label: 'Sortiment', to: '/collections'},
          ...(collection
            ? [
                {
                  label: collection.title,
                  to: `/collections/${collection.handle}`,
                },
              ]
            : []),
          {label: product.title},
        ]}
      />

      <div className="product">
        <div className="product-media-column">
          <ProductImage image={selectedVariant?.image} />
        </div>

        <div className="product-main">
          {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
          <h1>{product.title}</h1>

          <div className="product-price-block">
            <ProductPrice
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
            />
          </div>

          <div className="product-purchase">
            <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            />
          </div>

          <div className="product-information">
            <details open>
              <summary>Produktdetails</summary>
              <div
                className="product-description rich-text"
                dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
              />
            </details>

            <details>
              <summary>Einordnung</summary>
              <dl className="product-facts">
                {product.productType ? (
                  <>
                    <dt>Produktart</dt>
                    <dd>{product.productType}</dd>
                  </>
                ) : null}
                {product.vendor ? (
                  <>
                    <dt>Marke</dt>
                    <dd>{product.vendor}</dd>
                  </>
                ) : null}
                {selectedVariant?.sku ? (
                  <>
                    <dt>SKU</dt>
                    <dd>{selectedVariant.sku}</dd>
                  </>
                ) : null}
              </dl>
            </details>
          </div>
        </div>

        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant?.price.amount || '0',
                vendor: product.vendor,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                quantity: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    productType
    handle
    descriptionHtml
    description
    collections(first: 1) {
      nodes {
        id
        title
        handle
      }
    }
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
