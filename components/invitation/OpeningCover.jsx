'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EnvelopeArtwork } from './EnvelopeArtwork';

/*
  The reference opens in three stages, not two:

    cover artwork  ->  tap  ->  full-screen envelope video  ->  fade  ->  page

  The video stage is skipped entirely when no clip is configured, so the
  component works before any media asset exists.
*/
const VIDEO_FADE_MS = 1400;

// Ceiling on the video stage, so a clip that stalls can never trap the visitor.
const VIDEO_TIMEOUT_MS = 12000;

export function OpeningCover({
  isOpened,
  onOpen,
  onTap = null,
  monogram = '',
  coverImage = null,
  coverVideo = null,
}) {
  const [stage, setStage] = useState('cover'); // cover | video | leaving
  const videoRef = useRef(null);
  const timersRef = useRef([]);

  const after = useCallback((ms, fn) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout);
    },
    [],
  );

  // Body scroll stays locked until the whole sequence has finished.
  useEffect(() => {
    if (isOpened) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpened]);

  const finish = useCallback(() => {
    setStage('leaving');
    onOpen();
  }, [onOpen]);

  const handleTap = useCallback(() => {
    if (stage !== 'cover') return;

    // This tap is the visitor's first gesture, so it is what lets the browser
    // allow the music. Fire it here rather than waiting for the clip to end.
    onTap?.();

    if (!coverVideo) {
      finish();
      return;
    }

    setStage('video');
    // Autoplay can still be refused even when muted; treat that as "no video".
    after(0, () => {
      const video = videoRef.current;
      if (!video) return;
      const played = video.play();
      if (played?.catch) played.catch(finish);
    });
    after(VIDEO_TIMEOUT_MS, finish);
  }, [after, coverVideo, finish, onTap, stage]);

  const handleVideoEnded = useCallback(() => {
    after(VIDEO_FADE_MS, finish);
  }, [after, finish]);

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-shell"
        >
          {/* Stage one: the artwork, which is itself the control. */}
          <button
            type="button"
            onClick={handleTap}
            aria-label="Tap to open the invitation"
            className="absolute inset-0 flex w-full cursor-pointer flex-col items-center justify-center px-6 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-deep"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="flex h-[70vh] max-h-[720px] w-full max-w-[440px] items-center justify-center"
            >
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverImage}
                  alt=""
                  draggable="false"
                  className="block h-full max-w-full object-contain"
                />
              ) : (
                <EnvelopeArtwork monogram={monogram} />
              )}
            </motion.div>

            {/*
              The "Tap to open" label and its chevron used to sit here. They
              are gone by request: the artwork is the whole screen and the
              whole control, so nothing has to be pointed at. The button's
              aria-label stays, because a screen reader gets no such hint
              from a picture.
            */}
          </button>

          {/*
            Stage two: the envelope clip, over the artwork. It is boxed to the
            same frame as the cover art above so the envelope stays exactly the
            size it was when tapped, instead of jumping to full bleed.
          */}
          {stage === 'video' && coverVideo && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-shell px-6">
              <video
                ref={videoRef}
                src={coverVideo}
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                onError={finish}
                className="block h-[70vh] max-h-[720px] w-full max-w-[440px] object-contain"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
