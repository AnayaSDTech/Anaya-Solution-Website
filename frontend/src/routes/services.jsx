import { Navigate } from 'react-router';
import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import { FeatureGrid } from '@/components/sections/Blocks';
import { IconTile } from '@/components/ui/Primitives';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/motion/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import { servicesPage, services } from '@/content/services';
import { site } from '@/content/site';
import { buildMeta } from '@/lib/seo';
import styles from './services.module.css';

export function meta() {
  return buildMeta({
    title: 'Services',
    description: 'Engineering and advisory services from ANAYA Solutions: AI and data strategy, custom software development, and cloud and DevOps.',
    path: '/services',
    noindex: !site.features.servicesPage,
  });
}

export default function Services() {
  // Decision D2: the Services page is only published when confirmed.
  if (!site.features.servicesPage) return <Navigate to="/products" replace />;
  return (
    <>
      <PageHero {...servicesPage.hero} size="compact" />
      <Section>
        <ul role="list" className={styles.list}>
          {services.map((s) => (
            <Reveal as="li" key={s.slug} className={styles.service}>
              <div className={styles.head}>
                <IconTile name={s.icon} />
                <h2 className={styles.title}>{s.title}</h2>
              </div>
              <div className={styles.cols}>
                <div>
                  <h3 className={styles.sub}>What we deliver</h3>
                  <ul className={styles.deliver}>
                    {s.deliver.map((d) => (
                      <li key={d}>
                        <Icon name="Check" size={16} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={styles.sub}>Ideal for</h3>
                  <p>{s.idealFor}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
      <Section alt labelledBy="approach-title">
        <SectionHeader eyebrow="How we deliver" title="Proven methods" id="approach-title" />
        <FeatureGrid items={servicesPage.approach} />
      </Section>
      <CtaBand {...servicesPage.cta} />
    </>
  );
}
