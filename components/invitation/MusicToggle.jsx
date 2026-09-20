'use client';

import { motion } from 'framer-motion';

/**
 * Floating pause/play control for the background track, pinned to the bottom
 * right of every section. It drives the same single <audio> element as the
 * nav's ♫, so the two never disagree.
 */
export function MusicToggle({ audio }) {
  if (!audio.hasAudio) return null;

  return (
    <motion.button
      type="button"
      onClick={audio.toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
      aria-label={
        audio.isPlaying ? 'Pause background music' : 'Play background music'
      }
      aria-pressed={audio.isPlaying}
      title={audio.isPlaying ? 'Pause music' : 'Play music'}
      className="fixed right-5 bottom-5 z-50 flex size-12 items-center justify-center rounded-full bg-wine-ink text-paper shadow-[0_6px_20px_rgba(122,35,53,0.28)] transition-colors hover:bg-wine-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-ink sm:right-7 sm:bottom-7 sm:size-14"
    >
      {audio.isPlaying ? <PauseGlyph /> : <PlayGlyph />}
    </motion.button>
  );
}

function PauseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[18px] sm:size-5"
      fill="currentColor"
    >
      <rect x="7" y="4.5" width="3.4" height="15" rx="1.2" />
      <rect x="13.6" y="4.5" width="3.4" height="15" rx="1.2" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      // Nudged right so the triangle sits optically centred in the circle.
      className="size-[18px] translate-x-[1px] sm:size-5"
      fill="currentColor"
    >
      <path d="M8 4.8a1 1 0 0 1 1.52-.85l10 7.2a1 1 0 0 1 0 1.7l-10 7.2A1 1 0 0 1 8 19.2Z" />
    </svg>
  );
}
