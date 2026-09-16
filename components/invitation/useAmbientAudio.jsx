'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Looping background track, owned by the page so a single <audio> element can
 * be driven from the nav.
 *
 * Playback only ever starts from `isOpened`, which is set by the visitor
 * tapping the cover, so nothing is autoplayed before an interaction. A browser
 * may still refuse the programmatic play; the returned `isPlaying` reflects
 * what actually happened rather than what was requested, so the nav control
 * never shows "playing" over silence.
 */
export function useAmbientAudio(src, isOpened) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src || !isOpened) return;

    audio.volume = 0.32;
    const played = audio.play();

    if (played?.then) {
      played.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(true);
    }
  }, [src, isOpened]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      );
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  // Rendered by the caller, once, so the element outlives any single section.
  const element = src ? (
    <audio ref={audioRef} src={src} loop preload="none" />
  ) : null;

  return { isPlaying, toggle, element, hasAudio: Boolean(src) };
}
