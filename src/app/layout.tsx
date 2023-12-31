import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';
import { Open_Sans } from 'next/font/google';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: '기찬의 블로그',
    template: '기찬의 블로그 | %s',
  },
  description: '풀스택 개발자 엘리의 블로그',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={sans.className}>
      <body className='flex flex-col max-w-screen-2xl mx-auto' suppressHydrationWarning={true}>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

