'use client';

import { motion } from 'framer-motion';

/**
 * "Scroll down" is set in the script face on the reference, not in letterspaced
 * caps, which is what keeps it feeling handwritten rather than like a CTA.
 */
export function ScrollCue({ label = 'Scroll' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="flex flex-col items-center gap-2.5 pt-12"
    >
      <p className="script-heading text-[26px] text-wine-deep">{label}</p>

      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 5, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="block size-2 rotate-45 border-r-[1.5px] border-b-[1.5px] border-wine-deep"
      />
    </motion.div>
  );
}
