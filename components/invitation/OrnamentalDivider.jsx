import Image from 'next/image';

/**
 * Hairline rule with a centre motif, from the reference's own artwork.
 *
 * Three weights, so a divider inside a card does not carry the same ornament as
 * one separating two sections.
 */
const SIZES = {
  sm: { src: '/invitation/ornaments/divider-thin.png', w: 408, h: 55, width: 'w-32' },
  md: { src: '/invitation/ornaments/divider-fleur.png', w: 389, h: 67, width: 'w-44' },
  lg: { src: '/invitation/ornaments/divider-plain.png', w: 396, h: 62, width: 'w-60' },
};

export function OrnamentalDivider({ size = 'md', className = '' }) {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <Image
      src={s.src}
      alt=""
      aria-hidden="true"
      width={s.w}
      height={s.h}
      draggable={false}
      className={`mx-auto h-auto max-w-full select-none ${s.width} ${className}`}
    />
  );
}
