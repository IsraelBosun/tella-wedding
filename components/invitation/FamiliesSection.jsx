'use client';

import Image from 'next/image';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { BotanicalSprig } from './BotanicalSprig';
import { OrnamentalDivider } from './OrnamentalDivider';
import { FloralCorner } from './ornaments/FloralCorner';

/**
 * Two houses, given identical weight.
 *
 * They stack on a phone and sit side by side from `sm` up, joined by a sprig
 * rather than a divider, because the point of the section is the joining. The
 * bride's house is authored as two lines, so it is accepted as an array.
 *
 * Each side takes one of the couple's two colours, the groom's blue and the
 * bride's rose, which is also how the two names are set on the arch card
 * above. Two families, two colours, one union: the palette carries the
 * section's own argument.
 */
function Family({ side, house, place, note, tone = 'blue' }) {
  const lines = Array.isArray(house) ? house : [house];
  const rose = tone === 'rose';

  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-[3px] px-6 py-9 text-center ${
        rose ? 'bg-blush' : 'bg-mist'
      }`}
    >
      <p
        className={`eyebrow text-[0.65rem] ${
          rose ? 'text-rose-ink' : 'text-blue-ink'
        }`}
      >
        {side}
      </p>

      <h3
        className={`script-heading mt-4 text-[33px] leading-[1.25] sm:text-[37px] ${
          rose ? 'stamp-rose' : 'stamp'
        }`}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p
        className={`mt-4 font-caps text-[0.65rem] tracking-[0.2em] uppercase ${
          rose ? 'text-rose-ink' : 'text-blue-mid'
        }`}
      >
        {place}
      </p>

      {note && (
        <p className="mt-5 max-w-[34ch] font-serif text-[19px] leading-[1.8] font-medium text-ink">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * The formal card: the wording set inside the carved arch, as it is printed.
 *
 * The arch is a fixed-ratio image, so everything inside it is sized in `cqw`
 * against the card's own width rather than in px. That is what keeps the
 * setting identical from a 320px phone to the 520px cap: the whole card scales
 * as one drawing instead of the frame growing while the type stays put.
 *
 * The numbers below are measured off arch.png (1077x1734) rather than guessed,
 * because the aperture is not a rectangle. Scanning the transparent hole row
 * by row gives:
 *
 *     13.2%  the dome apex, where the opening begins
 *     19%    the opening runs 34% to 66% of the width
 *     23%    28% to 72%
 *     31%    19% to 81%
 *     41%+   16.2% to 83.7%, straight sided from here down
 *
 * So the type cannot simply be centred in the image box: anything set full
 * width above 31% crosses the carving. The Bismillah sits alone in the dome at
 * 19%, sized to stay inside a 32% opening, and the block below starts at 26%,
 * where there is room for a line. That is the whole trick to keeping the
 * wording inside the arch rather than across it.
 */
function ArchCard({ invite, groom, bride, families, bismillah }) {
  /*
    The card was widened from 520px along with the rest of the type scale.
    The wording inside is all cqw, a share of the card, so growing the card
    is how that type grows: every ratio measured against the aperture still
    holds, which scaling the cqw values themselves would not have preserved.
  */
  return (
    <div className="@container relative mx-auto w-full max-w-[572px]">
      <Image
        src="/invitation/ornaments/arch.png"
        alt=""
        aria-hidden="true"
        width={1077}
        height={1734}
        draggable={false}
        className="h-auto w-full select-none"
      />

      <FloralCorner className="pointer-events-none absolute bottom-0 left-0 w-[26%]" />
      <FloralCorner
        className="pointer-events-none absolute right-0 bottom-0 w-[26%]"
        flip
      />

      {/* The dome. Nothing else is narrow enough to go up here. */}
      {bismillah && (
        <p
          lang="ar"
          dir="rtl"
          className="absolute inset-x-0 top-[18.5%] text-center font-arabic text-[2.6cqw] leading-none whitespace-nowrap text-blue-ink"
        >
          {bismillah}
        </p>
      )}

      <div className="absolute inset-x-[18%] top-[26%] bottom-[6%] flex flex-col items-center justify-center text-center">
        <p className="font-caps text-[2.4cqw] leading-[1.9] tracking-[0.2em] text-blue-ink uppercase">
          {invite.kicker.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <p className="script-heading stamp mt-[2cqw] text-[10cqw] leading-none">
          {groom.name}
        </p>

        <OrnamentalDivider size="sm" className="mt-[2cqw] !w-[38%]" />

        <p className="mt-[1.8cqw] font-caps text-[2.2cqw] leading-[1.8] tracking-[0.18em] text-blue-ink uppercase">
          <span className="block">{invite.groomRole}</span>
          <span className="block">{families.groom.house}</span>
        </p>

        <p className="script-heading stamp mt-[1.8cqw] text-[5.5cqw] leading-none">
          {invite.joiner}
        </p>

        <p className="script-heading stamp-rose mt-[1cqw] text-[10cqw] leading-none">
          {bride.name}
        </p>

        <OrnamentalDivider size="sm" className="mt-[2cqw] !w-[38%]" />

        <p className="mt-[1.8cqw] font-caps text-[2.2cqw] leading-[1.8] tracking-[0.18em] text-blue-ink uppercase">
          <span className="block">{invite.brideRole}</span>
          {(Array.isArray(families.bride.house)
            ? families.bride.house
            : [families.bride.house]
          ).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <p className="script-heading stamp mt-[4cqw] text-[5.8cqw] leading-none">
          {invite.greeting}
        </p>

        <p className="mt-[2.2cqw] max-w-[30ch] font-serif text-[3.2cqw] leading-[1.6] font-medium text-ink">
          {invite.body}
        </p>
      </div>
    </div>
  );
}

export function FamiliesSection({ families, groom, bride, bismillah }) {
  return (
    <SectionReveal>
      <section
        id="families"
        className="mx-auto w-full max-w-[720px] px-7 py-24 sm:py-28"
      >
        <ArchCard
          invite={families.invite}
          groom={groom}
          bride={bride}
          families={families}
          bismillah={bismillah}
        />

        <SectionHeading
          eyebrow={families.eyebrow}
          heading={families.heading}
          className="mt-24"
        />

        <div className="mt-14 flex flex-col items-stretch gap-12 sm:flex-row sm:gap-8">
          <Family {...families.groom} />

          <div
            aria-hidden="true"
            className="flex items-center justify-center sm:w-px"
          >
            {/* Horizontal sprig when stacked, a hairline when side by side. */}
            <BotanicalSprig className="w-28 text-blue-deep/60 sm:hidden" />
            <span className="hidden h-full w-px bg-blue-deep/18 sm:block" />
          </div>

          <Family {...families.bride} tone="rose" />
        </div>
      </section>
    </SectionReveal>
  );
}
