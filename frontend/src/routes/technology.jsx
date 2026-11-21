import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import AbstractVisual from '@/components/media/AbstractVisual';
import { TechAreaIndex, TechAreaSection } from '@/components/technology/TechArea';
import { CapabilityMatrix } from '@/components/sections/Blocks';
import CtaBand from '@/components/sections/CtaBand';
import { technologyPage, engineeringFoundations } from '@/content/technology';
import { technologies } from '@/lib/taxonomy';
import { getProductsByTechnology } from '@/lib/products';
import { useActiveSection } from '@/hooks';
import { buildMeta, breadcrumbJsonLd } from '@/lib/seo';
import styles from './technology.module.css';

export function meta() {
  return buildMeta({
    title: 'Technology',
    description:
      'The technology behind ANAYA products: AI and machine learning, cybersecurity, public key infrastructure, social sentiment intelligence and financial intelligence.',
    path: '/technology',
    jsonLd: breadcrumbJsonLd([
      { label: 'Home', to: '/' },
      { label: 'Technology', to: '/technology' },
    ]),
  });
}

export default function Technology() {
  const active = useActiveSection(technologies.map((t) => t.slug));
  return (
    <>
      <PageHero {...technologyPage.hero} visual={<AbstractVisual variant="orbit" />} />

      <Section>
        <div className={styles.layout}>
          <aside className={styles.aside}>
            <TechAreaIndex activeId={active} />
          </aside>
          <div>
            {technologies.map((area, i) => (
              <TechAreaSection key={area.slug} area={area} index={i} products={getProductsByTechnology(area.slug)} />
            ))}
          </div>
        </div>
      </Section>

      <Section alt labelledBy="foundations-title">
        <SectionHeader
          eyebrow="Engineering foundations"
          title="Tools and platforms we work with"
          lead="The engineering capabilities that support how we build, run and integrate our products."
          id="foundations-title"
        />
        <CapabilityMatrix groups={engineeringFoundations} />
      </Section>

      <CtaBand {...technologyPage.cta} />
    </>
  );
}
