import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router';
import { AnimatePresence, m } from 'motion/react';
import Logo from './Logo';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { mainNav, headerCta } from '@/content/navigation';
import { useFocusTrap, useLockBodyScroll } from '@/hooks';
import { cx } from '@/lib/utils';
import styles from './MobileMenu.module.css';

const list = { open: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } }, closed: {} };
const item = {
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  closed: { opacity: 0, y: 10 },
};

function MenuPanel({ onClose, columns }) {
  const ref = useRef(null);
  const [productsOpen, setProductsOpen] = useState(false);
  useFocusTrap(ref, true);
  useLockBodyScroll(true);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <m.div
      ref={ref}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={cx('container', styles.top)}>
        <Logo />
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
          <Icon name="X" size={24} />
        </button>
      </div>

      <nav aria-label="Mobile" className={cx('container', styles.body)}>
        <m.ul role="list" className={styles.list} variants={list} initial="closed" animate="open">
          {mainNav.map((navItem) =>
            navItem.megaMenu && columns.length ? (
              <m.li key={navItem.to} variants={item} className={styles.item}>
                <button
                  type="button"
                  className={styles.link}
                  aria-expanded={productsOpen}
                  aria-controls="mobile-products"
                  onClick={() => setProductsOpen((v) => !v)}
                >
                  {navItem.label}
                  <Icon name={productsOpen ? 'Minus' : 'Plus'} size={22} />
                </button>
                <AnimatePresence initial={false}>
                  {productsOpen && (
                    <m.div
                      id="mobile-products"
                      className={styles.sub}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                    >
                      {columns.map((col) => (
                        <div key={col.slug} className={styles.group}>
                          <p className={styles.groupLabel}>{col.label}</p>
                          <ul role="list">
                            {col.products.map((p) => (
                              <li key={p.slug}>
                                <Link to={`/products/${p.slug}`} className={styles.subLink} onClick={onClose}>
                                  <Icon name={p.icon} size={18} />
                                  {p.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link to="/products" className={styles.allLink} onClick={onClose}>
                        View all products <Icon name="ArrowRight" size={16} />
                      </Link>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.li>
            ) : (
              <m.li key={navItem.to} variants={item} className={styles.item}>
                <NavLink
                  to={navItem.to}
                  className={({ isActive }) => cx(styles.link, isActive && styles.active)}
                  onClick={onClose}
                >
                  {navItem.label}
                </NavLink>
              </m.li>
            ),
          )}
          <m.li variants={item} className={styles.item}>
            <NavLink to="/contact" className={({ isActive }) => cx(styles.link, isActive && styles.active)} onClick={onClose}>
              Contact
            </NavLink>
          </m.li>
        </m.ul>
      </nav>

      <div className={cx('container', styles.bottom)}>
        <Button to={headerCta.to} size="lg" iconRight="ArrowRight" className={styles.cta} onClick={onClose}>
          {headerCta.label}
        </Button>
      </div>
    </m.div>
  );
}

export default function MobileMenu({ open, onClose, columns }) {
  // Rendered in a portal: the header's backdrop-filter would otherwise trap the fixed overlay.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{open && <MenuPanel onClose={onClose} columns={columns} />}</AnimatePresence>,
    document.body,
  );
}
