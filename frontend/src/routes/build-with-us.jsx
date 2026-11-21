import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { IconTile } from '@/components/ui/Primitives';
import AbstractVisual from '@/components/media/AbstractVisual';
import Reveal from '@/components/motion/Reveal';
import ProductCard from '@/components/product/ProductCard';
import { FeatureGrid, FeatureList, ProcessSteps, Split } from '@/components/sections/Blocks';
import CtaBand from '@/components/sections/CtaBand';
import { buildPage } from '@/content/build';
import { getPublishedProducts } from '@/lib/products';
import { buildMeta, breadcrumbJsonLd } from '@/lib/seo';
import styles from './build-with-us.module.css';

export function meta() {
  return buildMeta({
    title: 'Build with us',
    description:
      'Bring your idea to ANAYA Solutions and we will build the AI product with you: idea to MVP, full product builds, and AI features for existing products.',
    path: '/build-with-us',
    jsonLd: breadcrumbJsonLd([
      { label: 'Home', to: '/' },
      { label: 'Build with us', to: '/build-with-us' },
    ]),
  });
}

/** Smooth-scroll to a section on this page without a router navigation. */
function scrollToSection(e, id) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

export default function BuildWithUs() {
  const { hero, models, capabilities, process, proof, why, cta } = buildPage;
  const products = getPublishedProducts();
  const proofId = hero.secondaryCta.to.slice(1);

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} visual={<AbstractVisual variant="build" />}>
        <div className={styles.heroCtas}>
          <Button to={hero.primaryCta.to} size="lg" iconRight="ArrowRight" fullWidthOnMobile>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.to} size="lg" variant="secondary" fullWidthOnMobile onClick={(e) => scrollToSection(e, proofId)}>
            {hero.secondaryCta.label}
          </Button>
        </div>
      </PageHero>

      {/* Engagement models */}
      <Section labelledBy="models-title">
        <SectionHeader eyebrow={models.eyebrow} title={models.title} lead={models.lead} id="models-title" />
        <ul role="list" className={styles.models}>
          {models.items.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 80} className={styles.model}>
              <div className={styles.modelHead}>
                <IconTile name={m.icon} />
                <span className={styles.modelIndex}>0{i + 1}</span>
              </div>
              <h3 className={styles.modelTitle}>{m.title}</h3>
              <p className={styles.modelText}>{m.description}</p>
              <ul className={styles.includes}>
                {m.includes.map((x) => (
                  <li key={x}>
                    <Icon name="Check" size={16} />
                    {x}
                  </li>
                ))}
              </ul>
              <p className={styles.bestFor}>
                <span>Best for</span>
                {m.bestFor}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* What we build */}
      <Section alt background="grid" labelledBy="capabilities-title">
        <SectionHeader eyebrow={capabilities.eyebrow} title={capabilities.title} lead={capabilities.lead} id="capabilities-title" />
        <FeatureGrid items={capabilities.items} />
      </Section>

      {/* Process */}
      <Section labelledBy="process-title">
        <SectionHeader eyebrow={process.eyebrow} title={process.title} id="process-title" />
        <ProcessSteps steps={process.steps} />
      </Section>

      {/* Proof: our own products */}
      {products.length > 0 && (
        <section id={proofId} className={styles.proofAnchor}>
          <Section alt labelledBy="proof-title">
            <SectionHeader
              eyebrow={proof.eyebrow}
              title={proof.title}
              lead={proof.lead}
              id="proof-title"
              action={{ label: 'View all products', to: '/products' }}
            />
            <ul role="list" className={styles.proof}>
              {products.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 60}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </ul>
          </Section>
        </section>
      )}

      {/* Why ANAYA */}
      <Section tone="paper" labelledBy="why-title">
        <Split aside={<SectionHeader eyebrow={why.eyebrow} title={why.title} id="why-title" />}>
          <FeatureList items={why.items} numbered />
        </Split>
      </Section>

      <CtaBand
        title={cta.title}
        lead={cta.lead}
        primaryCta={hero.primaryCta}
        secondaryCta={{ label: 'Explore our products', to: '/products' }}
      />
    </>
  );
}
