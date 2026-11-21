# 03 — Design System (Visual Language)

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [04 Page specifications](04-page-specifications.md) · [07 Components](07-component-library.md)

This is a **completely new** visual identity for the website, including a **new logo** (§12). It does not reuse the current site's layout, imagery, styling or logo.

---

## 1. Design direction

**Concept: "Precise intelligence."**
ANAYA builds AI for finance and for understanding society, two fields where **trust, accuracy and clarity** matter more than spectacle. The design should feel like a serious, modern product company: calm, exact, technical, with moments of light and motion that suggest intelligence at work.

Reference qualities (not designs to copy) from leading AI, fintech and security companies:

| Quality | How it shows up on the site |
|---|---|
| Confident restraint | Lots of space, few colours, large clear type, one idea per section. |
| Technical credibility | Monospace labels, fine grid lines, data-like visual motifs, real product UI when available. |
| Trust | High contrast, honest content, clear company details, no gimmicks. |
| Subtle life | A slowly animated signal field in the hero, gentle reveals on scroll, responsive hover states. |

**Avoid:** generic robot or brain imagery, glowing-blue-circuit clichés, stock photos of people pointing at screens, neon gradients everywhere, glassmorphism on every card.

---

## 2. Colour

The site uses a **dark-led** scheme: hero and showcase sections sit on deep ink, and long-form reading sections can use a light "paper" surface for comfort. Sections pick a surface with a `tone` prop (`"ink"` or `"paper"`). There is no user theme toggle in Phase 1.

### 2.1 Core palette (tokens)

| Token | Hex | Use |
|---|---|---|
| `--color-ink-950` | `#05070D` | Page background (dark) |
| `--color-ink-900` | `#0A0F1C` | Section background (dark, alternate) |
| `--color-ink-800` | `#111829` | Cards on dark |
| `--color-ink-700` | `#1B2438` | Borders, dividers on dark |
| `--color-ink-500` | `#3A4560` | Disabled, subtle lines |
| `--color-slate-400` | `#8B95AD` | Secondary text on dark |
| `--color-slate-200` | `#C9D0DE` | Body text on dark |
| `--color-white` | `#F5F7FB` | Headings on dark |
| `--color-paper-0` | `#FFFFFF` | Light section background |
| `--color-paper-50` | `#F4F6FA` | Light section alternate / cards on light |
| `--color-paper-200` | `#DDE2EC` | Borders on light |
| `--color-text-700` | `#3D4659` | Body text on light |
| `--color-text-900` | `#0B1020` | Headings on light |

### 2.2 Brand accents

| Token | Hex | Use |
|---|---|---|
| `--color-accent` | `#4F7DFF` | Primary accent: buttons, links, focus, key highlights ("signal blue") |
| `--color-accent-strong` | `#2F5BEA` | Hover/pressed state; accent on light backgrounds |
| `--color-accent-2` | `#22D3B6` | Secondary accent for data highlights and gradient end ("insight teal") |
| `--gradient-signal` | `linear-gradient(120deg, #4F7DFF 0%, #22D3B6 100%)` | Used sparingly: hero keyword, one hairline per section, focus visuals |

If ANAYA has existing brand colours (decision D8), replace `--color-accent` and `--color-accent-2` only. Everything else stays.

### 2.3 Domain colours (product categorisation)

Each domain has a quiet colour used only for tags, icons and small accents, never large fills.

| Domain | Token | Hex |
|---|---|---|
| Financial | `--color-domain-financial` | `#E8B04A` (gold) |
| Social | `--color-domain-social` | `#B36BFF` (violet) |
| Security & Trust | `--color-domain-security` | `#22D3B6` (teal) |

### 2.4 Semantic colours

| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#2FBF71` | Form success, "Available" status |
| `--color-warning` | `#F2A93B` | "Pilot", "Beta" status |
| `--color-info` | `#4F7DFF` | "In development" status |
| `--color-danger` | `#F05252` | Form errors |

### 2.5 Contrast rules

- Body text on ink (`slate-200` on `ink-950`) is about 13:1. Secondary text (`slate-400` on `ink-950`) is about 6.7:1. Both pass AA. `--color-accent-strong` on white is about 5.5:1.
- Accent text (`#4F7DFF`) is used for links on **dark only**. On light surfaces use `--color-accent-strong`.
- Never place text on gradients. Gradients are decorative only.
- Every new colour combination must be checked to at least 4.5:1 (text) or 3:1 (large text, UI boundaries).

---

## 3. Typography

### 3.1 Typefaces

All fonts are **self-hosted** (via `@fontsource` packages or local `woff2` files) for performance and privacy. Use `font-display: swap` and preload the two weights used above the fold.

| Role | Typeface | Weights | Why |
|---|---|---|---|
| Display / headings | **Space Grotesk** | 500, 600 | Geometric and technical, with a distinctive character suited to AI products. |
| Body / UI | **Inter** | 400, 500, 600 | Very legible at small sizes; neutral and international. |
| Labels / data / code | **JetBrains Mono** | 400, 500 | Used for eyebrows, tags, technical labels and spec values. |

All three are open-source (SIL Open Font License).

### 3.2 Type scale (fluid)

Sizes scale smoothly between 360 px and 1440 px viewports with `clamp()`.

| Token | Mobile → Desktop | Line height | Letter spacing | Use |
|---|---|---|---|---|
| `--fs-display` | 40 → 76 px | 1.02 | -0.03em | Home hero only |
| `--fs-h1` | 34 → 56 px | 1.08 | -0.025em | Page heroes |
| `--fs-h2` | 28 → 42 px | 1.15 | -0.02em | Section headings |
| `--fs-h3` | 21 → 26 px | 1.25 | -0.01em | Card and sub-section headings |
| `--fs-h4` | 18 → 20 px | 1.35 | 0 | Small headings |
| `--fs-lead` | 18 → 21 px | 1.55 | 0 | Intro paragraphs |
| `--fs-body` | 16 → 17 px | 1.65 | 0 | Body copy |
| `--fs-small` | 14 px | 1.5 | 0 | Meta, captions |
| `--fs-eyebrow` | 12 → 13 px | 1.4 | 0.12em, uppercase | Mono labels above headings |

Example token:
```css
--fs-h1: clamp(2.125rem, 1.6rem + 2.4vw, 3.5rem);
```

### 3.3 Typography rules

- Line length: 60–75 characters for body copy (`max-width: 68ch`).
- One `h1` per page. Never skip heading levels for visual effect; use the scale tokens for styling.
- Each section heading is preceded by an **eyebrow** (mono, uppercase, accent colour), for example `PRODUCTS`, `TECHNOLOGY`.
- Use the gradient highlight on at most **one phrase per page**, typically in the hero heading.
- Numbers in spec tables use `font-variant-numeric: tabular-nums`.

---

## 4. Spacing, layout and grid

### 4.1 Spacing scale (4 px base)

`--space-1: 4px · --space-2: 8px · --space-3: 12px · --space-4: 16px · --space-5: 24px · --space-6: 32px · --space-7: 48px · --space-8: 64px · --space-9: 96px · --space-10: 128px · --space-11: 160px`

Section vertical padding: `--section-pad: clamp(64px, 8vw, 128px)`.

### 4.2 Containers

| Token | Max width | Use |
|---|---|---|
| `--container-wide` | 1440 px | Full-bleed showcases, mega menu |
| `--container` | 1200 px | Default page content |
| `--container-narrow` | 760 px | Legal pages, long text |

Side gutter: `clamp(16px, 4vw, 40px)`.

### 4.3 Grid

- 12 columns on desktop (≥ 1024 px), gap 24 px.
- 8 columns on tablet (768–1023 px), gap 20 px.
- 4 columns on mobile (< 768 px), gap 16 px.
- Implemented with CSS Grid. Card grids use `grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr))` so they reflow without breakpoints.

### 4.4 Breakpoints

| Name | Min width | Notes |
|---|---|---|
| `sm` | 480 px | Large phones |
| `md` | 768 px | Tablets (portrait) |
| `lg` | 1024 px | Tablets (landscape) and small laptops; desktop nav appears |
| `xl` | 1280 px | Desktops |
| `2xl` | 1536 px | Large screens; content caps at the container width |

Write styles **mobile first** (`@media (min-width: …)`). CSS custom properties cannot be used inside media queries, so the breakpoint values are documented here and repeated as literals. Use container queries (`@container`) for components whose layout depends on their own width, such as cards.

---

## 5. Shape, depth and surfaces

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6 px | Tags, inputs |
| `--radius-md` | 12 px | Buttons, small cards |
| `--radius-lg` | 20 px | Cards, panels |
| `--radius-xl` | 28 px | Hero media, large feature panels |
| `--radius-pill` | 999 px | Status badges, filter chips |

**Surfaces on dark:** cards use `--color-ink-800` with a 1 px border `rgba(255,255,255,0.08)`. Hover raises the border to `rgba(79,125,255,0.45)` and adds a soft accent glow: `0 0 0 1px rgba(79,125,255,.25), 0 20px 60px -20px rgba(79,125,255,.35)`.

**Surfaces on paper:** cards use white with a `--color-paper-200` border and a subtle shadow `0 1px 2px rgba(11,16,32,.06), 0 8px 24px -12px rgba(11,16,32,.12)`.

**Background details (dark sections only):**
- A faint 64 px grid of 1 px lines at 4% opacity, masked by a radial fade.
- An optional large, blurred accent "glow" behind key visuals (opacity ≤ 0.25).
- Use these sparingly; the background is atmosphere, not content.

---

## 6. Iconography

- **Lucide React only**, for consistency.
- Default size 20 px in text and 24 px in feature cards; `strokeWidth={1.5}`.
- Feature icons sit in a 44 px rounded square (`--radius-md`) with a tinted background (accent at 12% opacity).
- Icons are decorative by default (`aria-hidden="true"`). An icon-only button must have an `aria-label`.
- Suggested mapping for technology areas (the icon names are all in Lucide):

| Area | Icon |
|---|---|
| AI & Machine Learning | `BrainCircuit` |
| Cybersecurity | `ShieldCheck` |
| Public Key Infrastructure | `KeyRound` |
| Social Sentiment Intelligence | `MessagesSquare` |
| Financial Intelligence | `LineChart` |
| Other AI technologies | `Sparkles` |

Icons are referenced by name string in data files and resolved through a single icon registry (see [07 §4.6](07-component-library.md#46-icon)), so content files never import components.

---

## 7. Motion

Animation is done with **Framer Motion** (the `motion` package). Motion must support understanding, not decorate.

### 7.1 Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out` / `ease.out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Menus, accordions |
| `--dur-fast` | 150 ms | Hover, focus, small state changes |
| `--dur-base` | 250 ms | Menus, accordions, tabs |
| `--dur-slow` | 600 ms | Scroll reveals |

### 7.2 Patterns

| Pattern | Behaviour |
|---|---|
| **Reveal** | Elements fade in and rise 16 px when 20% visible. Runs once. Groups stagger by 60 ms (maximum 6 items, then no extra delay). |
| **Hero signal field** | A slow canvas/SVG animation of points and connecting lines (a "network of signals"). Pauses when off-screen or when the tab is hidden. Static image when reduced motion is on. |
| **Card hover** | Border and glow transition (CSS only, 150 ms). The card lifts by 2 px. |
| **Mega menu** | Fade + 8 px slide, 200 ms. |
| **Mobile menu** | Overlay fades; links stagger in by 40 ms. |
| **Accordion (FAQ)** | Height animation with `AnimatePresence`, 250 ms. |
| **Page transition** | None, to keep navigation fast. Scroll position resets to the top, except for anchor links. |

### 7.3 Rules

- Wrap the app in `<MotionConfig reducedMotion="user">` so OS reduced-motion settings are honoured automatically.
- Animate only `transform` and `opacity`. Never animate layout properties such as `width`, `top` or `margin`.
- Nothing animates in a loop except the hero signal field.
- Content must be visible without JavaScript. Reveals must not leave pre-rendered HTML invisible (start hidden only after hydration).

---

## 8. Imagery

The current site's stock photos are not reused.

| Type | Guidance |
|---|---|
| **Product visuals** | Real product screenshots or UI recordings, supplied by ANAYA (`[TBC]`), shown in a device or window frame component. This is the strongest proof a product company can show. |
| **Abstract visuals** | Generated as SVG or canvas in code: signal networks, data grids, flowing lines, key/lock geometry (for PKI). Use brand colours and keep them consistent. |
| **Illustrations for "how it works"** | Simple line diagrams built from the same stroke style as Lucide icons (1.5 px, rounded). |
| **People photography** | Only real photos of the ANAYA team, for About and Careers, if supplied. Otherwise use no people photos. |
| **Third-party logos** | Only with written permission (see [01 P6](01-project-overview-and-requirements.md#34-problems-found-on-the-current-site)). |

Image technical rules:
- Supply AVIF and WebP with a JPEG/PNG fallback via `<picture>`.
- Always set `width` and `height` (or `aspect-ratio`) to prevent layout shift.
- `loading="lazy"` for everything below the fold; `fetchpriority="high"` for the hero image.
- Meaningful images need `alt` text; decorative ones use `alt=""`.

---

## 9. Voice and tone (UI copy)

| Do | Don't |
|---|---|
| Short, direct sentences | Buzzword chains ("synergistic AI-driven paradigm") |
| Concrete outcomes, only those ANAYA can support | Unproven superlatives ("best", "world-leading") |
| Active voice: "Request a demo" | Vague CTAs: "Click here", "Learn more" repeated everywhere |
| UK English spelling | Mixed US/UK spelling |

CTA vocabulary (consistent across the site) `[DRAFT]`:
- Primary: **Talk to us** (general), **Request a demo** (product pages, only if demos are offered — confirm with ANAYA).
- Secondary: **Explore products**, **View product**, **See the technology**.

---

## 10. Responsive behaviour

| Element | Mobile (< 768) | Tablet (768–1023) | Desktop (≥ 1024) |
|---|---|---|---|
| Header | Logo + menu button; full-screen overlay | Same as mobile | Full nav with mega menu |
| Hero | Stacked: text, then visual; CTAs full-width | Stacked, visual wider | Two columns, 7/5 split, or centred text over the visual |
| Card grids | 1 column | 2 columns | 3 columns (4 for small items) |
| Feature + media rows | Stacked, media first | Stacked | Side by side, alternating sides |
| Product filter bar | Horizontally scrollable chips + a "Filters" sheet | Chips in a wrapping row | Chips in one row with the result count |
| Technology page index | Collapsed into a select / jump menu | Same as mobile | Sticky side index |
| Footer | Single column; link groups as accordions | Two columns | Four columns |
| Touch targets | At least 44 × 44 px | At least 44 × 44 px | At least 32 × 32 px (mouse) |

---

## 11. Accessibility checklist (design)

- [ ] Contrast meets §2.5 for every text/background pair used.
- [ ] Focus ring: 2 px `--color-accent` outline with a 2 px offset, never removed. A dark halo on light surfaces keeps it visible.
- [ ] Information is never conveyed by colour alone (status badges have text, filters show a check mark).
- [ ] Hover-only content is also available on focus and tap.
- [ ] Text can be zoomed to 200% without loss of content or horizontal scrolling.
- [ ] A "Skip to main content" link is the first focusable element.

---

## 12. Logo

A new logo has been created for ANAYA Solutions. Source files are in [`docs/brand/`](brand/); open [`docs/brand/preview.html`](brand/preview.html) in a browser to see every version on dark and light backgrounds.

### 12.1 Concept

- **The mark** is the letter **A** drawn as a small network: three nodes (apex and two feet) joined by signal lines, with a crossbar carrying a central teal node. It reads as an "A", a network of connected data points, and a stable, trustworthy structure, matching the "precise intelligence" direction (§1).
- **The wordmark** "ANAYA" is drawn as monoline paths with the A's written as open chevrons (Λ). This gives a distinctive, technical rhythm (ΛNΛYΛ) that still reads as ANAYA. "SOLUTIONS" sits underneath in fine, widely tracked capitals spanning the same width.
- **Colour:** the mark uses `--gradient-signal` (signal blue `#4F7DFF` → insight teal `#22D3B6`). The wordmark is white (`#F5F7FB`) on dark or ink (`#0B1020`) on light.
- All letters are drawn as vector paths, not live text, so the logo looks the same everywhere without loading a font.

### 12.2 Files

| File | Use |
|---|---|
| `anaya-logo.svg` | Primary horizontal logo for **dark** backgrounds (header, footer, dark sections) |
| `anaya-logo-light-bg.svg` | Horizontal logo for **light** backgrounds (paper sections, documents); uses darker gradient stops for contrast |
| `anaya-logo-mono.svg` | Single colour using `currentColor`; for inline SVG use, print and single-colour contexts |
| `anaya-mark.svg` | Mark only, transparent background; avatars, small spaces, loading states |
| `favicon.svg` | Mark on an ink tile with rounded corners; favicon, app icon. Simplified (no foot nodes) to stay clear at 16 px |

At scaffold time, copy these into `public/images/brand/` (and `favicon.svg` into `public/`). Also export `apple-touch-icon.png` (180 × 180) and a 32 × 32 `favicon.ico` from `favicon.svg`.

### 12.3 Usage rules

| Rule | Value |
|---|---|
| Minimum size | Horizontal logo 24 px high on screen; mark 16 px |
| Header size | 32 px high on desktop, 28 px on mobile |
| Clear space | At least ¼ of the mark's height on every side |
| Background | Use `anaya-logo.svg` on ink surfaces and `anaya-logo-light-bg.svg` on paper surfaces. Never place the logo on busy images |
| Don't | Stretch, rotate, recolour the gradient, add shadows or outlines, or rebuild the wordmark with a font |

### 12.4 Before public launch

The logo is original work created for this project. Before it is registered or used widely (print, signage, product UI), ANAYA should run a trademark clearance search for the mark and name.

## 13. Motion and mobile updates (2026-11-18)

- **NeuralNet** (`src/components/media/NeuralNet.jsx`): canvas animation of a layered neural network with signals firing from input to output. Used in the home hero (beside the text on desktop, under the buttons on phones). Pauses off-screen, draws a still frame for reduced motion.
- **SignalField** now also runs behind page heroes, product heroes and the CTA band.
- Hero highlight text uses a slow animated gradient; section eyebrows have a flowing signal line. All animations stop for `prefers-reduced-motion`.
- **Optional hero video:** add `video: { src: '/media/hero.mp4', poster: '/media/hero.jpg' }` to `home.hero` in `src/content/pages.js` and put the files in `public/media/`. Muted, looped, hidden for reduced motion. Keep it under ~3 MB (H.264 MP4, 1280–1920px wide, 10–20 s loop).
- **Phones (< 768px):** card grids (capabilities, technology areas, overview, use cases, tech foundations, facts) render as open rows with dividers; domain panels use a coloured left rule. Product cards remain cards.
