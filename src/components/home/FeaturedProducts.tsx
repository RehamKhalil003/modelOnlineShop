'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const tabs = ['All', 'New Arrivals', 'Best Sellers'];

export default function FeaturedProducts() {
  const [active, setActive] = useState('All');

  const filtered = products.filter((p) => {
    if (active === 'New Arrivals') return p.isNew;
    if (active === 'Best Sellers') return p.isBestSeller;
    return true;
  }).slice(0, 8);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: 'linear-gradient(to right,#c97a9a,transparent)' }} />
              <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: '#9a72b0' }}>Handpicked</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extralight tracking-wide" style={{ color: '#f0e0eb' }}>Featured Pieces</h2>
          </div>

          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className="px-4 py-2 text-[10px] tracking-widest uppercase transition-all duration-200"
                style={active === tab
                  ? { background: 'linear-gradient(135deg,#c97a9a,#d4956a)', color: '#f8eef4' }
                  : { color: '#9a72b0', border: '1px solid rgba(196,176,224,0.12)' }
                }
                onMouseEnter={e => { if (active !== tab) (e.currentTarget.style.color = '#dac0e8'); }}
                onMouseLeave={e => { if (active !== tab) (e.currentTarget.style.color = '#9a72b0'); }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.055 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>

      <FadeIn className="text-center mt-14">
        <Link href="/products"
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase pb-1 transition-colors group"
          style={{ color: '#dac0e8', borderBottom: '1px solid rgba(218,192,232,0.25)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f0d0e0'; (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(240,208,224,0.6)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#dac0e8'; (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(218,192,232,0.25)'; }}
        >
          View All Products
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </FadeIn>
    </section>
  );
}
