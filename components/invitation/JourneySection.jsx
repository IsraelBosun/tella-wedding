'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionReveal } from './SectionReveal';
import { EventMotif } from './ornaments/EventMotif';
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

function BlockTitle({ title, time }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="script-heading foil text-[34px] sm:text-[40px]">{title}</h3>
      <p className="eyebrow mt-2 text-[0.55rem] text-gold-deep">{time}</p>
    </div>
  );
}

/**
 * The Nikkah, as an alternating timeline.
 *
 * Entries alternate sides across a centre rail from `sm` up, each with its
 * engraved motif on the opposite side of the rail from its type. That swap is
 * the whole trick: it keeps the eye crossing the rail rather than running down
 * one column, which is what makes seven entries feel like a ceremony unfolding.
 *
 * Below `sm` there is no room for two columns, so it collapses to a single
 * left-railed list. The motifs stay, at half size, inline with the time.
 */
function NikkahRail({ schedule, inView }) {
  return (
    <ol className="relative mt-12">
      {/* Centre rail on wide screens, left rail once stacked. */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[6px] w-px bg-linear-to-b from-transparent via-gold/45 to-transparent sm:left-1/2 sm:-translate-x-1/2"
      />

      {schedule.map((item, index) => {
        const flip = index % 2 === 1;

        return (
          <motion.li
            key={item.time + item.title}
            initial={{ opacity: 0, x: flip ? 26 : -26 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: flip ? 26 : -26 }}
            transition={{ delay: index * 0.11, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-[24px_1fr] items-center gap-x-4 pb-10 last:pb-0 sm:grid-cols-[1fr_44px_1fr] sm:gap-x-2 sm:pb-6"
          >
            {/* Wide screens: whichever half is not carrying the type. */}
            <div className="order-1 hidden justify-end pr-2 sm:flex">
              {flip ? (
                <TimeEntry item={item} align="right" />
              ) : (
                <EventMotif name={item.motif} className="w-24 text-gold lg:w-28" />
              )}
            </div>

            {/* The node itself, sitting on the rail. */}
            <span
              aria-hidden="true"
              className="order-first flex items-center justify-center sm:order-2"
            >
              <span className="relative flex size-[13px] rotate-45 items-center justify-center border border-gold/60 bg-ivory">
                <span className="size-[5px] rotate-45 bg-gold" />
              </span>
            </span>

            <div className="order-last flex items-center gap-4 sm:order-3 sm:justify-start sm:pl-2">
              {/* Narrow screens: motif and type share one row. */}
              <EventMotif
                name={item.motif}
                className="w-14 shrink-0 text-gold sm:hidden"
              />
              <div className="sm:hidden">
                <TimeEntry item={item} align="left" />
              </div>

              <div className="hidden sm:block">
                {flip ? (
                  <EventMotif name={item.motif} className="w-24 text-gold lg:w-28" />
                ) : (
                  <TimeEntry item={item} align="left" />
                )}
              </div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

/**
 * Time above title, the reference's inversion: the hour is the large script
 * line and the event is the quieter serif under it. Keeping that is most of
 * what stops this reading as an ordinary agenda.
 */
function TimeEntry({ item, align }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="script-heading foil text-[34px] leading-none sm:text-[40px]">
        {item.time}
      </p>
      <p className="mt-2 font-serif text-[18px] leading-[1.35] font-semibold text-ink sm:text-[21px]">
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
          className="grid grid-cols-[28px_1fr] items-baseline gap-x-4 border-b border-gold/12 py-4 last:border-b-0 sm:grid-cols-[34px_1fr]"
        >
          <span className="tabular font-caps text-[0.58rem] text-gold">
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
    <div className="relative mt-16 overflow-hidden rounded-[3px] bg-cream/70 px-7 py-12 text-center shadow-[0_24px_60px_-42px_rgba(125,99,50,0.8)]">
      <span className="pointer-events-none absolute inset-2.5 border border-gold/25" />
      <span className="pointer-events-none absolute inset-[15px] border border-gold/12" />

      <div className="relative">
        <p className="script-heading foil text-[38px] sm:text-[46px]">
          {date.long}
        </p>
        <p className="eyebrow mt-2 text-[0.55rem] text-gold-deep">
          {date.weekday}
        </p>

        <OrnamentalDivider size="md" className="my-8" />

        <p className="font-caps text-[0.68rem] tracking-[0.22em] text-gold-deep uppercase">
          Nikkah · {date.time}
        </p>
        <p className="mt-2 font-serif text-[17px] font-medium text-ink italic">
          Followed by Engagement
        </p>

        <OrnamentalDivider size="md" className="my-8" />

        <p className="script-heading foil text-[30px] sm:text-[34px]">
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
          <BlockTitle title={nikkah.title} time={nikkah.time} />
          <NikkahRail schedule={nikkah.schedule} inView={inView} />
          <p className="mt-9 border-t border-gold/15 pt-6 text-center font-serif text-[15px] leading-relaxed font-medium text-gold-soft italic">
            {nikkah.note}
          </p>
        </div>

        <div id="engagement" className="mt-20 scroll-mt-24">
          <BlockTitle title={engagement.title} time={engagement.time} />
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
