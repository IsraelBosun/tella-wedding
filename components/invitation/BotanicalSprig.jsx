import Image from 'next/image';

/**
 * The small gold crest used between blocks and above section headings.
 *
 * It is symmetrical, so `flip` is kept only for call sites that pass it; the
 * mirrored artwork is identical.
 */
const SRC = '/invitation/ornaments/divider-crest-alt.png';
const W = 605;
const H = 135;

export function BotanicalSprig({ className = '', flip = false }) {
  return (
    <Image
      src={SRC}
      alt=""
      aria-hidden="true"
      width={W}
      height={H}
      draggable={false}
      className={`h-auto select-none ${flip ? '-scale-y-100' : ''} ${className}`}
    />
  );
}
