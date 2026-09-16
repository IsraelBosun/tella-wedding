# Invitation asset slots

Drop real files here and point `media` (and the per-section `photo` / `src`
fields) in `lib/mockWedding.js` at them. Every slot is optional: when it is null
the matching component renders a designed placeholder rather than an empty
frame, so the page is presentable before a single asset exists.

## Slots

    images/cover.jpg        portrait cover card, ~440px wide on screen (media.coverImage)
    images/story.jpg        4:5 portrait for Our Story          (story.photo)
    images/dress-code.jpg   4:5 attire illustration             (dressCode.photo)
    images/gallery-1.jpg    4:5 portrait                        (gallery.photos[0].src)
    images/gallery-2.jpg    3:4 portrait                        (gallery.photos[1].src)
    video/opening.mp4       short muted envelope clip on tap    (media.coverVideo)
    audio/ambient.mp3       looping background track            (media.audio)

Paths in the data file are absolute from /public, e.g. `/invitation/images/story.jpg`.

Shoot or crop to the ratios above. The frames are fixed-ratio so the layout
cannot shift when a photograph is swapped, which means an off-ratio file gets
cropped rather than resizing the section around it.

The ♫ control in the nav only appears once `media.audio` is set, so there is
never a music button over silence.

Do not reference the original site's CDN URLs from application code.
