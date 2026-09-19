'use client';

import { SectionReveal } from './SectionReveal';
import { SectionHeading } from './SectionHeading';
import { PhotoFrame } from './PhotoFrame';

/**
 * The only section on the page set flush left rather than centred.
 *
 * That is deliberate: it is the one passage of continuous prose, and centring
 * three paragraphs of it would turn a story into a plaque. The pull quote is
 * the hinge between the prose and the photograph.
 */
export function OurStorySection({ story, monogram }) {
  return (
    <SectionReveal>
      <section id="story" className="mx-auto w-full max-w-[560px] px-7 py-24 sm:py-28">
        <SectionHeading eyebrow={story.eyebrow} heading={story.heading} />

        <div className="mt-12 space-y-6">
          {story.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-serif text-[20px] leading-[1.9] font-medium text-ink sm:text-[22px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/*
          Set larger than the prose around it, in the body face italic rather
          than the script. This line carries a borrowed word, "Wonderwall",
          and a swash cursive turned it into a puzzle at the exact moment the
          story lands. Italic at this size is still a change of voice.
        */}
        <blockquote className="my-14 flex flex-col items-center text-center">
          <span className="rule-fade w-24" />
          <p className="stamp-rose mt-7 font-serif text-[28px] leading-[1.45] font-medium italic sm:text-[35px]">
            &ldquo;{story.pullQuote}&rdquo;
          </p>
          <span className="rule-fade mt-7 w-24" />
        </blockquote>

        <p className="text-center font-serif text-[20px] leading-[1.9] font-medium text-ink sm:text-[22px]">
          {story.closing}
        </p>

        <PhotoFrame
          src={story.photo}
          alt={story.photoAlt}
          monogram={monogram}
          ratio="aspect-4/5"
          className="mt-14"
        />
      </section>
    </SectionReveal>
  );
}
