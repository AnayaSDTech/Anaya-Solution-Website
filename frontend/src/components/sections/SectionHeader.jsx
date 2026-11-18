import { Eyebrow, RichText } from '@/components/ui/Primitives';
import Button from '@/components/ui/Button';
import Reveal from '@/components/motion/Reveal';
import { cx } from '@/lib/utils';
import styles from './SectionHeader.module.css';

/**
 * @param {{ eyebrow?: string, title: any, lead?: string, id?: string, align?: 'start' | 'center',
 *   action?: { label: string, to: string }, headingLevel?: 2 | 3 }} props
 */
export default function SectionHeader({ eyebrow, title, lead, id, align = 'start', action, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`;
  return (
    <Reveal className={cx(styles.header, align === 'center' && styles.center, action && styles.withAction)}>
      <div className={styles.text}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading id={id} className={styles.title}>
          <RichText value={title} />
        </Heading>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      {action && (
        <Button to={action.to} variant="ghost" iconRight="ArrowRight" className={styles.action}>
          {action.label}
        </Button>
      )}
    </Reveal>
  );
}
