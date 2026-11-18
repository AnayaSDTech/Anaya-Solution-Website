import { useEffect, useRef } from 'react';
import { cx } from '@/lib/utils';
import styles from './SignalField.module.css';

const BLUE = [79, 125, 255];
const TEAL = [34, 211, 182];

/**
 * Brand visual: a slowly drifting network of signal nodes on <canvas>.
 * Decorative (aria-hidden). Pauses off-screen and on hidden tabs; draws a
 * single static frame when the visitor prefers reduced motion.
 * @param {{ density?: number, className?: string }} props
 */
export default function SignalField({ density = 1, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let points = [];
    let frame = 0;
    let running = false;
    let visible = true;
    let t = 0;

    const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));

    function seed() {
      const area = width * height;
      const count = Math.max(24, Math.min(110, Math.round((area / 14000) * density)));
      // Deterministic pseudo-random so the layout is stable between resizes
      let s = 7;
      const rand = () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
      points = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        vx: (rand() - 0.5) * 0.18,
        vy: (rand() - 0.5) * 0.18,
        r: 1 + rand() * 1.6,
        phase: rand() * Math.PI * 2,
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const maxDist = Math.min(150, Math.max(90, width / 9));
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.32;
            const c = mix(BLUE, TEAL, a.x / width);
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of points) {
        const pulse = 0.55 + 0.45 * Math.sin(t * 0.02 + p.phase);
        const c = mix(BLUE, TEAL, p.x / width);
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.5 + pulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.85 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      t += 1;
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    canvas.classList.add(styles.ready);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={cx(styles.canvas, className)} aria-hidden="true" />;
}
