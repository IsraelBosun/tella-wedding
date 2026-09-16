'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate, formatEventDate } from '@/lib/utils';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { Portal } from '@/components/ui/Portal';

/*
  Three independent scratch tiles (day, month, year), as on the reference.

  Pointer handling lives on the wrapper rather than on each canvas so a single
  drag can clear all three. Per-canvas listeners would stop at the first tile's
  edge, which is exactly the kind of fiddliness this interaction cannot afford.
*/
const TILES = ['day', 'month', 'year'];

// Per tile, not for the card as a whole. Deliberately forgiving.
const REVEAL_THRESHOLD = 42;

// Measure on every Nth move event; reading pixels is the expensive part.
const SAMPLE_EVERY = 5;

const BRUSH_RADIUS = 17;

export function DateReveal({
  date,
  eyebrow = 'Save the Date',
  heading = 'When will it be?',
  prompt = 'Scratch the card below to find out.',
  hint = 'Scratch the gold to reveal the date',
}) {
  const { day, month, year } = formatDate(date);
  const values = { day, month, year };

  // Spelled out once, for the line that replaces the caption after the reveal.
  const event = formatEventDate(date);

  const canvasesRef = useRef({});
  const lastPointsRef = useRef({});
  const revealedRef = useRef({});
  const drawingRef = useRef(false);
  const moveCountRef = useRef(0);

  const [revealed, setRevealed] = useState({});

  const allDone = TILES.every((key) => revealed[key]);

  // Champagne foil, painted a little deeper than the tile face beneath it so
  // there is an obvious surface to scratch.
  const paintFoil = useCallback((canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    const base = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    base.addColorStop(0, '#E9DAC0');
    base.addColorStop(0.45, '#D6BF96');
    base.addColorStop(1, '#E5D3B4');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Diagonal sheen, so the foil catches light like pressed paper.
    const sheen = ctx.createLinearGradient(0, rect.height, rect.width, 0);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0)');
    sheen.addColorStop(0.48, 'rgba(255, 253, 248, 0.42)');
    sheen.addColorStop(0.62, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = 'rgba(166, 133, 71, 0.16)';
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width; x += 7) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + rect.height, rect.height);
      ctx.stroke();
    }
  }, []);

  // Cleared share of the canvas, sampled on a stride rather than per pixel.
  const clearedPercentage = useCallback((canvas) => {
    const { width, height } = canvas;
    if (!width || !height) return 0;

    const { data } = canvas.getContext('2d').getImageData(0, 0, width, height);

    let cleared = 0;
    let total = 0;
    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        if (data[(y * width + x) * 4 + 3] < 128) cleared += 1;
        total += 1;
      }
    }
    return total ? (cleared / total) * 100 : 0;
  }, []);

  useEffect(() => {
    TILES.forEach((key) => {
      const canvas = canvasesRef.current[key];
      if (canvas) paintFoil(canvas);
    });

    const handleResize = () => {
      TILES.forEach((key) => {
        const canvas = canvasesRef.current[key];
        // Repainting a cleared tile would cover its value back up.
        if (canvas && !revealedRef.current[key]) paintFoil(canvas);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [paintFoil]);

  const scratchAt = useCallback((clientX, clientY) => {
    TILES.forEach((key) => {
      if (revealedRef.current[key]) return;

      const canvas = canvasesRef.current[key];
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // A small margin keeps the stroke continuous across the gaps.
      const inside =
        x >= -BRUSH_RADIUS &&
        y >= -BRUSH_RADIUS &&
        x <= rect.width + BRUSH_RADIUS &&
        y <= rect.height + BRUSH_RADIUS;

      if (!inside) {
        lastPointsRef.current[key] = null;
        return;
      }

      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = BRUSH_RADIUS * 2;

      const last = lastPointsRef.current[key];
      if (last) {
        // Join samples so a fast drag does not leave a dotted trail.
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      lastPointsRef.current[key] = { x, y };
    });
  }, []);

  const measure = useCallback(() => {
    const newlyDone = [];

    TILES.forEach((key) => {
      if (revealedRef.current[key]) return;
      const canvas = canvasesRef.current[key];
      if (!canvas) return;
      if (clearedPercentage(canvas) >= REVEAL_THRESHOLD) {
        revealedRef.current[key] = true;
        newlyDone.push(key);
      }
    });

    if (newlyDone.length) {
      setRevealed((prev) => {
        const next = { ...prev };
        newlyDone.forEach((key) => {
          next[key] = true;
        });
        return next;
      });
    }
  }, [clearedPercentage]);

  const revealAll = useCallback(() => {
    TILES.forEach((key) => {
      revealedRef.current[key] = true;
    });
    drawingRef.current = false;
    setRevealed({ day: true, month: true, year: true });
  }, []);

  const handlePointerDown = (e) => {
    if (allDone) return;
    drawingRef.current = true;
    lastPointsRef.current = {};
    e.currentTarget.setPointerCapture?.(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    // A ref, not state: a state value read inside this handler would be the
    // value from the render that created it, and drags would never register.
    if (!drawingRef.current || allDone) return;
    e.preventDefault();
    scratchAt(e.clientX, e.clientY);

    moveCountRef.current += 1;
    if (moveCountRef.current % SAMPLE_EVERY === 0) measure();
  };

  const handlePointerUp = (e) => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPointsRef.current = {};
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    measure();
  };

  return (
    <>
      {/*
        Warm flash across the whole viewport once the date is uncovered. Driven
        off allDone directly: the animation settles at opacity 0 and allDone
        never returns to false, so no separate state needs to track it.
      */}
      {allDone && (
        <Portal>
          <div
            aria-hidden="true"
            className="animate-reveal-flash pointer-events-none fixed inset-0 z-40 opacity-0"
            style={{
              background:
                'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(201,139,56,0.16) 0%, rgba(255,239,208,0.08) 38%, transparent 72%)',
            }}
          />
        </Portal>
      )}

      <SectionReveal>
        <section
          id="date"
          className="mx-auto w-full max-w-[560px] px-7 py-24 text-center sm:py-28"
        >
          <SectionHeading eyebrow={eyebrow} heading={heading} />

          <p className="mt-9 font-serif text-[18px] leading-[1.9] font-medium text-ink sm:text-[20px]">
            {prompt}
          </p>

          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="mx-auto mt-11 grid max-w-[400px] grid-cols-3 gap-2.5 select-none sm:gap-3.5"
            style={{ touchAction: allDone ? 'auto' : 'none' }}
          >
            {TILES.map((key) => (
              <div key={key} className="flex flex-col items-center">
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-xl"
                  style={{
                    background:
                      'radial-gradient(circle at 48% 32%, rgba(255,255,255,0.96) 0%, rgba(255,250,241,0.86) 34%, transparent 67%), linear-gradient(145deg, #FFFDF8 0%, #FAF1E5 48%, #EEDCC3 100%)',
                    boxShadow:
                      'inset 0 0 0 1px rgba(255,255,255,0.78), inset 0 -20px 32px rgba(184,119,35,0.055)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center px-1">
                    <span className="font-serif text-3xl leading-none font-medium text-ink sm:text-4xl">
                      {values[key]}
                    </span>
                  </div>

                  <motion.canvas
                    ref={(node) => {
                      canvasesRef.current[key] = node;
                    }}
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                    style={{ pointerEvents: 'none' }}
                    animate={{ opacity: revealed[key] ? 0 : 1 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                  />
                </div>

                <span className="mt-3 font-display text-[clamp(9px,2vw,11px)] text-rust uppercase [letter-spacing:4px] [text-shadow:0_1px_0_rgba(255,246,225,0.5)]">
                  {key}
                </span>
              </div>
            ))}
          </div>

          {/*
            Reserved height, so the section does not jump when the caption is
            swapped for the revealed date.
          */}
          <div className="mt-11 flex min-h-[7.5rem] flex-col items-center justify-start">
            {!allDone ? (
              <>
                <p className="font-serif text-[17px] font-medium text-gold">
                  ✦ {hint} ✦
                </p>
                {/* Keyboard and assistive tech route to the same outcome. */}
                <button
                  type="button"
                  onClick={revealAll}
                  className="mt-4 font-caps text-[0.58rem] tracking-[0.2em] text-gold-deep uppercase underline underline-offset-4 transition-colors hover:text-gold-deep"
                >
                  Reveal instead
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="flex flex-col items-center"
              >
                <span className="rule-fade w-40" />

                <p className="mt-6 font-caps text-[0.82rem] tracking-[0.2em] text-gold-deep uppercase sm:text-[0.95rem]">
                  {event.short}
                </p>

                <p className="mt-3 font-serif text-[18px] font-medium text-ink italic sm:text-[19px]">
                  {event.weekday} · Nikkah {event.time}
                </p>

                <span className="rule-fade mt-6 w-40" />
              </motion.div>
            )}
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
