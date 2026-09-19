'use client';

import { SectionReveal } from './SectionReveal';
import { BotanicalSprig } from './BotanicalSprig';
import { FloralCorner } from './ornaments/FloralCorner';

/**
 * The colophon. The names come back at close to hero size so the page ends on
 * the same note it opened with, and everything under them steps down to the
 * quietest type on the page.
 */
export function ClosingSection({ names, hashtag, closing }) {
  return (
    <SectionReveal>
      <footer className="mx-auto w-full max-w-[560px] px-7 pt-10 pb-24 text-center">
        {/* The drums are hidden for now. Restore with:
              <GoldMotif name="music" className="mx-auto w-44 sm:w-52" />
            and put the import back. */}

        <BotanicalSprig className="mx-auto w-40 text-blue-deep/60 sm:w-48" />

        {/*
          The two sprays came up from the foot of the RSVP section, where they
          were closing that block off, to flank the names instead. Mirrored
          either side of one line they read as a crest, which is a better last
          note for the page than a pair of corners.

          The widths are what make it work: the sprays are a share of the
          column and the names are sized to what is left, so the three stay on
          one line together from a 320px phone up, and the sprays were
          narrowed when the names were raised so that stayed true.
        */}
        <div className="mt-9 flex items-center justify-center gap-2 sm:gap-4">
          <FloralCorner
            aria-hidden="true"
            className="w-[14%] max-w-[80px] shrink-0"
          />

          <p className="script-heading stamp-gold text-[35px] leading-[1.15] sm:text-[49px]">
            {names}
          </p>

          <FloralCorner
            aria-hidden="true"
            className="w-[14%] max-w-[80px] shrink-0"
            flip
          />
        </div>

        <p className="mt-6 font-caps text-[0.73rem] tracking-[0.18em] text-blue-ink">
          {hashtag}
        </p>

        <span className="rule-fade mx-auto mt-10 w-48" />

        <p className="mt-8 font-serif text-[17px] tracking-[0.04em] font-medium text-blue-mid">
          {closing.footnote} · {closing.dateStamp}
        </p>
      </footer>
    </SectionReveal>
  );
}
