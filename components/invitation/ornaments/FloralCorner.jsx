import Image from 'next/image';

/**
 * Corner spray, from the reference's own artwork.
 *
 * The bloom sits at the lower left with its stems rising to the upper right, so
 * the file is used as drawn for a bottom-left corner and mirrored for the right.
 * Width comes from `className`; the height follows the intrinsic ratio.
 */
const SRC = '/invitation/ornaments/floral-corner-a.png';
const W = 976;
const H = 1068;

export function FloralCorner({ className = '', flip = false }) {
  return (
    <Image
      src={SRC}
      alt=""
      aria-hidden="true"
      width={W}
      height={H}
      draggable={false}
      className={`h-auto select-none ${flip ? '-scale-x-100' : ''} ${className}`}
    />
  );
}
