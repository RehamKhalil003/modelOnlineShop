'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowUpRight } from 'lucide-react';

const promos = [
  {
    label: "Women's Collection",
    headline: 'Silk & Sensibility',
    sub: 'Draped silhouettes, fluid fabrics.',
    cta: 'Discover Women',
    href: '/products?category=women',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=80',
    gradient: 'linear-gradient(145deg,rgba(109,40,217,0.75) 0%,rgba(236,72,153,0.4) 100%)',
  },
  {
    label: "Men's Edit",
    headline: 'Effortless Authority',
    sub: 'Tailored precision for the modern man.',
    cta: 'Discover Men',
    href: '/products?category=men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
    gradient: 'linear-gradient(145deg,rgba(45,15,94,0.85) 0%,rgba(124,58,237,0.4) 100%)',
  },
];

export default function PromoSection() {
  return (
    <section className="py-16" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {promos.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.15}>
              <Link href={p.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative overflow-hidden rounded-3xl group cursor-pointer"
                  style={{
                    height: 480,
                    boxShadow: '0 8px 40px rgba(124,58,237,0.12)',
                  }}
                >
                  <Image src={p.image} alt={p.headline} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: p.gradient }} />

                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <p className="text-[10px] tracking-[0.45em] uppercase font-semibold mb-3"
                      style={{ color: 'rgba(249,168,212,0.8)' }}>{p.label}</p>
                    <h3 className="text-4xl font-bold text-white tracking-tight mb-3">{p.headline}</h3>
                    <p className="text-sm mb-8" style={{ color: 'rgba(225,220,240,0.7)' }}>{p.sub}</p>

                    <div className="inline-flex items-center gap-2 self-start group/cta">
                      <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white">{p.cta}</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/cta:scale-110"
                        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                        <ArrowUpRight size={13} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <motion.div className="absolute inset-0 rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                    style={{ boxShadow: 'inset 0 0 0 2px rgba(196,181,253,0.45)' }} />
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
