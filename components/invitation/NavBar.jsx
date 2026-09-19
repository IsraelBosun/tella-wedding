'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Fixed nav, revealed once the hero has scrolled past.
 *
 * On phones the five links are not squeezed into a 360px bar. The bar keeps the
 * monogram and the music control, and the sections open as a full-height ivory
 * menu in the same script face as the page, which is the treatment the rest of
 * the invitation would use if it had a menu.
 */
const LINKS = [
  { href: '#story', label: 'Our Story' },
  { href: '#nikkah', label: 'Nikkah' },
  { href: '#engagement', label: 'Engagement' },
  { href: '#location', label: 'Location' },
  { href: '#rsvp', label: 'RSVP' },
];

// Roughly one viewport: the nav stays out of the way for the whole opening.
const REVEAL_AT = 520;

function MusicGlyph({ isPlaying }) {
  return (
    <span className="relative flex size-4 items-center justify-center">
      <span className="text-[15px] leading-none">♫</span>
      {/* A struck-through note reads as muted faster than swapping the glyph. */}
      {!isPlaying && (
        <span className="absolute h-[1.2px] w-5 rotate-[-38deg] bg-current" />
      )}
    </span>
  );
}

export function NavBar({ monogram, audio }) {
  const [shown, setShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > REVEAL_AT);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The menu covers the page, so the page behind it must not scroll under it.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: shown || menuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-blue-deep/15 bg-paper/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5 sm:h-16 sm:px-7">
          {audio.hasAudio ? (
            <button
              type="button"
              onClick={audio.toggle}
              aria-label={
                audio.isPlaying ? 'Mute background music' : 'Play background music'
              }
              className="flex size-9 items-center justify-center rounded-full text-blue-deep transition-colors hover:text-blue-ink"
            >
              <MusicGlyph isPlaying={audio.isPlaying} />
            </button>
          ) : (
            // Keeps the monogram optically centred when there is no track.
            <span className="size-9" aria-hidden="true" />
          )}

          <a
            href="#top"
            className="monogram stamp text-[20px] sm:text-[23px]"
            onClick={() => setMenuOpen(false)}
          >
            {monogram}
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="eyebrow text-[0.56rem] text-blue-ink transition-colors hover:text-blue-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex size-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-5 bg-blue-ink"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-5 bg-blue-ink"
            />
          </button>

          {/* Balances the music control on desktop, where there is no toggle. */}
          <span className="hidden size-9 md:block" aria-hidden="true" />
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="paper fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-paper md:hidden"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.08, duration: 0.45 }}
                className="script-heading stamp relative z-10 py-2 text-[38px]"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
