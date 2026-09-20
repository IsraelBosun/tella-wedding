import { BotanicalSprig } from './BotanicalSprig';

/**
 * Placeholder for the printed cover card, shown until `media.coverImage` is set.
 *
 * Composition matches the reference: tall ivory paper, botanical sprays top and
 * bottom, a central wax-seal medallion carrying the monogram, and a lot of
 * negative space.
 */
export function CoverArtwork({ monogram, names, bismillah }) {
  return (
    /*
      Sized by height rather than width, so on a short phone the card shrinks
      instead of running under the tap cue. max-w-full then caps it on wide
      screens, and aspect-ratio derives the other dimension either way.
    */
    <div className="relative aspect-2/3 h-full max-w-full overflow-hidden bg-paper shadow-[0_24px_60px_-30px_rgba(122,35,53,0.5)]">
      {/* Double hairline frame, the way an engraved card is bordered. */}
      <span className="pointer-events-none absolute inset-3 border border-wine-deep/35" />
      <span className="pointer-events-none absolute inset-4.5 border border-wine-deep/20" />

      <div className="flex h-full flex-col items-center justify-between px-6 py-9 sm:px-8 sm:py-11">
        <div className="flex flex-col items-center gap-5">
          {bismillah && (
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] leading-[1.9] text-wine-ink sm:text-[17px]"
            >
              {bismillah}
            </p>
          )}
          <BotanicalSprig className="w-32 text-wine-deep sm:w-40" />
        </div>

        <div className="flex flex-col items-center">
          {/* Wax seal. */}
          <div className="relative flex size-28 items-center justify-center rounded-full bg-wine-ink shadow-[0_6px_14px_-6px_rgba(122,35,53,0.7)] sm:size-32">
            <span className="absolute inset-1.5 rounded-full border border-shell/45" />
            <span className="monogram text-[31px] text-shell sm:text-[37px]">
              {monogram}
            </span>
          </div>

          {names && (
            <>
              <span className="mt-7 h-px w-14 bg-wine-deep/50" />
              <span className="mt-5 font-caps text-[0.68rem] tracking-[0.28em] text-wine-ink uppercase sm:text-[0.76rem]">
                {names}
              </span>
            </>
          )}
        </div>

        <BotanicalSprig className="w-32 text-wine-deep sm:w-40" flip />
      </div>
    </div>
  );
}
