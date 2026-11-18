import { domains, technologies, statuses } from '@/content/taxonomy';

export const getDomain = (slug) => domains.find((d) => d.slug === slug);
export const getTechnology = (slug) => technologies.find((t) => t.slug === slug);
export const getStatus = (value) => statuses[value];
export { domains, technologies };
