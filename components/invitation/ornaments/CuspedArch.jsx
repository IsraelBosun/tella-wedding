import Image from 'next/image';

/**
 * The carved multifoil arch, from the reference's own artwork.
 *
 * It is a backdrop, so it is fitted rather than stretched: `object-contain`
 * keeps the carving square whatever box the caller gives it. `relief` is kept
 * for the existing call sites and adds the soft cast shadow that the flat file
 * does not carry.
 */
const SRC = '/invitation/ornaments/arch.png';
const W = 1077;
const H = 1734;

export function CuspedArch({ className = '', relief = true }) {
  return (
    <Image
      src={SRC}
      alt=""
      aria-hidden="true"
      width={W}
      height={H}
      priority
      draggable={false}
      className={`select-none object-contain object-bottom ${relief ? 'drop-shadow-[0_18px_34px_rgba(39,69,94,0.16)]' : ''} ${className}`}
    />
  );
}
