import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import Icon from '@/components/ui/Icon';
import { IconTile } from '@/components/ui/Primitives';
import Reveal from '@/components/motion/Reveal';
import ProductCard from '@/components/product/ProductCard';
import { technologies } from '@/lib/taxonomy';
import { technologyAreas } from '@/content/technology';
import { cx, pad2 } from '@/lib/utils';
import styles from './TechArea.module.css';

/** Card for one technology area. */
export function TechAreaCard({ area, index, fallback }) {
  const content = technologyAreas[area.slug];
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <IconTile name={area.icon} />
        <span className={styles.index}>{pad2(index + 1)}</span>
      </div>
      <h3 className={styles.cardTitle}>
        <Link to={`/technology#${area.slug}`} className={styles.cardLink}>
          {area.label}
        </Link>
      </h3>
      {content?.summary && <p className={styles.cardText}>{content.summary}</p>}
      <span className={styles.more} aria-hidden="true">
        {fallback ? 'Talk to us to learn more' : 'Explore'} <Icon name="ArrowRight" size={16} />
      </span>
    </article>
  );
}

/** Grid of all technology areas. `fallback` is used when no products are published. */
export function TechAreaGrid({ fallback = false }) {
  return (
    <ul role="list" className={styles.grid}>
      {technologies.map((area, i) => (
        <Reveal as="li" key={area.slug} delay={(i % 3) * 60}>
          <TechAreaCard area={area} index={i} fallback={fallback} />
        </Reveal>
      ))}
    </ul>
  );
}

/** One-line list of technology links. */
export function TechAreaStrip() {
  return (
    <ul role="list" className={styles.strip}>
      {technologies.map((t) => (
        <li key={t.slug}>
          <Link to={`/technology#${t.slug}`} className={styles.stripLink}>
            <Icon name={t.icon} size={16} />
            {t.short}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Scroll to a section on this page without a router navigation (a plain hash
 * change is treated as a navigation and can cancel the scroll).
 */
function jumpTo(e, slug) {
  const el = document.getElementById(slug);
  if (!el) return;
  e.preventDefault();
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  window.history.replaceState(window.history.state, '', `#${slug}`);
}

/** Sticky side index (desktop) / swipeable tab bar (mobile and tablet). */
export function TechAreaIndex({ activeId }) {
  const tabsRef = useRef(null);

  // Keep the active tab visible inside the horizontal bar (without moving the page)
  useEffect(() => {
    const bar = tabsRef.current;
    const tab = bar?.querySelector(`[data-slug="${activeId}"]`);
    if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return;
    const left = tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    bar.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
  }, [activeId]);

  return (
    <nav aria-label="Technology areas" className={styles.indexNav}>
      <div className={styles.tabsWrap}>
        <ul role="list" className={styles.tabs} ref={tabsRef}>
          {technologies.map((t) => (
            <li key={t.slug}>
              <a
                href={`#${t.slug}`}
                data-slug={t.slug}
                onClick={(e) => jumpTo(e, t.slug)}
                className={cx(styles.tab, activeId === t.slug && styles.tabActive)}
                aria-current={activeId === t.slug ? 'true' : undefined}
              >
                <Icon name={t.icon} size={16} />
                {t.short}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ol role="list" className={styles.indexList}>
        {technologies.map((t, i) => (
          <li key={t.slug}>
            <a
              href={`#${t.slug}`}
              onClick={(e) => jumpTo(e, t.slug)}
              className={cx(styles.indexLink, activeId === t.slug && styles.indexActive)}
              aria-current={activeId === t.slug ? 'true' : undefined}
            >
              <span className={styles.indexNum}>{pad2(i + 1)}</span>
              {t.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Full section for one area on /technology. */
export function TechAreaSection({ area, index, products }) {
  const content = technologyAreas[area.slug] ?? {};
  return (
    <section id={area.slug} className={styles.section} aria-labelledby={`${area.slug}-title`}>
      <Reveal>
        <div className={styles.sectionHead}>
          <IconTile name={area.icon} size={24} />
          <p className={styles.sectionNum}>{pad2(index + 1)}</p>
        </div>
        <h2 id={`${area.slug}-title`} className={styles.sectionTitle}>
          {area.label}
        </h2>
        {content.description && <p className={styles.sectionText}>{content.description}</p>}
        {content.capabilities?.length > 0 && (
          <ul className={styles.capabilities}>
            {content.capabilities.map((c) => (
              <li key={c}>
                <Icon name="Check" size={16} />
                {c}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
      {products.length > 0 && (
        <div className={styles.related}>
          <p className={styles.relatedLabel}>Products using this technology</p>
          <ul role="list" className={styles.relatedGrid}>
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} variant="compact" headingLevel={3} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
