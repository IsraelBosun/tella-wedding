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
import { DateReveal } from '@/components/invitation/DateReveal';
import { OurStorySection } from '@/components/invitation/OurStorySection';
import { JourneySection } from '@/components/invitation/JourneySection';
import { FamiliesSection } from '@/components/invitation/FamiliesSection';
import { DressCodeSection } from '@/components/invitation/DressCodeSection';
import { VenueSection } from '@/components/invitation/VenueSection';
import { GallerySection } from '@/components/invitation/GallerySection';
import { CountdownSection } from '@/components/invitation/CountdownSection';
import { GiftSection } from '@/components/invitation/GiftSection';
import { RSVPSection } from '@/components/invitation/RSVPSection';
import { ClosingSection } from '@/components/invitation/ClosingSection';

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
        <HeroSection data={data} />

        <DateReveal
          date={data.date}
          eyebrow={data.countdown.eyebrow}
          heading="When will it be?"
          prompt="Scratch the card below to find out."
        />

        <OurStorySection story={data.story} monogram={data.monogram} />

        <JourneySection
          journey={data.journey}
          venue={data.venue}
          date={eventDate}
        />

        <FamiliesSection
          families={data.families}
          groom={data.groom}
          bride={data.bride}
          bismillah={data.bismillah}
        />

        <DressCodeSection dressCode={data.dressCode} />

        <VenueSection venue={data.venue} />

        <GallerySection gallery={data.gallery} monogram={data.monogram} />

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
