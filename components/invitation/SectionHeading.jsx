import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * The one heading treatment every section uses, so the page reads as a single
 * printed piece rather than a stack of differently-styled blocks.
 *
 *   eyebrow   letterspaced Cinzel caps, quiet
 *   heading   large Imperial Script in foil gold, one or two lines
 *   divider   the shared diamond rule
 *
 * `heading` takes an array when the reference breaks a title across two lines
 * ("One covenant." / "One celebration."); the break is part of the composition,
 * not an accident of wrapping, so it is authored rather than left to the box.
 */
export function SectionHeading({
  eyebrow,
  heading,
  align = 'center',
  divider = true,
  className = '',
}) {
  const lines = Array.isArray(heading) ? heading : [heading];
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <header className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <p className="eyebrow text-gold-deep">{eyebrow}</p>
      )}

      <h2 className="script-heading mt-3 text-[40px] leading-[1.15] sm:text-[52px]">
        {lines.map((line, i) => (
          <span key={line} className="block foil">
            {line}
            {/* Keeps the two lines readable as one sentence for screen readers. */}
            {i < lines.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>

      {divider && <OrnamentalDivider size="md" className="mt-6" />}
    </header>
  );
}
