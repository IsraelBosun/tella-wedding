'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '@/lib/mockWedding';
import { formatEventDate } from '@/lib/utils';
import { useAmbientAudio } from '@/components/invitation/useAmbientAudio';
import { OpeningCover } from '@/components/invitation/OpeningCover';
import { NavBar } from '@/components/invitation/NavBar';
import { MusicToggle } from '@/components/invitation/MusicToggle';
import { ScrollProgress } from '@/components/invitation/ScrollProgress';
import { HeroSection } from '@/components/invitation/HeroSection';
import { FamiliesSection } from '@/components/invitation/FamiliesSection';
import { DateReveal } from '@/components/invitation/DateReveal';
import { OurStorySection } from '@/components/invitation/OurStorySection';
import { GallerySection } from '@/components/invitation/GallerySection';
import { JourneySection } from '@/components/invitation/JourneySection';
import { VenueSection } from '@/components/invitation/VenueSection';
import { DressCodeSection } from '@/components/invitation/DressCodeSection';
import { CountdownSection } from '@/components/invitation/CountdownSection';
import { GiftSection } from '@/components/invitation/GiftSection';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { ClosingSection } from '@/components/invitation/ClosingSection';

/**
 * The invitation itself, served at the root.
 *
 * It lived at /invite/[slug] while there was a notion of many invitations with
 * many slugs. There is one wedding and one link to hand out, so the extra
 * segment was two words of URL that earned nothing. The old path still
 * resolves, as a redirect, so any link already sent keeps working.
 */
export default function InvitationPage() {
  const [isOpened, setIsOpened] = useState(false);
  const data = weddingData;

  const names = `${data.groom.name} & ${data.bride.name}`;
  const eventDate = formatEventDate(data.date);

  // Owned here rather than inside a floating button, so the nav's ♫ can drive
  // the same single <audio> element.
  const audio = useAmbientAudio(data.media?.audio, isOpened);

  return (
    <div className="paper relative w-full bg-paper">
      {audio.element}

      <OpeningCover
        isOpened={isOpened}
        onOpen={() => setIsOpened(true)}
        onTap={audio.start}
        monogram={data.monogram}
        coverImage={data.media?.coverImage}
        coverVideo={data.media?.coverVideo}
      />

      {isOpened && <NavBar monogram={data.monogram} audio={audio} />}

      {/* Reading progress, a hairline above the nav. */}
      {isOpened && <ScrollProgress />}

      {/* Floating pause control, kept clear of the cover sequence. */}
      {isOpened && <MusicToggle audio={audio} />}

      {/* Kept mounted so the cover lifts off finished content, not a blank page. */}
      <motion.main
        initial={false}
        animate={{ opacity: isOpened ? 1 : 0 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: isOpened ? 0.2 : 0,
        }}
        aria-hidden={!isOpened}
        className="relative z-10 w-full"
      >
        {/*
          The order below is the argument of the page, so it is worth saying
          out loud. Four movements:

            you are invited   hero, then the arch card
            who we are        the date, the story, the photographs
            what happens      the running order, the place, the dress
            what to do        the countdown, the gifts, the RSVP

          The arch card leads because it is the invitation: the Bismillah,
          the formal wording and both houses. It used to sit sixth, which
          told a guest what time the Khutbah started before telling them
          they were invited at all.
        */}
        <HeroSection data={data} />

        <FamiliesSection
          families={data.families}
          groom={data.groom}
          bride={data.bride}
          bismillah={data.bismillah}
        />

        {/*
          Answers the question the card has just raised. "Save the Date" moved
          here from the countdown, because this is the save-the-date moment:
          it is where a guest first learns the day.
        */}
        <DateReveal
          date={data.date}
          eyebrow="Save the Date"
          heading="When will it be?"
          prompt="Scratch the card below to find out."
        />

        <OurStorySection story={data.story} monogram={data.monogram} />

        {/* Kept beside the story, so the two photograph moments are one beat
            rather than one of them stranded among the logistics. */}
        <GallerySection gallery={data.gallery} monogram={data.monogram} />

        <JourneySection
          journey={data.journey}
          venue={data.venue}
          date={eventDate}
        />

        {/* When it happens and where to go are one question, so they are
            adjacent, and the dress code closes the practical run. */}
        <VenueSection venue={data.venue} />

        <DressCodeSection dressCode={data.dressCode} />

        <CountdownSection date={data.date} countdown={data.countdown} />

        <GiftSection gifts={data.gifts} />

        <RSVPSection rsvp={data.rsvp} />

        <ClosingSection
          names={names}
          hashtag={data.hashtag}
          closing={data.closing}
        />
      </motion.main>
    </div>
  );
}
