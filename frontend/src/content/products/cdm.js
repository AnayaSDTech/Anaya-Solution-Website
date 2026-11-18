// [DRAFT] Real product, written from the CDM project (requirements, architecture docs and codebase).
// Every statement below is backed by the code or the architecture documents. See docs/09-products.md.
const product = {
  slug: 'cdm',
  name: 'ANAYA CDM',
  tagline: 'Certificate Deployment Manager: find, renew and deploy TLS certificates across your servers automatically.',
  summary:
    'Automated TLS certificate lifecycle management: discovers certificates on Windows, Linux and Java servers, renews them before expiry and deploys them safely with rollback.',
  domain: 'security-trust',
  technologies: ['pki', 'cybersecurity'],
  status: 'in-development', // working pipeline, tested in a lab environment; confirm before changing
  showStatus: true,
  published: true,
  temporary: false,
  featured: true,
  order: 2,
  icon: 'KeyRound',
  visual: 'key',

  overview: {
    problem:
      'Expired TLS certificates cause outages. In many organisations renewals are manual, certificates are spread across many servers and teams, server credentials live in scattered places, and there is no reliable record of what changed.',
    approach:
      'CDM (Certificate Deployment Manager) logs in to each server, reads the certificate on every managed HTTPS binding, obtains a replacement when it falls due, and installs it through a controlled pipeline that backs up, verifies and rolls back on failure.',
    outcome:
      'Certificates are renewed before they expire, deployments are verified on the live endpoint, and every action is recorded in a tamper-evident audit log.',
  },

  highlights: [
    { label: 'Platforms', value: 'Windows (IIS, certificate store), Linux (Apache, Nginx), Java keystores' },
    { label: 'Certificate types', value: 'DV, OV and EV through the same pipeline' },
    { label: 'Credentials', value: 'Fetched from CyberArk at run time, held in memory only' },
  ],

  capabilities: [
    { icon: 'Search', title: 'Certificate discovery', description: 'Connects to servers over WinRM or SSH and reads the certificate behind each HTTPS binding, plus a read-only scan to find what to enrol.' },
    { icon: 'RefreshCw', title: 'Automated renewal', description: 'Requests replacement certificates through ACME (Let’s Encrypt) when they fall inside the renewal window, or takes OV and EV certificates from an approved folder.' },
    { icon: 'ListChecks', title: 'Safe matching', description: 'Only deploys a replacement with the same identity and a later expiry, never downgrades EV or OV, and sends ambiguous cases to a review queue.' },
    { icon: 'Server', title: 'Multi-platform deployment', description: 'Installs certificates on IIS, the Windows certificate store, Apache and Nginx, and Java keystores, starting with a canary before parallel batches.' },
    { icon: 'RotateCcw', title: 'Verification and rollback', description: 'Checks the new certificate inside the server and with a live TLS probe. If anything fails after install, the previous certificate is restored and verified.' },
    { icon: 'ScrollText', title: 'Audit trail and dashboard', description: 'Every discovery, renewal and deployment is logged in a hash-chained audit log, with a web dashboard for certificates, servers and errors.' },
  ],

  howItWorks: [
    { title: 'Discover', description: 'Log in to each server and read the certificate currently deployed on every managed binding.' },
    { title: 'Obtain and match', description: 'Get a replacement for each certificate that is due, and check it matches the binding’s identity with a later expiry.' },
    { title: 'Plan and deploy', description: 'Create deployment jobs, then back up, install, activate and verify on each server, rolling back on failure.' },
    { title: 'Confirm and retire', description: 'Log in again to confirm the new certificate is live, then remove the old one after the rollback window.' },
  ],

  useCases: [
    { audience: 'Infrastructure teams', title: 'No more expiry outages', description: 'Renew certificates across Windows, Linux and Java estates before they expire, without manual installs.' },
    { audience: 'Security teams', title: 'Credentials stay in the vault', description: 'Server credentials are fetched from CyberArk when needed and are never stored in files or code.' },
    { audience: 'Compliance teams', title: 'A complete change record', description: 'Show who changed which certificate, when and with what result, from a tamper-evident audit log.' },
  ],

  technologyNotes: {
    pki: 'Manages the full TLS certificate lifecycle: discovery, renewal through ACME or an approved source, matching, deployment, confirmation and retirement.',
    cybersecurity: 'Privileged credentials come from CyberArk at run time, private keys are never written to state files, and the Linux adapter accepts data only, never commands.',
  },

  security: [
    { title: 'Vaulted credentials', description: 'Server logins are fetched from CyberArk by alias and kept in memory only for the run.' },
    { title: 'Keys kept out of storage', description: 'State files hold certificate identity, never private keys. Certificate bundles exist in memory and as a short-lived file on the target, deleted after install.' },
    { title: 'Restricted server access', description: 'On Linux, CDM runs through a single, tightly validated script that accepts whitelisted data only, with fixed service commands and allowed certificate paths.' },
    { title: 'Tamper-evident audit log', description: 'Each action is appended to a hash-chained log, so any later change to the record can be detected.' },
  ],

  deployment: {
    options: ['Runs as a scheduled orchestrator on a Windows or Linux host', 'Web dashboard for certificates, servers, errors and configuration'],
    integrations: ['CyberArk (credentials)', 'ACME / Let’s Encrypt (certificate issuance)', 'WinRM and SSH (server access)'],
    notes:
      'New certificate sources, such as a commercial or internal CA, and new server technologies are added as adapters behind a common interface.',
  },

  faqs: [
    { question: 'Which servers does CDM support?', answer: 'Windows servers running IIS or using the Windows certificate store, Linux servers running Apache or Nginx, and Java applications using JKS or PKCS#12 keystores.' },
    { question: 'Does CDM handle OV and EV certificates?', answer: 'Yes. DV certificates can be issued automatically through ACME. OV and EV certificates are approved through your certificate authority as usual, then CDM deploys them through the same pipeline.' },
    { question: 'What happens if a deployment fails?', answer: 'If a step fails before installation, the server is left untouched. If it fails after installation, CDM restores the previous certificate and verifies it, and records the outcome in the audit log.' },
  ],

  related: ['open-banking'],
  cta: { demo: false },
  lastReviewed: '2026-11-18',
  contentOwner: 'TBC (product owner)', // internal only, not rendered
};

export default product;
