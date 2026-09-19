'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * The one heading treatment every section uses, so the page reads as a single
 * printed piece rather than a stack of differently-styled blocks.
 *
 *   eyebrow   letterspaced Cinzel caps, quiet
 *   heading   large script in foil gold, one or two lines
 *   divider   the shared diamond rule
 *
 * `heading` takes an array when the reference breaks a title across two lines
 * ("One covenant." / "One celebration."); the break is part of the composition,
 * not an accident of wrapping, so it is authored rather than left to the box.
 *
 * The three parts arrive in sequence rather than together. It is a small
 * thing, about a tenth of a second apart, but it is what makes a section read
 * as unfolding as you reach it instead of being switched on.
 */

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const part = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SectionHeading({
  eyebrow,
  heading,
  align = 'center',
  divider = true,
  className = '',
}) {
  const reduceMotion = useReducedMotion();
  const lines = Array.isArray(heading) ? heading : [heading];
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.header
      variants={reduceMotion ? undefined : group}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={`flex flex-col ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.p variants={part} className="eyebrow text-blue-ink">
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={part}
        className="script-heading mt-3 text-[40px] leading-[1.15] sm:text-[52px]"
      >
        {lines.map((line, i) => (
          <span key={line} className="block stamp">
            {line}
            {/* Keeps the two lines readable as one sentence for screen readers. */}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.h2>

      {divider && (
        <motion.div variants={part} className="w-full">
          <OrnamentalDivider size="md" className="mt-6" />
        </motion.div>
      )}
    </motion.header>
  );
}
