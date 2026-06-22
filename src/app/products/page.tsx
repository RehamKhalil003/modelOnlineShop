'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import FadeIn from '@/components/animations/FadeIn';
import { products, categories } from '@/data/products';

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated'];
const priceRanges = [
  { label: 'أقل من ١٬٨٧٥ ر.س', min: 0, max: 1875 },
  { label: '١٬٨٧٥ – ٣٬٧٥٠ ر.س', min: 1875, max: 3750 },
  { label: '٣٬٧٥٠ – ١١٬٢٥٠ ر.س', min: 3750, max: 11250 },
  { label: '+١١٬٢٥٠ ر.س', min: 11250, max: Infinity },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [sort, setSort] = useState('Featured');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (priceRange) list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    if (sort === 'Newest') list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
    if (sort === 'Best Rated') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sort, priceRange, search]);

  const activePill = {
    background: 'linear-gradient(135deg,#7C3AED,#EC4899)',
    color: 'white',
    border: 'none',
  };
  const inactivePill = {
    background: 'rgba(139,92,246,0.06)',
    color: 'var(--v-600)',
    border: '1px solid rgba(139,92,246,0.15)',
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: 'var(--bg-page)' }}>
      {/* Page header */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#0D0118 0%,#1A0533 50%,#2D0F5E 100%)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-20 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 65%)' }} />
          <div className="absolute bottom-0 left-20 w-60 h-60 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.12) 0%,transparent 65%)' }} />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right,rgba(196,181,253,0.5),transparent)' }} />
            <p className="text-[10px] tracking-[0.4em] uppercase font-semibold" style={{ color: 'rgba(249,168,212,0.7)' }}>MODEL</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(135deg,#F5F3FF,#C4B5FD,#F9A8D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              All Collections
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6"
          style={{ borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(139,92,246,0.45)' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full text-sm pl-9 pr-4 py-2.5 outline-none rounded-xl transition-all"
              style={{
                background: 'rgba(139,92,246,0.05)',
                border: '1px solid rgba(139,92,246,0.12)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-xl transition-all"
              style={{ color: 'var(--v-600)', border: '1px solid rgba(139,92,246,0.15)', background: filterOpen ? 'rgba(139,92,246,0.08)' : 'transparent' }}>
              <SlidersHorizontal size={13} /> Filters
            </button>

            <div className="relative">
              <button onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-[10px] tracking-widest uppercase px-4 py-2.5 rounded-xl transition-all"
                style={{ color: 'var(--v-600)', border: '1px solid rgba(139,92,246,0.15)' }}>
                Sort: {sort} <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-1 w-52 z-20 rounded-xl overflow-hidden"
                    style={{ background: 'var(--bg-page)', border: '1px solid rgba(139,92,246,0.15)', boxShadow: '0 8px 32px rgba(124,58,237,0.12)' }}>
                    {sortOptions.map((opt) => (
                      <button key={opt} onClick={() => { setSort(opt); setSortOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-xs tracking-wide transition-colors"
                        style={{ color: sort === opt ? '#7C3AED' : 'var(--v-600)', background: sort === opt ? 'rgba(139,92,246,0.08)' : 'transparent', fontWeight: sort === opt ? 600 : 400 }}>
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-xs font-semibold" style={{ color: 'rgba(139,92,246,0.5)' }}>{filtered.length} items</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[{ id: 'all', slug: 'all', name: 'All' }, ...categories].map((cat) => (
            <motion.button key={cat.id} onClick={() => setActiveCategory(cat.slug)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all"
              style={activeCategory === cat.slug ? activePill : inactivePill}>
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Price filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: 'var(--v-600)' }}>Price Range</p>
                  {priceRange && (
                    <button onClick={() => setPriceRange(null)}
                      className="text-xs flex items-center gap-1" style={{ color: 'rgba(139,92,246,0.5)' }}>
                      <X size={11} /> Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button key={range.label} onClick={() => setPriceRange(priceRange?.min === range.min ? null : range)}
                      className="px-4 py-2 text-xs rounded-full transition-all"
                      style={priceRange?.min === range.min ? activePill : inactivePill}>
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: 'rgba(139,92,246,0.45)' }}>
            <p className="text-lg font-light">No products found</p>
          </div>
        ) : (
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>;
}
