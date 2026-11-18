// Technology page content, one entry per technology area (keyed by taxonomy slug).
// Capability lists for AI & ML and Cybersecurity are [VERIFIED] from the current
// anaya.uk Expertise page. Summaries are [DRAFT] and need ANAYA approval.

export const technologyPage = {
  hero: {
    eyebrow: 'Technology',
    title: ['The technology behind ', { highlight: "ANAYA's products" }],
    lead: 'Six technology areas underpin our products, from machine learning and natural language processing to cybersecurity and public key infrastructure.',
  },
  cta: {
    title: 'Want to go deeper on the technology?',
    lead: 'Talk to our team about how our products are built.',
  },
};

export const technologyAreas = {
  'ai-ml': {
    summary: 'Machine learning, natural language processing and predictive analytics for products that learn from data.', // [DRAFT]
    description:
      'Artificial intelligence and machine learning sit at the core of our products. We build, deploy and operate models for pattern recognition, language understanding and prediction.',
    capabilities: [
      'Machine Learning (TensorFlow, PyTorch, Scikit-learn)',
      'Natural Language Processing (NLP)',
      'Computer Vision & Predictive Analytics',
      'AI Model Deployment & MLOps',
    ],
  },
  cybersecurity: {
    summary: 'Security engineering and threat detection that protect systems and the data inside them.',
    description:
      'Security is designed into our products from the start, guided by established security frameworks and privacy-by-design principles.',
    capabilities: [
      'Security frameworks (ISO 27001, NIST, CIS Benchmarks)',
      'Cloud Security & Identity Access Management (IAM)',
      'Vulnerability Assessment & Penetration Testing',
      'Data Encryption & Privacy-by-Design (GDPR, CCPA)',
    ],
  },
  pki: {
    summary: 'Certificates, keys and trust chains that secure digital identity and communication.',
    description:
      'Public key infrastructure underpins secure websites, applications and digital signatures. We build products that help organisations manage that trust.',
    capabilities: [],
  },
  'social-sentiment': {
    summary: 'Language models that measure how people feel in public conversation.',
    description:
      'Social sentiment intelligence applies natural language processing to public conversation to understand opinion, topics and how they change over time.',
    capabilities: [],
  },
  'financial-intelligence': {
    summary: 'Analytics that turn financial data into patterns, signals and explainable insight.',
    description:
      'Financial intelligence combines machine learning with financial data to surface patterns, anomalies and risk indicators that support better decisions.',
    capabilities: [],
  },
  'other-ai': {
    summary: 'New AI-powered technologies and products as our portfolio grows.',
    description:
      'Beyond our core areas, we continue to explore and develop other AI-powered technologies and products.',
    capabilities: [],
  },
};

// [VERIFIED] from the current anaya.uk Expertise page — shown as supporting proof.
export const engineeringFoundations = [
  {
    title: 'Cloud & DevOps',
    items: [
      'AWS, Microsoft Azure, Google Cloud Platform',
      'Infrastructure as Code (Terraform, AWS CloudFormation)',
      'CI/CD (Jenkins, GitLab CI, GitHub Actions)',
      'Containerisation (Docker, Kubernetes)',
    ],
  },
  {
    title: 'Advanced Software Development',
    items: [
      'Frontend: React, Angular, Vue.js, TypeScript',
      'Backend: Python (Django/Flask), Node.js, Java Spring Boot, .NET',
      'Mobile: Swift, Kotlin, Flutter',
      'Databases: PostgreSQL, MySQL, MongoDB, DynamoDB',
    ],
  },
  {
    title: 'System Integration & APIs',
    items: [
      'Integration platforms: MuleSoft, Dell Boomi, Apache Kafka',
      'API management: REST, GraphQL, API gateways on AWS/Azure',
      'Data integration: ETL, data warehousing, legacy modernisation',
      'Middleware & messaging: ESB, message queues',
    ],
  },
];
