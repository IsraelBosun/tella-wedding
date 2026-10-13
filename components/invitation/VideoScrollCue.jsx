'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/*
  How far the page has to move before the cue counts as heard. Small, so it
  leaves the moment a guest starts scrolling, but not zero, so the bounce of an
  overscroll on iOS does not flicker it.
*/
const DISMISS_AT_PX = 40;

/**
 * The scroll cue that sits over the hero clip.
 *
 * The clip letters its own cue, but guests were reading the clip as the whole
 * page and never scrolling, so this one is louder on purpose: pinned to the
 * bottom of the screen rather than the bottom of the clip (which can sit below
 * the fold on a tall phone), on a frosted pill so it reads over any frame of
 * the video, and tappable for anyone who does not think to swipe.
 *
 * It sits under the opening cover (z-50), so it only appears once that lifts.
 */
export function VideoScrollCue() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > DISMISS_AT_PX));

  const scrollOn = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.button
          type="button"
          onClick={scrollOn}
          aria-label="Scroll down to read the invitation"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 2.2, duration: 0.9 } }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.35 } }}
          className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 mx-auto flex w-fit cursor-pointer flex-col items-center gap-0.5 rounded-full border border-wine-deep/25 bg-shell/80 px-5 pt-2 pb-1.5 text-wine-deep shadow-[0_6px_24px_-8px_rgba(80,20,35,0.35)] backdrop-blur-md"
        >
          <span className="font-caps text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
            Scroll down
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-5" strokeWidth={1.75} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
