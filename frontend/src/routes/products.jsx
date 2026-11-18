import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import ProductExplorer from '@/components/product/ProductExplorer';
import { TechAreaStrip } from '@/components/technology/TechArea';
import SectionHeader from '@/components/sections/SectionHeader';
import CtaBand from '@/components/sections/CtaBand';
import { productsPage } from '@/content/pages';
import { getPublishedProducts } from '@/lib/products';
import { buildMeta, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/content/site';

export function meta() {
  const products = getPublishedProducts();
  return buildMeta({
    title: 'Products',
    description: 'AI-powered products from ANAYA Solutions for the financial and social domains, and for security and trust.',
    path: '/products',
    jsonLd: [
      breadcrumbJsonLd([
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${site.url}/products/${p.slug}`,
          name: p.name,
        })),
      },
    ],
  });
}

export default function Products() {
  const products = getPublishedProducts();
  return (
    <>
      <PageHero {...productsPage.hero} size="compact" />
      <Section>
        <ProductExplorer products={products} />
      </Section>
      <Section alt padding="compact" labelledBy="products-tech-title">
        <SectionHeader eyebrow="Browse by technology" title="The technology behind them" id="products-tech-title" />
        <TechAreaStrip />
      </Section>
      <CtaBand {...productsPage.cta} />
    </>
  );
}
