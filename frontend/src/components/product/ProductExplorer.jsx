import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatePresence, m } from 'motion/react';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/Icon';
import { TechAreaGrid } from '@/components/technology/TechArea';
import { domains, technologies } from '@/lib/taxonomy';
import { cx } from '@/lib/utils';
import styles from './ProductExplorer.module.css';

const matches = (p, domain, techs) =>
  (!domain || p.domain === domain || p.secondaryDomains?.includes(domain)) &&
  (!techs.length || techs.some((t) => p.technologies.includes(t)));

/**
 * Products page: filter bar (state in the URL query) + grouped / filtered grid.
 * The pre-rendered HTML contains every product; filtering happens after hydration.
 */
export default function ProductExplorer({ products }) {
  const [params, setParams] = useSearchParams();
  // The pre-rendered HTML has no query string, so URL filters are applied only
  // after hydration; otherwise server and client markup would differ.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const domain = hydrated ? (params.get('domain') ?? '') : '';
  const techs = hydrated ? (params.get('tech') ?? '').split(',').filter(Boolean) : [];

  const filtered = useMemo(() => products.filter((p) => matches(p, domain, techs)), [products, domain, techs.join()]);

  if (!products.length) return <TechAreaGrid fallback />;

  const update = (next) => {
    const merged = { domain, tech: techs.join(','), ...next };
    const search = new URLSearchParams();
    if (merged.domain) search.set('domain', merged.domain);
    if (merged.tech) search.set('tech', merged.tech);
    setParams(search, { replace: true, preventScrollReset: true });
  };
  const toggleTech = (slug) =>
    update({ tech: (techs.includes(slug) ? techs.filter((t) => t !== slug) : [...techs, slug]).join(',') });

  // Only offer options that match at least one product
  const domainOptions = domains.filter((d) => products.some((p) => matches(p, d.slug, [])));
  const techOptions = technologies.filter((t) => products.some((p) => p.technologies.includes(t.slug)));
  const isFiltered = Boolean(domain || techs.length);

  const groups = isFiltered
    ? [{ slug: 'results', label: null, products: filtered }]
    : domains
        .map((d) => ({ ...d, products: products.filter((p) => p.domain === d.slug) }))
        .filter((g) => g.products.length);

  return (
    <div>
      <div className={styles.filters}>
        <div role="group" aria-label="Filter by domain" className={styles.row}>
          <span className={styles.rowLabel}>Domain</span>
          <div className={styles.chips}>
            <button type="button" className={cx(styles.chip, !domain && styles.chipOn)} aria-pressed={!domain} onClick={() => update({ domain: '' })}>
              All
            </button>
            {domainOptions.map((d) => (
              <button
                key={d.slug}
                type="button"
                className={cx(styles.chip, domain === d.slug && styles.chipOn)}
                aria-pressed={domain === d.slug}
                data-domain={d.slug}
                onClick={() => update({ domain: domain === d.slug ? '' : d.slug })}
              >
                <span className={styles.dot} aria-hidden="true" />
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Filter by technology" className={styles.row}>
          <span className={styles.rowLabel}>Technology</span>
          <div className={styles.chips}>
            {techOptions.map((t) => {
              const on = techs.includes(t.slug);
              return (
                <button
                  key={t.slug}
                  type="button"
                  className={cx(styles.chip, on && styles.chipOn)}
                  aria-pressed={on}
                  onClick={() => toggleTech(t.slug)}
                >
                  {on && <Icon name="Check" size={14} />}
                  {t.short}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.status}>
          <p aria-live="polite" className={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
          {isFiltered && (
            <button type="button" className={styles.clear} onClick={() => update({ domain: '', tech: '' })}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No products match these filters.</p>
          <button type="button" className={styles.clear} onClick={() => update({ domain: '', tech: '' })}>
            Clear filters
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.slug} className={styles.group} aria-labelledby={group.label ? `group-${group.slug}` : undefined}>
            {group.label && (
              <h2 id={`group-${group.slug}`} className={styles.groupTitle} data-domain={group.slug}>
                {group.label}
              </h2>
            )}
            <ul role="list" className={styles.grid}>
              <AnimatePresence initial={false}>
                {group.products.map((p) => (
                  <m.li
                    key={p.slug}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductCard product={p} headingLevel={group.label ? 3 : 2} />
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
