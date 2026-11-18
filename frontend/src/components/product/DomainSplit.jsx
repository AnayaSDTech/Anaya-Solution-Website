import { Link } from 'react-router';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import { domains } from '@/lib/taxonomy';
import { getProductsByDomain } from '@/lib/products';
import styles from './DomainSplit.module.css';

/** Domain panels (Financial, Social, Security & Trust) listing their products. */
export default function DomainSplit() {
  const panels = domains
    .map((d) => ({ ...d, products: getProductsByDomain(d.slug) }))
    // Financial and Social are core domains from the brief; others show only with products.
    .filter((d) => ['financial', 'social'].includes(d.slug) || d.products.length > 0);

  return (
    <ul role="list" className={styles.grid}>
      {panels.map((d, i) => (
        <Reveal as="li" key={d.slug} delay={i * 80} className={styles.panel} data-domain={d.slug}>
          <div className={styles.head}>
            <span className={styles.icon}>
              <Icon name={d.icon} size={24} />
            </span>
            <p className={styles.label}>Domain</p>
          </div>
          <h3 className={styles.title}>{d.label}</h3>
          <p className={styles.text}>{d.description}</p>
          {d.products.length > 0 && (
            <ul role="list" className={styles.products}>
              {d.products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className={styles.product}>
                    <Icon name={p.icon} size={18} />
                    <span>{p.name}</span>
                    <Icon name="ArrowRight" size={16} className={styles.arrow} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </ul>
  );
}
