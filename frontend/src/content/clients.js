// [TEMPORARY] Client logos carried over from the current anaya.uk home page at
// ANAYA's request. Confirm each relationship and logo permission, then keep,
// replace, or switch off with site.features.clientsSection.

export const clientsSection = {
  eyebrow: 'Clients',
  title: 'Our Clients', // [VERIFIED] current site heading
};

export const clients = [
  // The PNG has generous built-in padding, so it is allowed to render taller.
  { name: 'Lloyds Bank', logo: { src: '/images/clients/lloyds-bank.png', width: 500, height: 281, maxHeight: 64 }, temporary: true },
  { name: 'Barclays', logo: { src: '/images/clients/barclays.svg', width: 514, height: 100 }, temporary: true },
  { name: 'Cynergy Bank', logo: { src: '/images/clients/cynergy-bank.svg', width: 540, height: 77 }, temporary: true },
  { name: 'J.P. Morgan', logo: { src: '/images/clients/jp-morgan.svg', width: 360, height: 90 }, temporary: true },
  // A colour-only mark: the single-tone filter would erase it, so keep its original colours.
  { name: 'TSB', logo: { src: '/images/clients/tsb.svg', width: 385, height: 141 }, keepOriginalColours: true, temporary: true },
];
