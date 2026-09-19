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
      house: 'Tella Agbenuaran Royal Dynasty',
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
    /* Three lines, so the colours can be set apart from the sentence. */
    invite: {
      lead: 'We kindly invite our guests to dress in',
      highlight: 'Dusty Blue & Dusty Rose',
      trail: 'traditional or formal attire.',
    },
    description:
      'Lace, Kampala, Aso Oke and other beautiful fabrics are all welcome.',
    shadesLabel: 'Recommended shades',
    illustration: '/invitation/images/guest-attire.webp',
    illustrationAlt:
      'Three couples in traditional Yoruba attire: dusty blue agbada and buba with dusty rose iro, gele and fila, finished in gold.',
    /*
      The couple's two colours, each with one lighter and one deeper shade
      beside it so a tailor has a range to match rather than a single reading
      off a phone screen. The two middle chips are the exact colours.
    */
    colors: [
      { name: 'Powder blue', hex: '#C7DDEC' },
      { name: 'Dusty blue', hex: '#7BB0D6' },
      { name: 'Deep blue', hex: '#4F7591' },
      { name: 'Blush', hex: '#F0D5D2' },
      { name: 'Dusty rose', hex: '#DDA6A2' },
      { name: 'Deep rose', hex: '#B5736C' },
    ],
    guidance: [
      { who: 'For the Ladies', what: 'Dusty Rose Iro & Buba (or gown) with a Dusty Blue Gele' },
      { who: 'For the Gentlemen', what: 'Dusty Blue Agbada with a Dusty Rose Fila' },
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
    phone: '09153448358',
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
    heroVideo: '/invitation/video/hero-animation.mp4',
    heroImage: null, // poster frame, shown until the clip can paint
    audio: '/invitation/audio/tellas-wedding-song.mp3',
  },
};
