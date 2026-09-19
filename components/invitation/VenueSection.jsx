'use client';

import Image from 'next/image';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';

/**
 * The map is held to a square with a small radius rather than stretched across
 * the column. Letting a map run full width is what makes an invitation suddenly
 * look like a listings page.
 *
 * The embed is the keyless `output=embed` form, so there is no API key in the
 * bundle to leak or expire, and Directions opens the visitor's own map app.
 */
/*
  The photograph and the map are framed identically so the pair reads as two
  plates on one page. It is a mount, not a thick border: a hairline gold rule,
  a narrow cream margin inside it, then a second hairline against the artwork.
  Two 1px lines with air between them read as a frame at any size, where a
  single heavy border would just look like a box.
*/
const FRAME =
  'w-full max-w-[380px] rounded-[4px] border border-blue-deep/45 bg-shell/55 p-2 shadow-[0_24px_60px_-42px_rgba(39,69,94,0.8)]';

const MAT = 'relative w-full overflow-hidden rounded-[2px] border border-blue-deep/25';

export function VenueSection({ venue }) {
  return (
    <SectionReveal>
      <section
        id="location"
        className="mx-auto w-full max-w-[560px] px-7 py-24 text-center sm:py-28"
      >
        <SectionHeading eyebrow={venue.eyebrow} heading={venue.name} />

        <p className="mt-8 font-serif text-[20px] leading-relaxed font-medium text-ink sm:text-[21px]">
          {venue.address}
        </p>

        <p className="mx-auto mt-5 max-w-[42ch] font-serif text-[19px] leading-[1.8] font-medium text-ink">
          {venue.note}
        </p>

        {/*
          The place itself, above the map. A guest recognises the pavilion on
          arrival from this; the map only tells them how to get there.
        */}
        {venue.image && (
          <figure className={`mx-auto mt-11 ${FRAME}`}>
            <div className={`${MAT} aspect-4/3`}>
              <Image
                src={venue.image}
                alt={venue.imageAlt ?? venue.name}
                fill
                sizes="(max-width: 640px) 100vw, 380px"
                className="object-cover"
              />
              {/* Keeps the photo in the invitation's warm register. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-paper/12 mix-blend-multiply"
              />
            </div>
          </figure>
        )}

        <div className={`mx-auto mt-6 ${FRAME}`}>
          <div className={`${MAT} aspect-square`}>
            <iframe
              src={venue.mapUrl}
              title={`Map showing ${venue.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-full w-full"
            />
          </div>
        </div>

        <a
          href={venue.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-blue-deep/45 bg-shell/60 px-9 py-4 font-caps text-[0.71rem] tracking-[0.22em] text-blue-ink uppercase transition-colors hover:border-blue-deep hover:bg-shell"
        >
          Get Directions
          <span aria-hidden="true" className="text-[0.85em]">
            &rarr;
          </span>
        </a>
      </section>
    </SectionReveal>
  );
}
