'use client';
import Link from 'next/link';
import { Globe, AtSign, Share2, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12" style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Top gradient line */}
        <div className="h-px w-full mb-14"
          style={{ background: 'linear-gradient(to right,transparent,rgba(124,58,237,0.4),rgba(236,72,153,0.3),transparent)' }} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <p className="text-2xl tracking-[0.45em] uppercase font-bold mb-4"
              style={{ background: 'linear-gradient(135deg,#C4B5FD,#F9A8D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              MODEL
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(139,92,246,0.55)' }}>
              The destination for premium fashion. Curated pieces from the world&apos;s most coveted designers.
            </p>
            <div className="flex gap-3">
              {[Globe, AtSign, Share2, Play].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid rgba(139,92,246,0.2)', color: 'rgba(139,92,246,0.5)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#F5F3FF';
                    el.style.borderColor = 'rgba(196,181,253,0.45)';
                    el.style.background = 'rgba(124,58,237,0.15)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'rgba(139,92,246,0.5)';
                    el.style.borderColor = 'rgba(139,92,246,0.2)';
                    el.style.background = 'transparent';
                  }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Shop', links: ['Women', 'Men', 'Shoes', 'Accessories', 'Sport', 'New Arrivals', 'Sale'] },
            { title: 'Help', links: ['Size Guide', 'Shipping Info', 'Returns', 'Track Order', 'FAQ', 'Contact Us'] },
            { title: 'Company', links: ['About MODEL', 'Careers', 'Sustainability', 'Press', 'Privacy Policy', 'Terms'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
                style={{ color: 'rgba(196,181,253,0.6)' }}>{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(139,92,246,0.45)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C4B5FD')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.45)')}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(139,92,246,0.3)' }}>© 2024 MODEL. All rights reserved.</p>
          <p className="text-xs tracking-wider" style={{ color: 'rgba(139,92,246,0.3)' }}>
            Crafted with passion. Designed for you.
          </p>
        </div>
      </div>
    </footer>
  );
}
