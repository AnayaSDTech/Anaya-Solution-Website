# 07 — Reusable Components & Component Guidelines

> Status: Draft v1.0 · Last updated: 2026-11-16
> Related: [03 Design system](03-design-system.md) · [06 Architecture](06-technical-architecture.md)

---

## 1. Principles

1. **Composition over configuration.** Pages are built by stacking section components; sections are built from UI primitives. Avoid "mega-components" with dozens of props.
2. **Data in, markup out.** Components receive content as props. They never import from `src/content/` directly. The exceptions are layout components (`SiteHeader`, `SiteFooter`), which read `site` and `navigation` through `src/lib`.
3. **Render nothing when there is nothing to render.** A section with an empty data array returns `null`. This enforces the "no placeholders" rule ([01 §2](01-project-overview-and-requirements.md#2-content-source-labels-used-in-every-document)).
4. **Surface-agnostic.** Components style themselves with semantic tokens (`--text`, `--surface`) so they work on both `ink` and `paper` sections without variants.
5. **Accessible by default.** Correct semantics, keyboard support and focus management are built in, so consumers cannot forget them.
6. **Server-safe.** Components render correctly during pre-rendering in Node (no browser APIs during render; see [06 §6](06-technical-architecture.md#6-rendering--hydration-rules)).

---

## 2. File conventions

```
src/components/ui/Button/
├── Button.jsx            ← component (named function, default export)
├── Button.module.css     ← scoped styles, tokens only
├── Button.test.jsx       ← tests (where behaviour exists)
└── index.js              ← export { default } from './Button';
```

```jsx
// Button.jsx — reference pattern
import { Link } from 'react-router';
import Icon from '@/components/ui/Icon';
import { cx } from '@/lib/utils';
import styles from './Button.module.css';

/**
 * @param {{
 *   variant?: 'primary' | 'secondary' | 'ghost',
 *   size?: 'md' | 'lg',
 *   to?: string, href?: string,
 *   iconRight?: string, iconLeft?: string,
 *   fullWidthOnMobile?: boolean,
 *   className?: string,
 *   children: React.ReactNode,
 * } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  variant = 'primary', size = 'md', to, href, iconLeft, iconRight,
  fullWidthOnMobile = false, className, children, ...rest
}) {
  const classes = cx(styles.button, styles[variant], styles[size],
    fullWidthOnMobile && styles.fullWidthOnMobile, className);
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={18} />}
    </>
  );
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>;
  return <button type="button" className={classes} {...rest}>{content}</button>;
}
```

---

## 3. API conventions

| Convention | Rule |
|---|---|
| Prop names | `camelCase`; booleans read as statements (`isOpen`, `showStatus`); event handlers `onX`. |
| Variants | A `variant` string prop with a small, documented set of values; never several boolean style flags. |
| Polymorphism | Links vs buttons are decided by `to` (internal), `href` (external) or neither (button). Never use a `<div onClick>`. |
| `className` | Every component accepts `className` for layout adjustments by the parent (margins, grid placement), not for restyling internals. |
| Rest props | Spread remaining props onto the root element so `id`, `aria-*` and `data-*` attributes work. |
| Headings | Section components accept `headingLevel` (default `2`) so the page controls the heading outline. |
| Icons | Passed as **name strings** (`icon="ShieldCheck"`), resolved by `Icon`. |
| Content strings | Rich text in data is either plain strings or the small inline format `[ 'text', { highlight: 'text' } ]`, rendered by `RichText`. No `dangerouslySetInnerHTML` except for build-time-rendered, repository-stored Markdown in `LegalLayout`. |
| Docs | Every component has a JSDoc props block like the one above. |

---

## 4. UI primitives — `components/ui/`

### 4.1 `Container`
Constrains width and applies side gutters.
Props: `size` (`'wide' | 'default' | 'narrow'`), `as` (default `div`).

### 4.2 `Section`
Wraps every page section: sets the surface and vertical padding, and provides a landmark when labelled.
Props: `tone` (`'ink' | 'paper'`, default `'ink'`), `alt` (boolean, uses the alternate shade), `id` (anchor target), `labelledBy` (id of the heading → `aria-labelledby`), `padding` (`'default' | 'compact' | 'none'`), `background` (`'none' | 'grid' | 'glow'`).
Renders `<section data-tone={tone}>` containing a `Container`.

### 4.3 `Button`
See §2. Variants: `primary` (accent fill), `secondary` (outlined), `ghost` (text + arrow). Sizes: `md` (44 px high), `lg` (52 px high).
States: hover, focus-visible, active, disabled (`aria-disabled` for links). The arrow icon in `ghost` buttons moves 2 px right on hover.

### 4.4 `Link` (text link)
Wraps React Router `Link` for internal paths and `<a>` for external ones. External links get `target="_blank" rel="noopener noreferrer"`, an `ArrowUpRight` icon and visually hidden text "(opens in a new tab)". Variant: `inline` (underlined) or `subtle`.

### 4.5 `Eyebrow`
Mono, uppercase label above headings. Props: `children`, `tone` (`'accent' | 'muted'`), `number` (optional "01").

### 4.6 `Icon`
Resolves a Lucide icon by name from `src/icons/registry.js`.
Props: `name` (string, required), `size` (default 20), `strokeWidth` (default 1.5), `label` (if set, the icon gets `role="img"` and `aria-label`; otherwise `aria-hidden="true"`).
An unknown name logs a warning in development and renders nothing. The content validator also checks icon names.

```js
// src/icons/registry.js
import {
  // technology areas / product icons
  BrainCircuit, ShieldCheck, KeyRound, MessagesSquare, LineChart, Sparkles,
  // capability icons used by the temporary products (doc 09 §7)
  Activity, Radar, Eye, LayoutDashboard, Bell, Plug, Tags, TrendingUp, Layers,
  FileText, Search, RefreshCw, ListChecks, Lock,
  // UI icons
  ArrowRight, ArrowUpRight, Menu, X, ChevronDown, Mail, Phone, MapPin, Briefcase, Check, Plus, Minus,
} from 'lucide-react';

export const icons = {
  BrainCircuit, ShieldCheck, KeyRound, MessagesSquare, LineChart, Sparkles,
  Activity, Radar, Eye, LayoutDashboard, Bell, Plug, Tags, TrendingUp, Layers,
  FileText, Search, RefreshCw, ListChecks, Lock,
  ArrowRight, ArrowUpRight, Menu, X, ChevronDown, Mail, Phone, MapPin, Briefcase, Check, Plus, Minus,
};
```

When content uses a new icon name, add it here; the validator rejects names missing from the registry.

### 4.7 `Tag`
Small label for domain and technology. Props: `children`, `color` (`'neutral' | 'financial' | 'social' | 'security'`), `to` (optional; makes it a link), `icon`.

### 4.8 `StatusBadge`
Product lifecycle badge. Props: `status` (`'available' | 'pilot' | 'beta' | 'in-development' | 'coming-soon'`). The label and colour come from a lookup in `lib/taxonomy.js`. Always includes text plus a dot; never colour alone.

### 4.9 `Card`
Base surface for all cards. Props: `as`, `interactive` (adds hover/focus styles), `to` (makes the **whole card** one link using the "stretched link" pattern: the heading contains the `<Link>` and its `::after` covers the card, so there are no nested interactive elements), `padding` (`'md' | 'lg'`).

### 4.10 `RichText`
Renders the inline content format (strings and `{ highlight }` segments). Highlight renders a `<span>` with the gradient text style.

### 4.11 `VisuallyHidden`
Hides content visually but keeps it for screen readers.

---

## 5. Layout & navigation — `components/layout/`

| Component | Responsibility | Key behaviour |
|---|---|---|
| `SkipLink` | "Skip to main content" | First focusable element; visible on focus; targets `#main`. |
| `SiteHeader` | Logo, desktop nav, CTA, mobile menu button | Sticky; `transparent` prop for dark heroes; switches to a solid blurred surface after 24 px (`useScrolled`). Uses `<nav aria-label="Main">`. |
| `NavItem` | One top-level link | `NavLink` with `aria-current="page"` and an active underline. |
| `MegaMenu` | Products dropdown (desktop) | Built from `getProductsByDomain`. Disclosure pattern: trigger `button` with `aria-expanded` + `aria-controls`. Opens on click/Enter/Space/Arrow Down, or hover with a 120 ms intent delay. Escape or clicking outside closes it and returns focus to the trigger. Hides empty domain columns. Falls back to a plain link when there are no products. |
| `MobileMenu` | Full-screen overlay (< 1024 px) | `role="dialog"` with `aria-modal="true"`; focus trapped (`useFocusTrap`); body scroll locked (`useLockBodyScroll`); closes on Escape, route change and link click. Products expand as an accordion. |
| `SiteFooter` | Footer columns + legal strip | Reads `site` and `navigation`; shows company disclosure; current year from build. Link groups collapse to accordions on mobile. |
| `Breadcrumbs` | Trail on product and legal pages | `<nav aria-label="Breadcrumb">` with an ordered list; last item `aria-current="page"`. Emits `BreadcrumbList` JSON-LD through the route's `meta`, not from the component. |
| `SiteLayout` | `SkipLink` + `SiteHeader` + `<main id="main">` + `<Outlet/>` + `SiteFooter` | Decides `SiteHeader transparent` from route `handle` data. |

---

## 6. Product components — `components/product/`

| Component | Props | Notes |
|---|---|---|
| `ProductCard` | `product`, `variant` (`'standard' \| 'large' \| 'compact'`), `headingLevel` | **standard:** icon, name, tagline, domain tag, status badge, ≤3 tech tags, "View product". **large:** adds hero visual and ≤3 capability titles (Home showcase). **compact:** icon + name + tagline (mega menu, related). Whole card is one link to `/products/{slug}`. |
| `ProductGrid` | `products`, `groupBy` (`'domain' \| null`), `emptyState` | Auto-fill grid; renders domain group headings when grouped. |
| `ProductFilterBar` | `domains`, `technologies`, `value`, `onChange`, `resultCount` | Toggle-button chips (`aria-pressed`); hides options with zero matches; result count in `aria-live="polite"`; mobile bottom sheet for technology filters. State synced with the URL by `useQueryFilters`. |
| `ProductShowcase` | `products`, `fallbackAreas` | Home showcase: asymmetric layout. Renders the product-areas fallback when `products` is empty. |
| `ProductPage` | `product`, `related` | Composes all product sections in the fixed order from [05 §6](05-product-presentation-strategy.md#6-product-detail-page-section-by-section-specification). Sets `--domain-color` on its root from the product domain. |
| `ProductHero` | `product` | Breadcrumbs, tags, h1, tagline, CTAs, visual (screenshot → product visual → `SignalField`). |
| `ProductSubnav` | `sections` (`{ id, label }[]`) | Sticky in-page navigation on desktop (≥ 1024 px). Highlights the current section (`useActiveSection`). Hidden on mobile. Lists only rendered sections. |
| `ProductOverview` | `overview`, `highlights` | Challenge / approach / outcome; optional highlights rail. |
| `TechFoundation` | `technologies`, `notes` | Tech chips linking to `/technology#{slug}`, with notes. |
| `SecurityPanel` | `items` | Dark panel; `ShieldCheck` motif; list of verified statements. |
| `DeploymentPanel` | `deployment` | Options and integrations lists. |
| `UseCaseCards` | `items` | Cards; switches to tabs when there are more than 4 items. |
| `RelatedProducts` | `products` | Up to 3 standard `ProductCard`s. Returns `null` if empty. |

Each section component (`ProductOverview`, `SecurityPanel`, etc.) returns `null` when its data is empty, and `ProductPage` builds the `ProductSubnav` list from the same checks (via a `getRenderedSections(product)` helper in `lib/products.js`) so the two never disagree.

---

## 7. Section components — `components/sections/`

| Component | Purpose | Key props |
|---|---|---|
| `HeroHome` | Home hero with signal field | `eyebrow`, `title` (rich text), `lead`, `primaryCta`, `secondaryCta`, `chips` |
| `PageHero` | Standard page hero | `eyebrow`, `title`, `lead`, `visual` (node), `size` (`'compact' \| 'default'`), `breadcrumbs` |
| `SectionHeader` | Eyebrow + heading + lead + optional action link | `eyebrow`, `title`, `lead`, `action`, `align` (`'start' \| 'center'`), `headingLevel` |
| `FeatureGrid` | Grid of icon/title/text cards | `items` (`{ icon, title, description }[]`), `columns` (`3 \| 4`) |
| `FeatureList` | Numbered or icon list beside a heading | `items`, `numbered` |
| `ValueGrid` | Values (About, Careers) | `items` |
| `ProcessSteps` | Numbered steps; horizontal on desktop, vertical timeline on mobile | `steps` (`{ title, description }[]`) |
| `DomainSplit` | Financial / Social panels with product lists | `domains` (with their products) |
| `Statement` | Large purpose statement | `text`, `attribution` (optional) |
| `SplitText` | Heading on one side, paragraphs on the other | `title`, `body` |
| `FactList` | Definition list of company facts | `items` (`{ label, value }[]`); skips items whose value is empty |
| `ServiceBlock` | Service with "What we deliver" / "Ideal for" | `service`, `mediaSide` |
| `BenefitList` | Benefits (Careers) | `items` |
| `RoleList` | Open roles or the empty-state message | `roles`, `emptyState` |
| `CapabilityMatrix` | Collapsible lists of tools by category | `groups` (`{ title, items: string[] }[]`) |
| `Accordion` | FAQ and collapsible lists | `items` (`{ id, title, content }[]`), `single` (one open at a time). Buttons with `aria-expanded`/`aria-controls`; height animation via `AnimatePresence`. |
| `CtaBand` | Closing call to action | `title`, `lead`, `primaryCta`, `secondaryCta` |
| `TeamGrid` | Leadership (only when supplied) | `people`; returns `null` if empty |
| `ClientLogoStrip` | `[TEMPORARY]` client logo band on Home ([04 §1.3](04-page-specifications.md#13-clients-temporary)) | `eyebrow`, `title`, `clients` (`{ name, logo: { src, width, height }, keepOriginalColours? }[]`). Renders a `<ul>` of `<img alt={name}>` items, no links. Returns `null` when `clients` is empty or `site.features.clientsSection` is `false`. Monochrome by default via CSS (`filter: brightness(0) invert(1)` at 60% opacity); `keepOriginalColours` shows a logo unaltered on a neutral tile. |

---

## 8. Technology components — `components/technology/`

| Component | Purpose | Key props |
|---|---|---|
| `TechAreaCard` | Card for one area (Home, Products fallback) | `area` (`{ slug, label, icon, summary }`), `to` |
| `TechAreaGrid` | Grid of `TechAreaCard` | `areas` |
| `TechAreaStrip` | One-line list of area links | `areas` |
| `TechAreaIndex` | Sticky side index (desktop) / jump select (mobile) | `areas`, `activeId` |
| `TechAreaSection` | Full section for one area on `/technology` | `area`, `index`, `products` |

---

## 9. Form components — `components/forms/`

| Component | Notes |
|---|---|
| `Field` | Wraps a label, control, hint and error. Generates ids and links them with `aria-describedby`; sets `aria-invalid` when there is an error. Required fields are marked with text "(required)", not only an asterisk. |
| `TextInput`, `Textarea`, `Select`, `Checkbox` | Styled native controls. Minimum 44 px high; visible focus; correct `type` and `autocomplete`. `Textarea` supports `maxLength` with a live count. |
| `ErrorSummary` | On submit with errors: a list of links to invalid fields; receives focus. |
| `ContactForm` | Owns form state and validation (plain React state; no form library needed at this size). Reads `?product=` and `?type=` to prefill. Calls `submitEnquiry()` from `lib/contact.js`. Includes the honeypot field. States: idle, submitting (button shows spinner, `aria-busy`), success (confirmation panel receives focus), error (message with the email address as fallback). |
| `FormStatus` | Success/error panels with `role="status"` / `role="alert"`. |

Validation rules live in `lib/validation.js` so they can be unit tested apart from the UI.

---

## 10. Media components — `components/media/`

| Component | Notes |
|---|---|
| `ResponsiveImage` | `<picture>` with AVIF/WebP sources, `srcset`/`sizes`, required `alt`, `width`, `height`; `priority` prop sets `fetchpriority="high"` and eager loading. |
| `WindowFrame` | Wraps product screenshots in an app-window frame (title-bar dots, rounded corners, subtle border). Props: `title`, `children`. |
| `MediaGallery` | Grid (desktop) / swipeable row with scroll-snap (mobile). Opens `Lightbox`. |
| `Lightbox` | Modal dialog (`role="dialog"`, focus trap, Escape to close, arrow keys to navigate, caption announced). |
| `SignalField` | Brand visual: animated network of points and lines on `<canvas>`. Props: `density`, `colors`, `interactive` (subtle pointer response on desktop only). Renders a static SVG on the server and when reduced motion is on; pauses off-screen and when the tab is hidden; `aria-hidden="true"`. |
| `AbstractVisual` | Preset SVG compositions per technology area (key geometry for PKI, waveform for sentiment, and so on) used when no product imagery exists. Prop: `variant`. |

---

## 11. Motion components — `components/motion/`

| Component | Notes |
|---|---|
| `Reveal` | Fades and rises its child into view once (`whileInView`, `viewport={{ once: true, amount: 0.2 }}`). Props: `delay`, `as`. Content is visible in pre-rendered HTML (see [06 §6](06-technical-architecture.md#6-rendering--hydration-rules)). |
| `Stagger` | Parent that staggers child `Reveal`s by 60 ms (capped at 6 steps). |
| `variants.js` | Shared variants and easing tokens. |
| `MotionProvider` | `LazyMotion` (`domAnimation`) + `MotionConfig reducedMotion="user"`; used once in `root.jsx`. |

Pages must use these wrappers rather than raw `motion` props, so timing stays consistent and reduced-motion support is guaranteed.

---

## 12. Hooks — `src/hooks/`

| Hook | Returns / does |
|---|---|
| `useScrolled(threshold = 24)` | `true` once the page has scrolled past the threshold. Passive scroll listener with `requestAnimationFrame` throttling. |
| `useLockBodyScroll(active)` | Locks body scroll while `active`, without layout shift (compensates for the scrollbar width). |
| `useFocusTrap(ref, active)` | Keeps focus inside `ref` while active; restores focus on deactivate. |
| `useActiveSection(ids)` | Id of the section currently in view (IntersectionObserver). |
| `useQueryFilters(keys)` | `[filters, setFilters]` synced with URL search params via React Router's `useSearchParams`, with `replace` so filter changes don't flood browser history. |
| `useMediaQuery(query)` | Boolean; returns `false` during pre-rendering, then updates after mount. |
| `usePrefersReducedMotion()` | Wrapper over `useReducedMotion` from `motion/react`. |

---

## 13. Accessibility requirements by pattern

| Pattern | Requirement |
|---|---|
| Disclosure (mega menu, accordion) | `button` trigger, `aria-expanded`, `aria-controls`; Escape closes; focus returns to the trigger. |
| Dialog (mobile menu, lightbox, filter sheet) | `role="dialog"`, `aria-modal="true"`, labelled; focus trapped; Escape closes; focus restored. |
| Toggle chips | `button` with `aria-pressed`; group labelled with `role="group"` + `aria-label`. |
| Cards | One link per card (stretched link); the card heading is the link's accessible name. |
| Status and tags | Text always present; colour is supplementary. |
| Live updates | Filter result counts and form status use polite live regions; errors use `role="alert"`. |
| Motion | Respects reduced motion; nothing flashes more than three times per second. |
| Images | `alt` required in `ResponsiveImage` (empty string for decorative). |

---

## 14. Component definition of done

A component is complete when:

- [ ] It uses only design tokens (no hard-coded colours, sizes or spacing).
- [ ] It works on both `ink` and `paper` surfaces.
- [ ] It works from 320 px upward with no overflow, and adapts at the breakpoints in [03 §10](03-design-system.md#10-responsive-behaviour).
- [ ] Keyboard and screen-reader behaviour meet §13; axe reports no violations.
- [ ] It renders during pre-rendering without browser APIs, and without hydration warnings.
- [ ] It returns `null` for empty data where the content is optional.
- [ ] It has a JSDoc props block and, where it has behaviour, tests.
- [ ] Animations use the motion wrappers and respect reduced motion.
