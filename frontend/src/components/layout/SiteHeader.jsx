import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, m } from 'motion/react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { mainNav, headerCta } from '@/content/navigation';
import { domains, technologies } from '@/lib/taxonomy';
import { getProductBySlug, getPublishedProducts } from '@/lib/products';
import { useScrolled } from '@/hooks';
import { cx } from '@/lib/utils';
import styles from './SiteHeader.module.css';

function useMenuColumns() {
  const products = getPublishedProducts();
  return domains
    .map((d) => ({ ...d, products: products.filter((p) => p.domain === d.slug) }))
    .filter((d) => d.products.length > 0);
}

function MegaMenu({ id, columns, onNavigate }) {
  return (
    <m.div
      id={id}
      className={styles.mega}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.megaInner}>
        <div className={styles.megaColumns}>
          {columns.map((col) => (
            <div key={col.slug} className={styles.megaColumn}>
              <p className={styles.megaHeading} data-domain={col.slug}>
                {col.label}
              </p>
              <ul role="list" className={styles.megaList}>
                {col.products.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className={styles.megaItem} onClick={onNavigate}>
                      <span className={styles.megaIcon}>
                        <Icon name={p.icon} size={18} />
                      </span>
                      <span>
                        <span className={styles.megaName}>{p.name}</span>
                        <span className={styles.megaTagline}>{p.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.megaFooter}>
          <p className={styles.megaTechLabel}>Browse by technology:</p>
          <ul role="list" className={styles.megaTech}>
            {technologies.map((t) => (
              <li key={t.slug}>
                <Link to={`/technology#${t.slug}`} onClick={onNavigate}>
                  {t.short}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/products" className={styles.megaAll} onClick={onNavigate}>
            View all products <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </m.div>
  );
}

export default function SiteHeader() {
  const scrolled = useScrolled(24);
  const location = useLocation();
  const columns = useMenuColumns();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaId = useId();
  const triggerRef = useRef(null);
  const wrapRef = useRef(null);
  const hoverTimer = useRef(0);

  // Close menus on navigation
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Escape and outside click close the mega menu
  useEffect(() => {
    if (!megaOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMegaOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [megaOpen]);

  const hoverOpen = (open) => (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(open), open ? 120 : 180);
  };

  const hasMega = columns.length > 0;
  // Only highlight Products for real product URLs (unknown ones show the 404 page)
  const productsActive =
    location.pathname === '/products' || Boolean(getProductBySlug(location.pathname.replace(/^\/products\//, '')));

  return (
    <header className={cx(styles.header, (scrolled || megaOpen) && styles.solid)}>
      <div className={cx('container', styles.bar)}>
        <Logo />

        <nav aria-label="Main" className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {mainNav.map((item) =>
              item.megaMenu && hasMega ? (
                <li
                  key={item.to}
                  ref={wrapRef}
                  className={styles.megaWrap}
                  onPointerEnter={hoverOpen(true)}
                  onPointerLeave={hoverOpen(false)}
                >
                  <div className={styles.splitItem}>
                    <Link
                      to={item.to}
                      className={cx(styles.navLink, productsActive && styles.active)}
                      aria-current={location.pathname === item.to ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                    <button
                      ref={triggerRef}
                      type="button"
                      className={styles.megaTrigger}
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      aria-label="Show products menu"
                      onClick={() => setMegaOpen((v) => !v)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setMegaOpen(true);
                        }
                      }}
                    >
                      <Icon name="ChevronDown" size={16} className={cx(styles.chevron, megaOpen && styles.chevronOpen)} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {megaOpen && <MegaMenu id={megaId} columns={columns} onNavigate={() => setMegaOpen(false)} />}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} className={({ isActive }) => cx(styles.navLink, isActive && styles.active)}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button to={headerCta.to} iconRight="ArrowRight" className={styles.cta}>
            {headerCta.label}
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="Menu" size={24} />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} columns={columns} />
    </header>
  );
}
