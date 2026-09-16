/**
 * Engraved motifs for the Nikkah timeline, in the manner of the sample's
 * illustrations: gold line art, a consistent 1.2 stroke, faint washes rather
 * than solid fills, and every motif seated on the same leafy base so seven
 * different drawings still read as one set.
 *
 * Drawn as vectors rather than sourced as images because they inherit the gold
 * token, stay crisp on any display, and cost about 1KB each instead of 60.
 */

/** The shared base. Two leafy arcs sweeping up from a centre point. */
function Wreath() {
  const leaf = (x, y, rotate, len) => (
    <path
      key={`${x}-${y}-${rotate}`}
      transform={`translate(${x} ${y}) rotate(${rotate})`}
      d={`M0 0 C ${len * 0.32} ${-len * 0.4}, ${len * 0.76} ${-len * 0.44}, ${len} 0 C ${len * 0.76} ${len * 0.44}, ${len * 0.32} ${len * 0.4}, 0 0 Z`}
      fill="currentColor"
      fillOpacity="0.14"
      strokeWidth="0.7"
      strokeOpacity="0.6"
    />
  );

  return (
    <g>
      <path d="M60 110 C 44 108, 30 101, 20 90" strokeWidth="0.9" strokeOpacity="0.55" />
      <path d="M60 110 C 76 108, 90 101, 100 90" strokeWidth="0.9" strokeOpacity="0.55" />
      {leaf(48, 108, -160, 13)}
      {leaf(36, 103, -150, 12)}
      {leaf(26, 96, -140, 10)}
      {leaf(72, 108, -20, 13)}
      {leaf(84, 103, -30, 12)}
      {leaf(94, 96, -40, 10)}
      <circle cx="60" cy="110" r="2.4" fill="currentColor" fillOpacity="0.7" strokeWidth="0" />
    </g>
  );
}

const MOTIFS = {
  /** Guest arrival: a cusped doorway standing open. */
  arrival: (
    <g>
      <path d="M34 96 V54 C34 38, 45 26, 60 22 C75 26, 86 38, 86 54 V96" strokeWidth="1.3" />
      <path d="M42 96 V56 C42 44, 50 35, 60 32 C70 35, 78 44, 78 56 V96" strokeWidth="0.8" strokeOpacity="0.55" />
      <path d="M60 32 V96" strokeWidth="0.7" strokeOpacity="0.4" />
      <circle cx="60" cy="19" r="3" fill="currentColor" fillOpacity="0.5" strokeWidth="0" />
    </g>
  ),

  /** Qur'an recitation: an open mushaf resting on a rehal. */
  quran: (
    <g>
      <path d="M60 46 C50 38, 36 36, 26 38 V76 C36 74, 50 76, 60 84" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
      <path d="M60 46 C70 38, 84 36, 94 38 V76 C84 74, 70 76, 60 84" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
      <path d="M60 46 V84" strokeWidth="0.9" strokeOpacity="0.6" />
      {[52, 60, 68].map((y) => (
        <g key={y} strokeWidth="0.55" strokeOpacity="0.4">
          <path d={`M33 ${y} H 53`} />
          <path d={`M67 ${y} H 87`} />
        </g>
      ))}
      {/* Rehal: two crossed supports. */}
      <path d="M40 86 L 78 100 M 80 86 L 42 100" strokeWidth="1.1" strokeOpacity="0.75" />
    </g>
  ),

  /** Khutbah: the minbar, three steps under a small dome. */
  khutbah: (
    <g>
      <path d="M40 98 V70 L 56 70 V58 L 72 58 V44" strokeWidth="1.3" />
      <path d="M40 98 H 86 V44" strokeWidth="1.3" />
      <path d="M56 70 H 86 M 72 58 H 86" strokeWidth="0.7" strokeOpacity="0.45" />
      <path d="M72 44 C72 34, 78 28, 86 28 C 94 28, 100 34, 100 44 Z" strokeWidth="0" fill="currentColor" fillOpacity="0.1" />
      <path d="M72 44 C72 33, 78 26, 86 26 C 94 26, 100 33, 100 44" strokeWidth="1.1" />
      <path d="M86 26 V 18" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="86" cy="15" r="2.6" fill="currentColor" fillOpacity="0.55" strokeWidth="0" />
    </g>
  ),

  /** The Nikkah itself: two interlocking bands. */
  nikkah: (
    <g>
      <circle cx="49" cy="62" r="20" strokeWidth="1.4" />
      <circle cx="49" cy="62" r="15.5" strokeWidth="0.6" strokeOpacity="0.45" />
      <circle cx="73" cy="62" r="20" strokeWidth="1.4" />
      <circle cx="73" cy="62" r="15.5" strokeWidth="0.6" strokeOpacity="0.45" />
      {/* Solitaire on the near band. */}
      <path d="M73 38 L 77 43 L 73 48 L 69 43 Z" fill="currentColor" fillOpacity="0.45" strokeWidth="0.9" />
    </g>
  ),

  /** Du'a: two cupped hands, with light rising from them. */
  dua: (
    <g>
      <path d="M30 92 C 30 74, 38 60, 52 54 C 56 52, 60 54, 60 58 V 88" strokeWidth="1.3" fill="currentColor" fillOpacity="0.07" />
      <path d="M90 92 C 90 74, 82 60, 68 54 C 64 52, 60 54, 60 58" strokeWidth="1.3" fill="currentColor" fillOpacity="0.07" />
      <path d="M30 92 C 44 100, 76 100, 90 92" strokeWidth="1.1" />
      <g strokeWidth="0.8" strokeOpacity="0.5">
        <path d="M60 44 V 30" />
        <path d="M46 48 L 39 36" />
        <path d="M74 48 L 81 36" />
      </g>
      <circle cx="60" cy="24" r="3" fill="currentColor" fillOpacity="0.5" strokeWidth="0" />
    </g>
  ),

  /** Family photographs. */
  photographs: (
    <g>
      <path d="M24 46 H 44 L 50 36 H 70 L 76 46 H 96 V 92 H 24 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.06" />
      <circle cx="60" cy="68" r="16" strokeWidth="1.2" />
      <circle cx="60" cy="68" r="10" strokeWidth="0.7" strokeOpacity="0.5" />
      <circle cx="86" cy="55" r="2.4" fill="currentColor" fillOpacity="0.55" strokeWidth="0" />
    </g>
  ),

  /** Transition and refreshments. */
  refreshments: (
    <g>
      <path d="M32 58 H 74 V 76 C 74 86, 66 92, 53 92 C 40 92, 32 86, 32 76 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.07" />
      <path d="M74 64 C 88 64, 92 70, 92 75 C 92 81, 86 85, 76 85" strokeWidth="1.2" />
      <path d="M28 96 H 80" strokeWidth="1.1" strokeOpacity="0.7" />
      {/* Steam. */}
      <g strokeWidth="0.85" strokeOpacity="0.45">
        <path d="M46 50 C 42 44, 50 40, 46 32" />
        <path d="M60 50 C 56 44, 64 40, 60 32" />
      </g>
    </g>
  ),
};

export const MOTIF_NAMES = Object.keys(MOTIFS);

export function EventMotif({ name, className = '' }) {
  const motif = MOTIFS[name];
  // An unknown key must not blow up a section; it just leaves the slot empty.
  if (!motif) return null;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {motif}
      <Wreath />
    </svg>
  );
}
