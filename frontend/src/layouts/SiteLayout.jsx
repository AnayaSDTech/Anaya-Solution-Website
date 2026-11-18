import { Outlet } from 'react-router';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import styles from './SiteLayout.module.css';

export default function SiteLayout() {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
