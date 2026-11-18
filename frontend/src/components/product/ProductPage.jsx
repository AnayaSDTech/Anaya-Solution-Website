import { Link } from 'react-router';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { Eyebrow, IconTile, StatusBadge, Tag } from '@/components/ui/Primitives';
import AbstractVisual from '@/components/media/AbstractVisual';
import Reveal from '@/components/motion/Reveal';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import { FeatureGrid, ProcessSteps } from '@/components/sections/Blocks';
import Accordion from '@/components/sections/Accordion';
import CtaBand from '@/components/sections/CtaBand';
import ProductCard from './ProductCard';
import { getDomain, getTechnology } from '@/lib/taxonomy';
import { getRenderedSections } from '@/lib/products';
import { useActiveSection } from '@/hooks';
import { site } from '@/content/site';
import { cx } from '@/lib/utils';
import styles from './ProductPage.module.css';
import { withBase } from '@/lib/base';

function ProductHero({ product }) {
  const domain = getDomain(product.domain);
  const showDemo = product.cta?.demo && site.features.demoRequests;
  const contactTo = `/contact?product=${product.slug}${showDemo ? '&type=demo' : ''}`;
  return (
    <section className={styles.hero} data-tone="ink" aria-labelledby="page-title">
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={cx('container', styles.heroInner)}>
        <div className={styles.heroContent}>
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: product.name, to: `/products/${product.slug}` },
            ]}
          />
          <div className={`${styles.heroMeta} enter`}>
            <span className={styles.heroIcon}>
              <Icon name={product.icon} size={22} />
            </span>
            {domain && <Tag color={domain.slug}>{domain.label}</Tag>}
            {product.showStatus !== false && <StatusBadge status={product.status} />}
          </div>
          <h1 id="page-title" className={`${styles.heroTitle} enter`} style={{ '--enter-delay': '60ms' }}>
            {product.name}
          </h1>
          <p className={`${styles.heroLead} enter`} style={{ '--enter-delay': '120ms' }}>
            {product.tagline}
          </p>
          <div className={`${styles.heroCtas} enter`} style={{ '--enter-delay': '180ms' }}>
            <Button to={contactTo} size="lg" iconRight="ArrowRight" fullWidthOnMobile>
              {showDemo ? 'Request a demo' : 'Talk to us'}
            </Button>
            <Button to="/products" size="lg" variant="secondary" fullWidthOnMobile>
              View all products
            </Button>
          </div>
          {product.externalUrl && (
            <a href={product.externalUrl} className={styles.external} target="_blank" rel="noopener noreferrer">
              Visit product site <Icon name="ArrowUpRight" size={16} />
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          )}
        </div>
        <div className={`${styles.heroVisual} enter`} style={{ '--enter-delay': '200ms' }}>
          {product.media?.hero ? (
            <img
              src={withBase(product.media.hero.src)}
              alt={product.media.hero.alt}
              width={product.media.hero.width}
              height={product.media.hero.height}
              fetchPriority="high"
              className={styles.heroImage}
            />
          ) : (
            <AbstractVisual variant={product.visual} />
          )}
        </div>
      </div>
    </section>
  );
}

function ProductSubnav({ sections }) {
  const active = useActiveSection(sections.map((s) => s.id));
  if (sections.length < 3) return null;
  return (
    <nav aria-label="On this page" className={styles.subnav}>
      <div className={cx('container', styles.subnavInner)}>
        <ul role="list" className={styles.subnavList}>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={cx(styles.subnavLink, active === s.id && styles.subnavActive)} aria-current={active === s.id ? 'true' : undefined}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Overview({ overview, highlights }) {
  const parts = [
    { key: 'problem', label: 'The challenge', icon: 'Target' },
    { key: 'approach', label: 'Our approach', icon: 'Lightbulb' },
    { key: 'outcome', label: 'The outcome', icon: 'TrendingUp' },
  ].filter((p) => overview[p.key]);
  return (
    <Section id="overview" labelledBy="overview-title" alt>
      <SectionHeader eyebrow="Overview" title="What it does" id="overview-title" />
      {overview.body && <p className={styles.overviewBody}>{overview.body}</p>}
      {parts.length > 0 && (
        <ol role="list" className={styles.overview}>
          {parts.map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 80} className={styles.overviewItem}>
              <div className={styles.overviewHead}>
                <IconTile name={p.icon} />
                <h3 className={styles.overviewLabel}>{p.label}</h3>
              </div>
              <p>{overview[p.key]}</p>
            </Reveal>
          ))}
        </ol>
      )}
      {highlights?.length > 0 && (
        <dl className={styles.highlights}>
          {highlights.map((h) => (
            <div key={h.label}>
              <dt>{h.label}</dt>
              <dd>{h.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Section>
  );
}

function UseCases({ items }) {
  return (
    <Section id="use-cases" labelledBy="use-cases-title" alt>
      <SectionHeader eyebrow="Use cases" title="Who it's for" id="use-cases-title" />
      <ul role="list" className={styles.useCases}>
        {items.map((u, i) => (
          <Reveal as="li" key={u.title} delay={i * 60} className={styles.useCase}>
            <p className={styles.audience}>{u.audience}</p>
            <h3 className={styles.useCaseTitle}>{u.title}</h3>
            <p className={styles.useCaseText}>{u.description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function TechFoundation({ technologies, notes = {} }) {
  return (
    <Section id="technology" labelledBy="tech-title">
      <SectionHeader eyebrow="Technology" title="Technology foundations" id="tech-title" />
      <ul role="list" className={styles.techList}>
        {technologies.map((slug, i) => {
          const t = getTechnology(slug);
          if (!t) return null;
          return (
            <Reveal as="li" key={slug} delay={i * 60} className={styles.techItem}>
              <IconTile name={t.icon} />
              <div>
                <h3 className={styles.techTitle}>
                  <Link to={`/technology#${slug}`}>{t.label}</Link>
                </h3>
                {notes[slug] && <p className={styles.techNote}>{notes[slug]}</p>}
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

function SecurityPanel({ items }) {
  return (
    <Section id="security" labelledBy="security-title" alt>
      <div className={styles.security}>
        <div>
          <Eyebrow>Security & trust</Eyebrow>
          <h2 id="security-title">Built to be trusted</h2>
        </div>
        <ul role="list" className={styles.securityList}>
          {items.map((s) => (
            <li key={s.title}>
              <Icon name="ShieldCheck" size={20} />
              <div>
                <h3 className={styles.securityTitle}>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function DeploymentPanel({ deployment }) {
  return (
    <Section id="deployment" labelledBy="deployment-title">
      <SectionHeader eyebrow="Deployment" title="Deployment & integration" id="deployment-title" />
      <div className={styles.deployment}>
        {deployment.options?.length > 0 && (
          <div>
            <h3 className={styles.deployHeading}>Deployment options</h3>
            <ul>{deployment.options.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        )}
        {deployment.integrations?.length > 0 && (
          <div>
            <h3 className={styles.deployHeading}>Integrations</h3>
            <ul>{deployment.integrations.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        )}
      </div>
      {deployment.notes && <p className={styles.deployNotes}>{deployment.notes}</p>}
    </Section>
  );
}

function Gallery({ images }) {
  return (
    <Section id="gallery" labelledBy="gallery-title" alt>
      <SectionHeader eyebrow="Gallery" title="See it in action" id="gallery-title" />
      <ul role="list" className={styles.gallery}>
        {images.map((img) => (
          <li key={img.src}>
            <figure className={styles.window}>
              <div className={styles.windowBar} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img src={withBase(img.src)} alt={img.alt} width={img.width} height={img.height} loading="lazy" />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default function ProductPage({ product, related }) {
  const sections = getRenderedSections(product);
  const has = (id) => sections.some((s) => s.id === id);
  const showDemo = product.cta?.demo && site.features.demoRequests;

  return (
    <div className={styles.page} data-domain={product.domain}>
      <ProductHero product={product} />
      <ProductSubnav sections={sections} />

      {has('overview') && <Overview overview={product.overview} highlights={product.highlights} />}

      {has('capabilities') && (
        <Section id="capabilities" labelledBy="capabilities-title">
          <SectionHeader eyebrow="Capabilities" title="Key capabilities" id="capabilities-title" />
          <FeatureGrid items={product.capabilities} />
        </Section>
      )}

      {has('how-it-works') && (
        <Section id="how-it-works" labelledBy="how-title" background="grid">
          <SectionHeader eyebrow="How it works" title={`How ${product.name} works`} id="how-title" />
          <ProcessSteps steps={product.howItWorks} />
        </Section>
      )}

      {has('use-cases') && <UseCases items={product.useCases} />}

      <TechFoundation technologies={product.technologies} notes={product.technologyNotes} />

      {has('security') && <SecurityPanel items={product.security} />}
      {has('deployment') && <DeploymentPanel deployment={product.deployment} />}
      {has('gallery') && <Gallery images={product.media.gallery} />}

      {has('faq') && (
        <Section id="faq" labelledBy="faq-title" container="narrow">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" id="faq-title" />
          <Accordion items={product.faqs.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
        </Section>
      )}

      {related.length > 0 && (
        <Section labelledBy="related-title" alt>
          <SectionHeader
            eyebrow="More products"
            title="Related products"
            id="related-title"
            action={{ label: 'View all products', to: '/products' }}
          />
          <ul role="list" className={styles.related}>
            {related.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        title={product.cta?.label ?? `Interested in ${product.name}?`}
        lead={product.cta?.note ?? 'Talk to our team about your needs and how the product could help.'}
        primaryCta={{
          label: showDemo ? 'Request a demo' : 'Talk to us',
          to: `/contact?product=${product.slug}${showDemo ? '&type=demo' : ''}`,
        }}
        secondaryCta={{ label: 'Explore all products', to: '/products' }}
      />
    </div>
  );
}
