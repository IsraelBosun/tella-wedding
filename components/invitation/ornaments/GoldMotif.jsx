import Image from 'next/image';

/**
 * The gold line-art headpieces, used once above a block so each part of the day
 * is announced by its own emblem rather than by type alone.
 */
const MOTIFS = {
  nikkah: { src: '/invitation/motifs/nikkah-arch.png', w: 1254, h: 1254 },
  celebration: { src: '/invitation/motifs/champagne.png', w: 1254, h: 1254 },
  bride: { src: '/invitation/motifs/bride.png', w: 1254, h: 1254 },
  dining: { src: '/invitation/motifs/cloche.png', w: 1254, h: 1254 },
  music: { src: '/invitation/motifs/drums.png', w: 1254, h: 1254 },
  // Two neutral florals, for the points in the ceremony that have no emblem of
  // their own. They are the same artwork family, so they do not read as gaps.
  bloom: { src: '/invitation/ornaments/peony.png', w: 1254, h: 1254 },
  bouquet: { src: '/invitation/ornaments/floral-bouquet.png', w: 483, h: 639 },
};

/**
 * Which emblem each point of the Nikkah carries. Two of them share the prayer
 * arch, because two of them are prayer.
 */
export const SCHEDULE_MOTIFS = {
  arrival: 'celebration',
  quran: 'nikkah',
  khutbah: 'bouquet',
  nikkah: 'bride',
  dua: 'nikkah',
  photographs: 'bloom',
  refreshments: 'dining',
};

export function GoldMotif({ name, className = '' }) {
  const motif = MOTIFS[name];
  if (!motif) return null;

  return (
    <Image
      src={motif.src}
      alt=""
      aria-hidden="true"
      width={motif.w}
      height={motif.h}
      draggable={false}
      className={`h-auto max-w-full select-none ${className}`}
    />
  );
}
