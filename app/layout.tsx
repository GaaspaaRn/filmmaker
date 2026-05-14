import type {Metadata} from 'next';
import { Roboto, Poetsen_One } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const poetsenOne = Poetsen_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poetsen',
});

export const metadata: Metadata = {
  title: 'CAUAHCM | Portfolio',
  description: 'FILMMAKER AND VIDEOMAKER SPECIALIZED IN PARTIES AND VIDEOCLIPS.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${roboto.variable} ${poetsenOne.variable}`}>
      <body className="font-sans antialiased bg-black text-white" suppressHydrationWarning>
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
