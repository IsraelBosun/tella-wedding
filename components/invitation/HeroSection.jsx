'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollCue } from './ScrollCue';
import { BotanicalSprig } from './BotanicalSprig';
import { GoldMotes } from './GoldMotes';
import { CuspedArch } from './ornaments/CuspedArch';
import { FloralCorner } from './ornaments/FloralCorner';

/**
 * The opening spread. Two entirely different compositions, picked on whether
 * `media.heroVideo` is set, which is why they are two components rather than
 * one tree full of conditionals.
 *
 * With a clip, the clip is the whole spread and nothing is drawn over it: it
 * letters its own welcome, the couple's names and its own scroll cue, so
 * anything the page printed here would be a second copy.
 *
 * Without one, the page draws the thing itself: a carved multifoil arch behind
 * the type, floral sprays in the lower corners, the Bismillah at the crown,
 * and the two names at the largest size on the page.
 */

// Staggered so the Bismillah settles before the names arrive under it.
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.16, duration: 1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HeroSection({ data }) {
  const heroVideo = data.media?.heroVideo ?? null;

  return heroVideo ? (
    <VideoHero data={data} src={heroVideo} />
  ) : (
    <DrawnHero data={data} />
  );
}

/**
 * The clip, and nothing else.
 *
 * The sizing is the whole component. A 9:16 card in a viewport that is not
 * 9:16 can be shown whole or shown edge to edge, never both: cover crops the
 * arch's crown and the florals' corners, which is what read as zoomed in, and
 * contain inside a full-height box leaves paper above the clip, which is the
 * blank band.
 *
 * So the box is not full height. `aspect-[9/16]` lets the section take exactly
 * the height the clip needs at the screen's width, so on a phone the frame
 * starts hard against the top of the page with nothing before it and nothing
 * cropped off it. `max-h-svh` then caps that on a desktop, where 9:16 of
 * a wide screen would be taller than the screen, and the clip settles into a
 * centred column with the paper either side.
 *
 * There is no parallax lift here, only the fade. Shifting a box that is
 * exactly as tall as its contents just opens a gap underneath it.
 */
function VideoHero({ data, src }) {
  const { groom, bride, media } = data;

  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section id="top" className="relative w-full overflow-hidden">
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none relative aspect-9/16 max-h-svh w-full"
      >
        <video
          src={src}
          poster={media?.heroImage ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-contain"
        />
      </motion.div>

      {/*
        A video is nothing to a screen reader or to a search result, so the
        page's h1 still has to exist. It is only hidden from sight.
      */}
      <h1 className="sr-only">{`${groom.name} and ${bride.name}`}</h1>
    </section>
  );
}

/** The drawn spread, for when there is no clip. */
function DrawnHero({ data }) {
  const { groom, bride, hero, bismillah, hashtag } = data;

  // The arch drifts up at roughly half the scroll rate, so the carving reads as
  // sitting behind the type rather than printed on the same plane.
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 700], [0, -110]);
  const archFade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      id="top"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10"
    >
      <GoldMotes />

      <motion.div
        style={{ y: archY, opacity: archFade }}
        className="pointer-events-none absolute inset-x-0 top-[6%] bottom-0 flex justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-[min(94vw,440px)]"
        >
          <CuspedArch className="h-full w-full text-blue-deep/45" />

          <FloralCorner className="absolute bottom-0 left-0 w-28 text-blue-deep/50 sm:w-36" />
          <FloralCorner className="absolute right-0 bottom-0 w-28 text-blue-deep/50 sm:w-36" flip />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex w-full max-w-[440px] flex-col items-center text-center">
        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={0}
          lang="ar"
          dir="rtl"
          className="font-arabic text-[20px] leading-[2] font-bold text-blue-ink sm:text-[24px]"
        >
          {bismillah}
        </motion.p>

        <motion.div variants={rise} initial="hidden" animate="show" custom={1}>
          <BotanicalSprig className="animate-drift mt-6 w-28 text-blue-deep sm:w-36" />
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={2}
          className="eyebrow mt-6 text-[0.6rem] text-blue-ink"
        >
          {hero.kicker}
        </motion.p>

        <motion.h1
          variants={rise}
          initial="hidden"
          animate="show"
          custom={3}
          className="script-heading mt-5 flex flex-col leading-[0.95]"
        >
          <span className="stamp text-[64px] sm:text-[88px]">{groom.name}</span>
          <span className="my-1 font-serif text-[26px] font-semibold text-blue-deep italic sm:text-[32px]">
            &amp;
          </span>
          <span className="stamp text-[64px] sm:text-[88px]">{bride.name}</span>
        </motion.h1>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-8 flex w-full flex-col items-center"
        >
          <span className="rule-fade w-full max-w-[260px]" />

          <p className="eyebrow mt-6 text-[0.58rem] text-blue-mid">
            {hero.place}
          </p>

          <p className="mt-7 inline-flex items-center rounded-full border border-blue-deep/40 bg-shell/70 px-5 py-2 font-caps text-[0.62rem] font-semibold tracking-[0.16em] text-blue-ink">
            {hashtag}
          </p>
        </motion.div>
      </div>

      <div className="relative z-10">
        <ScrollCue />
      </div>
    </section>
  );
}
