import { loadPublishedProducts } from './scripts/lib/load-content.js';
import { siteBase } from './scripts/lib/base.js';
import { site } from './src/content/site.js';

/**
 * Static build: every route is pre-rendered to HTML at build time (no server).
 * See docs/06-technical-architecture.md (ADR-01).
 */
export default {
  appDirectory: 'src',
  ssr: false,
  basename: siteBase,
  async prerender() {
    const paths = [
      '/',
      '/products',
      '/build-with-us',
      '/technology',
      '/about',
      '/careers',
      '/contact',
      '/legal/privacy',
      '/legal/cookies',
      '/legal/terms',
      '/accessibility',
      '/404',
    ];
    if (site.features.servicesPage) paths.push('/services');
    const products = await loadPublishedProducts();
    return [...paths, ...products.map((p) => `/products/${p.slug}`)];
  },
};
