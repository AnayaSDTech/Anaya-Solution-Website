import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import { FactList, FeatureGrid, FeatureList, Split, Statement } from '@/components/sections/Blocks';
import { Eyebrow } from '@/components/ui/Primitives';
import Reveal from '@/components/motion/Reveal';
import AbstractVisual from '@/components/media/AbstractVisual';
import CtaBand from '@/components/sections/CtaBand';
import { about } from '@/content/pages';
import { site, isSupplied } from '@/content/site';
import { buildMeta, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo';
import styles from './about.module.css';

export function meta() {
  return buildMeta({
    title: 'About',
    description: 'ANAYA Solutions is an AI product company building smart, scalable and secure products for the financial and social domains.',
    path: '/about',
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd([
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
      ]),
    ],
  });
}

export default function About() {
  const facts = [
    { label: 'Trading name of', value: site.legalName },
    { label: 'Company number', value: site.companyNumber },
    { label: 'Location', value: site.location },
    { label: 'Registered in', value: isSupplied(site.registeredIn) ? site.registeredIn : null },
  ];
  return (
    <>
      <PageHero {...about.hero} visual={<AbstractVisual variant="signal" />} />

      <Section labelledBy="who-title">
        <Split
          aside={
            <SectionHeader eyebrow={about.whoWeAre.eyebrow} title={about.whoWeAre.title} id="who-title" />
          }
        >
          <Reveal className={styles.body}>
            {about.whoWeAre.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </Split>
      </Section>

      <Section alt background="glow">
        <Eyebrow>{about.purpose.eyebrow}</Eyebrow>
        <Statement text={about.purpose.statement} />
      </Section>

      <Section labelledBy="values-title">
        <SectionHeader eyebrow={about.values.eyebrow} title={about.values.title} id="values-title" />
        <FeatureGrid items={about.values.items} columns={4} />
      </Section>

      <Section tone="paper" labelledBy="foundation-title">
        <Split
          aside={
            <SectionHeader eyebrow={about.foundation.eyebrow} title={about.foundation.title} id="foundation-title" />
          }
        >
          <FeatureList items={about.foundation.items} />
        </Split>
      </Section>

      <Section alt labelledBy="facts-title">
        <SectionHeader eyebrow="Company" title="Company details" id="facts-title" />
        <FactList items={facts} />
      </Section>

      <CtaBand {...about.cta} secondaryCta={{ label: 'See careers', to: '/careers' }} />
    </>
  );
}
