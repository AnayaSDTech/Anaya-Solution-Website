import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatePresence, m } from 'motion/react';
import ProductFeature from './ProductFeature';
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
        <ul role="list" className={styles.list}>
          <AnimatePresence initial={false}>
            {filtered.map((p, i) => (
              <m.li
                key={p.slug}
                className={styles.item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductFeature product={p} index={products.indexOf(p)} reverse={i % 2 === 1} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
