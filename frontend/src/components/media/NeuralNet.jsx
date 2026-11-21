import { useEffect, useRef } from 'react';
import { cx } from '@/lib/utils';
import styles from './NeuralNet.module.css';

const BLUE = [79, 125, 255];
const TEAL = [34, 211, 182];
const VIOLET = [140, 110, 255];

/**
 * Brand visual: a layered neural network with signals firing from input to
 * output, like a model running inference. Decorative (aria-hidden).
 * Pauses off-screen and on hidden tabs; draws one still frame when the
 * visitor prefers reduced motion.
 * @param {{ layers?: number[], className?: string }} props
 */
export default function NeuralNet({ layers: layerSpec, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let layers = [];
    let edges = [];
    let pulses = [];
    let frame = 0;
    let running = false;
    let visible = true;
    let t = 0;

    let s = 11;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
    const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    function build() {
      s = 11;
      const spec = layerSpec ?? (width < 560 ? [4, 6, 6, 3] : [5, 8, 9, 7, 3]);
      const padX = Math.max(24, width * 0.07);
      const padY = Math.max(20, height * 0.1);
      layers = spec.map((count, li) => {
        const x = padX + (li * (width - padX * 2)) / (spec.length - 1);
        const span = (height - padY * 2) * (0.55 + 0.45 * (count / Math.max(...spec)));
        return Array.from({ length: count }, (_, ni) => ({
          x,
          y: height / 2 - span / 2 + (count === 1 ? span / 2 : (ni * span) / (count - 1)),
          layer: li,
          act: 0,
          phase: rand() * Math.PI * 2,
          color: mix(BLUE, TEAL, li / (spec.length - 1)),
        }));
      });
      edges = [];
      for (let li = 0; li < layers.length - 1; li++) {
        for (const a of layers[li]) for (const b of layers[li + 1]) edges.push({ a, b, heat: 0 });
      }
      pulses = [];
    }

    const pos = (n) => ({ x: n.x, y: n.y + Math.sin(t * 0.012 + n.phase) * 3 });

    function fire(from) {
      const next = layers[from.layer + 1];
      if (!next) return;
      const fan = 1 + Math.floor(rand() * 2);
      for (let k = 0; k < fan; k++) {
        const to = next[Math.floor(rand() * next.length)];
        const edge = edges.find((e) => e.a === from && e.b === to);
        pulses.push({ edge, p: 0, speed: 0.012 + rand() * 0.014 });
      }
    }

    function seedInput() {
      const input = layers[0];
      fire(input[Math.floor(rand() * input.length)]);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Core glow
      const g = ctx.createRadialGradient(width * 0.55, height / 2, 0, width * 0.55, height / 2, Math.max(width, height) * 0.55);
      g.addColorStop(0, `rgba(79,125,255,${0.1 + 0.04 * Math.sin(t * 0.02)})`);
      g.addColorStop(1, 'rgba(79,125,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Edges
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = pos(e.a);
        const b = pos(e.b);
        ctx.strokeStyle = rgba(e.a.color, 0.09 + e.heat * 0.4);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Pulses travelling along edges
      for (const pl of pulses) {
        const a = pos(pl.edge.a);
        const b = pos(pl.edge.b);
        const x = a.x + (b.x - a.x) * pl.p;
        const y = a.y + (b.y - a.y) * pl.p;
        const tail = Math.max(0, pl.p - 0.25);
        const tx = a.x + (b.x - a.x) * tail;
        const ty = a.y + (b.y - a.y) * tail;
        const c = mix(pl.edge.a.color, pl.edge.b.color, pl.p);
        const lg = ctx.createLinearGradient(tx, ty, x, y);
        lg.addColorStop(0, rgba(c, 0));
        lg.addColorStop(1, rgba(c, 0.9));
        ctx.strokeStyle = lg;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = rgba(c, 0.25);
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba([235, 245, 255], 0.95);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes
      const last = layers.length - 1;
      for (const layer of layers) {
        for (const n of layer) {
          const { x, y } = pos(n);
          const r = n.layer === last ? 6 : 4;
          if (n.act > 0.02) {
            ctx.fillStyle = rgba(n.layer === last ? TEAL : n.color, n.act * 0.28);
            ctx.beginPath();
            ctx.arc(x, y, r + 10 * n.act, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#0a0f1c';
          ctx.strokeStyle = rgba(n.layer === last ? VIOLET : n.color, 0.55 + n.act * 0.45);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = rgba(n.color, 0.35 + n.act * 0.65);
          ctx.beginPath();
          ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function update() {
      t += 1;
      if (t % 18 === 0 || pulses.length < 4) seedInput();
      for (const pl of pulses) {
        pl.p += pl.speed;
        pl.edge.heat = Math.min(1, pl.edge.heat + 0.05);
      }
      const arrived = pulses.filter((pl) => pl.p >= 1);
      pulses = pulses.filter((pl) => pl.p < 1);
      for (const pl of arrived) {
        pl.edge.b.act = 1;
        if (pulses.length < 48) fire(pl.edge.b);
      }
      for (const e of edges) e.heat *= 0.96;
      for (const l of layers) for (const n of l) n.act *= 0.95;
    }

    function step() {
      update();
      draw();
      frame = requestAnimationFrame(step);
    }

    function stillFrame() {
      for (let i = 0; i < 6; i++) seedInput();
      for (const pl of pulses) pl.p = 0.3 + rand() * 0.6;
      layers.forEach((l) => l.forEach((n) => (n.act = rand() > 0.7 ? 0.8 : 0)));
      draw();
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduceMotion) return stillFrame();
      // Pre-warm so the network is already busy on first paint
      for (let i = 0; i < 240; i++) update();
      draw();
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
  }, [layerSpec]);

  return <canvas ref={canvasRef} className={cx(styles.canvas, className)} aria-hidden="true" />;
}
