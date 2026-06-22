'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80',
    eyebrow: 'New Season Drop',
    title: ['Define', 'Your Style'],
    sub: 'The SS 2024 collection is here.',
    tag: 'Up to 40% off',
    href: '/products',
    cta: 'Shop Collection',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=80',
    eyebrow: "Women's Edit",
    title: ['Dressed', 'to Thrill'],
    sub: 'Effortlessly elegant. Uniquely you.',
    tag: 'New Arrivals',
    href: '/products?category=women',
    cta: 'Shop Women',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=80',
    eyebrow: 'Curated Selection',
    title: ['Chic', 'by Nature'],
    sub: "This season's most coveted looks.",
    tag: 'Bestsellers',
    href: '/products',
    cta: 'Explore Now',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Clients' },
  { value: '200+', label: 'Brands' },
  { value: '98%', label: 'Satisfaction' },
  { value: '4.9★', label: 'Avg Rating' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden" style={{ background: 'var(--bg-dark)' }}>

      {/* ── Background image ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0"
          style={{ y }}
        >
          <Image
            src={slide.image}
            alt={slide.title.join(' ')}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Multi-layer overlay: violet left, pink right, dark bottom */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(115deg,rgba(13,1,24,0.92) 0%,rgba(45,15,94,0.70) 40%,rgba(124,58,237,0.25) 70%,rgba(236,72,153,0.12) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top,rgba(13,1,24,0.80) 0%,transparent 55%,rgba(13,1,24,0.25) 100%)' }} />

          {/* Violet radial glow — upper left */}
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 65%)' }} />
          {/* Pink radial glow — lower right */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.15) 0%,transparent 65%)' }} />
        </motion.div>
      </AnimatePresence>

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { x: '12%', y: '20%', color: 'rgba(196,181,253,0.5)', size: 4 },
          { x: '28%', y: '65%', color: 'rgba(249,168,212,0.4)', size: 3 },
          { x: '68%', y: '18%', color: 'rgba(167,139,250,0.4)', size: 5 },
          { x: '80%', y: '58%', color: 'rgba(244,114,182,0.35)', size: 3 },
          { x: '50%', y: '40%', color: 'rgba(196,181,253,0.3)', size: 2 },
          { x: '90%', y: '80%', color: 'rgba(167,139,250,0.35)', size: 4 },
        ].map((p, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color }}
            animate={{ y: [-15, 15, -15], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.35 }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: headline */}
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.85 }}>

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-3 mb-6">
                  <Sparkles size={13} style={{ color: '#F472B6' }} />
                  <span className="text-[10px] tracking-[0.45em] uppercase font-semibold"
                    style={{ color: 'rgba(249,168,212,0.85)' }}>
                    {slide.eyebrow}
                  </span>
                  {/* Tag pill */}
                  <span className="px-3 py-1 rounded-full text-[9px] tracking-widest uppercase font-bold"
                    style={{ background: 'rgba(236,72,153,0.2)', border: '1px solid rgba(236,72,153,0.35)', color: '#F9A8D4' }}>
                    {slide.tag}
                  </span>
                </motion.div>

                {/* Headline */}
                <h1 className="leading-[0.9] mb-5 sm:mb-7 tracking-tight font-bold"
                  style={{ fontSize: 'clamp(3rem,8vw,9rem)', color: '#F5F3FF' }}>
                  {slide.title.map((line, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 * i + 0.25 }}
                      style={i === 1 ? {
                        background: 'linear-gradient(135deg,#C4B5FD 0%,#EC4899 60%,#F9A8D4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      } : {}}>
                      {line}
                    </motion.div>
                  ))}
                </h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="text-sm tracking-wide max-w-xs mb-7 sm:mb-10 leading-relaxed"
                  style={{ color: 'rgba(196,181,253,0.7)' }}>
                  {slide.sub}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="flex flex-wrap gap-4">
                  <Link href={slide.href}>
                    <Button variant="primary" size="lg">{slide.cta}</Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="dark" size="lg">
                      Browse All <ArrowRight size={13} className="ml-1.5" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right: floating glassmorphism product card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Main product image card */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass rounded-3xl overflow-hidden relative"
                  style={{ width: 280, height: 360, boxShadow: '0 24px 80px rgba(124,58,237,0.3), 0 0 0 1px rgba(255,255,255,0.15)' }}>
                  <Image src={slides[(current + 1) % slides.length].image} alt="Featured" fill className="object-cover" />
                  {/* Product tag */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 glass"
                    style={{ background: 'rgba(13,1,24,0.6)', backdropFilter: 'blur(16px)' }}>
                    <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: 'rgba(196,181,253,0.7)' }}>New Drop</p>
                    <p className="text-white font-semibold text-sm">Silk Evening Collection</p>
                    <p className="text-sm mt-1" style={{ color: '#F472B6' }}>من ٣٬٣٤٠ ر.س</p>
                  </div>
                </motion.div>

                {/* Floating small card — top right */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-8 -right-10 glass rounded-2xl p-4"
                  style={{ boxShadow: '0 12px 40px rgba(236,72,153,0.25)', minWidth: 140 }}>
                  <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(249,168,212,0.7)' }}>Trending</p>
                  <p className="text-white font-semibold text-xs mt-1">Cropped Blazer</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold" style={{ color: '#F472B6' }}>٦٬١٩٠ ر.س</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{ background: 'rgba(236,72,153,0.2)', color: '#F9A8D4' }}>New</span>
                  </div>
                </motion.div>

                {/* Floating badge — bottom left */}
                <motion.div
                  animate={{ y: [-4, 8, -4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -left-10 glass rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ boxShadow: '0 12px 40px rgba(124,58,237,0.2)', minWidth: 150 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'linear-gradient(135deg,#7C3AED,#EC4899)' }}>
                    ✦
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">+4.2k reviews</p>
                    <p className="text-[10px]" style={{ color: 'rgba(196,181,253,0.6)' }}>This week</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="relative z-10 border-t"
          style={{ borderColor: 'rgba(167,139,250,0.15)', background: 'rgba(13,1,24,0.5)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-[1400px] mx-auto px-6 py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-bold" style={{
                  background: 'linear-gradient(135deg,#C4B5FD,#F472B6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{s.value}</p>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.5)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-20 sm:bottom-24 left-6 flex gap-2 z-10">
        {slides.map((_, i) => (
          <motion.button key={i} onClick={() => setCurrent(i)}
            animate={{ width: i === current ? 28 : 6 }}
            className="h-[3px] rounded-full transition-all"
            style={{ background: i === current ? 'linear-gradient(to right,#7C3AED,#EC4899)' : 'rgba(196,181,253,0.35)' }} />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-28 right-8 hidden sm:flex flex-col items-center gap-2 z-10"
        style={{ color: 'rgba(167,139,250,0.45)' }}>
        <span className="text-[9px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom,rgba(124,58,237,0.5),transparent)' }} />
      </motion.div>
    </section>
  );
}
