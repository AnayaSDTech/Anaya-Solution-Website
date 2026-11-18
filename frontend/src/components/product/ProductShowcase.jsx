import ProductCard from './ProductCard';
import Reveal from '@/components/motion/Reveal';
import { TechAreaGrid } from '@/components/technology/TechArea';
import styles from './ProductShowcase.module.css';

/**
 * Home product showcase: the first product as a large card, the rest in a grid.
 * Falls back to the technology "product areas" when no product is published.
 */
export default function ProductShowcase({ products }) {
  if (!products?.length) return <TechAreaGrid fallback />;
  const [first, ...rest] = products;
  return (
    <div className={styles.showcase}>
      <Reveal>
        <ProductCard product={first} variant="large" />
      </Reveal>
      {rest.length > 0 && (
        <ul role="list" className={styles.grid}>
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
