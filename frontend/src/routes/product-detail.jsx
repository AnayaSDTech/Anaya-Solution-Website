import ProductPage from '@/components/product/ProductPage';
import ErrorPage from '@/components/sections/ErrorPage';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { buildMeta, breadcrumbJsonLd, faqJsonLd, notFoundMeta, productJsonLd } from '@/lib/seo';

export function meta({ params }) {
  const product = getProductBySlug(params.productSlug);
  if (!product) return notFoundMeta();
  return buildMeta({
    title: product.seo?.title ?? `${product.name} — ${product.tagline.replace(/\.$/, '')}`,
    description: product.seo?.description ?? product.summary,
    path: `/products/${product.slug}`,
    image: product.media?.ogImage,
    jsonLd: [
      productJsonLd(product),
      breadcrumbJsonLd([
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: product.name, to: `/products/${product.slug}` },
      ]),
      ...(product.faqs?.length ? [faqJsonLd(product.faqs)] : []),
    ],
  });
}

export default function ProductDetail({ params }) {
  const product = getProductBySlug(params.productSlug);
  // Unknown slugs are served the static 404.html by the host; render the same
  // not-found content inside the layout so the markup matches on hydration.
  if (!product) return <ErrorPage title="Page not found" message="The page you're looking for doesn't exist or has moved." />;
  return <ProductPage key={product.slug} product={product} related={getRelatedProducts(product)} />;
}
