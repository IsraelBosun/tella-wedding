/**
 * A symmetrical botanical spray, drawn once and mirrored.
 *
 * The reference builds its ornaments from raster art. Vector keeps them crisp
 * at every size and lets them inherit the gold token, which matters because the
 * same motif is reused at four different scales across the page.
 */

// Leaves placed along the stem: distance from centre, vertical offset, angle,
// length. Tuned by eye so the spray thins out toward the tip.
const LEAVES = [
  { x: 18, y: -3, rotate: -28, length: 15 },
  { x: 30, y: 4, rotate: 26, length: 13 },
  { x: 40, y: -9, rotate: -34, length: 13 },
  { x: 52, y: 1, rotate: 20, length: 11 },
  { x: 60, y: -14, rotate: -40, length: 10 },
  { x: 70, y: -5, rotate: 14, length: 8 },
];

const BUDS = [
  { x: 25, y: -12, r: 1.8 },
  { x: 47, y: -17, r: 1.5 },
  { x: 64, y: -3, r: 1.3 },
  { x: 76, y: -14, r: 1.1 },
];

function Leaf({ length }) {
  // A teardrop: out along the top edge, back along the bottom.
  return (
    <path
      d={`M0 0 C ${length * 0.3} ${-length * 0.42}, ${length * 0.78} ${-length * 0.5}, ${length} 0 C ${length * 0.78} ${length * 0.5}, ${length * 0.3} ${length * 0.42}, 0 0 Z`}
    />
  );
}

function HalfSpray() {
  return (
    <g>
      <path
        d="M0 0 C 22 -2, 46 -8, 66 -18 C 76 -23, 84 -27, 92 -29"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {LEAVES.map((leaf, i) => (
        <g
          key={`leaf-${i}`}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate})`}
          fill="currentColor"
          fillOpacity="0.55"
        >
          <Leaf length={leaf.length} />
        </g>
      ))}

      {BUDS.map((bud, i) => (
        <circle
          key={`bud-${i}`}
          cx={bud.x}
          cy={bud.y}
          r={bud.r}
          fill="currentColor"
          fillOpacity="0.7"
        />
      ))}
    </g>
  );
}

export function BotanicalSprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="-100 -40 200 56"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <HalfSpray />
      {/* The left half is the same spray reflected, so the motif stays exact. */}
      <g transform="scale(-1 1)">
        <HalfSpray />
      </g>

      {/* Small centre diamond where the two sprays meet. */}
      <path
        d="M0 -7 L 3.4 0 L 0 7 L -3.4 0 Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}
