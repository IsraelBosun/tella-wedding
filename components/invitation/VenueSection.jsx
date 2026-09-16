'use client';

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
export function VenueSection({ venue }) {
  return (
    <SectionReveal>
      <section
        id="location"
        className="mx-auto w-full max-w-[560px] px-7 py-24 text-center sm:py-28"
      >
        <SectionHeading eyebrow={venue.eyebrow} heading={venue.name} />

        <p className="mt-8 font-serif text-[18px] leading-relaxed font-medium text-ink sm:text-[19px]">
          {venue.address}
        </p>

        <p className="mx-auto mt-5 max-w-[42ch] font-serif text-[17px] leading-[1.8] font-medium text-ink">
          {venue.note}
        </p>

        <div className="mx-auto mt-11 w-full max-w-[380px]">
          <div className="relative aspect-square w-full overflow-hidden rounded-[3px] border border-gold/30 shadow-[0_24px_60px_-42px_rgba(125,99,50,0.8)]">
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
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold/45 bg-cream/60 px-9 py-4 font-caps text-[0.6rem] tracking-[0.22em] text-gold-deep uppercase transition-colors hover:border-gold hover:bg-cream"
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
