import { cx } from '@/lib/utils';
import styles from './Section.module.css';

/**
 * Page section wrapper: sets the surface tone, vertical rhythm and container.
 * @param {{ tone?: 'ink' | 'paper', alt?: boolean, id?: string, labelledBy?: string,
 *   padding?: 'default' | 'compact' | 'none', background?: 'none' | 'grid' | 'glow',
 *   container?: 'default' | 'wide' | 'narrow' | 'none', className?: string, children: React.ReactNode }} props
 */
export default function Section({
  tone = 'ink',
  alt = false,
  id,
  labelledBy,
  padding = 'default',
  background = 'none',
  container = 'default',
  className,
  children,
}) {
  const inner =
    container === 'none' ? (
      children
    ) : (
      <div className={cx('container', container === 'wide' && 'container--wide', container === 'narrow' && 'container--narrow', styles.inner)}>
        {children}
      </div>
    );
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={cx(styles.section, alt && styles.alt, styles[padding], background !== 'none' && styles[background], className)}
    >
      {inner}
    </section>
  );
}
