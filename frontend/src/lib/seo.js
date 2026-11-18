import { site, isSupplied } from '@/content/site';
import { isTestCopy } from '@/lib/base';

const SITE_NAME = site.name;

/**
 * Build the React Router `meta` array for a page.
 * @param {{ title: string, description?: string, path?: string, image?: string,
 *           noindex?: boolean, jsonLd?: object | object[], rawTitle?: boolean }} opts
 */
export function buildMeta({ title, description = site.description, path = '/', image, noindex, jsonLd, rawTitle }) {
  const fullTitle = rawTitle ? title : `${title} | ${SITE_NAME}`;
  const url = `${site.url}${path === '/' ? '' : path}`;
  const meta = [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
  ];
  if (image) {
    meta.push({ property: 'og:image', content: `${site.url}${image}` });
    meta.push({ name: 'twitter:image', content: `${site.url}${image}` });
  }
  // Test copies in a subfolder (e.g. /v2/) must never be indexed
  if (noindex || isTestCopy) meta.push({ name: 'robots', content: 'noindex, nofollow' });
  const ld = [].concat(jsonLd ?? []);
  ld.forEach((item) => meta.push({ 'script:ld+json': item }));
  return meta;
}

export function organizationJsonLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/images/brand/anaya-mark.svg`,
    email: site.email,
    telephone: site.phone.display,
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
  };
  if (isSupplied(site.registeredOffice)) org.address.streetAddress = site.registeredOffice;
  return org;
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${site.url}${item.to === '/' ? '' : item.to}`,
    })),
  };
}

export function productJsonLd(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.summary,
    applicationCategory: 'BusinessApplication',
    url: `${site.url}/products/${product.slug}`,
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  };
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Meta for not-found pages. Identical everywhere so it matches the static 404.html. */
export const notFoundMeta = () => buildMeta({ title: 'Page not found', path: '/404', noindex: true });
