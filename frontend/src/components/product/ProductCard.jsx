import { Link } from 'react-router';
import Icon from '@/components/ui/Icon';
import { Tag, StatusBadge } from '@/components/ui/Primitives';
import AbstractVisual from '@/components/media/AbstractVisual';
import { getDomain, getTechnology } from '@/lib/taxonomy';
import { cx } from '@/lib/utils';
import styles from './ProductCard.module.css';

/**
 * Product card. The whole card is one link (stretched-link pattern, no nested links).
 * @param {{ product: object, variant?: 'standard' | 'large' | 'compact', headingLevel?: 2 | 3 | 4 }} props
 */
export default function ProductCard({ product, variant = 'standard', headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const domain = getDomain(product.domain);
  return (
    <article className={cx(styles.card, styles[variant])} data-domain={product.domain}>
      {variant === 'large' && <AbstractVisual variant={product.visual} className={styles.visual} />}
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.icon}>
            <Icon name={product.icon} size={22} />
          </span>
          {variant !== 'compact' && (
            <div className={styles.meta}>
              {domain && <Tag color={domain.slug}>{domain.label}</Tag>}
              {product.showStatus !== false && <StatusBadge status={product.status} />}
            </div>
          )}
        </div>

        <Heading className={styles.name}>
          <Link to={`/products/${product.slug}`} className={styles.link}>
            {product.name}
          </Link>
        </Heading>
        <p className={styles.tagline}>{product.tagline}</p>

        {variant === 'large' && product.capabilities?.length > 0 && (
          <ul className={styles.capabilities}>
            {product.capabilities.slice(0, 3).map((c) => (
              <li key={c.title}>
                <Icon name="Check" size={16} />
                {c.title}
              </li>
            ))}
          </ul>
        )}

        {variant !== 'compact' && (
          <div className={styles.bottom}>
            <ul role="list" className={styles.techs} aria-label="Technologies">
              {product.technologies.slice(0, 3).map((t) => (
                <li key={t}>
                  <Tag>{getTechnology(t)?.short ?? t}</Tag>
                </li>
              ))}
            </ul>
            <span className={styles.more} aria-hidden="true">
              View product <Icon name="ArrowRight" size={16} />
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
