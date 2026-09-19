'use client';

import { SectionReveal } from './SectionReveal';
import { BotanicalSprig } from './BotanicalSprig';
import { GoldMotif } from './ornaments/GoldMotif';

/**
 * The colophon. The names come back at close to hero size so the page ends on
 * the same note it opened with, and everything under them steps down to the
 * quietest type on the page.
 */
export function ClosingSection({ names, hashtag, closing }) {
  return (
    <SectionReveal>
      <footer className="mx-auto w-full max-w-[560px] px-7 pt-10 pb-24 text-center">
        <GoldMotif name="music" className="mx-auto w-44 sm:w-52" />

        <BotanicalSprig className="mx-auto mt-2 w-40 text-blue-deep/60 sm:w-48" />

        <p className="script-heading stamp-gold mt-10 text-[42px] leading-[1.2] sm:text-[54px]">
          {names}
        </p>

        <p className="mt-6 font-caps text-[0.62rem] tracking-[0.18em] text-blue-ink">
          {hashtag}
        </p>

        <span className="rule-fade mx-auto mt-10 w-48" />

        <p className="mt-8 font-serif text-[15px] tracking-[0.04em] font-medium text-blue-mid">
          {closing.footnote} · {closing.dateStamp}
        </p>
      </footer>
    </SectionReveal>
  );
}
