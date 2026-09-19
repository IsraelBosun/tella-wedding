import {
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Great_Vibes,
  Rufina,
} from 'next/font/google';
import './globals.css';

/*
  Headings and couple names.

  Third face here, and the reason each one was dropped is the same: the capital
  letters. Imperial Script had hairline strokes and looping joins. Great Vibes
  was legible in the lowercase, but it draws its capital A as an enlarged
  single-storey "a" with a tall entry stroke, so the groom's own name opened on
  what looked like a small letter.

  The intended replacement is Petit Formal Script, which is built on copperplate
  like the others but keeps the roman skeleton in its capitals: A has a real
  apex and crossbar, so it cannot be read as anything else. Swapping to it needs
  one fetch from Google Fonts, which this machine could not reach at the time of
  writing, and an un-downloadable family is a hard build error rather than a
  fallback. Change both the import and the call below once the network is back.
*/
const scriptFace = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script-face',
  display: 'swap',
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
      className={`${scriptFace.variable} ${cormorant.variable} ${cinzel.variable} ${rufina.variable} ${amiri.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
