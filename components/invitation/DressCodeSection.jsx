'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { PhotoFrame } from './PhotoFrame';

/**
 * White on gold, the only two colours the couple asked for.
 *
 * The palette is one continuous strip divided by hairlines rather than a grid
 * of labelled cards, which is what gives it a mood-board feel instead of a
 * spec sheet. Names carry as screen-reader text so the strip stays visual, and
 * the strip is framed because its lightest swatch is the page background: an
 * unframed white chip on ivory would simply be a hole.
 */
export function DressCodeSection({ dressCode, monogram }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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

        <p className="mt-10 font-serif text-[18px] leading-[1.9] font-medium text-ink sm:text-[20px]">
          {dressCode.description}
        </p>

        <div
          aria-hidden="true"
          className="mt-12 flex h-14 w-full overflow-hidden rounded-[2px] border border-gold/35 sm:h-16"
        >
          {dressCode.colors.map((color, index) => (
            <motion.span
              key={color.hex}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.09, duration: 0.5 }}
              style={{ backgroundColor: color.hex }}
              className={`flex-1 ${index > 0 ? 'border-l border-gold/25' : ''}`}
            />
          ))}
        </div>

        <p className="sr-only">
          Suggested shades: {dressCode.colors.map((c) => c.name).join(', ')}.
        </p>

        <PhotoFrame
          src={dressCode.photo}
          alt={dressCode.photoAlt}
          monogram={monogram}
          ratio="aspect-4/5"
          className="mt-14"
        />

        {/*
          Two lines of the same shape, so the eye can compare them. The label
          and the garment are separated by weight and colour, not punctuation.
        */}
        <dl className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-10">
          {dressCode.guidance.map((item) => (
            <div key={item.who} className="flex-1">
              <dt className="eyebrow text-[0.55rem] text-gold-deep">
                {item.who}
              </dt>
              <dd className="mt-3 font-serif text-[18px] leading-[1.6] font-medium text-ink sm:text-[19px]">
                {item.what}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </SectionReveal>
  );
}
