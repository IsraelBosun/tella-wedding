'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Fixed nav, revealed once the hero has scrolled past.
 *
 * On phones the six links are not squeezed into a 360px bar. The bar keeps the
 * monogram and the music control, and the sections open as a full-height ivory
 * menu in the same script face as the page, which is the treatment the rest of
 * the invitation would use if it had a menu.
 */
/*
  Listed in the order they appear on the page, so the bar reads as a map of
  the scroll rather than a menu of unrelated places. Dress Code earns the
  sixth slot: it is the thing guests come back to the link for.
*/
const LINKS = [
  { href: '#story', label: 'Our Story' },
  { href: '#nikkah', label: 'Nikkah' },
  { href: '#engagement', label: 'Engagement' },
  { href: '#location', label: 'Location' },
  { href: '#dress-code', label: 'Dress Code' },
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
        className="fixed inset-x-0 top-0 z-50 border-b border-wine-deep/15 bg-paper/85 backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5 sm:h-16 sm:px-7">
          {audio.hasAudio ? (
            <button
              type="button"
              onClick={audio.toggle}
              aria-label={
                audio.isPlaying ? 'Mute background music' : 'Play background music'
              }
              className="flex size-9 items-center justify-center rounded-full text-wine-deep transition-colors hover:text-wine-ink"
            >
              <MusicGlyph isPlaying={audio.isPlaying} />
            </button>
          ) : (
            // Keeps the monogram optically centred when there is no track.
            <span className="size-9" aria-hidden="true" />
          )}

          {/*
            shrink-0 and nowrap are load-bearing. "A & S" is three words to the
            browser, so the mark's min-content width is one glyph, which makes
            it the first thing to give when the row is over-subscribed. It gave
            by breaking in half across two lines while every link, being
            nowrap, held its ground. The mark is the one thing in the bar that
            must never break, so it is now the one thing that cannot.
          */}
          <a
            href="#top"
            className="monogram stamp shrink-0 text-[22px] whitespace-nowrap sm:text-[26px]"
            onClick={() => setMenuOpen(false)}
          >
            {monogram}
          </a>

          {/*
            One gap at every width. There used to be a wider one from lg up,
            which bought nothing: the bar is capped at max-w-3xl, so its inside
            is the same 712px on a 1024px screen and a 4K one, and widening
            five gaps by 8px each simply overran it by 8. At gap-5 the row
            measures about 680px and has 32px in hand. That margin is the whole
            budget for another link or a longer label.
          */}
          <div className="hidden items-center gap-5 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="eyebrow text-[0.66rem] whitespace-nowrap !tracking-[0.15em] text-wine-ink transition-colors hover:text-wine-ink"
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
              className="block h-px w-5 bg-wine-ink"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px w-5 bg-wine-ink"
            />
          </button>

          {/*
            There used to be a 36px spacer here on desktop, to balance the
            music control at the other end. It was the wrong thing to spend the
            width on. justify-between shares whatever is left over equally
            between the gaps, so holding 36px at the end left about 11px
            between the mark and the first link, and 11px beside 26px type
            reads as touching. Letting the links finish at the padding edge,
            exactly as the music control starts at it, is the balance the
            spacer was reaching for, and it hands those 36px back to the gaps:
            34px now instead of 11, on both sides of the mark.

            Nothing here changes the phone layout. The spacer was desktop-only,
            and below md the hamburger is what the mark is centred against.
          */}
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
                className="script-heading stamp relative z-10 py-2 text-[40px]"
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
