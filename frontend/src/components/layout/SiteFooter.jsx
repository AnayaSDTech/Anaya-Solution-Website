import { Link } from 'react-router';
import Logo from './Logo';
import Icon from '@/components/ui/Icon';
import { site, isSupplied } from '@/content/site';
import { footerCompany, footerLegal } from '@/content/navigation';
import { getPublishedProducts } from '@/lib/products';
import { technologies } from '@/lib/taxonomy';
import { BUILD_YEAR } from '@/lib/utils';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const products = getPublishedProducts();
  const productLinks = products.length
    ? products.slice(0, 8).map((p) => ({ label: p.name, to: `/products/${p.slug}` }))
    : technologies.map((t) => ({ label: t.short, to: `/technology#${t.slug}` }));

  const registration = [
    `${site.name} is a trading name of ${site.legalName}.`,
    isSupplied(site.registeredIn) ? `Registered in ${site.registeredIn}.` : null,
    `Company number ${site.companyNumber}.`,
    isSupplied(site.registeredOffice) ? `Registered office: ${site.registeredOffice}.` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={styles.footer} data-tone="ink">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className={styles.columns}>
            <div>
              <h2 className={styles.heading}>Products</h2>
              <ul role="list" className={styles.list}>
                {productLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/products" className={styles.all}>
                    All products
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={styles.heading}>Company</h2>
              <ul role="list" className={styles.list}>
                {footerCompany.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.heading}>Contact</h2>
              <ul role="list" className={styles.list}>
                <li>
                  <a href={`mailto:${site.email}`} className={styles.contact}>
                    <Icon name="Mail" size={16} /> {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.phone.href} className={styles.contact}>
                    <Icon name="Phone" size={16} /> {site.phone.display}
                  </a>
                </li>
                <li className={styles.contact}>
                  <Icon name="MapPin" size={16} /> {site.location}
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legalText}>{registration}</p>
          <div className={styles.bottomRow}>
            <p>
              © {BUILD_YEAR} {site.legalName}
            </p>
            <ul role="list" className={styles.legalLinks}>
              {footerLegal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
