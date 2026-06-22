'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import { categories } from '@/data/products';
import { ArrowUpRight } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 py-14 sm:py-24">
      <FadeIn>
        <div className="text-center mb-14">
          <span className="accent-line w-10 mb-4 mx-auto block" />
          <p className="text-[10px] tracking-[0.45em] uppercase font-semibold mb-3" style={{ color: 'var(--v-400)' }}>Shop by</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="grad-text">Categories</span>
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <FadeIn key={cat.id} delay={i * 0.08}>
            <Link href={`/products?category=${cat.slug}`}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{
                  boxShadow: '0 4px 20px rgba(124,58,237,0.08)',
                }}
              >
                <div className="aspect-[3/4] relative">
                  <Image src={cat.image} alt={cat.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top,rgba(13,1,24,0.75) 0%,rgba(45,15,94,0.2) 50%,transparent 100%)' }} />

                  {/* Hover glow overlay */}
                  <motion.div className="absolute inset-0" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                    style={{ background: 'linear-gradient(to top,rgba(124,58,237,0.4) 0%,rgba(236,72,153,0.15) 50%,transparent 100%)' }} />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg tracking-wide">{cat.name}</h3>
                  <motion.div className="flex items-center gap-1 mt-1.5"
                    initial={{ opacity: 0, x: -5 }} whileHover={{ opacity: 1, x: 0 }}>
                    <span className="text-[10px] font-semibold" style={{ color: '#F9A8D4' }}>{cat.count} items</span>
                    <ArrowUpRight size={11} style={{ color: '#EC4899' }} />
                  </motion.div>
                </div>

                {/* Gradient border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{ boxShadow: 'inset 0 0 0 2px rgba(167,139,250,0.45)' }}
                />
              </motion.div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
