# 06 — ReactJS Technical Architecture & Folder Structure

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [07 Components](07-component-library.md) · [05 Product data model](05-product-presentation-strategy.md#5-product-data-model)

---

## 1. Architecture summary

```
 Content (plain JS data + Markdown)  ──►  Selectors (src/lib)  ──►  Route modules (src/routes)
                                                                        │
                                       Components (src/components) ◄────┘
                                                                        │
            Vite + React Router (framework mode, ssr:false, prerender)  ▼
                                   Static HTML per route + JS/CSS assets  ──►  Static host / CDN
```

- **Static site, no backend.** The build produces HTML, CSS, JS and images only.
- **Every route is pre-rendered to HTML at build time**, then hydrated into a React app. This gives fast first paint, full SEO and correct link previews, with SPA navigation after load.
- **Content is data.** Pages and components never contain business copy; they read it from `src/content`.

---

## 2. Technology stack

| Concern | Choice | Notes |
|---|---|---|
| Runtime for tooling | Node.js active LTS | Match the version required by the chosen Vite release; set it in `.nvmrc` and `package.json#engines`. |
| UI | React (current major, 19.x) | Function components and hooks only. |
| Build / dev server | Vite (current major) | Fast dev server; CSS Modules built in. |
| Routing | React Router v7 (`react-router` + `@react-router/dev`) | Framework mode as a Vite plugin, with `ssr: false` and `prerender`. See ADR-01. |
| Language | JavaScript (ES2022+, ES modules) | JSDoc typedefs for editor hints on content shapes. No TypeScript. |
| Styling | CSS3: custom properties + CSS Modules | No CSS-in-JS, no Tailwind. See ADR-03. |
| Icons | `lucide-react` | Imported individually (tree-shaken) through an icon registry. |
| Animation | Framer Motion, installed as `motion` (`import { motion } from 'motion/react'`) | `motion` is the current package name of Framer Motion. Do not install both `motion` and `framer-motion`. |
| Fonts | `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (or variable versions) | Self-hosted. |
| Markdown (legal pages) | `marked` or `react-markdown`, run at build time in the loader | Only for trusted, repository-stored Markdown. |
| Linting / formatting | ESLint (flat config) with `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`; Prettier | Enforced in CI. |
| Testing | Vitest + React Testing Library; Playwright for smoke and accessibility tests (`@axe-core/playwright`) | See §14. |

**Versions:** pin exact versions in `package.json` when scaffolding (no `^` ranges for React, React Router, Vite and `motion`) and commit the lockfile. Upgrade deliberately.

---

## 3. Key architecture decisions

### ADR-01 — React Router framework mode with static pre-rendering

- **Context:** A plain client-side SPA serves one empty `index.html` for every URL. LinkedIn, X and Slack link previews do not run JavaScript, so shared product links would show no product title or image. Search engines also index pre-rendered HTML more reliably.
- **Decision:** Use React Router v7 in **framework mode** (its Vite plugin) with `ssr: false` and a `prerender()` list generated from the content. Each route becomes a static `.html` file with its own `<title>` and meta tags. The output is still a static site with no server.
- **Consequences:** Routes are declared in `src/routes.js`; route modules can export `loader` (runs **at build time** only) and `meta`. Code that touches `window` or `document` must run in `useEffect` or be guarded, because pre-rendering runs in Node.
- **Fallback:** If framework mode is rejected, use React Router in data mode (`createBrowserRouter`) as a plain SPA and accept weaker SEO and previews. The folder structure below works for both, with `routes.js` translated to a route object array.

### ADR-02 — Content in JavaScript modules, not JSON or a CMS

- Plain JS allows comments, shared constants and icon names, and is validated by a script.
- A headless CMS can be added later: replace the loaders in `src/lib/` and keep the components unchanged.

### ADR-03 — Plain CSS with tokens + CSS Modules

- Design tokens are global CSS custom properties in `src/styles/tokens.css`.
- Each component has a co-located `Component.module.css` with locally scoped class names.
- Reasons: it meets the "CSS3" requirement, has no runtime cost, and is easy for any front-end developer to maintain.

### ADR-04 — Static contact form with pluggable delivery

See §11.

---

## 4. Folder structure

```
anaya-website/
├── docs/                              ← these documents
├── public/                            ← copied as-is to the build output
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   ├── og/                            ← default Open Graph images (1200×630)
│   ├── images/
│   │   ├── brand/                     ← logo files copied from docs/brand/ (see doc 03 §12)
│   │   ├── clients/                   ← [TEMPORARY] client logo files
│   │   └── products/{slug}/           ← hero.avif/.webp/.png, og.png, gallery-*.webp
│   └── _headers / _redirects          ← host config (generated or hand-written; see §13)
├── scripts/
│   ├── validate-content.js            ← schema + placeholder + image checks (npm run validate)
│   ├── generate-sitemap.js            ← writes build/client/sitemap.xml
│   └── generate-redirects.js          ← merges static redirects + product redirectFrom
├── src/
│   ├── root.jsx                       ← HTML shell (<html>, <head>, <Meta/>, <Links/>), global providers, error boundary
│   ├── routes.js                      ← route table (single source of truth)
│   ├── routes/                        ← one module per route: default component + loader + meta
│   │   ├── home.jsx
│   │   ├── products.jsx
│   │   ├── product-detail.jsx
│   │   ├── technology.jsx
│   │   ├── services.jsx
│   │   ├── about.jsx
│   │   ├── careers.jsx
│   │   ├── contact.jsx
│   │   ├── legal.jsx                  ← one module for all legal pages (by :doc param)
│   │   ├── accessibility.jsx
│   │   └── not-found.jsx
│   ├── layouts/
│   │   ├── SiteLayout.jsx             ← SkipLink + SiteHeader + <Outlet/> + SiteFooter
│   │   └── LegalLayout.jsx
│   ├── components/
│   │   ├── layout/                    ← SiteHeader, SiteFooter, MegaMenu, MobileMenu, Breadcrumbs, SkipLink
│   │   ├── ui/                        ← Button, Link, Icon, Tag, StatusBadge, Card, Container, Section, Eyebrow, ...
│   │   ├── sections/                  ← PageHero, HeroHome, SectionHeader, CtaBand, FeatureGrid, ProcessSteps, ...
│   │   ├── product/                   ← ProductCard, ProductGrid, ProductHero, ProductSubnav, SecurityPanel, ...
│   │   ├── technology/                ← TechAreaCard, TechAreaSection, TechAreaIndex
│   │   ├── forms/                     ← Field, TextInput, Select, Textarea, Checkbox, ContactForm, FormStatus
│   │   ├── media/                     ← ResponsiveImage, WindowFrame, MediaGallery, Lightbox, SignalField
│   │   └── motion/                    ← Reveal, Stagger (wrappers around motion/react)
│   │   (each component lives in its own folder: Button/Button.jsx, Button.module.css, index.js)
│   ├── content/
│   │   ├── site.js                    ← siteConfig: name, legal entity, company no., emails, phone, address, social
│   │   ├── navigation.js              ← header and footer link structure
│   │   ├── taxonomy.js                ← domains + technology areas
│   │   ├── technology.js              ← Technology page content per area
│   │   ├── services.js                ← services (if published)
│   │   ├── roles.js                   ← open roles (may be empty)
│   │   ├── clients.js                 ← [TEMPORARY] client logos: { name, logo: { src, width, height }, temporary: true }
│   │   ├── pages/                     ← home.js, about.js, careers.js, contact.js, products.js (page copy)
│   │   ├── products/                  ← one file per product + _template.js
│   │   ├── legal/                     ← privacy.md, cookies.md, terms.md, accessibility.md
│   │   └── schema.js                  ← JSDoc typedefs + runtime validators for content shapes
│   ├── lib/
│   │   ├── products.js                ← product selectors (getPublishedProducts, getProductBySlug, ...)
│   │   ├── taxonomy.js                ← lookups (getDomain, getTechnology)
│   │   ├── seo.js                     ← buildMeta(), structured-data builders (Organization, Product, Breadcrumb, FAQ)
│   │   ├── contact.js                 ← form submission adapters (mailto, hosted endpoint)
│   │   └── utils.js                   ← classNames, formatters, slug helpers
│   ├── hooks/
│   │   ├── useScrolled.js             ← header state after scroll threshold
│   │   ├── useLockBodyScroll.js
│   │   ├── useFocusTrap.js
│   │   ├── useActiveSection.js        ← scroll-spy for sub-nav and Technology index
│   │   └── useQueryFilters.js         ← syncs product filters with the URL
│   ├── icons/
│   │   └── registry.js                ← maps icon name strings → lucide-react components
│   └── styles/
│       ├── tokens.css                 ← all design tokens from doc 03
│       ├── fonts.css                  ← @fontsource imports
│       ├── reset.css                  ← modern CSS reset
│       ├── base.css                   ← element defaults (body, headings, links, focus)
│       └── utilities.css              ← a few utilities: .visually-hidden, .container, .stack
├── tests/
│   ├── unit/                          ← Vitest: selectors, validators, components
│   └── e2e/                           ← Playwright: smoke, navigation, form, a11y scans
├── react-router.config.js
├── vite.config.js
├── eslint.config.js
├── .prettierrc
├── .nvmrc
├── .env.example
└── package.json
```

**Naming rules**
- Components: `PascalCase` folder and file; one component per file; default export from `index.js`.
- Hooks: `useCamelCase.js`.
- Content and lib files: `camelCase.js` or `kebab-case` for product slugs.
- CSS Module classes: `camelCase` (`styles.cardTitle`).
- Import alias `@/` → `src/` (configured in `vite.config.js`).

---

## 5. Routing

### 5.1 Route table — `src/routes.js`

```js
import { index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/SiteLayout.jsx', [
    index('routes/home.jsx'),
    route('products', 'routes/products.jsx'),
    route('products/:productSlug', 'routes/product-detail.jsx'),
    route('technology', 'routes/technology.jsx'),
    route('services', 'routes/services.jsx'),
    route('about', 'routes/about.jsx'),
    route('careers', 'routes/careers.jsx'),
    route('contact', 'routes/contact.jsx'),
    route('legal/:doc', 'routes/legal.jsx'),
    route('accessibility', 'routes/accessibility.jsx'),
    route('*', 'routes/not-found.jsx'),
  ]),
];
```

### 5.2 Pre-render list — `react-router.config.js`

```js
import { getPublishedProducts } from './src/lib/products.js';
import { site } from './src/content/site.js';

export default {
  appDirectory: 'src',
  ssr: false,
  async prerender() {
    const staticPaths = [
      '/', '/products', '/technology', '/about', '/careers', '/contact',
      '/legal/privacy', '/legal/cookies', '/legal/terms', '/accessibility',
    ];
    if (site.features.servicesPage) staticPaths.push('/services');
    const productPaths = getPublishedProducts().map((p) => `/products/${p.slug}`);
    return [...staticPaths, ...productPaths];
  },
};
```

### 5.3 Route module pattern — `src/routes/product-detail.jsx`

```jsx
import { data } from 'react-router';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { buildMeta, productJsonLd } from '@/lib/seo';
import ProductPage from '@/components/product/ProductPage';

// Runs at build time only (pre-rendering). Never in the browser.
export function loader({ params }) {
  const product = getProductBySlug(params.productSlug);
  if (!product) throw data('Not found', { status: 404 });
  return { product, related: getRelatedProducts(product) };
}

export function meta({ data: d }) {
  if (!d) return [{ title: 'Product not found | ANAYA Solutions' }];
  return buildMeta({
    title: d.product.seo?.title ?? `${d.product.name} — ${d.product.tagline}`,
    description: d.product.seo?.description ?? d.product.summary,
    path: `/products/${d.product.slug}`,
    image: d.product.media?.ogImage,
    jsonLd: productJsonLd(d.product),
  });
}

export default function ProductDetailRoute({ loaderData }) {
  return <ProductPage product={loaderData.product} related={loaderData.related} />;
}
```

Rules:
- Route modules are thin: load data, build meta, render one page component.
- Page components live in `components/` and receive data as props, so they can be tested without the router.
- Use `<Link>`/`<NavLink>` from `react-router` for internal links (wrapped by the `ui/Link` component), never plain `<a>`.
- Restore scroll to top on navigation and support hash links (`<ScrollRestoration />` in `root.jsx`).

---

## 6. Rendering & hydration rules

Because pages are pre-rendered in Node:

1. No `window`, `document`, `localStorage` or `matchMedia` at module top level or during render. Use them inside `useEffect`.
2. The `SignalField` canvas and other browser-only visuals render a static SVG/placeholder on the server and mount the animation after hydration.
3. Motion reveals must not hide content in the pre-rendered HTML. The `Reveal` component sets `initial={false}` until the component has mounted on the client, then animates elements entering the viewport.
4. Date output (e.g. the copyright year) is computed at build time and passed down, so server and client output match.

---

## 7. Styling architecture

**Layers** (imported once in `root.jsx`, in this order):

```css
@layer reset, tokens, base, components, utilities;
```

1. `reset.css`: box-sizing, margin reset, media defaults.
2. `tokens.css`: every token from [03](03-design-system.md) as `:root` custom properties, plus `[data-tone="ink"]` and `[data-tone="paper"]` blocks that remap semantic tokens:

```css
:root, [data-tone='ink'] {
  --surface: var(--color-ink-950);
  --surface-raised: var(--color-ink-800);
  --text: var(--color-slate-200);
  --text-strong: var(--color-white);
  --text-muted: var(--color-slate-400);
  --border: rgb(255 255 255 / 0.08);
  --link: var(--color-accent);
}
[data-tone='paper'] {
  --surface: var(--color-paper-0);
  --surface-raised: var(--color-paper-50);
  --text: var(--color-text-700);
  --text-strong: var(--color-text-900);
  --text-muted: #5B6478;
  --border: var(--color-paper-200);
  --link: var(--color-accent-strong);
}
```

3. `base.css`: element styles using **semantic** tokens only (`--text`, `--surface`).
4. Component CSS Modules: also use semantic tokens only, so every component works on both surfaces automatically.
5. `utilities.css`: `.visually-hidden`, `.container`, `.container--narrow`.

**Rules**
- Never hard-code colours, font sizes or spacing in component CSS; use tokens.
- Mobile-first media queries; container queries for cards.
- Avoid `!important` and IDs as selectors.
- Use logical properties (`margin-inline`, `padding-block`) for future right-to-left support.
- `prefers-reduced-motion: reduce` disables CSS transitions longer than 150 ms in `base.css`.

---

## 8. Content layer

### 8.1 Loading products

```js
// src/lib/products.js
const modules = import.meta.glob('../content/products/[!_]*.js', { eager: true });

const allProducts = Object.values(modules).map((m) => m.default);

export const getAllProducts = () => allProducts;
export const getPublishedProducts = () =>
  allProducts
    .filter((p) => p.published)
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100) || a.name.localeCompare(b.name));
export const getProductBySlug = (slug) => getPublishedProducts().find((p) => p.slug === slug);
export const getFeaturedProducts = (n = 4) => getPublishedProducts().filter((p) => p.featured).slice(0, n);
export const getProductsByDomain = (domain) =>
  getPublishedProducts().filter((p) => p.domain === domain || p.secondaryDomains?.includes(domain));
export const getProductsByTechnology = (tech) =>
  getPublishedProducts().filter((p) => p.technologies.includes(tech));
export function getRelatedProducts(product, n = 3) { /* explicit `related`, else same domain, then shared tech */ }
```

`import.meta.glob` is a Vite feature, so `react-router.config.js` cannot use it directly. Provide a small Node-side equivalent (`scripts/lib/load-products.js` using `fs` + dynamic `import()`) for the config and scripts, or keep a generated `src/content/products/index.js` updated by `npm run validate`. Pick one approach during scaffolding and document it in the README.

### 8.2 Site configuration — `src/content/site.js`

```js
export const site = {
  name: 'ANAYA Solutions',
  legalName: 'ANAYASD LIMITED',              // [VERIFIED]
  companyNumber: '09674951',                 // [VERIFIED]
  registeredIn: 'TBC',                       // [TBC] e.g. "England and Wales"
  registeredOffice: 'TBC',                   // [TBC] required before launch
  location: 'London, United Kingdom',        // [VERIFIED]
  email: 'info@anaya.uk',                    // [VERIFIED] the only address used site-wide (D3)
  phone: { display: '+44 7522 405709', href: 'tel:+447522405709' }, // [VERIFIED]
  social: [],                                // [TBC] D9
  url: 'https://anaya.uk',
  features: {
    servicesPage: false,
    demoRequests: false,
    analytics: false,
    clientsSection: true,                    // [TEMPORARY] Home client logo strip (D5)
  },
};
```

Every component that shows company details reads from `site`. Nothing is duplicated.

### 8.3 Page copy

Page-level copy (headings, leads, CTA labels) lives in `src/content/pages/*.js` as structured objects:

```js
// src/content/pages/home.js
export const home = {
  hero: {
    eyebrow: 'AI products · Financial · Social',
    title: ['AI products for ', { highlight: 'financial and social intelligence' }, '.'],
    lead: '…',
    primaryCta: { label: 'Explore products', to: '/products' },
    secondaryCta: { label: 'Talk to us', to: '/contact' },
  },
  // ...
};
```

This keeps copy reviewable in one place and ready for translation later.

### 8.4 Content validation

`npm run validate` (`scripts/validate-content.js`) runs locally and in CI **before** every build, and fails the build if:

- A published product is missing a required field, or has an invalid domain, technology, status or icon name.
- Any published content contains the strings `TBC`, `TODO`, `Lorem`, `ipsum` or `[DRAFT]`.
- Two products share a slug, or a `related` slug does not exist.
- A referenced image is missing, has no `alt`, or its declared width/height do not match the file.
- `site.registeredOffice` is `'TBC'` when building for production (`NODE_ENV=production`).
- A product's `lastReviewed` date is older than 12 months (warning only).

**Temporary content.** Items with `temporary: true` (products, clients) are allowed in the build, but the validator prints a clear **"Temporary content is live"** list naming each one, every time it runs. The `TBC` scan skips internal-only fields (`contentOwner`) on temporary items; it still checks every field that is shown on the site.

---

## 9. SEO, metadata and structured data

- `src/lib/seo.js` exports `buildMeta({ title, description, path, image, noindex, jsonLd })`, which returns the React Router `meta` array: `title`, `description`, canonical link, Open Graph (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`), Twitter card (`summary_large_image`), and `script:ld+json` entries.
- Structured data builders: `organizationJsonLd()` (name, legalName, url, logo, contactPoint; no unverified fields), `productJsonLd(product)` (`SoftwareApplication` with name, description, applicationCategory, url), `breadcrumbJsonLd(items)`, `faqJsonLd(faqs)`.
- `scripts/generate-sitemap.js` writes `sitemap.xml` after the build from the pre-render list.
- `public/robots.txt` allows everything and points to the sitemap.
- Default OG image: `public/og/default.png`. Each product can provide its own.

---

## 10. Animation implementation

- `root.jsx` wraps the app in `<MotionConfig reducedMotion="user">`.
- Use the `Reveal` / `Stagger` wrappers in `components/motion/`; do not scatter raw `motion.div` props across pages, so timing stays consistent.
- Shared variants live in `components/motion/variants.js` using the tokens from [03 §7](03-design-system.md#7-motion).
- Use `LazyMotion` with `domAnimation` and the `m` component to keep the motion bundle small.
- Use CSS transitions, not Framer Motion, for simple hover and focus states.

---

## 11. Contact form without a backend

The site has no server, so the form needs a delivery method. `src/lib/contact.js` exposes one interface:

```js
// returns { ok: boolean, error?: string }
export async function submitEnquiry(values) {
  return adapters[import.meta.env.VITE_CONTACT_ADAPTER ?? 'mailto'](values);
}
```

| Adapter | How it works | Pros | Cons |
|---|---|---|---|
| `mailto` (**default**) | Builds a `mailto:info@anaya.uk?subject=…&body=…` URL (subject includes the enquiry type, e.g. "Careers enquiry") from the validated fields and opens the visitor's email app. | No third party; no personal data stored by a processor; no cost. | Depends on the visitor having an email client set up; less polished. The UI shows the address and a "Copy email" button as backup. |
| `endpoint` (optional, decision D7) | `fetch` POST to a hosted form service URL in `VITE_CONTACT_ENDPOINT`. | Smooth in-page submission and confirmation. | Third-party data processor: needs a privacy policy update and a data processing agreement; add spam protection (honeypot field + provider's protection). |

Requirements for both:
- Client-side validation (see [04 §8](04-page-specifications.md#8-contact--contact)).
- A hidden honeypot field (`company_website`) that must stay empty.
- No personal data is stored in `localStorage` or logged.
- Only `VITE_`-prefixed, non-secret values are exposed to the client. Never put API secrets in the front end.

---

## 12. Performance

| Technique | Implementation |
|---|---|
| Route-level code splitting | Automatic per route module in framework mode. |
| Pre-rendered HTML | Fast first contentful paint without waiting for JS. |
| Images | `ResponsiveImage` component with `<picture>` (AVIF → WebP → fallback), `srcset`/`sizes`, explicit dimensions, lazy loading below the fold. Optimise at build time (`vite-imagetools` or a pre-build script). |
| Fonts | Self-hosted `woff2`, Latin subset, preload two critical weights, `font-display: swap`. |
| Icons | Named imports only through the registry. The registry must list icons explicitly; never `import * as icons`. |
| Motion | `LazyMotion` + `m`; the signal field pauses off-screen (IntersectionObserver) and on hidden tabs (`visibilitychange`). |
| Third parties | None by default. |
| Budgets | Enforced in CI with Lighthouse CI (see [01 §6.3](01-project-overview-and-requirements.md#63-non-functional-requirements)). |

---

## 13. Hosting, deployment and security headers

**Hosting:** any static host or CDN that supports custom redirects, custom headers and a custom 404 page (e.g. Netlify, Cloudflare Pages, Vercel, or S3 + CloudFront). Decision D10.

**Build output:** `build/client/` (HTML per route, assets with hashed file names).

**Pipeline (CI):**
```
install → lint → validate content → unit tests → build → generate sitemap & redirects
→ Playwright smoke + axe tests on the preview → Lighthouse CI → deploy
```
Each pull request gets a preview deployment.

**Redirects:** generated by `scripts/generate-redirects.js` from a static list ([02 §5](02-sitemap-and-page-structure.md#5-redirects-from-the-current-site)) plus each product's `redirectFrom`. Output format depends on the host (e.g. `_redirects` for Netlify / Cloudflare Pages, `vercel.json` for Vercel).

**Caching:** HTML `Cache-Control: no-cache`; hashed assets `public, max-age=31536000, immutable`.

**Security headers** (set at the host):
```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' [form endpoint if used]; frame-ancestors 'none'; base-uri 'self'; form-action 'self' [form endpoint if used]
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
Check that the CSP allows the inline scripts React Router emits for hydration (hash or nonce them, or allow them specifically) before turning it on; test with `Content-Security-Policy-Report-Only` first.

**Environment variables** (`.env.example`):
```
VITE_SITE_URL=https://anaya.uk
VITE_CONTACT_ADAPTER=mailto        # mailto | endpoint
VITE_CONTACT_ENDPOINT=             # only if adapter = endpoint
```

---

## 14. Quality and testing

| Layer | Tool | What to test |
|---|---|---|
| Static checks | ESLint (+ jsx-a11y), Prettier | Code style, hooks rules, basic a11y |
| Content | `scripts/validate-content.js` | §8.4 rules |
| Unit | Vitest | Product selectors, filters, `buildMeta`, form validation, mailto builder |
| Component | Vitest + Testing Library | `ProductCard`, `ProductFilterBar`, `Accordion`, `ContactForm`, `MegaMenu` keyboard behaviour |
| End-to-end | Playwright | Every pre-rendered route loads with a 200 and its h1; nav and mega menu work by keyboard; product filter updates the URL; contact form validation; 404 page |
| Accessibility | `@axe-core/playwright` | Zero serious/critical violations on every route |
| Performance | Lighthouse CI | Budgets and scores from [01 §6.3](01-project-overview-and-requirements.md#63-non-functional-requirements) |
| Visual | Manual review at the breakpoints in [03 §10](03-design-system.md#10-responsive-behaviour) | Before each release |

---

## 15. npm scripts

```json
{
  "scripts": {
    "dev": "react-router dev",
    "build": "npm run validate && react-router build && node scripts/generate-sitemap.js && node scripts/generate-redirects.js",
    "preview": "vite preview --outDir build/client",
    "validate": "node scripts/validate-content.js",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

The preview server does not apply host redirects or headers; test those on a preview deployment.

---

## 16. Extending the site

| Task | Steps |
|---|---|
| **Add a product** | See [05 §9](05-product-presentation-strategy.md#9-adding-a-new-product). No code changes. |
| **Add a domain or technology area** | Add an entry to `content/taxonomy.js` (slug, label, icon, colour token). Add `content/technology.js` content for a new area. Add a colour token in `tokens.css` for a new domain. |
| **Add a static page** | 1) Create `src/content/pages/{page}.js`. 2) Create `src/routes/{page}.jsx` (loader optional, `meta`, component composed from existing section components). 3) Add it to `routes.js`, the `prerender` list and `navigation.js`. |
| **Add Insights/blog (later)** | Add `content/insights/*.md` with front matter, a `lib/insights.js` loader, routes `insights` and `insights/:postSlug`, and extend `prerender`. Components: `PostCard`, `PostLayout`. |
| **Add product sub-pages (later)** | Add `route('products/:productSlug/:subPage', …)` and a `subPages` field in the product data. |
| **Add a language (later)** | Move strings in `content/` into locale folders (`content/en/`, `content/xx/`) and prefix routes with `:lang?`. Logical CSS properties are already used. |
| **Move to a headless CMS (later)** | Replace the loaders in `src/lib/*.js` with build-time CMS fetches. Components and routes stay the same. |

---

## 17. Implementation notes (as built, 2026-11-17)

The site is built in [`frontend/`](../frontend/README.md). Where the build differs from the plan above:

| Topic | As built | Why |
|---|---|---|
| Versions | React 19.3, React Router 8.5 (framework mode, `ssr: false` + `prerender`), Vite 8.3, `motion` 14, `lucide-react` 1.73. Pinned exactly in `package.json`. | Current stable releases at build time. React Router 8 needs Node ≥ 22.22. |
| Route data | Route modules import content through `src/lib` selectors directly instead of build-time `loader`s. `meta` reads the product from `params`. | Content is small and static. This avoids generating `.data` files and keeps client navigation working on any static host. |
| Component files | Grouped by area (`components/ui/Primitives.jsx`, `sections/Blocks.jsx`, `technology/TechArea.jsx`) with a co-located `.module.css`, rather than one folder per component. | Fewer files for small presentational pieces. Each export is still a separate, documented component. |
| Scroll reveals | `Reveal` uses IntersectionObserver + CSS transitions. Hero entrances use CSS keyframes. Framer Motion powers the mega menu, mobile menu, accordion and product-filter transitions. | Content stays visible in the pre-rendered HTML and without JavaScript, and the hero (LCP) never waits for JS. |
| Product page sub-sections | Rendered inside `ProductPage.jsx` (`ProductHero`, `ProductSubnav`, `Overview`, `UseCases`, `TechFoundation`, `SecurityPanel`, `DeploymentPanel`, `Gallery`). | Same template and render rules as doc 05 §6. |
| Product filters | Query-string filters are applied after hydration. | The pre-rendered HTML has no query string, so applying them on the first render would cause a hydration mismatch. |
| Preview | `npm run preview` runs `scripts/serve.js`, which resolves `/about` → `about/index.html` like a static host. | `vite preview` falls back to the home page HTML, which misrepresents the deployed site. |
| Host config | `_redirects` and `_headers` are generated in Netlify / Cloudflare Pages format. CSP is not set yet. | Add the CSP once the host is chosen and tested in report-only mode (§13). |
| Legal pages | Show a "being finalised" notice plus company details until approved text is added to `src/content/legal.js`. | No placeholder legal text is published. |
| Validator | Prints temporary content and launch blockers on every build. `npm run validate:launch` fails while blockers remain. | Lets development continue while keeping the launch blockers visible. |
| Build pipeline | `npm run build` runs `scripts/build-site.js`: validate → `react-router build` → sitemap (live build only) → host config (`scripts/lib/host-config.js`) → optional zip (`--zip`). This replaces the separate `generate-sitemap.js` / `generate-redirects.js` scripts listed in §4 and §15. | One entry point for every deployment variant. |
| Hosting | Hostinger (LiteSpeed/Apache). `.htaccess` provides clean URLs, HTTPS, the non-www redirect, old-URL redirects, headers, and a 404 via `__spa-fallback.html`. See `frontend/DEPLOY-HOSTINGER.md`. | Decision D10. |
| Subfolder test copy | `--base=/v2/` (`npm run build:hostinger:v2`) sets the Vite `base` and React Router `basename`, prefixes raw asset paths through `withBase()` (`src/lib/base.js`), marks every page `noindex`, and writes a `.htaccess` scoped to `/v2/`. | Review the new site at anaya.uk/v2 while WordPress stays live at the root. |
