'use client';

import { SectionReveal } from './SectionReveal';
import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * Two actions, no form.
 *
 * The couple published a phone number and nothing else, so the honest thing is
 * to hand the visitor straight to the dialler or to WhatsApp with the message
 * already written. There is no backend to go down, no submission to be lost,
 * and it works on the patchy connections a lot of these guests will be on.
 */
function tel(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function whatsapp(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function Action({ href, external = false, children, primary = false }) {
  const base =
    'flex flex-1 items-center justify-center gap-3 rounded-full px-8 py-4 font-caps text-[0.6rem] tracking-[0.2em] uppercase transition-colors';

  const skin = primary
    ? 'bg-gold text-cream hover:bg-gold-deep'
    : 'border border-gold/45 bg-cream/60 text-gold-deep hover:border-gold hover:bg-cream';

  return (
    <a
      href={href}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : undefined)}
      className={`${base} ${skin}`}
    >
      {children}
    </a>
  );
}

export function RSVPSection({ rsvp }) {
  return (
    <SectionReveal>
      <section
        id="rsvp"
        className="mx-auto w-full max-w-[560px] px-7 py-24 text-center sm:py-28"
      >
        <h2 className="script-heading foil text-[44px] sm:text-[56px]">RSVP</h2>

        <OrnamentalDivider size="md" className="mt-6" />

        <p className="mt-9 font-serif text-[18px] leading-[1.9] font-medium text-ink sm:text-[20px]">
          {rsvp.deadlineLabel}
        </p>

        {/*
          The number is shown as text as well as wired to the buttons, because
          plenty of guests will forward this to someone who needs to write it
          down rather than tap it.
        */}
        <p className="tabular mt-4 font-caps text-[1.05rem] tracking-[0.14em] text-gold-deep sm:text-[1.2rem]">
          {rsvp.phone}
        </p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row">
          <Action href={tel(rsvp.phone)} primary>
            Call to RSVP
          </Action>

          <Action href={whatsapp(rsvp.whatsapp, rsvp.whatsappMessage)} external>
            WhatsApp
          </Action>
        </div>
      </section>
    </SectionReveal>
  );
}
