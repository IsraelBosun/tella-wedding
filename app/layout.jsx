import {
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Imperial_Script,
  Rufina,
} from 'next/font/google';
import './globals.css';

// Headings and couple names. The reference uses Imperial Script throughout.
const imperialScript = Imperial_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-imperial-script',
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
  themeColor: '#FDF4EB',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${imperialScript.variable} ${cormorant.variable} ${cinzel.variable} ${rufina.variable} ${amiri.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
