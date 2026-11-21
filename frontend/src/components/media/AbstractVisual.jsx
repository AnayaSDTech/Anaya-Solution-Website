import { useId } from 'react';
import { cx } from '@/lib/utils';
import styles from './AbstractVisual.module.css';

/**
 * Code-drawn brand visuals used where no product imagery exists yet.
 * Variants: finance | sentiment | key | radar | signal | orbit | mark | code | build
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
    orbit: <Orbit g={g} />,
    mark: <Mark g={g} />,
    code: <Code clip={`${g}-clip`} />,
    build: <Build g={g} />,
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

/** Technology: six technology areas orbiting an AI core, with data flowing along the beams. */
function Orbit({ g }) {
  const labels = ['ML', 'SEC', 'PKI', 'NLP', 'FIN', 'AI+'];
  const R = 128;
  return (
    <g transform="translate(240 180)">
      <circle r="62" stroke="#4F7DFF" strokeOpacity=".22" />
      <circle r={R} stroke="#4F7DFF" strokeOpacity=".18" strokeDasharray="2 6" />
      <circle r="164" stroke="#22D3B6" strokeOpacity=".08" />
      <g className={styles.orbit}>
        {labels.map((label, i) => {
          const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.round(Math.cos(a) * R);
          const y = Math.round(Math.sin(a) * R);
          return (
            <g key={label}>
              <line x1="0" y1="0" x2={x} y2={y} stroke={`url(#${g})`} strokeOpacity=".35" />
              <line
                x1="0"
                y1="0"
                x2={x}
                y2={y}
                stroke="#22D3B6"
                strokeWidth="2"
                strokeLinecap="round"
                className={styles.beam}
                style={{ animationDelay: `${i * 420}ms` }}
              />
              <g transform={`translate(${x} ${y})`}>
                <g className={styles.counter}>
                  <rect x="-26" y="-15" width="52" height="30" rx="9" className={styles.chip} />
                  <text textAnchor="middle" dy="4.5" className={styles.label}>
                    {label}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </g>
      <circle r="44" fill="#4F7DFF" fillOpacity=".12" className={styles.pulse} />
      <circle r="34" fill="#0a0f1c" stroke={`url(#${g})`} strokeWidth="3" />
      <text textAnchor="middle" dy="7" className={styles.core}>
        AI
      </text>
    </g>
  );
}

/** About: the ANAYA "A" mark as a living network, connected to the people around it. */
function Mark({ g }) {
  // Logo geometry (docs/brand/anaya-mark.svg) scaled ×5 into the 480×360 frame
  const apex = [240, 60];
  const left = [130, 300];
  const right = [350, 300];
  const mid = [240, 220];
  const people = [
    [60, 120], [92, 230], [64, 320], [420, 110], [400, 210], [430, 320], [180, 30], [310, 34],
  ];
  const links = [[0, apex], [0, left], [1, left], [2, left], [3, apex], [3, right], [4, right], [5, right], [6, apex], [7, apex], [1, mid], [4, mid]];
  const route = `M${left} L${apex} L${right}`;
  const bar = 'M166 220 H314';
  return (
    <g>
      {links.map(([p, to], i) => (
        <line key={i} x1={people[p][0]} y1={people[p][1]} x2={to[0]} y2={to[1]} stroke="#4F7DFF" strokeOpacity=".16" />
      ))}
      <path d={route} stroke={`url(#${g})`} strokeOpacity=".3" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d={route} stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.flow} />
      <path d={bar} stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" className={styles.flow} />
      {people.map(([x, y], i) => (
        <g key={i} className={styles.float} style={{ animationDelay: `${i * 350}ms` }}>
          <circle cx={x} cy={y} r="13" className={styles.chip} />
          <circle cx={x} cy={y - 3} r="3.5" fill="#8B95AD" />
          <path d={`M${x - 6} ${y + 7} a6 5 0 0 1 12 0`} fill="#8B95AD" />
        </g>
      ))}
      {[apex, left, right].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 14 : 10} fill={`url(#${g})`} />
      ))}
      <circle cx={mid[0]} cy={mid[1]} r="12" fill="#22D3B6" className={styles.pulse} />
      {[0, 1.6, 3.2].map((begin) => (
        <circle key={begin} r="4" fill="#EAF6FF" className={styles.traveller}>
          <animateMotion dur="4.8s" begin={`${begin}s`} repeatCount="indefinite" path={route} />
        </circle>
      ))}
    </g>
  );
}

/** Careers: an editor typing out how you'd join the team. */
function Code({ clip }) {
  const lines = [
    [['kw', 'import'], ['tx', ' { curiosity } '], ['kw', 'from'], ['st', " 'you'"], ['tx', ';']],
    [],
    [['kw', 'const'], ['tx', ' team = '], ['kw', 'new'], ['fn', ' Team'], ['tx', '('], ['st', "'ANAYA'"], ['tx', ');']],
    [['tx', 'team.'], ['fn', 'add'], ['tx', '(you);']],
    [],
    [['kw', 'await'], ['tx', ' team.'], ['fn', 'build'], ['tx', '(whatsNext);']],
    [['cm', '// impact from day one']],
  ];
  return (
    <g>
      <rect x="40" y="36" width="400" height="288" rx="16" className={styles.window} />
      <path d="M40 76 H440" stroke="#FFFFFF" strokeOpacity=".08" />
      {['#F05252', '#F2A93B', '#2FBF71'].map((c, i) => (
        <circle key={c} cx={64 + i * 18} cy="56" r="5" fill={c} fillOpacity=".7" />
      ))}
      <text x="240" y="60" textAnchor="middle" className={styles.fileName}>
        careers.js
      </text>
      <clipPath id={clip}>
        <rect x="41" y="77" width="398" height="246" rx="14" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
      {lines.map((parts, i) => {
        const y = 110 + i * 30;
        return (
          <g key={i}>
            <text x="58" y={y} className={styles.lineNo}>
              {i + 1}
            </text>
            {parts.length > 0 && (
              <>
                <text x="86" y={y} className={styles.code} xmlSpace="preserve">
                  {parts.map(([kind, s], j) => (
                    <tspan key={j} className={styles[kind]}>
                      {s}
                    </tspan>
                  ))}
                </text>
                <rect x="84" y={y - 16} width="350" height="22" className={styles.typeCover} style={{ animationDelay: `${i * 0.55}s` }} />
              </>
            )}
          </g>
        );
      })}
      </g>
      <rect x="86" y={110 + lines.length * 30 - 15} width="9" height="18" fill="#22D3B6" className={styles.cursor} />
    </g>
  );
}

/** Build with us: an idea travels through the stages and becomes a product. */
function Build({ g }) {
  const stages = ['Discover', 'Prototype', 'Build', 'Launch'];
  const route = 'M84 92 H392 Q446 92 446 140 Q446 186 392 196 H364';
  return (
    <g>
      <path d={route} stroke={`url(#${g})`} strokeOpacity=".25" strokeWidth="2" />
      <path d={route} stroke={`url(#${g})`} strokeWidth="2" strokeLinecap="round" className={styles.flow} />

      {/* Idea */}
      <g className={styles.float}>
        <circle cx="56" cy="92" r="30" className={styles.chip} />
        <circle cx="56" cy="86" r="11" stroke="#F2A93B" strokeWidth="2.5" />
        <path d="M51 100 H61 M52 105 H60" stroke="#F2A93B" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="56" cy="86" r="18" fill="#F2A93B" fillOpacity=".12" className={styles.pulse} />
      </g>

      {/* Stages */}
      {stages.map((s, i) => {
        const x = 136 + i * 80;
        return (
          <g key={s}>
            <circle cx={x} cy="92" r="9" fill="#0a0f1c" stroke={`url(#${g})`} strokeWidth="2.5" />
            <circle cx={x} cy="92" r="4" fill="#22D3B6" className={styles.stage} style={{ animationDelay: `${i * 0.6}s` }} />
            <text x={x} y="126" textAnchor="middle" className={styles.label}>
              {s}
            </text>
          </g>
        );
      })}

      {/* Product */}
      <g className={styles.float} style={{ animationDelay: '1.2s' }}>
        <rect x="96" y="168" width="268" height="156" rx="14" className={styles.window} />
        <path d="M96 196 H364" stroke="#FFFFFF" strokeOpacity=".08" />
        {['#F05252', '#F2A93B', '#2FBF71'].map((c, i) => (
          <circle key={c} cx={114 + i * 14} cy="182" r="4" fill={c} fillOpacity=".7" />
        ))}
        <rect x="116" y="214" width="92" height="44" rx="8" className={styles.chip} />
        <rect x="126" y="226" width="46" height="6" rx="3" fill="#8B95AD" fillOpacity=".55" />
        <rect x="126" y="240" width="64" height="8" rx="4" fill={`url(#${g})`} />
        <path d="M228 300 C252 280 270 290 290 262 S330 236 346 222" stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" className={styles.draw} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="116" y={272 + i * 14} width={[84, 64, 74][i]} height="6" rx="3" fill="#8B95AD" fillOpacity=".35" />
        ))}
        <circle cx="346" cy="222" r="5" fill="#22D3B6" className={styles.pulse} />
      </g>

      <circle r="5" fill="#EAF6FF" className={styles.traveller}>
        <animateMotion dur="4.2s" repeatCount="indefinite" path={route} />
      </circle>
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
