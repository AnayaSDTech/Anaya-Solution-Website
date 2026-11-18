import { useEffect, useRef } from 'react';

/**
 * Scroll reveal. Content is fully visible in the pre-rendered HTML and without
 * JavaScript. After hydration, elements already on screen stay visible; elements
 * below the fold fade and rise in when 20% visible. Reduced motion is respected
 * in base.css.
 * @param {{ as?: string, delay?: number, className?: string, children: React.ReactNode }} props
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) return undefined; // already in view: no animation
    el.classList.add('is-pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { '--reveal-delay': `${Math.min(delay, 360)}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
