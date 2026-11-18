import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import { FeatureGrid, ProcessSteps } from '@/components/sections/Blocks';
import AbstractVisual from '@/components/media/AbstractVisual';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import { careers } from '@/content/pages';
import { roles } from '@/content/roles';
import { site } from '@/content/site';
import { buildMeta, breadcrumbJsonLd } from '@/lib/seo';
import styles from './careers.module.css';

export function meta() {
  return buildMeta({
    title: 'Careers',
    description: 'Join ANAYA Solutions and build AI products for the financial and social domains. Learn about our values and hiring process.',
    path: '/careers',
    jsonLd: breadcrumbJsonLd([
      { label: 'Home', to: '/' },
      { label: 'Careers', to: '/careers' },
    ]),
  });
}

const careersMailto = `mailto:${site.email}?subject=${encodeURIComponent('Careers enquiry')}`;

export default function Careers() {
  return (
    <>
      <PageHero {...careers.hero} visual={<AbstractVisual variant="signal" />} />

      <Section labelledBy="why-title">
        <SectionHeader eyebrow={careers.whyJoin.eyebrow} title={careers.whyJoin.title} id="why-title" />
        <FeatureGrid items={careers.whyJoin.items} columns={4} />
      </Section>

      <Section alt labelledBy="values-title">
        <SectionHeader eyebrow={careers.values.eyebrow} title={careers.values.title} id="values-title" />
        <FeatureGrid items={careers.values.items} columns={4} />
      </Section>

      <Section labelledBy="process-title" background="grid">
        <SectionHeader eyebrow={careers.process.eyebrow} title={careers.process.title} id="process-title" />
        <ProcessSteps steps={careers.process.steps} />
      </Section>

      <Section alt labelledBy="roles-title">
        <SectionHeader eyebrow={careers.roles.eyebrow} title={careers.roles.title} id="roles-title" />
        {roles.length > 0 ? (
          <ul role="list" className={styles.roles}>
            {roles.map((r) => (
              <li key={r.slug} className={styles.role}>
                <div>
                  <h3 className={styles.roleTitle}>{r.title}</h3>
                  <p className={styles.roleMeta}>
                    {[r.location, r.type].filter(Boolean).join(' · ')}
                  </p>
                  {r.summary && <p>{r.summary}</p>}
                </div>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${r.title}`)}`} className={styles.apply}>
                  Apply <Icon name="ArrowRight" size={16} />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className={styles.empty}>
            <span className={styles.emptyIcon}>
              <Icon name="Briefcase" size={24} />
            </span>
            <p>
              {careers.roles.empty} <a href={careersMailto}>{site.email}</a>.
            </p>
          </Reveal>
        )}
      </Section>

      <CtaBand {...careers.cta} primaryCta={{ label: 'Get in touch', to: '/contact' }} />
    </>
  );
}
