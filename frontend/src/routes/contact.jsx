import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import ContactForm from '@/components/forms/ContactForm';
import { IconTile } from '@/components/ui/Primitives';
import { contact } from '@/content/pages';
import { site } from '@/content/site';
import { buildMeta, breadcrumbJsonLd } from '@/lib/seo';
import styles from './contact.module.css';

export function meta() {
  return buildMeta({
    title: 'Contact',
    description: 'Contact ANAYA Solutions about our AI products, partnerships or careers. Email info@anaya.uk or call +44 7522 405709.',
    path: '/contact',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact ANAYA Solutions', url: `${site.url}/contact` },
      breadcrumbJsonLd([
        { label: 'Home', to: '/' },
        { label: 'Contact', to: '/contact' },
      ]),
    ],
  });
}

const options = [
  { icon: 'Mail', label: 'Email', value: site.email, href: `mailto:${site.email}`, note: 'For product, partnership and careers enquiries' },
  { icon: 'Phone', label: 'Phone', value: site.phone.display, href: site.phone.href },
  { icon: 'MapPin', label: 'Office', value: site.location },
];

export default function Contact() {
  return (
    <>
      <PageHero {...contact.hero} size="compact" />
      <Section>
        <div className={styles.layout}>
          <div>
            <h2 className={styles.heading}>Get in touch directly</h2>
            <ul role="list" className={styles.options}>
              {options.map((o) => (
                <li key={o.label} className={styles.option}>
                  <IconTile name={o.icon} />
                  <div>
                    <p className={styles.optionLabel}>{o.label}</p>
                    {o.href ? (
                      <a href={o.href} className={styles.optionValue}>
                        {o.value}
                      </a>
                    ) : (
                      <p className={styles.optionValue}>{o.value}</p>
                    )}
                    {o.note && <p className={styles.optionNote}>{o.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
