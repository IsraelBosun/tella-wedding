'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { PhotoFrame } from './PhotoFrame';

/**
 * Two frames, offset vertically rather than set in a neat row.
 *
 * An even grid of two photographs reads as a contact sheet. Dropping the second
 * frame by a third of its height from `sm` up is what makes the pair read as an
 * editorial spread, and the offset collapses to a plain stack on a phone.
 */
export function GallerySection({ gallery, monogram }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!gallery.photos?.length) return null;

  return (
    <SectionReveal>
      <section
        ref={ref}
        id="gallery"
        className="mx-auto w-full max-w-[720px] px-7 py-24 sm:py-28"
      >
        <SectionHeading eyebrow={gallery.eyebrow} heading={gallery.heading} />

        <div className="mt-14 flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-8">
          {gallery.photos.map((photo, index) => (
            <motion.div
              key={photo.alt}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                delay: index * 0.18,
                duration: 0.9,
                ease: 'easeOut',
              }}
              className={`flex-1 ${index % 2 === 1 ? 'sm:mt-16' : ''}`}
            >
              <PhotoFrame
                src={photo.src}
                alt={photo.alt}
                monogram={monogram}
                ratio={index % 2 === 1 ? 'aspect-3/4' : 'aspect-4/5'}
                sizes="(max-width: 640px) 86vw, 330px"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
