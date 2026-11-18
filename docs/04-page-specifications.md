# 04 — Page-wise Design & Content Specifications

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [02 Sitemap](02-sitemap-and-page-structure.md) · [03 Design system](03-design-system.md) · [05 Product strategy](05-product-presentation-strategy.md) · [07 Components](07-component-library.md)

Labels: `[VERIFIED]` from anaya.uk or ANAYA's brief · `[DRAFT]` new wording, no factual claims, needs approval · `[TBC]` must be supplied by ANAYA. See [01 §2](01-project-overview-and-requirements.md#2-content-source-labels-used-in-every-document).

Each page is described as a stack of sections. For every section: **purpose**, **component(s)**, **content**, **layout per breakpoint** and **motion**.

---

## 0. Global layout (all pages)

```
<SkipLink/>
<SiteHeader/>          sticky; transparent over dark heroes, solid after scroll
<main id="main">
  ...page sections...
</main>
<SiteFooter/>
```

- Every page sets its own `<title>`, meta description, canonical URL and Open Graph image through the route's `meta` export (see [06 §9](06-technical-architecture.md#9-seo-metadata-and-structured-data)).
- Title pattern: `{Page title} | ANAYA Solutions`. Home: `ANAYA Solutions — {positioning line}` `[DRAFT]`.
- Section surfaces alternate to create rhythm. Default: dark (`ink`) for heroes and showcases; `paper` is available for long reading sections.
- Every page ends with a **CTA band** (`CtaBand` component), except Contact and legal pages.

---

## 1. Home — `/`

**Purpose:** State in five seconds that ANAYA is an AI product company working in financial and social domains, and move visitors to products.

### 1.1 Hero
| Item | Spec |
|---|---|
| Component | `HeroHome` |
| Surface | `ink-950` with the animated **signal field** (canvas) on the right half on desktop and behind the text on mobile at reduced opacity |
| Eyebrow | `AI PRODUCTS · FINANCIAL · SOCIAL` `[DRAFT]` |
| Heading (h1) | "AI products for **financial and social intelligence**." `[DRAFT]` (gradient highlight on the bold phrase) |
| Lead | "ANAYA Solutions builds AI-powered products for the financial and social domains, combining machine learning, cybersecurity and public key infrastructure." `[DRAFT]`, based on the brief |
| CTAs | Primary **Explore products** → `/products`; secondary (ghost) **Talk to us** → `/contact` |
| Below CTAs | A row of six small technology chips (from `technology.js`): AI & ML · Cybersecurity · PKI · Social Sentiment · Financial Intelligence · Other AI. Each links to `/technology#{slug}`. `[VERIFIED — brief]` |
| Layout | Desktop: text in columns 1–7, visual in 8–12, min-height `min(88vh, 860px)`. Mobile: text stacked, visual behind at 30% opacity; CTAs full width. |
| Motion | Heading lines reveal one by one (60 ms stagger); signal field fades in after 300 ms. |
| Must not include | Statistics, client logos, "trusted by…" claims. |

### 1.2 Product showcase
| Item | Spec |
|---|---|
| Purpose | Products are the main offering, so they come first. |
| Component | `SectionHeader` + `ProductShowcase` |
| Eyebrow / heading | `PRODUCTS` / "Our products" `[DRAFT]` |
| Content | Up to **4 featured products** (`featured: true` in product data), ordered by `order`. At launch these are ANAYA Open Banking and ANAYA CDM ([09](09-products.md)). Each `ProductCard` (large variant) shows: domain tag, status badge, icon, name, tagline, up to 3 capability bullets, "View product →". |
| Layout | Desktop: the first card is large (spans 7 columns, with a product visual), the others stack in 5 columns. Tablet: 2 columns. Mobile: 1 column. |
| Link | "View all products →" → `/products` |
| Empty state | If no products are published (decision D1 fallback), this section is replaced by the **Product areas** grid: six cards from the technology areas with the text "Products in this area — talk to us to learn more." `[DRAFT]` |
| Motion | Cards reveal with stagger. |

### 1.3 Clients (temporary)
| Item | Spec |
|---|---|
| Purpose | Kept from the current site at ANAYA's request, as a `[TEMPORARY]` section. |
| Component | `ClientLogoStrip` |
| Switch | Shown only when `site.features.clientsSection` is `true`. Turning it off removes the section with no other changes. |
| Heading | Eyebrow `CLIENTS` / "Our Clients" `[VERIFIED — current site heading]` |
| Content | Logos from `src/content/clients.js`. Initial list, as on the current site: Lloyds Bank, Barclays, Cynergy Bank, J.P. Morgan, TSB `[TEMPORARY]`. Use the logo files from the current site or official brand-asset pages; do not redraw them. Each logo has `alt` text with the company name and no link. |
| Design | Slim band on `ink-900` with top and bottom hairlines. Logos shown in a single tone (white at 60% opacity, full opacity on hover) so they sit quietly beside ANAYA's palette. If a logo owner's guidelines forbid recolouring, show that logo in its original colours on a neutral tile instead. Logo height 28–36 px, optically balanced. |
| Layout | Desktop: one row, evenly spaced. Tablet: one row, smaller gaps. Mobile: 2–3 per row in a wrapping grid. No auto-scrolling marquee (it is distracting and harder to make accessible). |
| Motion | Simple fade-in reveal. |
| Must not include | Claims such as "trusted by", numbers of clients, or case-study links, unless confirmed. |

### 1.4 Domains
| Item | Spec |
|---|---|
| Purpose | Show the two domains ANAYA focuses on, from the brief. |
| Component | `DomainSplit` |
| Eyebrow / heading | `WHERE WE WORK` / "Built for two domains where accuracy matters" `[DRAFT]` |
| Content | Two large panels: **Financial** and **Social**. Each has the domain icon, the domain name `[VERIFIED — brief]`, a 1–2 sentence description `[TBC — ANAYA to approve wording]`, and a list of products in that domain (generated). A third, smaller panel for **Security & Trust** (Cybersecurity + PKI) appears only if products are tagged with it. |
| Layout | Desktop: two equal panels side by side with domain colour hairlines. Mobile: stacked. |

### 1.5 Technology areas
| Item | Spec |
|---|---|
| Component | `SectionHeader` + `TechAreaGrid` |
| Eyebrow / heading | `TECHNOLOGY` / "The technology behind our products" `[DRAFT]` |
| Content | Six `TechAreaCard`s from `technology.js`: icon, area name `[VERIFIED — brief]`, one-sentence summary `[TBC]`. Each links to `/technology#{slug}`. |
| Layout | 3 × 2 on desktop, 2 × 3 on tablet, 1 column on mobile. Card hover shows the domain hairline. |

### 1.6 Approach (why ANAYA)
| Item | Spec |
|---|---|
| Component | `FeatureList` (numbered variant) on `paper` surface |
| Eyebrow / heading | `OUR APPROACH` / "How we build" `[DRAFT]` |
| Content | Three to four points re-edited from the current site's verified content: **Human-centred technology** (from "To Humanize Technology", "people first"); **Built with integrity** (from "To Build with Integrity": transparency, ethical standards); **Sustainable progress** (from "To Drive Sustainable Progress": solutions that adapt and scale); **Experienced team** (from "Expertise & Vision": "the ANAYA name is new; our expertise is seasoned and proven"). `[VERIFIED — re-edit]` |
| Layout | Desktop: heading left (4 cols), list right (8 cols). Mobile: stacked. |

### 1.7 Final CTA
| Item | Spec |
|---|---|
| Component | `CtaBand` |
| Heading | "Let's talk about what our products can do for you." `[DRAFT]` |
| CTAs | **Talk to us** → `/contact`; **Explore products** → `/products` |

**Removed from the current Home page:** empty counters, Lorem ipsum card, astronaut stock image, the six consultancy service cards. (The client logos are kept temporarily; see §1.3.)

**SEO:** title `ANAYA Solutions — AI products for financial and social intelligence` `[DRAFT]`; description ≤ 155 characters `[DRAFT]`; structured data `Organization` + `WebSite`.

---

## 2. Products — `/products`

**Purpose:** Let visitors see every product and find relevant ones quickly.

### 2.1 Page hero
| Item | Spec |
|---|---|
| Component | `PageHero` (compact) |
| Eyebrow / h1 | `PRODUCTS` / "AI-powered products for finance and society" `[DRAFT]` |
| Lead | One sentence, `[DRAFT]` |

### 2.2 Filter bar
| Item | Spec |
|---|---|
| Component | `ProductFilterBar` |
| Filters | **Domain** (All, Financial, Social, Security & Trust) as single-select chips; **Technology** (six areas) as multi-select chips; result count ("6 products"). Filters that would return no products are hidden. |
| State | Stored in the URL query (`?domain=financial&tech=pki,ai-ml`) so links are shareable. |
| Behaviour | Filtering is client-side and instant. The pre-rendered HTML contains all products (good for SEO); filtering hides non-matching ones after hydration. |
| A11y | Chips are toggle buttons (`aria-pressed`). The result count is in an `aria-live="polite"` region. |
| Mobile | Domain chips scroll horizontally; technology filters move into a bottom sheet opened by a "Filters" button. |

### 2.3 Product grid
| Item | Spec |
|---|---|
| Component | `ProductGrid` of `ProductCard` (standard variant) |
| Grouping | When no filter is active, products are grouped under domain headings (h2). When a filter is active, it is a flat list. |
| Card content | Icon, name, tagline, domain tag, status badge, up to 3 technology tags, "View product →". The whole card is clickable (one link, not nested links). |
| Ordering | By `order`, then name. |
| Empty state | "No products match these filters." + "Clear filters" button. |
| D1 fallback | If no product is published, show the six **product areas** (technology areas) with a Talk-to-us CTA. |

### 2.4 Technology cross-links & CTA
- A slim `TechAreaStrip` listing the six areas linking to `/technology#{slug}`.
- `CtaBand`: "Not sure which product fits? Talk to us." `[DRAFT]`

**SEO:** structured data `ItemList` of products.

---

## 3. Product detail — `/products/:productSlug`

The full template, data model and section rules are in [05 Product presentation strategy](05-product-presentation-strategy.md). This is the visual summary.

```
┌ ProductHero ────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home / Products / Name                                     │
│ [domain tag] [status badge]                                             │
│ Product Name (h1)                                                       │
│ Tagline (lead)                                   [ product visual /     │
│ [Request a demo]  [Talk to us]                     abstract visual ]    │
├ ProductSubnav (sticky, desktop) ────────────────────────────────────────┤
│ Overview · Capabilities · How it works · Use cases · Security · FAQ     │
├─────────────────────────────────────────────────────────────────────────┤
│ Overview         problem → approach → outcome (text + highlights)       │
│ Capabilities     grid of FeatureCards (icon, title, description)        │
│ How it works     numbered steps with simple diagram                     │
│ Use cases        cards per audience / scenario                          │
│ Technology       tech-area chips + short notes                          │
│ Security & trust verified statements only                               │
│ Deployment       options / integrations (if supplied)                   │
│ Gallery          screenshots in WindowFrame, lightbox                   │
│ FAQ              accordion                                              │
│ Related products 2–3 ProductCards                                       │
│ CtaBand          product-specific CTA                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

- Every section after the hero **renders only if its data exists**. The sticky sub-navigation lists only the sections that render.
- Hero visual priority: product screenshot (if supplied) → product-specific abstract visual → the generic signal field.
- The product's domain colour drives the accent hairlines, icon tint and tag on that page.
- "Request a demo" appears only when `cta.demo` is `true` in product data; it links to `/contact?product={slug}&type=demo`.

**SEO:** title `{name} — {tagline} | ANAYA Solutions`; Open Graph image per product (1200 × 630, generated or supplied); structured data `SoftwareApplication` (or `Product`) + `BreadcrumbList` + `FAQPage` when FAQs exist. Only fields with verified data are output.

---

## 4. Technology — `/technology`

**Purpose:** Show the technical depth behind the products, across the six areas in the brief.

### 4.1 Page hero
- Eyebrow `TECHNOLOGY` / h1 "The technology behind ANAYA's products" `[DRAFT]` / lead `[DRAFT]`.
- Visual: an abstract network diagram whose six nodes are labelled with the six areas.

### 4.2 Area index
- Desktop: a sticky left column (3 cols) listing the six areas; the current section is highlighted as you scroll (IntersectionObserver).
- Mobile: a "Jump to…" select at the top.

### 4.3 Area sections (×6)
One `TechAreaSection` per area, anchored by `id={slug}`:

| Field | Content |
|---|---|
| Eyebrow | Area number `01`–`06` in mono |
| Heading | Area name `[VERIFIED — brief]` |
| Description | 2–4 sentences on ANAYA's work in this area `[TBC]` |
| Capabilities | Bullet list. For **AI & ML** and **Cybersecurity**, the verified lists from the current Expertise page can be reused, for example: Machine Learning (TensorFlow, PyTorch, Scikit-learn); Natural Language Processing; Computer Vision & Predictive Analytics; AI Model Deployment & MLOps; security frameworks (ISO 27001, NIST, CIS Benchmarks); Cloud Security & IAM; Vulnerability Assessment & Penetration Testing; Data Encryption & Privacy-by-Design (GDPR, CCPA). `[VERIFIED]` For PKI, Social Sentiment Intelligence and Financial Intelligence: `[TBC]`. |
| Related products | Product cards generated from products tagged with this area (hidden if none) |

> **Wording caution:** the current site lists frameworks such as ISO 27001 and NIST as areas of *expertise*. The new site must not imply ANAYA is *certified* against them unless ANAYA supplies certificates.

### 4.4 Engineering foundations
- A compact, collapsible `CapabilityMatrix` reusing the verified tool lists from the current Expertise page: Cloud & DevOps; Advanced Software Development; System Integration & API Services. `[VERIFIED]`
- Purpose: supporting proof of engineering depth, kept visually secondary.

### 4.5 CTA band
"Want to go deeper on the technology? Talk to our team." `[DRAFT]`

**SEO:** structured data `BreadcrumbList`.

---

## 5. Services — `/services` (only if decision D2 = yes)

**Purpose:** Present engineering and advisory services as **secondary** to products. They are positioned as how ANAYA helps customers adopt and extend its products, or as stand-alone engagements, depending on ANAYA's answer.

| Section | Component | Content |
|---|---|---|
| Hero | `PageHero` | Eyebrow `SERVICES` / h1 `[DRAFT]` / lead `[DRAFT]` |
| Service blocks | `ServiceBlock` ×N, alternating media side | Verified from the current Services page: **AI & Data Strategy**, **Custom Software Development**, **Cloud & DevOps Transformation**, each with "What we deliver" and "Ideal for". `[VERIFIED]` Additional services from the Home/footer list (Cybersecurity & Governance, System Integration & API Services, Digital Transformation Consulting) only if ANAYA confirms they are offered. |
| Delivery approach | `FeatureList` | Agile & DevOps Practices; Design Thinking; Strategic IT Consulting `[VERIFIED — from Expertise page]` |
| CTA | `CtaBand` | "Have a specific challenge in mind?" `[VERIFIED]` + **Talk to us** |

The Services page is not in the primary nav if D2 = no; the route then redirects to `/products`.

---

## 6. About — `/about`

| Section | Component | Content |
|---|---|---|
| Hero | `PageHero` | Eyebrow `ABOUT` / h1 `[DRAFT]` e.g. "An AI product company with a human purpose" / lead `[DRAFT]` |
| Who we are | `SplitText` | Re-edit of the current "Who We Are" copy, repositioned from "consultants" to "product company". `[VERIFIED — re-edit; ANAYA to approve]` |
| Purpose | `Statement` (large quote style) | "Technology should be a force for human progress." Re-edited from "More Than Technology: We Believe in Empowered Potential". `[VERIFIED — re-edit]` |
| Values | `ValueGrid` (4 cards) | Strategic Partnership; Uncompromising Excellence; Collaborative Innovation; Integrity & Trust. `[VERIFIED]` |
| How we work | `FeatureList` | "Decades of Collective Experience", "Dedicated Teams of Experts", "A Culture of Continuous Learning". `[VERIFIED]` Avoid stating years or numbers not on the current site. |
| Leadership | `TeamGrid` | **Hidden** until ANAYA supplies names, roles, photos and consent. `[TBC]` |
| Company facts | `FactList` | Trading name of ANAYASD LIMITED · Company number 09674951 · London, United Kingdom `[VERIFIED]` · Founded `[TBC]` (shown only if supplied) |
| CTA | `CtaBand` | "Feel like we'd be a good fit?" `[VERIFIED]` + **Talk to us** / **See careers** |

**SEO:** `AboutPage` + `Organization` structured data.

---

## 7. Careers — `/careers`

| Section | Component | Content |
|---|---|---|
| Hero | `PageHero` | h1 "Build What's Next, Build Your Career" `[VERIFIED]`; lead re-edited `[VERIFIED — re-edit]` |
| Why join | `FeatureGrid` (4) | Work on Cutting-Edge Technology; Continuous Learning & Development; A Culture of Collaboration; Impact from Day One. `[VERIFIED]` Rename the first to "Work on AI products" only with approval. `[DRAFT]` |
| Values | `ValueGrid` (4) | Innovation with Purpose; Excellence as Standard; Collaborative Integrity; Driven to Grow. `[VERIFIED]` |
| Hiring process | `ProcessSteps` (5) | Application Review → Screening Call (20–30 min with HR) → Technical Assessment → Team Interview (virtual or in person) → Offer. `[VERIFIED]` Horizontal timeline on desktop, vertical on mobile. |
| Benefits | `BenefitList` | The current list (competitive compensation and bonuses; health insurance; flexible hours and remote work; paid time off; retirement plan with matching; home office stipend) is shown **only after ANAYA confirms each item**. `[TBC — verify]` |
| Open roles | `RoleList` | Rendered from `content/roles.js`. If empty: "We don't have open roles right now, but we'd still like to hear from you." `[DRAFT]` + email **info@anaya.uk** (subject prefilled "Careers enquiry") `[VERIFIED]` |
| CTA | `CtaBand` | "Ready to Build the Future with Us?" `[VERIFIED]` |

Photos: only real ANAYA team photos (if supplied); otherwise abstract visuals. Do not reuse the current stock photos.

**SEO:** if roles exist, each role outputs `JobPosting` structured data (when `/careers/:roleSlug` is built in a later phase).

---

## 8. Contact — `/contact`

### 8.1 Layout
Desktop: two columns. Left (5 cols): heading, intro, contact options. Right (7 cols): form card. Mobile: stacked, contact options first.

### 8.2 Content
| Item | Content |
|---|---|
| Eyebrow / h1 | `CONTACT` / "Let's Start a Conversation" `[VERIFIED]` |
| Intro | "Have a challenge to solve or an idea to explore? Reach out to us. Our team is ready to partner with you and build the future." `[VERIFIED]` |
| Contact options | Email: info@anaya.uk · Phone: +44 7522 405709 · Office: London, United Kingdom `[VERIFIED]`. One email address is used for all enquiries, including careers (decision D3). Each is a `ContactCard` with an icon (`Mail`, `Phone`, `MapPin`) and a working `mailto:` / `tel:` link. |
| Social | Only if decision D9 provides profiles. |

### 8.3 Form fields (redesigned for a product company)
| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | Yes | `autocomplete="name"` |
| Work email | email | Yes | `autocomplete="email"`; format validation |
| Company | text | No | `autocomplete="organization"` |
| Phone | tel | No | `autocomplete="tel"` |
| Enquiry type | select | Yes | Product enquiry · Request a demo (only if demos are offered) · Partnership · Careers · Other `[DRAFT]` |
| Product of interest | select | No | Generated from published products + "Not sure yet". Prefilled from `?product=` |
| Message | textarea | Yes | 20–2000 characters; live character count |
| Privacy consent | checkbox | Yes | "I agree to ANAYA processing my details to respond to this enquiry, as described in the Privacy Policy." `[DRAFT — legal to approve]` |

The current form's "Project Budget" field and its service list are **removed**: they suited a consultancy, not a product company.

### 8.4 Behaviour
- Validate on blur and on submit; errors are shown inline under each field and summarised at the top (linked to the fields) on submit.
- Submission behaviour depends on decision D7; see [06 §11](06-technical-architecture.md#11-contact-form-without-a-backend).
- Success state: replace the form with a confirmation panel ("Thank you — we'll be in touch.") `[DRAFT]`. Focus moves to the confirmation heading.
- Privacy line: "We respect your privacy and will never share your information with third parties." `[VERIFIED]` + link to the Privacy Policy.

**SEO:** `ContactPage` structured data.

---

## 9. Legal pages — `/legal/privacy`, `/legal/cookies`, `/legal/terms`, `/accessibility`

- Component: `LegalLayout`: narrow container, page title, "Last updated" date, auto-generated table of contents from h2s (sticky on desktop), readable body styles.
- Content: Markdown files supplied and approved by ANAYA's legal adviser. `[TBC]` Developers must not write legal text.
- The Terms page includes the company disclosure block (see [01 §6.5](01-project-overview-and-requirements.md#65-legal-and-compliance-uk)).
- Surface: `paper` (light) for comfortable reading.

---

## 10. 404 — `*`

- Component: `NotFound`.
- Content: h1 "Page not found" `[DRAFT]`; one sentence; three links: Home, Products, Contact.
- Visual: the signal field with one "broken" node (static if reduced motion).
- `<meta name="robots" content="noindex">`. The host returns HTTP 404 for unknown paths, serving the pre-rendered `404.html`.

---

## 11. Page QA checklist (every page)

- [ ] Only `[VERIFIED]` or approved content; no `[DRAFT]`/`[TBC]` markers remain.
- [ ] One h1; logical heading order.
- [ ] Unique title and meta description; canonical URL; OG image.
- [ ] Every link and CTA goes to a real destination.
- [ ] Checked at 360, 768, 1024, 1440 px; no horizontal scroll.
- [ ] Keyboard-only walk-through works; focus is always visible.
- [ ] Reduced-motion check: no essential content depends on animation.
- [ ] Lighthouse mobile ≥ 90 on all four categories.
