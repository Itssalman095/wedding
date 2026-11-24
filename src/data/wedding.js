/**
 * ─────────────────────────────────────────────────────────────
 *  ALL EDITABLE WEDDING CONTENT LIVES IN THIS FILE.
 *  Change names, dates, venue, events, contacts… and you're done.
 *  Nothing else needs to be touched.
 * ─────────────────────────────────────────────────────────────
 */

const groom = {
  firstName: 'Imran',
  // TODO: replace with the groom's full name / family name if you like
  fullName: 'Imran',
  // TODO: replace with real parents' names
  parents: ['Mr. Abdul Karim', 'Mrs. Ayesha Karim'],
  relation: 'son of',
};

const bride = {
  firstName: 'Samra',
  fullName: 'Samra',
  // TODO: replace with real parents' names
  parents: ['Mr. Tariq Mahmood', 'Mrs. Shahnaz Mahmood'],
  relation: 'daughter of',
};

/* The date used for the live countdown.
   Format: YYYY-MM-DDTHH:mm:ss+05:00  (Pakistan time — adjust the offset if needed) */
const dateISO = '2027-02-20T16:00:00+05:00';

export const wedding = {
  /* ── Hero ─────────────────────────────────────────────── */
  bismillah: {
    // Set to false to hide the Bismillah entirely
    show: true,
    arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
  },

  // Set show:false to hide the "Together with their families" line
  intro: {
    show: true,
    text: 'Together with their families',
  },

  couple: {
    groom,
    bride,
    // The ampersand between the names, e.g. "&" or "and"
    joiner: '&',
  },

  /* ── Interface copy: headings, buttons, small labels ──── */
  copy: {
    cover: {
      eyebrow: 'The wedding of',
    },
    hero: {
      scrollHint: 'Scroll to open',
      scrollCelebrate: 'Scroll to celebrate',
      viewInvitation: 'View the invitation',
    },
    families: {
      eyebrow: 'With the blessings of our families',
      title: 'Two families, one celebration',
      groomRole: 'The Groom',
      brideRole: 'The Bride',
      lede: 'We warmly invite you to share in the joy of our wedding.',
    },
    date: {
      eyebrow: 'Save the date',
    },
    venue: {
      eyebrow: 'The venue',
      title: 'Where we celebrate',
      mapButton: 'Open in Google Maps',
    },
    schedule: {
      eyebrow: 'The celebrations',
      title: 'Days to remember',
    },
    compliments: {
      eyebrow: 'With love and gratitude',
    },
    rsvp: {
      eyebrow: 'RSVP',
      title: 'Will you join us?',
      lede: 'Your presence would mean the world to us. A quick message is all we need to save you a seat.',
      whatsappButton: 'Message on WhatsApp',
      callButton: 'Call us',
    },
    countdown: {
      aria: 'Countdown to the wedding',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      arrived: 'Alhamdulillah — the blessed day has arrived.',
    },
    closing: {
      eyebrow: 'A prayer for the journey ahead',
    },
  },

  date: {
    iso: dateISO,
    weekday: 'Saturday',
    day: '20',
    month: 'February',
    year: '2027',
    display: 'Saturday, 20 February 2027',
    short: '20 . 02 . 2027',
    time: 'Nikah at 4:00 PM',
    city: 'Lahore, Pakistan',
  },

  /* ── Venue ────────────────────────────────────────────── */
  venue: {
    name: 'The Grand Marquee',
    addressLines: ['Main Boulevard, Gulberg III', 'Lahore, Punjab, Pakistan'],
    note: 'Valet parking available at the main gate.',
    // Replace this with your venue's real Google Maps link if you have one
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('The Grand Marquee, Gulberg III, Lahore, Pakistan'),
  },

  /* ── Event schedule (shown as a timeline, in order) ───── */
  events: [
    {
      name: 'Mehndi',
      date: 'Friday, 19 February 2027',
      time: '6:00 PM onwards',
      place: 'Family Residence',
      address: 'House 00, Street 00, DHA Phase V, Lahore',
      note: 'An evening of music, henna and laughter.',
    },
    {
      name: 'Nikah',
      date: 'Saturday, 20 February 2027',
      time: '4:00 PM',
      place: 'The Grand Marquee',
      address: 'Main Boulevard, Gulberg III, Lahore',
      note: 'Kindly arrive by 3:30 PM. Dinner will follow.',
    },
    {
      name: 'Walima',
      date: 'Sunday, 21 February 2027',
      time: '7:00 PM onwards',
      place: 'The Grand Marquee',
      address: 'Main Boulevard, Gulberg III, Lahore',
      note: 'Reception and dinner.',
    },
  ],

  /* ── Family / compliments ─────────────────────────────── */
  compliments: {
    title: 'With best compliments from',
    families: [
      'Mr. & Mrs. Abdul Karim',
      'Mr. & Mrs. Tariq Mahmood',
      'Mr. & Mrs. Hamza Sheikh',
      'Mr. & Mrs. Bilal Ahmed',
      'Dr. & Mrs. Farhan Siddiqui',
      'Mr. & Mrs. Usman Raza',
      'Mr. & Mrs. Adnan Qureshi',
      'Mr. & Mrs. Kamran Malik',
    ],
  },

  /* ── RSVP / contact ───────────────────────────────────── */
  rsvp: {
    // WhatsApp number in international format, digits only (no +, no spaces)
    whatsapp: '923001234567',
    // Same number, human friendly, for the "Call" button
    phone: '+92 300 1234567',
    message:
      'Assalam-o-Alaikum! We are delighted to confirm our attendance at Imran & Samra’s wedding.',
    deadline: 'Kindly RSVP by 10 February 2027',
    note: 'For any questions or help with directions, feel free to reach out.',
  },

  /* ── Closing ──────────────────────────────────────────── */
  closing: {
    verse: 'And among His signs is this, that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    verseRef: 'Surah Ar-Rum · 30:21',
    line: 'We look forward to celebrating this blessed beginning with you.',
  },

  footer: {
    monogram: 'I & S',
    note: 'With love and prayers',
  },

  /* ── Music (optional) ─────────────────────────────────── */
  music: {
    // Drop an MP3 here: /public/audio/wedding-theme.mp3
    // Leave empty to hide the button automatically.
    src: '/audio/wedding-theme.mp3',
    label: 'Play music',
  },

  /* ── Share / SEO ──────────────────────────────────────── */
  og: {
    title: 'Imran & Samra — Wedding Invitation',
    description:
      'Together with their families, Imran & Samra invite you to celebrate their wedding on Saturday, 20 February 2027.',
  },
};

export default wedding;
