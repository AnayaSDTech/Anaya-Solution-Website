// "Build with us": ANAYA as a development partner for AI products.
// [DRAFT] New wording for approval. Engagement models confirmed by ANAYA on 2026-11-21
// (no prices, no ownership/equity terms). Capability claims point at products ANAYA has built.

export const buildPage = {
  hero: {
    eyebrow: 'Build with us',
    title: ['Bring your idea. ', { highlight: 'We’ll build the AI product.' }],
    lead: 'We build our own AI products, and we partner with organisations and founders to turn their ideas into working products: from the first prototype to launch and beyond.',
    primaryCta: { label: 'Tell us your idea', to: '/contact?type=build' },
    secondaryCta: { label: 'See what we’ve built', to: '#built-by-anaya' },
  },

  models: {
    eyebrow: 'Ways to work with us',
    title: 'From a first version to a finished product',
    lead: 'Choose the engagement that fits where your idea is today.',
    items: [
      {
        icon: 'Rocket',
        title: 'Idea to MVP',
        description: 'Turn an idea into a first working version you can put in front of real users.',
        includes: ['Discovery to shape the idea and scope', 'Clickable prototype to test early', 'A working first version, ready for real users'],
        bestFor: 'Founders and teams validating a new idea',
      },
      {
        icon: 'Layers',
        title: 'Full product build',
        description: 'Design, build and launch a production product, end to end.',
        includes: ['Product and technical design', 'Build, testing and secure deployment', 'Launch, then ongoing improvement'],
        bestFor: 'Organisations ready to launch a complete product',
      },
      {
        icon: 'Sparkles',
        title: 'AI features for existing products',
        description: 'Add AI capabilities to a product or system you already run.',
        includes: ['Finding where AI adds real value', 'Models and features built into your stack', 'Responsible AI: human oversight and audit'],
        bestFor: 'Teams adding AI to software they already have',
      },
    ],
  },

  capabilities: {
    eyebrow: 'What we build',
    title: 'The kinds of products we build',
    lead: 'The same expertise behind our own products, applied to yours.',
    items: [
      { icon: 'Sparkles', title: 'Generative AI and language-model apps', description: 'Assistants and drafting tools that keep a person in control, as in EchoLoop.' },
      { icon: 'BrainCircuit', title: 'Machine learning and analytics', description: 'Models that classify, predict and flag what needs attention, with results people can inspect.' },
      { icon: 'MessagesSquare', title: 'Social and sentiment intelligence', description: 'Understanding what audiences say and how they feel, across platforms and languages.' },
      { icon: 'Landmark', title: 'Fintech and Open Banking', description: 'Secure financial products built on regulated APIs, as in ANAYA Open Banking.' },
      { icon: 'KeyRound', title: 'Security, PKI and automation', description: 'Security-critical automation such as certificate lifecycle management, as in ANAYA CDM.' },
      { icon: 'Cloud', title: 'Cloud platforms, web and mobile apps', description: 'The full product around the AI: web and mobile apps, APIs and cloud infrastructure.' },
    ],
  },

  process: {
    eyebrow: 'How we work',
    title: 'From idea to launch, step by step',
    steps: [
      { title: 'Discover', description: 'We get to know your idea, your users and what success looks like.' },
      { title: 'Prototype', description: 'A quick, clickable prototype to test the idea before building it.' },
      { title: 'Build', description: 'Short, iterative cycles with regular demos, so you see progress early.' },
      { title: 'Launch', description: 'Secure deployment and a smooth launch to real users.' },
      { title: 'Evolve', description: 'We keep improving the product as you learn from your users.' },
    ],
  },

  proof: {
    eyebrow: 'Built by ANAYA',
    title: 'Products we’ve built',
    lead: 'The same team, process and standards behind our own products.',
  },

  why: {
    eyebrow: 'Why ANAYA',
    title: 'A partner that builds products, not just code',
    items: [
      { title: 'We build our own products', description: 'We know what it takes to take a product from idea to launch, because we do it ourselves.' },
      { title: 'Security and compliance built in', description: 'Our team has delivered technology programmes in UK banking, so security, governance and compliance are part of how we build from day one.' },
      { title: 'Responsible AI by design', description: 'Human approval, audit trails and clear rules for data are designed in, not added later.' },
      { title: 'A seamless extension of your team', description: 'We work alongside you as one team, with regular demos and open communication.' },
    ],
  },

  cta: {
    title: 'Have an idea? Let’s build it together.',
    lead: 'Tell us what you want to build. We’ll get back to you to talk it through.',
  },
};

/** Short version for the home page. */
export const buildTeaser = {
  eyebrow: 'Build with us',
  title: 'Have an idea? We’ll build it with you.',
  lead: 'Beyond our own products, we partner with organisations and founders to turn ideas into AI products.',
  cta: { label: 'Build with us', to: '/build-with-us' },
};
