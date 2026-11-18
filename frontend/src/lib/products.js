// Product selectors. Components never read product files directly.
const modules = import.meta.glob('../content/products/[!_]*.js', { eager: true });

const allProducts = Object.values(modules).map((m) => m.default);

const byOrder = (a, b) => (a.order ?? 100) - (b.order ?? 100) || a.name.localeCompare(b.name);

const published = allProducts.filter((p) => p.published).sort(byOrder);

export const getPublishedProducts = () => published;

export const getProductBySlug = (slug) => published.find((p) => p.slug === slug);

export const getFeaturedProducts = (n = 4) => published.filter((p) => p.featured).slice(0, n);

export const getProductsByDomain = (domain, { includeSecondary = true } = {}) =>
  published.filter(
    (p) => p.domain === domain || (includeSecondary && p.secondaryDomains?.includes(domain)),
  );

export const getProductsByTechnology = (tech) =>
  published.filter((p) => p.technologies.includes(tech));

export function getRelatedProducts(product, n = 3) {
  const others = published.filter((p) => p.slug !== product.slug);
  if (product.related?.length) {
    return product.related.map((slug) => others.find((p) => p.slug === slug)).filter(Boolean).slice(0, n);
  }
  const score = (p) =>
    (p.domain === product.domain ? 2 : 0) +
    p.technologies.filter((t) => product.technologies.includes(t)).length;
  return [...others].sort((a, b) => score(b) - score(a) || byOrder(a, b)).slice(0, n);
}

/** Sections that will render on the product page — drives the sticky sub-nav. */
export function getRenderedSections(product) {
  const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v));
  const deployment = product.deployment;
  return [
    has(product.overview) && { id: 'overview', label: 'Overview' },
    has(product.capabilities) && { id: 'capabilities', label: 'Capabilities' },
    product.howItWorks?.length >= 2 && { id: 'how-it-works', label: 'How it works' },
    has(product.useCases) && { id: 'use-cases', label: 'Use cases' },
    { id: 'technology', label: 'Technology' },
    has(product.security) && { id: 'security', label: 'Security' },
    deployment && (has(deployment.options) || has(deployment.integrations) || deployment.notes) && {
      id: 'deployment',
      label: 'Deployment',
    },
    has(product.media?.gallery) && { id: 'gallery', label: 'Gallery' },
    has(product.faqs) && { id: 'faq', label: 'FAQ' },
  ].filter(Boolean);
}
