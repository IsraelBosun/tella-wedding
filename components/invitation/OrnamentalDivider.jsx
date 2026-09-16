/**
 * Hairline, centre diamond, hairline. The diamond echoes the one at the join of
 * the BotanicalSprig, so dividers and ornaments read as one family.
 */
const SIZES = {
  sm: { rule: 'w-8', diamond: 'size-1', gap: 'gap-2.5' },
  md: { rule: 'w-12', diamond: 'size-1.5', gap: 'gap-3' },
  lg: { rule: 'w-20', diamond: 'size-2', gap: 'gap-4' },
};

export function OrnamentalDivider({ size = 'md', className = '' }) {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center ${s.gap} ${className}`}
    >
      <span className={`h-px ${s.rule} bg-gold/45`} />
      <span className={`${s.diamond} rotate-45 bg-gold/80`} />
      <span className={`h-px ${s.rule} bg-gold/45`} />
    </div>
  );
}
