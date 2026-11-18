# 02 — Sitemap & Page Structure

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [04 Page specifications](04-page-specifications.md) · [06 Architecture §5 Routing](06-technical-architecture.md#5-routing)

---

## 1. Information architecture principles

1. **Products first.** "Products" is the first navigation item and the first section after the Home hero.
2. **Two ways in to a product:** by **domain** (Financial, Social, Security & Trust) or by **technology area** (AI/ML, Cybersecurity, PKI, and so on). Both views are filters on the same product data.
3. **Shallow structure.** Every page is at most two clicks from Home.
4. **Data-driven routes.** Product pages are generated from product data files; no route is hand-written per product.
5. **Room to grow.** URL patterns for future sections (Insights, Industries, product sub-pages) are reserved now so they never force a restructure.

---

## 2. Sitemap

```
/                                   Home
├── /products                       Products overview (all products, filterable)
│   └── /products/:productSlug      Product detail (one template, generated per product)
├── /technology                     Technology areas (six areas, anchor per area)
├── /services                       Engineering & advisory services   (only if decision D2 = yes)
├── /about                          About ANAYA
├── /careers                        Careers
├── /contact                        Contact & enquiry form
├── /legal
│   ├── /legal/privacy              Privacy Policy
│   ├── /legal/cookies              Cookie Policy
│   └── /legal/terms                Terms of Use (includes company disclosure)
├── /accessibility                  Accessibility Statement
└── /*                              404 Not Found
```

### Reserved for later phases (do not build now)

```
/products/:productSlug/:subPage     e.g. /features, /security, /pricing (if a product outgrows one page)
/technology/:areaSlug               Dedicated page per technology area
/industries/:industrySlug           e.g. financial-services
/insights                           News, articles, announcements
/insights/:postSlug
/careers/:roleSlug                  Individual job descriptions
```

---

## 3. Page inventory

| Page | Route | Phase | Rendered from | Indexed by search engines |
|---|---|---|---|---|
| Home | `/` | 1 | `content/pages/home.js` + product data | Yes |
| Products | `/products` | 1 | `content/products/*` + taxonomy | Yes |
| Product detail | `/products/:productSlug` | 1 | One file in `content/products/` | Yes (published products only) |
| Technology | `/technology` | 1 | `content/technology.js` | Yes |
| Services | `/services` | 1 (conditional on D2) | `content/services.js` | Yes, if published |
| About | `/about` | 1 | `content/pages/about.js` | Yes |
| Careers | `/careers` | 1 | `content/pages/careers.js` + `content/roles.js` | Yes |
| Contact | `/contact` | 1 | `content/pages/contact.js` + `siteConfig` | Yes |
| Privacy / Cookies / Terms | `/legal/*` | 1 | `content/legal/*.md` (approved text) | Yes |
| Accessibility | `/accessibility` | 1 | `content/legal/accessibility.md` | Yes |
| 404 | `*` | 1 | Static | No (`noindex`) |

---

## 4. URL rules

- Lowercase, hyphen-separated, no file extensions: `/products/sentiment-insight`, not `/Products/Sentiment_Insight`.
- **No trailing slash.** The host redirects `/about/` to `/about` with a 301.
- Product slugs are permanent once published. If a product is renamed, keep the old slug as a redirect (`redirectFrom` in the product data).
- Filters on the Products page use query strings, so they can be shared and bookmarked: `/products?domain=financial&tech=pki`.
- Technology areas use anchors on the Technology page: `/technology#pki`. When a dedicated page is built later, `/technology/pki` replaces the anchor and the anchor link redirects in client code.

---

## 5. Redirects from the current site

The current site is WordPress-style with trailing slashes. Configure these as **HTTP 301** at the host (see [06 §13](06-technical-architecture.md#13-hosting-deployment-and-security-headers)).

| Old URL | New URL |
|---|---|
| `/expertise/` | `/technology` |
| `/services/` | `/services` (or `/products` if decision D2 = no) |
| `/about/` | `/about` |
| `/career/` | `/careers` |
| `/contact/` | `/contact` |
| `/home/` (if it exists) | `/` |

Also submit the new `sitemap.xml` to Google Search Console after launch.

---

## 6. Navigation

### 6.1 Header (desktop, ≥ 1024 px)

```
[ANAYA logo]   Products ▾   Technology   Services*   About   Careers          [ Talk to us → ]
```
\* Only shown if the Services page is published.

- **Products ▾** opens a **mega menu** (see §6.2). Clicking the label itself goes to `/products`.
- **Talk to us** is the primary CTA button and links to `/contact`. This replaces the old "Get A Quote", which suited a services firm but not a product company. `[DRAFT]` label.
- The header is sticky. It starts transparent over the Home hero and becomes a solid, blurred surface after 24 px of scrolling.
- The active route is marked with `aria-current="page"` and an underline indicator.

### 6.2 Products mega menu

```
┌──────────────────────────────────────────────────────────────────────────┐
│  FINANCIAL              SOCIAL                 SECURITY & TRUST          │
│  ▸ [Product A]          ▸ [Product C]          ▸ [Product E]             │
│    one-line summary       one-line summary       one-line summary        │
│  ▸ [Product B]          ▸ [Product D]                                    │
│                                                                          │
│  ──────────────────────────────────────────────────────────────────────  │
│  Browse by technology:  AI & ML · Cybersecurity · PKI · Sentiment · ...  │
│                                              [ View all products → ]     │
└──────────────────────────────────────────────────────────────────────────┘
```

- Columns are generated from the **domain** taxonomy; a column with no published products is hidden.
- Each item shows the product's icon, name and `tagline` (from product data).
- If there are no published products (decision D1 fallback), the mega menu is replaced by a plain link to `/products`.
- Keyboard: opens with Enter, Space or Arrow Down; closes with Escape and returns focus to the trigger. It opens on hover with a 120 ms intent delay, and on click for touch screens.

### 6.3 Header (tablet and mobile, < 1024 px)

```
[ANAYA logo]                                  [ ☰ ]
```

- The menu button opens a **full-screen overlay** with the nav items in large type.
- "Products" expands as an accordion inside the overlay, listing products grouped by domain.
- The "Talk to us" button is pinned to the bottom of the overlay.
- Body scroll is locked while the overlay is open; focus is trapped inside it; Escape closes it.

### 6.4 Footer

```
┌───────────────────────────────────────────────────────────────────────────┐
│ [ANAYA logo]                                                              │
│ Short positioning line [DRAFT]                                            │
│                                                                           │
│ PRODUCTS            COMPANY            CONTACT                            │
│ (published list)    About              info@anaya.uk                      │
│ All products        Technology         +44 7522 405709                    │
│                     Services*          London, United Kingdom             │
│                     Careers            [Social links — only if D9]        │
│                     Contact                                               │
│ ───────────────────────────────────────────────────────────────────────── │
│ ANAYA Solutions is a trading name of ANAYASD LIMITED. Registered in       │
│ England and Wales [TBC: confirm]. Company number 09674951.                │
│ Registered office: [TBC].                                                 │
│ © {current year} ANAYASD LIMITED · Privacy · Cookies · Terms · Accessibility │
└───────────────────────────────────────────────────────────────────────────┘
```

- All values come from `siteConfig` and the product data. Nothing is hard-coded in the component.
- The copyright year is computed at build time.

### 6.5 Breadcrumbs

Shown on product detail and legal pages only:
`Home / Products / [Product name]`. Breadcrumbs are also output as `BreadcrumbList` structured data.

---

## 7. Page structure overview

Each page is a vertical stack of **section components**. The table shows the order; [04](04-page-specifications.md) gives the full detail.

| Page | Section order |
|---|---|
| Home | Hero → Product showcase → Clients (temporary) → Domains (Financial / Social) → Technology areas → Approach / why ANAYA → Final CTA |
| Products | Page hero → Filter bar → Product grid (grouped by domain) → Technology cross-links → CTA |
| Product detail | Product hero → Overview → Key capabilities → How it works → Use cases → Technology foundations → Security & trust → Deployment & integration → Media gallery → FAQ → Related products → CTA *(every section after the hero is optional and appears only when data exists)* |
| Technology | Page hero → Area index (sticky on desktop) → Area sections ×6 → Engineering foundations (capability lists) → CTA |
| Services | Page hero → Service blocks → Delivery approach → CTA |
| About | Page hero → Who we are → Purpose → Values → How we work → Company facts → CTA |
| Careers | Page hero → Why join → Values → Hiring process → Benefits (if confirmed) → Open roles / general application → CTA |
| Contact | Page hero → Contact options + form (two columns) → Office / company details |
| Legal | Simple text layout with a table of contents |
| 404 | Message → Links to Home, Products, Contact |

---

## 8. Key user journeys

**J1 — Financial services buyer evaluating a product**
Home hero → "Explore products" → Products filtered to *Financial* → Product detail → Security & trust → "Request a demo" → Contact form, prefilled with the product name.

**J2 — Technical evaluator checking depth**
Home → Technology → PKI section → related product → Product detail (technology foundations).

**J3 — Candidate**
Any page → Footer "Careers" → Careers → Hiring process → Apply by email or open role.

**J4 — Visitor arriving from a shared product link (LinkedIn)**
Product detail, with a correct pre-rendered preview card → Related products → Contact.

Each journey must work from start to end on a 360 px phone using only the keyboard or touch.
