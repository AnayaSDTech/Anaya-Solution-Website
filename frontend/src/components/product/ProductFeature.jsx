import { Link } from 'react-router';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { StatusBadge, Tag } from '@/components/ui/Primitives';
import AbstractVisual from '@/components/media/AbstractVisual';
import { getDomain, getTechnology } from '@/lib/taxonomy';
import { cx, pad2 } from '@/lib/utils';
import { withBase } from '@/lib/base';
import styles from './ProductFeature.module.css';

/**
 * Full-width product row for the Products page: visual on one side, details on
 * the other (sides alternate via CSS). Scales to any number of products.
 * @param {{ product: object, index: number, headingLevel?: 2 | 3 }} props
 */
export default function ProductFeature({ product, index, headingLevel = 2, reverse = false }) {
  const Heading = `h${headingLevel}`;
  const domain = getDomain(product.domain);
  const capabilities = product.capabilities?.slice(0, 4) ?? [];
  const href = `/products/${product.slug}`;

  return (
    <article className={cx(styles.feature, reverse && styles.reverse)} data-domain={product.domain} aria-labelledby={`pf-${product.slug}`}>
      <Link to={href} className={styles.visual} tabIndex={-1} aria-hidden="true">
        {product.media?.hero ? (
          <img src={withBase(product.media.hero.src)} alt="" width={product.media.hero.width} height={product.media.hero.height} loading="lazy" />
        ) : (
          <AbstractVisual variant={product.visual} />
        )}
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.index}>{pad2(index + 1)}</span>
          <span className={styles.icon}>
            <Icon name={product.icon} size={20} />
          </span>
          {domain && <Tag color={domain.slug}>{domain.label}</Tag>}
          {product.showStatus !== false && <StatusBadge status={product.status} />}
        </div>

        <Heading id={`pf-${product.slug}`} className={styles.name}>
          <Link to={href}>{product.name}</Link>
        </Heading>
        <p className={styles.tagline}>{product.tagline}</p>

        {capabilities.length > 0 && (
          <ul className={styles.capabilities} aria-label="Key capabilities">
            {capabilities.map((c) => (
              <li key={c.title}>
                <Icon name="Check" size={16} />
                {c.title}
              </li>
            ))}
          </ul>
        )}

        <ul role="list" className={styles.techs} aria-label="Technologies">
          {product.technologies.map((t) => (
            <li key={t}>
              <Tag>{getTechnology(t)?.short ?? t}</Tag>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button to={href} iconRight="ArrowRight">
            View product
          </Button>
          <Button to={`/contact?product=${product.slug}`} variant="secondary">
            Talk to us
          </Button>
        </div>
      </div>
    </article>
  );
}
