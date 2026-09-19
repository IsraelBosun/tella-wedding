'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * The dress code, built around the illustration rather than around text.
 *
 * A guest reads this section to answer one question: what do I wear. A drawing
 * of six people already dressed answers it faster than any paragraph can, so
 * the drawing is the middle of the composition and the words sit either side
 * of it. The illustration is a cutout on the page ground, with no frame: it is
 * a diagram of the attire, not a photograph of an occasion.
 *
 * The swatches carry their hex values because this is the one place on the
 * site where a colour is read in order to be acted on, and "match the gold on
 * my phone" is not something a tailor can work from. A number is.
 *
 * The chips are the guests' colours, not the site's. They are white and gold
 * while the page around them stays blue and rose, so they are the one place
 * the palette is allowed to break, and the ring around each chip is what keeps
 * the white one from dissolving into the paper.
 */
export function DressCodeSection({ dressCode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <SectionReveal>
      <section
        ref={ref}
        id="dress-code"
        className="mx-auto w-full max-w-[560px] px-7 py-24 text-center sm:py-28"
      >
        <SectionHeading
          eyebrow={dressCode.eyebrow}
          heading={dressCode.heading}
        />

        {dressCode.illustration && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Image
              src={dressCode.illustration}
              alt={dressCode.illustrationAlt ?? ''}
              width={1400}
              height={940}
              sizes="(max-width: 640px) 90vw, 520px"
              className="mx-auto h-auto w-full max-w-[520px]"
            />
          </motion.div>
        )}

        {/*
          Three lines, not one sentence. The colours are the only thing a guest
          has to carry away from this section, so they are lifted out of the
          run of text and set in the script face on their own line.
        */}
        <p className="mt-10 font-serif text-[20px] leading-[1.7] font-medium text-ink sm:text-[21px]">
          {dressCode.invite.lead}
        </p>
        <p className="script-heading stamp mt-2 text-[33px] leading-[1.3] sm:text-[40px]">
          {dressCode.invite.highlight}
        </p>
        <p className="mt-1 font-serif text-[20px] leading-[1.7] font-medium text-ink sm:text-[21px]">
          {dressCode.invite.trail}
        </p>

        {dressCode.description && (
          <p className="mx-auto mt-5 max-w-[40ch] font-serif text-[18px] leading-[1.8] font-medium text-ink-soft">
            {dressCode.description}
          </p>
        )}

        <OrnamentalDivider size="sm" className="mt-12" />

        <p className="eyebrow mt-8 text-[0.65rem] text-blue-ink">
          {dressCode.shadesLabel}
        </p>

        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {dressCode.colors.map((color, index) => (
            <motion.li
              key={color.hex}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <span
                aria-hidden="true"
                style={{ backgroundColor: color.hex }}
                className="block aspect-square w-full rounded-full border border-blue-deep/30"
              />
              <span className="mt-2 font-caps text-[0.59rem] tracking-[0.12em] text-blue-ink uppercase">
                {color.name}
              </span>
              <span className="tabular mt-0.5 font-caps text-[0.57rem] tracking-[0.08em] text-blue-mid">
                {color.hex}
              </span>
            </motion.li>
          ))}
        </ul>

        {/*
          Two lines of the same shape, so the eye can compare them. The label
          and the garment are separated by weight and colour, not punctuation.
        */}
        <dl className="mt-14 flex flex-col gap-6 text-left sm:flex-row sm:gap-10">
          {dressCode.guidance.map((item) => (
            <div key={item.who} className="flex-1">
              <dt className="eyebrow text-[0.65rem] text-blue-ink">
                {item.who}
              </dt>
              <dd className="mt-3 font-serif text-[20px] leading-[1.6] font-medium text-ink sm:text-[21px]">
                {item.what}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </SectionReveal>
  );
}
