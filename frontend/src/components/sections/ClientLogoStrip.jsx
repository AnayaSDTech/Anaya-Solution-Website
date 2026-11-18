import Reveal from '@/components/motion/Reveal';
import { site } from '@/content/site';
import styles from './ClientLogoStrip.module.css';
import { withBase } from '@/lib/base';

/**
 * [TEMPORARY] Client logo band. Hidden when site.features.clientsSection is false.
 * @param {{ eyebrow?: string, title: string, clients: { name: string, logo: { src: string, width: number, height: number } }[] }} props
 */
export default function ClientLogoStrip({ eyebrow, title, clients }) {
  if (!site.features.clientsSection || !clients?.length) return null;
  return (
    <section className={styles.section} data-tone="ink" aria-labelledby="clients-title">
      <div className="container">
        <Reveal className={styles.inner}>
          <h2 id="clients-title" className={styles.title}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title}
          </h2>
          <ul role="list" className={styles.list}>
            {clients.map((c) => (
              <li key={c.name} className={styles.item}>
                <img
                  src={withBase(c.logo.src)}
                  alt={c.name}
                  width={c.logo.width}
                  height={c.logo.height}
                  loading="lazy"
                  decoding="async"
                  className={c.keepOriginalColours ? `${styles.logo} ${styles.original}` : styles.logo}
                  style={{
                    aspectRatio: `${c.logo.width} / ${c.logo.height}`,
                    ...(c.logo.maxHeight && { height: c.logo.maxHeight, maxWidth: 'none' }),
                  }}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
