import {
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
  Rufina,
} from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

/*
  Headings and couple names.

  Third face here, and what sank the earlier two was the capitals. Imperial
  Script had hairline strokes and looping joins. Great Vibes is kept because it
  is right everywhere else, but it has the same weakness in one letter: it
  draws its capital A as an enlarged single-storey "a" with a tall entry
  stroke, so the groom's own name opened on what looked like a small letter.

  Rather than change the face, which would have restyled every heading on the
  site to fix one letter, the A alone is borrowed from elsewhere. See capitalA
  below.
*/
const scriptFace = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script-face',
  display: 'swap',
});

/*
  One glyph: the capital A that Great Vibes cannot draw legibly.

  This is a font file holding a single letter, and it goes in front of Great
  Vibes in the --font-script stack. `unicode-range` is what keeps it to that
  one letter: the browser takes U+0041 from here and every other character
  from Great Vibes, so nothing else on the page moves. It also means the file
  is only fetched by a page that actually sets a script capital A.

  Alex Brush was chosen off a comparison of eleven scripts (the sheet and the
  script that drew it are in _scratch/env/). What decides this is not the
  letter, it is the join. Great Vibes runs an exit stroke out of its A into the
  next letter, a borrowed A does not, and most candidates leave the word split
  open at the seam. Alex Brush is within 0.02em of closing it on its own
  metrics, and matches Great Vibes on weight, slant and stroke contrast, so
  there is nothing to correct.

  size-adjust stands the borrowed A at the same ink height as the one it
  replaces, 0.84em. Without it the A is about 5% short and reads as a slip
  rather than as a letter.

  The file is Alex Brush (OFL, licence alongside it) subsetted to U+0041 alone,
  which is 2KB rather than 113KB. Regenerate with:

      python -m fontTools.subset AlexBrush-Regular.ttf --unicodes=U+0041 \
          --output-file=app/fonts/AlexBrush-CapitalA.ttf --no-hinting

  adjustFontFallback is off because a metric-matched fallback for a
  single-glyph face is meaningless: Great Vibes is standing right behind it.
*/
const capitalA = localFont({
  src: './fonts/AlexBrush-CapitalA.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-script-a',
  display: 'swap',
  adjustFontFallback: false,
  declarations: [
    { prop: 'unicode-range', value: 'U+0041' },
    { prop: 'size-adjust', value: '105.7%' },
  ],
});

// Body copy. Stands in for Canela Light, which is not freely licensed.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  // 300 is deliberately absent: it is unreadable on this ground at body size.
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Letterspaced uppercase micro labels: the cover cue and every section eyebrow.
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

// DAY / MONTH / YEAR labels on the scratch tiles.
const rufina = Rufina({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rufina',
  display: 'swap',
});

// The Bismillah. Amiri is a Naskh face, so it sets the verse the way it is
// printed rather than the way a Latin serif would fake it.
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata = {
  title: 'Abdulsalam & Sofiyyah | 28 November 2026',
  description:
    'Nikkah followed by Engagement. Saturday 28 November 2026, Unilorin Dam, Ilorin, Kwara State.',
  openGraph: {
    title: 'Abdulsalam & Sofiyyah',
    description:
      'Nikkah followed by Engagement. Saturday 28 November 2026, Unilorin Dam, Kwara State.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FBF8F6',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${scriptFace.variable} ${capitalA.variable} ${cormorant.variable} ${cinzel.variable} ${rufina.variable} ${amiri.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
