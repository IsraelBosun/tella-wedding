'use client';

import { useSyncExternalStore } from 'react';
import { calculateCountdown } from '@/lib/utils';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };
const pad = (n) => n.toString().padStart(2, '0');

// The wall clock is an external mutable source, so it is read through
// useSyncExternalStore rather than a setState-on-tick effect.
function subscribeToSeconds(onChange) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

let cachedSecond = 0;
function getSecondSnapshot() {
  const second = Math.floor(Date.now() / 1000);
  // Cached so repeated reads inside one render return an identical value.
  if (second !== cachedSecond) cachedSecond = second;
  return cachedSecond;
}

// Server and first paint render zeroes, so hydration never mismatches.
function getServerSnapshot() {
  return null;
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      {/*
        The reference sets these in its script face. A calligraphic face has no
        tabular figures, so the row would twitch on every tick; the serif keeps
        the same warmth and holds still.
      */}
      <span className="tabular stamp font-serif text-[42px] leading-none font-medium sm:text-[56px]">
        {pad(value)}
      </span>
      <span className="eyebrow mt-3 text-[0.5rem] text-blue-ink sm:text-[0.55rem]">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection({ date, countdown }) {
  const second = useSyncExternalStore(
    subscribeToSeconds,
    getSecondSnapshot,
    getServerSnapshot,
  );

  const value = second === null ? ZERO : calculateCountdown(date);

  return (
    <SectionReveal>
      <section className="mx-auto w-full max-w-[560px] px-7 py-24 text-center sm:py-28">
        <SectionHeading eyebrow={countdown.eyebrow} heading={countdown.heading} />

        {/*
          Hairlines between the units rather than colons. A colon belongs to a
          clock; this is a number of days until a wedding, not a stopwatch.
        */}
        <div className="mt-12 flex items-start justify-center divide-x divide-blue-deep/20">
          <Unit value={value.days} label="Days" />
          <Unit value={value.hours} label="Hours" />
          <Unit value={value.minutes} label="Minutes" />
          <Unit value={value.seconds} label="Seconds" />
        </div>

        <p className="mx-auto mt-14 max-w-[42ch] font-serif text-[18px] leading-[1.9] font-medium text-ink sm:text-[20px]">
          {countdown.message}
        </p>
      </section>
    </SectionReveal>
  );
}
