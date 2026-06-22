'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const tabs = ['All', 'New Arrivals', 'Bestsellers', 'Sale'];

export default function FeaturedSection() {
  const [tab, setTab] = useState('All');

  const filtered = products.filter((p) => {
    if (tab === 'New Arrivals') return p.isNew;
    if (tab === 'Bestsellers') return p.isBestSeller;
    if (tab === 'Sale') return !!p.discount;
    return true;
  }).slice(0, 8);

  return (
    <section className="py-14 sm:py-24" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
            <div>
              <span className="accent-line w-8 mb-3 block" />
              <p className="text-[10px] tracking-[0.45em] uppercase font-semibold mb-2" style={{ color: 'var(--v-400)' }}>
                Handpicked for you
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                <span className="grad-text">Featured</span> Pieces
              </h2>
            </div>

            {/* Tab pills */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <motion.button
                  key={t}
                  onClick={() => setTab(t)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
                  style={tab === t ? {
                    background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
                  } : {
                    background: 'rgba(139,92,246,0.08)',
                    color: 'var(--v-600)',
                    border: '1px solid rgba(139,92,246,0.15)',
                  }}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-14">
            <Link href="/products">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
