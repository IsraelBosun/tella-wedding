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
    heading: ['From Unilorin', 'to forever.'],
    paragraphs: [
      'Some stories begin with a grand introduction. Ours began at the University of Ilorin.',
      'I met Sofiyyah and, from the beginning, there was something about her that stayed with me: her gentleness, her beauty, and the calmness she carried with her.',
      'Somewhere along the way, she became someone I could imagine building a life with.',
    ],
    pullQuote: 'Finally, your WONDERWALL.',
    closing:
      "With Allah's blessing and surrounded by the people we love, we begin our next chapter.",
    photo: null, // /invitation/images/story.jpg
    photoAlt: 'Abdulsalam and Sofiyyah in traditional attire',
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
    eyebrow: 'Dress Code',
    heading: 'Come dressed in white.',
    description:
      'Elegant traditional or formal attire. Lace, Kampala and other beautiful white fabrics are welcome.',
    /** White on gold, the two colours the couple actually asked for. */
    colors: [
      { name: 'Ivory', hex: '#FFFFFF' },
      { name: 'Pearl', hex: '#FBF7F1' },
      { name: 'Champagne', hex: '#F3E7D2' },
      { name: 'Soft gold', hex: '#E4C88E' },
      { name: 'Gold', hex: '#C9A44C' },
      { name: 'Antique gold', hex: '#A8842F' },
    ],
    guidance: [
      { who: 'For the Ladies', what: 'White Iro & Buba (or gown) with Gold Gele' },
      { who: 'For the Gentlemen', what: 'White Agbada with Gold Fila' },
    ],
    photo: null, // /invitation/images/dress-code.jpg
    photoAlt:
      'Illustrative example of a Yoruba man in a white agbada and gold fila, and a Yoruba woman in a white lace gown with a gold gele',
  },

  venue: {
    eyebrow: 'Location',
    name: 'Unilorin Dam',
    address: 'Unilorin Lake, Ilorin 240102, Kwara State.',
    note: 'The waterfront setting will host both the Nikkah and the Engagement celebration.',
    /** Keyless embed form, so there is no API key to leak or expire. */
    mapUrl:
      'https://maps.google.com/maps?q=Unilorin%20Dam%2C%20Ilorin%2C%20Kwara%20State&t=&z=14&ie=UTF8&iwloc=&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Unilorin+Dam%2C+Ilorin%2C+Kwara+State',
  },

  gallery: {
    eyebrow: 'A Little More of Us',
    heading: 'Moments before forever.',
    /** Each entry may have a null src; the frame is designed to stand empty. */
    photos: [
      { src: null, alt: 'Abdulsalam and Sofiyyah in white' },
      { src: null, alt: 'Abdulsalam and Sofiyyah in traditional attire' },
    ],
  },

  countdown: {
    eyebrow: 'Save the Date',
    heading: 'Until we say “Qubool.”',
    message:
      'We would be honoured to have you celebrate this beautiful beginning with us.',
  },

  rsvp: {
    deadlineLabel: 'Kindly RSVP by November 1, 2026',
    phone: '09153448358',
    /** E.164, required by wa.me. Nigeria is +234, dropping the trunk 0. */
    whatsapp: '2349153448358',
    whatsappMessage:
      "Assalamu alaikum! I'm responding to Abdulsalam & Sofiyyah's invitation for 28 November 2026.",
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
    coverImage: null, // /invitation/images/cover.jpg
    coverVideo: null, // /invitation/video/opening.mp4
    heroImage: null, // /invitation/images/hero.jpg
    audio: null, // /invitation/audio/ambient.mp3
  },
};
