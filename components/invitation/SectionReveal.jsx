'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The reveal every section is wrapped in.
 *
 * Deliberately one move, not two: the section lifts a little and fades in over
 * about a second, on an ease that decelerates hard at the end so it settles
 * rather than arriving. Anything more energetic than this reads as a marketing
 * page, and the section headings do their own small stagger on top of it, so
 * the two together are already the whole effect.
 *
 * `margin` starts the reveal slightly before the section reaches the fold, so
 * the page never shows an empty band waiting for content to appear.
 */
export function SectionReveal({ children, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
