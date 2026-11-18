// [VERIFIED] from the current anaya.uk Services page. Only published when
// site.features.servicesPage is true (decision D2).

export const servicesPage = {
  hero: {
    eyebrow: 'Services',
    title: ['Engineering and ', { highlight: 'advisory services' }],
    lead: 'Alongside our products, our team offers engineering and advisory services.',
  },
  approach: [
    { icon: 'Workflow', title: 'Agile & DevOps Practices', description: 'Iterative sprints and continuous feedback, so value is delivered early and often.' },
    { icon: 'Lightbulb', title: 'Design Thinking', description: 'We start from the needs of the people who will use what we build.' },
    { icon: 'Compass', title: 'Strategic IT Consulting', description: 'Strategy before code, with a roadmap built to last.' },
  ],
  cta: { title: 'Have a specific challenge in mind?', lead: 'Tell us about it and we will get back to you.' },
};

export const services = [
  {
    slug: 'ai-data-strategy',
    icon: 'BrainCircuit',
    title: 'AI & Data Strategy',
    deliver: [
      'Custom Machine Learning Model Development',
      'Predictive Analytics & Data Visualisation Dashboards',
      'NLP & Computer Vision Solutions',
      'AI Roadmapping & Data Maturity Assessment',
    ],
    idealFor: 'Businesses that want to automate manual processes, make data-driven decisions or build intelligent product features.',
  },
  {
    slug: 'custom-software-development',
    icon: 'Code',
    title: 'Custom Software Development',
    deliver: [
      'Enterprise Web Application Development',
      'Native & Cross-Platform Mobile Apps',
      'Modernisation of Legacy Systems',
      'Full-Cycle Product Development (Discovery to Deployment)',
    ],
    idealFor: 'Organisations that need tailored software, and start-ups building an MVP.',
  },
  {
    slug: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud & DevOps Transformation',
    deliver: [
      'Cloud Migration Strategy & Implementation (AWS, Azure, GCP)',
      'Infrastructure as Code & Automation',
      'CI/CD Pipeline Design & Implementation',
      'Containerisation & Microservices Architecture',
    ],
    idealFor: 'Companies with slow release cycles, high infrastructure costs, or weak scalability or disaster recovery.',
  },
];
