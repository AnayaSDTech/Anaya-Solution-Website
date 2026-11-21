// Reusable content blocks. Each returns null when it has no items.
import { IconTile } from '@/components/ui/Primitives';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import { cx, pad2 } from '@/lib/utils';
import styles from './Blocks.module.css';

/** Grid of icon / title / description cards. */
export function FeatureGrid({ items, columns = 3, headingLevel = 3 }) {
  if (!items?.length) return null;
  const Heading = `h${headingLevel}`;
  return (
    <ul role="list" className={cx(styles.featureGrid, columns === 4 && styles.cols4, columns === 2 && styles.cols2)}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % 3) * 60} className={cx(styles.featureCard, item.icon && styles.hasIcon)}>
          {item.icon && <IconTile name={item.icon} />}
          <Heading className={styles.featureTitle}>{item.title}</Heading>
          {item.description && <p className={styles.featureText}>{item.description}</p>}
        </Reveal>
      ))}
    </ul>
  );
}

/** Numbered / icon list, typically beside a heading. */
export function FeatureList({ items, numbered = false }) {
  if (!items?.length) return null;
  return (
    <ol role="list" className={styles.featureList}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 60} className={styles.featureListItem}>
          {numbered ? <span className={styles.number}>{pad2(i + 1)}</span> : item.icon && <IconTile name={item.icon} />}
          <div>
            <h3 className={styles.featureTitle}>{item.title}</h3>
            {item.description && <p className={styles.featureText}>{item.description}</p>}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Numbered steps: horizontal on desktop, vertical timeline on mobile. */
export function ProcessSteps({ steps }) {
  if (!steps?.length) return null;
  return (
    <ol role="list" className={styles.steps} style={{ '--steps': steps.length }}>
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 60} className={styles.step}>
          <span className={styles.stepNumber}>{pad2(i + 1)}</span>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          {step.description && <p className={styles.stepText}>{step.description}</p>}
        </Reveal>
      ))}
    </ol>
  );
}

/** Large statement (purpose). */
export function Statement({ text }) {
  if (!text) return null;
  return (
    <Reveal as="blockquote" className={styles.statement}>
      <p>{text}</p>
    </Reveal>
  );
}

/** Definition list of facts; skips empty values. */
export function FactList({ items }) {
  const visible = items?.filter((i) => i.value);
  if (!visible?.length) return null;
  return (
    <dl className={styles.facts}>
      {visible.map((item) => (
        <div key={item.label} className={styles.fact}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Collapsible lists of tools by category (native <details> for accessibility). */
export function CapabilityMatrix({ groups }) {
  if (!groups?.length) return null;
  return (
    <div className={styles.matrix}>
      {groups.map((group, i) => (
        <details key={group.title} className={styles.matrixGroup} open={i === 0}>
          <summary className={styles.matrixSummary}>
            {group.title}
            <Icon name="ChevronDown" size={18} className={styles.matrixChevron} />
          </summary>
          <ul className={styles.matrixList}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** Two-column split: heading block + content. */
export function Split({ aside, children }) {
  return (
    <div className={styles.split}>
      <div className={styles.splitAside}>{aside}</div>
      <div>{children}</div>
    </div>
  );
}
