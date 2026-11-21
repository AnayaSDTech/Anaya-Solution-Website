// [DRAFT] Real product, written from the Open Banking project (BRD, FRS and codebase).
// Every statement below is backed by the code or the requirements documents. See docs/09-products.md.
const product = {
  slug: 'open-banking',
  name: 'ANAYA Open Banking',
  tagline: 'Connect bank accounts and initiate payments through UK Open Banking, without ever touching a password.',
  summary:
    'A UK Open Banking platform for account information and payment initiation, with bank-hosted consent, a consent dashboard and a tamper-evident audit trail.',
  domain: 'financial',
  secondaryDomains: ['security-trust'],
  technologies: ['financial-intelligence', 'cybersecurity', 'pki'],
  status: 'in-development', // integrated with bank sandbox environments; confirm before changing
  showStatus: true,
  published: true,
  temporary: false,
  featured: true,
  order: 2,
  icon: 'Landmark',
  visual: 'finance',

  overview: {
    problem:
      'People and businesses hold accounts with several banks, and moving money usually means logging in to each one. Older aggregation methods asked customers to hand over their bank login details, which is insecure and no longer acceptable under UK rules.',
    approach:
      'ANAYA Open Banking connects to banks through their official UK Open Banking APIs. Customers sign in and approve access on their own bank’s website; the platform only receives a time-limited token, never their credentials.',
    outcome:
      'Customers see their accounts in one place and can pay directly from their bank account, while the operator keeps a clear, auditable record of every consent and payment.',
  },

  highlights: [
    { label: 'Services', value: 'Account information (AIS) and payment initiation (PIS)' },
    { label: 'Banks connected', value: 'RBS and NatWest (sandbox)' },
    { label: 'Bank credentials stored', value: 'None. Login and approval happen on the bank’s own site' },
  ],

  capabilities: [
    { icon: 'Landmark', title: 'Account information', description: 'Retrieves accounts, balances and transactions from linked banks and brings them together in one dashboard.' },
    { icon: 'CreditCard', title: 'Payment initiation', description: 'Starts domestic single immediate payments from a linked account. The customer approves each payment with their bank, and the platform tracks its status.' },
    { icon: 'ListChecks', title: 'Consent dashboard', description: 'Shows every active and expired consent per bank, with one-click revoke and re-authentication when consent expires.' },
    { icon: 'Lock', title: 'Secure token handling', description: 'Bank access and refresh tokens are exchanged server-side and stored encrypted. They are never sent to the browser.' },
    { icon: 'ScrollText', title: 'Tamper-evident audit trail', description: 'Each consent and payment event is recorded in a hash-chained log, so any later change to a record can be detected.' },
    { icon: 'Activity', title: 'API monitoring', description: 'Tracks bank API calls and errors per bank, to support operations and reporting.' },
  ],

  howItWorks: [
    { title: 'Choose a bank', description: 'The customer picks the bank they want to link or pay from.' },
    { title: 'Approve at the bank', description: 'They are redirected to their bank’s own login page, complete strong customer authentication and approve exactly what is being shared or paid.' },
    { title: 'Secure exchange', description: 'The bank returns an authorisation code, which the platform exchanges server-side for an access token using OAuth 2.0 with PKCE.' },
    { title: 'Use and manage', description: 'Account data and payment status are retrieved from the bank, and the customer can review or revoke consent at any time.' },
  ],

  useCases: [
    { audience: 'Customers', title: 'All accounts in one view', description: 'See balances and transactions from different banks together, without sharing a password with anyone but the bank.' },
    { audience: 'Businesses', title: 'Pay by bank', description: 'Take payments directly from a customer’s bank account, approved by the customer in their own banking journey.' },
    { audience: 'Compliance teams', title: 'Evidence on demand', description: 'Review the full history of consents and payment attempts from a tamper-evident audit log.' },
  ],

  technologyNotes: {
    'financial-intelligence': 'Brings account, balance and transaction data from multiple banks into one consistent model.',
    cybersecurity: 'Redirect-only bank authentication, encrypted token storage and a hash-chained audit log.',
    pki: 'Supports mutual TLS with transport certificates and signed (JWS) requests, as the UK Open Banking security profile requires.',
  },

  security: [
    { title: 'No credential handling', description: 'The platform never sees, stores or submits a customer’s bank login. Authentication and strong customer authentication are performed by the bank.' },
    { title: 'OAuth 2.0 with PKCE', description: 'Authorisation uses the code flow with PKCE and a validated state parameter. Token exchange happens server-to-server, never in the browser.' },
    { title: 'Encrypted tokens', description: 'Bank access and refresh tokens are encrypted at rest, refreshed server-side and never exposed to the browser.' },
    { title: 'Customer control', description: 'Consents are scoped and time-limited, and customers can revoke them at any time from the consent dashboard.' },
  ],

  deployment: {
    integrations: ['UK Open Banking APIs: NatWest Group (RBS, NatWest) sandbox', 'Further banks through a common connector interface'],
    notes:
      'Each bank is added as a connector that implements one standard interface, so new banks can be onboarded without changing the core platform. Live operation requires FCA authorisation as an account information and payment initiation provider (or acting as an agent of an authorised firm) and Open Banking directory registration.',
  },

  faqs: [
    { question: 'Does the platform ever ask for my bank password?', answer: 'No. You always sign in on your bank’s own website or app. The platform only receives a token that your bank issues after you approve access.' },
    { question: 'Which banks are supported?', answer: 'The platform is currently integrated with the RBS and NatWest Open Banking sandbox environments. It is built so that other UK Open Banking banks can be added as connectors.' },
    { question: 'Can I stop sharing my data?', answer: 'Yes. You can revoke any consent from the consent dashboard at any time, and the platform also asks you to re-authorise when a consent expires.' },
  ],

  related: ['cdm'],
  cta: { demo: false },
  lastReviewed: '2026-11-18',
  contentOwner: 'TBC (product owner)', // internal only, not rendered
};

export default product;
