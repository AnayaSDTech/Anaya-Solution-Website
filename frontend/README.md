# ANAYA Solutions — Website (frontend)

Static website for ANAYA Solutions, built with **React + Vite + React Router (framework mode, pre-rendered)**, plain **CSS3** (design tokens + CSS Modules), **Lucide React** icons and **Framer Motion** (`motion` package).

Every page is pre-rendered to static HTML at build time, so the output in `build/client/` can be hosted on any static host or CDN with no server. Specification: [`../docs/`](../docs/README.md).

## Requirements

- Node.js **22.22 or later** (React Router 8 requires it; see `.nvmrc`).

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Validate content, build, pre-render every page, write `sitemap.xml`, `_redirects`, `_headers` and `404.html` |
| `npm run build:hostinger` | Build the live site and package `deploy/anaya-website-hostinger.zip` (extract into `public_html`) |
| `npm run build:hostinger:v2` | Build a **test copy** for `anaya.uk/v2/` (noindex) and package `deploy/anaya-website-hostinger-v2.zip` (extract into `public_html/v2`) |
| `npm run preview` / `npm run preview:v2` | Serve the matching build locally the way Hostinger does (`http://localhost:4173/` or `/v2/`) |
| `npm run validate` | Check content only. Lists temporary content and launch blockers |
| `npm run validate:launch` | Same, but **fails** while launch blockers remain. Run before going live |

## Project structure

```
src/
  root.jsx              HTML shell, fonts, global CSS, Motion providers, error boundary
  routes.js             Route table
  routes/               One module per page (meta + component)
  layouts/              SiteLayout (skip link, header, main, footer)
  components/
    layout/             SiteHeader (+ products mega menu), MobileMenu, SiteFooter, Logo, Breadcrumbs
    ui/                 Button, Icon, Section, Primitives (Eyebrow, Tag, StatusBadge, RichText, IconTile)
    sections/           HeroHome, PageHero, SectionHeader, Blocks, CtaBand, Accordion, ClientLogoStrip, LegalPage, ErrorPage
    product/            ProductCard, ProductShowcase, ProductExplorer (filters), DomainSplit, ProductPage
    technology/         TechArea (cards, grid, index, sections)
    forms/              ContactForm
    media/              SignalField (canvas), AbstractVisual (SVG product visuals)
    motion/             Reveal (scroll reveal)
  content/              ALL site copy and data — edit here, not in components
    site.js             Company facts, email, feature switches
    taxonomy.js         Domains, technology areas, product statuses
    products/           One file per product (+ _template.js)
    pages.js, technology.js, services.js, clients.js, roles.js, legal.js, navigation.js
  lib/                  Product selectors, SEO helpers, form validation, contact delivery
  hooks/                Scroll, focus-trap, body-lock and scroll-spy hooks
  icons/registry.js     Icon names usable in content files
  styles/               Tokens, reset, base, utilities
scripts/                Content validator, sitemap, redirects/headers, preview server
public/                 Logo, favicon, client logos, robots.txt
```

## Common tasks

**Add a product.** Copy `src/content/products/_template.js` to `src/content/products/{slug}.js`, fill it in, add images under `public/images/products/{slug}/`, set `published: true`, then run `npm run build`. The page, menus, cards, filters, sitemap and structured data are all generated from that file. See `docs/05-product-presentation-strategy.md` §9.

**Replace a temporary product.** Edit its file with confirmed content and set `temporary: false`. If the slug changes, add the old slug to `redirectFrom`.

**Turn the client logo strip off.** Set `features.clientsSection: false` in `src/content/site.js`.

**Publish the Services page.** Set `features.servicesPage: true` in `src/content/site.js`.

**Add legal text.** Add approved text to `src/content/legal.js` as `sections: [{ heading, paragraphs: [] }]`.

**Contact form.** By default, submitting opens the visitor's email app with the message addressed to info@anaya.uk (no backend, no third party). To use a hosted form service instead, copy `.env.example` to `.env` and set `VITE_CONTACT_ADAPTER=endpoint` and `VITE_CONTACT_ENDPOINT`.

## Deployment

**Hostinger:** for the test copy, run `npm run build:hostinger:v2` and extract the zip into `public_html/v2`. For the live site, run `npm run build:hostinger` and extract into `public_html`. Full steps, checks and troubleshooting are in **[DEPLOY-HOSTINGER.md](DEPLOY-HOSTINGER.md)**.

Other subfolders work the same way: `node scripts/build-site.js --base=/<folder>/ --zip`.

The build writes host configuration into `build/client/`:
- `.htaccess` for Hostinger / Apache / LiteSpeed (clean URLs, HTTPS, redirects, headers, 404).
- `_redirects` and `_headers` for Netlify / Cloudflare Pages.

## Before launch

`npm run validate:launch` lists what is still missing:
- Registered office address and place of registration (`src/content/site.js`). These are a UK legal requirement.
- Approved Privacy, Cookie, Terms and Accessibility texts (`src/content/legal.js`). Until then, those pages show a "being finalised" notice.
- Temporary content to replace: four placeholder products and the client logos.
