import Button from '@/components/ui/Button';
import AbstractVisual from '@/components/media/AbstractVisual';
import styles from './ErrorPage.module.css';
import { withBase } from '@/lib/base';

/**
 * 404 / error content. `standalone` renders a minimal shell for the root error
 * boundary (where the site header and footer may not be available).
 */
export default function ErrorPage({ title, message, standalone = false }) {
  const link = (path) => (standalone ? { href: withBase(path) } : { to: path });
  const body = (
    <section className={styles.section} data-tone="ink" aria-labelledby="error-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.code}>{title === 'Page not found' ? '404' : 'Error'}</p>
          <h1 id="error-title">{title}</h1>
          <p className={styles.message}>{message}</p>
          <div className={styles.actions}>
            <Button {...link('/')} iconRight="ArrowRight">
              Go to home page
            </Button>
            <Button {...link('/products')} variant="secondary">
              View products
            </Button>
            <Button {...link('/contact')} variant="ghost" iconRight="ArrowRight">
              Contact us
            </Button>
          </div>
        </div>
        <AbstractVisual variant="signal" className={styles.visual} />
      </div>
    </section>
  );
  if (!standalone) return body;
  return (
    <main id="main" className={styles.standalone}>
      <a href={withBase('/')} className={styles.homeLogo}>
        <img src={withBase('/images/brand/anaya-logo.svg')} alt="ANAYA Solutions — home" width="122" height="32" />
      </a>
      {body}
    </main>
  );
}
