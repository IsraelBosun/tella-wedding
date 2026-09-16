'use client';

import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { BotanicalSprig } from './BotanicalSprig';

/**
 * Two houses, given identical weight.
 *
 * They stack on a phone and sit side by side from `sm` up, joined by a sprig
 * rather than a divider, because the point of the section is the joining. The
 * bride's house is authored as two lines, so it is accepted as an array.
 */
function Family({ side, house, place, note }) {
  const lines = Array.isArray(house) ? house : [house];

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <p className="eyebrow text-[0.55rem] text-gold-deep">{side}</p>

      <h3 className="script-heading foil mt-4 text-[30px] leading-[1.25] sm:text-[34px]">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p className="mt-4 font-caps text-[0.55rem] tracking-[0.2em] text-gold-soft uppercase">
        {place}
      </p>

      {note && (
        <p className="mt-5 max-w-[34ch] font-serif text-[17px] leading-[1.8] font-medium text-ink">
          {note}
        </p>
      )}
    </div>
  );
}

export function FamiliesSection({ families }) {
  return (
    <SectionReveal>
      <section
        id="families"
        className="mx-auto w-full max-w-[720px] px-7 py-24 sm:py-28"
      >
        <SectionHeading eyebrow={families.eyebrow} heading={families.heading} />

        <div className="mt-14 flex flex-col items-stretch gap-12 sm:flex-row sm:gap-8">
          <Family {...families.groom} />

          <div
            aria-hidden="true"
            className="flex items-center justify-center sm:w-px"
          >
            {/* Horizontal sprig when stacked, a hairline when side by side. */}
            <BotanicalSprig className="w-28 text-gold/60 sm:hidden" />
            <span className="hidden h-full w-px bg-gold/18 sm:block" />
          </div>

          <Family {...families.bride} />
        </div>
      </section>
    </SectionReveal>
  );
}
