/**
 * Corner spray, as in the sample's lower corners.
 *
 * A stylised peony (nested petal arcs rather than drawn petals, which is how
 * engravers suggest a bloom without rendering one) with a fan of leaves and two
 * buds. Drawn for the bottom-left corner; `flip` mirrors it for the right.
 */
const PETALS = [
  { r: 15.5, from: 200, to: 520 },
  { r: 11.5, from: 235, to: 545 },
  { r: 7.5, from: 265, to: 575 },
];

const LEAVES = [
  { x: 44, y: 66, rotate: -46, length: 30 },
  { x: 50, y: 74, rotate: -12, length: 34 },
  { x: 40, y: 78, rotate: 24, length: 26 },
  { x: 24, y: 62, rotate: -84, length: 24 },
  { x: 62, y: 84, rotate: 6, length: 22 },
];

/** Polar helper, so the petal arcs are described in degrees rather than points. */
function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return `${(cx + r * Math.cos(rad)).toFixed(2)} ${(cy + r * Math.sin(rad)).toFixed(2)}`;
}

function petalPath(cx, cy, r, from, to) {
  const large = to - from > 180 ? 1 : 0;
  return `M ${polar(cx, cy, r, from)} A ${r} ${r} 0 ${large} 1 ${polar(cx, cy, r, to)}`;
}

function Leaf({ x, y, rotate, length }) {
  const w = length * 0.42;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d={`M0 0 C ${length * 0.3} ${-w}, ${length * 0.75} ${-w * 0.9}, ${length} 0 C ${length * 0.75} ${w * 0.9}, ${length * 0.3} ${w}, 0 0 Z`}
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.7"
      />
      {/* Midrib. Without it a leaf reads as a flat lozenge. */}
      <path
        d={`M2 0 L ${length - 3} 0`}
        stroke="currentColor"
        strokeWidth="0.55"
        strokeOpacity="0.45"
      />
    </g>
  );
}

export function FloralCorner({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <g stroke="currentColor" strokeLinecap="round">
        {LEAVES.map((leaf) => (
          <Leaf key={`${leaf.x}-${leaf.rotate}`} {...leaf} />
        ))}

        {/* Stems, drawn after the leaves so they sit over the fills. */}
        <path d="M14 112 C 26 96, 34 84, 40 70" strokeWidth="1" strokeOpacity="0.55" />
        <path d="M14 112 C 34 104, 54 96, 74 92" strokeWidth="0.8" strokeOpacity="0.4" />

        <g>
          <circle cx="40" cy="58" r="18" fill="currentColor" fillOpacity="0.1" />
          {PETALS.map((p) => (
            <path
              key={p.r}
              d={petalPath(40, 58, p.r, p.from, p.to)}
              strokeWidth="1.05"
              strokeOpacity="0.8"
            />
          ))}
          <circle cx="40" cy="58" r="2.6" fill="currentColor" fillOpacity="0.75" />
        </g>

        {/* Two buds, to break the symmetry the bloom would otherwise impose. */}
        <g strokeWidth="0.9" strokeOpacity="0.65">
          <circle cx="76" cy="90" r="5" fill="currentColor" fillOpacity="0.14" />
          <path d="M76 85 L 76 95" strokeOpacity="0.4" />
          <circle cx="22" cy="86" r="3.4" fill="currentColor" fillOpacity="0.14" />
        </g>
      </g>
    </svg>
  );
}
