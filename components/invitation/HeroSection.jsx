'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollCue } from './ScrollCue';
import { BotanicalSprig } from './BotanicalSprig';
import { GoldMotes } from './GoldMotes';
import { CuspedArch } from './ornaments/CuspedArch';
import { FloralCorner } from './ornaments/FloralCorner';

/**
 * The opening spread, held to a full viewport.
 *
 * Composition follows the sample: a carved multifoil arch standing behind the
 * type, floral sprays in the lower corners, the Bismillah at the crown, and the
 * two names foil-stamped at the largest size on the page. Everything else drops
 * to letterspaced caps so nothing competes with the names.
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
  const { groom, bride, hero, bismillah, hashtag } = data;

  // The arch drifts up at roughly half the scroll rate, so the carving reads as
  // sitting behind the type rather than printed on the same plane.
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 700], [0, -110]);
  const archFade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10"
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
          <CuspedArch className="h-full w-full text-gold/45" />

          <FloralCorner className="absolute bottom-0 left-0 w-28 text-gold/50 sm:w-36" />
          <FloralCorner className="absolute right-0 bottom-0 w-28 text-gold/50 sm:w-36" flip />
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
          className="font-arabic text-[20px] leading-[2] font-bold text-gold-deep sm:text-[24px]"
        >
          {bismillah}
        </motion.p>

        <motion.div variants={rise} initial="hidden" animate="show" custom={1}>
          <BotanicalSprig className="animate-drift mt-6 w-28 text-gold sm:w-36" />
        </motion.div>

        <motion.p
          variants={rise}
          initial="hidden"
          animate="show"
          custom={2}
          className="eyebrow mt-6 text-[0.6rem] text-gold-deep"
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
          <span className="foil foil-animate text-[64px] sm:text-[88px]">
            {groom.name}
          </span>
          <span className="my-1 font-serif text-[26px] font-semibold text-gold italic sm:text-[32px]">
            &amp;
          </span>
          <span className="foil foil-animate text-[64px] sm:text-[88px]">
            {bride.name}
          </span>
        </motion.h1>

        <motion.div
          variants={rise}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-8 flex w-full flex-col items-center"
        >
          <span className="rule-fade w-full max-w-[260px]" />

          <p className="eyebrow mt-6 text-[0.58rem] text-gold-soft">
            {hero.place}
          </p>

          <p className="mt-7 inline-flex items-center rounded-full border border-gold/40 bg-cream/70 px-5 py-2 font-caps text-[0.62rem] font-semibold tracking-[0.16em] text-gold-deep">
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
