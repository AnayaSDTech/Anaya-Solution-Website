// Copy this file to {slug}.js and replace every TBC value.
// Files starting with "_" are ignored. See docs/05-product-presentation-strategy.md §5 and §9.
// The validator fails the build if "TBC" remains in a published product's visible fields.

const product = {
  slug: 'TBC-product-slug',
  name: 'TBC Product name',
  tagline: 'TBC One-line value proposition (max 90 characters)',
  summary: 'TBC Short description for cards and search results (max 160 characters)',
  domain: 'financial', // financial | social | security-trust
  secondaryDomains: [],
  technologies: ['ai-ml'], // see src/content/taxonomy.js
  status: 'in-development', // MUST be confirmed by ANAYA
  showStatus: true,
  published: false, // set true only after content approval
  temporary: false,
  featured: false,
  order: 100,
  icon: 'Sparkles',
  visual: 'signal', // finance | sentiment | key | radar | signal

  overview: { problem: 'TBC', approach: 'TBC', outcome: 'TBC' },
  highlights: [], // { label, value } — verifiable values only
  capabilities: [], // { icon, title, description }
  howItWorks: [], // { title, description }
  useCases: [], // { audience, title, description }
  technologyNotes: {}, // { [techSlug]: string }
  security: [], // { title, description } — verified statements only
  deployment: null, // { options: [], integrations: [], notes }
  faqs: [], // { question, answer }
  related: [], // slugs
  cta: { demo: false },
  externalUrl: null,
  redirectFrom: [],
  seo: {},

  lastReviewed: '2026-11-16',
  contentOwner: 'TBC (role)',
};

export default product;
