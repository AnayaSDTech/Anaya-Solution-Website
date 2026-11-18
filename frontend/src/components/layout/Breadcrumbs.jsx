import { Link } from 'react-router';
import styles from './Breadcrumbs.module.css';

/** @param {{ items: { label: string, to: string }[] }} props — last item is the current page */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.to} className={styles.item}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link to={item.to}>{item.label}</Link>
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
