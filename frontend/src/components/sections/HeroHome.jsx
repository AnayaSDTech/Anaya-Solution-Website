import { Link } from 'react-router';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { RichText } from '@/components/ui/Primitives';
import SignalField from '@/components/media/SignalField';
import NeuralNet from '@/components/media/NeuralNet';
import { technologies } from '@/lib/taxonomy';
import { withBase } from '@/lib/base';
import styles from './HeroHome.module.css';

/**
 * Home hero. `video` ({ src, poster?, type? }) adds an optional looping,
 * muted background video; it is hidden for visitors who prefer reduced motion.
 */
export default function HeroHome({ eyebrow, title, lead, primaryCta, secondaryCta, video }) {
  return (
    <section className={styles.hero} data-tone="ink" aria-labelledby="home-hero-title">
      {video?.src && (
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={video.poster ? withBase(video.poster) : undefined}
          aria-hidden="true"
        >
          <source src={withBase(video.src)} type={video.type ?? 'video/mp4'} />
        </video>
      )}
      <div className={styles.field}>
        <SignalField />
      </div>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} enter`}>
            <span className={styles.liveDot} aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 id="home-hero-title" className={`${styles.title} enter`} style={{ '--enter-delay': '80ms' }}>
            <RichText value={title} />
          </h1>
          <p className={`${styles.lead} enter`} style={{ '--enter-delay': '160ms' }}>
            {lead}
          </p>
          <div className={`${styles.ctas} enter`} style={{ '--enter-delay': '240ms' }}>
            <Button to={primaryCta.to} size="lg" iconRight="ArrowRight" fullWidthOnMobile>
              {primaryCta.label}
            </Button>
            <Button to={secondaryCta.to} size="lg" variant="secondary" fullWidthOnMobile>
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className={`${styles.net} enter`} style={{ '--enter-delay': '300ms' }}>
          <NeuralNet />
        </div>

        <ul role="list" className={`${styles.chips} enter`} style={{ '--enter-delay': '360ms' }} aria-label="Technology areas">
          {technologies.map((t) => (
            <li key={t.slug}>
              <Link to={`/technology#${t.slug}`} className={styles.chip}>
                <Icon name={t.icon} size={16} />
                {t.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
