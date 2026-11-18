// Page-level copy. Labels: [VERIFIED] from anaya.uk · [DRAFT] new wording for approval.
// Rich text titles: arrays of strings and { highlight } segments.

export const home = {
  hero: {
    eyebrow: 'AI products · Financial · Social', // [DRAFT]
    title: ['AI products for ', { highlight: 'financial and social intelligence' }, '.'], // [DRAFT]
    lead: 'ANAYA Solutions builds AI-powered products for the financial and social domains, combining machine learning, cybersecurity and public key infrastructure.', // [DRAFT]
    primaryCta: { label: 'Explore products', to: '/products' },
    secondaryCta: { label: 'Talk to us', to: '/contact' },
  },
  products: {
    eyebrow: 'Products',
    title: 'Our products',
    lead: 'Products for financial services and for security and trust, built to the standards these domains demand.', // [DRAFT]
  },
  domains: {
    eyebrow: 'Where we work',
    title: 'Built for domains where accuracy matters',
  },
  technology: {
    eyebrow: 'Technology',
    title: 'The technology behind our products',
    lead: 'Six technology areas, one aim: AI that people can rely on.',
  },
  approach: {
    eyebrow: 'Our approach',
    title: 'How we build',
    lead: 'The ANAYA name is new; our expertise is seasoned and proven.', // [VERIFIED — re-edit]
    items: [
      // [VERIFIED — re-edited from the current "Core Commitments" and "Expertise & Vision"]
      { icon: 'HeartHandshake', title: 'Human-centred technology', description: 'We believe technology should be a force for human progress, so we put people first in everything we build.' },
      { icon: 'ShieldCheck', title: 'Built with integrity', description: 'We work with transparency and high ethical standards, earning trust through what we deliver.' },
      { icon: 'Leaf', title: 'Sustainable progress', description: 'We build solutions that adapt and scale as needs change, rather than quick fixes.' },
      { icon: 'Award', title: 'Experienced team', description: 'Our team brings years of collective experience to every product, from day one.' },
    ],
  },
  cta: {
    title: "Let's talk about what our products can do for you.",
    lead: 'Tell us about your organisation and the challenge you want to solve.',
  },
};

export const productsPage = {
  hero: {
    eyebrow: 'Products',
    title: ['Products for ', { highlight: 'finance, security and trust' }], // [DRAFT]
    lead: 'Explore our products by domain or by the technology behind them.',
  },
  cta: { title: 'Not sure which product fits?', lead: 'Talk to us and we will point you in the right direction.' },
};

export const about = {
  hero: {
    eyebrow: 'About',
    title: ['An AI product company with a ', { highlight: 'human purpose' }],
    lead: 'We build smart, scalable and secure AI products for the financial and social domains.',
  },
  whoWeAre: {
    eyebrow: 'Who we are',
    title: 'A seamless extension of your team',
    body: [
      // [VERIFIED — re-edited from "Who We Are"]
      'ANAYA Solutions develops AI-powered products in the financial and social domains. We work alongside our customers as a seamless extension of their team, delivering solutions that are smart, scalable and secure.',
      // [VERIFIED — re-edited from "Our Story & Purpose"]
      'ANAYA was founded on a simple observation: organisations have great potential, but often lack the right technology partner to unlock it. We set out to be that partner.',
    ],
  },
  purpose: {
    eyebrow: 'Our purpose',
    statement: 'More than technology: we believe in empowered potential. Technology should be a force for human progress.', // [VERIFIED — re-edit]
  },
  values: {
    eyebrow: 'Our values',
    title: 'What we stand for',
    items: [
      // [VERIFIED]
      { icon: 'Handshake', title: 'Strategic Partnership', description: 'We listen first and work as one team with the people we serve.' },
      { icon: 'Award', title: 'Uncompromising Excellence', description: 'We hold our products and our work to a high standard.' },
      { icon: 'Lightbulb', title: 'Collaborative Innovation', description: 'The best ideas come from working together.' },
      { icon: 'ShieldCheck', title: 'Integrity & Trust', description: 'We are transparent, ethical and honest in everything we do.' },
    ],
  },
  foundation: {
    eyebrow: 'Our foundation',
    title: 'Expertise you can trust',
    items: [
      // [VERIFIED]
      { icon: 'Users', title: 'Decades of Collective Experience', description: 'Our team brings decades of combined experience across technology and industry.' },
      { icon: 'Network', title: 'Dedicated Teams of Experts', description: 'Senior strategists, lead architects and passionate engineers.' },
      { icon: 'GraduationCap', title: 'A Culture of Continuous Learning', description: 'We invest in learning and certification in current technologies.' },
    ],
  },
  cta: { title: "Feel like we'd be a good fit?", lead: "Let's start a conversation." }, // [VERIFIED]
};

export const careers = {
  hero: {
    eyebrow: 'Careers',
    title: ["Build what's next, ", { highlight: 'build your career' }], // [VERIFIED]
    lead: 'Join a team building AI products for the financial and social domains.',
  },
  whyJoin: {
    eyebrow: 'Why join ANAYA',
    title: 'More than a job: a partnership in growth', // [VERIFIED]
    items: [
      // [VERIFIED]
      { icon: 'Rocket', title: 'Work on Cutting-Edge Technology', description: 'Build AI products across machine learning, cybersecurity and PKI.' },
      { icon: 'GraduationCap', title: 'Continuous Learning & Development', description: 'Dedicated time and budget for certifications, conferences and courses.' },
      { icon: 'Users', title: 'A Culture of Collaboration', description: 'A flat, transparent organisation where every voice counts.' },
      { icon: 'Target', title: 'Impact from Day One', description: 'Your work makes a visible difference from the start.' },
    ],
  },
  values: {
    eyebrow: 'Our values',
    title: 'How we work together',
    items: [
      // [VERIFIED]
      { icon: 'Lightbulb', title: 'Innovation with Purpose', description: 'We innovate to solve real problems for real people.' },
      { icon: 'Award', title: 'Excellence as Standard', description: 'We take pride in doing things well.' },
      { icon: 'Handshake', title: 'Collaborative Integrity', description: 'We are honest with each other and succeed together.' },
      { icon: 'TrendingUp', title: 'Driven to Grow', description: 'We keep learning, as individuals and as a company.' },
    ],
  },
  process: {
    eyebrow: 'Hiring process',
    title: 'What to expect',
    steps: [
      // [VERIFIED]
      { title: 'Application Review', description: 'We read every application carefully.' },
      { title: 'Screening Call', description: 'A 20–30 minute conversation with our HR team.' },
      { title: 'Technical Assessment', description: 'A practical challenge related to the role.' },
      { title: 'Team Interview', description: 'Meet the team, virtually or in person.' },
      { title: 'Offer', description: 'If we are a match, we make you an offer.' },
    ],
  },
  roles: {
    eyebrow: 'Open roles',
    title: 'Join the team',
    empty: "We don't have open roles right now, but we'd still like to hear from you. Send your CV and a short note to",
  },
  cta: { title: 'Ready to build the future with us?', lead: 'Get in touch and tell us about yourself.' }, // [VERIFIED]
};

export const contact = {
  hero: {
    eyebrow: 'Contact',
    title: ["Let's start a ", { highlight: 'conversation' }], // [VERIFIED]
    lead: 'Have a challenge to solve or an idea to explore? Reach out to us. Our team is ready to partner with you and build the future.', // [VERIFIED]
  },
  privacyLine: 'We respect your privacy and will never share your information with third parties.', // [VERIFIED]
  enquiryTypes: ['Product enquiry', 'Partnership', 'Careers', 'Other'],
};
