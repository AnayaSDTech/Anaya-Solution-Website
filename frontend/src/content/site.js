// Company facts used across the site. Single source of truth.
// Labels: [VERIFIED] from anaya.uk / ANAYA brief · [TBC] to be supplied by ANAYA.

export const site = {
  name: 'ANAYA Solutions',
  legalName: 'ANAYASD LIMITED', // [VERIFIED]
  companyNumber: '09674951', // [VERIFIED]
  registeredIn: 'TBC', // [TBC] e.g. "England and Wales" — hidden while TBC
  registeredOffice: 'TBC', // [TBC] legally required before launch — hidden while TBC
  location: 'London, United Kingdom', // [VERIFIED]
  email: 'info@anaya.uk', // [VERIFIED] the only address used site-wide
  phone: { display: '+44 7522 405709', href: 'tel:+447522405709' }, // [VERIFIED]
  social: [], // [TBC]
  url: 'https://anaya.uk',
  tagline: 'AI products for financial and social intelligence.', // [DRAFT]
  description:
    'ANAYA Solutions builds AI-powered products for the financial and social domains, combining machine learning, cybersecurity and public key infrastructure.', // [DRAFT]
  features: {
    servicesPage: false, // decision D2 — Services page hidden until confirmed
    demoRequests: false,
    clientsSection: true, // [TEMPORARY] Home client logo strip
  },
};

/** True when a value has been supplied (not empty and not a TBC marker). */
export const isSupplied = (value) => Boolean(value) && value !== 'TBC';
