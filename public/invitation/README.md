# Invitation asset slots

Drop real files here and point `media` (and the per-section `photo` / `src`
fields) in `lib/mockWedding.js` at them. Every slot is optional: when it is null
the matching component renders a designed placeholder rather than an empty
frame, so the page is presentable before a single asset exists.

## Slots

    images/cover.png        portrait cover card, ~440px wide on screen (media.coverImage)
    images/hero.jpg         9:16 poster frame for the hero clip  (media.heroImage)
    images/couple-1.webp    3:4 portrait for Our Story          (story.photo)
    images/couple-2.webp    3:4 portrait for the gallery        (gallery.photos[0].src)
    images/guest-attire.webp cutout, no frame, no background    (dressCode.illustration)
    video/opening.mp4       muted envelope clip, plays on tap   (media.coverVideo)
    images/venue-waterfront.jpg 4:3 photo of the venue, above the map (venue.image)
    video/hero-animation.mp4    9:16 muted loop behind the hero (media.heroVideo)
    audio/*.mp3             looping background track            (media.audio)

Setting `media.heroVideo` turns off the drawn arch and floral corners in the
hero, on the assumption the clip carries its own. Clear it to get them back.
The clip is shown as a centred 9:16 column rather than full bleed, so a wide
screen sees the whole card instead of a cropped band through its middle, and
nothing is laid over it.

Paths in the data file are absolute from /public, e.g. `/invitation/images/story.jpg`.

Shoot or crop to the ratios above. The frames are fixed-ratio so the layout
cannot shift when a photograph is swapped, which means an off-ratio file gets
cropped rather than resizing the section around it.

The ♫ control in the nav only appears once `media.audio` is set, so there is
never a music button over silence.

Do not reference the original site's CDN URLs from application code. The files
that are here now came from the reference site and are placeholders: replace
images/cover.png and video/opening.mp4 before this goes out, since both carry
another couple's monogram.

## Where the artwork came from

Everything under `ornaments/`, `motifs/`, `calligraphy/` and the two clips in
`video/` was taken from the reference site (webgencyinvitations.com/timelessgrace,
served from tildacdn and two R2 buckets). The originals are kept in
`_scratch/ref/assets/` with their CDN filenames, alongside `asset-urls.txt`,
which is the full list of 88 URLs the page loads.

Wired in:

    ornaments/arch.png              CuspedArch, and the ArchCard frame
    ornaments/card-blank.png        GiftSection card
    ornaments/floral-corner-a.png   FloralCorner (arch card, RSVP)
    ornaments/floral-bouquet.png    the khutbah motif
    ornaments/floral-corner-c.png   gift card top left corner
    ornaments/floral-corner-b.png   gift card bottom right corner
    ornaments/peony.png             rail centre node, and the photographs motif
    ornaments/divider-crest-alt.png BotanicalSprig
    ornaments/divider-thin.png      OrnamentalDivider size="sm"
    ornaments/divider-fleur.png     OrnamentalDivider size="md"
    ornaments/divider-plain.png     OrnamentalDivider size="lg"
    ornaments/drop-diamond.png      top of the Nikkah rail
    ornaments/drop-pin.png          bottom of the Nikkah rail
    motifs/nikkah-arch.png          GoldMotif "nikkah"      (Qur'an, Du'a)
    motifs/champagne.png            GoldMotif "celebration" (Guest Arrival)
    motifs/bride.png                GoldMotif "bride"       (The Nikkah, Dress Code)
    motifs/cloche.png               GoldMotif "dining"      (Refreshments)
    motifs/drums.png                GoldMotif "music"       (Engagement, Closing)
    video/hero-animation.mp4        hero backdrop
    video/opening.mp4               the tap-to-open clip

`SCHEDULE_MOTIFS` in components/invitation/ornaments/GoldMotif.jsx is what maps
a schedule entry to its emblem. There are five emblems and seven points in the
Nikkah, so the two floral motifs fill the two points that have no emblem of
their own, and the prayer arch is used twice, for the Qur'an recitation and the
Du'a. Both of those are prayer, so the repeat is the point rather than a gap.

Every frame on the page now holds a real photograph. `PhotoFrame` still draws
its engraved placeholder when a `src` is null, but nothing reaches that state:
the gallery was cut from two frames to one rather than left with an empty
second, because a designed placeholder is still a promise of a photograph that
is not there.

Downloaded but deliberately not rendered, because the content is wrong for this
couple rather than merely unstyled:

    images/venue.png       the Four Seasons Jumeirah, Dubai. Not Unilorin Dam.
                           Replaced by images/venue-waterfront.jpg, which is
                           the real place.
    images/dress-code.png  sherwani and lehenga. Replaced by
                           images/guest-attire.webp, which is Yoruba attire in
                           the couple's own two colours.
    images/gift-card.png   a gift-list note this invitation has no section for.
    images/cover.png       carries another couple's D&A monogram.
    video/opening.mp4      same D&A seal, in every frame.

The unused floral sprays (bouquet, corner-b, corner-c, corner-tall, spray-low,
spray-wide, peony) and dividers (crest, scroll, star, the three drops) are kept
as a set so a section can be given its own ornament without another download.
The calligraphy PNGs are unused: the Bismillah and the verse are live Arabic
text in Amiri, which scales and can be read aloud by a screen reader.
