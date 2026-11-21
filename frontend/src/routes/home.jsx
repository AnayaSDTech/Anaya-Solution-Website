import HeroHome from '@/components/sections/HeroHome';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import ProductShowcase from '@/components/product/ProductShowcase';
import DomainSplit from '@/components/product/DomainSplit';
import ClientLogoStrip from '@/components/sections/ClientLogoStrip';
import { TechAreaGrid } from '@/components/technology/TechArea';
import { FeatureList, Split } from '@/components/sections/Blocks';
import CtaBand from '@/components/sections/CtaBand';
import Button from '@/components/ui/Button';
import { IconTile } from '@/components/ui/Primitives';
import Reveal from '@/components/motion/Reveal';
import { home } from '@/content/pages';
import { buildPage, buildTeaser } from '@/content/build';
import styles from './home.module.css';
import { clients, clientsSection } from '@/content/clients';
import { getFeaturedProducts } from '@/lib/products';
import { buildMeta, organizationJsonLd } from '@/lib/seo';
import { site } from '@/content/site';

export function meta() {
  return buildMeta({
    title: `${site.name} — ${site.tagline.replace(/\.$/, '')}`,
    rawTitle: true,
    description: site.description,
    path: '/',
    jsonLd: [
      organizationJsonLd(),
      { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url },
    ],
  });
}

export default function Home() {
  const featured = getFeaturedProducts(4);
  return (
    <>
      <HeroHome {...home.hero} />

      <Section labelledBy="home-products-title">
        <SectionHeader
          {...home.products}
          id="home-products-title"
          action={featured.length ? { label: 'View all products', to: '/products' } : undefined}
        />
        <ProductShowcase products={featured} />
      </Section>

      <ClientLogoStrip {...clientsSection} clients={clients} />

      <Section labelledBy="home-build-title" alt background="grid">
        <div className={styles.build}>
          <div>
            <SectionHeader eyebrow={buildTeaser.eyebrow} title={buildTeaser.title} lead={buildTeaser.lead} id="home-build-title" />
            <Button to={buildTeaser.cta.to} size="lg" iconRight="ArrowRight" fullWidthOnMobile>
              {buildTeaser.cta.label}
            </Button>
          </div>
          <ol role="list" className={styles.buildModels}>
            {buildPage.models.items.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 80} className={styles.buildModel}>
                <IconTile name={m.icon} />
                <div>
                  <h3 className={styles.buildModelTitle}>{m.title}</h3>
                  <p className={styles.buildModelText}>{m.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="home-domains-title" background="glow">
        <SectionHeader {...home.domains} id="home-domains-title" />
        <DomainSplit />
      </Section>

      <Section labelledBy="home-tech-title" alt background="grid">
        <SectionHeader
          {...home.technology}
          id="home-tech-title"
          action={{ label: 'See the technology', to: '/technology' }}
        />
        <TechAreaGrid />
      </Section>

      <Section tone="paper" labelledBy="home-approach-title">
        <Split
          aside={
            <SectionHeader eyebrow={home.approach.eyebrow} title={home.approach.title} lead={home.approach.lead} id="home-approach-title" />
          }
        >
          <FeatureList items={home.approach.items} numbered />
        </Split>
      </Section>

      <CtaBand
        title={home.cta.title}
        lead={home.cta.lead}
        secondaryCta={{ label: 'Explore products', to: '/products' }}
      />
    </>
  );
}
