'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionReveal } from './SectionReveal';
import Image from 'next/image';
import { GoldMotif, SCHEDULE_MOTIFS } from './ornaments/GoldMotif';
import { SectionHeading } from './SectionHeading';
import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * The two halves of the day, given two different treatments on purpose.
 *
 * The Nikkah runs to a clock, so it is a rail with times: the vertical hairline
 * and the dots are what make seven entries scan as one continuous ceremony
 * rather than seven separate announcements.
 *
 * The Engagement runs by sequence rather than by time, so it is numbered and
 * has no times at all. Inventing clock times for it would be a lie the page
 * would then have to keep.
 */

/*
  `tone` is what splits the day in two. The Nikkah is blue and the Engagement
  is rose, so the page turns warm at the same moment the day does. Before this
  both halves were the same gold and the whole thing scanned as one long
  agenda.
*/
function BlockTitle({ title, time, motif, tone = 'blue' }) {
  const rose = tone === 'rose';

  return (
    <div className="flex flex-col items-center text-center">
      {motif && <GoldMotif name={motif} className="mb-2 w-40 sm:w-48" />}
      <h3
        className={`script-heading text-[34px] sm:text-[40px] ${
          rose ? 'stamp-rose' : 'stamp'
        }`}
      >
        {title}
      </h3>
      <p
        className={`eyebrow mt-2 text-[0.55rem] ${
          rose ? 'text-rose-ink' : 'text-blue-ink'
        }`}
      >
        {time}
      </p>
    </div>
  );
}

/**
 * The Nikkah, as an alternating timeline.
 *
 * Entries alternate sides across a centre rail, each with its engraved motif
 * on the opposite side of the rail from its type. That swap is the whole
 * trick: it keeps the eye crossing the rail rather than running down one
 * column, which is what makes seven entries feel like a ceremony unfolding.
 *
 * The alternation is kept on phones rather than collapsed to a left-railed
 * list, because the centre rail is the thing being scrolled down and it only
 * reads as a spine if it runs through the middle of the type.
 *
 * Scroll drives three things at once, all off one progress value: the rail
 * draws itself in from the top, the peony rides down it, and each entry
 * settles as the flower reaches it.
 */
function NikkahRail({ schedule }) {
  const railRef = useRef(null);
  const reduceMotion = useReducedMotion();

  /*
    Measured from the rail entering the lower third of the screen to its end
    passing the middle, so the flower finishes its run while the last entry is
    still comfortably in view rather than off the bottom edge.
  */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 80%', 'end 55%'],
  });

  // Raw scroll progress is jittery on a trackpad; the spring is what makes the
  // flower drift rather than twitch.
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.6,
  });

  // useTransform clamps by default, so the spring's overshoot cannot carry the
  // flower off either end of the rail.
  const flowerTop = useTransform(progress, [0, 1], ['1.5%', '98.5%']);
  const flowerTurn = useTransform(progress, [0, 1], [-14, 14]);

  return (
    <ol ref={railRef} className="relative mt-12 pt-12 pb-12">
      {/*
        The rail itself: a faint full-length track with a stronger line drawn
        over it as you scroll. Both are flat, and the ends are capped by the
        two drop ornaments rather than faded out. The centring translate is
        kept on this wrapper so the animated child owns its transform
        outright, rather than fighting a utility class for the same property.
      */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2"
      >
        <span className="absolute inset-0 bg-blue-deep/18" />
        <motion.span
          style={{ scaleY: reduceMotion ? 1 : progress }}
          className="absolute inset-0 origin-top bg-blue-deep/55"
        />
      </span>

      {/*
        The rail is finished rather than faded out: a drop at each end, which is
        how the reference stops a long vertical line reading as a scrollbar.
      */}
      <Image
        src="/invitation/ornaments/drop-diamond.png"
        alt=""
        aria-hidden="true"
        width={64}
        height={914}
        draggable={false}
        className="absolute top-0 left-1/2 h-14 w-auto -translate-x-1/2 select-none"
      />
      <Image
        src="/invitation/ornaments/drop-pin.png"
        alt=""
        aria-hidden="true"
        width={64}
        height={916}
        draggable={false}
        className="absolute bottom-0 left-1/2 h-14 w-auto -translate-x-1/2 select-none"
      />

      {/*
        The peony, riding the rail down as the ceremony is read. Position and
        rotation are split across two elements for the same reason as the rail:
        the outer one is centred by utility classes, the inner one is free to
        own its transform.
      */}
      <motion.span
        aria-hidden="true"
        style={{ top: reduceMotion ? '50%' : flowerTop }}
        className="absolute left-1/2 z-20 block w-9 -translate-x-1/2 -translate-y-1/2 select-none sm:w-11"
      >
        <motion.span style={reduceMotion ? undefined : { rotate: flowerTurn }} className="block">
          <Image
            src="/invitation/ornaments/peony.png"
            alt=""
            width={1254}
            height={1254}
            draggable={false}
            className="block h-auto w-full drop-shadow-[0_4px_10px_rgba(39,69,94,0.28)]"
          />
        </motion.span>
      </motion.span>

      {schedule.map((item, index) => {
        const flip = index % 2 === 1;

        return (
          <motion.li
            key={item.time + item.title}
            initial={reduceMotion ? false : { opacity: 0, x: flip ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-[1fr_30px_1fr] items-center gap-x-1 pb-9 last:pb-0 sm:grid-cols-[1fr_44px_1fr] sm:gap-x-2 sm:pb-6"
          >
            {/* Left half: whichever of the pair is not on the right. */}
            <div className="flex justify-end pr-1 sm:pr-2">
              {flip ? (
                <TimeEntry item={item} align="right" />
              ) : (
                <GoldMotif
                  name={SCHEDULE_MOTIFS[item.motif]}
                  className="w-[84px] sm:w-28 lg:w-36"
                />
              )}
            </div>

            {/* The node itself, sitting on the rail. */}
            <span
              aria-hidden="true"
              className="flex items-center justify-center"
            >
              <span className="relative flex size-[13px] rotate-45 items-center justify-center border border-blue-deep/60 bg-paper">
                <span className="size-[5px] rotate-45 bg-blue-deep" />
              </span>
            </span>

            {/* Right half. */}
            <div className="flex justify-start pl-1 sm:pl-2">
              {flip ? (
                <GoldMotif
                  name={SCHEDULE_MOTIFS[item.motif]}
                  className="w-[84px] sm:w-28 lg:w-36"
                />
              ) : (
                <TimeEntry item={item} align="left" />
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

/**
 * Time above title, the reference's inversion: the hour is the large line and
 * the event is the quieter serif under it. Keeping that is most of what stops
 * this reading as an ordinary agenda.
 *
 * The hour is set in the engraved caps face, not the script. A cursive 9 and a
 * cursive 4 are close enough that a guest ends up guessing at the time, which
 * is the one thing on this page that has to be unambiguous.
 */
function TimeEntry({ item, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="time-stamp stamp text-[15px] sm:text-[22px]">
        {item.time}
      </p>
      <p className="mt-1.5 font-serif text-[14px] leading-[1.35] font-semibold text-ink sm:mt-2 sm:text-[21px]">
        {item.title}
      </p>
    </div>
  );
}

function EngagementOrder({ order, inView }) {
  return (
    <ol className="mt-10 space-y-0">
      {order.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: index * 0.06, duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-[28px_1fr] items-baseline gap-x-4 border-b border-rose-deep/25 py-4 last:border-b-0 sm:grid-cols-[34px_1fr]"
        >
          <span className="tabular font-caps text-[0.58rem] text-rose-ink">
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="font-serif text-[18px] leading-[1.45] font-medium text-ink sm:text-[20px]">
            {item}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

/** The at-a-glance card: everything a guest needs if they read nothing else. */
function EventCard({ date, venue }) {
  return (
    <div className="relative mt-16 overflow-hidden rounded-[3px] bg-mist px-7 py-12 text-center shadow-[0_24px_60px_-42px_rgba(39,69,94,0.8)]">
      <span className="pointer-events-none absolute inset-2.5 border border-blue-deep/25" />
      <span className="pointer-events-none absolute inset-[15px] border border-blue-deep/12" />

      <div className="relative">
        <p className="script-heading stamp-gold text-[38px] sm:text-[46px]">
          {date.long}
        </p>
        <p className="eyebrow mt-2 text-[0.55rem] text-blue-ink">
          {date.weekday}
        </p>

        <OrnamentalDivider size="md" className="my-8" />

        <p className="font-caps text-[0.68rem] tracking-[0.22em] text-blue-ink uppercase">
          Nikkah · {date.time}
        </p>
        <p className="mt-2 font-serif text-[17px] font-medium text-ink italic">
          Followed by Engagement
        </p>

        <OrnamentalDivider size="md" className="my-8" />

        <p className="script-heading stamp text-[30px] sm:text-[34px]">
          {venue.name}
        </p>
        <p className="mt-2 font-serif text-[16px] leading-relaxed font-medium text-ink sm:text-[17px]">
          {venue.address}
        </p>
      </div>
    </div>
  );
}

export function JourneySection({ journey, venue, date }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const { nikkah, engagement } = journey;

  return (
    <SectionReveal>
      <section
        ref={ref}
        className="mx-auto w-full max-w-[560px] px-7 py-24 sm:py-28"
      >
        <SectionHeading eyebrow={journey.eyebrow} heading={journey.heading} />

        <p className="mt-10 text-center font-serif text-[18px] leading-[1.9] font-medium text-ink sm:text-[20px]">
          {journey.intro}
        </p>

        <div id="nikkah" className="mt-20 scroll-mt-24">
          <BlockTitle title={nikkah.title} time={nikkah.time} motif="nikkah" />
          <NikkahRail schedule={nikkah.schedule} />
          <p className="mt-9 border-t border-blue-deep/15 pt-6 text-center font-serif text-[15px] leading-relaxed font-medium text-blue-mid italic">
            {nikkah.note}
          </p>
        </div>

        {/* The rose half, on its own tint, so the turn is felt and not just read. */}
        <div
          id="engagement"
          className="mt-20 scroll-mt-24 rounded-[3px] bg-blush px-6 py-12 sm:px-9"
        >
          <BlockTitle
            title={engagement.title}
            time={engagement.time}
            motif="music"
            tone="rose"
          />
          <p className="mt-6 text-center font-serif text-[17px] leading-[1.8] font-medium text-ink sm:text-[18px]">
            {engagement.intro}
          </p>
          <EngagementOrder order={engagement.order} inView={inView} />
        </div>

        <EventCard date={date} venue={venue} />
      </section>
    </SectionReveal>
  );
}
