import { Link } from 'react-router';
import styles from './Logo.module.css';
import { withBase } from '@/lib/base';

/** ANAYA Solutions logo linking to the home page. */
export default function Logo({ variant = 'dark', height = 32, className }) {
  const src = withBase(variant === 'light' ? '/images/brand/anaya-logo-light-bg.svg' : '/images/brand/anaya-logo.svg');
  return (
    <Link to="/" className={`${styles.logo} ${className ?? ''}`} aria-label="ANAYA Solutions — home">
      <img src={src} alt="" width={Math.round((height * 228) / 60)} height={height} />
    </Link>
  );
}
