import { RichText } from '@/components/ui/Primitives';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { cx } from '@/lib/utils';
import styles from './PageHero.module.css';

/**
 * Standard page hero.
 * @param {{ eyebrow?: string, title: any, lead?: string, visual?: React.ReactNode,
 *   breadcrumbs?: {label: string, to: string}[], size?: 'default' | 'compact', children?: React.ReactNode }} props
 */
export default function PageHero({ eyebrow, title, lead, visual, breadcrumbs, size = 'default', children }) {
  return (
    <section className={cx(styles.hero, styles[size], visual && styles.withVisual)} data-tone="ink" aria-labelledby="page-title">
      <div className={styles.bg} aria-hidden="true" />
      <div className={cx('container', styles.inner)}>
        <div className={styles.content}>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && <p className={`${styles.eyebrow} enter`}>{eyebrow}</p>}
          <h1 id="page-title" className="enter" style={{ '--enter-delay': '60ms' }}>
            <RichText value={title} />
          </h1>
          {lead && (
            <p className={`${styles.lead} enter`} style={{ '--enter-delay': '120ms' }}>
              {lead}
            </p>
          )}
          {children && (
            <div className={`${styles.extra} enter`} style={{ '--enter-delay': '180ms' }}>
              {children}
            </div>
          )}
        </div>
        {visual && (
          <div className={`${styles.visual} enter`} style={{ '--enter-delay': '200ms' }}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
