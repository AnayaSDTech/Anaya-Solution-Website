# 05 — Product Presentation Strategy & Product Detail Page Template

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [04 §3 Product detail](04-page-specifications.md#3-product-detail--productsproductslug) · [06 §8 Content layer](06-technical-architecture.md#8-content-layer) · [07 §6 Product components](07-component-library.md#6-product-components--componentsproduct)

---

## 1. Important: the current site has no product content

The analysis of anaya.uk (2026-11-16) found **no product names, product descriptions or product features**. The site describes consultancy services only. ANAYA's brief names six **technology areas** but no individual products.

So this document defines **how** products will be presented, not **what** they say. Final product content must come from ANAYA's product owners using the questionnaire in §10.

**Current decision (2026-11-18):** the temporary products have been replaced by two real products, **ANAYA Open Banking** and **ANAYA CDM**, documented in [09 Products](09-products.md). The no-products fallback in §8 remains in the code for safety.

---

## 2. Positioning strategy

| Principle | What it means on the site |
|---|---|
| **Products are the company** | Products appear first in navigation, on Home and in the footer. Services (if kept) are secondary. |
| **Domain first, technology second** | Buyers think in problems ("financial risk", "public sentiment"), so products are grouped by **domain**. Technology areas are tags that show depth and allow cross-browsing. |
| **One template, consistent story** | Every product page follows the same narrative: *what it is → what it does → how it works → who it is for → why you can trust it → next step.* Visitors learn the pattern once. |
| **Evidence over adjectives** | Each capability says what the product does in concrete terms. Screenshots beat illustrations. No claims without evidence. |
| **Honest status** | Each product shows its real lifecycle status (§4). An international audience reads accuracy as credibility. |
| **Security as a feature** | ANAYA's cybersecurity and PKI expertise is a differentiator for financial customers. Every product page has a "Security & trust" section, filled only with verified statements. |

---

## 3. Product taxonomy

Two independent dimensions, both stored as slugs in product data and defined once in `content/taxonomy.js`.

### 3.1 Domains (primary grouping)

| Slug | Label | Source | Colour token |
|---|---|---|---|
| `financial` | Financial | `[VERIFIED — brief]` | `--color-domain-financial` |
| `social` | Social | `[VERIFIED — brief]` | `--color-domain-social` |
| `security-trust` | Security & Trust | `[DRAFT]`, a grouping for cybersecurity and PKI products that are not domain-specific; ANAYA to confirm | `--color-domain-security` |

A product has **one primary domain** (`domain`) and may list others in `secondaryDomains`.

### 3.2 Technology areas (tags)

| Slug | Label `[VERIFIED — brief]` | Icon |
|---|---|---|
| `ai-ml` | Artificial Intelligence & Machine Learning | `BrainCircuit` |
| `cybersecurity` | Cybersecurity | `ShieldCheck` |
| `pki` | Public Key Infrastructure | `KeyRound` |
| `social-sentiment` | Social Sentiment Intelligence | `MessagesSquare` |
| `financial-intelligence` | Financial Intelligence | `LineChart` |
| `other-ai` | Other AI-powered technologies | `Sparkles` |

A product can have any number of technology tags. New domains or areas are added to `taxonomy.js` only; filters, menus and pages pick them up automatically.

---

## 4. Product lifecycle status

| Value | Badge label | Badge colour | When to use |
|---|---|---|---|
| `available` | Available | success | Generally available to customers |
| `pilot` | Pilot | warning | Running with selected customers |
| `beta` | Beta | warning | Open or invite-only beta |
| `in-development` | In development | info | Being built; no customer access yet |
| `coming-soon` | Coming soon | info | Announced, with a planned release |

- The status must be **confirmed by ANAYA** for each product. There is no default.
- Set `showStatus: false` to hide the badge if ANAYA prefers not to show it.

---

## 5. Product data model

One file per product: `src/content/products/{slug}.js`. The file exports a plain object. Only the fields marked **Required** must be present for the product to be published; every other field is optional, and its section **does not render** if the field is missing or empty.

| Field | Type | Req. | Used in |
|---|---|---|---|
| `slug` | string (kebab-case, unique, permanent) | ✅ | URL `/products/{slug}` |
| `name` | string | ✅ | Hero h1, cards, menu, meta title |
| `tagline` | string, ≤ 90 chars | ✅ | Hero lead, cards, mega menu, meta |
| `summary` | string, ≤ 160 chars | ✅ | Card description, meta description |
| `domain` | taxonomy slug | ✅ | Grouping, colour, tag |
| `secondaryDomains` | slug[] | | Extra filter matches |
| `technologies` | slug[] (≥ 1) | ✅ | Tags, filters, Technology page links |
| `status` | lifecycle value (§4) | ✅ | Status badge |
| `showStatus` | boolean (default `true`) | | Hide the badge |
| `published` | boolean | ✅ | Excluded from build, menus and sitemap when `false` |
| `temporary` | boolean (default `false`) | | Marks placeholder content. Not shown on the site; listed by the validator on every build. |
| `featured` | boolean | | Shown on Home showcase |
| `order` | number | | Sort order |
| `icon` | Lucide icon name | ✅ | Cards, hero, menu |
| `media.hero` | `{ src, alt, width, height }` | | Hero visual |
| `media.ogImage` | path (1200×630) | | Social share image |
| `media.gallery` | `{ src, alt, caption, width, height }[]` | | Gallery |
| `overview` | `{ problem, approach, outcome }` (strings) or `{ body }` | | Overview section |
| `highlights` | `{ label, value }[]` | | Key facts beside the overview. **Only verifiable values.** |
| `capabilities` | `{ icon, title, description }[]` | | Capabilities grid (recommend 3–9) |
| `howItWorks` | `{ title, description }[]` | | Numbered steps (3–5) |
| `useCases` | `{ audience, title, description }[]` | | Use-case cards |
| `technologyNotes` | `{ [techSlug]: string }` | | One-line note per technology tag |
| `security` | `{ title, description }[]` | | Security & trust section. **Verified statements only**; no certifications unless certified. |
| `deployment` | `{ options: string[], integrations: string[], notes }` | | Deployment & integration section |
| `faqs` | `{ question, answer }[]` | | FAQ accordion + `FAQPage` schema |
| `related` | slug[] | | Related products. If absent: products sharing the domain, then technologies (max 3) |
| `cta` | `{ demo: boolean, label?, note? }` | | Demo button; custom CTA band text |
| `externalUrl` | URL | | "Visit product site" link if the product has its own site |
| `redirectFrom` | string[] | | Old slugs; generates redirects |
| `seo` | `{ title?, description? }` | | Overrides for meta tags |
| `lastReviewed` | ISO date | ✅ | Content governance; flagged by the validator if older than 12 months |
| `contentOwner` | string (role, not a personal email) | ✅ | Who approves this page's content (internal; not rendered) |

### 5.1 Template file (copy to create a product)

`src/content/products/_template.js` (underscore files are ignored by the loader):

```js
// Copy this file to {slug}.js and replace every TBC value.
// The build fails if any "TBC" string remains in a published product.

/** @type {import('../schema').Product} */
const product = {
  slug: 'TBC-product-slug',
  name: 'TBC Product name',
  tagline: 'TBC One-line value proposition (max 90 characters)',
  summary: 'TBC Short description for cards and search results (max 160 characters)',
  domain: 'financial',              // financial | social | security-trust
  technologies: ['ai-ml'],          // see content/taxonomy.js
  status: 'in-development',         // MUST be confirmed by ANAYA
  published: false,                 // set true only after content approval
  featured: false,
  order: 100,
  icon: 'Sparkles',

  overview: {
    problem: 'TBC',
    approach: 'TBC',
    outcome: 'TBC',
  },
  capabilities: [
    // { icon: 'LineChart', title: 'TBC', description: 'TBC' },
  ],
  howItWorks: [],
  useCases: [],
  security: [],
  faqs: [],
  cta: { demo: false },

  lastReviewed: '2026-11-16',
  contentOwner: 'TBC (role)',
};

export default product;
```

> The `@type` comment uses JSDoc only for editor hints; the project stays plain JavaScript.

---

## 6. Product detail page: section-by-section specification

Order is fixed. "Render rule" says when the section appears. The sticky sub-navigation (`ProductSubnav`, desktop ≥ 1024 px) lists only rendered sections.

| # | Section | Component | Data | Render rule | Layout notes |
|---|---|---|---|---|---|
| 1 | **Hero** | `ProductHero` | `name`, `tagline`, `domain`, `status`, `icon`, `media.hero`, `cta` | Always | Breadcrumb; domain tag + status badge; h1; tagline; CTAs (Request a demo if `cta.demo`, else Talk to us; secondary "View all products"). Visual on the right (desktop) or below (mobile). If `externalUrl`, add a "Visit product site ↗" link. |
| 2 | **Overview** | `ProductOverview` | `overview`, `highlights` | `overview` present | Three-part narrative: *The challenge* / *Our approach* / *The outcome*, as three columns on desktop or stacked on mobile. Highlights appear as a stat rail only when supplied. |
| 3 | **Key capabilities** | `FeatureGrid` | `capabilities` | ≥ 1 item | 3 columns desktop, 2 tablet, 1 mobile. Icon tile + title + 1–2 sentences. |
| 4 | **How it works** | `ProcessSteps` | `howItWorks` | ≥ 2 items | Numbered horizontal steps with connector lines on desktop; vertical timeline on mobile. |
| 5 | **Use cases** | `UseCaseCards` | `useCases` | ≥ 1 item | Cards with an "audience" eyebrow. Tabs if > 4 items. |
| 6 | **Technology foundations** | `TechFoundation` | `technologies`, `technologyNotes` | Always (≥ 1 technology) | Chips linking to `/technology#{slug}`, each with an optional note. |
| 7 | **Security & trust** | `SecurityPanel` | `security` | ≥ 1 item | Dark panel with a `ShieldCheck` motif. Statements must be verifiable. |
| 8 | **Deployment & integration** | `DeploymentPanel` | `deployment` | Any field present | Two lists: deployment options and integrations, with notes. |
| 9 | **Gallery** | `MediaGallery` | `media.gallery` | ≥ 1 image | Screenshots in `WindowFrame`; carousel on mobile, grid on desktop; keyboard-accessible lightbox. |
| 10 | **FAQ** | `Accordion` | `faqs` | ≥ 1 item | Single-open accordion; outputs `FAQPage` schema. |
| 11 | **Related products** | `ProductCard` ×≤3 | `related` or computed | ≥ 1 other published product | Standard card variant. |
| 12 | **CTA band** | `CtaBand` | `cta` | Always | "Interested in {name}?" `[DRAFT]` + primary CTA (demo or Talk to us). Contact link includes `?product={slug}`. |

### 6.1 Writing guidance for product content (for ANAYA's product owners)

| Field | Guidance | Length |
|---|---|---|
| Tagline | What the product does and for whom, in plain words. No superlatives. | ≤ 90 chars |
| Summary | One sentence a search result or card can show. | ≤ 160 chars |
| Problem | The customer's problem, in their language. | 40–80 words |
| Approach | How the product addresses it, in general terms. | 40–80 words |
| Outcome | What the customer can do afterwards. Avoid numbers unless measured and documented. | 30–60 words |
| Capability | Title: verb-led ("Detects…", "Analyses…"). Description: what, not how good. | Title ≤ 6 words; 15–35 words |
| Use case | One audience, one scenario, one result. | 30–60 words |
| Security statement | Facts only, e.g. how data is encrypted or where it is processed. Certifications only with certificate evidence. | 15–40 words |

---

## 7. Product presentation across the site

| Place | Component | What it shows | Source |
|---|---|---|---|
| Header mega menu | `MegaMenu` | Products grouped by domain: icon, name, tagline | Published products |
| Mobile menu | `MobileMenu` accordion | Product names grouped by domain | Published products |
| Home showcase | `ProductShowcase` | Up to 4 `featured` products | `featured: true` |
| Home domains | `DomainSplit` | Products per domain | `domain` |
| Products page | `ProductGrid` + `ProductFilterBar` | All published products | All |
| Technology page | `TechAreaSection` | Products tagged per area | `technologies` |
| Product page | Related products | Up to 3 | `related` or computed |
| Contact form | "Product of interest" select | All published products | All |
| Footer | Product link list | All published products (max 8, then "All products") | All |
| `sitemap.xml` | Build script | Published product URLs | All |

All of these call the same selectors in `src/lib/products.js` (`getPublishedProducts`, `getProductsByDomain`, `getProductsByTechnology`, `getFeaturedProducts`, `getRelatedProducts`). No component reads product files directly.

---

## 8. Launch without confirmed product content

If ANAYA has not approved any product content by launch (decision D1), the site must still look complete and honest.

| Place | Fallback behaviour |
|---|---|
| Home showcase | Becomes **Product areas**: six cards from the technology areas, CTA "Talk to us". |
| Products page | Hero + six product-area cards + CTA. Filter bar hidden. |
| Mega menu | Replaced by a plain "Products" link. |
| Footer product list | Replaced by the six areas linking to `/technology#{slug}`. |
| Contact "Product of interest" | Lists the six areas instead. |
| Product detail routes | None generated. |

This is controlled by data alone: when `getPublishedProducts()` returns an empty list, components switch to their `fallback` rendering. No code changes are needed when the first product is published.

---

## 9. Adding a new product

A content editor or developer can publish a new product in under an hour:

1. Copy `src/content/products/_template.js` to `src/content/products/{slug}.js`.
2. Fill in the required fields and any optional sections that have **approved** content.
3. Add images to `public/images/products/{slug}/` (hero, OG image 1200×630, gallery). Export AVIF/WebP + fallback.
4. If the product uses a new domain or technology, add it to `src/content/taxonomy.js` first.
5. Set `published: true` only after ANAYA's content owner approves the page.
6. Run `npm run validate` (schema check, placeholder scan, image dimensions, link check).
7. Run `npm run build` and preview. The route, menu entry, cards, filters, sitemap entry and structured data are generated automatically.
8. Open a pull request with a screenshot of the page on mobile and desktop.

**Removing or retiring a product:** set `published: false` (the page disappears) and add a redirect from its slug to `/products` (or to its replacement via the new product's `redirectFrom`).

---

## 10. Product content questionnaire (send to ANAYA's product owners)

Ask for the following for **each** product. Answers map directly to the data model.

1. **Product name** and the URL slug you want.
2. **One-line tagline** (what it does, for whom; ≤ 90 characters).
3. **Primary domain** (Financial / Social / Security & Trust) and any secondary domains.
4. **Technology areas** it uses (from the six in §3.2).
5. **Current status** (Available / Pilot / Beta / In development / Coming soon), and whether to display it.
6. **The problem** it solves, **the approach**, and **the outcome** for customers.
7. **Key capabilities** (3–9), each with a short description.
8. **How it works**: 3–5 steps from data in to value out.
9. **Who it is for**: target customers and 1–4 use cases.
10. **Security and data handling**: encryption, data residency, access control, compliance. Include certificates for any certification claimed.
11. **Deployment options and integrations** (e.g. cloud, on-premises, API), if applicable.
12. **Screenshots or UI recordings** that may be published (with any confidential data removed).
13. **FAQs** customers ask.
14. **Is a demo offered?** If so, how should demo requests be handled?
15. Does the product have its **own website or app URL**?
16. Any **numbers or results** you want to show, with the evidence behind them.
17. **Content owner** (role) who approves the page.
