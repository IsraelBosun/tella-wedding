'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline across the very top that fills as the page is read.
 *
 * One pixel, and the same blue as the rules elsewhere, so it reads as part of
 * the stationery rather than as a browser chrome. The spring is the point: a
 * raw scroll value snaps on a trackpad, and a bar that snaps is the opposite
 * of gentle.
 *
 * It sits above the nav, and it is the only thing on the page that is purely
 * an indicator, so it disappears entirely under reduced motion rather than
 * freezing at some arbitrary width.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  if (reduceMotion) return null;

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-blue-deep/50"
    />
  );
}
