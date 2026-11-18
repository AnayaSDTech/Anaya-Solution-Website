// Content validation — runs before every build (npm run validate).
// Fails on broken or placeholder content in published products; lists temporary
// content and launch blockers. Use `--strict` to make launch blockers fail too.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadAllProducts, root } from './lib/load-content.js';

const strict = process.argv.includes('--strict');
const load = (rel) => import(pathToFileURL(path.join(root, rel)).href);

const { domains, technologies, statuses } = await load('src/content/taxonomy.js');
const { iconNames } = await load('src/icons/registry.js');
const { site } = await load('src/content/site.js');
const { clients } = await load('src/content/clients.js');

const errors = [];
const warnings = [];
const temporary = [];
const blockers = [];

const domainSlugs = domains.map((d) => d.slug);
const techSlugs = technologies.map((t) => t.slug);
const PLACEHOLDER = /\bTBC\b|\bTODO\b|lorem|ipsum|\[DRAFT\]/i;
const INTERNAL_FIELDS = new Set(['contentOwner', '__file']);
const REQUIRED = ['slug', 'name', 'tagline', 'summary', 'domain', 'technologies', 'status', 'icon', 'lastReviewed', 'contentOwner'];

function scanStrings(value, where, report) {
  if (typeof value === 'string') {
    if (PLACEHOLDER.test(value)) report(`${where}: placeholder text "${value.slice(0, 60)}"`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scanStrings(v, `${where}[${i}]`, report));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (!INTERNAL_FIELDS.has(k)) scanStrings(v, `${where}.${k}`, report);
    }
  }
}

function checkIcon(name, where) {
  if (name && !iconNames.includes(name)) errors.push(`${where}: unknown icon "${name}" (add it to src/icons/registry.js)`);
}

function checkImage(src, where) {
  if (src && !existsSync(path.join(root, 'public', src))) errors.push(`${where}: image not found at public${src}`);
}

const products = await loadAllProducts();
const published = products.filter((p) => p.published);
const slugs = new Set();

for (const p of published) {
  const id = `products/${p.__file}`;
  for (const field of REQUIRED) {
    if (p[field] === undefined || p[field] === null || p[field] === '' || (Array.isArray(p[field]) && !p[field].length)) {
      errors.push(`${id}: missing required field "${field}"`);
    }
  }
  if (slugs.has(p.slug)) errors.push(`${id}: duplicate slug "${p.slug}"`);
  slugs.add(p.slug);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug ?? '')) errors.push(`${id}: slug must be lowercase kebab-case`);
  if (!domainSlugs.includes(p.domain)) errors.push(`${id}: unknown domain "${p.domain}"`);
  (p.secondaryDomains ?? []).forEach((d) => !domainSlugs.includes(d) && errors.push(`${id}: unknown secondary domain "${d}"`));
  (p.technologies ?? []).forEach((t) => !techSlugs.includes(t) && errors.push(`${id}: unknown technology "${t}"`));
  if (!statuses[p.status]) errors.push(`${id}: unknown status "${p.status}"`);
  if ((p.tagline ?? '').length > 90) warnings.push(`${id}: tagline is longer than 90 characters`);
  if ((p.summary ?? '').length > 160) warnings.push(`${id}: summary is longer than 160 characters`);

  checkIcon(p.icon, `${id} icon`);
  (p.capabilities ?? []).forEach((c, i) => checkIcon(c.icon, `${id} capabilities[${i}]`));
  checkImage(p.media?.hero?.src, `${id} media.hero`);
  checkImage(p.media?.ogImage, `${id} media.ogImage`);
  (p.media?.gallery ?? []).forEach((g, i) => {
    checkImage(g.src, `${id} gallery[${i}]`);
    if (!g.alt) errors.push(`${id} gallery[${i}]: missing alt text`);
  });

  scanStrings(p, id, (msg) => errors.push(msg));

  if (p.lastReviewed && Date.now() - new Date(p.lastReviewed).getTime() > 365 * 24 * 3600 * 1000) {
    warnings.push(`${id}: content last reviewed more than 12 months ago (${p.lastReviewed})`);
  }
  if (p.temporary) temporary.push(`Product: ${p.name} (${p.__file})`);
  if (!p.temporary && /TBC/.test(p.contentOwner ?? '')) warnings.push(`${id}: contentOwner is still TBC`);
}

for (const p of published) {
  (p.related ?? []).forEach((slug) => !slugs.has(slug) && errors.push(`products/${p.__file}: related product "${slug}" not found`));
}

if (site.features.clientsSection) {
  clients.forEach((c) => {
    checkImage(c.logo?.src, `clients ${c.name}`);
    if (c.temporary) temporary.push(`Client logo: ${c.name}`);
  });
}

if (site.registeredOffice === 'TBC') blockers.push('Registered office address (src/content/site.js → registeredOffice) — UK legal requirement');
if (site.registeredIn === 'TBC') blockers.push('Place of registration (src/content/site.js → registeredIn)');
const { legalDocs } = await load('src/content/legal.js');
for (const [key, doc] of Object.entries(legalDocs)) {
  if (!doc.sections?.length) blockers.push(`Approved legal text for "${doc.title}" (src/content/legal.js → ${key})`);
}

// ---- Report ----
const line = (s = '') => console.log(s);
line(`\nContent validation — ${published.length} published product(s)`);
if (warnings.length) {
  line('\n⚠  Warnings');
  warnings.forEach((w) => line(`   - ${w}`));
}
if (temporary.length) {
  line('\n◆  Temporary content is live (replace when confirmed content is available)');
  temporary.forEach((t) => line(`   - ${t}`));
}
if (blockers.length) {
  line(`\n■  Launch blockers${strict ? '' : ' (not failing the build; run with --strict before launch)'}`);
  blockers.forEach((b) => line(`   - ${b}`));
}
if (errors.length) {
  line('\n✖  Errors');
  errors.forEach((e) => line(`   - ${e}`));
}

if (errors.length || (strict && blockers.length)) {
  line('\nValidation failed.\n');
  process.exit(1);
}
line('\n✔  Validation passed.\n');
