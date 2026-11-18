// Small presentational primitives: Eyebrow, Tag, StatusBadge, RichText, IconTile.
import { Link } from 'react-router';
import Icon from './Icon';
import { cx } from '@/lib/utils';
import { getStatus } from '@/lib/taxonomy';
import styles from './Primitives.module.css';

export function Eyebrow({ children, number, tone = 'accent', className }) {
  return (
    <p className={cx(styles.eyebrow, tone === 'muted' && styles.eyebrowMuted, className)}>
      {number && <span className={styles.eyebrowNumber}>{number}</span>}
      {children}
    </p>
  );
}

/**
 * Domain / technology label.
 * @param {{ color?: 'neutral' | 'financial' | 'social' | 'security-trust', to?: string, icon?: string }} props
 */
export function Tag({ children, color = 'neutral', to, icon, className }) {
  const classes = cx(styles.tag, styles[`tag-${color}`], to && styles.tagLink, className);
  const content = (
    <>
      {color !== 'neutral' && <span className={styles.tagDot} aria-hidden="true" />}
      {icon && <Icon name={icon} size={14} />}
      {children}
    </>
  );
  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
}

export function StatusBadge({ status }) {
  const s = getStatus(status);
  if (!s) return null;
  return (
    <span className={cx(styles.status, styles[`status-${s.tone}`])}>
      <span className={styles.statusDot} aria-hidden="true" />
      {s.label}
    </span>
  );
}

/** Renders rich text: strings plus { highlight } segments (gradient text). */
export function RichText({ value }) {
  if (!Array.isArray(value)) return value;
  return value.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <span key={i} className="gradient-text">
        {part.highlight}
      </span>
    ),
  );
}

export function IconTile({ name, size = 22, className }) {
  return (
    <span className={cx(styles.iconTile, className)}>
      <Icon name={name} size={size} />
    </span>
  );
}
