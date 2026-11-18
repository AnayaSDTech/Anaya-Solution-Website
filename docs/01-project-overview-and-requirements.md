# 01 — Project Overview & Website Requirements

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [02 Sitemap](02-sitemap-and-page-structure.md) · [08 Content inventory & gaps](08-content-inventory-and-gaps.md)

---

## 1. Purpose of this document

This document defines **why** the ANAYA Solutions website is being rebuilt, **what** it must do, and the **rules** the team must follow. It is the reference point for every later decision in design, content and engineering.

---

## 2. Content source labels (used in every document)

ANAYA's rule is: **do not invent company information, product features or business claims.** To enforce this, every piece of content in these docs carries one of three labels:

| Label | Meaning | Can it go live? |
|---|---|---|
| `[VERIFIED]` | Taken from the current site (anaya.uk, analysed 2026-11-16) or from ANAYA's project brief. | Yes, after a final review. |
| `[DRAFT]` | New wording written for the new design. It makes **no factual claims** (no numbers, clients, features, certifications). | Only after ANAYA approves it. |
| `[TBC]` | Content ANAYA must supply. The docs reserve the space and describe what is needed. | No. The component must render nothing (or the section is hidden) until real content exists. |
| `[TEMPORARY]` | Placeholder content that ANAYA has asked to use for now: the client logo section. | Yes, at ANAYA's request. Flagged with `temporary: true` in data and listed by the validator on every build until replaced. |

Engineers must build components so that missing `[TBC]` content **hides the section**. Placeholder text must never appear on the live site (see [06 §8](06-technical-architecture.md#8-content-layer)).

---

## 3. Analysis of the existing website (anaya.uk)

### 3.1 Pages found

All six pages are linked from the header and all returned HTTP 200.

| Page | URL | What it contains |
|---|---|---|
| Home | `/` | Hero "Beyond Traditional Consultancy"; six service cards; purpose statement; four "Core Commitments"; "Expertise & Vision" (three cards); "Our Clients" logo strip. |
| Expertise | `/expertise/` | "Deep Expertise for a New Digital Era"; six technical pillars, each listing tools and frameworks; three delivery methods (Agile & DevOps, Design Thinking, Strategic IT Consulting). |
| Services | `/services/` | "Technology Services Designed for Your Ambition"; three services, each with "What we deliver" and "Ideal for". |
| About | `/about/` | Who We Are; Our Story & Purpose; four Core Values; "Our Foundation" (three points). |
| Career | `/career/` | Why join (four benefits); four values; five-step hiring process; staff benefits list. No job listings. |
| Contact | `/contact/` | Email, phone, careers email, "London, United Kingdom"; enquiry form with seven fields. |

There is no privacy policy, terms, cookie policy, blog, or product page.

### 3.2 What the company is today (as the current site presents it)

- **Positioning:** an "IT consultancy firm" offering strategy, software development, cloud, cybersecurity, integration and digital transformation services.
- **Legal entity:** "A trading name of ANAYASD LIMITED", registration number 09674951. `[VERIFIED]`
- **Location:** London, United Kingdom (no street address). `[VERIFIED]`
- **Contact:** info@anaya.uk, +44 7522 405709. `[VERIFIED]` The current site also lists career@anaya.uk; the new site uses **info@anaya.uk only**, as confirmed by ANAYA.
- **Products:** **none are described anywhere on the current site.** The new site presents two real products, ANAYA Open Banking and ANAYA CDM ([09](09-products.md)).

### 3.3 What the company wants to be (from ANAYA's brief)

ANAYA Solutions is an **AI product-based technology company** that develops products in the **financial and social domains**. Its technology areas are: `[VERIFIED — brief]`

1. Artificial Intelligence and Machine Learning
2. Cybersecurity
3. Public Key Infrastructure (PKI)
4. Social Sentiment Intelligence
5. Financial Intelligence
6. Other AI-powered technologies and products

### 3.4 Problems found on the current site

The new site must not carry these over.

| # | Problem | Action for the rebuild |
|---|---|---|
| P1 | The footer `mailto:` goes to `info@aaifiancials.com`, and the Contact page link is malformed (`https://mailto:info@anayasolutions.com/`). The visible address is `info@anaya.uk`. | **Resolved:** ANAYA confirmed `info@anaya.uk` as the single email address for the whole site, read from `siteConfig`. |
| P2 | The "Cloud Transformation Services" card on Home still shows Lorem ipsum text. | Remove it. Never ship placeholder text (content validation script, [06 §8.4](06-technical-architecture.md#84-content-validation)). |
| P3 | The Home counters ("Project Delivery Success", "Client Satisfaction Rate", "Technologies Mastered") show no figures. | Do not show statistics unless ANAYA supplies real, defensible figures. |
| P4 | Every "Get A Quote", "Contact Us" and footer service link points to `#`. | Every CTA must route to a real destination. A link checker runs at build time. |
| P5 | Home and footer list six services, Services lists three, and the Contact dropdown uses a third set of names. | One `services` data source feeds every list. |
| P6 | The "Our Clients" strip shows Lloyds Bank, Barclays, Cynergy Bank, J.P. Morgan and TSB logos (identified by file name). No text says they are clients. | **Kept temporarily at ANAYA's request** as a `[TEMPORARY]` section ([04 §1.3](04-page-specifications.md#13-clients-temporary)), switchable with `site.features.clientsSection`. Third-party logos generally need the owner's permission, so ANAYA should confirm each relationship and permission, then keep, replace or switch off the section. |
| P7 | The Career page lists benefits (dental, vision, retirement matching) that read like a template. | Show them only after ANAYA confirms each one is accurate. |
| P8 | No privacy policy, cookie notice or terms, although the site collects personal data through a form. | Add legal pages (see §6.5). |
| P9 | The registered office address is not shown. UK company websites must show the registered name, registration number, place of registration and registered office address. | Add these to the footer and legal page. **ANAYA must supply the address.** |
| P10 | All photos are generic stock images (e.g. an astronaut portrait, a chess-playing robot). | Replace them with an abstract visual system and real product UI (see [03 §8](03-design-system.md#8-imagery)). |

### 3.5 Content that can be reused

These parts of the current site are factual and fit the new positioning. Re-edit them, but keep their meaning:

- The company's purpose ("technology should be a force for human progress") and values: integrity, transparency, collaboration, people first.
- The technical capability lists on the Expertise page (useful supporting proof under "Technology").
- The engineering and advisory services (moved to a secondary "Services" page, if ANAYA still offers them; see decision D2).
- The hiring process (five steps) and the careers contact.
- The legal entity and registration details.

The full reusable inventory is in [08](08-content-inventory-and-gaps.md).

---

## 4. Project goals

| # | Goal | How we will know |
|---|---|---|
| G1 | Reposition ANAYA from an "IT consultancy" to an **AI product company** working in financial and social domains. | Products are the first item in the navigation, the Home hero and the Home page's first content section. "Consultancy" wording is removed from primary messaging. |
| G2 | Present each product clearly and consistently. | Every product uses the same detail page template, generated from one data file. |
| G3 | Look like a credible international AI / fintech / cybersecurity company. | Design review against [03](03-design-system.md); no stock-photo clichés; consistent tokens. |
| G4 | Make adding products and pages easy. | A new product goes live by adding **one data file and its images**, with no component changes ([05 §9](05-product-presentation-strategy.md#9-adding-a-new-product)). |
| G5 | Excellent experience on every device. | Passes the responsive checks in [03 §10](03-design-system.md#10-responsive-behaviour) and the performance budgets in §6.3. |
| G6 | Be trustworthy and compliant. | Zero unverified claims; legal pages live; WCAG 2.2 AA. |

---

## 5. Target audiences

The audiences below follow from ANAYA's stated domains. ANAYA should confirm their priority order. `[DRAFT]`

| Audience | What they need from the site | Primary pages |
|---|---|---|
| Prospective customers in **financial services** | Understand which ANAYA products apply to them; see capabilities, security posture and how to start a conversation. | Products, product detail, Contact |
| Prospective customers and partners in **social / public-facing domains** (e.g. organisations that track public sentiment) | Understand the sentiment intelligence products and their use cases. | Products, product detail, Contact |
| Security and technical evaluators | Judge technical depth: AI/ML, cybersecurity, PKI. | Technology, product detail (security section) |
| Investors and partners | Understand the company, its focus and its direction. | Home, About, Products |
| Job candidates | Understand the culture, values and hiring process; find a way to apply. | Careers, About |

---

## 6. Requirements

### 6.1 Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | A **Home** page that leads with AI products and the domains ANAYA serves. | Must |
| FR-02 | A **Products** overview page listing all published products, filterable by domain and technology area. | Must |
| FR-03 | A **product detail page** for every product, rendered from one shared template and one data file per product. | Must |
| FR-04 | A **Technology** page covering the six technology areas from the brief, linking to related products. | Must |
| FR-05 | An **About** page (purpose, values, approach, company details). | Must |
| FR-06 | A **Careers** page (why join, values, hiring process, how to apply). Open roles are shown only when the roles list has entries. | Must |
| FR-07 | A **Contact** page with an accessible enquiry form that works with no backend (see [06 §11](06-technical-architecture.md#11-contact-form-without-a-backend)). | Must |
| FR-08 | **Legal pages:** Privacy Policy, Cookie Policy, Terms of Use, Accessibility Statement. | Must |
| FR-09 | A **Services** page for engineering and advisory services, if ANAYA confirms it still offers them (decision D2). | Should |
| FR-10 | A **404** page that offers navigation back to key pages. | Must |
| FR-11 | **Redirects** from the old URLs (`/expertise/`, `/career/`, etc.) to their new equivalents. | Must |
| FR-12 | A **header** with a products mega menu on desktop and a full-screen menu on mobile; a **footer** with company and legal details. | Must |
| FR-13 | Per-page **SEO metadata** (title, description, canonical, Open Graph, Twitter card) and **structured data** (Organization, Product/SoftwareApplication, BreadcrumbList). | Must |
| FR-14 | Optional per-product "Request a demo" CTA that prefills the contact form with the product name. | Should |
| FR-15 | Future-ready, without building them now: Insights/News, Industries, and product sub-pages. The architecture must allow adding them without restructuring. | Could |

### 6.2 Content requirements

1. **No invented content.** Every statement must be `[VERIFIED]`, an approved `[DRAFT]`, or `[TEMPORARY]` content that ANAYA has explicitly asked for (temporary products and the client section).
2. **Products are the primary offering.** Services, if kept, are secondary and framed as supporting product delivery and customer success.
3. **Plain, confident, international English** (UK spelling). Avoid hype words such as "revolutionary", "world-leading" and "cutting-edge" unless ANAYA can prove the claim.
4. **No statistics, testimonials, certifications, awards or partner badges** without written evidence and permission. The client logo section is the one temporary exception, at ANAYA's request.
5. **Product status must be accurate.** A product shows "Available", "Pilot", "In development" or similar only as confirmed by ANAYA (see [05 §4](05-product-presentation-strategy.md#4-product-lifecycle-status)).

### 6.3 Non-functional requirements

| ID | Area | Requirement |
|---|---|---|
| NFR-01 | Responsiveness | Works from 320 px to 1920 px+ wide. Tested at 360, 390, 768, 1024, 1280, 1440 and 1920 px. No horizontal scrolling at any width. |
| NFR-02 | Performance | Core Web Vitals at the 75th percentile on mobile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Lighthouse Performance ≥ 90 on mobile for Home and a product page. |
| NFR-03 | Page weight | Initial JS ≤ 170 KB gzipped per route; hero image ≤ 200 KB; total initial page load ≤ 1 MB. |
| NFR-04 | Accessibility | WCAG 2.2 level AA. Full keyboard support, visible focus, `prefers-reduced-motion` honoured, colour contrast ≥ 4.5:1 for body text. |
| NFR-05 | SEO | Every route is pre-rendered to static HTML with its own metadata, so search engines and link previews (LinkedIn, X, Slack) see real content without running JavaScript. |
| NFR-06 | Browser support | Latest two versions of Chrome, Edge, Firefox and Safari (macOS and iOS); Samsung Internet. No Internet Explorer. |
| NFR-07 | Static hosting | The build output is plain static files. No server, database or server-side runtime. |
| NFR-08 | Privacy | No cookies or trackers are set by default. If analytics are added, use a cookieless tool or add a consent banner (UK GDPR / PECR). Fonts are self-hosted, not loaded from Google's servers. |
| NFR-09 | Security | A strict Content Security Policy and security headers set at the host (see [06 §13](06-technical-architecture.md#13-hosting-deployment-and-security-headers)). No secrets in the client bundle. |
| NFR-10 | Maintainability | Content lives in data files, separate from components. A developer can add a product in under an hour. |

### 6.4 Technology stack (from ANAYA's brief)

| Need | Choice |
|---|---|
| UI library | ReactJS |
| Build tool | Vite |
| Language | JavaScript (ES2022+), no TypeScript |
| Styling | CSS3: global custom properties (design tokens) + CSS Modules |
| Routing | React Router (used in framework mode with static pre-rendering; see [06 §3](06-technical-architecture.md#3-key-architecture-decisions)) |
| Icons | Lucide React |
| Animation | Framer Motion (now published as the `motion` package) |
| Backend / database | None |

### 6.5 Legal and compliance (UK)

The new site needs the following. ANAYA's legal adviser must approve the final wording; the development team does not write legal text.

- **Company disclosure** in the footer and on the Terms page: registered name (ANAYASD LIMITED), registration number (09674951), place of registration, and registered office address `[TBC]`.
- **Privacy Policy** covering the contact form data: what is collected, why, the legal basis, retention period, recipients, and the visitor's rights, with ICO details.
- **Cookie Policy.** Not needed for essential-only cookies, but kept to state that no non-essential cookies are used. If analytics are added, a consent mechanism is required.
- **Accessibility Statement.**
- **Trademark use.** Third-party logos are used only with permission (see P6).

---

## 7. Scope

**In scope (Phase 1)**
- Full new design and build of the pages listed in [02](02-sitemap-and-page-structure.md).
- The product template and data model, ready for any number of products.
- Redirects, SEO setup, pre-rendering, legal page shells, deployment setup.

**Out of scope (Phase 1)**
- Backend, CMS, user accounts, customer portals or live product demos.
- Blog / Insights (the architecture allows it; it is not built now).
- Localisation into other languages (the architecture keeps strings in data files, so this can be added later).
- Writing legal text or product content, which ANAYA must supply.

---

## 8. Open decisions for ANAYA

These must be resolved before content freeze. Each is also tracked in [08](08-content-inventory-and-gaps.md).

| ID | Decision | Default if no answer |
|---|---|---|
| D1 | Product names, descriptions, features and status for each product. | **Decided (2026-11-18):** ANAYA Open Banking and ANAYA CDM ([09](09-products.md)); wording awaits product-owner approval. |
| D2 | Does ANAYA still offer engineering / advisory services to clients? | Services page is not published; the route and components are ready. |
| D3 | The confirmed public email address(es). | **Decided:** `info@anaya.uk` for everything, including careers. |
| D4 | Registered office address. | Launch is **blocked** until supplied (legal requirement). |
| D5 | Client logos, partner logos, certifications, statistics. | **Decided for now:** the client logo section is kept as `[TEMPORARY]`. No partner logos, certifications or statistics. |
| D6 | Analytics: none, cookieless, or full with consent. | None. |
| D7 | Contact form delivery: `mailto:` only, or a hosted form service. | `mailto:` (see [06 §11](06-technical-architecture.md#11-contact-form-without-a-backend)). |
| D8 | Logo source files (SVG) and any existing brand colours. | **Decided:** a new logo has been created ([03 §12](03-design-system.md#12-logo), files in `docs/brand/`) with the palette in [03](03-design-system.md). |
| D9 | Social media profiles (e.g. LinkedIn). | No social links are shown. |
| D10 | Domain and hosting provider. | `anaya.uk`; any static host that supports redirects and headers. |

---

## 9. Success criteria for Phase 1 launch

- [ ] Every page in the Phase 1 sitemap is built and passes design review.
- [ ] Product pages for ANAYA Open Banking and ANAYA CDM approved by the product owner ([09](09-products.md)).
- [ ] Zero `[TBC]` or `[DRAFT]` markers in the production build (enforced by the validation script). `[TEMPORARY]` content is allowed but listed in the build output.
- [ ] Zero links to `#` and zero broken links.
- [ ] Lighthouse mobile scores of at least 90 in Performance, Accessibility, Best Practices and SEO on Home, Products and a product page.
- [ ] Old URLs redirect with HTTP 301.
- [ ] Legal pages approved and live; company disclosure complete.
