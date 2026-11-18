import { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import Icon from '@/components/ui/Icon';
import styles from './Accordion.module.css';

/**
 * Accessible accordion (disclosure buttons with aria-expanded / aria-controls).
 * @param {{ items: { id?: string, title: string, content: React.ReactNode }[], single?: boolean }} props
 */
export default function Accordion({ items, single = true }) {
  const baseId = useId();
  const [open, setOpen] = useState(() => new Set());
  if (!items?.length) return null;

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (!prev.has(key)) next.add(key);
      return next;
    });

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const key = item.id ?? String(i);
        const isOpen = open.has(key);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={key} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(key)}
              >
                <span>{item.title}</span>
                <Icon name={isOpen ? 'Minus' : 'Plus'} size={20} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.panel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                >
                  <div className={styles.content}>{item.content}</div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
