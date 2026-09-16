/**
 * The multifoil (cusped) arch from the sample, generated rather than drawn.
 *
 * A multifoil arch is a plain pointed arch with a run of lobes cut into its
 * underside, so that is how it is built here: sample a pointed-arch profile at
 * N points, then join consecutive samples with a circular arc that bulges into
 * the opening. Each join leaves a cusp, which is the detail that reads as
 * carved stone rather than as a rounded rectangle.
 *
 * Generating it means the lobe count and the arch proportions are two numbers,
 * not a 40-command path string nobody can safely edit.
 */

const W = 400;
const H = 620;
const CX = W / 2;

// Springing line: where the vertical jambs stop and the arch begins.
const Y_SPRING = 300;
const Y_APEX = 26;
const X_JAMB = 16;

const LOBES = 6;

/** Quadratic profile of the left shoulder, from the jamb up to the apex. */
function profilePoint(t) {
  // Control point pulled high and hard left, which is what gives the shoulder
  // its lift instead of letting it sag into a semicircle.
  const p0 = { x: X_JAMB, y: Y_SPRING };
  const p1 = { x: X_JAMB + 6, y: Y_APEX + 88 };
  const p2 = { x: CX, y: Y_APEX };

  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

/**
 * Both shoulders as one continuous path.
 *
 * Sweep is 0 for the whole run. Going up the left shoulder the opening lies to
 * the right of travel, and coming back down the mirrored right shoulder it lies
 * to the left, so a single sweep flag bulges every lobe inward on both sides.
 */
function buildArch(inset = 0) {
  const pts = [];
  for (let i = 0; i <= LOBES; i += 1) {
    const p = profilePoint(i / LOBES);
    pts.push({ x: p.x + inset, y: p.y + inset * 0.6 });
  }

  const d = [`M ${pts[0].x.toFixed(2)} ${H}`, `L ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`];

  const arcTo = (from, to) => {
    const chord = Math.hypot(to.x - from.x, to.y - from.y);
    // Slightly over a semicircle's radius, so lobes read as full and round.
    const r = (chord / 2) * 1.04;
    d.push(`A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 0 ${to.x.toFixed(2)} ${to.y.toFixed(2)}`);
  };

  for (let i = 1; i < pts.length; i += 1) arcTo(pts[i - 1], pts[i]);

  // Mirror back down the right shoulder.
  const mirrored = pts.map((p) => ({ x: W - p.x, y: p.y })).reverse();
  for (let i = 1; i < mirrored.length; i += 1) arcTo(mirrored[i - 1], mirrored[i]);

  d.push(`L ${mirrored[mirrored.length - 1].x.toFixed(2)} ${H}`);
  return d.join(' ');
}

// Built once at module scope: the geometry never depends on props.
const OUTER = buildArch(0);
const MIDDLE = buildArch(13);
const INNER = buildArch(25);

export function CuspedArch({ className = '', relief = true }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`${relief ? 'relief' : ''} ${className}`}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/*
        Three concentric courses at different weights. A single stroke reads as
        an outline; three at 1.6 / 0.9 / 0.55 read as a moulding with depth,
        which is the whole difference from what was there before.
      */}
      <path d={OUTER} stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.85" />
      <path d={MIDDLE} stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.5" />
      <path d={INNER} stroke="currentColor" strokeWidth="0.55" strokeOpacity="0.3" />
    </svg>
  );
}
