# 08 — Content Inventory & Content Gap Register

> Status: Draft v1.0 · Last updated: 2026-11-16
> Source: analysis of https://anaya.uk/ (pages: `/`, `/expertise/`, `/services/`, `/about/`, `/career/`, `/contact/`) on 2026-11-16, and ANAYA's project brief.

This is the single list of **what content exists** and **what ANAYA must still supply**. Copywriters and developers should use it as the source of truth. Wording on the current site should be re-checked against the live pages before reuse.

---

## 1. Verified content that can be reused

### 1.1 Company facts
| Item | Value | Source |
|---|---|---|
| Brand name | ANAYA Solutions | Site-wide |
| Legal entity | ANAYASD LIMITED ("A trading name of ANAYASD LIMITED") | Footer |
| Registration number | 09674951 | Footer |
| Location | London, United Kingdom | Contact, footer |
| Email | info@anaya.uk, confirmed by ANAYA as the only address for the new site (the old career@anaya.uk is not used) | Contact, footer; ANAYA decision |
| Phone | +44 7522 405709 | Contact, footer |
| Business focus (new) | AI product company; products in financial and social domains | Brief |
| Technology areas (new) | AI & ML; Cybersecurity; PKI; Social Sentiment Intelligence; Financial Intelligence; Other AI-powered technologies and products | Brief |

### 1.2 Purpose, commitments and values
| Item | Content | Source | Use on new site |
|---|---|---|---|
| Purpose | "More Than Technology: We Believe in Empowered Potential" (technology as a force for human progress) | Home | About → Purpose |
| Core commitments | To Champion Your Vision; To Humanize Technology; To Build with Integrity; To Drive Sustainable Progress | Home | Home → Approach (re-edited) |
| Expertise & Vision | Collective Experience; Future-Proof Vision; Foundational Partnership; "the ANAYA name is new" but the expertise is "seasoned and proven" | Home | Home → Approach |
| Who we are | "More Than Consultants—We Are Your Catalysts for Change"; "a seamless extension of your team"; smart, scalable, secure solutions | About | About → Who we are (reposition away from "consultants") |
| Our why | Founded on the view that businesses have potential but lack the right technology partner | About | About (re-edited) |
| Core values (company) | Strategic Partnership; Uncompromising Excellence; Collaborative Innovation; Integrity & Trust | About | About → Values |
| Foundation | Decades of Collective Experience; Dedicated Teams of Experts; A Culture of Continuous Learning | About | About → How we work |

### 1.3 Technical capability lists (Expertise page)
| Pillar | Listed items |
|---|---|
| Artificial Intelligence & Machine Learning | Machine Learning (TensorFlow, PyTorch, Scikit-learn); Natural Language Processing; Computer Vision & Predictive Analytics; AI Model Deployment & MLOps |
| Cloud & DevOps | AWS, Microsoft Azure, Google Cloud Platform; Terraform, AWS CloudFormation; Jenkins, GitLab CI, GitHub Actions; Docker, Kubernetes |
| Advanced Software Development | React, Angular, Vue.js, TypeScript; Python (Django/Flask), Node.js, Java Spring Boot, .NET; Swift, Kotlin, Flutter; PostgreSQL, MySQL, MongoDB, DynamoDB |
| Cybersecurity & Governance | ISO 27001, NIST, CIS Benchmarks (as frameworks, **not** certifications); Cloud Security & IAM; Vulnerability Assessment & Penetration Testing; Data Encryption & Privacy-by-Design (GDPR, CCPA) |
| System Integration & API Services | MuleSoft, Dell Boomi, Apache Kafka; REST, GraphQL, API gateways on AWS/Azure; ETL, data warehousing, legacy modernisation; ESB, message queues |
| Digital Transformation Consulting | IT strategy and roadmapping; change management; vendor management; CIO advisory |
| Methods | Agile & DevOps Practices; Design Thinking; Strategic IT Consulting |

Used on: Technology page (area sections and Engineering foundations), Services page (if kept).

### 1.4 Services (Services page)
| Service | What we deliver | Ideal for |
|---|---|---|
| AI & Data Strategy | Custom ML model development; predictive analytics & data visualisation dashboards; NLP & computer vision solutions; AI roadmapping & data maturity assessment | Businesses that want to automate manual processes, make data-driven decisions or build intelligent product features |
| Custom Software Development | Enterprise web applications; native & cross-platform mobile apps; legacy system modernisation; full-cycle product development | Organisations needing tailored software; start-ups building an MVP |
| Cloud & DevOps Transformation | Cloud migration (AWS, Azure, GCP); infrastructure as code & automation; CI/CD pipelines; containerisation & microservices | Companies with slow releases, high infrastructure costs, or weak scalability or disaster recovery |

Used on: Services page, only if decision D2 = yes.

### 1.5 Careers
| Item | Content |
|---|---|
| Headline | "Build What's Next, Build Your Career" |
| Why join | Work on Cutting-Edge Technology; Continuous Learning & Development; A Culture of Collaboration (flat, transparent); Impact from Day One |
| Values | Innovation with Purpose; Excellence as Standard; Collaborative Integrity; Driven to Grow |
| Hiring process | Application Review → Screening Call (20–30 min with HR) → Technical Assessment → Team Interview (virtual or in person) → Offer |
| Closing line | "Ready to Build the Future with Us?" |
| Benefits | Listed on the current site, but **needs verification** (gap G-10) |

### 1.6 Contact
| Item | Content |
|---|---|
| Heading | "Let's Start a Conversation" |
| Intro | "Have a challenge to solve or an idea to explore? Reach out to us. Our team is ready to partner with you and build the future." |
| Privacy line | "We respect your privacy and will never share your information with third parties." |

---

## 2. Content not to carry over

| Item | Reason |
|---|---|
| Hero "Beyond Traditional Consultancy" and consultancy-led copy | Conflicts with the new product-company positioning. |
| Empty statistics counters | No figures exist. |
| "Cloud Transformation Services" Lorem ipsum card | Placeholder text. |
| Stock photography (astronaut portrait, robot hand, chess robot, Tower Bridge, etc.) | Replaced by the new visual system. |
| "Get A Quote" CTA | Consultancy language; replaced with "Talk to us". |
| Contact form "Project Budget" and its service list | Not relevant to product enquiries. |
| Anaya_Logo.png | Replaced by the new logo ([03 §12](03-design-system.md#12-logo)). |

### 2.1 Temporary content (live at ANAYA's request)

| Item | Where | Replace with |
|---|---|---|
| Product copy for ANAYA Open Banking and ANAYA CDM [DRAFT] | Products, Home, menus, Technology | Product-owner approval of wording, names and status ([09](09-products.md)) |
| "Our Clients" logos: Lloyds Bank, Barclays, Cynergy Bank, J.P. Morgan, TSB (carried over from the current site) | Home | Confirmed clients with permission to show their logos, or switch the section off |
| "We are a dedicated IT consultancy firm…" footer blurb | Conflicts with the new positioning. |

---

## 3. Content gap register

Priority: **P0** blocks launch · **P1** needed for a strong launch · **P2** can follow after launch.

| ID | Gap | Needed for | Priority | Owner | Status |
|---|---|---|---|---|---|
| G-01 | **Product list**: names, slugs, domain, technology areas, status | Products, Home, menus | P1 | ANAYA product owners | Resolved: two real products in place ([09](09-products.md)); wording [DRAFT] |
| G-02 | **Full product content** per product (questionnaire in [05 §10](05-product-presentation-strategy.md#10-product-content-questionnaire-send-to-anayas-product-owners)) and screenshots | Product detail pages | P1 | ANAYA product owners | Temporary products in place |
| G-03 | **Confirmed email address** | Contact, footer, form | P0 | ANAYA | **Resolved:** info@anaya.uk everywhere |
| G-04 | **Registered office address** and place of registration | Footer, Terms (legal requirement) | P0 | ANAYA | Open |
| G-05 | **Legal texts**: Privacy Policy, Cookie Policy, Terms of Use, Accessibility Statement | Legal pages | P0 | ANAYA legal adviser | Open |
| G-06 | **Logo** as SVG (full colour, mono, favicon) | Header, footer, favicon, OG images | P0 | — | **Resolved:** new logo in `docs/brand/`; ANAYA to approve and run a trademark check |
| G-07 | One-sentence description of each **domain** (Financial, Social) and whether "Security & Trust" is a valid grouping | Home → Domains, taxonomy | P1 | ANAYA | Open |
| G-08 | 2–4 sentence description of ANAYA's work in each **technology area**, especially PKI, Social Sentiment Intelligence and Financial Intelligence (no existing content) | Technology page, Home | P1 | ANAYA | Open |
| G-09 | Approval of all `[DRAFT]` wording (headlines, CTAs, positioning line) | Every page | P0 | ANAYA | Open |
| G-10 | Verification of each **career benefit** | Careers | P1 | ANAYA HR | Open |
| G-22 | Trademark check on the new logo and the temporary product names | Brand, Products | P1 | ANAYA | Open |
| G-11 | **Open roles** (if any) | Careers | P2 | ANAYA HR | Open |
| G-12 | Decision on **Services** page (D2) | Services, nav | P1 | ANAYA | Open |
| G-13 | **Demo offering** per product and how requests are handled | Product CTAs, contact form | P1 | ANAYA | Open |
| G-14 | Contact form delivery method (D7) | Contact | P0 | ANAYA | Open (default: `mailto`) |
| G-15 | Social media profiles (D9) | Footer, Contact | P2 | ANAYA | Open |
| G-16 | Leadership names, roles, photos and consent | About | P2 | ANAYA | Open |
| G-17 | Founding year | About facts | P2 | ANAYA | Open |
| G-18 | Confirmation of client relationships and logo permission; testimonials, case studies | Home, product pages | P2 | ANAYA | Client section live as temporary |
| G-19 | Certifications held (with certificates), if any | Product security sections, About | P2 | ANAYA | Open |
| G-20 | Analytics decision (D6) | Privacy policy, CSP | P1 | ANAYA | Open (default: none) |
| G-21 | Hosting provider and DNS access (D10) | Deployment, redirects | P0 | ANAYA | Open |

---

## 4. Content approval workflow

1. Writer drafts content in the relevant `src/content/` file, marking unapproved text with `[DRAFT]` comments or values.
2. ANAYA's content owner reviews it on the preview deployment.
3. On approval, the writer removes the markers and sets `published: true` (for products).
4. `npm run validate` must pass. It fails on any remaining `TBC`, `[DRAFT]`, `TODO` or Lorem ipsum in published content.
5. Each product records `lastReviewed` and `contentOwner`; content is re-reviewed at least every 12 months.
