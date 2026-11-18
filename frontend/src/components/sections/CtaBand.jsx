import Button from '@/components/ui/Button';
import Reveal from '@/components/motion/Reveal';
import styles from './CtaBand.module.css';

/**
 * Closing call to action.
 * @param {{ title: string, lead?: string, primaryCta?: {label: string, to: string},
 *   secondaryCta?: {label: string, to: string} }} props
 */
export default function CtaBand({
  title,
  lead,
  primaryCta = { label: 'Talk to us', to: '/contact' },
  secondaryCta,
}) {
  return (
    <section className={styles.section} data-tone="ink" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className={styles.panel}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.content}>
            <h2 id="cta-title" className={styles.title}>
              {title}
            </h2>
            {lead && <p className={styles.lead}>{lead}</p>}
          </div>
          <div className={styles.actions}>
            <Button to={primaryCta.to} size="lg" iconRight="ArrowRight" fullWidthOnMobile>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button to={secondaryCta.to} size="lg" variant="secondary" fullWidthOnMobile>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
