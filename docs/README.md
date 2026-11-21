# ANAYA Solutions Website — Documentation

Implementation-ready documentation for the new ANAYA Solutions website (anaya.uk). The site will be rebuilt from scratch as a static ReactJS + Vite site that presents ANAYA as an **AI product company** working in the financial and social domains.

> **No code has been written yet.** These documents are the specification to build from.

## Documents

| # | Document | What it covers |
|---|---|---|
| 01 | [Project overview & requirements](01-project-overview-and-requirements.md) | Analysis of the current site, goals, audiences, functional and non-functional requirements, scope, open decisions |
| 02 | [Sitemap & page structure](02-sitemap-and-page-structure.md) | Sitemap, URL rules, redirects from the old site, header/mega menu/footer, section order per page, user journeys |
| 03 | [Design system](03-design-system.md) | Visual direction, colour, typography, spacing, grid, iconography, motion, imagery, responsive rules |
| 04 | [Page specifications](04-page-specifications.md) | Section-by-section design and content for every page |
| 05 | [Product presentation strategy](05-product-presentation-strategy.md) | Product positioning, taxonomy, status, data model, reusable product detail template, adding products, content questionnaire |
| 06 | [Technical architecture](06-technical-architecture.md) | Stack, architecture decisions, folder structure, routing and pre-rendering, content layer, SEO, contact form, performance, hosting, testing |
| 07 | [Component library](07-component-library.md) | Component principles, conventions and full inventory with props and accessibility rules |
| 08 | [Content inventory & gaps](08-content-inventory-and-gaps.md) | Verified reusable content, content to drop, temporary content, and the register of content ANAYA must supply |
| 09 | [Products](09-products.md) | The three products (EchoLoop, ANAYA Open Banking, ANAYA CDM) and the Build with us offer, with the evidence behind each website claim |
| — | [brand/](brand/) | New ANAYA logo (SVG files) and a browser preview page ([brand/preview.html](brand/preview.html)) |

## Content labels

| Label | Meaning |
|---|---|
| `[VERIFIED]` | From the current site or ANAYA's brief |
| `[DRAFT]` | New wording with no factual claims; needs ANAYA's approval |
| `[TBC]` | Must be supplied by ANAYA; hidden on the site until supplied |
| `[TEMPORARY]` | Placeholder content ANAYA asked to use for now (temporary products, client logos); listed on every build until replaced |

## Key finding from the site analysis

The current site (six pages) presents ANAYA as an **IT consultancy** and contains **no product names, descriptions or features**. The product system is fully specified (data model, template, components), and the site now presents three real products, EchoLoop, ANAYA Open Banking and ANAYA CDM, plus a "Build with us" development-partner offer ([09](09-products.md)). Remaining launch blockers are listed as P0 in [08 §3](08-content-inventory-and-gaps.md#3-content-gap-register).

## Decisions made (2026-11-16)

- **Email:** info@anaya.uk is the only address used on the site.
- **Logo:** a new logo has been created ([03 §12](03-design-system.md#12-logo)).
- **Clients:** the "Our Clients" logo section is kept temporarily.
- **Products:** four temporary products are used for now.

## Reading order

- **Stakeholders:** 01 → 08 → 05 (§1–4, §10)
- **Designers:** 01 → 02 → 03 → 04 → 05
- **Developers:** 01 → 02 → 06 → 07 → 05 → 04
