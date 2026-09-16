'use client';

import { SectionReveal } from './SectionReveal';
import { BotanicalSprig } from './BotanicalSprig';

/**
 * The colophon. The names come back at close to hero size so the page ends on
 * the same note it opened with, and everything under them steps down to the
 * quietest type on the page.
 */
export function ClosingSection({ names, hashtag, closing }) {
  return (
    <SectionReveal>
      <footer className="mx-auto w-full max-w-[560px] px-7 pt-10 pb-24 text-center">
        <BotanicalSprig className="mx-auto w-40 text-gold/60 sm:w-48" />

        <p className="script-heading foil foil-animate mt-10 text-[42px] leading-[1.2] sm:text-[54px]">
          {names}
        </p>

        <p className="mt-6 font-caps text-[0.62rem] tracking-[0.18em] text-gold-deep">
          {hashtag}
        </p>

        <span className="rule-fade mx-auto mt-10 w-48" />

        <p className="mt-8 font-serif text-[15px] tracking-[0.04em] font-medium text-gold-soft">
          {closing.footnote} · {closing.dateStamp}
        </p>
      </footer>
    </SectionReveal>
  );
}
