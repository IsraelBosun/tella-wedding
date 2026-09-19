import Image from 'next/image';

/**
 * One image slot that is designed for both states.
 *
 * With a src it is a plain full-bleed image inside a hairline frame. Without
 * one it is not a grey box: it is an engraved card with a double rule, a gold
 * monogram medallion and the caption it will eventually carry. That way the
 * page can be sent to guests before the photographer has delivered anything.
 */
export function PhotoFrame({
  src = null,
  alt = '',
  caption = null,
  monogram = 'A & S',
  ratio = 'aspect-3/4',
  sizes = '(max-width: 640px) 92vw, 440px',
  className = '',
  priority = false,
}) {
  return (
    <figure className={`w-full ${className}`}>
      <div
        className={`relative ${ratio} w-full overflow-hidden rounded-[2px] bg-mist shadow-[0_26px_60px_-38px_rgba(39,69,94,0.75)]`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={alt || 'Photograph to follow'}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-mist px-8 text-center"
          >
            {/* Double engraved rule, as on the cover artwork. */}
            <span className="pointer-events-none absolute inset-3 border border-blue-deep/25" />
            <span className="pointer-events-none absolute inset-[18px] border border-blue-deep/12" />

            <span className="relative flex size-20 items-center justify-center rounded-full border border-blue-deep/30 bg-paper/60">
              <span className="monogram stamp text-[21px]">{monogram}</span>
            </span>

            <span className="eyebrow relative text-[0.59rem] text-blue-mid">
              Photograph to follow
            </span>
          </div>
        )}

        {/* Warm inner edge, so the image sits in the paper instead of on it. */}
        <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(53,89,122,0.28)]" />
      </div>

      {caption && (
        <figcaption className="mt-4 text-center font-serif text-[17px] leading-relaxed font-medium text-blue-mid italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
