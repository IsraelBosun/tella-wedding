'use client';

import Image from 'next/image';
import { SectionReveal } from './SectionReveal';
import { OrnamentalDivider } from './OrnamentalDivider';

/**
 * The gift note, set on the reference's blank card.
 *
 * Like the arch card, the card is a fixed-ratio image and everything inside it
 * is sized in `cqw`, so the whole thing scales as one drawing. The gift list
 * link only appears once there is a list, because a dead "View Gift List" is
 * worse than no link at all.
 */
export function GiftSection({ gifts }) {
  if (!gifts) return null;

  return (
    <SectionReveal>
      <section
        id="gifts"
        className="mx-auto w-full max-w-[560px] px-7 py-24 sm:py-28"
      >
        <div className="@container relative mx-auto w-full max-w-[480px]">
          <Image
            src="/invitation/ornaments/card-blank.png"
            alt=""
            aria-hidden="true"
            width={1024}
            height={1536}
            draggable={false}
            className="h-auto w-full select-none"
          />

          {/*
            Two corner pieces on a diagonal, each straddling the card's gold
            rule rather than sitting inside it or hanging off it. The rule is
            3.1% in from the sides and 2.1% from the top and bottom (measured
            off card-blank.png), so a couple of percent of negative inset is
            all it takes for the flowers to cross it: the mass lands on the
            corner and the sprigs trail inward along both edges.

            The shapes are chosen for their corners, not just their size.
            corner-c has its flowers massed at its own top left with tendrils
            running down and right, and corner-b is its mirror for the bottom
            right. The bouquet and low spray that were here before are
            centre-weighted, which is why no amount of nudging made them sit
            on a corner properly.
          */}
          <Image
            src="/invitation/ornaments/floral-corner-c.png"
            alt=""
            aria-hidden="true"
            width={976}
            height={1068}
            draggable={false}
            className="pointer-events-none absolute top-[-2%] left-[-3%] w-[38%] select-none"
          />
          <Image
            src="/invitation/ornaments/floral-corner-b.png"
            alt=""
            aria-hidden="true"
            width={758}
            height={957}
            draggable={false}
            className="pointer-events-none absolute right-[-3%] bottom-[-2%] w-[44%] select-none"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-[16%] text-center">
            <h2 className="script-heading stamp text-[9cqw] leading-[1.2]">
              {gifts.eyebrow}
            </h2>

            <OrnamentalDivider size="sm" className="mt-[2cqw] !w-[34%]" />

            <p className="mt-[6cqw] max-w-[26ch] font-serif text-[4cqw] leading-[1.7] font-medium text-ink">
              {gifts.body}
            </p>

            {gifts.listUrl && (
              <a
                href={gifts.listUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="script-heading stamp mt-[6cqw] text-[6.5cqw] underline decoration-blue-deep/50 underline-offset-[0.22em]"
              >
                {gifts.listLabel}
              </a>
            )}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
