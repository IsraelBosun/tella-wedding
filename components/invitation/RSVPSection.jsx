'use client';

import { SectionReveal } from './SectionReveal';
import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * Two actions, no form.
 *
 * The couple published phone numbers and nothing else, so the honest thing is
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
    'flex flex-1 items-center justify-center gap-3 rounded-full px-8 py-4 font-caps text-[0.71rem] tracking-[0.2em] uppercase transition-colors';

  const skin = primary
    ? 'bg-blue-ink text-paper shadow-[0_10px_24px_-14px_rgba(39,69,94,0.9)] hover:bg-blue-deep'
    : 'border border-blue-deep/45 bg-shell/60 text-blue-ink hover:border-blue-deep hover:bg-shell';

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
        className="relative mx-auto w-full max-w-[560px] overflow-hidden px-7 pt-24 pb-36 text-center sm:pt-28 sm:pb-44"
      >
        <h2 className="script-heading stamp text-[42px] leading-[1.2] sm:text-[55px]">
          {rsvp.heading}
        </h2>

        <OrnamentalDivider size="md" className="mt-6" />

        <p className="mt-9 font-serif text-[20px] leading-[1.9] font-medium text-ink sm:text-[22px]">
          {rsvp.deadlineLabel}
        </p>

        {/*
          Every number is printed as well as wired up, because plenty of guests
          will forward this to someone who needs to write it down rather than
          tap it. They are links too, so a second number is reachable without
          going through the button, which can only dial one of them.
        */}
        <div className="mt-4 flex flex-col items-center gap-1">
          {rsvp.phones.map((phone) => (
            <a
              key={phone}
              href={tel(phone)}
              className="tabular font-caps text-[1.2rem] tracking-[0.14em] text-blue-ink transition-colors hover:text-blue-deep sm:text-[1.34rem]"
            >
              {phone}
            </a>
          ))}
        </div>

        <div className="relative mt-11 flex flex-col gap-3 sm:flex-row">
          <Action href={tel(rsvp.phones[0])} primary>
            Call to RSVP
          </Action>

          <Action href={whatsapp(rsvp.whatsapp, rsvp.whatsappMessage)} external>
            WhatsApp
          </Action>
        </div>

        <p className="script-heading stamp relative mt-14 text-[37px] sm:text-[45px]">
          {rsvp.closingLine}
        </p>
      </section>
    </SectionReveal>
  );
}
