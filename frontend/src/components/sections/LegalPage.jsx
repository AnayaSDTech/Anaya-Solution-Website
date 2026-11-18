import PageHero from './PageHero';
import Section from '@/components/ui/Section';
import Icon from '@/components/ui/Icon';
import { site, isSupplied } from '@/content/site';
import styles from './LegalPage.module.css';

/**
 * Legal document layout. Approved text is supplied as `sections`; until then a
 * clear "being finalised" notice is shown instead of placeholder text.
 */
export default function LegalPage({ doc, slug }) {
  const hasText = doc.sections?.length > 0;
  return (
    <>
      <PageHero
        title={doc.title}
        size="compact"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: doc.title, to: slug },
        ]}
        lead={doc.lastUpdated ? `Last updated ${doc.lastUpdated}` : undefined}
      />
      <Section tone="paper" container="narrow">
        <div className={styles.body}>
          {doc.intro && <p className={styles.intro}>{doc.intro}</p>}

          {hasText ? (
            doc.sections.map((s) => (
              <section key={s.heading} className={styles.section}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))
          ) : (
            <div className={styles.notice} role="note">
              <Icon name="FileText" size={22} />
              <p>
                Our full {doc.title.toLowerCase()} is being finalised and will be published here shortly. If you
                have any questions in the meantime, please contact us at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          )}

          {slug === '/legal/terms' && (
            <section className={styles.section} aria-labelledby="company-info">
              <h2 id="company-info">Company information</h2>
              <p>
                {site.name} is a trading name of {site.legalName}, company number {site.companyNumber}
                {isSupplied(site.registeredIn) ? `, registered in ${site.registeredIn}` : ''}.
                {isSupplied(site.registeredOffice) ? ` Registered office: ${site.registeredOffice}.` : ''}
              </p>
              <p>
                Email: <a href={`mailto:${site.email}`}>{site.email}</a> · Phone:{' '}
                <a href={site.phone.href}>{site.phone.display}</a>
              </p>
            </section>
          )}
        </div>
      </Section>
    </>
  );
}
