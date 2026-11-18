import { site } from './site.js';

export const mainNav = [
  { label: 'Products', to: '/products', megaMenu: true },
  { label: 'Technology', to: '/technology' },
  site.features.servicesPage && { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
].filter(Boolean);

export const headerCta = { label: 'Talk to us', to: '/contact' };

export const footerCompany = [
  { label: 'About', to: '/about' },
  { label: 'Technology', to: '/technology' },
  site.features.servicesPage && { label: 'Services', to: '/services' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
].filter(Boolean);

export const footerLegal = [
  { label: 'Privacy', to: '/legal/privacy' },
  { label: 'Cookies', to: '/legal/cookies' },
  { label: 'Terms', to: '/legal/terms' },
  { label: 'Accessibility', to: '/accessibility' },
];
