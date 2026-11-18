// Product taxonomy. Adding a domain or technology area here makes it
// available to filters, menus and pages automatically.

export const domains = [
  {
    slug: 'financial',
    label: 'Financial',
    icon: 'LineChart',
    description:
      'Intelligence for financial data, risk and decision-making, where accuracy and explainability matter.', // [DRAFT]
  },
  {
    slug: 'social',
    label: 'Social',
    icon: 'MessagesSquare',
    description:
      'Understanding public conversation and sentiment, so organisations can see how people feel and respond sooner.', // [DRAFT]
  },
  {
    slug: 'security-trust',
    label: 'Security & Trust',
    icon: 'ShieldCheck',
    description:
      'Cybersecurity and public key infrastructure products that protect systems, data and digital identity.', // [DRAFT]
  },
];

export const technologies = [
  { slug: 'ai-ml', label: 'Artificial Intelligence & Machine Learning', short: 'AI & ML', icon: 'BrainCircuit' },
  { slug: 'cybersecurity', label: 'Cybersecurity', short: 'Cybersecurity', icon: 'ShieldCheck' },
  { slug: 'pki', label: 'Public Key Infrastructure', short: 'PKI', icon: 'KeyRound' },
  { slug: 'social-sentiment', label: 'Social Sentiment Intelligence', short: 'Social Sentiment', icon: 'MessagesSquare' },
  { slug: 'financial-intelligence', label: 'Financial Intelligence', short: 'Financial Intelligence', icon: 'LineChart' },
  { slug: 'other-ai', label: 'Other AI-powered Technologies', short: 'Other AI', icon: 'Sparkles' },
];

export const statuses = {
  available: { label: 'Available', tone: 'success' },
  pilot: { label: 'Pilot', tone: 'warning' },
  beta: { label: 'Beta', tone: 'warning' },
  'in-development': { label: 'In development', tone: 'info' },
  'coming-soon': { label: 'Coming soon', tone: 'info' },
};
