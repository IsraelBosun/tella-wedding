/**
 * Single source of truth for one invitation. Everything the page renders comes
 * from here, so this object is what a Supabase row will eventually populate.
 *
 * Media paths are local slots under /public/invitation. Any of them may be
 * null, and every component degrades to a designed placeholder rather than a
 * broken frame, so the page is presentable before a single asset exists.
 */
export const weddingData = {
  slug: 'abdulsalam-and-sofiyyah',
  monogram: 'A & S',
  hashtag: '#ASitshouldbe26',

  bismillah: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ',

  groom: { name: 'Abdulsalam', initial: 'A' },
  bride: { name: 'Sofiyyah', initial: 'S' },

  /** Local time, Nikkah start. Drives the scratch card and the countdown. */
  date: '2026-11-28T09:00:00',

  hero: {
    kicker: 'Nikkah followed by Engagement',
    place: 'Kwara State, Nigeria',
  },

  story: {
    eyebrow: 'Our Story',
    heading: ['From Unilorin', 'To forever.'],
    paragraphs: [
      'Some stories begin with a grand introduction. Ours began at the University of Ilorin.',
      'I met Sofiyyah and, from the beginning, there was something about her that stayed with me: her gentleness, her beauty, and the calmness she carried with her.',
      'Somewhere along the way, she became someone I could imagine building a life with.',
    ],
    pullQuote: 'Finally, your Wonderwall.',
    closing:
      "With Allah's blessing and surrounded by the people we love, we begin our next chapter.",
    photo: '/invitation/images/couple-1.webp',
    photoAlt: 'Abdulsalam and Sofiyyah, hand in hand, in pale blue and white',

    /*
      The two of them as children, set before the prose rather than after it,
      because they run ahead of the story the prose tells: it opens at the
      University of Ilorin and these are from long before that. Captioned,
      since a pair of childhood photographs is meaningless without knowing
      which is which, and the faces are decades away from the ones a guest
      knows. Clear `childhood` to drop the pair; the section handles its
      absence.
    */
    childhoodLabel: 'Long before Unilorin',
    childhood: [
      {
        src: '/invitation/images/groom-child.webp',
        caption: 'Abdulsalam',
        alt: 'Abdulsalam as a boy, in a navy jacket and a red tie',
      },
      {
        src: '/invitation/images/bride-child.webp',
        caption: 'Sofiyyah',
        alt: 'Sofiyyah as a small child, in a pale blue lace hijab',
      },
    ],
  },

  journey: {
    eyebrow: 'The Wedding Journey',
    heading: ['One covenant.', 'One celebration.'],
    intro:
      'Our day begins with the Nikkah and continues with a celebration of love, family and heritage. Approximately 1 to 1½ hours are set aside for the Nikkah, followed directly by the Engagement.',

    nikkah: {
      title: 'The Nikkah',
      time: '9:00 AM',
      note: 'Timing is arranged to keep the Nikkah within the planned 1½ hour maximum.',
      /** `motif` keys into components/invitation/ornaments/EventMotif.jsx. */
      schedule: [
        { time: '9:00 AM', title: 'Guest Arrival & Seating', motif: 'arrival' },
        { time: '9:10 AM', title: "Qur'an Recitation", motif: 'quran' },
        { time: '9:25 AM', title: 'Khutbah', motif: 'khutbah' },
        { time: '9:45 AM', title: 'The Nikkah', motif: 'nikkah' },
        { time: '10:05 AM', title: "Du'a", motif: 'dua' },
        { time: '10:15 AM', title: 'Family Photographs', motif: 'photographs' },
        { time: '10:30 AM', title: 'Transition & Refreshments', motif: 'refreshments' },
      ],
    },

    engagement: {
      title: 'Engagement',
      time: 'Following the Nikkah',
      intro:
        'A celebration of the coming together of two families, honouring Yoruba tradition and love.',
      /** Ordered but untimed: the Engagement runs by sequence, not by clock. */
      order: [
        'Opening Prayers & Welcome',
        'Grand Entrance & Greeting of the Families',
        'Formal Proposal Letter & Family Acceptance',
        'Entrance of the Bride',
        'Presentation & Blessing of the Eru Iyawo',
        'Customary Rites & Symbolic Dues',
        'Unveiling & Ring Presentation',
        'Final Blessings & Prayers',
        'Speeches',
        'Cake Cutting',
        'Celebration & Dancing',
      ],
    },
  },

  families: {
    eyebrow: 'The Families',
    heading: ['Two families.', 'One union.'],

    /** The arch card: the formal wording, the way a printed card would set it. */
    invite: {
      kicker: ['You are invited to the', 'Nikkah ceremony of'],
      groomRole: 'Son of',
      brideRole: 'Daughter of',
      joiner: 'With',
      greeting: 'Dear Friends and Family',
      body: "Join us for a day of love, prayers, du'as and unforgettable memories as we begin our forever.",
    },

    groom: {
      side: "Groom's Family",
      house: ['Okeolatella', 'Of Tella Agbenuaran Royal Dynasty'],
      place: 'Ilaro, Yewaland, Ogun State',
      note: 'The Tella family is a royal family from Ilaro, Ogun State.',
    },
    bride: {
      side: "Bride's Family",
      house: ['Alhaji Ali Olona Lineage', "& Mallam Muhammed Baba's Family"],
      place: 'Isale Taba Area, Saki, Oyo State',
      note: null,
    },
  },

  dressCode: {
    /* No eyebrow: the heading says it, and the reference sets it alone. */
    eyebrow: null,
    heading: 'Dress Code',
    /* Three lines, so the attire is set apart from the sentence. */
    invite: {
      lead: 'We kindly invite our guests in',
      highlight: 'Traditional or Formal Attire',
      trail: 'in the colours of the side you are joining.',
    },
    description:
      'Lace, Kampala, Aso Oke and other beautiful fabrics are all welcome.',
    shadesLabel: 'Recommended shades',
    /*
      One drawing for both sides, and it is the white and gold one. It is here
      for the garments rather than for the colours: agbada, buba, iro, gele and
      fila are what a guest is unsure about, and the colours are named and
      swatched per side below it. The alt text says so, so a screen reader is
      not told this is what everyone wears.
    */
    illustration: '/invitation/images/guest-attire-white-gold.webp',
    illustrationAlt:
      'Three couples in traditional Yoruba attire: agbada, buba and iro with gele and fila, shown here in white and gold.',

    /*
      The two sides wear different colours, so the section carries two sets
      rather than one. Each swatch is sampled off artwork rather than picked to
      look right on the page, so a guest holding a drawing against a chip is
      comparing a colour to itself.

      Each set runs as one range rather than two points, because a tailor needs
      somewhere to land between the named colours as well as on them.

      These are the guests' colours. They are the page's colours too now, which
      they were not before, but the traffic runs one way: the theme in
      app/globals.css is authored there and nothing here feeds it.
    */
    sides: [
      {
        who: "Bride's Guests",
        tone: 'gold',
        pair: 'White & Gold',
        swatches: [
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Ivory', hex: '#F2EAE5' },
          { name: 'Champagne', hex: '#E8CDAE' },
          { name: 'Light gold', hex: '#EAC289' },
          { name: 'Gold', hex: '#C79B64' },
          { name: 'Antique gold', hex: '#A67644' },
        ],
        guidance: [
          { who: 'For the Ladies', what: 'White Iro & Buba (or gown) with a Gold Gele' },
          { who: 'For the Gentlemen', what: 'White Agbada with a Gold Fila' },
        ],
      },
      {
        who: "Groom's Guests",
        tone: 'wine',
        pair: 'Wine & Dusty Rose',
        swatches: [
          { name: 'Blush rose', hex: '#E2C2B1' },
          { name: 'Dusty rose', hex: '#D2A49A' },
          { name: 'Deep rose', hex: '#C1968B' },
          { name: 'Light wine', hex: '#A76459' },
          { name: 'Wine', hex: '#903B47' },
          { name: 'Deep wine', hex: '#732E3B' },
        ],
        guidance: [
          { who: 'For the Ladies', what: 'Dusty Rose Iro & Buba (or gown) with a Wine Gele' },
          { who: 'For the Gentlemen', what: 'Wine Agbada with a Dusty Rose Fila' },
        ],
      },
    ],
  },

  venue: {
    eyebrow: 'Location',
    name: 'Unilorin Dam',
    address: 'Unilorin Lake, Ilorin 240102, Kwara State.',
    note: 'The waterfront setting will host both the Nikkah and the Engagement celebration.',
    /** The lakeside pavilion itself, shown above the map. */
    image: '/invitation/images/venue-waterfront.jpg',
    imageAlt: 'The open lakeside pavilion at Unilorin Dam, above water lilies.',
    /** Keyless embed form, so there is no API key to leak or expire. */
    mapUrl:
      'https://maps.google.com/maps?q=Unilorin%20Dam%2C%20Ilorin%2C%20Kwara%20State&t=&z=14&ie=UTF8&iwloc=&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Unilorin+Dam%2C+Ilorin%2C+Kwara+State',
  },

  gallery: {
    eyebrow: 'A Little More of Us',
    heading: 'Moments before forever.',
    /*
      One real photograph. The section used to carry two empty frames whose
      placeholder state was designed, but a designed placeholder is still a
      promise of a photograph that is not there, so the empty one is gone
      rather than dressed up.
    */
    photos: [
      {
        src: '/invitation/images/couple-2.webp',
        alt: 'Abdulsalam and Sofiyyah in matching teal aso ebi',
      },
    ],
  },

  countdown: {
    /*
      Not "Save the Date" any more. That is an instruction, and by the time a
      guest reaches the counter they have already read the date, the running
      order and the venue, so there is nothing left to save. The scratch card
      carries the date; this only carries how little time is left.
    */
    eyebrow: 'Not long now',
    heading: 'Until we say “Qubool.”',
    message:
      'We would be honoured to have you celebrate this beautiful beginning with us.',
  },

  rsvp: {
    heading: 'Confirm Your Attendance',
    closingLine: 'Hope to see you there',
    deadlineLabel: 'Kindly RSVP by November 1, 2026',
    /**
     * Both published numbers. The first is the one the Call button dials and
     * the one WhatsApp goes to, so order here is not cosmetic.
     */
    phones: ['09153448358', '08164373514'],
    /** E.164, required by wa.me. Nigeria is +234, dropping the trunk 0. */
    whatsapp: '2349153448358',
    whatsappMessage:
      "Assalamu alaikum! I'm responding to Abdulsalam & Sofiyyah's invitation for 28 November 2026.",
  },

  /*
    The gift card. Placeholder wording: it says only that presence is enough,
    which is true of any wedding. Set `listUrl` to show the link, or set the
    whole block to null to drop the section.
  */
  gifts: {
    eyebrow: 'Gift Preferences',
    heading: 'Your presence is the gift',
    body:
      "Your love, prayers and du'as mean the world to us. If you wish to bless us with a gift, we are grateful beyond words.",
    listLabel: 'View Gift List',
    listUrl: null,
  },

  closing: {
    footnote: 'With love, faith & family',
    dateStamp: '28.11.2026',
  },

  /**
   * Local asset slots. Drop real files in and the components pick them up with
   * no code change. Null means the component renders its placeholder.
   */
  media: {
    coverImage: '/invitation/images/cover.png',
    coverVideo: '/invitation/video/opening.mp4',
    // The clip behind the hero, 720x1280. It already carries its own arch,
    // lanterns and florals, so the drawn ornaments step aside when it is set,
    // and nothing is laid over it. The previous placeholder is still at
    // video/hero.mp4 if this one ever needs to be swapped back.
    heroVideo: '/invitation/video/hero-welcome.mp4',
    // Frame 0 of that clip, and not optional. A video element with no poster
    // paints nothing until it can play, and a browser that refuses to autoplay
    // fills that nothing with its own play button, which is what guests on
    // older phones were seeing instead of a hero.
    heroImage: '/invitation/images/hero.jpg',
    audio: '/invitation/audio/tellas-wedding-song.mp3',
  },
};
