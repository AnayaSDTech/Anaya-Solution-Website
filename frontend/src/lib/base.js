// Base path helpers. BASE_URL is "/" for the live site, or e.g. "/v2/" for a
// test copy built with SITE_BASE=/v2/. Use withBase() for any raw href/src
// (images, plain <a> links). React Router <Link>s add the base automatically.
export const BASE_URL = import.meta.env.BASE_URL || '/';

/** "/images/x.svg" -> "/v2/images/x.svg" in a subfolder build. External URLs are untouched. */
export const withBase = (path) =>
  !path || /^(https?:|mailto:|tel:|#|data:)/.test(path) ? path : `${BASE_URL}${String(path).replace(/^\/+/, '')}`;

/** True for a subfolder test copy: pages are marked noindex. */
export const isTestCopy = BASE_URL !== '/';
