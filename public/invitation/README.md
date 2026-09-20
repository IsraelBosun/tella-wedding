# Invitation asset slots

Drop real files here and point `media` (and the per-section `photo` / `src`
fields) in `lib/mockWedding.js` at them. Every slot is optional: when it is null
the matching component renders a designed placeholder rather than an empty
frame, so the page is presentable before a single asset exists.

## Slots

    images/cover.png        portrait cover card, ~440px wide on screen (media.coverImage)
    images/hero.jpg         9:16 poster frame for the hero clip  (media.heroImage)
    images/couple-1.webp    3:4 portrait for Our Story          (story.photo)
    images/groom-child.webp 3:4 childhood photo, captioned      (story.childhood[0])
    images/bride-child.webp 3:4 childhood photo, captioned      (story.childhood[1])
    images/couple-2.webp    3:4 portrait for the gallery        (gallery.photos[0].src)
    images/guest-attire-white-gold.webp cutout, no frame, no background (dressCode.illustration)
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

Do not reference the original site's CDN URLs from application code.

## The seal

images/cover.png and video/opening.mp4 came from the reference site carrying
its couple's D&A monogram. Both have been re-lettered to A&S in place, so the
seal now reads the same as `monogram` in lib/mockWedding.js and as the drawn
EnvelopeArtwork fallback.

The scripts that did it are in `_scratch/env/`, and are worth keeping because
the same run re-letters both files for any pair of initials: `cover.py` for the
still, `render_video.py` for all 196 frames of the clip. In outline, the old
gold is masked and the wax under it rebuilt by diffusion from the rim, with the
engraved ring put back as a function of radius alone, since no letter is
radially symmetric. The new initials are set in Petit Formal Script, turned
into a height map and lit, so they are relieved metal rather than flat type.
In the clip the seal is tracked per frame for position, width and height
separately, because the flap tilts as it opens and the seal foreshortens.

Two things there are easy to get wrong and are commented at length in the
source: the mark is lit off the old gold rather than off the wax around it (at
t=2.8s a highlight sweeps the seal, and the wax dims while the gold flares), and
the encode must not pass `-shortest`, which cuts the video to the shorter audio
track and throws away the last four frames of the flap opening.

Petit Formal Script is the face app/layout.jsx says it wants but could not
fetch, because next/font/google reaches for fonts.gstatic.com, which this
machine cannot reach. The copy under `_scratch/env/fonts/` came from jsdelivr,
which it can. That is only a build-time problem for the site's own CSS; nothing
here is affected, since the letters are baked into the two files.

## Guest attire

images/guest-attire-white-gold.webp is cut from tella-wedding-guests.jpg at the
repo root, by `_scratch/env/guests.py`. It is worth keeping that script: the
couple have changed the guest colours once already, and the same illustration
exists in more than one colourway (tella_guest_dress.png is the earlier blue
and rose, which was images/guest-attire.webp until it was dropped).

The filename carries the colourway on purpose. If it changes again, write the
new file under a new name rather than over this one: browsers and Next's image
optimiser both cache on the URL, so overwriting in place leaves the old drawing
on screen and looks exactly like a change that did not take.

The one thing that matters in there is how the background comes off. The guests
are dressed in white on a white ground, so any threshold on whiteness takes the
garments with the backdrop. What separates them is connectivity, not colour:
the backdrop is a single region running to the edge of the frame and every
white garment is an island inside the drawing, so only the near-white
components that touch the border are dropped.

The chips under the drawing are sampled from artwork rather than chosen to sit
beside it, so a guest holding a drawing against a swatch is comparing a colour
to itself.

There are two sets of them now, because the two sides are asked for different
colours: the bride's guests in white and gold, the groom's in wine and dusty
rose. The one drawing serves both and is there for the garments rather than
the colours, which is what its alt text says.

The page's own palette was changed to match, so wine, dusty rose, gold and
white are now the site's colours as well as the guests'. The traffic still
runs one way: app/globals.css is authored on its own and nothing in
dressCode feeds it.

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
                           images/guest-attire-white-gold.webp, Yoruba attire in
                           the white and gold the guests are asked to wear.
    images/gift-card.png   a gift-list note this invitation has no section for.

The unused floral sprays (bouquet, corner-b, corner-c, corner-tall, spray-low,
spray-wide, peony) and dividers (crest, scroll, star, the three drops) are kept
as a set so a section can be given its own ornament without another download.
The calligraphy PNGs are unused: the Bismillah and the verse are live Arabic
text in Amiri, which scales and can be read aloud by a screen reader.
