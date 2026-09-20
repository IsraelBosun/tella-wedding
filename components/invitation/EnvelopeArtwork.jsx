/**
 * The opening cover: the back of a closed ivory envelope, sealed with wax.
 *
 * The reference serves a 2MB raster for this. Drawing it instead means the
 * monogram comes from the data rather than from baked-in pixels (the original
 * art carries another couple's initials), it stays crisp on a 3x phone screen
 * for a few KB, and nothing is loaded from someone else's CDN at runtime.
 *
 * Geometry and colour were measured off the reference art, which is why the
 * viewBox is its exact pixel size: every constant below is a coordinate read
 * from that file, so the two can be compared side by side without conversion.
 *
 * Everything is tone-on-tone. The ornaments are the same cream as the paper and
 * are visible only because of the relief. Gold appears once, in the monogram.
 */

const W = 941;
const H = 1672;

/* The paper's own edge, inside which the flaps sit. */
const INSET = 24;

/* The flaps. Both apexes fall inside the seal, the top one above the bottom
   one, because the top flap is folded last and therefore lies on top. */
const CX = 470;
const TOP_APEX = 720;
const TOP_EDGE = 51;
const BOTTOM_APEX = 820;
const BOTTOM_EDGE = 1470;

const SEAL_X = 480;
const SEAL_Y = 870;
const SEAL_R = 171;

/* -------------------------------------------------------------------------- */
/* Curve sampling                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Point and tangent on a cubic Bezier.
 *
 * Leaves are placed along sampled stems rather than by hand: a spray needs
 * eighty of them to read as botanical rather than as a logo, and eighty
 * hand-tuned transforms is not a thing anyone should maintain.
 */
function cubicAt(p, t) {
  const u = 1 - t;
  const x =
    u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
  const y =
    u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];

  const dx =
    3 * u * u * (p[1][0] - p[0][0]) +
    6 * u * t * (p[2][0] - p[1][0]) +
    3 * t * t * (p[3][0] - p[2][0]);
  const dy =
    3 * u * u * (p[1][1] - p[0][1]) +
    6 * u * t * (p[2][1] - p[1][1]) +
    3 * t * t * (p[3][1] - p[2][1]);

  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

function cubicPath(p) {
  return `M${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]}`;
}

/* -------------------------------------------------------------------------- */
/* Motifs                                                                      */
/* -------------------------------------------------------------------------- */

/*
  Nothing below sets its own fill or stroke. The whole ornament tree is drawn
  twice by the caller, once offset in a shadow tone and once in a lit tone, and
  inheritance is what lets a single definition serve both passes.

  Drawing it twice rather than running one bevel filter over the group is the
  only way the internal edges survive: a filter works on the merged silhouette,
  so every petal inside a flower would vanish into one blob.
*/

/** A small ovate leaf lying along +x, with a midrib. */
function Leaf({ length }) {
  const w = length * 0.42;
  return (
    <>
      <path
        d={
          `M0 0 C ${length * 0.2} ${-w}, ${length * 0.64} ${-w * 0.94}, ${length} 0` +
          ` C ${length * 0.64} ${w * 0.94}, ${length * 0.2} ${w}, 0 0 Z`
        }
      />
      <path d={`M${length * 0.1} 0 L ${length * 0.82} 0`} fill="none" strokeWidth="1.4" />
    </>
  );
}

/** Teardrop bud, for the tip of a stem. */
function Bud({ length }) {
  const w = length * 0.46;
  return (
    <path
      d={
        `M0 0 C ${length * 0.24} ${-w}, ${length * 0.72} ${-w * 0.72}, ${length} 0` +
        ` C ${length * 0.72} ${w * 0.72}, ${length * 0.24} ${w}, 0 0 Z`
      }
    />
  );
}

/** Five broad rounded petals around a seeded centre. */
function Blossom({ r }) {
  const w = r * 0.58;
  const petal =
    `M0 0 C ${-w} ${-r * 0.3}, ${-w * 1.04} ${-r * 0.84}, 0 ${-r}` +
    ` C ${w * 1.04} ${-r * 0.84}, ${w} ${-r * 0.3}, 0 0 Z`;

  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={petal} transform={`rotate(${i * 72 + 18})`} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={`s${i}`}
          r={r * 0.09}
          transform={`rotate(${i * 60}) translate(0 ${-r * 0.17})`}
        />
      ))}
    </g>
  );
}

/**
 * The garden peony that anchors each spray: rings of broad cupped petals, each
 * turned off the ring below so no two petals stack, closing on a seeded centre.
 */
function Peony({ r }) {
  const rings = [
    { count: 9, scale: 1, rotate: 0 },
    { count: 8, scale: 0.75, rotate: 22 },
    { count: 7, scale: 0.54, rotate: 47 },
    { count: 6, scale: 0.35, rotate: 71 },
  ];

  const petal = (len) => {
    const w = len * 0.6;
    return (
      `M0 0 C ${-w} ${-len * 0.26}, ${-w * 1.06} ${-len * 0.82}, 0 ${-len}` +
      ` C ${w * 1.06} ${-len * 0.82}, ${w} ${-len * 0.26}, 0 0 Z`
    );
  };

  return (
    <g>
      {rings.map((ring, ri) => (
        <g key={ri}>
          {Array.from({ length: ring.count }, (_, i) => (
            <path
              key={i}
              d={petal(r * ring.scale)}
              transform={`rotate(${ring.rotate + (i * 360) / ring.count})`}
            />
          ))}
        </g>
      ))}

      {/* Seeded centre: two rings of stamens, each bead relieved in its own right. */}
      {Array.from({ length: 13 }, (_, i) => (
        <circle
          key={`o${i}`}
          r={r * 0.045}
          transform={`rotate(${i * 27.7}) translate(0 ${-r * 0.155})`}
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <circle
          key={`i${i}`}
          r={r * 0.042}
          transform={`rotate(${i * 51.4 + 22}) translate(0 ${-r * 0.07})`}
        />
      ))}
    </g>
  );
}

/**
 * A stem with leaves marching along it, each turned to the local tangent and
 * shrinking toward the tip, finishing in a cluster of buds.
 */
function LeafyStem({
  points,
  count = 7,
  size = 40,
  taper = 0.45,
  spread = 34,
  from = 0.12,
  to = 1,
  stroke = 3.4,
  buds = true,
}) {
  const items = Array.from({ length: count }, (_, i) => {
    const t = from + ((to - from) * i) / Math.max(1, count - 1);
    const { x, y, angle } = cubicAt(points, t);
    const side = i % 2 ? 1 : -1;
    return { x, y, angle: angle + side * spread, length: size * (1 - taper * t) };
  });

  const tip = cubicAt(points, 1);

  return (
    <g>
      <path d={cubicPath(points)} fill="none" strokeWidth={stroke} strokeLinecap="round" />

      {items.map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle})`}>
          <Leaf length={leaf.length} />
        </g>
      ))}

      {buds && (
        <g transform={`translate(${tip.x} ${tip.y}) rotate(${tip.angle})`}>
          <g transform="rotate(-30)">
            <Bud length={size * 0.42} />
          </g>
          <g transform="rotate(26)">
            <Bud length={size * 0.38} />
          </g>
          <g transform={`translate(${size * 0.3} 0)`}>
            <Bud length={size * 0.32} />
          </g>
        </g>
      )}
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Sprays                                                                      */
/* -------------------------------------------------------------------------- */

/*
  Half a spray, drawn to the right of the peony and mirrored for the left. Three
  arms sweep out and up, two stems fall away below the flower. Fewer arms than
  feels right on paper: any more and the mirroring reads as a starburst rather
  than as a cut bunch.
*/
const SPRAY_ARMS = [
  { points: [[26, -14], [132, -56], [242, -90], [340, -132]], count: 9, size: 46, spread: 28 },
  { points: [[30, 8], [126, -2], [226, -24], [306, -54]], count: 8, size: 40, spread: 36 },
  { points: [[28, 32], [108, 52], [190, 60], [262, 52]], count: 7, size: 36, spread: 30 },
  { points: [[12, -38], [50, -92], [86, -132], [110, -166]], count: 5, size: 34, spread: 28 },
  { points: [[8, 34], [34, 104], [52, 176], [58, 248]], count: 7, size: 40, spread: 26 },
  { points: [[20, 30], [76, 96], [120, 156], [148, 212]], count: 6, size: 34, spread: 30 },
];

const SPRAY_BLOSSOMS = [
  { x: 105, y: 42, r: 33 },
  { x: 168, y: -4, r: 27 },
  { x: 192, y: 58, r: 21 },
  { x: 244, y: 14, r: 16 },
  { x: 70, y: -66, r: 19 },
  { x: 150, y: -80, r: 14 },
  { x: 62, y: 128, r: 15 },
];

function SprayArm() {
  return (
    <g>
      {SPRAY_ARMS.map((arm, i) => (
        <LeafyStem key={i} {...arm} />
      ))}
      {SPRAY_BLOSSOMS.map((b, i) => (
        <g key={`b${i}`} transform={`translate(${b.x} ${b.y})`}>
          <Blossom r={b.r} />
        </g>
      ))}
    </g>
  );
}

/** A symmetrical spray: a peony flanked by two mirrored arms. */
function FloralSpray() {
  return (
    <g>
      <SprayArm />
      <g transform="scale(-1 1)">
        <SprayArm />
      </g>
      <Peony r={74} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Side vine                                                                   */
/* -------------------------------------------------------------------------- */

/*
  The vine that runs down each side flap: one long stem with branches arcing off
  it, a peony near the top third and blossoms down its length. Local origin is
  the top of the stem; it runs roughly 940 units down.
*/
const VINE_STEM = [[0, 0], [46, 250], [-14, 520], [34, 760]];
const VINE_STEM_LOWER = [[34, 760], [56, 830], [40, 890], [18, 946]];

const VINE_BRANCHES = [
  { points: [[16, 78], [62, 42], [108, 24], [146, 12]], count: 6, size: 32, spread: 28 },
  { points: [[22, 140], [-18, 116], [-56, 98], [-90, 88]], count: 6, size: 30, spread: 32 },
  { points: [[32, 210], [80, 194], [122, 186], [156, 186]], count: 6, size: 33, spread: 26 },
  { points: [[30, 290], [-10, 282], [-48, 280], [-82, 286]], count: 5, size: 29, spread: 32 },
  { points: [[20, 362], [68, 362], [114, 370], [152, 388]], count: 6, size: 34, spread: 26 },
  { points: [[8, 444], [-32, 450], [-68, 464], [-98, 486]], count: 5, size: 30, spread: 32 },
  { points: [[6, 524], [52, 534], [96, 552], [132, 580]], count: 6, size: 33, spread: 26 },
  { points: [[8, 608], [-30, 624], [-62, 648], [-88, 678]], count: 5, size: 29, spread: 32 },
  { points: [[16, 694], [60, 712], [100, 740], [132, 774]], count: 6, size: 31, spread: 26 },
  { points: [[24, 778], [-12, 802], [-42, 834], [-64, 870]], count: 5, size: 27, spread: 32 },
];

const VINE_BLOSSOMS = [
  { x: 124, y: 100, r: 28 },
  { x: -70, y: 216, r: 23 },
  { x: 138, y: 318, r: 22 },
  { x: -58, y: 414, r: 20 },
  { x: 100, y: 518, r: 27 },
  { x: -72, y: 600, r: 19 },
  { x: 92, y: 710, r: 21 },
  { x: -50, y: 840, r: 18 },
];

function Vine() {
  return (
    <g>
      <path d={cubicPath(VINE_STEM)} fill="none" strokeWidth="4" strokeLinecap="round" />
      <path d={cubicPath(VINE_STEM_LOWER)} fill="none" strokeWidth="3.2" strokeLinecap="round" />

      {VINE_BRANCHES.map((branch, i) => (
        <LeafyStem key={i} {...branch} taper={0.4} stroke={2.8} />
      ))}

      {VINE_BLOSSOMS.map((b, i) => (
        <g key={`b${i}`} transform={`translate(${b.x} ${b.y})`}>
          <Blossom r={b.r} />
        </g>
      ))}

      {/* The one full flower on the vine, a quarter of the way down. */}
      <g transform="translate(152 244)">
        <Peony r={36} />
      </g>
    </g>
  );
}

/** Every ornament on the envelope, in one tree, so both passes stay in step. */
function Ornaments() {
  return (
    <>
      <g transform={`translate(${CX + 2} 278)`}>
        <FloralSpray />
      </g>
      <g transform={`translate(${CX + 2} ${H - 278}) scale(1 -1)`}>
        <FloralSpray />
      </g>
      <g transform="translate(100 348)">
        <Vine />
      </g>
      <g transform={`translate(${W - 100} 348) scale(-1 1)`}>
        <Vine />
      </g>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Wax seal                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Wax pressed with a stamp keeps a scalloped rim where it spread. Sampling a
 * cosine around the circle is deterministic, so server and client produce the
 * identical path and hydration stays quiet.
 */
function scallopPath(cx, cy, radius, lobes, depth) {
  const steps = lobes * 20;
  const points = [];

  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const r = radius + Math.cos(angle * lobes) * depth;
    points.push(
      `${(cx + Math.cos(angle) * r).toFixed(2)} ${(cy + Math.sin(angle) * r).toFixed(2)}`,
    );
  }

  return `M${points.join(' L')} Z`;
}

const SEAL_PATH = scallopPath(SEAL_X, SEAL_Y, SEAL_R - 10, 11, 10);

/* Flap outlines. */
const TOP_FLAP = `M${INSET} ${TOP_EDGE} H${W - INSET} L${CX} ${TOP_APEX} Z`;
const BOTTOM_FLAP =
  `M${INSET} ${BOTTOM_EDGE} L${CX} ${BOTTOM_APEX} L${W - INSET} ${BOTTOM_EDGE}` +
  ` V${H - INSET} H${INSET} Z`;

/* -------------------------------------------------------------------------- */

export function EnvelopeArtwork({ monogram = '' }) {
  /* The reference sets its monogram tight, with no spaces around the ampersand,
     which is also the only way three glyphs fill a seal this size. */
  const mark = monogram.replace(/\s+/g, '');
  /* Sized for the engraved caps face, which is far wider per glyph than a
     script: the mark has to clear the inner ring at r = SEAL_R - 66. */
  const markSize = Math.min(78, 230 / Math.max(3, mark.length));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full max-w-full drop-shadow-[0_30px_64px_rgba(122,35,53,0.34)]"
      role="img"
      aria-label={monogram ? `A sealed envelope, monogrammed ${monogram}` : 'A sealed envelope'}
    >
      <defs>
        <linearGradient id="env-paper" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#F0E7D9" />
          <stop offset="44%" stopColor="#E6DACA" />
          <stop offset="100%" stopColor="#D5C5AE" />
        </linearGradient>

        {/* Each flap catches the light at its own angle. Without this the
            creases read as lines drawn on flat paper rather than as folds. */}
        <linearGradient id="env-flap-top" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#F5EDE1" />
          <stop offset="55%" stopColor="#EADFD0" />
          <stop offset="100%" stopColor="#DCCDB8" />
        </linearGradient>
        <linearGradient id="env-flap-bottom" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#EBE0D0" />
          <stop offset="100%" stopColor="#D8C8B1" />
        </linearGradient>

        <radialGradient id="env-sheen" cx="0.44" cy="0.28" r="0.62">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#FFFDF7" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="seal-rim" cx="0.34" cy="0.26" r="0.86">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="38%" stopColor="#F7EFE1" />
          <stop offset="72%" stopColor="#E7D8C1" />
          <stop offset="100%" stopColor="#D4BEA0" />
        </radialGradient>
        <radialGradient id="seal-face" cx="0.42" cy="0.36" r="0.78">
          <stop offset="0%" stopColor="#F4EBDC" />
          <stop offset="100%" stopColor="#E2D2BA" />
        </radialGradient>

        {/* Measured off the reference monogram: #6F4E21 in shadow, #C9A166 lit. */}
        <linearGradient id="seal-gold" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#5A3D12" />
          <stop offset="26%" stopColor="#906C2C" />
          <stop offset="48%" stopColor="#C69A55" />
          <stop offset="70%" stopColor="#8A6729" />
          <stop offset="100%" stopColor="#4E3510" />
        </linearGradient>

        {/* Softens the offset copy that stands in for every shape's cast shadow. */}
        <filter id="ornament-shadow" x="-6%" y="-6%" width="112%" height="112%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>

        {/* A flap is a sheet lying on another sheet, so it casts, not bevels. */}
        <filter id="env-flap-lift" x="-6%" y="-6%" width="112%" height="112%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#8E7248" floodOpacity="0.5" />
        </filter>

        {/* Deeper relief for the seal: more wax, and a cast shadow under it. */}
        <filter id="seal-lift" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="2" dy="13" stdDeviation="11" floodColor="#7E6339" floodOpacity="0.46" />
        </filter>

        <filter id="gold-emboss" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#4A3009" floodOpacity="0.6" />
        </filter>

        <filter id="env-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <clipPath id="env-clip">
          <rect x="0" y="0" width={W} height={H} rx="10" />
        </clipPath>
      </defs>

      <g clipPath="url(#env-clip)">
        <rect x="0" y="0" width={W} height={H} fill="url(#env-paper)" />

        {/* The paper's own edge, just inside the trim. */}
        <rect
          x={INSET}
          y={INSET}
          width={W - INSET * 2}
          height={H - INSET * 2}
          rx="4"
          fill="none"
          stroke="#FFFCF4"
          strokeOpacity="0.6"
          strokeWidth="2.5"
        />

        {/* Bottom flap first, then the top flap over it, as they are folded. */}
        <g filter="url(#env-flap-lift)">
          <path
            d={BOTTOM_FLAP}
            fill="url(#env-flap-bottom)"
            stroke="#FFFCF4"
            strokeOpacity="0.72"
            strokeWidth="2.6"
          />
        </g>
        <g filter="url(#env-flap-lift)">
          <path
            d={TOP_FLAP}
            fill="url(#env-flap-top)"
            stroke="#FFFCF4"
            strokeOpacity="0.8"
            strokeWidth="2.6"
          />
        </g>

        <rect x="0" y="0" width={W} height={H} fill="url(#env-sheen)" />

        {/*
          Two passes over the same tree. The first is the shadow every shape
          casts into the paper, pushed down-right and blurred; the second is the
          shape itself, rimmed in white where the light catches its edge. One
          light source, upper left.
        */}
        <g
          transform="translate(3.5 4.5)"
          fill="#C2AA85"
          stroke="#C2AA85"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.8"
          filter="url(#ornament-shadow)"
        >
          <Ornaments />
        </g>
        <g
          fill="#EDE2D2"
          stroke="#FFFDF7"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <Ornaments />
        </g>

        {/* Grain last, so the fibre sits over the impression the way it does on
            real stock rather than under it. */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          filter="url(#env-grain)"
          opacity="0.08"
          style={{ mixBlendMode: 'multiply' }}
        />

        <rect
          x="1"
          y="1"
          width={W - 2}
          height={H - 2}
          rx="9"
          fill="none"
          stroke="#BFA57F"
          strokeOpacity="0.8"
          strokeWidth="2"
        />
      </g>

      {/* The seal sits outside the clip so its cast shadow is not cut at the edge. */}
      <g filter="url(#seal-lift)">
        <path d={SEAL_PATH} fill="url(#seal-rim)" />

        {/* Specular along the top-left of the rim, where wax goes glassy. */}
        <path
          d={`M${SEAL_X - SEAL_R * 0.76} ${SEAL_Y - SEAL_R * 0.44} A ${SEAL_R * 0.88} ${SEAL_R * 0.88} 0 0 1 ${SEAL_X + SEAL_R * 0.1} ${SEAL_Y - SEAL_R * 0.86}`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.72"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* The recessed face, with its shadow under the rim at the top. */}
        <circle cx={SEAL_X} cy={SEAL_Y} r={SEAL_R - 44} fill="url(#seal-face)" />
        <circle
          cx={SEAL_X}
          cy={SEAL_Y - 2}
          r={SEAL_R - 45}
          fill="none"
          stroke="#B9A07A"
          strokeOpacity="0.5"
          strokeWidth="6"
          strokeDasharray={`${(SEAL_R - 45) * 3.1} ${(SEAL_R - 45) * 9}`}
          transform={`rotate(196 ${SEAL_X} ${SEAL_Y})`}
        />

        {/* Engraved ring on the face. */}
        <circle
          cx={SEAL_X}
          cy={SEAL_Y}
          r={SEAL_R - 66}
          fill="none"
          stroke="#C0A783"
          strokeOpacity="0.75"
          strokeWidth="3"
        />
        <circle
          cx={SEAL_X}
          cy={SEAL_Y + 2.5}
          r={SEAL_R - 66}
          fill="none"
          stroke="#FFFDF7"
          strokeOpacity="0.85"
          strokeWidth="2.4"
        />
      </g>

      {mark && (
        <text
          /* Nudged right by half the tracking, which is added after the last
             letter too and would otherwise sit the mark left of the seal. */
          x={SEAL_X + markSize * 0.05}
          y={SEAL_Y + markSize * 0.35}
          textAnchor="middle"
          fill="url(#seal-gold)"
          filter="url(#gold-emboss)"
          style={{
            fontFamily: 'var(--font-caps)',
            fontSize: `${markSize}px`,
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}
        >
          {mark}
        </text>
      )}
    </svg>
  );
}
