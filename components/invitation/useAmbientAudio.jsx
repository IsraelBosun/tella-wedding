'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Looping background track, owned by the page so a single <audio> element can
 * be driven from both the nav and the floating control.
 *
 * Nothing plays on load. The track starts when the visitor taps the envelope,
 * which is also the gesture that satisfies the browser's autoplay policy, so
 * the play is allowed rather than silently refused.
 *
 * `isPlaying` reflects what actually happened rather than what was requested,
 * so a control never shows "playing" over silence. Once the visitor pauses by
 * hand nothing starts it again except them.
 */
export function useAmbientAudio(src, isOpened) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Set the moment the visitor pauses, so no later attempt overrides them.
  const pausedByUserRef = useRef(false);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || pausedByUserRef.current || !audio.paused) return;

    audio.volume = 0.32;
    const played = audio.play();

    if (played?.then) {
      played.then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      );
    } else {
      setIsPlaying(true);
    }
  }, []);

  /*
    Started from the tap on the envelope, via `start` below, so the music comes
    up with the opening clip rather than after it. This effect is the backstop
    for any path that reaches the page without going through that handler.
  */
  useEffect(() => {
    if (!src || !isOpened) return;
    attemptPlay();
  }, [attemptPlay, isOpened, src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      pausedByUserRef.current = false;
      audio.volume = 0.32;
      audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      );
    } else {
      pausedByUserRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  // Rendered by the caller, once, so the element outlives any single section.
  const element = src ? (
    <audio ref={audioRef} src={src} loop preload="auto" />
  ) : null;

  return { isPlaying, toggle, start: attemptPlay, element, hasAudio: Boolean(src) };
}
