import { Link } from 'react-router';
import Icon from './Icon';
import { cx } from '@/lib/utils';
import styles from './Button.module.css';

/**
 * @param {{
 *   variant?: 'primary' | 'secondary' | 'ghost', size?: 'md' | 'lg',
 *   to?: string, href?: string, iconLeft?: string, iconRight?: string,
 *   fullWidthOnMobile?: boolean, className?: string, children: React.ReactNode
 * }} props
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  iconLeft,
  iconRight,
  fullWidthOnMobile = false,
  className,
  children,
  ...rest
}) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidthOnMobile && styles.fullWidthOnMobile,
    className,
  );
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={18} className={styles.iconRight} />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
