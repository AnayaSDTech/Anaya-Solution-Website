// [DRAFT] Real product, written from "EchoLoop pitch deck (2).pptx" (Nov 2026).
// Only product facts are used; investor material (market, financials, the round) is left out.
// See docs/09-products.md.
const product = {
  slug: 'echoloop',
  name: 'EchoLoop',
  tagline: 'Every voice heard. Every reply personal. AI-assisted replies at scale, with a person approving every word.',
  summary:
    'AI-assisted replies for creators, agencies and brands: comments grouped by theme, one approved answer, and a personal reply under every comment.',
  domain: 'social',
  technologies: ['social-sentiment', 'ai-ml'],
  status: 'pilot', // deck: "Built, and ready for pilots"
  showStatus: true,
  published: true,
  temporary: false,
  featured: true,
  order: 1,
  icon: 'MessagesSquare',
  visual: 'sentiment',

  media: {
    hero: {
      src: '/images/products/echoloop/command-centre.png',
      alt: 'EchoLoop command centre showing audience mood over time, comment volume by platform, a crisis early-warning gauge and the reply funnel',
      width: 1179,
      height: 860,
    },
  },

  overview: {
    problem:
      'People expect brands to answer them on social media, and quickly. Yet comment volumes keep growing while response rates fall, and today’s tools force a bad choice: shared inboxes that are personal but slow, bots that are fast but generic, or listening dashboards that measure the mood but never reply.',
    approach:
      'EchoLoop reads every comment and groups the ones that make the same point. The team writes or approves one answer per group, grounded in the brand’s own facts, and EchoLoop delivers it as a personal reply under each comment, by name.',
    outcome:
      'Every commenter gets a personal, accurate reply at the speed people expect, a named person stays in control of every word, and the command centre shows whether the mood moved.',
  },

  highlights: [
    { label: 'Platforms', value: 'YouTube, Instagram, Facebook, TikTok, Bluesky and X' },
    { label: 'Approval', value: 'A named person signs off every reply' },
    { label: 'Your data', value: 'Never used to train the AI' },
  ],

  capabilities: [
    { icon: 'Layers', title: 'Comment grouping', description: 'Reads every comment on six platforms, in any language, and groups the ones that make the same point.' },
    { icon: 'FileText', title: 'Grounded drafts', description: 'Drafts one answer per group from the brand’s own facts. Figures that are not in those facts are flagged.' },
    { icon: 'ListChecks', title: 'Named approvals', description: 'Nothing is posted until a named person approves it, and every approval is kept in a tamper-evident audit trail.' },
    { icon: 'MessagesSquare', title: 'Personal replies at scale', description: 'Delivers each approved answer as a personal reply under every comment, by name, paced to each platform’s reply limits.' },
    { icon: 'LayoutDashboard', title: 'Live command centre', description: 'Audience mood, emotions, crisis risk and the reply funnel, across every connected channel, in one view.' },
    { icon: 'Radar', title: 'Crisis early warning', description: 'Change-point detection and cascade modelling flag a real shift in mood before it trends.' },
  ],

  howItWorks: [
    { title: 'Read', description: 'Read every comment on six platforms, in any language.' },
    { title: 'Group', description: 'Group the comments that make the same point.' },
    { title: 'Draft', description: 'Draft one answer per group from the brand’s own facts.' },
    { title: 'Approve', description: 'A named person signs the answer off.' },
    { title: 'Reply', description: 'Reply under each comment, by name, within platform limits.' },
    { title: 'Learn', description: 'See whether the mood moved.' },
  ],

  useCases: [
    { audience: 'Creators and influencers', title: 'Your community answered. Your evenings back.', description: 'Reply personally to every comment without spending every evening in the inbox.' },
    { audience: 'Agencies', title: 'Every client. One calm inbox.', description: 'Manage the comments of many client accounts from one place, with approvals built in.' },
    { audience: 'Brands and marketing teams', title: 'Turn comments into customers.', description: 'Answer the questions people ask under your posts, accurately and in your brand’s voice.' },
    { audience: 'PR and communications teams', title: 'Calm the storm before it trends.', description: 'Spot a real shift in mood early and respond with one approved, consistent answer.' },
  ],

  technologyNotes: {
    'social-sentiment':
      'EchoCore, EchoLoop’s own statistical models: fair voice weighting so bots and repeat posters count less, eight emotions read from words, emoji and reactions, and detection of coordinated bursts of comments.',
    'ai-ml':
      'Language models on open-weight models draft the words; EchoCore’s inspectable statistical models make the decisions, and each result records its model version.',
  },

  security: [
    { title: 'A person approves every reply', description: 'EchoLoop never posts on its own. A named person signs off every answer before it goes out.' },
    { title: 'Tamper-evident audit trail', description: 'Every approval is recorded in an audit trail that shows if a record has been changed.' },
    { title: 'Not trained on your data', description: 'EchoLoop’s AI runs on open-weight models and is never trained on customer data.' },
    { title: 'Isolated and UK-hosted', description: 'Each workspace is isolated in the database, and the service is hosted in the UK.' },
  ],

  deployment: {
    options: ['Cloud service, hosted in the UK', 'Plans per organisation, with team seats included'],
    integrations: ['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Bluesky', 'X'],
    notes: 'Live connections to each platform depend on that platform’s app review.',
  },

  faqs: [
    { question: 'Does EchoLoop post replies automatically?', answer: 'No. EchoLoop groups comments and drafts the answers, but nothing is posted until a named person on your team approves it.' },
    { question: 'Is our data used to train the AI?', answer: 'No. EchoLoop’s AI runs on open-weight models and is never trained on customer data.' },
    { question: 'Can we use our own AI model?', answer: 'Yes. Enterprise customers can bring their own language model.' },
    { question: 'Which platforms does it work with?', answer: 'EchoLoop is built for YouTube, Instagram, Facebook, TikTok, Bluesky and X. Live connections depend on each platform’s app review.' },
  ],

  seo: { title: 'EchoLoop — AI-assisted replies to every comment' },
  cta: { demo: false },
  lastReviewed: '2026-11-21',
  contentOwner: 'TBC (product owner)', // internal only, not rendered
};

export default product;
