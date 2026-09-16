'use client';

/**
 * A drift of gold motes behind the hero.
 *
 * Deliberately not WebGL. Eighteen absolutely-positioned spans on a single CSS
 * transform cost nothing to start, never hold a GPU context open, and are
 * switched off wholesale by the prefers-reduced-motion block in globals.css.
 * A Three.js particle field would do the same job for ~600KB of JavaScript and
 * a measurable battery cost on exactly the mid-range phones most guests will
 * open this on.
 *
 * Positions come from a seeded generator rather than Math.random so the server
 * and the client agree, which a random field would not.
 */
const COUNT = 18;

// Deterministic: same sequence every render, on both sides of hydration.
function seeded(i, salt) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const MOTES = Array.from({ length: COUNT }, (_, i) => ({
  left: `${(seeded(i, 1) * 100).toFixed(2)}%`,
  size: 2 + seeded(i, 2) * 3.4,
  duration: `${(13 + seeded(i, 3) * 12).toFixed(1)}s`,
  delay: `${(seeded(i, 4) * -22).toFixed(1)}s`,
  drift: `${(seeded(i, 5) * 70 - 35).toFixed(0)}px`,
}));

export function GoldMotes({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {MOTES.map((mote, i) => (
        <span
          key={i}
          className="animate-mote absolute bottom-0 rounded-full bg-gold-bright"
          style={{
            left: mote.left,
            width: mote.size,
            height: mote.size,
            '--mote-dur': mote.duration,
            '--mote-delay': mote.delay,
            '--mote-x': mote.drift,
            filter: 'blur(0.4px)',
          }}
        />
      ))}
    </div>
  );
}
