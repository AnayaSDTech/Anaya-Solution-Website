import { useId } from 'react';
import { cx } from '@/lib/utils';
import styles from './AbstractVisual.module.css';

/**
 * Code-drawn brand visuals used where no product imagery exists yet.
 * Variants: finance | sentiment | key | radar | signal
 */
export default function AbstractVisual({ variant = 'signal', className }) {
  const id = useId().replace(/:/g, '');
  const g = `av-grad-${id}`;
  const content = {
    finance: <Finance g={g} />,
    sentiment: <Sentiment g={g} />,
    key: <Key g={g} />,
    radar: <RadarVisual g={g} />,
    signal: <Signal g={g} />,
  }[variant] ?? <Signal g={g} />;

  return (
    <div className={cx(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 480 360" className={styles.svg} fill="none">
        <defs>
          <linearGradient id={g} x1="0" y1="360" x2="480" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4F7DFF" />
            <stop offset="1" stopColor="#22D3B6" />
          </linearGradient>
        </defs>
        <GridLines />
        {content}
      </svg>
    </div>
  );
}

function GridLines() {
  const lines = [];
  for (let x = 40; x < 480; x += 40) lines.push(<line key={`x${x}`} x1={x} y1="0" x2={x} y2="360" />);
  for (let y = 40; y < 360; y += 40) lines.push(<line key={`y${y}`} x1="0" y1={y} x2="480" y2={y} />);
  return <g className={styles.grid}>{lines}</g>;
}

function Finance({ g }) {
  const bars = [70, 110, 90, 150, 130, 185, 160, 210];
  return (
    <g>
      {bars.map((h, i) => (
        <rect key={i} x={60 + i * 46} y={300 - h} width="22" height={h} rx="4" className={styles.bar} style={{ animationDelay: `${i * 90}ms` }} />
      ))}
      <path
        d="M50 250 C110 230 130 200 170 205 S240 150 280 160 S350 100 380 110 S430 70 450 60"
        stroke={`url(#${g})`}
        strokeWidth="3"
        strokeLinecap="round"
        className={styles.draw}
      />
      <circle cx="380" cy="110" r="7" fill="#22D3B6" className={styles.pulse} />
      <circle cx="380" cy="110" r="16" stroke="#22D3B6" strokeOpacity=".4" />
      <rect x="300" y="40" width="140" height="44" rx="10" className={styles.chip} />
      <rect x="316" y="56" width="60" height="6" rx="3" fill="#8B95AD" fillOpacity=".6" />
      <rect x="316" y="68" width="96" height="6" rx="3" fill={`url(#${g})`} />
    </g>
  );
}

function Sentiment({ g }) {
  const wave = 'M30 200 C70 120 110 280 150 190 S230 110 270 180 S350 260 390 170 S440 130 460 150';
  return (
    <g>
      <path d={wave} stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" className={styles.draw} />
      <path d={wave} stroke="#B36BFF" strokeOpacity=".35" strokeWidth="2" transform="translate(0 28)" />
      {[
        [80, 90, 34],
        [210, 70, 26],
        [340, 96, 30],
        [140, 290, 22],
        [300, 290, 28],
      ].map(([x, y, r], i) => (
        <g key={i} className={styles.float} style={{ animationDelay: `${i * 400}ms` }}>
          <rect x={x - r} y={y - r * 0.6} width={r * 2} height={r * 1.2} rx={r * 0.6} className={styles.chip} />
          <circle cx={x - r * 0.45} cy={y} r="4" fill={i % 2 ? '#22D3B6' : '#4F7DFF'} />
          <rect x={x - r * 0.2} y={y - 3} width={r * 0.9} height="6" rx="3" fill="#8B95AD" fillOpacity=".5" />
        </g>
      ))}
    </g>
  );
}

function Key({ g }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 120} ${70 + i * 40})`}>
          <rect width="110" height="70" rx="12" className={styles.chip} />
          <circle cx="26" cy="35" r="10" stroke={`url(#${g})`} strokeWidth="2.5" />
          <rect x="46" y="26" width="46" height="6" rx="3" fill="#8B95AD" fillOpacity=".55" />
          <rect x="46" y="40" width="30" height="6" rx="3" fill={`url(#${g})`} />
        </g>
      ))}
      <path d="M180 140 L190 140 M300 180 L310 180" stroke={`url(#${g})`} strokeWidth="2" strokeDasharray="4 6" />
      <g transform="translate(250 220)" className={styles.float}>
        <circle cx="40" cy="40" r="34" stroke={`url(#${g})`} strokeWidth="5" />
        <circle cx="40" cy="40" r="12" fill="#22D3B6" />
        <path d="M74 40 H180 M150 40 V64 M170 40 V58" stroke={`url(#${g})`} strokeWidth="5" strokeLinecap="round" />
      </g>
    </g>
  );
}

function RadarVisual({ g }) {
  return (
    <g transform="translate(240 180)">
      {[40, 80, 120, 160].map((r) => (
        <circle key={r} r={r} stroke="#4F7DFF" strokeOpacity=".25" />
      ))}
      <line x1="-170" y1="0" x2="170" y2="0" stroke="#4F7DFF" strokeOpacity=".2" />
      <line x1="0" y1="-170" x2="0" y2="170" stroke="#4F7DFF" strokeOpacity=".2" />
      <g className={styles.sweep}>
        <path d="M0 0 L160 0 A160 160 0 0 0 113 -113 Z" fill={`url(#${g})`} fillOpacity=".22" />
        <line x1="0" y1="0" x2="160" y2="0" stroke="#22D3B6" strokeWidth="2" />
      </g>
      {[
        [60, -70, '#22D3B6'],
        [-90, 40, '#4F7DFF'],
        [110, 60, '#F2A93B'],
        [-40, -120, '#4F7DFF'],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill={c} className={styles.pulse} style={{ animationDelay: `${i * 500}ms` }} />
          <circle cx={x} cy={y} r="12" stroke={c} strokeOpacity=".4" />
        </g>
      ))}
    </g>
  );
}

function Signal({ g }) {
  const nodes = [
    [80, 260], [150, 120], [240, 200], [330, 90], [400, 230], [240, 60], [160, 300], [360, 310],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 3], [2, 6], [2, 4], [4, 7], [0, 6]];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={`url(#${g})`} strokeOpacity=".55" strokeWidth="1.5" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 9 : 5} fill={i === 2 ? '#22D3B6' : `url(#${g})`} className={i === 2 ? styles.pulse : undefined} />
      ))}
    </g>
  );
}
