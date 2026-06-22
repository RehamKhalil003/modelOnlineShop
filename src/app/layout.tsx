import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import CustomCursor from '@/components/animations/CustomCursor';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'MODEL — Premium Fashion',
  description: 'MODEL — the destination for vibrant, premium fashion. Curated pieces for the modern woman.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} style={{ background: 'var(--bg-page)', color: 'var(--text-dark)' }}>
        <Providers>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
